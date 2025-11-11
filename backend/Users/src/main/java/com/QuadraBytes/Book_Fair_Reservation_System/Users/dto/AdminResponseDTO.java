package com.QuadraBytes.Book_Fair_Reservation_System.Users.dto;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.model.Admin;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Builder
public class AdminResponseDTO {
    private UUID adminId;
    private String email;
    private String adminname;
    private String role;
    private Boolean isActive;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public static AdminResponseDTO from(Admin admin) {
        return AdminResponseDTO.builder()
                .adminId(admin.getAdminId())
                .email(admin.getEmail())
                .adminname(admin.getAdminname())
                .role(admin.getRole())
                .isActive(admin.getIsActive())
                .createdDate(admin.getCreatedDate())
                .modifiedDate(admin.getModifiedDate())
                .build();
    }
}
