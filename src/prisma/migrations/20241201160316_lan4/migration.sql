/*
  Warnings:

  - You are about to alter the column `created_at` on the `cart` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `cart` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `image` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `image` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `order_date` on the `order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `orderitem` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `orderitem` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `product` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `product` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `returnproduct` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `returnproduct` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `review_date` on the `review` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `added_at` on the `wishlist` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `size_id` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `size_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `coupon` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `image` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `notification` MODIFY `created_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `order_date` DATETIME NULL,
    MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `orderitem` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `returnproduct` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `review_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `wishlist` MODIFY `added_at` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_size_id_fkey` FOREIGN KEY (`size_id`) REFERENCES `Size`(`size_id`) ON DELETE RESTRICT ON UPDATE CASCADE;