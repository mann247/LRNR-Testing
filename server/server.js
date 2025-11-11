import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());
app.use(
    cors({
        origin: 'https://lrnr-app-85pj.onrender.com/',
    })
);

// Generate questions endpoint
app.post('/api/questions', async (req, res) => {
    try {
        const { topic, expertise, numberOfQuestions, style } = req.body;

        if (!topic || !expertise) {
            return res
                .status(400)
                .json({ error: 'Topic and expertise are required' });
        }

        // Create a prompt for OpenAI to generate questions
        const prompt = `Generate ${numberOfQuestions} ${style} quiz questions about ${topic} for a ${expertise} level learner. 
        
        Return ONLY a JSON array of question strings. Do not include any explanations, numbering, or additional text.
        
        Example format:
        ["Question 1 text here?", "Question 2 text here?", "Question 3 text here?"]
        
        Make sure questions are clear, specific, and appropriate for the ${expertise} expertise level.`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a quiz generator that creates educational questions. Always respond with valid JSON arrays of questions only.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });

        const responseText = completion.choices[0].message.content.trim();

        // Parse the JSON response
        let questions;
        try {
            // Remove markdown code blocks if present
            const cleanedResponse = responseText.replace(
                /```json\n?|\n?```/g,
                ''
            );
            questions = JSON.parse(cleanedResponse);
        } catch (parseError) {
            console.error('Failed to parse OpenAI response:', responseText);
            return res.status(500).json({
                error: 'Failed to parse questions from AI response',
                details: responseText,
            });
        }

        if (!Array.isArray(questions)) {
            return res
                .status(500)
                .json({ error: 'Invalid response format from AI' });
        }

        res.json({ questions });
    } catch (error) {
        console.error('Error generating questions:', error);
        res.status(500).json({
            error: 'Failed to generate questions',
            details: error.message,
        });
    }
});

// Evaluate answers endpoint
app.post('/api/evaluate', async (req, res) => {
    try {
        const { answers } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: 'Answers array is required' });
        }

        // Create evaluation prompt
        const evaluationPrompt = `Evaluate the following quiz answers and determine how many are correct. 
        Be lenient with minor spelling errors or slight variations in wording, but the core answer must be correct.
        
        ${answers
            .map(
                (item, idx) => `
        Question ${idx + 1}: ${item.question}
        User's Answer: ${item.answer}
        `
            )
            .join('\n')}
        
        Respond with ONLY a JSON object in this exact format:
        {"score": X, "evaluations": [{"correct": true/false, "feedback": "brief feedback"}]}
        
        Where X is the number of correct answers.`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a quiz evaluator. Always respond with valid JSON only. Be fair but lenient with minor errors.',
                },
                {
                    role: 'user',
                    content: evaluationPrompt,
                },
            ],
            temperature: 0.3,
            max_tokens: 1500,
        });

        const responseText = completion.choices[0].message.content.trim();

        // Parse the evaluation response
        let evaluation;
        try {
            const cleanedResponse = responseText.replace(
                /```json\n?|\n?```/g,
                ''
            );
            evaluation = JSON.parse(cleanedResponse);
        } catch (parseError) {
            console.error('Failed to parse evaluation response:', responseText);
            // Fallback: count answers generously
            return res.json({
                score: Math.floor(answers.length / 2),
                evaluations: [],
            });
        }

        res.json({
            score: evaluation.score || 0,
            evaluations: evaluation.evaluations || [],
        });
    } catch (error) {
        console.error('Error evaluating answers:', error);
        res.status(500).json({
            error: 'Failed to evaluate answers',
            details: error.message,
        });
    }
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
