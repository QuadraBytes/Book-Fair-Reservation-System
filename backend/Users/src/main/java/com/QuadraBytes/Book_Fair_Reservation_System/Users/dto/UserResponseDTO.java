package com.QuadraBytes.Book_Fair_Reservation_System.Users.dto;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.model.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Builder
public class UserResponseDTO {
    private UUID userId;
    private String email;
    private String username;
    private Boolean isActive;
    private Integer activeNumberOfStalls;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public static UserResponseDTO from(User u) {
        return UserResponseDTO.builder()
                .userId(u.getUserId())
                .email(u.getEmail())
                .username(u.getUsername())
                .isActive(u.getIsActive())
                .activeNumberOfStalls(u.getActiveNumberOfStalls())
                .createdDate(u.getCreatedDate())
                .modifiedDate(u.getModifiedDate())
                .build();
    }
}
