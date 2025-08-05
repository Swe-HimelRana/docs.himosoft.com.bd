---
title: Security Configuration
description: Comprehensive security configuration using bash commands for SSH hardening, firewall setup, user management, and access control for Debian/Ubuntu and CentOS.
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Security Configuration

Comprehensive security configuration using bash commands for SSH hardening, firewall setup, user management, and access control for Debian/Ubuntu and CentOS.

---

## SSH Security Hardening

### **1. Disable Root Login**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Backup SSH configuration
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup

# Edit SSH configuration
sudo nano /etc/ssh/sshd_config

# Add or modify these lines:
# PermitRootLogin no
# PasswordAuthentication no
# PubkeyAuthentication yes

# Test SSH configuration
sudo sshd -t

# Restart SSH service
sudo systemctl restart ssh

# Verify SSH is running
sudo systemctl status ssh
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Backup SSH configuration
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup

# Edit SSH configuration
sudo nano /etc/ssh/sshd_config

# Add or modify these lines:
# PermitRootLogin no
# PasswordAuthentication no
# PubkeyAuthentication yes

# Test SSH configuration
sudo sshd -t

# Restart SSH service
sudo systemctl restart sshd

# Verify SSH is running
sudo systemctl status sshd
```

</TabItem>
</Tabs>

### **2. SSH Key-Based Authentication**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key to server
ssh-copy-id username@server_ip

# Or manually copy key
cat ~/.ssh/id_ed25519.pub | ssh username@server_ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

# Set proper permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Test SSH connection
ssh username@server_ip
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key to server
ssh-copy-id username@server_ip

# Or manually copy key
cat ~/.ssh/id_ed25519.pub | ssh username@server_ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

# Set proper permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Test SSH connection
ssh username@server_ip
```

</TabItem>
</Tabs>

### **3. Change Default SSH Port**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Edit SSH configuration
sudo nano /etc/ssh/sshd_config

# Change port from 22 to custom port (e.g., 2222)
# Port 2222

# Test SSH configuration
sudo sshd -t

# Restart SSH service
sudo systemctl restart ssh

# Test new port
ssh -p 2222 username@server_ip
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Edit SSH configuration
sudo nano /etc/ssh/sshd_config

# Change port from 22 to custom port (e.g., 2222)
# Port 2222

# Test SSH configuration
sudo sshd -t

# Restart SSH service
sudo systemctl restart sshd

# Test new port
ssh -p 2222 username@server_ip
```

</TabItem>
</Tabs>

---

## Fail2Ban Configuration

### **1. Install and Configure Fail2Ban**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install Fail2Ban
sudo apt update
sudo apt install fail2ban

# Copy default configuration
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit Fail2Ban configuration
sudo nano /etc/fail2ban/jail.local

# Configure basic settings:
# [DEFAULT]
# bantime = 3600
# findtime = 600
# maxretry = 3

# Start and enable Fail2Ban
sudo systemctl start fail2ban
sudo systemctl enable fail2ban

# Check Fail2Ban status
sudo fail2ban-client status
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install Fail2Ban
sudo yum install epel-release
sudo yum install fail2ban

# Copy default configuration
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit Fail2Ban configuration
sudo nano /etc/fail2ban/jail.local

# Configure basic settings:
# [DEFAULT]
# bantime = 3600
# findtime = 600
# maxretry = 3

# Start and enable Fail2Ban
sudo systemctl start fail2ban
sudo systemctl enable fail2ban

# Check Fail2Ban status
sudo fail2ban-client status
```

</TabItem>
</Tabs>

### **2. Configure Fail2Ban Jails**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create custom jail configuration
sudo nano /etc/fail2ban/jail.d/sshd.local

# Add SSH jail configuration:
# [sshd]
# enabled = true
# port = ssh
# logpath = /var/log/auth.log
# maxretry = 3

# Restart Fail2Ban
sudo systemctl restart fail2ban

# Check banned IPs
sudo fail2ban-client status sshd

# Unban IP if needed
sudo fail2ban-client set sshd unbanip IP_ADDRESS
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create custom jail configuration
sudo nano /etc/fail2ban/jail.d/sshd.local

# Add SSH jail configuration:
# [sshd]
# enabled = true
# port = ssh
# logpath = /var/log/secure
# maxretry = 3

# Restart Fail2Ban
sudo systemctl restart fail2ban

