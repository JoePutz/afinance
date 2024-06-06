FROM maven:3.8.4-openjdk-17 AS builder

WORKDIR /app

COPY core ./core

COPY bank-microservice ./bank-microservice

COPY pom.xml .

RUN mvn clean package -DskipTests

FROM openjdk:17-alpine

WORKDIR /app

COPY --from=builder /app/bank-microservice/target/bank-microservice-0.1.0.jar .

COPY bank-microservice/src/main/resources/.env ./

EXPOSE 8083

CMD [ "java", "-jar", "bank-microservice-0.1.0.jar" ]