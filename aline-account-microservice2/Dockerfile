FROM maven:3.8.4-openjdk-17 AS builder

WORKDIR /app

COPY core ./core

COPY account-microservice ./account-microservice

COPY pom.xml .

RUN mvn clean package -DskipTests

FROM openjdk:17-alpine

WORKDIR /app

COPY --from=builder /app/account-microservice/target/account-microservice-0.1.0.jar .

COPY account-microservice/src/main/resources/.env ./

EXPOSE 8072

CMD [ "java", "-jar", "account-microservice-0.1.0.jar" ]