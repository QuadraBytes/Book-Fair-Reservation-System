package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Stall;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Builder
public class StallResponseDTO {
    private UUID stallId;
    private String type;
    private String stallNumber;
    private String status;
    private String createdBy;
    private String modifiedBy;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public static StallResponseDTO from(Stall s) {
        return StallResponseDTO.builder()
                .stallId(s.getStallId())
                .type(s.getType())
                .stallNumber(s.getStallNumber())
                .status(s.getStatus())
                .createdBy(s.getCreatedBy())
                .modifiedBy(s.getModifiedBy())
                .createdDate(s.getCreatedDate())
                .modifiedDate(s.getModifiedDate())
                .build();
    }
}
