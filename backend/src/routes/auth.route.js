import express from 'express'
import { checkAuth, signin, signup } from '../controllers/auth.controller.js'
import { protectRoute } from '../midlewear/auth.midlewear.js';

const router = express.Router()

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/check',protectRoute,checkAuth)

export default router