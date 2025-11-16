package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.controller;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.client.UserClient;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.*;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Booking;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.QRVerification;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.service.BookingService;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.service.QRVerificationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final UserClient userClient;
    private final QRVerificationService qrVerificationService;

    public BookingController(BookingService bookingService, UserClient userClient, QRVerificationService qrVerificationService) {
        this.bookingService = bookingService;
        this.userClient = userClient;
        this.qrVerificationService = qrVerificationService;
    }

    // ✅ Create a new booking (validate user, stall, and generate QR)
    @PostMapping
    public ResponseEntity<BookingResponseDTO> create(@Valid @RequestBody BookingRequestDTO req) {
        // Validate user
        UserResponseDTO user = userClient.getUserById(req.getUserId());
        if (user == null || Boolean.FALSE.equals(user.getIsActive())) {
            return ResponseEntity.badRequest().build();
        }

        // Build booking object
        Booking booking = new Booking();
        booking.setStallId(req.getStallId());
        booking.setUserId(req.getUserId());
        booking.setCreatedBy(req.getCreatedBy());
        booking.setQrLink(req.getQrLink());
        booking.setStallNumber(req.getStallNumber());

        // ✅ Save booking with stall validation inside BookingService
        Booking savedBooking = bookingService.addBooking(booking);

        // ✅ Generate a unique QR entry for this booking
        QRVerification qr = qrVerificationService.generateQr(
                savedBooking.getId(),
                savedBooking.getUserId(),
                user.getUsername(),              // username
                savedBooking.getStallNumber(),   // stall number
                savedBooking.getStatus(),        // or stall type if available
                savedBooking.getCreatedDate()    // booking time
        );

        // ✅ Return response including QR URL
        return ResponseEntity.created(URI.create("/api/bookings/" + savedBooking.getId()))
                .body(BookingResponseDTO.from(savedBooking, user, qr.getQrUrl()));
    }

    // ✅ Get booking by ID (include user and QR info)
    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> getOne(@PathVariable UUID id) {
        return bookingService.getBookingById(id)
                .map(b -> {
                    UserResponseDTO user = userClient.getUserById(b.getUserId());
                    String qrUrl = qrVerificationService.getByBooking(b.getId())
                            .map(QRVerification::getQrUrl)
                            .orElse(null);
                    return BookingResponseDTO.from(b, user, qrUrl);
                })
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Get all bookings (include user + QR info)
    @GetMapping
    public ResponseEntity<List<BookingResponseDTO>> getAll() {
        List<BookingResponseDTO> list = bookingService.getAllBookings().stream()
                .map(b -> {
                    UserResponseDTO user = userClient.getUserById(b.getUserId());
                    String qrUrl = qrVerificationService.getByBooking(b.getId())
                            .map(QRVerification::getQrUrl)
                            .orElse(null);
                    return BookingResponseDTO.from(b, user, qrUrl);
                })
                .toList();

        return ResponseEntity.ok(list);
    }

    // ✅ Update booking (QR remains same)
    @PutMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> update(@PathVariable UUID id,
                                                     @RequestBody UpdateBookingRequestDTO req) {
        Booking updated = new Booking();
        updated.setStatus(req.getStatus());
        updated.setQrLink(req.getQrLink());
        updated.setStallNumber(req.getStallNumber());
        updated.setModifiedBy(req.getModifiedBy());

        return bookingService.updateBooking(id, updated)
                .map(b -> {
                    UserResponseDTO user = userClient.getUserById(b.getUserId());
                    String qrUrl = qrVerificationService.getByBooking(b.getId())
                            .map(QRVerification::getQrUrl)
                            .orElse(null);
                    return BookingResponseDTO.from(b, user, qrUrl);
                })
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete booking (also optional: delete QR or free up stall)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        boolean deleted = bookingService.deleteBooking(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
