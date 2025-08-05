---
title: Container and Image Management
description: Learn how to effectively manage Docker containers and images with advanced techniques
sidebar_position: 5
---

# Container and Image Management

Effective management of Docker containers and images is crucial for production environments. This guide covers advanced container and image management techniques, monitoring, and optimization strategies.

## Container Lifecycle Management

### Container States

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

### Container Lifecycle Commands

```bash
# Create container without starting
docker create --name my-container nginx:alpine

# Start container
docker start my-container

# Stop container gracefully
docker stop my-container

# Kill container forcefully
docker kill my-container

# Restart container
docker restart my-container

# Pause container
docker pause my-container

# Unpause container
docker unpause my-container

# Remove container
docker rm my-container

# Remove running container forcefully
docker rm -f my-container
```

## Container Monitoring and Inspection

### Container Information

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# List containers with specific format
docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"

# Show container logs
docker logs my-container

# Follow logs in real-time
docker logs -f my-container

# Show last N lines
docker logs --tail 100 my-container

# Show logs with timestamps
docker logs -t my-container
```

### Container Inspection

```bash
# Inspect container details
docker inspect my-container

# Inspect specific fields
docker inspect -f '{{.State.Status}}' my-container

# Inspect container IP address
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-container

# Inspect container mounts
docker inspect -f '{{.Mounts}}' my-container

# Inspect container environment variables
docker inspect -f '{{.Config.Env}}' my-container
```

### Container Statistics

```bash
# Show container resource usage
docker stats

# Show stats for specific container
docker stats my-container

# Show stats without truncation
docker stats --no-trunc

# Show stats in format
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

## Container Operations

### Executing Commands in Containers

```bash
# Execute command in running container
docker exec my-container ls -la

# Execute interactive shell
docker exec -it my-container /bin/bash

# Execute as specific user
docker exec -u root my-container whoami

# Execute with environment variables
docker exec -e VAR=value my-container echo $VAR

# Execute with working directory
docker exec -w /app my-container pwd
```

### Copying Files

```bash
# Copy file from container to host
docker cp my-container:/app/file.txt ./file.txt

# Copy file from host to container
docker cp ./file.txt my-container:/app/file.txt

# Copy directory from container
docker cp my-container:/app/data ./data

# Copy directory to container
docker cp ./data my-container:/app/data
```

### Container Updates

```bash
# Update container configuration
docker update --memory 512m my-container

# Update CPU limits
docker update --cpus 1.5 my-container

# Update restart policy
docker update --restart=unless-stopped my-container

# Update multiple settings
docker update \
  --memory 1g \
  --cpus 2 \
  --restart=unless-stopped \
  my-container
```

## Image Management

### Image Operations

```bash
# List all images
docker images

# List images with format
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

# Remove specific image
docker rmi nginx:alpine

# Remove image forcefully
docker rmi -f nginx:alpine

# Remove all unused images
docker image prune

# Remove all images
docker rmi $(docker images -q)

# Remove dangling images
docker image prune -f
```

### Image Inspection

```bash
# Inspect image details
docker inspect nginx:alpine

# Show image history
docker history nginx:alpine

# Show image layers
docker image ls --tree

# Show image size
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

# Show image digest
docker images --digests
```

### Image Tagging and Pushing

```bash
# Tag image
docker tag nginx:alpine my-nginx:v1.0

# Tag for registry
docker tag nginx:alpine registry.example.com/my-nginx:v1.0

# Push image to registry
docker push registry.example.com/my-nginx:v1.0

# Push all tags
docker push registry.example.com/my-nginx

# Pull image from registry
docker pull registry.example.com/my-nginx:v1.0
```

## Advanced Container Management

### Container Resource Limits

```bash
# Set memory limit
docker run -m 512m nginx:alpine

# Set CPU limit
docker run --cpus 2 nginx:alpine

# Set CPU shares
docker run --cpu-shares 1024 nginx:alpine

# Set memory and swap
docker run -m 512m --memory-swap 1g nginx:alpine

# Set block IO limits
docker run --device-read-bps /dev/sda:1mb nginx:alpine
```

### Container Security

```bash
# Run as non-root user
docker run --user 1000:1000 nginx:alpine

# Read-only root filesystem
docker run --read-only nginx:alpine

# Drop capabilities
docker run --cap-drop=ALL nginx:alpine

# Add capabilities
docker run --cap-add=SYS_ADMIN nginx:alpine

# Set security options
docker run --security-opt=no-new-privileges nginx:alpine

# Set seccomp profile
docker run --security-opt seccomp=unconfined nginx:alpine
```

### Container Networking

