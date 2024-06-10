# # Stage 1 build
FROM node:14 as build
 
# Set the working directory
WORKDIR /app
 
# Accept build arguments
ARG APP_MEMBER_DASHBOARD_URL
ARG APP_API_URL
 
# Copy application code
COPY . .
 
# Set environment variables
ENV REACT_APP_MEMBER_DASHBOARD_URL=$APP_MEMBER_DASHBOARD_URL
ENV REACT_APP_API=$APP_API_URL
 
# RUN npm install --quiet node-sass
RUN npm install
RUN npm run build
# RUN npm install -g serve
# RUN serve -s build -l ${PORT}
 
# Stage 2 build
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