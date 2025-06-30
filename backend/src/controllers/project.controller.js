import Project from "../models/project.model.js";
import Scene from '../models/scene.model.js';
import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


export const createProject = async (req,res) => {
    const {projName,projDesc} = req.body;
    try {
        if(!projName || projName.length < 3){
            return res.status(400).json({message:'Bad User Input'});
        }

        const newProj = new Project({
            projName,
            projDesc,
            createdBy:req.user._id
        });
        await newProj.save();
        return res.status(201).json(newProj);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

export const getProjects = async (req,res)=> {
    const user_id = req.user._id;
    try {
        if(!user_id){
            return res.status(401).json({message:"Not authenticated"});
        }
        const projects = await Project.find({createdBy:user_id});
        res.status(201).json({data:projects});
    } catch (error) {
        console.log(error);
    }
}


export const getScene = async (req, res) => {
  const proj_id = req.params.id;
  try {
    let scene = await Scene.findOne({ project: proj_id });

    if (!scene) {
      scene = new Scene({ project: proj_id });
      await scene.save(); 
    }
    return res.status(200).json(scene);
  } catch (error) {
    console.error('Error in getScene:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getCode = async (req, res) => {
  const { prompt, id } = req.body;

  if (!prompt || !id) {
    return res.status(400).json({ error: "Prompt and scene ID are required" });
  }

  try {
    // Push user prompt to chatHistory
    await Scene.findByIdAndUpdate(id, {
      $push: {
        chatHistory: { role: "user", content: prompt }
      }
    });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an elite Manim animation specialist. Your task is to generate production-ready Python code that creates stunning mathematical animations.

OUTPUT FORMAT:
- Pure Python code only - no markdown blocks, no \`\`\`python\`\`\` tags, no formatting
- Complete, executable code that runs immediately when copy-pasted
- Single scene output generating exactly one video file
- Zero comments or explanations in code

CODE STRUCTURE:
- Include ALL necessary imports at the top
- Define one Scene class inheriting from Scene
- Implement construct() method with complete animation logic
- Do not include any execution command or function call at the end. Only define the scene class.


TECHNICAL STANDARDS:
- Use latest Manim syntax and best practices
- Optimize for smooth 60fps playback
- Implement proper timing with self.wait() calls
- Use efficient animation methods (Transform, FadeIn, Write, etc.)
- Handle object positioning with proper coordinate systems

ANIMATION QUALITY:
- Create visually compelling mathematical demonstrations
- Use appropriate colors, fonts, and styling
- Implement smooth transitions between concepts
- Balance information density with visual clarity
- Add subtle but effective camera movements when beneficial
- Ensure NO text overlaps with diagrams, graphs, or visual elements
- Position text strategically with proper spacing and clear separation from graphics

ERROR PREVENTION:
- Ensure all objects are properly defined before use
- Use correct Manim object types and methods
- Handle text rendering with appropriate fonts
- Implement proper layering and z-index management
- Test mathematical expressions for syntax correctness

EXECUTION READY:
- No additional imports required beyond standard Manim
- No external files or dependencies needed
- Code runs without modification or setup
- Generates clean MP4 output file

Generate code that demonstrates mathematical concepts through elegant, professional animations that could be used in educational content or presentations.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const manimCode = chatCompletion.choices[0]?.message?.content;

    // Push system response to chatHistory
    await Scene.findByIdAndUpdate(id, {
      $push: {
        chatHistory: { role: "system", content: manimCode }
      }
    });

    return res.status(200).json({
      message: "Scene created successfully!",
      manimCode: manimCode
    });

  } catch (error) {
    console.error("Error in getCode:", error);
    return res.status(500).json({ error: "Failed to generate scene." });
  }
};
