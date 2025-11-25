package com.QuadraBytes.Book_Fair_Reservation_System.Users.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.List;

@Getter
@AllArgsConstructor
public class ErrorResponse {
    private String message;
    private List<ErrorItem> errors;
}
