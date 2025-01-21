# Step 1: Build the Rust application with Musl
FROM rust:latest AS builder

# Set the working directory inside the container
WORKDIR /app

# Add the musl target for cross-compilation
RUN rustup target add x86_64-unknown-linux-musl

# Build dependencies only to cache them
RUN cargo build --release --target x86_64-unknown-linux-musl

# Copy the Cargo.toml and Cargo.lock files to the container
COPY Cargo.toml Cargo.lock ./

# Now copy the actual project source code
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
