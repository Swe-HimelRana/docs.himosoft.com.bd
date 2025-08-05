---
title: Docker Compose
description: Learn how to use Docker Compose to define and run multi-container applications
sidebar_position: 7
---

# Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. With a single `docker-compose.yml` file, you can configure your application's services, networks, and volumes.

## Understanding Docker Compose

### What is Docker Compose?

Docker Compose allows you to define a multi-container application in a single YAML file, then create and start all the services with a single command. It's perfect for development, testing, and simple production deployments.

### Key Concepts

- **Service**: A container definition in the compose file
- **Project**: A set of services defined in a compose file
- **Network**: Communication between services
- **Volume**: Data persistence for services

## Basic Docker Compose File

### Simple Example

```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    environment:
      - NGINX_HOST=localhost
      - NGINX_PORT=80

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

## Docker Compose Commands

### Basic Commands

```bash
# Start services
docker-compose up

# Start services in detached mode
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs web

# Follow logs
docker-compose logs -f

# Show running services
docker-compose ps

# Show all services
docker-compose ps -a
```

### Advanced Commands

```bash
# Build images
docker-compose build

# Build specific service
docker-compose build web

# Force rebuild
docker-compose build --no-cache

# Pull images
docker-compose pull

# Scale services
docker-compose up --scale web=3

# Execute command in service
docker-compose exec web ls -la

# Run one-off command
docker-compose run web npm install

# Show service configuration
docker-compose config

# Validate compose file
docker-compose config --quiet
```

## Service Configuration

### Basic Service Definition

```yaml
services:
  web:
    image: nginx:alpine
    container_name: my-web-app
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
      - REDIS_URL=redis://redis:6379
      - API_KEY=${API_KEY}
      - DEBUG=false
    env_file:
      - .env
      - .env.production
    volumes:
      - ./app:/app
      - app-logs:/app/logs
    networks:
      - frontend
      - backend
    depends_on:
      - db
      - redis
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Building Custom Images

```yaml
services:
  web:
    build:
      context: ./app
      dockerfile: Dockerfile
      args:
        - NODE_ENV=production
        - VERSION=1.0.0
    image: myapp:latest
    ports:
      - "3000:3000"

  api:
    build:
      context: ./api
      dockerfile: Dockerfile.prod
      target: production
    image: myapi:latest
    ports:
      - "8000:8000"
```

### Multi-Stage Builds

```yaml
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    image: myapp:latest
    ports:
      - "3000:3000"
```

## Networking

### Default Networks

Docker Compose automatically creates a default network for your project. Services can communicate using service names.

```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"

  api:
    image: my-api:latest
    # Can communicate with 'web' service using hostname 'web'
    environment:
      - WEB_URL=http://web:80
```

### Custom Networks

```yaml
services:
  web:
    image: nginx:alpine
    networks:
      - frontend
      - backend

  api:
    image: my-api:latest
    networks:
      - backend

  db:
    image: postgres:13-alpine
    networks:
      - backend

networks:
  frontend:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
  backend:
    driver: bridge
    internal: true
    ipam:
      config:
        - subnet: 172.21.0.0/16
```

### External Networks

```yaml
services:
  web:
    image: nginx:alpine
    networks:
      - external-network

networks:
  external-network:
    external: true
    name: my-existing-network
```

## Volumes

### Named Volumes

```yaml
services:
  db:
    image: postgres:13-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - postgres_logs:/var/log/postgresql

  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
    driver: local
  postgres_logs:
    driver: local
  redis_data:
    driver: local
```

### Bind Mounts

```yaml
services:
  web:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./html:/usr/share/nginx/html:ro
      - ./logs:/var/log/nginx

  app:
    image: my-app:latest
    volumes:
      - ./app:/app
      - /app/node_modules
```

### External Volumes

```yaml
services:
  db:
    image: postgres:13-alpine
    volumes:
      - external_postgres_data:/var/lib/postgresql/data

volumes:
  external_postgres_data:
    external: true
    name: my-existing-volume
```

## Environment Variables

### Environment Configuration

```yaml
services:
  web:
    image: nginx:alpine
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
      - REDIS_URL=redis://redis:6379
      - API_KEY=${API_KEY}
      - DEBUG=false

  api:
    image: my-api:latest
    env_file:
      - .env
      - .env.production
    environment:
      - LOG_LEVEL=info
```

### Environment Files

Create `.env` file:

```env
# Database
POSTGRES_DB=myapp
POSTGRES_USER=user
POSTGRES_PASSWORD=password

# Application
NODE_ENV=production
API_KEY=your-api-key-here
DEBUG=false

# Redis
REDIS_PASSWORD=redis-password
```

## Health Checks

### Service Health Checks

```yaml
services:
  web:
    image: nginx:alpine
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  api:
    image: my-api:latest
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:8000/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s

  db:
    image: postgres:13-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5
```

## Resource Limits

### Memory and CPU Limits

