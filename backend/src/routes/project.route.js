import express from "express";
import { protectRoute } from "../midlewear/auth.midlewear.js";
import { createProject, getCode, getProjects, getScene,  } from "../controllers/project.controller.js";

const router = express.Router();

router.post('/newproj',protectRoute,createProject);
router.get('/all',protectRoute,getProjects);
router.get('/scene/:id',protectRoute,getScene);
router.post('/getcode',protectRoute,getCode)

export default router