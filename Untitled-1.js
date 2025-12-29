// server.js
// تشغيل: npm init -y
//        npm i express node-fetch dotenv
// ثم:   export OPENAI_API_KEY="sk-..."  (أو استخدم .env)

import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public')); // لو بتخزن chatbot.html في مجلد public

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
    console.error('Missing OPENAI_API_KEY in env');
    process.exit(1);
}

// نقطة النهاية التي يطلبها الـ frontend
app.post('/api/chat', async(req, res) => {
    try {
        const userMessage = (req.body && req.body.message) ? req.body.message : '';
        if (!userMessage) return res.status(400).send('Empty message');

        // بناء المحادثة (يمكن توسعته لإرسال history للمحادثات الطويلة)
        const payload = {
            model: "gpt-4.1-mini", // نموذج قوي وقابل للاستخدام في الإنتاج؛ أو استخدم "gpt-4.1" إذا متاح
            messages: [
                { role: "system", content: "You are a helpful, concise Arabic-speaking assistant. Respond in Arabic unless user asks otherwise." },
                { role: "user", content: userMessage }
            ],
            max_tokens: 800,
            temperature: 0.2
        };

        const r = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + OPENAI_KEY
            },
            body: JSON.stringify(payload)
        });

        if (!r.ok) {
            const txt = await r.text();
            console.error('OpenAI error', txt);
            return res.status(500).send('OpenAI API error');
        }

        const data = await r.json();
        const reply = data.choices ? .[0] ? .message ? .content ? ? 'لا يوجد رد.';
        res.json({ reply });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port', port));