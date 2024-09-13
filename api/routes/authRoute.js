import express from 'express'
import { signout, signup, singin } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', singin)
router.get('/signout', signout)



export default router; 