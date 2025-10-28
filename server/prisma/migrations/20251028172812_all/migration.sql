-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_showId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BookingSeat" DROP CONSTRAINT "BookingSeat_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BookingSeat" DROP CONSTRAINT "BookingSeat_showId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Price" DROP CONSTRAINT "Price_seatTypeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Price" DROP CONSTRAINT "Price_showId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Screen" DROP CONSTRAINT "Screen_theatreId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Seat" DROP CONSTRAINT "Seat_screenId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Seat" DROP CONSTRAINT "Seat_seatTypeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Show" DROP CONSTRAINT "Show_movieId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Show" DROP CONSTRAINT "Show_screenId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Screen" ADD CONSTRAINT "Screen_theatreId_fkey" FOREIGN KEY ("theatreId") REFERENCES "public"."Theatre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Show" ADD CONSTRAINT "Show_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "public"."Screen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Show" ADD CONSTRAINT "Show_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Seat" ADD CONSTRAINT "Seat_seatTypeId_fkey" FOREIGN KEY ("seatTypeId") REFERENCES "public"."SeatType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Seat" ADD CONSTRAINT "Seat_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "public"."Screen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Price" ADD CONSTRAINT "Price_showId_fkey" FOREIGN KEY ("showId") REFERENCES "public"."Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Price" ADD CONSTRAINT "Price_seatTypeId_fkey" FOREIGN KEY ("seatTypeId") REFERENCES "public"."SeatType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookingSeat" ADD CONSTRAINT "BookingSeat_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookingSeat" ADD CONSTRAINT "BookingSeat_showId_fkey" FOREIGN KEY ("showId") REFERENCES "public"."Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_showId_fkey" FOREIGN KEY ("showId") REFERENCES "public"."Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;
