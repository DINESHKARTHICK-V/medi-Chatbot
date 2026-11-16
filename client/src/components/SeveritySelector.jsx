import React from 'react';
import { ShieldCheck, ShieldAlert, Siren } from 'lucide-react';

const SeveritySelector = ({ onSelect }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 w-full animate-slide-up">
            <h3 className="text-xl font-bold mb-4 text-center text-cyan-400">
                How severe are your symptoms?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">

                {/* Low Severity */}
                <button
                    onClick={() => onSelect('Low')}
                    className="glass-panel p-6 rounded-xl flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300 cursor-pointer border-green-500/30 hover:border-green-400"
                >
                    <ShieldCheck size={48} className="text-green-400" />
                    <span className="text-lg font-semibold text-green-300">Mild / Low</span>
                    <p className="text-xs text-center text-gray-400">Minor discomfort, manageable with rest.</p>
                </button>

                {/* Medium Severity */}
                <button
                    onClick={() => onSelect('Medium')}
                    className="glass-panel p-6 rounded-xl flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300 cursor-pointer border-yellow-500/30 hover:border-yellow-400"
                >
                    <ShieldAlert size={48} className="text-yellow-400" />
                    <span className="text-lg font-semibold text-yellow-300">Moderate / Medium</span>
                    <p className="text-xs text-center text-gray-400">Noticeable pain or fever, requires monitoring.</p>
                </button>

                {/* High Severity */}
                <button
                    onClick={() => onSelect('High')}
                    className="glass-panel p-6 rounded-xl flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300 cursor-pointer border-red-500/30 hover:border-red-400 animate-pulse-glow"
                >
                    <Siren size={48} className="text-red-500" />
                    <span className="text-lg font-semibold text-red-400">Severe / High</span>
                    <p className="text-xs text-center text-gray-400">Extreme pain, difficulty breathing, emergency.</p>
                </button>

            </div>
        </div>
    );
};

export default SeveritySelector;