```yaml
services:
  web:
    image: nginx:alpine
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '1.0'
        reservations:
          memory: 256M
          cpus: '0.5'

  api:
    image: my-api:latest
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '2.0'
        reservations:
          memory: 512M
          cpus: '1.0'
```

## Production Examples

### Web Application Stack

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - nginx-logs:/var/log/nginx
    depends_on:
      - web
    networks:
      - frontend

  web:
    build:
      context: ./app
      dockerfile: Dockerfile
      target: production
    image: myapp:latest
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    volumes:
      - app-logs:/app/logs
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - frontend
      - backend
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
      target: production
    image: myapi:latest
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    volumes:
      - api-logs:/app/logs
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - backend
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:13-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:6-alpine
    command: redis-server --requirepass redis-password
    volumes:
      - redis-data:/data
    networks:
      - backend
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres-data:
  redis-data:
  nginx-logs:
  app-logs:
  api-logs:

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true
```

### Development Environment

```yaml
version: '3.8'

services:
  web:
    build:
      context: ./app
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./app:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://devuser:devpass@db:5432/devdb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    networks:
      - dev-network

  api:
    build:
      context: ./api
      dockerfile: Dockerfile.dev
    ports:
      - "8000:8000"
    volumes:
      - ./api:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://devuser:devpass@db:5432/devdb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    networks:
      - dev-network

  db:
    image: postgres:13-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=devdb
      - POSTGRES_USER=devuser
      - POSTGRES_PASSWORD=devpass
    volumes:
      - dev-postgres-data:/var/lib/postgresql/data
    networks:
      - dev-network

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"
    volumes:
      - dev-redis-data:/data
    networks:
      - dev-network

  adminer:
    image: adminer:latest
    ports:
      - "8080:8080"
    networks:
      - dev-network

volumes:
  dev-postgres-data:
  dev-redis-data:

networks:
  dev-network:
    driver: bridge
```

## Advanced Features

### Service Dependencies

```yaml
services:
  web:
    image: nginx:alpine
    depends_on:
      api:
        condition: service_healthy
      db:
        condition: service_started

  api:
    image: my-api:latest
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
```

### Service Scaling

```yaml
services:
  web:
    image: nginx:alpine
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 512M
          cpus: '1.0'
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
```

### Secrets Management

```yaml
services:
  api:
    image: my-api:latest
    secrets:
      - db_password
      - api_key

secrets:
  db_password:
    file: ./secrets/db_password.txt
  api_key:
    external: true
```

## Best Practices

### Compose File Best Practices

1. **Use specific image tags**:
   ```yaml
   services:
     web:
       image: nginx:1.21-alpine  # Instead of nginx:latest
   ```

2. **Use health checks**:
   ```yaml
   services:
     web:
       healthcheck:
         test: ["CMD", "curl", "-f", "http://localhost/health"]
         interval: 30s
         timeout: 10s
         retries: 3
   ```

3. **Set resource limits**:
   ```yaml
   services:
     web:
       deploy:
         resources:
           limits:
             memory: 512M
             cpus: '1.0'
   ```

4. **Use environment files**:
   ```yaml
   services:
     web:
       env_file:
         - .env
         - .env.production
   ```

5. **Use named volumes**:
   ```yaml
   services:
     db:
       volumes:
         - postgres_data:/var/lib/postgresql/data
   
   volumes:
     postgres_data:
   ```

### Security Best Practices

```yaml
services:
  web:
    image: nginx:alpine
    user: "1000:1000"
    read_only: true
    tmpfs:
      - /tmp
      - /var/cache/nginx
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
```

## Troubleshooting

### Common Issues

1. **Service won't start**:
   ```bash
   # Check logs
   docker-compose logs service-name
   
   # Check configuration
   docker-compose config
   
   # Run service interactively
   docker-compose run service-name /bin/bash
   ```

2. **Network connectivity issues**:
   ```bash
   # Check network
   docker-compose exec service-name ping other-service
   
   # Inspect network
   docker network ls
   docker network inspect project-name_default
   ```

3. **Volume issues**:
   ```bash
   # Check volume mounts
   docker-compose exec service-name ls -la /path/to/volume
   
   # Recreate volumes
   docker-compose down -v
   docker-compose up
   ```

### Debugging Commands

```bash
# Show service status
docker-compose ps

# Show service logs
docker-compose logs -f service-name

# Execute command in service
docker-compose exec service-name /bin/bash

# Show service configuration
docker-compose config service-name

# Validate compose file
docker-compose config --quiet
```

## Next Steps

Now that you understand Docker Compose, you can:

1. [Work with volumes and networks](./volumes-networks.md)
2. [Manage containers and images](./container-management.md)

## Summary

In this guide, you learned:

- How to create and manage Docker Compose files
- Service configuration and dependencies
- Networking and volume management
- Environment variable handling
- Health checks and resource limits
- Production and development examples
- Best practices and troubleshooting

You're now ready to orchestrate multi-container applications with Docker Compose! 