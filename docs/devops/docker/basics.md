---
title: Docker Basics
description: Learn the fundamental concepts and commands of Docker
sidebar_position: 2
---

# Docker Basics

Docker is a containerization platform that allows you to package applications with their dependencies into standardized units called containers. This guide covers the fundamental concepts and basic commands you need to get started with Docker.

## What is Docker?

Docker is a platform for developing, shipping, and running applications in containers. Containers are lightweight, portable, and self-sufficient units that can run anywhere Docker is installed.

### Key Concepts

- **Container**: A lightweight, standalone, executable package that includes everything needed to run an application
- **Image**: A read-only template used to create containers
- **Dockerfile**: A text file with instructions to build a Docker image
- **Registry**: A storage and distribution system for Docker images
- **Docker Hub**: The default public registry for Docker images

## Docker Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Docker Client │    │  Docker Daemon  │    │   Docker Hub    │
│                 │◄──►│                 │◄──►│                 │
│  docker CLI     │    │  Container      │    │  Public Images  │
│                 │    │  Management     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Containers    │
                       │                 │
                       │  Running Apps   │
                       └─────────────────┘
```

## Basic Docker Commands

### System Information

```bash
# Check Docker version
docker --version

# Get system-wide information
docker system info

# Show Docker disk usage
docker system df

# Display running containers
docker ps

# Display all containers (including stopped)
docker ps -a

# Show Docker images
docker images
```

### Working with Images

```bash
# Pull an image from Docker Hub
docker pull ubuntu:20.04

# List all images
docker images

# Remove an image
docker rmi ubuntu:20.04

# Remove all unused images
docker image prune

# Inspect an image
docker inspect ubuntu:20.04
```

### Working with Containers

```bash
# Run a container
docker run ubuntu:20.04

# Run container in detached mode
docker run -d ubuntu:20.04

# Run container with interactive terminal
docker run -it ubuntu:20.04 /bin/bash

# Run container with port mapping
docker run -p 8080:80 nginx

# Run container with volume mounting
docker run -v /host/path:/container/path ubuntu:20.04

# Run container with environment variables
docker run -e VARIABLE_NAME=value ubuntu:20.04

# Stop a running container
docker stop <container_id>

# Start a stopped container
docker start <container_id>

# Restart a container
docker restart <container_id>

# Remove a container
docker rm <container_id>

# Remove all stopped containers
docker container prune
```

### Container Management

```bash
# Execute command in running container
docker exec -it <container_id> /bin/bash

# View container logs
docker logs <container_id>

# Follow container logs
docker logs -f <container_id>

# Copy files from/to container
docker cp <container_id>:/path/to/file /host/path
docker cp /host/path <container_id>:/container/path

# Inspect container details
docker inspect <container_id>

# View container resource usage
docker stats
```

## Container Lifecycle

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Created   │───►│   Running   │───►│   Stopped   │───►│   Removed   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       ▲                   │                   ▲
       │                   ▼                   │
       └───────────┐    ┌─────────────┐    ┌─────────────┐
                   │    │   Paused    │    │   Exited    │
                   └────┘             └────┘             │
                                                         │
                                                         └─────────────┘
```

### Lifecycle Commands

```bash
# Create container without starting
docker create ubuntu:20.04

# Start container
docker start <container_id>

# Stop container gracefully
docker stop <container_id>

# Kill container forcefully
docker kill <container_id>

# Pause container
docker pause <container_id>

# Unpause container
docker unpause <container_id>

# Remove container
docker rm <container_id>
```

## Working with Images

### Image Layers

Docker images are built in layers. Each instruction in a Dockerfile creates a new layer:

```dockerfile
FROM ubuntu:20.04          # Base layer
RUN apt-get update         # Layer 1
RUN apt-get install nginx  # Layer 2
COPY app /app              # Layer 3
CMD ["nginx"]              # Layer 4
```

### Image Commands

