import express from 'express';
import { createUser } from '../controllers/user.controller.js';

const router = express.Router();

// Route to handle user signup
router.post('/', createUser);

export default router;
