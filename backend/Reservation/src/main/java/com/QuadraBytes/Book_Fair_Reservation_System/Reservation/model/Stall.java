package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
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
    private String status = "active";

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "modified_by")
    private String modifiedBy;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;
}
