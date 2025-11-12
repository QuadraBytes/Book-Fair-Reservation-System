# Use lightweight Java 21 runtime
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Copy JAR file into the container
COPY target/*.jar api-gateway.jar

# Expose service port
EXPOSE 8080

# Start the service
ENTRYPOINT ["java", "-jar", "api-gateway.jar"]
