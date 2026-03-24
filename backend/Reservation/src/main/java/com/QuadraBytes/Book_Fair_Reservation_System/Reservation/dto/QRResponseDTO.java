package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.QRVerification;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Builder
public class QRResponseDTO {
    private UUID id;
    private UUID bookingId;
    private UUID userId;
    private String qrUrl;
    private String qrImagePath;
    private Boolean isVerified;
    private LocalDateTime verifiedAt;
    private LocalDateTime createdAt;

    public static QRResponseDTO from(QRVerification qr) {
        return QRResponseDTO.builder()
                .id(qr.getId())
                .bookingId(qr.getBookingId())
                .userId(qr.getUserId())
                .qrUrl(qr.getQrUrl())
                .qrImagePath(qr.getQrImagePath())
                .isVerified(qr.getIsVerified())
                .verifiedAt(qr.getVerifiedAt())
                .createdAt(qr.getCreatedAt())
                .build();
    }
}
