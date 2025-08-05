---
title: Troubleshooting Apache
description: Common Apache HTTP Server issues and solutions for Debian/Ubuntu and CentOS.
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Apache Troubleshooting

Common issues and solutions for Apache HTTP Server.

---

## Check Apache Status

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo systemctl status apache2
sudo apache2ctl configtest
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo systemctl status httpd
sudo apachectl configtest
```

</TabItem>
</Tabs>

---

## Common Issues

### 1. Apache Won't Start

#### Check Error Logs
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo tail -f /var/log/apache2/error.log
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo tail -f /var/log/httpd/error_log
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

# Check Apache configuration
sudo apache2ctl configtest  # Ubuntu
sudo apachectl configtest    # CentOS
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
sudo chown -R apache:apache /var/www/html
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
sudo chown apache:apache /var/www/html
sudo chmod 755 /var/www/html
```

</TabItem>
</Tabs>

### 3. Virtual Host Not Working

#### Check Virtual Host Configuration
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo apache2ctl -S
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo apachectl -S
```

</TabItem>
</Tabs>

#### Enable Site (Debian/Ubuntu)
```bash
sudo a2ensite your-site.conf
sudo systemctl reload apache2
```

#### Check Virtual Host Files
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
ls -la /etc/apache2/sites-enabled/
ls -la /etc/apache2/sites-available/
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
ls -la /etc/httpd/conf.d/
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

### 5. .htaccess Not Working

#### Check AllowOverride
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
grep -r "AllowOverride" /etc/apache2/
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
grep -r "AllowOverride" /etc/httpd/
```

</TabItem>
</Tabs>

#### Enable Required Modules
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo a2enmod rewrite
sudo a2enmod headers
sudo systemctl reload apache2
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo apachectl -M | grep rewrite
```

</TabItem>
</Tabs>

### 6. Performance Issues

#### Check Apache Processes
```bash
# Check running processes
ps aux | grep apache
ps aux | grep httpd

# Check memory usage
free -h
```

#### Optimize Apache Configuration
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo nano /etc/apache2/apache2.conf
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo nano /etc/httpd/conf/httpd.conf
```

</TabItem>
</Tabs>

Add/modify these settings:
```apache
# Reduce memory usage
MaxRequestWorkers 150
MaxConnectionsPerChild 0

# Enable keep-alive
KeepAlive On
KeepAliveTimeout 5
MaxKeepAliveRequests 100
```

### 7. Firewall Issues

#### Debian/Ubuntu (UFW)
```bash
# Check UFW status
sudo ufw status

# Allow Apache
sudo ufw allow 'Apache Full'

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
sudo tail -f /var/log/apache2/access.log
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo tail -f /var/log/httpd/access_log
```

</TabItem>
</Tabs>

#### Check Error Logs
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo tail -f /var/log/apache2/error.log
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo tail -f /var/log/httpd/error_log
```

</TabItem>
</Tabs>

#### Monitor Real-time Logs
<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo tail -f /var/log/apache2/*.log
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
sudo tail -f /var/log/httpd/*.log
```

</TabItem>
</Tabs>

---

## Quick Diagnostic Commands

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

| Issue | Command |
|-------|---------|
| Check Apache status | `sudo systemctl status apache2` |
| Test configuration | `sudo apache2ctl configtest` |
| Check port usage | `sudo netstat -tulpn \| grep :80` |
| Check processes | `ps aux \| grep apache` |
| Check logs | `sudo tail -f /var/log/apache2/error.log` |
| Check virtual hosts | `sudo apache2ctl -S` |
| Check modules | `sudo apache2ctl -M` |

</TabItem>
<TabItem value="centos" label="CentOS">

| Issue | Command |
|-------|---------|
| Check Apache status | `sudo systemctl status httpd` |
| Test configuration | `sudo apachectl configtest` |
| Check port usage | `sudo netstat -tulpn \| grep :80` |
| Check processes | `ps aux \| grep httpd` |
| Check logs | `sudo tail -f /var/log/httpd/error_log` |
| Check virtual hosts | `sudo apachectl -S` |
| Check modules | `sudo apachectl -M` |

</TabItem>
</Tabs>

---

## Emergency Commands

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Stop Apache immediately
sudo systemctl stop apache2

# Start Apache
sudo systemctl start apache2

# Restart Apache
sudo systemctl restart apache2

# Reload configuration
sudo systemctl reload apache2
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
# Stop Apache immediately
sudo systemctl stop httpd

# Start Apache
sudo systemctl start httpd

# Restart Apache
sudo systemctl restart httpd

# Reload configuration
sudo systemctl reload httpd
```

</TabItem>
</Tabs>

---

**Note:** Always check logs first when troubleshooting Apache issues. 