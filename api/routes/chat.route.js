import express from 'express';
import { addMember, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachment } from '../controllers/chat.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { attachmentsMulter, singleAvatar } from '../middlewares/multer.js';
import { addMemberValidator, getChatDetailsValidator, getMessagesValidator, leaveGroupValidator, newGroupChatValidator, removeMembersValidator, sendAttachmentValidator, validateHandler } from '../lib/validator.js';


const router = express.Router();

router.post("/new",newGroupChatValidator(),validateHandler,verifyToken,newGroupChat)
router.get("/my",verifyToken,getMyChats)
router.get("/my/groups",verifyToken,getMyGroups)
router.put("/addMembers",addMemberValidator(),validateHandler,verifyToken,addMember)
router.put("/removeMembers",removeMembersValidator(),validateHandler,verifyToken,removeMembers)
router.delete('/leave/:id',leaveGroupValidator(),validateHandler,verifyToken,leaveGroup)
router.post('/message',sendAttachmentValidator(),validateHandler,verifyToken,attachmentsMulter,sendAttachment)
router.get('/message/:id',getMessagesValidator(),validateHandler,verifyToken,getMessages)
router.route('/:id').get(getChatDetailsValidator(),validateHandler,getChatDetails).put(verifyToken,renameGroup).delete(verifyToken,deleteChat)
export default router