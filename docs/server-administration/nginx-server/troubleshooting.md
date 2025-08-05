---
title: Troubleshooting Nginx
description: Common Nginx HTTP Server issues and solutions for Debian/Ubuntu and CentOS.
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Nginx Troubleshooting

Common issues and solutions for Nginx HTTP Server.

---

## Check Nginx Status

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo systemctl status nginx
sudo nginx -t
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo systemctl status nginx
sudo nginx -t
```

</TabItem>
</Tabs>

---

## Common Issues

### 1. Nginx Won't Start

#### Check Error Logs
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo tail -f /var/log/nginx/error.log
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo tail -f /var/log/nginx/error.log
```

</TabItem>
</Tabs>

#### Common Solutions
```bash
# Check if port 80 is in use
sudo netstat -tulpn | grep :80
sudo lsof -i :80

# Kill process using port 80
sudo fuser -k 80/tcp

# Check Nginx configuration
sudo nginx -t
```

### 2. Permission Issues

#### Fix File Permissions
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo chown -R nginx:nginx /var/www/html
sudo chmod -R 755 /var/www/html
```

</TabItem>
</Tabs>

#### Fix Directory Permissions
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo chown www-data:www-data /var/www/html
sudo chmod 755 /var/www/html
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo chown nginx:nginx /var/www/html
sudo chmod 755 /var/www/html
```

</TabItem>
</Tabs>

### 3. Server Block Not Working

#### Check Server Block Configuration
```bash
# Test configuration
sudo nginx -t

# Show configuration
sudo nginx -T

# Check server blocks
sudo nginx -T | grep server
```

#### Enable Site (Debian/Ubuntu)
```bash
sudo ln -s /etc/nginx/sites-available/your-site /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Check Server Block Files
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
ls -la /etc/nginx/sites-enabled/
ls -la /etc/nginx/sites-available/
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
ls -la /etc/nginx/conf.d/
```

</TabItem>
</Tabs>

### 4. SSL Certificate Issues

#### Check SSL Certificate
```bash
# Check certificate validity
openssl x509 -in /etc/ssl/certs/your-cert.crt -text -noout

# Check certificate expiration
openssl x509 -in /etc/ssl/certs/your-cert.crt -noout -dates
```

#### Let's Encrypt Issues
```bash
# Check certificate status
sudo certbot certificates

# Test renewal
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal
```

### 5. Configuration Issues

#### Check Configuration Syntax
```bash
# Test configuration
sudo nginx -t

# Show full configuration
sudo nginx -T

# Check specific configuration file
sudo nginx -t -c /etc/nginx/nginx.conf
```

#### Common Configuration Errors
```bash
# Check for syntax errors
sudo nginx -t

# Check for missing files
sudo nginx -t 2>&1 | grep -i "no such file"

# Check for permission issues
sudo nginx -t 2>&1 | grep -i "permission"
```

### 6. Performance Issues

#### Check Nginx Processes
```bash
# Check running processes
ps aux | grep nginx

# Check memory usage
free -h

# Check CPU usage
top -p $(pgrep nginx | tr '\n' ',' | sed 's/,$//')
```

#### Optimize Nginx Configuration
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo nano /etc/nginx/nginx.conf
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo nano /etc/nginx/nginx.conf
```

</TabItem>
</Tabs>

Add/modify these settings:
```nginx
# Reduce worker processes
worker_processes auto;

# Increase worker connections
events {
    worker_connections 1024;
    use epoll;
}

# Enable keep-alive
http {
    keepalive_timeout 65;
    keepalive_requests 100;
}
```

### 7. Firewall Issues

#### Debian/Ubuntu (UFW)
```bash
# Check UFW status
sudo ufw status

# Allow Nginx
sudo ufw allow 'Nginx Full'

# Check if UFW is blocking
sudo ufw status numbered
```

#### CentOS (firewalld)
```bash
# Check firewall status
sudo firewall-cmd --state

# Allow HTTP/HTTPS
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Check allowed services
sudo firewall-cmd --list-services
```

### 8. Log Analysis

#### Check Access Logs
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo tail -f /var/log/nginx/access.log
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo tail -f /var/log/nginx/access.log
```

</TabItem>
</Tabs>

#### Check Error Logs
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo tail -f /var/log/nginx/error.log
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo tail -f /var/log/nginx/error.log
```

</TabItem>
</Tabs>

#### Monitor Real-time Logs
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo tail -f /var/log/nginx/*.log
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo tail -f /var/log/nginx/*.log
```

</TabItem>
</Tabs>

---

## Quick Diagnostic Commands

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

| Issue | Command |
|-------|---------|
| Check Nginx status | `sudo systemctl status nginx` |
| Test configuration | `sudo nginx -t` |
| Check port usage | `sudo netstat -tulpn \| grep :80` |
| Check processes | `ps aux \| grep nginx` |
| Check logs | `sudo tail -f /var/log/nginx/error.log` |
| Check server blocks | `sudo nginx -T \| grep server` |
| Check modules | `sudo nginx -V` |

</TabItem>
<TabItem value="centos" label="CentOS">

| Issue | Command |
|-------|---------|
| Check Nginx status | `sudo systemctl status nginx` |
| Test configuration | `sudo nginx -t` |
| Check port usage | `sudo netstat -tulpn \| grep :80` |
| Check processes | `ps aux \| grep nginx` |
| Check logs | `sudo tail -f /var/log/nginx/error.log` |
| Check server blocks | `sudo nginx -T \| grep server` |
| Check modules | `sudo nginx -V` |

</TabItem>
</Tabs>

---

## Emergency Commands

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Stop Nginx immediately
sudo systemctl stop nginx

# Start Nginx
sudo systemctl start nginx

# Restart Nginx
sudo systemctl restart nginx

# Reload configuration
sudo systemctl reload nginx
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
# Stop Nginx immediately
sudo systemctl stop nginx

# Start Nginx
sudo systemctl start nginx

# Restart Nginx
sudo systemctl restart nginx

# Reload configuration
sudo systemctl reload nginx
```

</TabItem>
</Tabs>

---

## Common Error Messages

### 502 Bad Gateway
- **Cause**: Upstream server is down or unreachable
- **Solution**: Check backend server status and connectivity

### 504 Gateway Timeout
- **Cause**: Upstream server is too slow to respond
- **Solution**: Increase proxy timeout settings

### 413 Request Entity Too Large
- **Cause**: Request body exceeds client_max_body_size
- **Solution**: Increase client_max_body_size in configuration

### 403 Forbidden
- **Cause**: Permission issues or missing index file
- **Solution**: Check file permissions and index files

---

**Note:** Always check logs first when troubleshooting Nginx issues. 