import { readJSON } from '../utils/fileDb.js';

export const detectSymptoms = (userMessage) => {
    const symptomsDb = readJSON('symptoms.json');
    const lowerMessage = userMessage.toLowerCase();
    const detectedSymptoms = [];

    for (const [symptomKey, keywords] of Object.entries(symptomsDb)) {
        if (keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))) {
            detectedSymptoms.push(symptomKey);
        }
    }

    return detectedSymptoms;
};
