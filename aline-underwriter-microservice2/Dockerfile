FROM maven:3.8.4-openjdk-17 AS builder

WORKDIR /app

COPY core ./core

COPY underwriter-microservice ./underwriter-microservice

COPY pom.xml .

RUN mvn clean package -DskipTests

FROM openjdk:17-alpine

WORKDIR /app

COPY --from=builder /app/underwriter-microservice/target/underwriter-microservice-0.1.0.jar .

COPY underwriter-microservice/src/main/resources/.env ./

EXPOSE 8071

CMD [ "java", "-jar", "underwriter-microservice-0.1.0.jar" ]
