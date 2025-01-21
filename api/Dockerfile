FROM rust:alpine AS builder
WORKDIR /usr/src/app
RUN apk add --no-cache musl-dev
RUN USER="builder" cargo init
COPY Cargo.toml .
COPY Cargo.lock .
RUN mkdir .cargo && cargo vendor > .cargo/config
RUN cargo build --release
COPY ./src src
RUN touch src/main.rs && cargo build --release
RUN cargo install --path .

FROM alpine:latest AS runner
ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=8000
COPY --from=builder /usr/local/cargo/bin/api /usr/local/bin/api
RUN addgroup -S apigroup && adduser -S apiuser -G apigroup
USER apiuser
EXPOSE 8000
CMD ["api"]