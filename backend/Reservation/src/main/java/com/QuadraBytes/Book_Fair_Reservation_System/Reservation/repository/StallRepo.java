package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.repository;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Stall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StallRepo extends JpaRepository<Stall, UUID> {

    Optional<Stall> findByStallId(UUID stallId);
    Optional<Stall> findByStallNumber(String stallNumber);

    List<Stall> findByStatus(String status);
}
