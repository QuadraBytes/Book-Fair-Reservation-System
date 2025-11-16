package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.service;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.client.UserClient;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.UserResponseDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Booking;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Stall;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.repository.BookingRepo;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.repository.StallRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingCleanupService {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private StallRepo stallRepo;

    @Autowired
    private UserClient userClient;

    /**
     * Run every hour (3600000 ms = 1 hour)
     * You can adjust cron or fixedRate as needed.
     */
    @Transactional
    @Scheduled(fixedRate = 3600000)
    public void cleanUpExpiredBookings() {
        // Example: find all "booked" bookings older than 7 days
        LocalDateTime expiryThreshold = LocalDateTime.now().minusDays(7);
        List<Booking> oldBookings = bookingRepo.findAll().stream()
                .filter(b -> "booked".equalsIgnoreCase(b.getStatus()))
                .filter(b -> b.getCreatedDate().isBefore(expiryThreshold))
                .toList();

        for (Booking booking : oldBookings) {
            try {
                // 1️⃣ Mark booking as expired
                booking.setStatus("expired");
                booking.setModifiedDate(LocalDateTime.now());
                bookingRepo.save(booking);

                // 2️⃣ Free the stall
                Stall stall = stallRepo.findByStallId(booking.getStallId()).orElse(null);
                if (stall != null) {
                    stall.setStatus("active");
                    stallRepo.save(stall);
                }

                // 3️⃣ Decrement user's active stall count
                UserResponseDTO user = userClient.getUserById(booking.getUserId());
                if (user != null && user.getActiveNumberOfStalls() != null && user.getActiveNumberOfStalls() > 0) {
                    int newCount = user.getActiveNumberOfStalls() - 1;
                    userClient.updateActiveStalls(user.getUserId(), newCount);
                }

                System.out.println("✅ Booking expired and cleaned: " + booking.getId());

            } catch (Exception e) {
                System.err.println("⚠️ Failed to clean booking " + booking.getId() + ": " + e.getMessage());
            }
        }
    }
}
