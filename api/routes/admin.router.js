import express from 'express';
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getDashBoardStats } from '../controllers/admin.controller.js';
import { adminLoginValidator, validateHandler } from '../lib/validator.js';


const router = express.Router();

router.get('/users',allUsers);
router.get('/chats',allChats);
router.get('/messages',allMessages);
router.get('/stats',getDashBoardStats)
router.post('/verify',adminLoginValidator(),validateHandler,adminLogin)
router.get('/logout',adminLogout)

export default router