package com.QuadraBytes.Book_Fair_Reservation_System.Users.controller;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.model.UserDetails;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.service.UserDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/user-details")
public class UserDetailsController {

    private final UserDetailsService userDetailsService;

    public UserDetailsController(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    // Create user details
    @PostMapping
    public ResponseEntity<UserDetails> create(@RequestBody UserDetails details) {
        UserDetails saved = userDetailsService.addUserDetails(details);
        return ResponseEntity.created(URI.create("/api/user-details/" + saved.getId()))
                .body(saved);
    }

    // Get details by id
    @GetMapping("/{id}")
    public ResponseEntity<UserDetails> getOne(@PathVariable UUID id) {
        return userDetailsService.getDetailsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get details by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<UserDetails> getByUserId(@PathVariable UUID userId) {
        return userDetailsService.getDetailsByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all details
    @GetMapping
    public ResponseEntity<List<UserDetails>> getAll() {
        return ResponseEntity.ok(userDetailsService.getAllDetails());
    }

    // Update user details
    @PutMapping("/{id}")
    public ResponseEntity<UserDetails> update(@PathVariable UUID id,
                                              @RequestBody UserDetails updated) {
        return userDetailsService.updateUserDetails(id, updated)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete user details
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        boolean deleted = userDetailsService.deleteUserDetails(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }


}
