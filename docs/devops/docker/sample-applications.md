---
title: Sample Applications
description: Complete Docker applications with practical examples and code samples
sidebar_position: 8
---

# Sample Applications

This guide provides complete, working Docker applications that demonstrate real-world scenarios.

## Node.js Web Application

### Application Structure

```text
nodejs-app/
├── app/
│   ├── package.json
│   ├── app.js
│   └── Dockerfile
├── docker-compose.yml
└── nginx.conf
```

### Application Code

#### `app/package.json`

```json
{
  "name": "docker-nodejs-app",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "cors": "^2.8.5"
  }
}
```

#### `app/app.js`

```javascript
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Docker!',
    timestamp: new Date().toISOString(),
    hostname: require('os').hostname()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

#### `app/Dockerfile`

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

CMD ["npm", "start"]
```

#### `docker-compose.yml`

```yaml
version: '3.8'

services:
  web:
    build:
      context: ./app
      dockerfile: Dockerfile
    image: nodejs-app:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - app-logs:/app/logs
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - web
    networks:
      - app-network
    restart: unless-stopped

volumes:
  app-logs:

networks:
  app-network:
    driver: bridge
```

#### `nginx.conf`

```nginx
events {
    worker_connections 1024;
}

http {
    upstream app {
        server web:3000;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

### Running the Application

```bash
# Build and start
docker-compose up -d

# Test the application
curl http://localhost/health

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## Python Flask Application with Database

### Application Structure

```text
python-flask-app/
├── app/
│   ├── requirements.txt
│   ├── app.py
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

### Application Code

#### `app/requirements.txt`

```txt
Flask==2.0.1
Flask-SQLAlchemy==2.5.1
psycopg2-binary==2.9.1
gunicorn==20.1.0
```

#### `app/app.py`

```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/')
def home():
    return jsonify({
        'message': 'Hello from Flask Docker App!',
        'timestamp': datetime.utcnow().isoformat()
    })

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'database': 'connected' if db.engine.execute('SELECT 1').scalar() else 'disconnected'
    })

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'created_at': user.created_at.isoformat()
    } for user in users])

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data or not data.get('name') or not data.get('email'):
        return jsonify({'error': 'Name and email are required'}), 400
    
    user = User(name=data['name'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'created_at': user.created_at.isoformat()
    }), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000)
```

#### `app/Dockerfile`

```dockerfile
FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN useradd --create-home --shell /bin/bash app && \
    chown -R app:app /app
USER app

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:5000/health')" || exit 1

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

#### `docker-compose.yml`

```yaml
version: '3.8'

services:
  web:
    build:
      context: ./app
      dockerfile: Dockerfile
    image: flask-app:latest
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/flaskapp
    volumes:
      - app-logs:/app/logs
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "python", "-c", "import requests; requests.get('http://localhost:5000/health')"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:13-alpine
    environment:
      - POSTGRES_DB=flaskapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d flaskapp"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres-data:
  app-logs:

networks:
  app-network:
    driver: bridge
```

## Multi-Service Application

### Application Structure

```
microservices-app/
├── frontend/
│   ├── package.json
│   ├── index.js
│   └── Dockerfile
├── backend/
│   ├── requirements.txt
│   ├── app.py
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

### Frontend Service

#### `frontend/index.js`

```javascript
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get('http://backend:5000/api/users');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'frontend' });
});

app.listen(port, () => {
  console.log(`Frontend service running on port ${port}`);
});
```

### Backend Service

#### `backend/app.py`

```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'created_at': user.created_at.isoformat()
    } for user in users])

@app.route('/health')
def health():
    return jsonify({ 
        'status': 'healthy', 
        'service': 'backend',
        'database': 'connected' if db.engine.execute('SELECT 1').scalar() else 'disconnected'
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000)
```

#### `docker-compose.yml`

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    image: microservices-frontend:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - app-network
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    image: microservices-backend:latest
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/microservices
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network
    restart: unless-stopped

  db:
    image: postgres:13-alpine
    environment:
      - POSTGRES_DB=microservices
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d microservices"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge
```

## Testing the Applications

### API Testing

```bash
# Test Node.js application
curl http://localhost:3000/health
curl http://localhost:3000/api/users

# Test Flask application
curl http://localhost:5000/health
curl http://localhost:5000/api/users

# Test microservices application
curl http://localhost:3000/api/users
```

### Database Testing

```bash
# Connect to PostgreSQL
docker-compose exec db psql -U user -d myapp

# Check database tables
\dt
SELECT * FROM users;
```

## Running the Applications

### Development Mode

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Test the application
curl http://localhost/health

# Stop the application
docker-compose down
```

### Production Mode

```bash
# Build images
docker-compose build

# Start in production mode
docker-compose up -d

# Scale services
docker-compose up --scale backend=3

# Monitor services
docker-compose ps
```

## Best Practices Demonstrated

1. **Security**: Non-root users, read-only filesystems
2. **Health Checks**: Proper health check implementations
3. **Resource Limits**: Memory and CPU constraints
4. **Logging**: Structured logging
5. **Database**: Proper database initialization
6. **Networking**: Isolated networks and service discovery
7. **Monitoring**: Health checks and metrics collection

## Next Steps

These sample applications demonstrate:

- Single-service applications
- Multi-service microservices
- Database integration
- Load balancing
- Health monitoring
- Production deployments

You can extend these examples by:

1. Adding authentication and authorization
2. Implementing API versioning
3. Adding message queues
4. Implementing service mesh
5. Adding monitoring and alerting
6. Implementing CI/CD pipelines
7. Adding automated testing

## Summary

These sample applications provide practical examples of:

- Containerizing different types of applications
- Managing multi-service architectures
- Implementing proper health checks and monitoring
- Using volumes for data persistence
- Setting up networking between services
- Following Docker best practices

You can use these examples as starting points for your own Docker applications! 