import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, LogIn, UserPlus, Eye, EyeOff, Heart } from 'lucide-react';
import { useAuth } from '../AuthContext';

const CONDITIONS = [
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'heart_disease', label: 'Heart Disease' },
    { id: 'asthma', label: 'Asthma' },
    { id: 'hypertension', label: 'High Blood Pressure' },
    { id: 'kidney_disease', label: 'Kidney Disease' },
    { id: 'thyroid', label: 'Thyroid Disorder' },
];

const LoginModal = ({ onClose }) => {
    const { login, register } = useAuth();
    const [tab, setTab] = useState('login');
    const [step, setStep] = useState(1); // 1: basic info, 2: health profile (register only)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toggleCondition = (id) => {
        setSelectedConditions(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const handleNext = (e) => {
        e.preventDefault();
        setError('');
        if (!name.trim()) { setError('Name is required'); return; }
        if (!email.trim()) { setError('Email is required'); return; }
        if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (tab === 'login') {
                await login(email, password);
            } else {
                await register(name, email, password, age ? parseInt(age) : null, gender || null, selectedConditions);
            }
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const switchTab = (t) => { setTab(t); setError(''); setStep(1); };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="relative p-6 pb-4">
                        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
                            <X size={18} />
                        </button>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                <span className="text-cyan-400 text-lg">🏥</span>
                            </div>
                            <span className="font-bold text-white">MediChat AI</span>
                        </div>
                        <p className="text-xs text-slate-400">
                            {tab === 'register' && step === 2
                                ? 'Your health profile helps personalize responses'
                                : 'Sign in to save your chat history'}
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex mx-6 mb-4 bg-slate-800 rounded-lg p-1">
                        <button onClick={() => switchTab('login')} className={`flex-1 py-1.5 text-sm rounded-md font-medium transition-all ${tab === 'login' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
                            Sign In
                        </button>
                        <button onClick={() => switchTab('register')} className={`flex-1 py-1.5 text-sm rounded-md font-medium transition-all ${tab === 'register' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
                            Register
                        </button>
                    </div>

                    {/* Login Form */}
                    {tab === 'login' && (
                        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="email" placeholder="Email address" value={email}
                                    onChange={e => setEmail(e.target.value)} required
                                    className="w-full bg-slate-800 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                />
                            </div>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password}
                                    onChange={e => setPassword(e.target.value)} required minLength={6}
                                    className="w-full bg-slate-800 border border-white/10 rounded-lg pl-9 pr-10 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                            {error && <p className="text-red-400 text-xs bg-red-950/30 border border-red-900/50 px-3 py-2 rounded-lg">{error}</p>}
                            <button type="submit" disabled={loading}
                                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm">
                                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><LogIn size={16} /> Sign In</>}
                            </button>
                        </form>
                    )}

                    {/* Register — Step 1: Basic Info */}
                    {tab === 'register' && step === 1 && (
                        <form onSubmit={handleNext} className="px-6 pb-6 space-y-3">
                            <div className="relative">
                                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" placeholder="Full Name" value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full bg-slate-800 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                />
                            </div>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="email" placeholder="Email address" value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full bg-slate-800 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                />
                            </div>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type={showPassword ? 'text' : 'password'} placeholder="Password (min 6 chars)" value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full bg-slate-800 border border-white/10 rounded-lg pl-9 pr-10 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                            {error && <p className="text-red-400 text-xs bg-red-950/30 border border-red-900/50 px-3 py-2 rounded-lg">{error}</p>}
                            <button type="submit"
                                className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm">
                                Next: Health Profile →
                            </button>
                        </form>
                    )}

                    {/* Register — Step 2: Health Profile */}
                    {tab === 'register' && step === 2 && (
                        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="text-xs text-slate-400 mb-1 block">Age</label>
                                    <input type="number" placeholder="e.g. 28" value={age}
                                        onChange={e => setAge(e.target.value)} min={1} max={120}
                                        className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs text-slate-400 mb-1 block">Gender</label>
                                    <select value={gender} onChange={e => setGender(e.target.value)}
                                        className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors">
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-slate-400 mb-2 flex items-center gap-1"><Heart size={12} /> Existing Conditions (optional)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {CONDITIONS.map(c => (
                                        <button key={c.id} type="button" onClick={() => toggleCondition(c.id)}
                                            className={`text-xs px-3 py-2 rounded-lg border transition-all text-left ${selectedConditions.includes(c.id)
                                                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                                                : 'bg-slate-800 border-white/10 text-slate-400 hover:border-white/20'}`}>
                                            {c.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {error && <p className="text-red-400 text-xs bg-red-950/30 border border-red-900/50 px-3 py-2 rounded-lg">{error}</p>}

                            <div className="flex gap-2">
                                <button type="button" onClick={() => setStep(1)}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-lg transition-all text-sm">
                                    ← Back
                                </button>
                                <button type="submit" disabled={loading}
                                    className="flex-[2] bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm">
                                    {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><UserPlus size={16} /> Create Account</>}
                                </button>
                            </div>
                            <p className="text-[10px] text-slate-500 text-center">Health profile personalizes AI responses. Data stays private.</p>
                        </form>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoginModal;
