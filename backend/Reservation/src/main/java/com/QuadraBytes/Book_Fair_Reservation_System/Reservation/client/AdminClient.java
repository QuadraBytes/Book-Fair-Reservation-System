package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.client;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.AdminResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

//@FeignClient(name = "users-service", contextId="adminClient", url = "http://api-gateway:9080/users-service/api/admins")
@FeignClient(name = "users-service", contextId="adminClient", url = "http://173.249.12.92:9080/users-service/api/admins")
public interface AdminClient {

    @GetMapping("/{id}")
    AdminResponseDTO getAdminById(@PathVariable("id") UUID adminId);
}