# Check banned IPs
sudo fail2ban-client status sshd

# Unban IP if needed
sudo fail2ban-client set sshd unbanip IP_ADDRESS
```

</TabItem>
</Tabs>

---

## Firewall Configuration

### **1. UFW (Uncomplicated Firewall) - Ubuntu/Debian**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install UFW
sudo apt install ufw

# Reset UFW to default
sudo ufw --force reset

# Set default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (adjust port if changed)
sudo ufw allow ssh
# Or for custom port: sudo ufw allow 2222/tcp

# Allow web traffic
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable UFW
sudo ufw --force enable

# Check UFW status
sudo ufw status verbose
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install firewalld
sudo yum install firewalld

# Start and enable firewalld
sudo systemctl start firewalld
sudo systemctl enable firewalld

# Configure firewall zones
sudo firewall-cmd --set-default-zone=public

# Allow SSH
sudo firewall-cmd --permanent --add-service=ssh

# Allow web traffic
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https

# Reload firewall
sudo firewall-cmd --reload

# Check firewall status
sudo firewall-cmd --list-all
```

</TabItem>
</Tabs>

### **2. iptables Configuration**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Flush existing rules
sudo iptables -F
sudo iptables -X

# Set default policies
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT ACCEPT

# Allow loopback
sudo iptables -A INPUT -i lo -j ACCEPT

# Allow established connections
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow web traffic
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Save iptables rules
sudo iptables-save > /etc/iptables/rules.v4
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Flush existing rules
sudo iptables -F
sudo iptables -X

# Set default policies
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT ACCEPT

# Allow loopback
sudo iptables -A INPUT -i lo -j ACCEPT

# Allow established connections
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow web traffic
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Save iptables rules
sudo iptables-save > /etc/iptables/rules.v4
```

</TabItem>
</Tabs>

---

## User and Group Management

### **1. Create Limited-Privilege Users**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create new user
sudo adduser username

# Add user to sudo group
sudo usermod -aG sudo username

# Or create user with specific groups
sudo useradd -m -s /bin/bash -G sudo username

# Set password
sudo passwd username

# Verify user creation
id username
groups username
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create new user
sudo adduser username

# Add user to wheel group (sudo equivalent)
sudo usermod -aG wheel username

# Or create user with specific groups
sudo useradd -m -s /bin/bash -G wheel username

# Set password
sudo passwd username

# Verify user creation
id username
groups username
```

</TabItem>
</Tabs>

### **2. Configure sudo Access**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Edit sudoers file safely
sudo visudo

# Add user to sudo group (if not already done)
sudo usermod -aG sudo username

# Create sudo configuration for specific user
sudo nano /etc/sudoers.d/username

# Add line: username ALL=(ALL) NOPASSWD:ALL

# Test sudo access
sudo -u username sudo whoami
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Edit sudoers file safely
sudo visudo

# Add user to wheel group (if not already done)
sudo usermod -aG wheel username

# Create sudo configuration for specific user
sudo nano /etc/sudoers.d/username

# Add line: username ALL=(ALL) NOPASSWD:ALL

# Test sudo access
sudo -u username sudo whoami
```

</TabItem>
</Tabs>

---

## File and Directory Permissions

### **1. Set Proper File Permissions**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Set secure permissions for SSH
sudo chmod 600 /etc/ssh/sshd_config
sudo chmod 644 /etc/ssh/ssh_host_*

# Set secure permissions for user directories
sudo chmod 750 /home/username
sudo chown username:username /home/username

# Set secure permissions for web directories
sudo chown -R www-data:www-data /var/www
sudo chmod -R 755 /var/www

# Set secure permissions for log files
sudo chmod 640 /var/log/auth.log
sudo chmod 640 /var/log/secure
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Set secure permissions for SSH
sudo chmod 600 /etc/ssh/sshd_config
sudo chmod 644 /etc/ssh/ssh_host_*

# Set secure permissions for user directories
sudo chmod 750 /home/username
sudo chown username:username /home/username

# Set secure permissions for web directories
sudo chown -R apache:apache /var/www
sudo chmod -R 755 /var/www

# Set secure permissions for log files
sudo chmod 640 /var/log/secure
sudo chmod 640 /var/log/messages
```

</TabItem>
</Tabs>

### **2. Find and Fix World-Writable Files**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Find world-writable files
find / -type f -perm -002 -not -path "/proc/*" -not -path "/sys/*" 2>/dev/null

