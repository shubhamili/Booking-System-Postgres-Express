# Movie Ticket Booking System (full-stack)

## Project Overview

This is a **System for a movie ticket booking platform**, designed to handle the complete flow of movie show bookings with seat selection, pricing, and payment integration. The project simulates real-world scenarios faced by platforms like BookMyShow, focusing on **user experience, data integrity, and concurrency handling**.

The system is built using **Node.js, Express, PostgreSQL, React, and Prisma** as the ORM. Payment integration is designed using **Razorpay**.

---

## Key Features

* **User Management:** Handles both registered and guest users. Allows seamless linking of temporary bookings to users after login.
* **Movie, Theatre, and Show Management:** Supports multiple theatres, screens, movies, and shows with detailed showtimes.
* **Seat Management:** Seats are uniquely tracked per screen with seat types (VIP, Gold, Silver) and dynamic pricing.
* **Booking Management:**

  * Supports temporary seat locking to prevent double bookings.
  * Stores payment and booking statuses (`PENDING`, `BOOKED`, `CANCELLED`, `EXPIRED`).
  * Tracks partial booking flows for guest users.
* **Price Management:** Dynamic pricing based on **seat type**, **show**, and **day type** (weekday/weekend).
* **Payment Integration:** Ready for Razorpay integration to handle secure payments and update booking statuses.
* **Concurrency Handling:** Ensures no two users can book the same seat at the same time by locking seats for a configurable duration.

---

## Challenges Faced

1. **Booking Concurrency:**
   Ensuring that multiple users selecting seats simultaneously do not end up booking the same seat required careful planning. Implemented **temporary locks** with expiry times.

2. **Guest Booking Flow:**
   Handling bookings before user login was tricky. Solved by creating **temporary booking records** and linking them to the user after login.

3. **Seat Pricing:**
   Seats have different prices depending on seat type and show. Designing the `Price` model to dynamically fetch the correct price for each selected seat was challenging.

4. **Database Relationships:**
   The system has multiple relations: Users, Bookings, Seats, Shows, Screens, Theatres, Movies. Managing these relations efficiently using Prisma while maintaining **data integrity** was a key learning.

5. **Payment Handling:**
   Designing the schema to track payment status, booking status, and amounts while keeping future Razorpay integration in mind.

6. **Data Consistency:**
   Ensuring that canceled or expired bookings free up seats correctly without affecting other users.

---

## Problems Solved / Learnings

* Learned **how large-scale ticketing systems handle bookings** and seat locking.
* Understood **temporary vs confirmed bookings** and user association flows.
* Gained hands-on experience with **complex database relations**, **dynamic pricing**, and **transactional operations**.
* Learned to design a backend that supports **scalable and concurrent operations**, critical for real-time applications.
* Developed a deep understanding of **payment workflows**, **booking statuses**, and **seat management** in a live system.

---

This project demonstrates my ability to **design a complex system**, solve real-world concurrency problems, and manage **multi-entity relationships** in a relational database using **Prisma and PostgreSQL**.
