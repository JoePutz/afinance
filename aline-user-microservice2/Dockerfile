FROM maven:3.8.4-openjdk-17 AS builder

WORKDIR /app

COPY core ./core

COPY user-microservice ./user-microservice

COPY pom.xml .

RUN mvn clean package -DskipTests

FROM openjdk:17-alpine

WORKDIR /app

COPY --from=builder /app/user-microservice/target/user-microservice-0.1.0.jar .

COPY user-microservice/src/main/resources/.env ./

EXPOSE 8070

CMD [ "java", "-jar", "user-microservice-0.1.0.jar" ]
