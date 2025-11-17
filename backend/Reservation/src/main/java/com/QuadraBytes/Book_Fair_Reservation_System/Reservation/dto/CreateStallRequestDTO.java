package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CreateStallRequestDTO {

    @NotBlank
    private String type;

    @Min(1)
    private int quantity = 1;

    @NotNull
    private UUID adminId;     // Creator
}

