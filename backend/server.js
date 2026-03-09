import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import connect from './auth/connectDB.js';
import applicantRoutes from './routes/applicantRoutes.js';
import { config as cloudinaryConfig } from './auth/cloudinary.js';
import verifyToken from './middleware/jwtAuth.js';
import User from './models/applicant.js';
const app = express();
cloudinaryConfig();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/applicant", applicantRoutes);
const PORT = process.env.PORT;
app.get("/me", verifyToken, async (req, res) => {
    const user = await User.findById(req.user?.id).select("-password");
    res.json({
        success: true,
        user: {
            name: user?.name,
            email: user?.email,
            phone: user?.phone
        }
    });
});
connect()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
//# sourceMappingURL=server.js.map