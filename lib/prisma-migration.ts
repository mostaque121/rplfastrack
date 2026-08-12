import { PrismaClient } from "@/app/generated/prisma";
// OLD DB
export const oldPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_OLD!,
    },
  },
});

// NEW DB
export const newPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
});
