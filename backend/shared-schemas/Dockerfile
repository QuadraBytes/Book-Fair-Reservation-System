FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/*.jar shared-schemas.jar
EXPOSE 9081
ENTRYPOINT ["java", "-jar", "shared-schemas.jar"]
