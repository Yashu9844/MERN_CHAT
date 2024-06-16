import express from 'express';
import { test ,newUser, logout, login} from '../controllers/user.controller.js';
import { multerUpload } from '../middlewares/multer.js';

const router = express.Router();

router.get('/',test);
router.post('/sign-up',multerUpload.single("avatar"), newUser)
router.post('/log-out',logout)
router.post('/log-in',login)

export default router;