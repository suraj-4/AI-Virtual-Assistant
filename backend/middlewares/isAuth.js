import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    // ✅ Get token from cookie or header
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // ✅ Verify token
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user ID to request
    req.userId = verifyToken.userId;

    // Continue to next middleware
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuth;
