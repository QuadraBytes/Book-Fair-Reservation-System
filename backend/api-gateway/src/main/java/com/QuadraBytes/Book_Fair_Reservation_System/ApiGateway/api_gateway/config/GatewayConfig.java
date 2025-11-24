package com.QuadraBytes.Book_Fair_Reservation_System.ApiGateway.api_gateway.config;

import com.QuadraBytes.Book_Fair_Reservation_System.ApiGateway.api_gateway.security.JwtAuthenticationFilter;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public GlobalFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }
}
