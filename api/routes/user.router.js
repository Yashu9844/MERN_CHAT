import express from 'express';
import { test ,newUser} from '../controllers/user.controller.js';
import { multerUpload } from '../middlewares/multer.js';

const router = express.Router();

router.get('/',test);
router.post('/new',multerUpload.single("avatar"), newUser)

export default router;