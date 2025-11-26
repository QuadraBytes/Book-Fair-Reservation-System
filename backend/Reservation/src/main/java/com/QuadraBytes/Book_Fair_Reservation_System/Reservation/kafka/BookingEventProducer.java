package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.kafka;

import com.quadrabytes.events.BookingEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class BookingEventProducer {

    private final KafkaTemplate<String, BookingEvent> kafkaTemplate;

    @Value("${kafka.topic.booking-events}")
    private String topic;

    public BookingEventProducer(KafkaTemplate<String, BookingEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void send(BookingEvent event) {
        kafkaTemplate.send(topic, event.getBookingId().toString(), event);
        System.out.println("📤 Sent Event → " + event.getEventType());
    }

}
