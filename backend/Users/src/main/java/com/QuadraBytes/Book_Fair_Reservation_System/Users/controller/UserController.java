package com.QuadraBytes.Book_Fair_Reservation_System.Users.controller;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.dto.UserRegistrationRequest;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.dto.UserResponse;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/status")
    public String status() {
        return "User Service is running fine!";
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody UserRegistrationRequest request) {
        UserResponse response = userService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Removed users listing endpoint for focused signup scope
}
