import express from 'express';
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getAllAdmin, getDashBoardStats } from '../controllers/admin.controller.js';
import { adminLoginValidator, validateHandler } from '../lib/validator.js';
import { adminOnly } from '../utils/verifyUser.js';


const router = express.Router();
router.post('/verify',adminLoginValidator(),validateHandler,adminLogin)
router.get('/logout',adminLogout)
router.use(adminOnly)

router.get('/',getAllAdmin)
router.get('/users',allUsers);
router.get('/chats',allChats);
router.get('/messages',allMessages);
router.get('/stats',getDashBoardStats)

export default router