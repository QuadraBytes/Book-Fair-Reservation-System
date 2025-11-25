package com.QuadraBytes.Book_Fair_Reservation_System.ApiGateway.api_gateway.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public GroupedOpenApi userService() {
        return GroupedOpenApi.builder()
                .group("user-service")
                .pathsToMatch("/users-service/api/**")
                .build();
    }

    @Bean
    public GroupedOpenApi reservationService() {
        return GroupedOpenApi.builder()
                .group("reservation-service")
                .pathsToMatch("/reservation-service/api/**")
                .build();
    }

    @Bean
    public GroupedOpenApi notificationService() {
        return GroupedOpenApi.builder()
                .group("notification-service")
                .pathsToMatch("/notifications-service/api/**")
                .build();
    }
}

