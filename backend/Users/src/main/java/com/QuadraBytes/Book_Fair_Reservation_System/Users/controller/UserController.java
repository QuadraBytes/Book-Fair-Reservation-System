package com.QuadraBytes.Book_Fair_Reservation_System.Users.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/status")
    public String status() {
        return "User Service is running fine!";
    }
}
