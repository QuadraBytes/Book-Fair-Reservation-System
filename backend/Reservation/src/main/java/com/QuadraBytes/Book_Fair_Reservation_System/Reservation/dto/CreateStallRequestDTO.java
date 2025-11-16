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

    private String prefix;           // For bulk creation, e.g., ST
    private String stallNumber;      // For single creation

    @Min(1)
    private int quantity = 1;        // 1 = single, >1 = multiple

    @NotNull
    private UUID adminId;            // Who created these stalls
}
