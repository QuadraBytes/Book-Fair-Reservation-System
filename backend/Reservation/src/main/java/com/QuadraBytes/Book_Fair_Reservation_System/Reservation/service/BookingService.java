package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.service;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.client.UserClient;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.UserResponseDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.kafka.BookingEventProducer;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.kafka.BookingEventFactory;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Booking;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.QRVerification;
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

    @Autowired private BookingRepo bookingRepo;
    @Autowired private StallRepo stallRepo;
    @Autowired private UserClient userClient;
    @Autowired private QRVerificationService qrVerificationService;
    @Autowired private BookingEventProducer eventProducer;

    // --------------------------------------------------------
    //  CREATE BOOKING
    // --------------------------------------------------------
    @Transactional
    public Booking addBooking(Booking booking) {

        // 1️⃣ Validate user
        UserResponseDTO user = userClient.getUserById(booking.getUserId());
        if (user == null || !user.getIsActive())
            throw new RuntimeException("User not found or inactive.");

        // 2️⃣ User max stall limit check
        if (user.getActiveNumberOfStalls() >= 3)
            throw new RuntimeException("User has already booked 3 stalls.");

        // 3️⃣ Validate stall
        Stall stall = stallRepo.findByStallId(booking.getStallId())
                .orElseThrow(() -> new RuntimeException("Stall not found."));

        if (!"active".equalsIgnoreCase(stall.getStatus()))
            throw new RuntimeException("Stall not available.");

        // 4️⃣ Save booking
        booking.setStatus("booked");
        booking.setCreatedDate(LocalDateTime.now());
        booking.setModifiedDate(LocalDateTime.now());
        Booking savedBooking = bookingRepo.save(booking);

        // 5️⃣ Mark stall as booked
        stall.setStatus("booked");
        stallRepo.save(stall);

        // 6️⃣ Update user active stall count
        userClient.updateActiveStalls(user.getUserId(), user.getActiveNumberOfStalls() + 1);

        // 7️⃣ Generate QR
        QRVerification qr = qrVerificationService.generateQr(
                savedBooking.getId(),
                savedBooking.getUserId(),
                user.getUsername(),
                savedBooking.getStallNumber(),
                stall.getType(),
                savedBooking.getCreatedDate()
        );

        // 8️⃣ SEND EVENT → booking_created
        eventProducer.send(
                BookingEventFactory.bookingCreatedEvent(savedBooking, user, stall, qr)
        );

        return savedBooking;
    }

    // --------------------------------------------------------
    //  GET ONE BOOKING
    // --------------------------------------------------------
    public Optional<Booking> getBookingById(UUID id) {
        return bookingRepo.findById(id);
    }

    // --------------------------------------------------------
    //  GET ALL BOOKINGS
    // --------------------------------------------------------
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    // --------------------------------------------------------
    //  DELETE BOOKING
    // --------------------------------------------------------
    @Transactional
    public boolean deleteBooking(UUID id) {

        if (!bookingRepo.existsById(id))
            return false;

        Booking booking = bookingRepo.findById(id).orElse(null);
        if (booking == null)
            return false;

        UserResponseDTO user = userClient.getUserById(booking.getUserId());
        Stall stall = stallRepo.findByStallId(booking.getStallId()).orElse(null);

        // Stall cleanup
        if (stall != null) {
            stall.setStatus("active");
            stallRepo.save(stall);
        }

        // User stall count decrease
        if (user != null && user.getActiveNumberOfStalls() > 0)
            userClient.updateActiveStalls(user.getUserId(), user.getActiveNumberOfStalls() - 1);

        bookingRepo.deleteById(id);

        // SEND EVENT → booking_deleted
        eventProducer.send(
                BookingEventFactory.bookingDeletedEvent(booking, user, stall)
        );

        return true;
    }

    // --------------------------------------------------------
    //  UPDATE BOOKING
    // --------------------------------------------------------
    @Transactional
    public Optional<Booking> updateBooking(UUID id, Booking updated) {

        return bookingRepo.findById(id).map(existing -> {

            String oldStatus = existing.getStatus();

            if (updated.getStatus() != null)
                existing.setStatus(updated.getStatus());

            if (updated.getStallNumber() != null)
                existing.setStallNumber(updated.getStallNumber());

            if (updated.getQrLink() != null)
                existing.setQrLink(updated.getQrLink());

            existing.setModifiedBy(updated.getModifiedBy());
            existing.setModifiedDate(LocalDateTime.now());

            Booking saved = bookingRepo.save(existing);

            Stall stall = stallRepo.findByStallId(saved.getStallId()).orElse(null);
            UserResponseDTO user = userClient.getUserById(saved.getUserId());

            // Stall status sync
            if (stall != null) {
                if ("booked".equalsIgnoreCase(saved.getStatus()))
                    stall.setStatus("booked");
                else if ("canceled".equalsIgnoreCase(saved.getStatus()))
                    stall.setStatus("active");

                stallRepo.save(stall);
            }

            // User stall counter sync
            if (updated.getStatus() != null && user != null) {

                int count = user.getActiveNumberOfStalls();

                if (updated.getStatus().equalsIgnoreCase("canceled") && count > 0)
                    userClient.updateActiveStalls(user.getUserId(), count - 1);

                if (updated.getStatus().equalsIgnoreCase("booked") && count < 3)
                    userClient.updateActiveStalls(user.getUserId(), count + 1);
            }



            QRVerification qrVerification = qrVerificationService
                    .getByBooking(saved.getId())
                    .orElse(null);

            eventProducer.send(
                    BookingEventFactory.bookingUpdatedEvent(saved, user, stall, qrVerification)
            );

            return saved;
        });
    }
}
