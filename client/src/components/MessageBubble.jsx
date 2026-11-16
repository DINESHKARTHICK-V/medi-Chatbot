import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User, AlertTriangle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const MessageBubble = ({ message }) => {
    const isBot = message.sender === 'bot';
    const isAlert = message.type === 'alert';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={clsx('flex w-full mb-6', isBot ? 'justify-start' : 'justify-end')}
        >
            <div className={clsx('flex max-w-[88%] md:max-w-[78%]', isBot ? 'flex-row gap-4' : 'flex-row-reverse gap-3')}>

                {/* Avatar */}
                <div className={clsx(
                    'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border',
                    isBot ? 'bg-cyan-900/20 border-cyan-500/30 text-cyan-400' : 'bg-slate-700 border-slate-600 text-slate-300'
                )}>
                    {isBot ? <Bot size={18} /> : <User size={18} />}
                </div>

                {/* Content */}
                <div className={clsx('flex flex-col', isBot ? 'pt-1' : 'bg-slate-800 p-3 rounded-2xl rounded-tr-none border border-slate-700')}>
                    {isBot && <span className="text-xs font-semibold text-cyan-500 mb-1">MediChat AI</span>}

                    {/* Text / Markdown */}
                    <div className={clsx('text-sm md:text-[15px] leading-7', isBot ? 'prose' : 'text-white')}>
                        {message.type === 'disease_info' ? (
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                <ReactMarkdown>{message.full_text || message.text}</ReactMarkdown>
                            </div>
                        ) : isAlert ? (
                            <div className="flex flex-col gap-2">
                                <div className="flex items-start gap-2 text-red-400 font-semibold bg-red-950/30 p-3 rounded border border-red-900/50">
                                    <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                                    <ReactMarkdown>{message.text}</ReactMarkdown>
                                </div>
                            </div>
                        ) : (
                            <ReactMarkdown>{message.text}</ReactMarkdown>
                        )}
                    </div>

                    {/* WHO Reference Link */}
                    {isBot && message.whoLink && !message.isStreaming && (
                        <motion.a
                            href={message.whoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-2 inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-lg transition-all w-fit"
                        >
                            <ExternalLink size={12} />
                            🌐 WHO Official Reference
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default MessageBubble;
