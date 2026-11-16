import express from 'express';
import { getOutbreaks } from '../services/outbreakMonitor.js';

const router = express.Router();

// Get global disease awareness data
router.get('/', async (req, res) => {
    try {
        const data = await getOutbreaks();
        res.json(data);
    } catch (err) {
        console.error('Awareness error:', err);
        res.status(500).json({ error: 'Failed to fetch awareness data' });
    }
});

export default router;
