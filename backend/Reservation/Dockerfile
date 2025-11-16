FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/*.jar reservation-service.jar
EXPOSE 9082
ENTRYPOINT ["java", "-jar", "reservation-service.jar"]
