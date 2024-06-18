import express from 'express';
import { newGroupChat } from '../controllers/chat.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/new",verifyToken,newGroupChat)


export default router