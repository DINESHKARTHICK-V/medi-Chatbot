import { readJSON } from '../utils/fileDb.js';
import https from 'https';

export const getOutbreaks = async () => {
    // Try fetching live COVID data to augment static dataset
    let liveCovidData = null;
    try {
        liveCovidData = await new Promise((resolve, reject) => {
            https.get('https://disease.sh/v3/covid-19/all', (res) => {
                let data = '';
                res.on('data', chunk => { data += chunk; });
                res.on('end', () => {
                    try { resolve(JSON.parse(data)); }
                    catch { resolve(null); }
                });
            }).on('error', () => resolve(null));
        });
    } catch { /* silent fallback */ }

    const staticAlerts = readJSON('outbreaks.json');

    const outbreaks = [];
    if (liveCovidData) {
        outbreaks.push({
            name: "COVID-19",
            cases: liveCovidData.cases?.toLocaleString() || "N/A",
            deaths: liveCovidData.deaths?.toLocaleString() || "N/A",
            recovered: liveCovidData.recovered?.toLocaleString() || "N/A",
            trend: "active",
            whoLink: "https://www.who.int/health-topics/coronavirus",
            severity: "high"
        });
    }

    return {
        outbreaks,
        alerts: staticAlerts,
        lastUpdated: new Date().toISOString()
    };
};
