import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token, auth denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // ✅ Pass user ID for downstream use
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticate;
