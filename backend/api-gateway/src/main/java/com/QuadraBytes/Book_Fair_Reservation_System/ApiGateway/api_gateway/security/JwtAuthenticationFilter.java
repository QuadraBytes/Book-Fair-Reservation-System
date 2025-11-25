package com.QuadraBytes.Book_Fair_Reservation_System.ApiGateway.api_gateway.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

@Component
public class JwtAuthenticationFilter implements GlobalFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private final String SECRET = "SUPER_SECRET_KEY_123456789_987654321_SUPER_SECRET";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();
        String method = exchange.getRequest().getMethod().name();

        log.info("API Gateway Incoming Request → {} {}", method, path);

        // Allow login + create user
        if (path.contains("/login") ||
                (path.contains("/users") && method.equals("POST"))) {

            log.info("Public endpoint allowed: {}", path);
            return chain.filter(exchange);
        }

        // Validate token header
        if (!exchange.getRequest().getHeaders().containsKey("Authorization")) {
            log.warn("Missing Authorization header at: {}", path);
            return unauthorized(exchange, "Missing Authorization Header");
        }

        String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
        log.info("Authorization Header: {}", authHeader);

        String token = authHeader.replace("Bearer ", "");

        try {
            Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(token);

            log.info("Token validation successful for request: {}", path);

        } catch (Exception e) {
            log.error("Invalid Token → Error: {}", e.getMessage());
            return unauthorized(exchange, "Invalid Token");
        }

        return chain.filter(exchange);
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange, String message) {
        log.warn("Unauthorized Request: {}", message);
        exchange.getResponse().setStatusCode(org.springframework.http.HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }
}
