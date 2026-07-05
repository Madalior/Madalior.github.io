import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { contents } = req.body;
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents, // Array of { role: "user" | "model", parts: [{ text: string }] }
        config: {
          systemInstruction: "You are an expert on Indian government exams, eligibility criteria, cut-offs, and preparation strategies. Provide helpful, accurate, and concise information. If the user asks general questions, answer them politely.",
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
