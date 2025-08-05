---
title: Basic Apache Configuration
description: Essential Apache HTTP Server configuration for Debian/Ubuntu and CentOS.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Basic Apache Configuration

This guide covers only the most important Apache configuration steps for **Debian/Ubuntu** and **CentOS** systems.

---

## 1. Main Config File

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

- **Main Config:** `/etc/apache2/apache2.conf`

</TabItem>
<TabItem value="centos" label="CentOS">

- **Main Config:** `/etc/httpd/conf/httpd.conf`

</TabItem>
</Tabs>

## 2. Change Default Web Root (Optional)

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

Edit the `DocumentRoot` directive:
```bash
sudo nano /etc/apache2/sites-available/000-default.conf
```
Look for `DocumentRoot` and change the path as needed.

</TabItem>
<TabItem value="centos" label="CentOS">

Edit the `DocumentRoot` directive:
```bash
sudo nano /etc/httpd/conf/httpd.conf
```
Look for `DocumentRoot` and change the path as needed.

</TabItem>
</Tabs>

## 3. Enable/Disable Modules

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

- **Enable:** `sudo a2enmod rewrite`
- **Disable:** `sudo a2dismod rewrite`
- **Reload:** `sudo systemctl reload apache2`

</TabItem>
<TabItem value="centos" label="CentOS">

- Most modules are enabled by default. Edit `/etc/httpd/conf.modules.d/*.conf` if needed.
- **Reload:** `sudo systemctl reload httpd`

</TabItem>
</Tabs>

## 4. Test Configuration

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo apache2ctl configtest
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo apachectl configtest
```

</TabItem>
</Tabs>

## 5. Reload/Restart Apache

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo systemctl reload apache2
# or
sudo systemctl restart apache2
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo systemctl reload httpd
# or
sudo systemctl restart httpd
```

</TabItem>
</Tabs>

---

**Tip:** After changes, always test config and reload Apache.