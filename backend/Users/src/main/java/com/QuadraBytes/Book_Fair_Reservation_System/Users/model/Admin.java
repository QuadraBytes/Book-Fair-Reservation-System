package com.QuadraBytes.Book_Fair_Reservation_System.Users.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "admins", schema = "quadrabytes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Admin {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "admin_id")
    private UUID adminId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true, name = "admin_name")
    private String adminname;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    private String role;

    @Column(name = "is_active")
    private Boolean isActive = true;

    private String salt;

    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;
}
