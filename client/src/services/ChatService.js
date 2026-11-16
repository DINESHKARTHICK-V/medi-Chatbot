import { medicalDatabase, generalResponses } from './mockMedicalData';
import anatomyDatabase from './anatomyData';
import indianLanguageMap from './indianLanguageMap';

const API_BASE = 'http://localhost:5000';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ─── Language Detection ──────────────────────────────────────────────────────
export const detectLanguage = (text) => {
    const patterns = [
        // Indian scripts (checked by Unicode range)
        { lang: 'Tamil', regex: /[\u0B80-\u0BFF]/ },
        { lang: 'Hindi', regex: /[\u0900-\u097F]/ },
        { lang: 'Telugu', regex: /[\u0C00-\u0C7F]/ },
        { lang: 'Kannada', regex: /[\u0C80-\u0CFF]/ },
        { lang: 'Malayalam', regex: /[\u0D00-\u0D7F]/ },
        { lang: 'Gujarati', regex: /[\u0A80-\u0AFF]/ },
        { lang: 'Punjabi', regex: /[\u0A00-\u0A7F]/ },
        { lang: 'Bengali', regex: /[\u0980-\u09FF]/ },
        { lang: 'Marathi', regex: /[\u0900-\u097F]/ },
        { lang: 'Oriya', regex: /[\u0B00-\u0B7F]/ },
        // Other scripts
        { lang: 'Arabic/Urdu', regex: /[\u0600-\u06FF]/ },
        { lang: 'Chinese', regex: /[\u4E00-\u9FFF]/ },
        { lang: 'Japanese', regex: /[\u3040-\u30FF]/ },
        { lang: 'Korean', regex: /[\uAC00-\uD7AF]/ },
        { lang: 'Russian', regex: /[\u0400-\u04FF]/ },
        // European languages (keyword-based)
        { lang: 'Spanish', regex: /\b(hola|enfermedad|s[íi]ntomas|c[óo]mo|qu[eé]|gracias|me duele|tengo)\b/i },
        { lang: 'French', regex: /\b(bonjour|maladie|sympt[oô]mes|comment|merci|je suis|j'ai)\b/i },
        { lang: 'German', regex: /\b(hallo|krankheit|symptome|wie|danke|ich bin|ich habe)\b/i },
        { lang: 'Portuguese', regex: /\b(ol[aá]|doen[cç]a|sintomas|como|obrigado|eu tenho)\b/i },
    ];
    for (const { lang, regex } of patterns) {
        if (regex.test(text)) return lang;
    }

    // Secondary scan for language names in English script
    const lowerText = text.toLowerCase();
    if (lowerText.includes('tamil')) return 'Tamil';
    if (lowerText.includes('hindi')) return 'Hindi';
    if (lowerText.includes('telugu')) return 'Telugu';
    if (lowerText.includes('spanish')) return 'Spanish';
    if (lowerText.includes('french')) return 'French';

    return 'English';
};

// ─── NLP: Translate Indian language terms to English keys ────────────────────
const translateToEnglishKey = (text) => {
    // Try exact matches from the indian language map
    for (const [nativeWord, englishKey] of Object.entries(indianLanguageMap)) {
        if (text.includes(nativeWord)) return englishKey;
    }
    return null;
};

// ─── History (localStorage) ─────────────────────────────────────────────────
const HISTORY_KEY = 'medichat_sessions';

const loadLocalHistory = () => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
    catch { return []; }
};

const saveLocalSession = (session) => {
    const sessions = loadLocalHistory();
    const idx = sessions.findIndex(s => s.id === session.id);
    if (idx >= 0) sessions[idx] = session;
    else sessions.unshift(session);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(sessions.slice(0, 50)));
};

// ─── Fetch live disease data from disease.sh ─────────────────────────────────
export const fetchLiveDiseaseData = async (diseaseName) => {
    try {
        if (diseaseName.toLowerCase().includes('covid')) {
            const r = await fetch('https://disease.sh/v3/covid-19/all');
            if (r.ok) {
                const d = await r.json();
                return `\n\n### 📊 Live Global COVID-19 Statistics (disease.sh)\n| Metric | Count |\n|---|---|\n| Total Cases | ${d.cases?.toLocaleString()} |\n| Active Cases | ${d.active?.toLocaleString()} |\n| Deaths | ${d.deaths?.toLocaleString()} |\n| Recovered | ${d.recovered?.toLocaleString()} |\n| Today's Cases | ${d.todayCases?.toLocaleString()} |\n\n*Data updated: ${new Date().toLocaleString()}*`;
            }
        }
    } catch { /* silent fallback */ }
    return '';
};

