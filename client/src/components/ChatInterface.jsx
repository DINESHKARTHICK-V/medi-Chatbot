import React, { useState, useEffect, useRef } from 'react';
import { Send, Menu, Plus, MessageSquare, X, LogOut, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBubble from './MessageBubble';
import SeveritySelector from './SeveritySelector';
import TypingIndicator from './TypingIndicator';
import LoginModal from './LoginModal';
import AwarenessPanel from './AwarenessPanel';
import { ChatService } from '../services/ChatService';
import { useAuth } from '../AuthContext';
import clsx from 'clsx';

const WELCOME_MSG = {
    text: "## 👋 Welcome to MediChat AI!\n\nI can help you with:\n- 🦠 **Any disease** — symptoms, causes, treatment\n- 💊 **Tablets & Injections** for every disease\n- 🛡️ **Prevention strategies**\n- 🔗 **WHO official references**\n- 🌍 **Multiple languages** — just write in your language!\n\n*How can I assist you today?*",
    type: 'text',
    sender: 'bot'
};

const generateSessionId = () => `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const ChatInterface = () => {
    const { user, logout } = useAuth();
    const [messages, setMessages] = useState([WELCOME_MSG]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [showSeverity, setShowSeverity] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [currentSessionId, setCurrentSessionId] = useState(generateSessionId());
    const [detectedLang, setDetectedLang] = useState('');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Load history on mount / user change
    useEffect(() => {
        setSessions(ChatService.loadHistory());
    }, [user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, showSeverity]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Auto-save session when messages update
    useEffect(() => {
        if (messages.length <= 1) return;
        const firstUserMsg = messages.find(m => m.sender === 'user');
        const sessionTitle = firstUserMsg ? firstUserMsg.text.slice(0, 40) : 'New Chat';
        const session = {
            id: currentSessionId,
            title: sessionTitle,
            messages,
            createdAt: new Date().toISOString()
        };
        ChatService.saveSession(session);
        setSessions(ChatService.loadHistory());
    }, [messages]);

    const handleSendMessage = async (e) => {
        e?.preventDefault();
        if (!inputText.trim()) return;

        const userText = inputText;
        const lang = ChatService.detectLanguage(userText);
        if (lang !== 'English') setDetectedLang(lang);
        else setDetectedLang('');

        const userMessage = { text: userText, type: 'text', sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);
        setShowSeverity(false);

        const botMessageId = Date.now();
        setMessages(prev => [...prev, { id: botMessageId, text: '', type: 'text', sender: 'bot', isStreaming: true }]);

        await ChatService.processMessageStream(
            userText,
            (chunk) => {
                setIsTyping(false);
                setMessages(prev => prev.map(msg =>
                    msg.id === botMessageId ? { ...msg, text: chunk.text, type: chunk.type } : msg
                ));
            },
            (complete) => {
                setMessages(prev => prev.map(msg =>
                    msg.id === botMessageId
                        ? { ...msg, text: complete.full_text, isStreaming: false, full_text: complete.full_text, whoLink: complete.whoLink }
                        : msg
                ));
                if (complete.type === 'disease_info' && complete.severity_question) {
                    setTimeout(() => {
                        setMessages(prev => [...prev, {
                            text: `**Follow-up:** ${complete.severity_question}`,
                            type: 'text',
                            sender: 'bot'
                        }]);
                        setShowSeverity(true);
                    }, 500);
                }
            }
        );
    };

    const handleSeveritySelect = async (level) => {
        setShowSeverity(false);
        setMessages(prev => [...prev, { text: `Severity: **${level}**`, type: 'text', sender: 'user' }]);
        setIsTyping(true);
        const botMessageId = Date.now();
        setMessages(prev => [...prev, { id: botMessageId, text: '', type: 'text', sender: 'bot', isStreaming: true }]);
        await ChatService.assessSeverityStream(
            level,
            (chunk) => { setIsTyping(false); setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: chunk.text } : msg)); },
            (complete) => { setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: complete.text, isStreaming: false } : msg)); }
        );
    };

    const startNewChat = () => {
        setMessages([WELCOME_MSG]);
        setCurrentSessionId(generateSessionId());
        setShowSeverity(false);
        setDetectedLang('');
        inputRef.current?.focus();
    };

    const loadSession = (session) => {
        setMessages(session.messages);
        setCurrentSessionId(session.id);
        setShowSeverity(false);
    };

    const deleteSession = (e, sessionId) => {
        e.stopPropagation();
        const updated = sessions.filter(s => s.id !== sessionId);
        localStorage.setItem('medichat_sessions', JSON.stringify(updated));
        setSessions(updated);
    };

    const formatDate = (iso) => {
        const d = new Date(iso);
        const now = new Date();
        const diff = now - d;
        if (diff < 86400000) return 'Today';
        if (diff < 172800000) return 'Yesterday';
        return d.toLocaleDateString();
    };

    // Group sessions by date
    const groupedSessions = sessions.reduce((acc, s) => {
        const label = formatDate(s.createdAt);
        if (!acc[label]) acc[label] = [];
        acc[label].push(s);
        return acc;
    }, {});

    return (
        <div className="flex h-screen w-full bg-slate-950 text-slate-50 relative overflow-hidden font-sans">

            {/* ── Sidebar ── */}
            <AnimatePresence mode='wait'>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ x: -270, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -270, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="fixed md:relative z-20 w-[270px] h-full bg-slate-900 border-r border-white/5 flex flex-col"
                    >
                        {/* Logo + New Chat */}
                        <div className="p-3 border-b border-white/5">
                            <div className="flex items-center justify-between mb-3 px-1">
                                <span className="font-bold text-sm text-white flex items-center gap-1.5">
                                    🏥 <span className="text-cyan-400">MediChat</span> AI
                                </span>
                                <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 text-slate-400 hover:text-white">
                                    <X size={18} />
                                </button>
                            </div>
                            <button
                                onClick={startNewChat}
                                className="w-full flex items-center gap-2 px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/40 rounded-lg text-sm text-cyan-400 transition-all"
                            >
                                <Plus size={16} />
                                <span>New Chat</span>
                            </button>
                        </div>

                        {/* ── Login / User Section ── */}
                        <div className="px-3 py-3 border-b border-white/5">
                            {user ? (
                                <div className="flex items-center gap-2.5 px-2 py-2 bg-slate-800/50 rounded-xl">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm flex-shrink-0">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                                        <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                                    </div>
                                    <button onClick={logout} title="Sign Out" className="text-slate-500 hover:text-red-400 transition-colors flex-shrink-0">
                                        <LogOut size={14} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowLoginModal(true)}
                                    className="w-full flex items-center gap-2 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 border border-white/5 rounded-xl text-sm text-slate-300 hover:text-white transition-all"
                                >
                                    <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center">
                                        <span className="text-base">👤</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium">Sign In</p>
                                        <p className="text-[10px] text-slate-500">Save your history</p>
                                    </div>
                                </button>
                            )}
                        </div>

                        {/* ── Chat History ── */}
                        <div className="flex-1 overflow-y-auto py-2">
                            {sessions.length === 0 ? (
                                <p className="text-xs text-slate-600 px-5 py-4 text-center">Your conversations will appear here</p>
                            ) : (
                                Object.entries(groupedSessions).map(([dateLabel, group]) => (
                                    <div key={dateLabel}>
                                        <p className="px-4 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-3 mb-1">{dateLabel}</p>
                                        {group.map(session => (
                                            <button
                                                key={session.id}
                                                onClick={() => loadSession(session)}
                                                className={clsx(
                                                    'w-full text-left px-3 py-2.5 rounded-lg mx-1 hover:bg-slate-800/50 text-xs text-slate-300 truncate flex items-center gap-2 transition-colors group',
                                                    session.id === currentSessionId && 'bg-slate-800 text-white'
                                                )}
                                                style={{ maxWidth: 'calc(100% - 8px)' }}
                                            >
                                                <MessageSquare size={12} className="text-slate-500 flex-shrink-0" />
                                                <span className="flex-1 truncate">{session.title}</span>
                                                <span
                                                    onClick={(e) => deleteSession(e, session.id)}
                                                    className="hidden group-hover:block text-slate-500 hover:text-red-400 transition-colors flex-shrink-0 cursor-pointer"
                                                >
                                                    <X size={12} />
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* ── Global Awareness Panel ── */}
                        <div className="border-t border-white/5">
                            <AwarenessPanel />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Main Content ── */}
            <div className="flex-1 flex flex-col h-full relative bg-slate-950">

                {/* Top Navbar */}
                <div className="h-14 flex items-center px-4 border-b border-white/5 justify-between bg-slate-950/80 backdrop-blur-sm z-10 sticky top-0">
                    <div className="flex items-center gap-3">
                        {!isSidebarOpen && (
                            <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-slate-800 rounded-md text-slate-400">
                                <Menu size={20} />
                            </button>
                        )}
                        <span className="font-semibold text-slate-200 flex items-center gap-2">
                            MediChat <span className="text-cyan-500">AI</span>
                            <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/20">BETA</span>
                        </span>
                    </div>
                    {/* Language badge */}
                    {detectedLang && detectedLang !== 'English' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs px-3 py-1 rounded-full"
                        >
                            <Globe size={12} />
                            <span>{detectedLang} detected</span>
                        </motion.div>
                    )}
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto pb-40 scroll-smooth">
                    <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
                        {messages.map((msg, index) => (
                            <MessageBubble key={index} message={msg} />
                        ))}
                        {isTyping && <TypingIndicator />}
                        {showSeverity && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                                <SeveritySelector onSelect={handleSeveritySelect} />
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} className="h-4" />
                    </div>
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent pt-10 pb-6 px-4">
                    <div className="w-full max-w-3xl mx-auto">
                        <form onSubmit={handleSendMessage} className="relative bg-slate-800 rounded-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden focus-within:ring-1 focus-within:ring-cyan-500/50 transition-all">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Ask about any disease in any language..."
                                className="w-full bg-transparent border-none text-white text-base py-4 pl-4 pr-14 focus:outline-none placeholder:text-slate-500"
                                disabled={showSeverity || isTyping}
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim() || showSeverity || isTyping}
                                className={clsx(
                                    'absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg transition-all',
                                    inputText.trim() && !isTyping
                                        ? 'bg-cyan-500 text-white shadow-lg hover:bg-cyan-400 hover:scale-105'
                                        : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                )}
                            >
                                <Send size={18} />
                            </button>
                        </form>
                        <p className="text-[11px] text-center text-slate-500 mt-3">
                            MediChat AI · Linked to WHO · Always consult a healthcare professional
                        </p>
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </div>
    );
};

export default ChatInterface;
