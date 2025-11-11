package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Booking;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Builder
public class BookingResponseDTO {
    private UUID id;
    private UUID stallId;
    private UUID userId;
    private String status;
    private String stallNumber;
    private String qrLink;
    private String createdBy;
    private LocalDateTime createdDate;
    private String modifiedBy;
    private LocalDateTime modifiedDate;
    private UserResponseDTO user;
    private String qrUrl; // ✅ new field

    public static BookingResponseDTO from(Booking booking, UserResponseDTO user, String qrUrl) {
        return BookingResponseDTO.builder()
                .id(booking.getId())
                .stallId(booking.getStallId())
                .userId(booking.getUserId())
                .status(booking.getStatus())
                .stallNumber(booking.getStallNumber())
                .qrLink(booking.getQrLink())
                .createdBy(booking.getCreatedBy())
                .createdDate(booking.getCreatedDate())
                .modifiedBy(booking.getModifiedBy())
                .modifiedDate(booking.getModifiedDate())
                .user(user)
                .qrUrl(qrUrl)
                .build();
    }
}
