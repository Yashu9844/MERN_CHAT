import express from 'express';
import { addMember, getChatDetails, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachment } from '../controllers/chat.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { attachmentsMulter } from '../middlewares/multer.js';

const router = express.Router();

router.post("/new",verifyToken,newGroupChat)
router.get("/my",verifyToken,getMyChats)
router.get("/my/groups",verifyToken,getMyGroups)
router.put("/addMembers",verifyToken,addMember)
router.put("/removeMembers",verifyToken,removeMembers)
router.delete('/leave/:id',verifyToken,leaveGroup)
router.post('/message',verifyToken,attachmentsMulter,sendAttachment)
router.route('/:id').get(getChatDetails).put(verifyToken,renameGroup).post()
export default router