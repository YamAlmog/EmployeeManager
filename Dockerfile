# Use official Node image as the base image
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY package.json package-lock.json ./

# Install all the dependencies
RUN npm install

# Add the source code to app
COPY . .

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/empolyees-manager /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 