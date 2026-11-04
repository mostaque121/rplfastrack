import "server-only";
import type { prisma } from "@/server/db";

// The (Accelerate-extended) client passed to prisma.$transaction callbacks.
export type TransactionClient = Parameters<
  Extract<Parameters<typeof prisma.$transaction>[0], (...args: never[]) => unknown>
>[0];

/**
 * Saves a 301 from an old URL to a new one, inside the transaction that
 * changes the link. Keeps the table chain-free: anything that pointed at the
 * old URL now points at the new one, and the new URL is never redirected.
 */
export async function recordRedirect(tx: TransactionClient, fromPath: string, toPath: string) {
  await tx.redirect.deleteMany({ where: { fromPath: toPath } });
  await tx.redirect.updateMany({
    where: { toPath: fromPath },
    data: { toPath },
  });
  await tx.redirect.upsert({
    where: { fromPath },
    create: { fromPath, toPath },
    update: { toPath },
  });
}
