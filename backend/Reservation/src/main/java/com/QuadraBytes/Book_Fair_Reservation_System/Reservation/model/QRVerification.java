package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "qr_verification", schema = "quadrabytes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QRVerification {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(name = "booking_id", nullable = false)
    private UUID bookingId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(nullable = false, unique = true, length = 512)
    private String qrUrl;

    @Column(name = "qr_image_path")
    private String qrImagePath;

    @Column(name = "is_verified", nullable = false)
    private Boolean isVerified = false;

    @Column(name = "verified_at")
    private LocalDateTime verifiedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
