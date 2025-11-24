package com.QuadraBytes.Book_Fair_Reservation_System.ApiGateway.api_gateway.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

@Component
public class JwtAuthenticationFilter implements GlobalFilter {

    private final String SECRET = "SUPER_SECRET_KEY_123456789_987654321_SUPER_SECRET";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        // Allow login or user creation without token
        if (exchange.getRequest().getURI().getPath().contains("/login") ||
                exchange.getRequest().getURI().getPath().contains("/users") &&
                        exchange.getRequest().getMethod().name().equals("POST")) {
            return chain.filter(exchange);
        }

        // Validate token
        if (!exchange.getRequest().getHeaders().containsKey("Authorization")) {
            return unauthorized(exchange, "Missing Authorization Header");
        }

        String token = exchange.getRequest().getHeaders()
                .getFirst("Authorization")
                .replace("Bearer ", "");

        try {
            Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(token);

        } catch (Exception e) {
            return unauthorized(exchange, "Invalid Token");
        }

        return chain.filter(exchange);
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange, String message) {
        exchange.getResponse().setStatusCode(org.springframework.http.HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }
}