/*
  Warnings:

  - The values [system,message,form_submission] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `senderId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the `_NotificationRecipients` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('response', 'eligibility');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "NotificationType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_senderId_fkey";

-- DropForeignKey
ALTER TABLE "_NotificationRecipients" DROP CONSTRAINT "_NotificationRecipients_A_fkey";

-- DropForeignKey
ALTER TABLE "_NotificationRecipients" DROP CONSTRAINT "_NotificationRecipients_B_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "senderId",
ADD COLUMN     "recipients" TEXT[];

-- DropTable
DROP TABLE "_NotificationRecipients";
