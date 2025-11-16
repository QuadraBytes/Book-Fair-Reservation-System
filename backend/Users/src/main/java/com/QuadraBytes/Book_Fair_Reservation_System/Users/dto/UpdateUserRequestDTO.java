package com.QuadraBytes.Book_Fair_Reservation_System.Users.dto;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserRequestDTO {
    @Email @NotBlank
    private String email;

    @NotBlank @Size(min = 3, max = 50)
    private String username;

    private Integer activeNumberOfStalls;

    // Helper to map into a partial entity for the service's updater
    public User applyToEntity() {
        User u = new User();
        u.setEmail(email);
        u.setUsername(username);
        u.setActiveNumberOfStalls(activeNumberOfStalls);
        return u;
    }
}
