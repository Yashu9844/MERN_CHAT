import express from 'express';
import { allChats, allUsers } from '../controllers/admin.controller.js';


const router = express.Router();

router.get('/users',allUsers);
router.get('/chats',allChats)


export default router