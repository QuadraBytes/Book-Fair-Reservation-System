package com.QuadraBytes.Book_Fair_Reservation_System.Users.repository;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AdminRepo extends JpaRepository<Admin, UUID> {

    Optional<Admin> findByEmail(String email);

    Optional<Admin> findByAdminname(String adminname);

    Optional<Admin> findByAdminnameOrEmail(String adminname, String email);
}
