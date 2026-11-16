import express from 'express';
import jwt from 'jsonwebtoken';
import { readJSON, writeJSON } from '../utils/fileDb.js';
import { detectSymptoms } from '../services/symptomDetector.js';
import { retrieveKnowledge } from '../services/knowledgeRetriever.js';
import OpenAI from 'openai';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'medichat-super-secret-jwt-key-2024';

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY || 'dummy-key',
    baseURL: 'https://api.groq.com/openai/v1',
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

const SYSTEM_PROMPT = `You are **MediChat AI**, a specialized medical awareness assistant. YOUR KNOWLEDGE IS RESTRICTED EXCLUSIVELY TO MEDICAL AND HEALTH TOPICS.

### MANDATORY SCOPE ENFORCEMENT:
- **GREETINGS ALLOWED**: You MAY respond to greetings and introductions (e.g., "Hi", "Hello", "How are you?").
- **ONLY MEDICAL**: Aside from greetings, you must ONLY assist with questions about human health, diseases, symptoms, prevention, and treatments.
- **STRICT REFUSAL**: If the user asks about ANY non-medical topic (technology, general science, sports, lifestyle, facts, etc.), YOU MUST REFUSE TO ANSWER. 
- **NO HELPFULNESS OUTSIDE SCOPE**: Do not be "helpful" by answering a non-medical question before refusing. Refuse immediately.
- **EXPLICIT REFUSAL MESSAGE**: Use this exact structure for refusals: "I'm sorry, I am MediChat AI, a specialized medical assistant. I can only assist with health and medical-related questions. How can I help you with your health today?"
- **EXAMPLE**: If asked about "wireless charging" or "how a car works", you must NOT explain it. Refuse using the message above.

### OPERATIONAL RULES:
1. **LANGUAGE CONSISTENCY**: Detect and respond in the user's language.
2. **USE RETRIEVED KNOWLEDGE**: Use "RETRIEVED MEDICAL KNOWLEDGE" as the primary source.
3. **AWARENESS ONLY**: Always end with the medical advice disclaimer.
4. **SAFETY**: Start with 🚨 EMERGENCY ALERT for life-threatening symptoms.
5. **NO REPETITION**: Be concise.
6. **INTERACTIVE DIAGNOSIS**: Ask 1-3 clarifying follow-up questions for symptoms.
7. **SCOPE**: Cover ALL human diseases.
8. **PROFILE CONTEXT**: Factor in pre-existing conditions.
`;

// Chat endpoint (public, profile loaded from JWT if available)
router.post('/', async (req, res) => {
    try {
        const { message, language } = req.body;
        if (!message) return res.status(400).json({ error: 'Message required' });

        if (!process.env.GROQ_API_KEY) {
            return res.status(503).json({ error: 'AI service unavailable' });
        }

        // Extract user profile from token (if logged in)
        let userProfile = null;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                const users = readJSON('users.json');
                userProfile = users[decoded.email] || null;
            } catch { /* continue without profile */ }
        }

        // 0. Pre-classification to enforce medical scope
        const classificationResponse = await openai.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: 'Classify if the user message is (1) a GREETING (e.g., hi, hello, good morning), (2) a MEDICAL query (health, symptoms, medicine), or (3) NON-MEDICAL. Respond ONLY with "GREETING", "MEDICAL", or "NON-MEDICAL".'
                },
                { role: 'user', content: message }
            ],
            temperature: 0,
        });

        const isMedicalText = classificationResponse.choices[0].message.content.trim().toUpperCase();
        console.log(`[DEBUG] Query: "${message}" | Classification: "${isMedicalText}"`);
        const isAllowed = isMedicalText.includes('MEDICAL') || isMedicalText.includes('GREETING');

        if (!isAllowed) {
            return res.json({
                reply: "I'm sorry, I am MediChat AI, a specialized medical assistant. I can only assist with health and medical-related questions. How can I help you with your health today?",
                detectedSymptoms: [],
                primaryMatch: null
            });
        }

        // 1. Symptom Detection
        const detectedSymptoms = detectSymptoms(message);

        // 2. RAG Knowledge Retrieval
        const { contextString, primaryMatch } = retrieveKnowledge(detectedSymptoms, userProfile);

        // 3. Build augmented prompt
        const languageHint = language ? `\n[USER LANGUAGE: ${language}. Respond ONLY in ${language}.]` : '';
        const symptomHint = detectedSymptoms.length > 0
            ? `\n[DETECTED SYMPTOMS: ${detectedSymptoms.join(', ')}]`
            : '';
        const augmentedSystem = SYSTEM_PROMPT + contextString + languageHint + symptomHint;

        const completion = await openai.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [
                { role: 'system', content: augmentedSystem },
                { role: 'user', content: message }
            ],
            temperature: 0.5,
            frequency_penalty: 0.5,
        });

        res.json({
            reply: completion.choices[0].message.content,
            detectedSymptoms,
            primaryMatch: primaryMatch ? {
                name: primaryMatch.name,
                severity: primaryMatch.severity,
                whoLink: primaryMatch.whoLink,
                severity_question: primaryMatch.severity_question
            } : null
        });
    } catch (err) {
        const groqMsg = err?.error?.message || err?.message || 'Unknown error';
        console.error('Chat error:', groqMsg);
        res.status(500).json({ error: 'AI Service Error', detail: groqMsg });
    }
});

// Get history
router.get('/history/:email', authenticateToken, (req, res) => {
    try {
        const history = readJSON('history.json');
        const userHistory = history[req.params.email] || [];
        res.json({ sessions: userHistory });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

// Save history session
router.post('/history', authenticateToken, (req, res) => {
    try {
        const { email, session } = req.body;
        if (!email || !session) return res.status(400).json({ error: 'Email and session required' });

        const history = readJSON('history.json');
        if (!history[email]) history[email] = [];

        const existingIdx = history[email].findIndex(s => s.id === session.id);
        if (existingIdx >= 0) {
            history[email][existingIdx] = session;
        } else {
            history[email].unshift(session);
        }

        history[email] = history[email].slice(0, 50);
        writeJSON('history.json', history);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save history' });
    }
});

export default router;
