package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class AdminResponseDTO {
    private UUID adminId;
    private String email;
    private String adminname;
    private String role;
}
