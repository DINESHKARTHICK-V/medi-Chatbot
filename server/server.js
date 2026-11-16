import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import authRouter from './src/routes/auth.js';
import chatRouter from './src/routes/chat.js';
import awarenessRouter from './src/routes/awareness.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory and default files exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const ensureFile = (name, def) => {
    const p = path.join(DATA_DIR, name);
    if (!fs.existsSync(p)) fs.writeFileSync(p, JSON.stringify(def, null, 2), 'utf8');
};
ensureFile('users.json', {});
ensureFile('history.json', {});

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────────────
app.use('/auth', authRouter);
app.use('/chat', chatRouter);
app.use('/awareness', awarenessRouter);

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// ── Start ──────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ MediChat AI Backend running on http://localhost:${PORT}`);
    console.log(`📦 Routes: /chat | /auth/register | /auth/login | /auth/profile | /awareness`);
    console.log(`🧠 RAG: Symptom Detection + Knowledge Retrieval active`);
});
