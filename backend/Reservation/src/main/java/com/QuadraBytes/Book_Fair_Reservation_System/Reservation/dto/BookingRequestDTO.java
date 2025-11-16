package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class BookingRequestDTO {
    @NotNull
    private UUID stallId;

    @NotNull
    private UUID userId;

    private String createdBy;
    private String stallNumber;
    private String qrLink;
}
