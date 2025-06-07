# Use Java 21 JDK base image
FROM eclipse-temurin:21-jdk

# Set the working directory inside the container
WORKDIR /app

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
