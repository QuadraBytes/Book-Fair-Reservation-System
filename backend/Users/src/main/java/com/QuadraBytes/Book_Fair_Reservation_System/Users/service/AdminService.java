package com.QuadraBytes.Book_Fair_Reservation_System.Users.service;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.model.Admin;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    public Admin addAdmin(Admin admin) {
        String salt = BCrypt.gensalt();
        String hashedPassword = BCrypt.hashpw(admin.getPasswordHash(), salt);
        admin.setSalt(salt);
        admin.setPasswordHash(hashedPassword);
        admin.setCreatedDate(LocalDateTime.now());
        admin.setModifiedDate(LocalDateTime.now());
        admin.setIsActive(true);
        return adminRepo.save(admin);
    }

    public Optional<Admin> getAdminById(UUID adminId) {
        return adminRepo.findById(adminId);
    }

    public List<Admin> getAllAdmins() {
        return adminRepo.findAll();
    }

    public Optional<Admin> updateAdmin(UUID adminId, Admin updated) {
        return adminRepo.findById(adminId).map(existing -> {
            existing.setEmail(updated.getEmail());
            existing.setAdminname(updated.getAdminname());
            existing.setRole(updated.getRole());
            existing.setIsActive(updated.getIsActive());
            existing.setModifiedDate(LocalDateTime.now());
            return adminRepo.save(existing);
        });
    }

    public boolean deleteAdmin(UUID adminId) {
        if (adminRepo.existsById(adminId)) {
            adminRepo.deleteById(adminId);
            return true;
        }
        return false;
    }

    public Optional<Admin> login(String adminNameOrEmail, String password) {
        Optional<Admin> adminOpt = adminRepo.findByAdminnameOrEmail(adminNameOrEmail, adminNameOrEmail);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (BCrypt.checkpw(password, admin.getPasswordHash()) && Boolean.TRUE.equals(admin.getIsActive())) {
                return adminOpt;
            }
        }
        return Optional.empty();
    }
}
