# Use Node.js 14 LTS as base image
FROM node:14 AS builder
 
# Set working directory
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package.json ./
 
# Install dependencies
RUN npm install
 
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
 
# Copy the rest of the application code
COPY . .
 
# Build the React app
RUN npm run build
 
# Stage 2: Serve app with nginx server
FROM nginx:alpine
 
# Copy build files from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html
 
 
# Expose port 80
EXPOSE 80
 
# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]




#This below here works and if the one above doesn't, I will return to this. 
# # # Stage 1 build
# FROM node:14 as build
 
# # Set the working directory
# WORKDIR /app
 
# # Accept build arguments
# ARG APP_MEMBER_DASHBOARD_URL
# ARG APP_API_URL
 
# # Copy application code
# COPY . .
 
# # Set environment variables
# ENV REACT_APP_MEMBER_DASHBOARD_URL=$APP_MEMBER_DASHBOARD_URL
# ENV REACT_APP_API=$APP_API_URL
 
# # RUN npm install --quiet node-sass
# RUN npm install
# RUN npm run build
# # RUN npm install -g serve
# # RUN serve -s build -l ${PORT}
 
# # Stage 2 build
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]







#I don't think this is right, but keeping for posterity
# FROM nginx:alpine

# RUN rm -f /usr/share/nginx/html/index.html 
# RUN rm -f /usr/share/nginx/jtml/50x.html
# COPY build/ /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]