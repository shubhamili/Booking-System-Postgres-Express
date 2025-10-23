/*
  Warnings:

  - The `bookingStatus` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `paymentStatus` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[seatId,showId]` on the table `BookingSeat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Booking" DROP COLUMN "bookingStatus",
ADD COLUMN     "bookingStatus" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "paymentId" DROP NOT NULL,
ALTER COLUMN "paymentId" SET DATA TYPE TEXT,
DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "BookingSeat_seatId_showId_key" ON "public"."BookingSeat"("seatId", "showId");
