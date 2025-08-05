---
title: Apache Installation (Debian/Ubuntu & CentOS)
description: Minimal guide to install and start Apache HTTP Server on Debian/Ubuntu and CentOS.
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Apache HTTP Server Installation

This guide covers the essential steps to install and start Apache (httpd) on **Debian/Ubuntu** and **CentOS** systems.

---

## Installation Steps

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

### 1. Update Package Index
```bash
sudo apt update
```

### 2. Install Apache
```bash
sudo apt install apache2 -y
```

### 3. Start and Enable Apache
```bash
sudo systemctl start apache2
sudo systemctl enable apache2
```

### 4. Check Status
```bash
sudo systemctl status apache2
```

### 5. Allow HTTP/HTTPS in Firewall (if UFW is enabled)
```bash
sudo ufw allow 'Apache Full'
```

### 6. Test in Browser
Visit: [http://localhost](http://localhost) or your server's IP address.

</TabItem>
<TabItem value="centos" label="CentOS">

### 1. Update Package Index
```bash
sudo yum update -y
```

### 2. Install Apache (httpd)
```bash
sudo yum install httpd -y
```

### 3. Start and Enable Apache
```bash
sudo systemctl start httpd
sudo systemctl enable httpd
```

### 4. Check Status
```bash
sudo systemctl status httpd
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

## Uninstall Apache

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo apt remove --purge apache2 -y
sudo apt autoremove -y
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo yum remove httpd -y
```

</TabItem>
</Tabs>

---

## Quick Commands Reference

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

| Task                | Command                    |
|---------------------|----------------------------|
| Start Apache        | `sudo systemctl start apache2` |
| Stop Apache         | `sudo systemctl stop apache2`  |
| Restart Apache      | `sudo systemctl restart apache2` |
| Enable on Boot      | `sudo systemctl enable apache2` |
| Status              | `sudo systemctl status apache2` |

</TabItem>
<TabItem value="centos" label="CentOS">

| Task                | Command                    |
|---------------------|----------------------------|
| Start Apache        | `sudo systemctl start httpd` |
| Stop Apache         | `sudo systemctl stop httpd`  |
| Restart Apache      | `sudo systemctl restart httpd` |
| Enable on Boot      | `sudo systemctl enable httpd` |
| Status              | `sudo systemctl status httpd` |

</TabItem>
</Tabs>

---

**Tip:** Default web root is `/var/www/html`.