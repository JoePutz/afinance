FROM maven:3.8.4-openjdk-17 AS builder

WORKDIR /app

COPY core ./core

COPY transaction-microservice ./transaction-microservice

COPY pom.xml .

RUN mvn clean package -DskipTests

FROM openjdk:17-alpine

WORKDIR /app

COPY --from=builder /app/transaction-microservice/target/transaction-microservice-0.1.0.jar .

COPY transaction-microservice/src/main/resources/.env ./

EXPOSE 8073

CMD [ "java", "-jar", "transaction-microservice-0.1.0.jar" ]