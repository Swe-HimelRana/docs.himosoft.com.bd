---
title: Virtual Hosts Configuration
description: Configure Apache Virtual Hosts for multiple domains on Debian/Ubuntu and CentOS.
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Virtual Hosts Configuration

Configure Apache to serve multiple websites on the same server.

---

## Virtual Host Setup

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

### 1. Create Virtual Host File
```bash
sudo nano /etc/apache2/sites-available/example.com.conf
```

### 2. Add Virtual Host Configuration
```apache
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/example.com
    ErrorLog ${APACHE_LOG_DIR}/example.com_error.log
    CustomLog ${APACHE_LOG_DIR}/example.com_access.log combined
</VirtualHost>
```

### 3. Create Web Directory
```bash
sudo mkdir -p /var/www/example.com
sudo chown -R www-data:www-data /var/www/example.com
```

### 4. Enable Site
```bash
sudo a2ensite example.com.conf
sudo systemctl reload apache2
```

### 5. Disable Default Site (Optional)
```bash
sudo a2dissite 000-default.conf
sudo systemctl reload apache2
```

</TabItem>
<TabItem value="centos" label="CentOS">

### 1. Create Virtual Host File
```bash
sudo nano /etc/httpd/conf.d/example.com.conf
```

### 2. Add Virtual Host Configuration
```apache
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/html/example.com
    ErrorLog logs/example.com_error.log
    CustomLog logs/example.com_access.log combined
</VirtualHost>
```

### 3. Create Web Directory
```bash
sudo mkdir -p /var/www/html/example.com
sudo chown -R apache:apache /var/www/html/example.com
```

### 4. Restart Apache
```bash
sudo systemctl restart httpd
```

</TabItem>
</Tabs>

---

## Multiple Virtual Hosts

### Example: Two Sites
```apache
# Site 1
<VirtualHost *:80>
    ServerName site1.com
    DocumentRoot /var/www/site1.com
</VirtualHost>

# Site 2
<VirtualHost *:80>
    ServerName site2.com
    DocumentRoot /var/www/site2.com
</VirtualHost>
```

---

## Quick Commands

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

| Task | Command |
|------|---------|
| Enable site | `sudo a2ensite site.conf` |
| Disable site | `sudo a2dissite site.conf` |
| List sites | `ls /etc/apache2/sites-enabled/` |
| Test config | `sudo apache2ctl configtest` |

</TabItem>
<TabItem value="centos" label="CentOS">

| Task | Command |
|------|---------|
| Enable site | Edit `/etc/httpd/conf.d/` |
| Disable site | Remove from `/etc/httpd/conf.d/` |
| List sites | `ls /etc/httpd/conf.d/` |
| Test config | `sudo apachectl configtest` |

</TabItem>
</Tabs>

---

**Note:** Always test configuration and reload Apache after changes. 