import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBodyTypeResultSchema } from "@shared/schema";
import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Body type analysis endpoint
  app.post("/api/analyze-body-type", upload.array('photos', 3), async (req, res) => {
    try {
      const { gender, answers } = req.body;
      const photos = req.files as Express.Multer.File[];
      
      if (!gender || !answers) {
        return res.status(400).json({ message: "Gender and answers are required" });
      }
      
      let parsedAnswers;
      try {
        parsedAnswers = typeof answers === 'string' ? JSON.parse(answers) : answers;
      } catch (error) {
        return res.status(400).json({ message: "Invalid answers format" });
      }
      
      // Simple body type analysis based on answers
      const result = analyzeBodyType(parsedAnswers, gender);
      
      // Store the result
      const bodyTypeResult = await storage.createBodyTypeResult({
        gender,
        answers: parsedAnswers,
        photos: photos && photos.length > 0 ? photos.map(file => ({
          originalName: file.originalname,
          size: file.size,
          mimetype: file.mimetype
        })) : null,
        result
      });
      
      res.json({
        id: bodyTypeResult.id,
        result
      });
      
    } catch (error) {
      console.error("Body type analysis error:", error);
      res.status(500).json({ message: "Analysis failed" });
    }
  });

  // Get body type result by ID
  app.get("/api/body-type-result/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await storage.getBodyTypeResult(id);
      
      if (!result) {
        return res.status(404).json({ message: "Result not found" });
      }
      
      res.json(result);
    } catch (error) {
      console.error("Get result error:", error);
      res.status(500).json({ message: "Failed to get result" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Body type analysis algorithm
function analyzeBodyType(answers: number[], gender: string) {
  const scores = { straight: 0, wave: 0, natural: 0 };
  
  // Score based on answers (0=straight, 1=wave, 2=natural)
  answers.forEach((answer, index) => {
    if (answer === 0) scores.straight++;
    else if (answer === 1) scores.wave++;
    else if (answer === 2) scores.natural++;
  });
  
  // Determine primary type
  const maxScore = Math.max(scores.straight, scores.wave, scores.natural);
  const primaryTypes = Object.keys(scores).filter(type => scores[type as keyof typeof scores] === maxScore);
  
  let bodyType: string;
  let confidence: number;
  
  if (primaryTypes.length > 1) {
    // Mixed type
    bodyType = `${primaryTypes[0]}-${primaryTypes[1]}`;
    confidence = (maxScore / answers.length) * 100;
  } else {
    bodyType = primaryTypes[0];
    confidence = (maxScore / answers.length) * 100;
  }
  
  return {
    type: bodyType,
    primary: primaryTypes[0],
    secondary: primaryTypes.length > 1 ? primaryTypes[1] : null,
    scores,
    confidence: Math.round(confidence),
    gender
  };
}
