FROM nginx:alpine

RUN rm -f /usr/share/nginx/html/index.html 
RUN rm -f /usr/share/nginx/jtml/50x.html
COPY dist/aline-member-dashboard/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]