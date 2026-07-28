# ---- Stage 1: Build ----
FROM maven:3.9-eclipse-temurin-17-alpine AS build

WORKDIR /app

# Copy Maven wrapper and pom first to cache dependencies
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN chmod +x mvnw

# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline -B

# Copy source code and build
COPY src ./src
RUN ./mvnw package -DskipTests -B

# ---- Stage 2: Run ----
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Render uses the PORT environment variable
ENV PORT=8080
EXPOSE ${PORT}

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
