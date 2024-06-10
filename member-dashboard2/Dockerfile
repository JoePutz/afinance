# Stage 1 build
FROM node:14 as build
 
# Set the working directory
WORKDIR /app
 
# Copy application code
COPY . .
 
# Install dependencies and build application
RUN npm install
RUN npm run build
 
# Stage 2 build
FROM nginx:alpine
 
RUN rm -f /usr/share/nginx/html/index.html
RUN rm -f /usr/share/nginx/html/50x.html
 
COPY --from=build /app/dist/aline-member-dashboard /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# FROM nginx:alpine

# RUN rm -f /usr/share/nginx/html/index.html 
# RUN rm -f /usr/share/nginx/jtml/50x.html
# COPY dist/aline-member-dashboard/ /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]