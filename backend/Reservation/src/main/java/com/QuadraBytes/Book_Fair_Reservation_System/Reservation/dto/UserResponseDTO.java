package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserResponseDTO {
    private UUID userId;
    private String email;
    private String username;
    private Boolean isActive;
    private Integer activeNumberOfStalls;
}
