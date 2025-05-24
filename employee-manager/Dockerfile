# Use official Node image as the base image
FROM node:18-alpine

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY package.json package-lock.json ./

# Install Akita before other dependencies
RUN npm install @datorama/akita --save --legacy-peer-deps

# Install all the dependencies
RUN npm install --legacy-peer-deps

# Add the source code to app
COPY . .

# Expose port 4200 for development server
EXPOSE 4200

# Start the application using ng serve directly
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]