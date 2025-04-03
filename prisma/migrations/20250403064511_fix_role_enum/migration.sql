-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "skills" TEXT,
ALTER COLUMN "role" DROP DEFAULT;
