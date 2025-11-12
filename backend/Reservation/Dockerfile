FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/*.jar reservation-service.jar
EXPOSE 9082
ENTRYPOINT ["java", "-jar", "reservation-service.jar"]
