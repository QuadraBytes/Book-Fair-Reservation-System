package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.service;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.client.UserClient;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.UserResponseDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Booking;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Stall;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.repository.BookingRepo;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.repository.StallRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private StallRepo stallRepo;

    @Autowired
    private UserClient userClient;

    @Autowired
    private QRVerificationService qrVerificationService;

    /**
     * Create a new booking with transactional integrity.
     * If any step fails, all DB changes are rolled back automatically.
     */
    @Transactional
    public Booking addBooking(Booking booking) {
        // 1️⃣ Validate user
        UserResponseDTO user = userClient.getUserById(booking.getUserId());
        if (user == null || Boolean.FALSE.equals(user.getIsActive())) {
            throw new RuntimeException("User not found or inactive.");
        }

        // 2️⃣ Check if user already booked 3 stalls
        if (user.getActiveNumberOfStalls() != null && user.getActiveNumberOfStalls() >= 3) {
            throw new RuntimeException("User has already booked the maximum of 3 stalls.");
        }

        // 3️⃣ Validate stall
        Stall stall = stallRepo.findByStallId(booking.getStallId())
                .orElseThrow(() -> new RuntimeException("Stall not found."));
        if (!"active".equalsIgnoreCase(stall.getStatus())) {
            throw new RuntimeException("Stall is not available for booking.");
        }

        // 4️⃣ Create booking
        booking.setStatus("booked");
        booking.setCreatedDate(LocalDateTime.now());
        booking.setModifiedDate(LocalDateTime.now());
        Booking savedBooking = bookingRepo.save(booking);

        // 5️⃣ Mark stall as booked
        stall.setStatus("booked");
        stallRepo.save(stall);

        // 6️⃣ Increment user's active stall count (via Feign)
        int updatedCount = (user.getActiveNumberOfStalls() == null ? 0 : user.getActiveNumberOfStalls()) + 1;
        try {
            userClient.updateActiveStalls(user.getUserId(), updatedCount);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update user stall count: " + e.getMessage(), e);
        }

        // 7️⃣ Generate QR (if QR generation fails, transaction rolls back)
        try {
            qrVerificationService.generateQr(
                    savedBooking.getId(),
                    savedBooking.getUserId(),
                    user.getUsername(),            // username
                    savedBooking.getStallNumber(), // stall number
                    stall.getType(),               // stall type (from Stall entity)
                    savedBooking.getCreatedDate()  // booking time
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate QR code: " + e.getMessage(), e);
        }

        return savedBooking;
    }

    public Optional<Booking> getBookingById(UUID id) {
        return bookingRepo.findById(id);
    }

    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    @Transactional
    public boolean deleteBooking(UUID id) {
        if (bookingRepo.existsById(id)) {
            Booking booking = bookingRepo.findById(id).orElse(null);
            if (booking != null) {
                // decrease user's active stalls if needed
                UserResponseDTO user = userClient.getUserById(booking.getUserId());
                if (user != null && user.getActiveNumberOfStalls() > 0) {
                    userClient.updateActiveStalls(user.getUserId(), user.getActiveNumberOfStalls() - 1);
                }

                // make stall available again
                Stall stall = stallRepo.findByStallId(booking.getStallId()).orElse(null);
                if (stall != null) {
                    stall.setStatus("active");
                    stallRepo.save(stall);
                }

                bookingRepo.deleteById(id);
                return true;
            }
        }
        return false;
    }

    @Transactional
    public Optional<Booking> updateBooking(UUID id, Booking updatedData) {
        return bookingRepo.findById(id).map(existing -> {
            // --- Update Booking fields ---
            if (updatedData.getStatus() != null) {
                existing.setStatus(updatedData.getStatus());
            }
            if (updatedData.getQrLink() != null) {
                existing.setQrLink(updatedData.getQrLink());
            }
            if (updatedData.getStallNumber() != null) {
                existing.setStallNumber(updatedData.getStallNumber());
            }
            if (updatedData.getModifiedBy() != null) {
                existing.setModifiedBy(updatedData.getModifiedBy());
            }
            existing.setModifiedDate(LocalDateTime.now());

            // --- Save booking ---
            Booking savedBooking = bookingRepo.save(existing);

            // --- Update stall status automatically ---
            stallRepo.findByStallId(savedBooking.getStallId()).ifPresent(stall -> {
                String newBookingStatus = savedBooking.getStatus().toLowerCase();

                switch (newBookingStatus) {
                    case "booked" -> stall.setStatus("booked");
                    case "canceled", "expired" -> stall.setStatus("active");
                    default -> { /* no change */ }
                }

                stallRepo.save(stall);
            });

            // --- Update user's active stall count if needed ---
            if (updatedData.getStatus() != null) {
                try {
                    UserResponseDTO user = userClient.getUserById(savedBooking.getUserId());
                    if (user != null) {
                        int currentCount = user.getActiveNumberOfStalls() == null ? 0 : user.getActiveNumberOfStalls();

                        if (updatedData.getStatus().equalsIgnoreCase("canceled") && currentCount > 0) {
                            userClient.updateActiveStalls(user.getUserId(), currentCount - 1);
                        } else if (updatedData.getStatus().equalsIgnoreCase("booked") && currentCount < 3) {
                            userClient.updateActiveStalls(user.getUserId(), currentCount + 1);
                        }
                    }
                } catch (Exception e) {
                    throw new RuntimeException("Failed to sync active stall count with user service", e);
                }
            }

            return savedBooking;
        });
    }
}
