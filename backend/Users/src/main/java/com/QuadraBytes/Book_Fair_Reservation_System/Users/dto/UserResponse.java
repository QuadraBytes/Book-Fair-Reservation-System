package com.QuadraBytes.Book_Fair_Reservation_System.Users.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class UserResponse {
    private UUID userId;
    private String email;
    private String username;
    private Boolean active;
    private Integer activeNumberOfStalls;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
}
