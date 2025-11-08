package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "stall")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Stall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stall_id")
    private Long stallId;

    @Column(nullable = false)
    private String type;

    @Column(name = "stall_number", nullable = false, unique = true)
    private String stallNumber;

    @Column(nullable = false)
    private String status = "active"; // default active
}
