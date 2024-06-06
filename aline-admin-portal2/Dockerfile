# Stage 1: Build React application
FROM node:14-alpine as build
WORKDIR /app
COPY . .
COPY package*.json .
COPY node_modules ./
COPY public/ ./public/
COPY src/ ./src/
COPY .env ./.env
RUN npm run build

# Stage 2: Serve React application with NGINX
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



# FROM nginx:alpine

# RUN rm -f /usr/share/nginx/html/index.html 
# RUN rm -f /usr/share/nginx/jtml/50x.html
# COPY build/ /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]