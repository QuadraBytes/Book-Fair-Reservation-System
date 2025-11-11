package com.QuadraBytes.Book_Fair_Reservation_System.Users.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginAdminRequestDTO {
    @NotBlank
    private String adminNameOrEmail;

    @NotBlank
    private String password;
}