```bash
# Create custom network
docker network create my-network

# Run container on custom network
docker run --network my-network nginx:alpine

# Connect container to network
docker network connect my-network my-container

# Disconnect container from network
docker network disconnect my-network my-container

# Set container hostname
docker run --hostname myhost nginx:alpine

# Add DNS servers
docker run --dns 8.8.8.8 nginx:alpine
```

## Container Orchestration

### Container Dependencies

```bash
# Run container with dependency
docker run -d --name db postgres:13
docker run -d --name app --link db:database my-app:latest

# Use custom network for communication
docker network create app-network
docker run -d --name db --network app-network postgres:13
docker run -d --name app --network app-network my-app:latest
```

### Container Health Checks

```bash
# Run container with health check
docker run -d \
  --health-cmd="curl -f http://localhost:3000/health || exit 1" \
  --health-interval=30s \
  --health-timeout=3s \
  --health-retries=3 \
  my-app:latest

# Check health status
docker inspect --format='{{.State.Health.Status}}' my-container
```

## System Management

### Docker System Commands

```bash
# Show system information
docker system info

# Show disk usage
docker system df

# Prune unused data
docker system prune

# Prune with confirmation
docker system prune -a

# Show detailed disk usage
docker system df -v
```

### Cleanup Operations

```bash
# Remove stopped containers
docker container prune

# Remove unused networks
docker network prune

# Remove unused volumes
docker volume prune

# Remove unused images
docker image prune

# Remove everything unused
docker system prune -a --volumes
```

## Monitoring and Logging

### Container Logs

```bash
# Show logs with timestamps
docker logs -t my-container

# Show logs since specific time
docker logs --since="2023-01-01T00:00:00" my-container

# Show logs until specific time
docker logs --until="2023-01-02T00:00:00" my-container

# Show logs with specific number of lines
docker logs --tail 50 my-container

# Show logs for multiple containers
docker logs container1 container2
```

### Resource Monitoring

```bash
# Monitor container resources
docker stats

# Monitor specific containers
docker stats container1 container2

# Monitor with format
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"

# Monitor without truncation
docker stats --no-trunc
```

## Troubleshooting

### Common Issues

1. **Container won't start**:
   ```bash
   # Check container logs
   docker logs my-container
   
   # Run container interactively
   docker run -it my-image /bin/bash
   
   # Check container configuration
   docker inspect my-container
   ```

2. **Container exits immediately**:
   ```bash
   # Check exit code
   docker inspect -f '{{.State.ExitCode}}' my-container
   
   # Run with different command
   docker run my-image /bin/bash
   
   # Check if entrypoint exists
   docker inspect -f '{{.Config.Entrypoint}}' my-image
   ```

3. **Permission denied**:
   ```bash
   # Run as root for debugging
   docker run -u root my-image
   
   # Check file permissions
   docker exec my-container ls -la
   
   # Fix permissions in Dockerfile
   RUN chown -R user:user /app
   ```

### Debugging Techniques

```bash
# Run container in debug mode
docker run -it --entrypoint /bin/bash my-image

# Inspect running container
docker exec -it my-container /bin/bash

# Check container processes
docker top my-container

# Check container network
docker exec my-container netstat -tulpn

# Check container mounts
docker exec my-container mount
```

## Best Practices

### Container Best Practices

1. **Use specific image tags**:
   ```bash
   # Good
   docker run nginx:1.21-alpine
   
   # Avoid
   docker run nginx:latest
   ```

2. **Set resource limits**:
   ```bash
   docker run -m 512m --cpus=1 my-app:latest
   ```

3. **Use health checks**:
   ```dockerfile
   HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
     CMD curl -f http://localhost:3000/health || exit 1
   ```

4. **Clean up regularly**:
   ```bash
   # Set up cleanup cron job
   0 2 * * * docker system prune -f
   ```

### Image Best Practices

1. **Use multi-stage builds**:
   ```dockerfile
   FROM node:16-alpine AS builder
   # ... build steps
   FROM node:16-alpine AS production
   COPY --from=builder /app/dist /app
   ```

2. **Remove unnecessary files**:
   ```dockerfile
   RUN apt-get update && \
       apt-get install -y package && \
       rm -rf /var/lib/apt/lists/*
   ```

3. **Use .dockerignore**:
   ```
   node_modules
   .git
   *.log
   .env
   ```

## Next Steps

Now that you can manage containers and images effectively, you can:

1. [Work with Docker Compose](./docker-compose.md)
2. [Work with volumes and networks](./volumes-networks.md)

## Summary

In this guide, you learned:

- Advanced container lifecycle management
- Container monitoring and inspection techniques
- Image management and optimization
- Security and resource management
- Troubleshooting and debugging techniques
- Best practices for production environments

You're now ready to manage Docker containers and images in production environments! 