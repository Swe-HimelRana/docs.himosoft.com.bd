---
title: Building Docker Images
description: Learn how to build custom Docker images using Dockerfiles with best practices and examples
sidebar_position: 4
---

# Building Docker Images

Docker images are the foundation of containerized applications. This guide covers how to build custom Docker images using Dockerfiles, with best practices and real-world examples.

## Understanding Docker Images

### Image Layers

Docker images are built in layers. Each instruction in a Dockerfile creates a new layer:

```
┌─────────────────┐
│   Application   │ ← Layer 4 (COPY, CMD)
├─────────────────┤
│   Dependencies  │ ← Layer 3 (RUN npm install)
├─────────────────┤
│   Source Code   │ ← Layer 2 (COPY . .)
├─────────────────┤
│   Base Image    │ ← Layer 1 (FROM node:16)
└─────────────────┘
```

### Image vs Container

- **Image**: Read-only template with application code and dependencies
- **Container**: Running instance of an image

## Creating Your First Dockerfile

### Basic Dockerfile Structure

```dockerfile
# Base image
FROM ubuntu:20.04

# Metadata
LABEL maintainer="your-email@example.com"
LABEL version="1.0"
LABEL description="A simple web application"

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip3 install -r requirements.txt

# Expose port
EXPOSE 8080

# Default command
CMD ["python3", "app.py"]
```

## Dockerfile Instructions

### FROM - Base Image

```dockerfile
# Official images
FROM node:16-alpine
FROM python:3.9-slim
FROM nginx:alpine

# Custom images
FROM my-custom-base:latest

# Multi-stage builds
FROM node:16-alpine AS builder
FROM nginx:alpine AS production
```

### LABEL - Metadata

```dockerfile
LABEL maintainer="dev@himosoft.com"
LABEL version="1.0.0"
LABEL description="Web application"
LABEL vendor="Himosoft"
LABEL com.himosoft.version="1.0.0"
```

### WORKDIR - Working Directory

```dockerfile
# Set working directory
WORKDIR /app

# Create and set working directory
WORKDIR /usr/src/app
```

### COPY - Copy Files

```dockerfile
# Copy single file
COPY package.json /app/

# Copy directory
COPY src/ /app/src/

# Copy with wildcards
COPY *.js /app/

# Copy with specific permissions
COPY --chown=node:node app.js /app/
```

### ADD - Advanced Copy

```dockerfile
# Copy and extract tar files
ADD archive.tar.gz /app/

# Copy from URL
ADD https://example.com/file.txt /app/

# Copy with wildcards
ADD *.txt /app/
```

### RUN - Execute Commands

```dockerfile
# Single command
RUN npm install

# Multiple commands (recommended)
RUN apt-get update && \
    apt-get install -y \
    curl \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Using shell
RUN /bin/bash -c 'source $HOME/.bashrc && echo $HOME'
```

### ENV - Environment Variables

```dockerfile
# Set environment variable
ENV NODE_ENV=production

# Set multiple variables
ENV NODE_ENV=production \
    PORT=3000 \
    DATABASE_URL=postgresql://user:pass@db:5432/mydb

# Use in subsequent instructions
ENV PATH /usr/local/bin:$PATH
```

### ARG - Build Arguments

```dockerfile
# Define build argument
ARG VERSION=latest

# Use in build
FROM node:${VERSION}

# Set default value
ARG BUILD_DATE=unknown
ARG VCS_REF=unknown

# Use in labels
LABEL org.label-schema.build-date=$BUILD_DATE
```

### EXPOSE - Document Ports

```dockerfile
# Expose single port
EXPOSE 3000

# Expose multiple ports
EXPOSE 3000 8080

# Expose with protocol
EXPOSE 3000/tcp
```

### CMD - Default Command

```dockerfile
# Shell form
CMD npm start

# Exec form (recommended)
CMD ["npm", "start"]

# With parameters
CMD ["node", "app.js", "--port", "3000"]
```

### ENTRYPOINT - Container Entrypoint

```dockerfile
# Exec form
ENTRYPOINT ["docker-entrypoint.sh"]

# With CMD as parameters
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "start"]
```

### USER - Set User

```dockerfile
# Create user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Switch to user
USER appuser

# Switch to existing user
USER node
```

## Building Images

### Basic Build

```bash
# Build image
docker build -t myapp:1.0 .

# Build with tag
docker build -t myapp:latest -t myapp:1.0 .

# Build with no cache
docker build --no-cache -t myapp:1.0 .

# Build with progress
docker build --progress=plain -t myapp:1.0 .
```

### Advanced Build Options

