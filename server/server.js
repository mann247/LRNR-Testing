import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import OpenAI from 'openai';

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173', // Remember to update once hosted
        methods: ['POST', 'GET'],
    })
);

app.post('/api/questions', async (req, res) => {
    const { topic, expertise, numQuestions, style } = req.body;

    const prompt = `
  You are a quiz generator.
  Generate ${numQuestions} questions about "${topic}" 
  at a(n) "${expertise}" level in the style of "${style}".
  Return strictly in JSON format:
  {
    "questions": [
      { "id": 1, "question": "..." },
      ...
    ]
  }
  Do not include answers.
  `;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
        });

        const content = completion.choices[0].message.content.trim();

        // Try parsing the AI response
        let data;
        try {
            const jsonStr = content.slice(
                content.indexOf('{'),
                content.lastIndexOf('}') + 1
            );
            data = JSON.parse(jsonStr);
        } catch (err) {
            console.error('JSON Parse Error:', err);
            return res
                .status(500)
                .json({ error: 'Invalid response format from OpenAI' });
        }

        res.json(data);
    } catch (err) {
        console.error('OpenAI Error:', err);
        res.status(500).json({ error: 'Failed to generate quiz questions' });
    }
});

app.post('/api/evaluate', async (req, res) => {
    const { question, answer } = req.body;

    const evalPrompt = `
  You are a quiz evaluator.
  Grade how well the user's answer addresses the question.
  Be flexible and understanding, focusing on intent rather than strict phrasing.
  Respond strictly in this JSON format:
  {
    "correct": true/false,
    "feedback": "Your feedback here",
    "percent": number (0-100)
  }
  
  Question: ${question}
  User Answer: ${answer}
  `;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: evalPrompt }],
        });

        const content = completion.choices[0].message.content.trim();

        let result;
        try {
            const jsonStr = content.slice(
                content.indexOf('{'),
                content.lastIndexOf('}') + 1
            );
            result = JSON.parse(jsonStr);
        } catch (err) {
            console.error('JSON Parse Error:', err);
            return res
                .status(500)
                .json({ error: 'Invalid response format from OpenAI' });
        }

        res.json(result);
    } catch (err) {
        console.error('Evaluation Error:', err);
        res.status(500).json({ error: 'Failed to evaluate answer' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
