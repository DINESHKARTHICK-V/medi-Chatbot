import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readJSON, writeJSON } from '../utils/fileDb.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'medichat-super-secret-jwt-key-2024';

// Register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, age, gender, conditions } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const users = readJSON('users.json');
        if (users[email]) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        users[email] = {
            email,
            name,
            age: age || null,
            gender: gender || null,
            conditions: conditions || [],
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };
        writeJSON('users.json', users);

        const token = jwt.sign({ email, name }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { email, name, age, gender, conditions: conditions || [] } });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        const users = readJSON('users.json');
        const user = users[email];
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            token,
            user: {
                email: user.email,
                name: user.name,
                age: user.age,
                gender: user.gender,
                conditions: user.conditions || []
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Update Profile
router.put('/profile', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'No token provided' });

        let decoded;
        try { decoded = jwt.verify(token, JWT_SECRET); }
        catch { return res.status(403).json({ error: 'Invalid token' }); }

        const { age, gender, conditions } = req.body;
        const users = readJSON('users.json');
        if (!users[decoded.email]) return res.status(404).json({ error: 'User not found' });

        users[decoded.email] = {
            ...users[decoded.email],
            age: age ?? users[decoded.email].age,
            gender: gender ?? users[decoded.email].gender,
            conditions: conditions ?? users[decoded.email].conditions,
        };
        writeJSON('users.json', users);
        res.json({ success: true, user: users[decoded.email] });
    } catch (err) {
        res.status(500).json({ error: 'Profile update failed' });
    }
});

export default router;
