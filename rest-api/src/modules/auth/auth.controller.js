import { prisma } from "../../src/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExist = await prisma.users.findUnique({ where: { email: email } });

  if (userExist) {
    return res
      .status(400)
      .json({ message: `User with email ${email} already exists` });
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // generate jwt token
  const token = await generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: name,
        email: email,
      },
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user data is valid
  const user = await prisma.users.findUnique({ where: { email: email } });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // generate jwt token
  const token = await generateToken(user.id, res);

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: email,
      },
      token,
    },
  });
};

export { register, login };
