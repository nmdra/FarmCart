# Stage 1: Build and install only production dependencies
FROM node:22-alpine3.20 AS builder

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies only, leveraging cache
RUN npm install --omit=dev && npm prune --production

# Copy the rest of the application code
COPY . .

# Stage 2: Final lightweight image for runtime
FROM node:22-alpine3.20

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app /app

# Expose the application on port 5001
EXPOSE 5001

# Run the application in development mode
CMD ["npm", "run", "watch"]
