# Frontend Dockerfile
FROM node:14

WORKDIR /app

# Copy the application code
COPY . /app

# Install dependencies
RUN npm install

# Build the application for production
RUN npm run build

# Install serve package to serve static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "build", "-l", "3000"]
