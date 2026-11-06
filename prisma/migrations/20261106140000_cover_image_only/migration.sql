-- One image per section and course (step 1 of 2, backward compatible).
-- Adds imageUrl/imagePublicId, filled from the old cover image. Course images are optional:
-- a course without one shows its section's image. The old square/cover columns become
-- nullable so the code still running in production keeps working until the release;
-- prisma/after-release/drop_old_image_columns.sql removes them after the deploy.

ALTER TABLE "Section" ADD COLUMN "imageUrl" TEXT, ADD COLUMN "imagePublicId" TEXT;
UPDATE "Section" SET "imageUrl" = "imageCoverLink", "imagePublicId" = NULLIF("imageCoverPublicId", '');
ALTER TABLE "Section" ALTER COLUMN "imageUrl" SET NOT NULL;
ALTER TABLE "Section"
  ALTER COLUMN "imageSquareLink" DROP NOT NULL,
  ALTER COLUMN "imageSquarePublicId" DROP NOT NULL,
  ALTER COLUMN "imageCoverLink" DROP NOT NULL,
  ALTER COLUMN "imageCoverPublicId" DROP NOT NULL;

ALTER TABLE "Course" ADD COLUMN "imageUrl" TEXT, ADD COLUMN "imagePublicId" TEXT;
UPDATE "Course" SET "imageUrl" = NULLIF("imageCoverLink", ''), "imagePublicId" = NULLIF("imageCoverPublicId", '');
ALTER TABLE "Course"
  ALTER COLUMN "imageSquareLink" DROP NOT NULL,
  ALTER COLUMN "imageSquarePublicId" DROP NOT NULL,
  ALTER COLUMN "imageCoverLink" DROP NOT NULL,
  ALTER COLUMN "imageCoverPublicId" DROP NOT NULL;
