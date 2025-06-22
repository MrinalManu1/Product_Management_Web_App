import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error in verifyJWT middleware", error);
    res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};
