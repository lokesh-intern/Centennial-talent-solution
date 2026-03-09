import { Router } from 'express'
import {
    loginController,
    registerController,
} from '../controllers/applicantController.ts';
import upload from '../middleware/multer.ts'
import verifyToken from '../middleware/jwtAuth.ts';
const router = Router();

router.use('/login',loginController);
router.use('/register',upload.single('resume'),registerController);

router.use('/job-apply',verifyToken,upload.single('resume'),registerController);

export default router