```bash
# Build image from Dockerfile
docker build -t myapp:1.0 .

# Tag an image
docker tag myapp:1.0 myapp:latest

# Push image to registry
docker push myapp:1.0

# Pull image from registry
docker pull myapp:1.0

# Save image to tar file
docker save -o myapp.tar myapp:1.0

# Load image from tar file
docker load -i myapp.tar

# Remove image
docker rmi myapp:1.0

# Remove all unused images
docker image prune -a
```

## Networking Basics

### Default Networks

Docker creates three default networks:

```bash
# List networks
docker network ls

# Inspect network
docker network inspect bridge

# Create custom network
docker network create my-network

# Connect container to network
docker run --network my-network ubuntu:20.04

# Disconnect container from network
docker network disconnect my-network <container_id>
```

### Port Mapping

```bash
# Map host port to container port
docker run -p 8080:80 nginx

# Map specific host IP
docker run -p 127.0.0.1:8080:80 nginx

# Map range of ports
docker run -p 8080-8090:80 nginx

# Expose port without mapping
docker run --expose 80 nginx
```

## Volume Management

### Named Volumes

```bash
# Create a named volume
docker volume create my-volume

# List volumes
docker volume ls

# Inspect volume
docker volume inspect my-volume

# Remove volume
docker volume rm my-volume

# Remove all unused volumes
docker volume prune
```

### Bind Mounts

```bash
# Mount host directory to container
docker run -v /host/path:/container/path ubuntu:20.04

# Mount with read-only access
docker run -v /host/path:/container/path:ro ubuntu:20.04

# Use named volume
docker run -v my-volume:/container/path ubuntu:20.04
```

## Environment Variables

```bash
# Set environment variable
docker run -e VARIABLE_NAME=value ubuntu:20.04

# Set multiple environment variables
docker run -e VAR1=value1 -e VAR2=value2 ubuntu:20.04

# Load from file
docker run --env-file .env ubuntu:20.04

# Pass all host environment variables
docker run --env-file - ubuntu:20.04
```

## Resource Limits

```bash
# Limit memory usage
docker run -m 512m ubuntu:20.04

# Limit CPU usage
docker run --cpus=2 ubuntu:20.04

# Limit CPU shares
docker run --cpu-shares=1024 ubuntu:20.04

# Set memory and CPU limits
docker run -m 1g --cpus=1.5 ubuntu:20.04
```

## Best Practices

### Container Best Practices

1. **Use specific image tags**: Avoid using `latest` tag in production
2. **Run containers as non-root**: Use `USER` instruction in Dockerfile
3. **Keep containers small**: Use multi-stage builds and remove unnecessary files
4. **Use health checks**: Implement health checks for your applications
5. **Limit resource usage**: Set memory and CPU limits

### Security Best Practices

```bash
# Run container as non-root user
docker run --user 1000:1000 ubuntu:20.04

# Read-only root filesystem
docker run --read-only ubuntu:20.04

# Drop capabilities
docker run --cap-drop=ALL ubuntu:20.04

# Set security options
docker run --security-opt=no-new-privileges ubuntu:20.04
```

## Common Use Cases

### Development Environment

```bash
# Run development server
docker run -p 3000:3000 -v $(pwd):/app node:16

# Run database
docker run -d --name postgres -e POSTGRES_PASSWORD=password postgres:13

# Run Redis
docker run -d --name redis redis:6
```

### Testing

```bash
# Run tests in container
docker run --rm -v $(pwd):/app node:16 npm test

# Run integration tests
docker-compose up --abort-on-container-exit
```

## Next Steps

Now that you understand Docker basics, you can:

1. [Create your first container](./first-container.md)
2. [Build Docker images](./building-images.md)
3. [Work with Docker Compose](./docker-compose.md)
4. [Manage containers and images](./container-management.md)
5. [Work with volumes and networks](./volumes-networks.md)

## Additional Resources

- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Community](https://forums.docker.com/)
- [Docker GitHub](https://github.com/docker/docker-ce) 