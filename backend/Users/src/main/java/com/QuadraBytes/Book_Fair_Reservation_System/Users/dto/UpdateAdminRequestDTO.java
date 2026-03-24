package com.QuadraBytes.Book_Fair_Reservation_System.Users.dto;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.model.Admin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UpdateAdminRequestDTO {

    @Email @NotBlank
    private String email;

    @NotBlank
    private String adminName;

    private String role;

    private Boolean isActive;

    public Admin toEntity() {
        Admin admin = new Admin();
        admin.setEmail(email);
        admin.setAdminname(adminName);
        admin.setRole(role);
        admin.setIsActive(isActive);
        return admin;
    }
}
