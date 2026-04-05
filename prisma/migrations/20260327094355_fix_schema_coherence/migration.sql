/*
  Warnings:

  - The primary key for the `group_includes_paragraph` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[url]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "group_includes_paragraph" DROP CONSTRAINT "group_includes_paragraph_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "group_includes_paragraph_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Video_url_key" ON "Video"("url");
