import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});

// handle db connection
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log(`Database connected successfully via Prisma`);
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

// handle db disconnect
const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log(`Database disconnected successfully via Prisma`);
  } catch (error) {
    console.error(`Database disconnection failed: ${error.message}`);
    process.exit(1);
  }
};

export { prisma, connectDB, disconnectDB };
