import express from 'express';
import { getScenePrompt } from '../controllers/scene.controller.js';


const router = express.Router();


router.post('/scene',getScenePrompt)

export default router;