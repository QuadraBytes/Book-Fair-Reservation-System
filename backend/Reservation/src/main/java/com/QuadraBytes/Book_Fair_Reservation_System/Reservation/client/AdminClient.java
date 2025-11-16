package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.client;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.AdminResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@FeignClient(name = "users-service", contextId="adminClient", url = "http://localhost:9081/api/admins")
public interface AdminClient {

    @GetMapping("/{id}")
    AdminResponseDTO getAdminById(@PathVariable("id") UUID adminId);
}
