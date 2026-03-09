import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }
        const secret = process.env.JWT_SECRET;
        try {
            const decoded = jwt.verify(token, secret);
            req.user = decoded;
            console.log(decoded);
        }
        catch (e) {
            console.log('Error at token verification');
            return res.status(403).json({ message: "Invalid token" });
        }
        next();
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
export default verifyToken;
//# sourceMappingURL=jwtAuth.js.map