import jwt from "jsonwebtoken";

export const generateToken = async (userID, res) => {
  const payload = { id: userID };
  const token = jwt.sign(payload, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  // implement cookies
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return token;
};
