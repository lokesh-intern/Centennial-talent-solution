import { Router } from 'express';
import { loginController, registerController, } from '../controllers/applicantController.js';
import upload from '../middleware/multer.js';
import verifyToken from '../middleware/jwtAuth.js';
const router = Router();
router.use('/login', loginController);
router.use('/register', upload.single('resume'), registerController);
router.use('/job-apply', verifyToken, upload.single('resume'), registerController);
export default router;
//# sourceMappingURL=applicantRoutes.js.map