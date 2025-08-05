---
title: SSL Configuration
description: Configure SSL/HTTPS for Nginx using Let's Encrypt on Debian/Ubuntu and CentOS.
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SSL Configuration

Configure HTTPS for your Nginx websites using Let's Encrypt certificates.

---

## Prerequisites

### 1. Domain Name
- Must point to your server's IP address
- DNS propagation completed

### 2. Nginx Server Block
- Server block already configured
- ServerName matches your domain

---

## Let's Encrypt SSL (Recommended)

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

### 1. Install Certbot
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Obtain SSL Certificate
```bash
sudo certbot --nginx -d example.com -d www.example.com
```

### 3. Auto-Renewal Setup
```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

</TabItem>
<TabItem value="centos" label="CentOS">

### 1. Install Certbot
```bash
sudo yum install epel-release -y
sudo yum install certbot python3-certbot-nginx -y
```

### 2. Obtain SSL Certificate
```bash
sudo certbot --nginx -d example.com -d www.example.com
```

### 3. Auto-Renewal Setup
```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

</TabItem>
</Tabs>

---

## Manual SSL Configuration

### 1. Generate Private Key
```bash
sudo openssl genrsa -out /etc/ssl/private/example.com.key 2048
```

### 2. Generate Certificate Signing Request
```bash
sudo openssl req -new -key /etc/ssl/private/example.com.key -out /etc/ssl/certs/example.com.csr
```

### 3. Generate Self-Signed Certificate (for testing)
```bash
sudo openssl x509 -req -days 365 -in /etc/ssl/certs/example.com.csr -signkey /etc/ssl/private/example.com.key -out /etc/ssl/certs/example.com.crt
```

### 4. Configure Server Block for SSL

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo nano /etc/nginx/sites-available/example.com
```

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com www.example.com;
    
    ssl_certificate /etc/ssl/certs/example.com.crt;
    ssl_certificate_key /etc/ssl/private/example.com.key;
    
    root /var/www/example.com;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    error_log /var/log/nginx/example.com_error.log;
    access_log /var/log/nginx/example.com_access.log;
}
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo nano /etc/nginx/conf.d/example.com.conf
```

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com www.example.com;
    
    ssl_certificate /etc/ssl/certs/example.com.crt;
    ssl_certificate_key /etc/ssl/private/example.com.key;
    
    root /var/www/html/example.com;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    error_log /var/log/nginx/example.com_error.log;
    access_log /var/log/nginx/example.com_access.log;
}
```

</TabItem>
</Tabs>

### 5. Enable Site and Test

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo nginx -t
sudo systemctl restart nginx
```

</TabItem>
</Tabs>

---

## SSL Renewal

### Let's Encrypt Auto-Renewal
```bash
# Test renewal
sudo certbot renew --dry-run

# Manual renewal
sudo certbot renew
```

### Manual Certificate Renewal
```bash
# Generate new certificate
sudo openssl x509 -req -days 365 -in /etc/ssl/certs/example.com.csr -signkey /etc/ssl/private/example.com.key -out /etc/ssl/certs/example.com.crt

# Reload Nginx
sudo systemctl reload nginx
```

---

## Force HTTPS Redirect

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo nano /etc/nginx/sites-available/example.com
```

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;
}
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo nano /etc/nginx/conf.d/example.com.conf
```

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;
}
```

</TabItem>
</Tabs>

---

## Quick Commands

| Task | Command |
|------|---------|
| Check SSL status | `sudo certbot certificates` |
| Test renewal | `sudo certbot renew --dry-run` |
| Manual renewal | `sudo certbot renew` |
| Delete certificate | `sudo certbot delete --cert-name example.com` |
| Check Nginx SSL | `sudo nginx -t` |

---

**Note:** Let's Encrypt certificates expire after 90 days. Auto-renewal is essential. 