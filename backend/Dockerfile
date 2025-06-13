# Use a secure and stable OpenJDK 21 base image
FROM eclipse-temurin:21-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies like certs 
RUN apk update && apk add --no-cache ca-certificates && update-ca-certificates

RUN apk add --no-cache bash curl tar git

# Copy Maven wrapper files (optional if you use ./mvnw)
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy the rest of the project files
COPY src ./src

# Package the application
RUN ./mvnw clean package -DskipTests

# Expose the backend port (change if not 8080)
EXPOSE 8080

# Run the application
CMD ["./mvnw", "spring-boot:run"]
