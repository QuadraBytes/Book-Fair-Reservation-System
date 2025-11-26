package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.kafka;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.UserResponseDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Booking;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.QRVerification;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Stall;
import com.quadrabytes.events.BookingEvent;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

public class BookingEventFactory {

    private static long toMillis(LocalDateTime time) {
        return time.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }

    // ---------------------- CREATED ----------------------
    public static BookingEvent bookingCreatedEvent(
            Booking booking, UserResponseDTO user, Stall stall, QRVerification qr
    ) {
        return BookingEvent.newBuilder()
                .setEventId(UUID.randomUUID().toString())
                .setEventType("BOOKING_CREATED")
                .setTimestamp(System.currentTimeMillis())

                .setBookingId(booking.getId().toString())
                .setUserId(user.getUserId().toString())
                .setUsername(user.getUsername())
                .setEmail(user.getEmail())

                .setStallId(stall.getStallId().toString())
                .setStallNumber(stall.getStallNumber())
                .setStallType(stall.getType())

                .setBookingStatus(booking.getStatus())
                .setBookingTime(toMillis(booking.getCreatedDate()))

                .setQrUrl(qr.getQrUrl())

                .build();
    }

    // ---------------------- UPDATED ----------------------
    public static BookingEvent bookingUpdatedEvent(
            Booking booking, UserResponseDTO user, Stall stall , QRVerification qr
    ) {
        return BookingEvent.newBuilder()
                .setEventId(UUID.randomUUID().toString())
                .setEventType("BOOKING_UPDATED")
                .setTimestamp(System.currentTimeMillis())

                .setBookingId(booking.getId().toString())
                .setUserId(user.getUserId().toString())
                .setUsername(user.getUsername())
                .setEmail(user.getEmail())

                .setStallId(stall.getStallId().toString())
                .setStallNumber(stall.getStallNumber())
                .setStallType(stall.getType())

                .setBookingStatus(booking.getStatus())
                .setBookingTime(toMillis(booking.getModifiedDate()))

                .setQrUrl(qr.getQrUrl())

                .build();
    }

    // ---------------------- DELETED ----------------------
    public static BookingEvent bookingDeletedEvent(
            Booking booking, UserResponseDTO user, Stall stall
    ) {
        return BookingEvent.newBuilder()
                .setEventId(UUID.randomUUID().toString())
                .setEventType("BOOKING_DELETED")
                .setTimestamp(System.currentTimeMillis())

                .setBookingId(booking.getId().toString())
                .setUserId(user.getUserId().toString())
                .setUsername(user.getUsername())
                .setEmail(user.getEmail())

                .setStallId(stall.getStallId().toString())
                .setStallNumber(stall.getStallNumber())
                .setStallType(stall.getType())

                .setBookingStatus("deleted")
                .setBookingTime(System.currentTimeMillis())

                .setQrUrl(null)

                .build();
    }
}
