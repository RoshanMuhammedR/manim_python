// scene.controller.js
import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getScenePrompt = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert Manim code generator. Generate only clean Python code for the scene. The code should generate only one video as o/p. No explanation.Do not include `````python``` tags or any other formatting (include imports). Also make sure to create the code such that when the user copy paste the code it should run without any error and should not require any additional imports or modifications. Also add the code to run the scene at the end. Do not include any comments in the code.",
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const manimCode = chatCompletion.choices[0]?.message?.content;

    return res.status(200).json({
      message: "Scene created successfully!",
      manimCode: manimCode
    });

  } catch (error) {
    console.error("Error in getScenePrompt:", error);
    return res.status(500).json({ error: "Failed to generate scene." });
  }
};
