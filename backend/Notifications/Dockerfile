FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/*.jar notification-service.jar
EXPOSE 9083
ENTRYPOINT ["java", "-jar", "notification-service.jar"]
