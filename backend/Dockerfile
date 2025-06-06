FROM openjdk:17-jdk-slim
WORKDIR /app
COPY . /app

# Use exec form for CMD so Docker handles signals correctly
CMD ["./mvnw", "spring-boot:run"]
