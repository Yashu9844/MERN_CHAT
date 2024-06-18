import express from 'express';
import { getMyChats, newGroupChat } from '../controllers/chat.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/new",verifyToken,newGroupChat)
router.get("/my",verifyToken,getMyChats)

export default router