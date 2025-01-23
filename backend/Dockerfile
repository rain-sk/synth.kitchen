FROM node:latest AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code
COPY ./src ./src
COPY tsconfig.json ./

# Build the app
RUN npm run build

# Step 2: Run the app
FROM node:latest AS production
WORKDIR /app

# Copy the built JS files from the build stage
COPY --from=build /app/dist /app/dist
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the backend port
EXPOSE 8000

# Run the compiled JS file
CMD ["node", "dist/main.js"]