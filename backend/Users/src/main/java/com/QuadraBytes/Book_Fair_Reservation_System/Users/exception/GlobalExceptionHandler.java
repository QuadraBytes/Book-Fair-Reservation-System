package com.QuadraBytes.Book_Fair_Reservation_System.Users.exception;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.dto.ErrorItem;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        List<ErrorItem> items = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> new ErrorItem(fe.getField(), resolveMessage(fe.getField(), fe.getDefaultMessage())))
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Validation failed", items));
    }

    @ExceptionHandler(DuplicateFieldException.class)
    public ResponseEntity<ErrorResponse> handleDuplicate(DuplicateFieldException ex) {
        ErrorItem item = new ErrorItem(ex.getField(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("Duplicate value", List.of(item)));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleOther(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Internal error", List.of()));
    }

    private String resolveMessage(String field, String defaultMsg) {
        if ("password".equals(field) && defaultMsg != null && defaultMsg.contains("size")) {
            return "Password must be between 8 and 100 characters";
        }
        if ("username".equals(field) && defaultMsg != null && defaultMsg.contains("size")) {
            return "Username must be between 3 and 50 characters";
        }
        if ("email".equals(field) && defaultMsg != null && (defaultMsg.contains("must not be blank") || defaultMsg.contains("must not be empty"))) {
            return "Email is required";
        }
        return defaultMsg != null ? defaultMsg : "Invalid value";
    }
}
