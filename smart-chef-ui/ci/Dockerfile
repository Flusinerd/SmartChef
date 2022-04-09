# Serves the build react frontend using nginx
FROM nginx:stable-alpine

# Copy the build react frontend to the container
WORKDIR /usr/share/nginx/html
COPY ./build .

# Copy Nginx configuration
COPY ./ci/nginx.conf /etc/nginx/conf.d/default.conf
