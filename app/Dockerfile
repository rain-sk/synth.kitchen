# Step 1: Build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the built app with Nginx
FROM nginx:alpine

# Copy the built app from Step 1
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration file if needed
# This step is optional; remove if you are using the default Nginx settings.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
