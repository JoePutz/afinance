FROM maven:3.8.4-openjdk-17 AS builder

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:17-alpine

WORKDIR /app

COPY --from=builder /app/target/aline-gateway-0.0.1-SNAPSHOT.jar .

COPY src/main/resources/.env ./

EXPOSE 8080

CMD [ "java", "-jar", "aline-gateway-0.0.1-SNAPSHOT.jar" ]