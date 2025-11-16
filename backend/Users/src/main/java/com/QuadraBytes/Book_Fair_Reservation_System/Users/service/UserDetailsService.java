package com.QuadraBytes.Book_Fair_Reservation_System.Users.service;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.model.UserDetails;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.repository.UserDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserDetailsService {


    @Autowired
    private UserDetailsRepo userDetailsRepo;

    public UserDetails addUserDetails(UserDetails details) {
        details.setCreatedDate(LocalDateTime.now());
        return userDetailsRepo.save(details);
    }

    public Optional<UserDetails> getDetailsById(UUID id) {
        return userDetailsRepo.findById(id);
    }

    public Optional<UserDetails> getDetailsByUserId(UUID userId) {
        return userDetailsRepo.findByUserId(userId);
    }

    public List<UserDetails> getAllDetails() {
        return userDetailsRepo.findAll();
    }

    public Optional<UserDetails> updateUserDetails(UUID id, UserDetails updated) {
        return userDetailsRepo.findById(id).map(existing -> {
            existing.setCompany(updated.getCompany());
            existing.setContact(updated.getContact());
            existing.setType(updated.getType());
            existing.setSocial(updated.getSocial());
            existing.setLocation(updated.getLocation());
            existing.setModifiedDate(LocalDateTime.now());
            return userDetailsRepo.save(existing);
        });
    }

    public boolean deleteUserDetails(UUID id) {
        if (userDetailsRepo.existsById(id)) {
            userDetailsRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
