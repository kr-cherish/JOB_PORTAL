/*
  Warnings:

  - You are about to drop the column `resume` on the `AppliedJob` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AppliedJob" DROP COLUMN "resume",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';
