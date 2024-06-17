import express from 'express';
import { test, newUser, logout, login, getMyProfile, searchUser } from '../controllers/user.controller.js';
import { multerUpload } from '../middlewares/multer.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/', test);
router.post('/sign-up', multerUpload.single('avatar'), newUser);
router.get('/log-out',verifyToken,  logout); // Protect the logout route with verifyToken
router.post('/log-in', login); // Do not use verifyToken here
router.get('/me',verifyToken,getMyProfile);
router.get('/search',verifyToken, searchUser);

export default router;
