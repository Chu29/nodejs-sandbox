import { prisma } from "../config/db.js";

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract the token from the Authorization header
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    // verify if token is valid and extract the userId from the req header
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.users.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { authMiddleware };
