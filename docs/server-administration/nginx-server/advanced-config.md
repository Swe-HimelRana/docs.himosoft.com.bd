---
title: Advanced Nginx Configuration
description: Advanced Nginx configuration including security, performance, and common directives for Debian/Ubuntu and CentOS.
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Advanced Nginx Configuration

Essential advanced Nginx configuration for security, performance, and common use cases.

---

## Security Headers

### Add Security Headers
```nginx
server {
    listen 80;
    server_name example.com;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    root /var/www/example.com;
    index index.html;
}
```

---

## Performance Optimization

### Gzip Compression
```nginx
# In http block or server block
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_proxied any;
gzip_comp_level 6;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/json
    application/javascript
    application/xml+rss
    application/atom+xml
    image/svg+xml;
```

### Browser Caching
```nginx
# Cache static files
location ~* \.(jpg|jpeg|png|gif|ico|css|js|pdf|txt)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Cache fonts
location ~* \.(woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## Common Location Blocks

### PHP Processing
```nginx
location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
}
```

### Proxy to Backend
```nginx
location /api/ {
    proxy_pass http://localhost:3000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### Deny Access to Hidden Files
```nginx
location ~ /\. {
    deny all;
    access_log off;
    log_not_found off;
}
```

---

## Load Balancing

### Basic Load Balancer
```nginx
upstream backend {
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
    server 192.168.1.12:8080;
}

server {
    listen 80;
    server_name example.com;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Rate Limiting

### Basic Rate Limiting
```nginx
# Define rate limit zone
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

server {
    listen 80;
    server_name example.com;
    
    # Apply rate limiting to API
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://backend;
    }
}
```

---

## Custom Error Pages

### Error Page Configuration
```nginx
server {
    listen 80;
    server_name example.com;
    
    # Custom error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    
    location = /404.html {
        root /var/www/example.com;
        internal;
    }
    
    location = /50x.html {
        root /var/www/example.com;
        internal;
    }
}
```

---

## Logging Configuration

### Custom Log Format
```nginx
# Define custom log format
log_format main_ext '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for" '
                    'rt=$request_time uct="$upstream_connect_time" '
                    'uht="$upstream_header_time" urt="$upstream_response_time"';

server {
    listen 80;
    server_name example.com;
    
    # Use custom log format
    access_log /var/log/nginx/example.com_access.log main_ext;
    error_log /var/log/nginx/example.com_error.log;
}
```

---

## Troubleshooting

### Check Configuration
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Test configuration
sudo nginx -t

# Check configuration with specific file
sudo nginx -t -c /etc/nginx/nginx.conf

# Show configuration
sudo nginx -T
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
# Test configuration
sudo nginx -t

# Check configuration with specific file
sudo nginx -t -c /etc/nginx/nginx.conf

# Show configuration
sudo nginx -T
```

</TabItem>
</Tabs>

### Check Logs
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check error logs
sudo tail -f /var/log/nginx/error.log

# Check access logs
sudo tail -f /var/log/nginx/access.log

# Check specific site logs
sudo tail -f /var/log/nginx/example.com_error.log
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
# Check error logs
sudo tail -f /var/log/nginx/error.log

# Check access logs
sudo tail -f /var/log/nginx/access.log

# Check specific site logs
sudo tail -f /var/log/nginx/example.com_error.log
```

</TabItem>
</Tabs>

### Common Issues

#### Permission Issues
```bash
# Fix file permissions
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html

# Check Nginx user
sudo nginx -t
```

#### Port Already in Use
```bash
# Check what's using port 80
sudo netstat -tulpn | grep :80
sudo lsof -i :80

# Kill process using port 80
sudo fuser -k 80/tcp
```

---

## Quick Commands

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

| Task | Command |
|------|---------|
| Test config | `sudo nginx -t` |
| Reload config | `sudo systemctl reload nginx` |
| Restart Nginx | `sudo systemctl restart nginx` |
| Check status | `sudo systemctl status nginx` |
| View logs | `sudo tail -f /var/log/nginx/error.log` |

</TabItem>
<TabItem value="centos" label="CentOS">

| Task | Command |
|------|---------|
| Test config | `sudo nginx -t` |
| Reload config | `sudo systemctl reload nginx` |
| Restart Nginx | `sudo systemctl restart nginx` |
| Check status | `sudo systemctl status nginx` |
| View logs | `sudo tail -f /var/log/nginx/error.log` |

</TabItem>
</Tabs>

---

**Note:** Always test configuration before reloading Nginx. 