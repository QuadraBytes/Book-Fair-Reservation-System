package com.QuadraBytes.Book_Fair_Reservation_System.Users.service;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.model.User;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;


    public User addUser(User user) {
        // Hash password before saving
        String salt = BCrypt.gensalt();
        String hashedPassword = BCrypt.hashpw(user.getPasswordHash(), salt);

        user.setSalt(salt);
        user.setPasswordHash(hashedPassword);
        user.setCreatedDate(LocalDateTime.now());
        user.setModifiedDate(LocalDateTime.now());
        user.setIsActive(true);

        return userRepo.save(user);
    }

    public Optional<User> getUserById(UUID userId) {
        return userRepo.findById(userId);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public Optional<User> updateUser(UUID userId, User updatedUser) {
        return userRepo.findById(userId).map(existingUser -> {
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setActiveNumberOfStalls(updatedUser.getActiveNumberOfStalls());
            existingUser.setModifiedDate(LocalDateTime.now());
            return userRepo.save(existingUser);
        });
    }

    public boolean deleteUser(UUID userId) {
        if (userRepo.existsById(userId)) {
            userRepo.deleteById(userId);
            return true;
        }
        return false;
    }

    public Optional<User> login(String usernameOrEmail, String password) {
        Optional<User> user = userRepo.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);

        if (user.isPresent()) {
            User existingUser = user.get();
            boolean passwordMatch = BCrypt.checkpw(password, existingUser.getPasswordHash());
            if (passwordMatch && Boolean.TRUE.equals(existingUser.getIsActive())) {
                return user;
            }
        }
        return Optional.empty();
    }

    public Optional<User> deactivateUser(UUID userId) {
        return userRepo.findById(userId).map(existingUser -> {
            existingUser.setIsActive(false);
            existingUser.setModifiedDate(LocalDateTime.now());
            return userRepo.save(existingUser);
        });
    }

    public Optional<User> updateActiveStalls(UUID userId, int count) {
        return userRepo.findByUserId(userId).map(user -> {
            user.setActiveNumberOfStalls(count);
            user.setModifiedDate(LocalDateTime.now());
            return userRepo.save(user);
        });
    }
}
