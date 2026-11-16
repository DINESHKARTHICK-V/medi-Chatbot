import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Globe, RefreshCw, ExternalLink } from 'lucide-react';

const levelColors = {
    high: 'text-red-400 bg-red-950/40 border-red-900/50',
    warning: 'text-yellow-400 bg-yellow-950/40 border-yellow-900/50',
    watch: 'text-blue-400 bg-blue-950/40 border-blue-900/50',
    active: 'text-orange-400 bg-orange-950/40 border-orange-900/50',
};

const levelDots = {
    high: 'bg-red-400',
    warning: 'bg-yellow-400',
    watch: 'bg-blue-400',
    active: 'bg-orange-400',
};

const AwarenessPanel = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/awareness');
            if (res.ok) {
                const json = await res.json();
                setData(json);
                setLastUpdate(new Date().toLocaleTimeString());
            }
        } catch {
            // Fallback static data if backend is unreachable
            setData({
                alerts: [
                    { title: 'COVID-19', region: 'Global', level: 'active', whoLink: 'https://www.who.int/health-topics/coronavirus' },
                    { title: 'Mpox', region: 'Global', level: 'warning', whoLink: 'https://www.who.int/health-topics/monkeypox' },
                    { title: 'Dengue Fever', region: 'Tropical Regions', level: 'warning', whoLink: 'https://www.who.int/health-topics/dengue-and-severe-dengue' },
                    { title: 'Cholera', region: 'Africa, Asia', level: 'watch', whoLink: 'https://www.who.int/health-topics/cholera' },
                ],
            });
            setLastUpdate(new Date().toLocaleTimeString());
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5 * 60 * 1000); // refresh every 5 min
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="px-2 py-3">
            <div className="flex items-center justify-between px-2 mb-2">
                <div className="flex items-center gap-1.5">
                    <Globe size={12} className="text-cyan-500" />
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Global Outbreaks
                    </span>
                </div>
                <button
                    onClick={fetchData}
                    className="text-slate-500 hover:text-cyan-400 transition-colors"
                    title="Refresh"
                >
                    <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            {loading && !data ? (
                <div className="space-y-1.5 px-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-8 bg-slate-800/50 rounded-lg animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="space-y-1">
                    {data?.alerts?.map((alert, i) => (
                        <motion.a
                            key={i}
                            href={alert.whoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs group hover:brightness-110 transition-all cursor-pointer ${levelColors[alert.level] || levelColors.watch}`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${levelDots[alert.level] || levelDots.watch} ${alert.level === 'high' ? 'animate-pulse' : ''}`} />
                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate leading-tight">{alert.title}</p>
                                <p className="text-[10px] opacity-70 truncate">{alert.region}</p>
                            </div>
                            <ExternalLink size={10} className="opacity-50 group-hover:opacity-100 flex-shrink-0" />
                        </motion.a>
                    ))}
                </div>
            )}

            {lastUpdate && (
                <p className="text-[9px] text-slate-600 px-2 mt-2">
                    Updated · {lastUpdate} · WHO Data
                </p>
            )}
        </div>
    );
};

export default AwarenessPanel;
