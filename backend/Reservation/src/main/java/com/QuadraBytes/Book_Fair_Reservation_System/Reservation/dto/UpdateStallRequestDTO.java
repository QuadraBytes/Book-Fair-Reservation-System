package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Stall;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateStallRequestDTO {
    private String type;
    private String status;
    private String modifiedBy;

    public Stall toEntity() {
        Stall s = new Stall();
        s.setType(type);
        s.setStatus(status);
        s.setModifiedBy(modifiedBy);
        return s;
    }
}
