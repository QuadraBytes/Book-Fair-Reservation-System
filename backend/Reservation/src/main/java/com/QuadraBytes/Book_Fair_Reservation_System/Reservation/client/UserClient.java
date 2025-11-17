package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.client;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.UserResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.UUID;

//@FeignClient(name = "users-service", contextId="userClient", url = "http://api-gateway:9080/users-service/api/users")
@FeignClient(name = "users-service", contextId="userClient", url = "http://173.249.12.92:9080/users-service/api/users")
public interface UserClient {

    @GetMapping("/{id}")
    UserResponseDTO getUserById(@PathVariable("id") UUID id);

    @PutMapping("/{id}/active-stalls/{count}")
    void updateActiveStalls(@PathVariable("id") UUID userId, @PathVariable("count") int count);
}
