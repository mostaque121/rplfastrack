-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "QualificationStatus" AS ENUM ('CURRENT', 'SUPERSEDED');

-- CreateEnum
CREATE TYPE "LeadForm" AS ENUM ('HERO', 'RESPONSE', 'ELIGIBILITY', 'CONTACT');

-- CreateEnum
CREATE TYPE "CrmSyncStatus" AS ENUM ('PENDING', 'SYNCED', 'FAILED');

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "imageAlt" TEXT,
ADD COLUMN     "intro" TEXT,
ADD COLUMN     "metaTitle" TEXT;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "code" TEXT,
ADD COLUMN     "deliveryMode" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "evidenceExamples" TEXT,
ADD COLUMN     "heroIntro" TEXT,
ADD COLUMN     "imageAlt" TEXT,
ADD COLUMN     "isPopular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "licensingInfo" TEXT,
ADD COLUMN     "qualificationStatus" "QualificationStatus" NOT NULL DEFAULT 'CURRENT',
ADD COLUMN     "replacedById" TEXT,
ADD COLUMN     "searchAliases" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "status" "PublishStatus" NOT NULL DEFAULT 'PUBLISHED',
ADD COLUMN     "whoIsItFor" TEXT;

-- Existing courses are live, so they were added as PUBLISHED above;
-- courses created from now on start as DRAFT.
ALTER TABLE "Course" ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,
    "courseId" TEXT,
    "sectionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "form" "LeadForm" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "interest" TEXT,
    "message" TEXT,
    "details" JSONB,
    "landingPage" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "gclid" TEXT,
    "fbclid" TEXT,
    "device" TEXT,
    "crmStatus" "CrmSyncStatus" NOT NULL DEFAULT 'PENDING',
    "crmError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Faq_courseId_idx" ON "Faq"("courseId");

-- CreateIndex
CREATE INDEX "Faq_sectionId_idx" ON "Faq"("sectionId");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "Lead_crmStatus_idx" ON "Lead"("crmStatus");

-- CreateIndex
CREATE INDEX "Course_status_idx" ON "Course"("status");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_replacedById_fkey" FOREIGN KEY ("replacedById") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faq" ADD CONSTRAINT "Faq_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faq" ADD CONSTRAINT "Faq_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Copy existing submissions into Lead, keeping their ids (the CRM saw them as
-- submissionId). They were already sent to the CRM best-effort, so they are
-- marked SYNCED rather than queued for retry. Response/EligibilitySubmission
-- stay until they are exported and dropped in a later migration.
INSERT INTO "Lead" ("id", "form", "name", "email", "phone", "interest", "message", "crmStatus", "createdAt")
SELECT "id", 'RESPONSE', "name", "email", "phone", NULLIF("interest", 'none'), NULLIF("message", ''), 'SYNCED', "createdAt"
FROM "Response";

INSERT INTO "Lead" ("id", "form", "name", "email", "phone", "interest", "message", "details", "crmStatus", "createdAt")
SELECT "id", 'ELIGIBILITY', "fullName", "email", "phoneNumber", "qualification", NULLIF("message", ''),
       jsonb_build_object('industry', "industry", 'yearsOfExperience', "yearsOfExperience", 'state', "stateLivedIn"),
       'SYNCED', "createdAt"
FROM "EligibilitySubmission";
