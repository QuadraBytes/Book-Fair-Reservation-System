package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.security;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtRequestFilter extends HttpFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtRequestFilter.class);
    private static final String SECRET = "SUPER_SECRET_KEY_123456789_987654321_SUPER_SECRET";

    private final JwtUtil jwtUtil;

    public JwtRequestFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilter(HttpServletRequest request,
                            HttpServletResponse response,
                            FilterChain chain) throws IOException, ServletException {

        String path = request.getRequestURI();
        String method = request.getMethod();

        log.info("Reservation Service Incoming Request → {} {}", method, path);

        // Allow public paths
        if (path.contains("/health")) {
            log.info("Public endpoint allowed: {}", path);
            chain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("Authorization Header: {}", authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("Missing/Invalid Authorization header for {}", path);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String token = authHeader.replace("Bearer ", "");

        try {
            // Check expiration
            if (jwtUtil.isTokenExpired(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token expired. Please login again.");
                return;
            }

            // Validate signature and claims
            jwtUtil.validateToken(token);
            log.info("Token validated successfully for {}", path);

        } catch (Exception e) {
            log.error("Token validation failed → {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid token");
            return;
        }

        chain.doFilter(request, response);
    }
}
