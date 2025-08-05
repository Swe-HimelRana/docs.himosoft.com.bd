---
title: Basic Nginx Configuration
description: Essential Nginx HTTP Server configuration for Debian/Ubuntu and CentOS.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Basic Nginx Configuration

This guide covers only the most important Nginx configuration steps for **Debian/Ubuntu** and **CentOS** systems.

---

## 1. Main Config File

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

- **Main Config:** `/etc/nginx/nginx.conf`
- **Sites Directory:** `/etc/nginx/sites-available/` and `/etc/nginx/sites-enabled/`

</TabItem>
<TabItem value="centos" label="CentOS">

- **Main Config:** `/etc/nginx/nginx.conf`
- **Sites Directory:** `/etc/nginx/conf.d/`

</TabItem>
</Tabs>

## 2. Change Default Web Root (Optional)

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

Edit the default site configuration:
```bash
sudo nano /etc/nginx/sites-available/default
```
Look for `root` directive and change the path as needed.

</TabItem>
<TabItem value="centos" label="CentOS">

Edit the default site configuration:
```bash
sudo nano /etc/nginx/conf.d/default.conf
```
Look for `root` directive and change the path as needed.

</TabItem>
</Tabs>

## 3. Test Configuration

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo nginx -t
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo nginx -t
```

</TabItem>
</Tabs>

## 4. Reload/Restart Nginx

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo systemctl reload nginx
# or
sudo systemctl restart nginx
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo systemctl reload nginx
# or
sudo systemctl restart nginx
```

</TabItem>
</Tabs>

---

**Tip:** After changes, always test config and reload Nginx. 