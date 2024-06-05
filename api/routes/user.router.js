import express from 'express';
import { newUser, test } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/',test);
router.post('/', newUser)

export default router;