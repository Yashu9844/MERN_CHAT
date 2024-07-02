import express from 'express';
import { allChats, allMessages, allUsers } from '../controllers/admin.controller.js';


const router = express.Router();

router.get('/users',allUsers);
router.get('/chats',allChats);
router.get('/messages',allMessages)


export default router