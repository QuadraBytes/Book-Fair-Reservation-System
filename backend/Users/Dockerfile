FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/*.jar user-service.jar
EXPOSE 9081
ENTRYPOINT ["java", "-jar", "user-service.jar"]
