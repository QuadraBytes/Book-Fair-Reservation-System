# # syntax=docker/dockerfile:1
#
# # --- Build stage ---
# FROM maven:3.9-eclipse-temurin-21 AS build
# WORKDIR /workspace
# COPY pom.xml .
# RUN --mount=type=cache,target=/root/.m2 mvn -q -DskipTests dependency:go-offline
# COPY src ./src
# RUN --mount=type=cache,target=/root/.m2 mvn -q -DskipTests package
#
# # --- Runtime stage ---
# FROM eclipse-temurin:21-jre-jammy
# WORKDIR /app
# COPY --from=build /workspace/target/*.jar app.jar
# EXPOSE 9080
# ENTRYPOINT ["java", "-jar", "app.jar"]

FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/*.jar api-gateway.jar
EXPOSE 9080
ENTRYPOINT ["java", "-jar", "api-gateway.jar"]

