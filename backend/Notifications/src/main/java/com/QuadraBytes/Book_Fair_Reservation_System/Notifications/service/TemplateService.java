package com.QuadraBytes.Book_Fair_Reservation_System.Notifications.service;

import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
public class TemplateService {

    public String loadTemplate(String templateName, Map<String, String> placeholders) {
        try {
            // Load file from resources/templates/email/
            String path = "templates/email/" + templateName + ".html";
            String content = new String(
                    StreamUtils.copyToByteArray(
                            getClass().getClassLoader().getResourceAsStream(path)
                    ),
                    StandardCharsets.UTF_8
            );

            // Replace placeholders
            for (Map.Entry<String, String> entry : placeholders.entrySet()) {
                content = content.replace("{" + entry.getKey() + "}", entry.getValue());
            }

            return content;

        } catch (IOException | NullPointerException e) {
            throw new RuntimeException("Unable to load template: " + templateName, e);
        }
    }
}
