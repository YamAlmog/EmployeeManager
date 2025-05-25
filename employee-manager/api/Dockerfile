# Use official Node image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3000 for the API
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 