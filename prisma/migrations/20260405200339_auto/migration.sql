/*
  Warnings:

  - The primary key for the `group_includes_paragraph` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `group_includes_paragraph` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Video_url_key";

-- AlterTable
ALTER TABLE "group_includes_paragraph" DROP CONSTRAINT "group_includes_paragraph_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "group_includes_paragraph_pkey" PRIMARY KEY ("id_paragraph", "position_");