```bash
# Build with build arguments
docker build \
  --build-arg VERSION=1.0.0 \
  --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  -t myapp:1.0 .

# Build with target (multi-stage)
docker build --target builder -t myapp:builder .

# Build with platform
docker build --platform linux/amd64 -t myapp:1.0 .

# Build with file
docker build -f Dockerfile.prod -t myapp:prod .
```

## Multi-Stage Builds

### Basic Multi-Stage Build

```dockerfile
# Build stage
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:16-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Complex Multi-Stage Build

```dockerfile
# Build stage
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Test stage
FROM builder AS test
RUN npm run test

# Production stage
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Language-Specific Examples

### Node.js Application

```dockerfile
# Use official Node.js runtime
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
```

### Python Application

```dockerfile
# Use official Python runtime
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd --create-home --shell /bin/bash app && \
    chown -R app:app /app
USER app

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:8000/health')" || exit 1

# Start application
CMD ["python", "app.py"]
```

### Java Application

```dockerfile
# Build stage
FROM maven:3.8-openjdk-11 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Production stage
FROM openjdk:11-jre-slim
WORKDIR /app

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy JAR file
COPY --from=builder /app/target/*.jar app.jar

# Change ownership
RUN chown appuser:appuser app.jar
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Start application
CMD ["java", "-jar", "app.jar"]
```

### Go Application

```dockerfile
# Build stage
FROM golang:1.19-alpine AS builder
WORKDIR /app

# Install dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Production stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/

# Copy binary
COPY --from=builder /app/main .

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Start application
CMD ["./main"]
```

## Best Practices

### Security Best Practices

```dockerfile
# Use specific base image tags
FROM node:16-alpine

# Run as non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# Don't run as root
USER 1000:1000

# Use multi-stage builds to reduce attack surface
FROM node:16-alpine AS builder
# ... build steps
FROM node:16-alpine AS production
COPY --from=builder /app/dist /app
```

### Performance Best Practices

```dockerfile
# Use .dockerignore
# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage

# Layer caching
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Use specific base images
FROM node:16-alpine  # Instead of node:latest

# Remove unnecessary files
RUN apt-get update && \
    apt-get install -y package && \
    rm -rf /var/lib/apt/lists/*
```

### Size Optimization

```dockerfile
# Use Alpine Linux
FROM node:16-alpine

# Use multi-stage builds
FROM node:16-alpine AS builder
# ... build steps
FROM node:16-alpine AS production
COPY --from=builder /app/dist /app

# Remove unnecessary files
RUN npm ci --only=production && \
    npm cache clean --force

# Use .dockerignore
# .dockerignore
node_modules
.git
*.log
```

## Image Management

### Tagging Images

```bash
# Tag with version
docker tag myapp:latest myapp:1.0.0

# Tag for registry
docker tag myapp:1.0.0 registry.example.com/myapp:1.0.0

# Tag with multiple tags
docker build -t myapp:latest -t myapp:1.0.0 -t myapp:1.0 .
```

### Pushing Images

```bash
# Push to Docker Hub
docker push myapp:1.0.0

# Push to private registry
docker push registry.example.com/myapp:1.0.0

# Push all tags
docker push myapp
```

### Image Inspection

```bash
# Inspect image
docker inspect myapp:1.0.0

# Show image history
docker history myapp:1.0.0

# Show image layers
docker image ls --tree

# Show image size
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
```

## Troubleshooting

### Common Build Issues

1. **Build context too large**:
   ```bash
   # Use .dockerignore
   echo "node_modules" > .dockerignore
   echo ".git" >> .dockerignore
   ```

2. **Permission denied**:
   ```dockerfile
   # Fix permissions
   RUN chown -R node:node /app
   USER node
   ```

3. **Port already in use**:
   ```bash
   # Check what's using the port
   lsof -i :3000
   ```

### Debugging Builds

```bash
# Build with verbose output
docker build --progress=plain -t myapp:debug .

# Run interactive shell
docker run -it myapp:debug /bin/bash

# Check image layers
docker history myapp:debug

# Inspect image
docker inspect myapp:debug
```

## Next Steps

Now that you can build Docker images, you can:

1. [Work with Docker Compose](./docker-compose.md)
2. [Manage containers and images](./container-management.md)
3. [Work with volumes and networks](./volumes-networks.md)

## Summary

In this guide, you learned:

- How to create Dockerfiles with best practices
- Multi-stage builds for optimization
- Language-specific Dockerfile examples
- Security and performance best practices
- Image management and troubleshooting

You're now ready to build production-ready Docker images for your applications! 