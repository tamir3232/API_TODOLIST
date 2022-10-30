-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_todoId_fkey";

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
