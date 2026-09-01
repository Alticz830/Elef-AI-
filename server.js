import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
app.get('/'(req,res) =>{res.send('Server is running');});\
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, base64Media, mimeType } = req.body;
    const contents = [];

    if (base64Media && mimeType) {
      contents.push({
        inlineData: { data: base64Media, mimeType: mimeType }
      });
    }
    contents.push(prompt);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: "Hello! I am Elef. Always Ready to help you."
      }
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Sorry we coudn't fetch data try again:", error);
    res.status(500).json({ error: "Uh oh! Check you internet connection or try again." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Elef backend server running on port ${PORT}`);
});


