package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.repository;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.QRVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface QRVerificationRepo extends JpaRepository<QRVerification, UUID> {

    Optional<QRVerification> findByBookingId(UUID bookingId);

    Optional<QRVerification> findByQrUrl(String qrUrl);
}
