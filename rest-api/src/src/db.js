import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";

const { PrismaClient } = pkg;
dotenv.config();

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
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
