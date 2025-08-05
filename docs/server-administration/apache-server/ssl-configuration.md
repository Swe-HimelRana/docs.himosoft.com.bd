---
title: SSL Configuration
description: Configure SSL/HTTPS for Apache using Let's Encrypt on Debian/Ubuntu and CentOS.
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SSL Configuration

Configure HTTPS for your Apache websites using Let's Encrypt certificates.

---

## Prerequisites

### 1. Domain Name
- Must point to your server's IP address
- DNS propagation completed

### 2. Apache Virtual Host
- Virtual host already configured
- ServerName matches your domain

---

## Let's Encrypt SSL (Recommended)

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

### 1. Install Certbot
```bash
sudo apt update
sudo apt install certbot python3-certbot-apache -y
```

### 2. Obtain SSL Certificate
```bash
sudo certbot --apache -d example.com -d www.example.com
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
sudo yum install certbot python3-certbot-apache -y
```

### 2. Obtain SSL Certificate
```bash
sudo certbot --apache -d example.com -d www.example.com
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

### 4. Configure Virtual Host for SSL

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo nano /etc/apache2/sites-available/example.com-ssl.conf
```

```apache
<VirtualHost *:443>
    ServerName example.com
    DocumentRoot /var/www/example.com
    
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/example.com.crt
    SSLCertificateKeyFile /etc/ssl/private/example.com.key
    
    ErrorLog ${APACHE_LOG_DIR}/example.com_error.log
    CustomLog ${APACHE_LOG_DIR}/example.com_access.log combined
</VirtualHost>
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo nano /etc/httpd/conf.d/example.com-ssl.conf
```

```apache
<VirtualHost *:443>
    ServerName example.com
    DocumentRoot /var/www/html/example.com
    
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/example.com.crt
    SSLCertificateKeyFile /etc/ssl/private/example.com.key
    
    ErrorLog logs/example.com_error.log
    CustomLog logs/example.com_access.log combined
</VirtualHost>
```

</TabItem>
</Tabs>

### 5. Enable SSL Module and Site

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo a2enmod ssl
sudo a2ensite example.com-ssl.conf
sudo systemctl reload apache2
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo systemctl restart httpd
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

# Reload Apache
sudo systemctl reload apache2
```

---

## Force HTTPS Redirect

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo nano /etc/apache2/sites-available/example.com.conf
```

```apache
<VirtualHost *:80>
    ServerName example.com
    Redirect permanent / https://example.com/
</VirtualHost>
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo nano /etc/httpd/conf.d/example.com.conf
```

```apache
<VirtualHost *:80>
    ServerName example.com
    Redirect permanent / https://example.com/
</VirtualHost>
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
| Check Apache SSL | `sudo apache2ctl -S` (Ubuntu) / `sudo apachectl -S` (CentOS) |

---

**Note:** Let's Encrypt certificates expire after 90 days. Auto-renewal is essential. 