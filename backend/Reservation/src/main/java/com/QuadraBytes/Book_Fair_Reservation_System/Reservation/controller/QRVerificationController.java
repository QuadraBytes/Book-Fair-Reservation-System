package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.controller;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.QRResponseDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.QRVerification;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.service.QRVerificationService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/qr")
public class QRVerificationController {

    private final QRVerificationService qrVerificationService;
    private static final String QR_DIRECTORY = "uploads/qr";

    public QRVerificationController(QRVerificationService qrVerificationService) {
        this.qrVerificationService = qrVerificationService;
    }

    // ✅ Admin verifies a QR (like scanning at the gate)
    @PutMapping("/verify/{bookingId}")
    public ResponseEntity<QRResponseDTO> verify(@PathVariable UUID bookingId) {
        return qrVerificationService.verifyQr(bookingId)
                .map(QRResponseDTO::from)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Get QR details by booking
    @GetMapping("/{bookingId}")
    public ResponseEntity<QRResponseDTO> getByBooking(@PathVariable UUID bookingId) {
        return qrVerificationService.getByBooking(bookingId)
                .map(QRResponseDTO::from)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/img/{fileName:.+}")
    public ResponseEntity<Resource> getQrImage(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(QR_DIRECTORY).resolve(fileName).normalize();
            File file = filePath.toFile();

            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }

            Resource resource = new UrlResource(filePath.toUri());
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                    .body(resource);

        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
