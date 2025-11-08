package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.catalina.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relationship with Stall
    @ManyToOne
    @JoinColumn(name = "stall_id", nullable = false)
    private Stall stall;

    // Relationship with User
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(nullable = false)
    private String status; // e.g. "booked" or "not"

    @Column(name = "stall_number")
    private String stallNumber;

    @Column(name = "qr_link")
    private String qrLink;
}
