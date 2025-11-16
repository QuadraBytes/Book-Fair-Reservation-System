package com.QuadraBytes.Book_Fair_Reservation_System.Users.repository;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@EnableJpaRepositories
@Repository
public interface UserRepo extends JpaRepository <User, UUID> {

    Optional<User> findByUserId(UUID userId);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);

    @Query("SELECT u FROM User u")
    List<User> findAllUsers();

}
