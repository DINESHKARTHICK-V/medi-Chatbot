import { readJSON } from '../utils/fileDb.js';

export const retrieveKnowledge = (detectedSymptoms, userProfile = null) => {
    const diseasesDb = readJSON('diseases.json');
    const matchedDiseases = [];

    // 1. Direct Symptom Matching (RAG Retrieval)
    diseasesDb.forEach(disease => {
        let matchCount = 0;
        detectedSymptoms.forEach(symptom => {
            if (disease.symptoms.includes(symptom)) {
                matchCount++;
            }
        });

        if (matchCount > 0) {
            matchedDiseases.push({
                ...disease,
                matchScore: matchCount
            });
        }
    });

    // Sort by most matching symptoms
    matchedDiseases.sort((a, b) => b.matchScore - a.matchScore);

    // Take top 2 matches to prevent context window overflow
    const topMatches = matchedDiseases.slice(0, 2);

    // 2. Profile-Based Risk Augmentation
    let riskContext = "";
    if (userProfile && userProfile.conditions && userProfile.conditions.length > 0) {
        riskContext = `\n[PROFILE CONTEXT: The user has pre-existing conditions: ${userProfile.conditions.join(', ')}. Factor this into your prevention and treatment advice. Avoid contraindications.]\n`;
    }

    // 3. Format context string for LLM
    if (topMatches.length === 0) {
        return {
            contextString: riskContext,
            primaryMatch: null
        };
    }

    let contextString = riskContext + "\n--- RETRIEVED MEDICAL KNOWLEDGE ---\n";
    topMatches.forEach(match => {
        contextString += `\nDisease: ${match.name}\nDescription: ${match.description}\nSeverity: ${match.severity}\nPrevention: ${match.prevention.join('; ')}\nTreatments: ${match.treatments.join('; ')}\n`;
    });
    contextString += "-----------------------------------\n";

    return {
        contextString,
        primaryMatch: topMatches[0]
    };
};