# Find world-writable directories
find / -type d -perm -002 -not -path "/proc/*" -not -path "/sys/*" 2>/dev/null

# Fix world-writable files
find / -type f -perm -002 -not -path "/proc/*" -not -path "/sys/*" -exec chmod o-w {} \; 2>/dev/null

# Find files with no owner
find / -nouser -o -nogroup 2>/dev/null
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Find world-writable files
find / -type f -perm -002 -not -path "/proc/*" -not -path "/sys/*" 2>/dev/null

# Find world-writable directories
find / -type d -perm -002 -not -path "/proc/*" -not -path "/sys/*" 2>/dev/null

# Fix world-writable files
find / -type f -perm -002 -not -path "/proc/*" -not -path "/sys/*" -exec chmod o-w {} \; 2>/dev/null

# Find files with no owner
find / -nouser -o -nogroup 2>/dev/null
```

</TabItem>
</Tabs>

---

## SELinux and AppArmor Configuration

### **1. SELinux Configuration (CentOS/RHEL)**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# AppArmor is typically used on Ubuntu/Debian
# Check AppArmor status
sudo aa-status

# List AppArmor profiles
sudo aa-status --profiled

# Enable AppArmor
sudo systemctl enable apparmor
sudo systemctl start apparmor

# Reload AppArmor profiles
sudo systemctl reload apparmor
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check SELinux status
sestatus

# Set SELinux mode to enforcing
sudo setenforce 1

# Make SELinux enforcing permanent
sudo sed -i 's/SELINUX=permissive/SELINUX=enforcing/' /etc/selinux/config

# Configure SELinux for web server
sudo semanage port -a -t http_port_t -p tcp 8080

# Configure SELinux for SSH
sudo semanage port -a -t ssh_port_t -p tcp 2222

# Check SELinux context
ls -Z /var/www
```

</TabItem>
</Tabs>

### **2. SELinux Troubleshooting**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# AppArmor troubleshooting
sudo aa-status

# Check AppArmor logs
sudo journalctl -u apparmor

# Reload AppArmor
sudo systemctl reload apparmor

# Disable AppArmor for specific service (if needed)
sudo aa-disable /usr/sbin/nginx
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check SELinux denials
sudo ausearch -m avc -ts recent

# Check SELinux logs
sudo journalctl -u audit

# Fix SELinux context
sudo restorecon -Rv /var/www

# Set SELinux context
sudo semanage fcontext -a -t httpd_exec_t "/var/www(/.*)?"

# Apply SELinux context
sudo restorecon -Rv /var/www
```

</TabItem>
</Tabs>

---

## Security Auditing

### **1. System Security Check**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install security audit tools
sudo apt install lynis

# Run security audit
sudo lynis audit system

# Check for open ports
sudo netstat -tlnp
sudo ss -tlnp

# Check for listening services
sudo lsof -i -P -n | grep LISTEN

# Check for running processes
ps aux | grep -E "(root|systemd)"
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install security audit tools
sudo yum install lynis

# Run security audit
sudo lynis audit system

# Check for open ports
sudo netstat -tlnp
sudo ss -tlnp

# Check for listening services
sudo lsof -i -P -n | grep LISTEN

# Check for running processes
ps aux | grep -E "(root|systemd)"
```

</TabItem>
</Tabs>

### **2. Security Monitoring**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Monitor SSH login attempts
sudo tail -f /var/log/auth.log | grep sshd

# Monitor system logs
sudo journalctl -f

# Check for failed login attempts
sudo grep "Failed password" /var/log/auth.log

# Check for successful logins
sudo grep "Accepted password" /var/log/auth.log

# Monitor file changes
sudo auditctl -w /etc/passwd -p wa -k passwd_changes
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Monitor SSH login attempts
sudo tail -f /var/log/secure | grep sshd

# Monitor system logs
sudo journalctl -f

# Check for failed login attempts
sudo grep "Failed password" /var/log/secure

# Check for successful logins
sudo grep "Accepted password" /var/log/secure

# Monitor file changes
sudo auditctl -w /etc/passwd -p wa -k passwd_changes
```

</TabItem>
</Tabs>

---

**Note**: Always test security configurations in a safe environment before applying them to production servers. Keep SSH access available during configuration to avoid being locked out of the system. 