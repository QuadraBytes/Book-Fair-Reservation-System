package com.QuadraBytes.Book_Fair_Reservation_System.Users.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorItem {
    private String field;
    private String message;
}
