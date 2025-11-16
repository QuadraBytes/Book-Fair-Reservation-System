package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.service;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.QRVerification;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.repository.QRVerificationRepo;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.UUID;

@Service
public class QRVerificationService {

    @Autowired
    private QRVerificationRepo qrVerificationRepo;

    @Value("${app.base-url:http://localhost:9082}")
    private String appBaseUrl;

    private static final String OUTPUT_DIR = "uploads/qr/";

    public QRVerification generateQr(UUID bookingId, UUID userId, String username, String stallNo, String stallType, LocalDateTime bookingTime) {
        // ✅ Return existing QR if already created
        Optional<QRVerification> existing = qrVerificationRepo.findByBookingId(bookingId);
        if (existing.isPresent()) {
            return existing.get();
        }

        // ✅ Sanitize inputs
        String safeUsername = sanitize(username);
        String safeStallNo = sanitize(stallNo);
        String safeStallType = sanitize(stallType);
        String formattedDate = bookingTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // ✅ The actual content encoded inside the QR (displayed when scanned)
        String qrContent = String.format("""
                📚 Book Fair Reservation Details 📅
                ------------------------------
                👤 Username: %s
                🏠 Stall No: %s
                🏷️ Type: %s
                ⏰ Booking Time: %s
                🔗 Booking ID: %s
                """,
                safeUsername, safeStallNo, safeStallType, formattedDate, bookingId
        );

        // ✅ File name (with unique QR ID or booking ID)
        String fileName = bookingId + "_QR.png";
        String filePath = OUTPUT_DIR + fileName;

        // ✅ Actual public URL for access
        String qrUrl = appBaseUrl + "/qr/" + fileName;

        // ✅ Generate QR image with booking details
        generateQrImage(qrContent, filePath);

        // ✅ Save QR details in DB
        QRVerification qr = new QRVerification();
        qr.setBookingId(bookingId);
        qr.setUserId(userId);
        qr.setQrUrl(qrUrl);
        qr.setQrImagePath(filePath);
        qr.setCreatedAt(LocalDateTime.now());
        qr.setIsVerified(false);

        return qrVerificationRepo.save(qr);
    }

    private void generateQrImage(String qrText, String filePath) {
        try {
            // Create folder if not exists
            File dir = new File(OUTPUT_DIR);
            if (!dir.exists()) dir.mkdirs();

            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(qrText, BarcodeFormat.QR_CODE, 400, 400);

            Path path = FileSystems.getDefault().getPath(filePath);
            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
        } catch (WriterException | IOException e) {
            throw new RuntimeException("Failed to generate QR image: " + e.getMessage(), e);
        }
    }

    private String sanitize(String input) {
        return input == null ? "unknown" : input.replaceAll("[^a-zA-Z0-9_\\-]", "_");
    }

    public Optional<QRVerification> verifyQr(UUID bookingId) {
        return qrVerificationRepo.findByBookingId(bookingId).map(qr -> {
            qr.setIsVerified(true);
            qr.setVerifiedAt(LocalDateTime.now());
            return qrVerificationRepo.save(qr);
        });
    }

    public Optional<QRVerification> getByBooking(UUID bookingId) {
        return qrVerificationRepo.findByBookingId(bookingId);
    }
}
