FROM node:22-bullseye

RUN apt-get update && apt-get install -y \
    git \
    curl \
    bash \
    ca-certificates \
    procps \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace