import { prisma } from "../../src/db.js";
import bcrypt from "bcryptjs";

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
  const newUser = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: newUser.id,
        name: name,
        email: email,
      },
    },
  });
};

export { register };
