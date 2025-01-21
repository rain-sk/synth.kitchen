# Step 1: Build the Rust application with Musl
FROM rust:latest AS builder

# Install the Musl toolchain for static linking
RUN rustup target add x86_64-unknown-linux-musl

# Install other dependencies
RUN apt-get update && \
    apt-get install -y \
    musl-tools \
    musl-gcc \
    pkg-config \
    libssl-dev

# Set the working directory inside the container
WORKDIR /app

# Build dependencies only to cache them
RUN cargo build --release --target x86_64-unknown-linux-musl

# Copy the project source code
COPY . .

# Build the project in release mode with Musl target
RUN cargo build --release --target x86_64-unknown-linux-musl


# Step 2: Create a final image for running the app using Alpine
FROM alpine:latest

# Install CA certificates
RUN apk add --no-cache ca-certificates && update-ca-certificates

# Set the working directory for the app
WORKDIR /app

# Copy the statically linked Rocket application from the builder stage
COPY --from=builder /app/target/x86_64-unknown-linux-musl/release/api .

# Ensure the binary is executable
RUN chmod +x ./api

# Expose the Rocket app's port (default is 8000)
EXPOSE 8000

# Run the Rocket application directly
CMD ["./api"]
