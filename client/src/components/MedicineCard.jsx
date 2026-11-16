import { getMedicineImage } from "../services/ChatService";
import React, { useState, useEffect } from 'react';
import { Pill, Syringe, Shield, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

// Color mapping by medication type
const getMedicineColor = (name) => {
    const n = name.toLowerCase();
    if (n.match(/paracetamol|acetaminophen|ibuprofen|aspirin|naproxen/)) return { bg: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/30', text: 'text-orange-300', dot: 'bg-orange-400' };
    if (n.match(/amoxicillin|azithromycin|ciprofloxacin|doxycycline|ceftriaxone|penicillin|metronidazole|levofloxacin/)) return { bg: 'from-green-500/20 to-green-600/10', border: 'border-green-500/30', text: 'text-green-300', dot: 'bg-green-400' };
    if (n.match(/insulin|metformin|glibenclamide|sitagliptin|empagliflozin/)) return { bg: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30', text: 'text-blue-300', dot: 'bg-blue-400' };
    if (n.match(/oseltamivir|tamiflu|remdesivir|acyclovir|valacyclovir|lopinavir|tenofovir/)) return { bg: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/30', text: 'text-purple-300', dot: 'bg-purple-400' };
    if (n.match(/amlodipine|lisinopril|losartan|metoprolol|atenolol|furosemide/)) return { bg: 'from-red-500/20 to-red-600/10', border: 'border-red-500/30', text: 'text-red-300', dot: 'bg-red-400' };
    if (n.match(/sertraline|fluoxetine|escitalopram|venlafaxine|clonazepam|alprazolam/)) return { bg: 'from-violet-500/20 to-violet-600/10', border: 'border-violet-500/30', text: 'text-violet-300', dot: 'bg-violet-400' };
    if (n.match(/artesunate|chloroquine|quinine|artemether|lumefantrine/)) return { bg: 'from-teal-500/20 to-teal-600/10', border: 'border-teal-500/30', text: 'text-teal-300', dot: 'bg-teal-400' };
    return { bg: 'from-cyan-500/20 to-cyan-600/10', border: 'border-cyan-500/30', text: 'text-cyan-300', dot: 'bg-cyan-400' };
};

// Tablet visual pill shape
const PillVisual = ({ name, color }) => (
    <div className="flex flex-col items-center gap-1 min-w-[72px]">
        <div className={`relative w-14 h-7 rounded-full bg-gradient-to-r ${color.bg} border ${color.border} flex items-center justify-center shadow-lg`}>
            {/* Dividing line on pill */}
            <div className={`absolute w-px h-5 ${color.dot} opacity-40`} />
            <Pill size={14} className={`${color.text} z-10`} />
        </div>
        <span className={`text-[9px] font-medium ${color.text} text-center leading-tight max-w-[72px] truncate`}>{name}</span>
    </div>
);

// Injection visual
const InjectionVisual = ({ name, color }) => (
    <div className="flex flex-col items-center gap-1 min-w-[72px]">
        <div className={`w-10 h-14 rounded-b-full bg-gradient-to-b ${color.bg} border ${color.border} flex items-end justify-center pb-1 shadow-lg relative overflow-hidden`}>
            {/* Syringe plunger */}
            <div className={`absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-8 ${color.dot} opacity-30 rounded-full`} />
            <Syringe size={12} className={`${color.text} z-10 rotate-180`} />
        </div>
        <span className={`text-[9px] font-medium ${color.text} text-center leading-tight max-w-[72px] truncate`}>{name}</span>
    </div>
);

// Parse medicine names from the markdown tables in a disease response
const parseMedicines = (text) => {
    const tablets = [];
    const injections = [];

    if (!text) return { tablets, injections };

    // Extract from tablets section
    const tabletSection = text.match(/### 💊[^\n]*\n([\s\S]*?)(?=###|$)/);
    if (tabletSection) {
        const rows = tabletSection[1].match(/\|([^|]+)\|/g) || [];
        rows.forEach(row => {
            const name = row.replace(/\|/g, '').trim();
            if (name && !name.match(/medication|dosage|purpose|---|-|\*\*/i) && name.length > 2 && name.length < 40) {
                tablets.push(name.split('(')[0].trim().split('/')[0].trim());
            }
        });
    }

    // Extract from injections section
    const injectionSection = text.match(/### 💉[^\n]*\n([\s\S]*?)(?=###|$)/);
    if (injectionSection) {
        const rows = injectionSection[1].match(/\|([^|]+)\|/g) || [];
        rows.forEach(row => {
            const name = row.replace(/\|/g, '').trim();
            if (name && !name.match(/medication|route|purpose|---|-|\*\*/i) && name.length > 2 && name.length < 40) {
                injections.push(name.split('(')[0].trim().split('/')[0].trim().split(' ')[0]);
            }
        });
    }

    return {
        tablets: [...new Set(tablets)].slice(0, 6),
        injections: [...new Set(injections)].slice(0, 4)
    };
};

const MedicineCard = ({ text }) => {

  const [images, setImages] = React.useState({});
    const { tablets, injections } = parseMedicines(text);

    if (tablets.length === 0 && injections.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 mb-2"
        >
            {/* Tablets */}
            {tablets.length > 0 && (
                <div className="mb-3">
                    <div className="flex items-center gap-1.5 mb-2">
                        <Pill size={13} className="text-cyan-400" />
                        <span className="text-xs font-semibold text-cyan-400">Tablets / Oral Medications</span>
                    </div>
                    <div className="flex flex-wrap gap-3 bg-slate-800/40 rounded-xl p-3 border border-white/5">
                        {tablets.map((name, i) => {
                            const color = getMedicineColor(name);
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.05 * i }}
                                >
                                    <PillVisual name={name} color={color} />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Injections */}
            {injections.length > 0 && (
                <div>
                    <div className="flex items-center gap-1.5 mb-2">
                        <Syringe size={13} className="text-violet-400" />
                        <span className="text-xs font-semibold text-violet-400">Injections / IV Medications</span>
                    </div>
                    <div className="flex flex-wrap gap-3 bg-slate-800/40 rounded-xl p-3 border border-white/5">
                        {injections.map((name, i) => {
                            const color = getMedicineColor(name);
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.05 * i }}
                                >
                                    <InjectionVisual name={name} color={color} />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            <p className="text-[10px] text-slate-600 mt-2 flex items-center gap-1">
                <Shield size={9} />
                Always verify medication with a licensed pharmacist.
            </p>
        </motion.div>
    );
};

export default MedicineCard;
