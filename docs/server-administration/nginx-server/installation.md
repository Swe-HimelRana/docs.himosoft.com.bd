---
title: Nginx Installation (Debian/Ubuntu & CentOS)
description: Minimal guide to install and start Nginx HTTP Server on Debian/Ubuntu and CentOS.
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Nginx HTTP Server Installation

This guide covers the essential steps to install and start Nginx on **Debian/Ubuntu** and **CentOS** systems.

---

## Installation Steps

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

### 1. Update Package Index
```bash
sudo apt update
```

### 2. Install Nginx
```bash
sudo apt install nginx -y
```

### 3. Start and Enable Nginx
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 4. Check Status
```bash
sudo systemctl status nginx
```

### 5. Allow HTTP/HTTPS in Firewall (if UFW is enabled)
```bash
sudo ufw allow 'Nginx Full'
```

### 6. Test in Browser
Visit: [http://localhost](http://localhost) or your server's IP address.

</TabItem>
<TabItem value="centos" label="CentOS">

### 1. Update Package Index
```bash
sudo yum update -y
```

### 2. Install Nginx
```bash
sudo yum install nginx -y
```

### 3. Start and Enable Nginx
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 4. Check Status
```bash
sudo systemctl status nginx
```

### 5. Allow HTTP/HTTPS in Firewall (if firewalld is enabled)
```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### 6. Test in Browser
Visit: [http://localhost](http://localhost) or your server's IP address.

</TabItem>
</Tabs>

---

## Uninstall Nginx

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo apt remove --purge nginx nginx-common -y
sudo apt autoremove -y
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo yum remove nginx -y
```

</TabItem>
</Tabs>

---

## Quick Commands Reference

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

| Task                | Command                    |
|---------------------|----------------------------|
| Start Nginx         | `sudo systemctl start nginx` |
| Stop Nginx          | `sudo systemctl stop nginx`  |
| Restart Nginx       | `sudo systemctl restart nginx` |
| Enable on Boot      | `sudo systemctl enable nginx` |
| Status              | `sudo systemctl status nginx` |
| Test Config         | `sudo nginx -t` |

</TabItem>
<TabItem value="centos" label="CentOS">

| Task                | Command                    |
|---------------------|----------------------------|
| Start Nginx         | `sudo systemctl start nginx` |
| Stop Nginx          | `sudo systemctl stop nginx`  |
| Restart Nginx       | `sudo systemctl restart nginx` |
| Enable on Boot      | `sudo systemctl enable nginx` |
| Status              | `sudo systemctl status nginx` |
| Test Config         | `sudo nginx -t` |

</TabItem>
</Tabs>

---

**Tip:** Default web root is `/var/www/html`. 