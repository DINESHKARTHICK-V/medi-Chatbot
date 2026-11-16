import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
    return (
        <div className="flex space-x-1 items-center p-2">
            {[0, 1, 2].map((dot) => (
                <motion.div
                    key={dot}
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: dot * 0.2,
                    }}
                />
            ))}
        </div>
    );
};

export default TypingIndicator;
