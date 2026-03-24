package com.QuadraBytes.Book_Fair_Reservation_System.Users.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreateAdminRequestDTO {
    @Email @NotBlank
    private String email;

    @NotBlank @Size(min = 3, max = 50)
    private String adminName;

    @NotBlank @Size(min = 8)
    private String password;

    private String role;
}
