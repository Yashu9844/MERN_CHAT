import express from 'express';
import { addMember, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers } from '../controllers/chat.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/new",verifyToken,newGroupChat)
router.get("/my",verifyToken,getMyChats)
router.get("/my/groups",verifyToken,getMyGroups)
router.put("/addMembers",verifyToken,addMember)
router.put("/removeMembers",verifyToken,removeMembers)
router.delete('/leave/:id',leaveGroup)

export default router