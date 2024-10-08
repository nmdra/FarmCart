# Stage 1: Build stage
FROM node:22-alpine3.20 AS builder

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Stage 2: Serve the application using a minimal image
FROM node:22-alpine3.20

# Set the working directory
WORKDIR /app

# Copy only the build output from the first stage
COPY --from=builder /app /app

# Expose the necessary port
EXPOSE 3001

# Serve the built application
CMD ["npm", "run", "dev"]
