# Stage 1 build
FROM node:14 as build
 
# Set the working directory
WORKDIR /app
 
# Accept build arguments
ARG APP_BROKER_URL
ARG APP_API_URL
 
# Copy application code
COPY . .
 
# Set environment variables
ENV REACT_APP_API_BASEURL=$APP_API_URL
ENV REACT_APP_BROKER_URL=$APP_BROKER_URL
 
# Install dependencies and build your application
# RUN npm i gulp-sass --save-dev
RUN npm install
RUN npm run build
 
# Stage 2 build
FROM nginx:alpine
 
RUN rm -f /usr/share/nginx/html/index.html
RUN rm -f /usr/share/nginx/html/50x.html
 
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



# Stage 1: Build React application
# FROM node:14-alpine as build
# WORKDIR /app
# COPY . .
# COPY package*.json .
# COPY node_modules ./
# COPY public/ ./public/
# COPY src/ ./src/
# COPY .env ./.env
# RUN npm run build

# # Stage 2: Serve React application with NGINX
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]



# FROM nginx:alpine

# RUN rm -f /usr/share/nginx/html/index.html 
# RUN rm -f /usr/share/nginx/jtml/50x.html
# COPY build/ /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]