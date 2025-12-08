package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "stall", schema = "quadrabytes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Stall {
    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "stall_id")
    private UUID stallId;

    @Column(nullable = false)
    private String type;

    @Column(name = "stall_number", nullable = false, unique = true)
    private String stallNumber;

    @Column(nullable = false)
    private String status = "active"; // default active
}
