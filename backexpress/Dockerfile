# Use an official Node.js runtime as a parent image
FROM node:lts

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set the environment variable
ENV PORT=8080

# Expose the port your application listens on
EXPOSE 8080

# Start the application
CMD ["node", "app.js"]