---
title: .htaccess Configuration
description: Essential .htaccess directives for Apache HTTP Server on Debian/Ubuntu and CentOS.
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# .htaccess Configuration

Essential .htaccess directives for Apache website configuration.

---

## Enable .htaccess

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```apache
# In /etc/apache2/apache2.conf or virtual host
<Directory /var/www/html>
    AllowOverride All
</Directory>
```

</TabItem>
<TabItem value="centos" label="CentOS">

```apache
# In /etc/httpd/conf/httpd.conf or virtual host
<Directory "/var/www/html">
    AllowOverride All
</Directory>
```

</TabItem>
</Tabs>

---

## Common .htaccess Directives

### 1. URL Rewriting (mod_rewrite)
```apache
RewriteEngine On

# Remove www
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove trailing slash
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1 [L,R=301]

# Custom error pages
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html
```

### 2. Security Headers
```apache
# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"

# HSTS (HTTP Strict Transport Security)
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

### 3. File Access Control
```apache
# Deny access to sensitive files
<Files ~ "\.(htaccess|htpasswd|ini|log|sh|sql|conf)$">
    Order allow,deny
    Deny from all
</Files>

# Deny access to directories
<DirectoryMatch "^/.*/\.(svn|git|hg|bzr|cvs)/">
    Order allow,deny
    Deny from all
</DirectoryMatch>

# Allow access to specific files
<Files "robots.txt">
    Order allow,deny
    Allow from all
</Files>
```

### 4. Compression (mod_deflate)
```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### 5. Browser Caching
```apache
# Cache static files
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/x-javascript "access plus 1 month"
    ExpiresByType application/x-shockwave-flash "access plus 1 month"
    ExpiresByType image/x-icon "access plus 1 year"
    ExpiresDefault "access plus 2 days"
</IfModule>
```

### 6. Directory Index
```apache
# Set default index files
DirectoryIndex index.php index.html index.htm

# Disable directory browsing
Options -Indexes
```

### 7. Custom Error Pages
```apache
# Custom error pages
ErrorDocument 400 /errors/400.html
ErrorDocument 401 /errors/401.html
ErrorDocument 403 /errors/403.html
ErrorDocument 404 /errors/404.html
ErrorDocument 500 /errors/500.html
```

### 8. PHP Settings
```apache
# PHP settings
php_value upload_max_filesize 10M
php_value post_max_size 10M
php_value max_execution_time 300
php_value max_input_vars 3000
```

### 9. Redirects
```apache
# Redirect old page to new page
Redirect 301 /old-page.html /new-page.html

# Redirect old domain to new domain
RewriteEngine On
RewriteCond %{HTTP_HOST} ^olddomain\.com$ [NC]
RewriteRule ^(.*)$ https://newdomain.com/$1 [R=301,L]
```

### 10. Password Protection
```apache
# Password protect directory
AuthType Basic
AuthName "Restricted Area"
AuthUserFile /path/to/.htpasswd
Require valid-user
```

---

## Complete Example .htaccess
```apache
# Enable rewrite engine
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove www
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Disable directory browsing
Options -Indexes

# Custom error pages
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Deny access to sensitive files
<Files ~ "\.(htaccess|htpasswd|ini|log|sql)$">
    Order allow,deny
    Deny from all
</Files>
```

---

## Enable Required Modules

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod expires
sudo a2enmod deflate
sudo systemctl reload apache2
```

</TabItem>
<TabItem value="centos" label="CentOS">

```bash
# Most modules are enabled by default
# Check if mod_rewrite is enabled
sudo apachectl -M | grep rewrite
```

</TabItem>
</Tabs>

---

**Note:** Always test .htaccess changes and ensure Apache has the required modules enabled. 