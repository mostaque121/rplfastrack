-- Step 2 of the single-image change. Run ONLY after the release that uses imageUrl is live:
--   1. move this file to prisma/migrations/<timestamp>_drop_old_image_columns/migration.sql
--   2. npx prisma migrate deploy
-- Until then the production code still reads these columns.

ALTER TABLE "Section"
  DROP COLUMN "imageSquareLink",
  DROP COLUMN "imageSquarePublicId",
  DROP COLUMN "imageCoverLink",
  DROP COLUMN "imageCoverPublicId";

ALTER TABLE "Course"
  DROP COLUMN "imageSquareLink",
  DROP COLUMN "imageSquarePublicId",
  DROP COLUMN "imageCoverLink",
  DROP COLUMN "imageCoverPublicId";
