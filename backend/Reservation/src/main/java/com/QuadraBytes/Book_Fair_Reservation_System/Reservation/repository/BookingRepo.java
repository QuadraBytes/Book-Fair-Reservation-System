package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.repository;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepo extends JpaRepository<Booking, UUID> {

    List<Booking> findByUserId(UUID userId);

    List<Booking> findByStallId(UUID stallId);
}
