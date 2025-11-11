package com.QuadraBytes.Book_Fair_Reservation_System.Users.controller;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.dto.CreateUserRequestDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.dto.LoginRequestDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.dto.UpdateUserRequestDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.dto.UserResponseDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.model.User;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) { this.userService = userService; }

    @PostMapping
    public ResponseEntity<UserResponseDTO> create(@Valid @RequestBody CreateUserRequestDTO req) {
        User toCreate = new User();
        toCreate.setEmail(req.getEmail());
        toCreate.setUsername(req.getUsername());
        toCreate.setPasswordHash(req.getPassword()); // service will hash
        toCreate.setActiveNumberOfStalls(0);

        User saved = userService.addUser(toCreate);
        return ResponseEntity.created(URI.create("/api/users/" + saved.getUserId()))
                .body(UserResponseDTO.from(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getOne(@PathVariable UUID id) {
        return userService.getUserById(id)
                .map(UserResponseDTO::from)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAll() {
        List<UserResponseDTO> out = userService.getAllUsers().stream()
                .map(UserResponseDTO::from)
                .toList();
        return ResponseEntity.ok(out);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> update(@PathVariable UUID id,
                                               @Valid @RequestBody UpdateUserRequestDTO req) {
        return userService.updateUser(id, req.applyToEntity())
                .map(UserResponseDTO::from)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        boolean removed = userService.deleteUser(id);
        return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

       @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@Valid @RequestBody LoginRequestDTO req) {
        return userService.login(req.getUsernameOrEmail(), req.getPassword())
                .map(UserResponseDTO::from)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }

    // Deactivate (optional)
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<UserResponseDTO> deactivate(@PathVariable UUID id) {
        return userService.deactivateUser(id)
                .map(UserResponseDTO::from)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{userId}/active-stalls/{count}")
    public ResponseEntity<User> updateActiveStalls(@PathVariable UUID userId, @PathVariable int count) {
        return userService.updateActiveStalls(userId, count)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
