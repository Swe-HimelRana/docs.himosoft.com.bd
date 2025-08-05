---
title: Your First Docker Container
description: Learn how to create and run your first Docker container with practical examples
sidebar_position: 3
---

# Your First Docker Container

In this guide, you'll learn how to create and run your first Docker container. We'll start with simple examples and gradually move to more complex scenarios.

## Prerequisites

Before starting, ensure you have Docker installed and running:

```bash
# Verify Docker installation
docker --version

# Check if Docker daemon is running
docker system info
```

## Running Your First Container

### Hello World Container

Let's start with the classic "Hello World" example:

```bash
# Run the hello-world container
docker run hello-world
```

This command will:
1. Pull the `hello-world` image from Docker Hub
2. Create and start a container
3. Display a welcome message
4. Stop and remove the container

### Interactive Ubuntu Container

Let's run a more interactive container:

```bash
# Run Ubuntu container with interactive terminal
docker run -it ubuntu:20.04 /bin/bash
```

This command:
- `-i`: Keep STDIN open (interactive)
- `-t`: Allocate a pseudo-TTY (terminal)
- `ubuntu:20.04`: The image to use
- `/bin/bash`: The command to run

Once inside the container, you can:

```bash
# Check the OS version
cat /etc/os-release

# Install a package
apt-get update && apt-get install -y curl

# Check if curl is installed
curl --version

# Exit the container
exit
```

### Running a Web Server

Let's run a web server container:

```bash
# Run Nginx web server
docker run -d -p 8080:80 --name my-nginx nginx:alpine
```

This command:
- `-d`: Run in detached mode (background)
- `-p 8080:80`: Map host port 8080 to container port 80
- `--name my-nginx`: Give the container a name
- `nginx:alpine`: Use the lightweight Alpine-based Nginx image

Now you can:
- Access the web server at `http://localhost:8080`
- View container logs: `docker logs my-nginx`
- Stop the container: `docker stop my-nginx`

## Working with Container States

### Container Lifecycle

```bash
# Create a container without starting it
docker create --name test-container ubuntu:20.04

# Start the container
docker start test-container

# Check container status
docker ps -a

# Stop the container
docker stop test-container

# Remove the container
docker rm test-container
```

### Container Management Commands

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# View container logs
docker logs <container_name>

# Follow logs in real-time
docker logs -f <container_name>

# Execute command in running container
docker exec -it <container_name> /bin/bash

# Copy files from container
docker cp <container_name>:/path/to/file /host/path

# Inspect container details
docker inspect <container_name>
```

## Building a Simple Application

Let's create a simple Node.js application and run it in a container.

### Step 1: Create the Application

Create a new directory and files:

```bash
mkdir my-node-app
cd my-node-app
```

Create `package.json`:

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "A simple Node.js application",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

Create `app.js`:

```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Docker!',
    timestamp: new Date().toISOString(),
    hostname: require('os').hostname()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### Step 2: Create a Dockerfile

Create `Dockerfile`:

```dockerfile
# Use official Node.js runtime as base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Define command to run the application
CMD ["npm", "start"]
```

### Step 3: Build and Run the Container

```bash
# Build the image
docker build -t my-node-app:1.0 .

# Run the container
docker run -d -p 3000:3000 --name my-app my-node-app:1.0

# Test the application
curl http://localhost:3000

# View logs
docker logs my-app

# Stop the container
docker stop my-app
```

## Working with Data

### Using Volumes

```bash
# Create a named volume
docker volume create app-data

# Run container with volume
docker run -d \
  -p 3000:3000 \
  -v app-data:/app/data \
  --name my-app-with-volume \
  my-node-app:1.0

# Check volume details
docker volume inspect app-data
```

### Using Bind Mounts

```bash
# Run container with bind mount
docker run -d \
  -p 3000:3000 \
  -v $(pwd):/app \
  --name my-app-bind \
  my-node-app:1.0
```

## Environment Variables

### Setting Environment Variables

```bash
# Run container with environment variables
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  --name my-app-env \
  my-node-app:1.0
```

### Using Environment File

Create `.env` file:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@db:5432/mydb
```

Run container with env file:

```bash
docker run -d \
  -p 3000:3000 \
  --env-file .env \
  --name my-app-env-file \
  my-node-app:1.0
```

## Networking

### Default Networking

```bash
# Run container on default bridge network
docker run -d \
  -p 3000:3000 \
  --name my-app-bridge \
  my-node-app:1.0

# Check network details
docker network inspect bridge
```

### Custom Network

```bash
# Create custom network
docker network create my-network

# Run container on custom network
docker run -d \
  -p 3000:3000 \
  --network my-network \
  --name my-app-custom \
  my-node-app:1.0

# List networks
docker network ls
```

## Multi-Container Application

Let's create a simple multi-container application with a web app and database.

### Step 1: Create Docker Compose File

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:13-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Step 2: Run the Application

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs web

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Best Practices

### Container Best Practices

1. **Use specific image tags**:
   ```bash
   # Good
   docker run node:16-alpine
   
   # Avoid
   docker run node:latest
   ```

2. **Run as non-root user**:
   ```dockerfile
   # In Dockerfile
   USER node
   ```

3. **Use health checks**:
   ```dockerfile
   # In Dockerfile
   HEALTHCHECK --interval=30s --timeout=3s \
     CMD curl -f http://localhost:3000/health || exit 1
   ```

4. **Set resource limits**:
   ```bash
   docker run -m 512m --cpus=1 my-app:1.0
   ```

### Security Best Practices

```bash
# Run container as non-root
docker run --user 1000:1000 my-app:1.0

# Read-only root filesystem
docker run --read-only my-app:1.0

# Drop capabilities
docker run --cap-drop=ALL my-app:1.0
```

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Check what's using the port
   lsof -i :3000
   
   # Use different port
   docker run -p 3001:3000 my-app:1.0
   ```

2. **Container won't start**:
   ```bash
   # Check container logs
   docker logs <container_name>
   
   # Run interactively to debug
   docker run -it my-app:1.0 /bin/bash
   ```

3. **Permission issues**:
   ```bash
   # Fix volume permissions
   docker run -v $(pwd):/app:rw my-app:1.0
   ```

## Next Steps

Now that you've created your first container, you can:

1. [Build custom Docker images](./building-images.md)
2. [Work with Docker Compose](./docker-compose.md)
3. [Manage containers and images](./container-management.md)
4. [Work with volumes and networks](./volumes-networks.md)

## Summary

In this guide, you learned:

- How to run your first Docker container
- Container lifecycle management
- Building and running custom applications
- Working with volumes and environment variables
- Networking basics
- Multi-container applications with Docker Compose
- Best practices for container security and performance

You're now ready to explore more advanced Docker concepts and build more complex containerized applications! 