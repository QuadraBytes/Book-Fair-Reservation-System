package com.QuadraBytes.Book_Fair_Reservation_System.Users.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "userdetails")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relationship with User
    @OneToOne
    @JoinColumn(name = "userid", nullable = false)
    private User user;

    @Column(nullable = false)
    private String username;

    @Column(name = "company", nullable = true, length = 100)
    private String company;

    @Column(name = "contact", nullable = true, length = 20)
    private String contact;

    @Column(name = "type", nullable = true, length = 50)
    private String type;

    @Column(name = "social", nullable = true, length = 255)
    private String social;

    @Column(name = "location", nullable = true, length = 255)
    private String location;

    @Column(name = "created_by", nullable = true)
    private String createdBy;

    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;
}
