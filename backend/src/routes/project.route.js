import express from "express";
import { protectRoute } from "../midlewear/auth.midlewear.js";
import { createProject, getProjects } from "../controllers/project.controller.js";

const router = express.Router();

router.post('/newproj',protectRoute,createProject);
router.get('/all',protectRoute,getProjects);

export default router