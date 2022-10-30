/*
  Warnings:

  - You are about to drop the column `user_id` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "todoId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