// ─── ChatService ─────────────────────────────────────────────────────────────
export const ChatService = {

    async processMessageStream(message, onChunk, onComplete) {
        const lowerMessage = message.toLowerCase();
        const detectedLang = detectLanguage(message);

        // 1. Emergency
        if (lowerMessage.match(/\b(emergency|dying|heart attack|stroke|suicide|chest pain severe)\b/)) {
            await this.simulateStream(generalResponses.emergency, 'alert', onChunk, onComplete);
            return;
        }

        // 2. Greeting
        if (lowerMessage.match(/\b(hello|hi|hey|hola|bonjour|namaste)\b/) && message.trim().split(' ').length < 4) {
            await this.simulateStream(generalResponses.greeting, 'text', onChunk, onComplete);
            return;
        }

        // 3. Try backend API first (with auth token for profile-based personalization)
        try {
            const token = localStorage.getItem('medichat_token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers,
                body: JSON.stringify({ message, language: detectedLang })
            });
            if (!response.ok) throw new Error(`Backend: ${response.status}`);
            const data = await response.json();
            // Pass through primaryMatch metadata for severity follow-up
            await this.simulateStream(data.reply, 'disease_info', onChunk, (final) => {
                onComplete({
                    ...final,
                    severity_question: data.primaryMatch?.severity_question || null,
                    whoLink: data.primaryMatch?.whoLink || null
                });
            });
            return;
        } catch { /* fall through to offline mode */ }

        // 4. Offline: try Indian language translation first
        const translatedKey = translateToEnglishKey(message);

        await this.handleMockFallback(lowerMessage, onChunk, onComplete, translatedKey);
    },

    async handleMockFallback(lowerMessage, onChunk, onComplete, translatedKey = null) {
        let fullResponse = '';
        let responseType = 'text';
        let severityQuestion = null;
        let whoLink = null;
        const detectedLang = detectLanguage(lowerMessage);

        // Non-medical topics
        if (!translatedKey && lowerMessage.match(/\b(weather|movie|game|politics|sports|finance|joke|cricket|football)\b/)) {
            fullResponse = generalResponses.non_medical;
        } else {
            let found = false;
            let entry = null;

            // 1st priority: Indian language translation matched
            if (translatedKey) {
                if (anatomyDatabase[translatedKey]) {
                    entry = anatomyDatabase[translatedKey];
                    found = true;
                } else if (medicalDatabase[translatedKey]) {
                    entry = medicalDatabase[translatedKey];
                    found = true;
                }
            }

            // 2nd priority: check anatomy/disease keywords (English)
            if (!found) {
                const termFound = Object.entries(anatomyDatabase).find(([, d]) =>
                    d.keywords?.some(k => lowerMessage.includes(k.toLowerCase()))
                ) || Object.entries(medicalDatabase).find(([, d]) =>
                    d.keywords?.some(k => lowerMessage.includes(k.toLowerCase()))
                );
                if (termFound) {
                    entry = termFound[1];
                    found = true;
                }
            }

            if (found && entry) {
                fullResponse = entry.full_response;
                severityQuestion = entry.severity_question;
                whoLink = entry.whoLink;
                responseType = 'disease_info';

                // --- RELEVANCY FILTERING ---
                // If the user asks for a specific section, extract only that
                const sections = {
                    prevention: /\b(prevent|prevention|avoid|protection|தடுப்பு|बचाव)\b/i,
                    symptoms: /\b(symptom|signs|feeling|indications|அறிகுறிகள்|लक्षण)\b/i,
                    medicine: /\b(medicine|tablet|pill|injection|dosage|மருந்து|दवा)\b/i,
                    treatment: /\b(treatment|cure|manage|சிகிச்சை|उपचार)\b/i
                };

                for (const [key, regex] of Object.entries(sections)) {
                    if (regex.test(lowerMessage)) {
                        // Extract content between specific Markdown headers
                        const sectionMap = {
                            prevention: '### 🛡️ Prevention',
                            symptoms: '### 🌡️ Symptoms',
                            medicine: '### 💊 Tablets', // Matches tablets and injections
                            treatment: '### 🏥 Treatment'
                        };
                        const header = sectionMap[key];
                        if (fullResponse.includes(header)) {
                            const parts = fullResponse.split('###');
                            const targetSection = parts.find(p => p.trim().startsWith(header.replace('###', '').trim()));
                            if (targetSection) {
                                fullResponse = `## ${entry.name} - ${key.charAt(0).toUpperCase() + key.slice(1)}\n\n###${targetSection}`;
                            }
                        }
                        break; // Only filter by the first matched intent
                    }
                }
            }

            if (!found) {
                // Live COVID data fallback
                if (lowerMessage.match(/covid|coronavirus|corona/)) {
                    const liveData = await fetchLiveDiseaseData('covid');
                    if (medicalDatabase['covid-19']) {
                        fullResponse = medicalDatabase['covid-19'].full_response + liveData;
                        whoLink = medicalDatabase['covid-19'].whoLink;
                        responseType = 'disease_info';
                        found = true;
                    }
                }
                if (!found) fullResponse = generalResponses.unknown;
            }
        }

        // --- LANGUAGE AWARENESS ---
        // If offline and using a non-English language, prepend a localized disclaimer
        if (detectedLang !== 'English' && !fullResponse.includes('## 👋')) {
            const disclaimers = {
                'Tamil': '⚠️ **கவனிக்கவும்:** தற்போது ஆஃப்லைன் பயன்முறையில் உள்ளேன். முழுமையான தமிழ் ஆதரவிற்கு இணைய இணைப்பு மற்றும் AI கணக்கு தேவை. இதோ நீங்கள் கேட்ட தகவல் (ஆங்கிலத்தில்):',
                'Hindi': '⚠️ **ध्यान दें:** मैं वर्तमान में ऑफलाइन मोड में हूँ। पूर्ण हिंदी समर्थन के लिए इंटरनेट और AI की आवश्यकता है। यहाँ आपकी जानकारी है (अंग्रेजी में):',
                'Spanish': '⚠️ **Nota:** Estoy en modo offline. Para soporte completo en español, se requiere conexión. Aquí está la información (en inglés):',
            };
            const intro = disclaimers[detectedLang] || `⚠️ **Note:** I am currently in offline mode. For full ${detectedLang} support, the AI backend is required. Here is the info in English:`;
            fullResponse = `${intro}\n\n${fullResponse}`;
        }

        await this.simulateStream(fullResponse, responseType, onChunk, (final) => {
            onComplete({ ...final, severity_question: severityQuestion, whoLink });
        });
    },

    async simulateStream(text, type, onChunk, onComplete) {
        const tokens = text.split(/(\s+)/);
        let currentText = '';
        for (const token of tokens) {
            currentText += token;
            onChunk({ text: currentText, type, sender: 'bot' });
            await delay(token.trim() === '' ? 4 : Math.random() * 18 + 7);
        }
        onComplete({ text, full_text: text, type, sender: 'bot' });
    },

    async assessSeverityStream(level, onChunk, onComplete) {
        await delay(400);
        const responses = {
            'High': '### 🚨 CRITICAL: High Severity\nYour symptoms may indicate a **medical emergency**.\n\n- **🇮🇳 India**: Dial **108** (Ambulance) or **112**\n- **Global**: **112** or local emergency number\n- **Do NOT wait** — get to the Emergency Room now.',
            'Medium': '### ⚠️ Moderate Severity\nYour symptoms need professional medical attention.\n\n- **Action:** See a doctor within 24 hours.\n- Monitor temperature, hydration, and breathing closely.',
            'Low': '### ✅ Mild Severity\nYour symptoms appear manageable at home.\n\n- Rest and drink plenty of fluids (water/ORS)\n- Paracetamol 500mg for fever relief\n- See a doctor if symptoms worsen after 3 days.',
        };
        const text = responses[level] || 'Please consult a doctor for a proper diagnosis.';
        await this.simulateStream(text, 'text', onChunk, onComplete);
    },

    saveSession: saveLocalSession,
    loadHistory: loadLocalHistory,
    detectLanguage,
};
