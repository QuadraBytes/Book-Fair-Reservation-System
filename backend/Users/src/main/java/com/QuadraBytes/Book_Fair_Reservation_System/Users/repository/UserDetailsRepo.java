package com.QuadraBytes.Book_Fair_Reservation_System.Users.repository;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@EnableJpaRepositories
@Repository
public interface UserDetailsRepo extends JpaRepository<UserDetails, UUID> {

    Optional<UserDetails> findByUserId(UUID userId);

    List<UserDetails> findAllByUserId(UUID userId);
}
