package com.QuadraBytes.Book_Fair_Reservation_System.Users.controller;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.dto.AdminResponseDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.dto.CreateAdminRequestDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.dto.LoginAdminRequestDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.dto.UpdateAdminRequestDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.model.Admin;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.service.AdminService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService adminService;
    public AdminController(AdminService adminService) { this.adminService = adminService; }

    // Create Admin
    @PostMapping
    public ResponseEntity<AdminResponseDTO> create(@Valid @RequestBody CreateAdminRequestDTO req) {
        Admin admin = new Admin();
        admin.setEmail(req.getEmail());
        admin.setAdminname(req.getAdminName());
        admin.setPasswordHash(req.getPassword());
        admin.setRole(req.getRole());

        Admin saved = adminService.addAdmin(admin);
        return ResponseEntity.created(URI.create("/api/admins/" + saved.getAdminId()))
                .body(AdminResponseDTO.from(saved));
    }

    // Get one Admin
    @GetMapping("/{id}")
    public ResponseEntity<AdminResponseDTO> getOne(@PathVariable UUID id) {
        return adminService.getAdminById(id)
                .map(AdminResponseDTO::from)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all Admins
    @GetMapping
    public ResponseEntity<List<AdminResponseDTO>> getAll() {
        List<AdminResponseDTO> list = adminService.getAllAdmins().stream()
                .map(AdminResponseDTO::from)
                .toList();
        return ResponseEntity.ok(list);
    }

    // Update Admin
    @PutMapping("/{id}")
    public ResponseEntity<AdminResponseDTO> update(@PathVariable UUID id,
                                                @Valid @RequestBody UpdateAdminRequestDTO req) {
        return adminService.updateAdmin(id, req.toEntity())
                .map(AdminResponseDTO::from)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        boolean deleted = adminService.deleteAdmin(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<AdminResponseDTO> login(@Valid @RequestBody LoginAdminRequestDTO req) {
        return adminService.login(req.getAdminNameOrEmail(), req.getPassword())
                .map(AdminResponseDTO::from)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }
}
