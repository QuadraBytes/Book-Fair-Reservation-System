package com.QuadraBytes.Book_Fair_Reservation_System.Users.security;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.utils.JwtUtil;
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

        log.info("Users Service Incoming Request → {} {}", method, path);

        if (path.equals("/api/users/login") && method.equals("POST")) {
            chain.doFilter(request, response);
            return;
        }

        if (path.equals("/api/users") && method.equals("POST")) {
            chain.doFilter(request, response);
            return;
        }

        if (path.contains("/api/users/health")) {
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
            if (jwtUtil.isTokenExpired(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token expired. Please refresh.");
                return;
            }
            jwtUtil.validateToken(token); // validate signature
            log.info("Token validated successfully: {}", path);
        } catch (Exception e) {
            log.error("Token validation failed → {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        chain.doFilter(request, response);
    }
}
