import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/chat';

const testCases = [
    {
        name: 'Greeting (Hi)',
        message: 'Hi',
        shouldBeRefused: false
    },
    {
        name: 'Greeting (Good afternoon)',
        message: 'good afternoon',
        shouldBeRefused: false
    },
    {
        name: 'Medical Query (Flu)',
        message: 'What are the symptoms of flu?',
        shouldBeRefused: false
    },
    {
        name: 'Non-Medical Query (Wireless Charging)',
        message: 'How does wireless charging work with electromagnetic waves?',
        shouldBeRefused: true
    },
    {
        name: 'Non-Medical Query (Sports)',
        message: 'Who won the last World Cup?',
        shouldBeRefused: true
    },

    {
        name: 'Medical Query (Diabetes)',
        message: 'How to prevent diabetes?',
        shouldBeRefused: false
    },
    {
        name: 'Borderline Query (EMF Health)',
        message: 'Is electromagnetic radiation from chargers bad for my heart?',
        shouldBeRefused: false // Should answer health aspect
    }
];

async function runTests() {
    console.log('--- STARTING SCOPE VERIFICATION TESTS ---\n');

    for (const test of testCases) {
        process.stdout.write(`Testing: ${test.name}... `);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: test.message })
            });

            const data = await response.json();
            const reply = data.reply || '';

            const refused = reply.toLowerCase().includes('sorry') ||
                reply.toLowerCase().includes('only programmed for medical') ||
                reply.toLowerCase().includes('cannot assist') ||
                reply.toLowerCase().includes('medical assistant');

            if (refused === test.shouldBeRefused) {
                console.log('✅ PASS');
            } else {
                console.log('❌ FAIL');
                console.log(`   Message: ${test.message}`);
                console.log(`   Reply: ${reply.substring(0, 100)}...`);
            }
        } catch (err) {
            console.log(`❌ ERROR: ${err.message}`);
        }
    }

    console.log('\n--- VERIFICATION TESTS COMPLETED ---');
}

runTests();
