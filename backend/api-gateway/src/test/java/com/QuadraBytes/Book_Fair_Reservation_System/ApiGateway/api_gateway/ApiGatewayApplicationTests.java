package com.QuadraBytes.Book_Fair_Reservation_System.ApiGateway.api_gateway;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.gateway.config.GatewayAutoConfiguration;
import org.springframework.context.annotation.Import;

@SpringBootTest
@Import(GatewayAutoConfiguration.class) // Only import gateway configuration needed for context
class ApiGatewayApplicationTests {

    @Test
    void contextLoads() {
        // Minimal context loads without starting full reactive web server
    }

}
