# Use node as the base image for building
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Vite app for production
RUN npm run build

# Use Nginx to serve the built app
FROM nginx:alpine

# Copy built files from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default nginx config and replace with custom config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
