package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateBookingRequestDTO {
    private String status;
    private String qrLink;
    private String stallNumber;
    private String modifiedBy;
}
