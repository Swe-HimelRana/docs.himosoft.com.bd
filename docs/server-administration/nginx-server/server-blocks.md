---
title: Server Blocks Configuration
description: Configure Nginx Server Blocks for multiple domains on Debian/Ubuntu and CentOS.
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Server Blocks Configuration

Configure Nginx to serve multiple websites on the same server using server blocks.

---

## Server Block Setup

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

### 1. Create Server Block File
```bash
sudo nano /etc/nginx/sites-available/example.com
```

### 2. Add Server Block Configuration
```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/example.com;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    error_log /var/log/nginx/example.com_error.log;
    access_log /var/log/nginx/example.com_access.log;
}
```

### 3. Create Web Directory
```bash
sudo mkdir -p /var/www/example.com
sudo chown -R www-data:www-data /var/www/example.com
```

### 4. Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Disable Default Site (Optional)
```bash
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

</TabItem>
<TabItem value="centos" label="CentOS">

### 1. Create Server Block File
```bash
sudo nano /etc/nginx/conf.d/example.com.conf
```

### 2. Add Server Block Configuration
```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/html/example.com;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    error_log /var/log/nginx/example.com_error.log;
    access_log /var/log/nginx/example.com_access.log;
}
```

### 3. Create Web Directory
```bash
sudo mkdir -p /var/www/html/example.com
sudo chown -R nginx:nginx /var/www/html/example.com
```

### 4. Restart Nginx
```bash
sudo nginx -t
sudo systemctl restart nginx
```

</TabItem>
</Tabs>

---

## Multiple Server Blocks

### Example: Two Sites
```nginx
# Site 1
server {
    listen 80;
    server_name site1.com;
    root /var/www/site1.com;
    index index.html;
}

# Site 2
server {
    listen 80;
    server_name site2.com;
    root /var/www/site2.com;
    index index.html;
}
```

---

## Quick Commands

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

| Task | Command |
|------|---------|
| Enable site | `sudo ln -s /etc/nginx/sites-available/site /etc/nginx/sites-enabled/` |
| Disable site | `sudo rm /etc/nginx/sites-enabled/site` |
| List sites | `ls /etc/nginx/sites-enabled/` |
| Test config | `sudo nginx -t` |

</TabItem>
<TabItem value="centos" label="CentOS">

| Task | Command |
|------|---------|
| Enable site | Create file in `/etc/nginx/conf.d/` |
| Disable site | Remove file from `/etc/nginx/conf.d/` |
| List sites | `ls /etc/nginx/conf.d/` |
| Test config | `sudo nginx -t` |

</TabItem>
</Tabs>

---

**Note:** Always test configuration and reload Nginx after changes. 