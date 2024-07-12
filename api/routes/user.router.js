import express from 'express';
import { test, newUser, logout, login, getMyProfile, searchUser, sendRequest, acceptRequest, getAllNotifications, getMyFriends } from '../controllers/user.controller.js';
import { multerUpload } from '../middlewares/multer.js';
import { verifyToken } from '../utils/verifyUser.js';
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validateHandler } from '../lib/validator.js';


const router = express.Router();

router.get('/', test);
router.post('/sign-up',registerValidator(),validateHandler, newUser);
router.get('/log-out',verifyToken,  logout); // Protect the logout route with verifyToken
router.post('/log-in',loginValidator(),validateHandler, login); // Do not use verifyToken here
router.get('/me',verifyToken,getMyProfile);
router.get('/search',verifyToken, searchUser);
router.put('/send',sendRequestValidator(),validateHandler,verifyToken,sendRequest)
router.put('/accept',acceptRequestValidator(),validateHandler,verifyToken,acceptRequest)
router.get('/notifications',verifyToken,getAllNotifications)
router.get('/friends',verifyToken,getMyFriends)

export default router;
