-- Guides show no photo credit (user decision 2026-11-06)
ALTER TABLE "Guide" DROP COLUMN "imageCredit",
DROP COLUMN "imageCreditUrl";
