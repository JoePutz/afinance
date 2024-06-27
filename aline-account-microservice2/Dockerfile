#Stage 1 build
FROM maven:3.8.4-openjdk-17 AS builder

# Set the working directory
WORKDIR /app

#Copy Necesarry code
COPY core ./core
COPY account-microservice ./account-microservice
COPY pom.xml .

#Run Maven to clean and package the project
RUN mvn clean package -DskipTests

#Stage 2 
FROM openjdk:17-alpine

# Set the working directory
WORKDIR /app

#Copy the jar file and the environment
COPY --from=builder /app/account-microservice/target/account-microservice-0.1.0.jar .
COPY account-microservice/src/main/resources/.env ./

#Expose port
EXPOSE 8072

#Define default run command
CMD [ "java", "-jar", "account-microservice-0.1.0.jar" ]