package com.QuadraBytes.Book_Fair_Reservation_System.Notifications.consumer;

import com.QuadraBytes.Book_Fair_Reservation_System.Notifications.service.EmailService;
import com.quadrabytes.events.BookingEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import java.util.Map;
import java.util.HashMap;

@Service
public class BookingEventConsumer {

    private final EmailService emailService;

    public BookingEventConsumer(EmailService emailService) {
        this.emailService = emailService;
    }

    @KafkaListener(topics = "${kafka.topic.booking-events}", groupId = "notifications-service")
    public void consume(BookingEvent event) {
        System.out.println("📥 RECEIVED EVENT → " + event.getEventType());

        try {
            switch (event.getEventType()) {
                case "BOOKING_CREATED" -> handleBookingCreated(event);
                case "BOOKING_UPDATED" -> handleBookingUpdated(event);
                case "BOOKING_DELETED" -> handleBookingDeleted(event);
                default -> System.out.println("⚠️ Unknown event type: " + event.getEventType());
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("❌ Failed to send email for event: " + event.getEventType());
        }
    }

    private void handleBookingCreated(BookingEvent e) throws MessagingException {
        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("username", nvl(e.getUsername()));
        placeholders.put("stallNumber", String.valueOf(e.getStallNumber()));
        placeholders.put("stallType", nvl(e.getStallType()));
        placeholders.put("bookingId", String.valueOf(e.getBookingId()));
        placeholders.put("qrUrl", nvl(e.getQrUrl()));

        emailService.sendTemplateEmail(
                e.getEmail(),
                "Your stall booking is confirmed",
                "booking-created",
                placeholders
        );
    }

    private void handleBookingUpdated(BookingEvent e) throws MessagingException {
        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("username", nvl(e.getUsername()));
        placeholders.put("stallNumber", String.valueOf(e.getStallNumber()));
        placeholders.put("stallType", nvl(e.getStallType()));
        placeholders.put("bookingId", String.valueOf(e.getBookingId()));
        placeholders.put("qrUrl", nvl(e.getQrUrl()));          // may be null → handled
        placeholders.put("bookingStatus", nvl(e.getBookingStatus())); // may be null

        emailService.sendTemplateEmail(
                e.getEmail(),
                "Your stall booking was updated",
                "booking-updated",
                placeholders
        );
    }

    private void handleBookingDeleted(BookingEvent e) throws MessagingException {
        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("username", nvl(e.getUsername()));
        placeholders.put("stallNumber", String.valueOf(e.getStallNumber()));
        placeholders.put("bookingId", String.valueOf(e.getBookingId()));

        emailService.sendTemplateEmail(
                e.getEmail(),
                "Your stall booking was cancelled",
                "booking-deleted",
                placeholders
        );
    }

    /** Helper: never return null strings */
    private String nvl(String value) {
        return value != null ? value : "";
    }

}
