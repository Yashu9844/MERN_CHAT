import express from 'express';
import { allChats, allMessages, allUsers, getDashBoardStats } from '../controllers/admin.controller.js';


const router = express.Router();

router.get('/users',allUsers);
router.get('/chats',allChats);
router.get('/messages',allMessages);
router.get('/stats',getDashBoardStats)


export default router