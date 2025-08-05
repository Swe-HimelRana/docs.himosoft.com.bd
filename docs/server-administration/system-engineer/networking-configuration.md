---
title: Networking Configuration
description: Comprehensive networking configuration using bash commands for static IP addresses, hostname setup, DNS resolution, and firewall port management for Debian/Ubuntu and CentOS.
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Networking Configuration

Comprehensive networking configuration using bash commands for static IP addresses, hostname setup, DNS resolution, and firewall port management for Debian/Ubuntu and CentOS.

---

## Static IP Address Configuration

### **1. Configure Static IP Addresses**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check current network interfaces
ip addr show
ifconfig -a

# Check network interface names
ls /sys/class/net/

# Edit network configuration
sudo nano /etc/netplan/01-netcfg.yaml

# Example configuration:
# network:
#   version: 2
#   renderer: networkd
#   ethernets:
#     enp0s3:
#       dhcp4: no
#       addresses:
#         - 192.168.1.100/24
#       gateway4: 192.168.1.1
#       nameservers:
#         addresses: [8.8.8.8, 8.8.4.4]

# Apply network configuration
sudo netplan apply

# Verify configuration
ip addr show
ip route show
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check current network interfaces
ip addr show
ifconfig -a

# Check network interface names
ls /sys/class/net/

# Edit network configuration
sudo nano /etc/sysconfig/network-scripts/ifcfg-eth0

# Example configuration:
# DEVICE=eth0
# BOOTPROTO=static
# IPADDR=192.168.1.100
# NETMASK=255.255.255.0
# GATEWAY=192.168.1.1
# DNS1=8.8.8.8
# DNS2=8.8.4.4
# ONBOOT=yes

# Restart network service
sudo systemctl restart network

# Verify configuration
ip addr show
ip route show
```

</TabItem>
</Tabs>

### **2. Configure Multiple Network Interfaces**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create additional network configuration
sudo nano /etc/netplan/02-secondary.yaml

# Example secondary interface:
# network:
#   version: 2
#   renderer: networkd
#   ethernets:
#     enp0s8:
#       dhcp4: no
#       addresses:
#         - 10.0.0.100/24
#       routes:
#         - to: 10.0.0.0/24
#           via: 10.0.0.1

# Apply all configurations
sudo netplan apply

# Check all interfaces
ip addr show
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create secondary interface configuration
sudo nano /etc/sysconfig/network-scripts/ifcfg-eth1

# Example secondary interface:
# DEVICE=eth1
# BOOTPROTO=static
# IPADDR=10.0.0.100
# NETMASK=255.255.255.0
# ONBOOT=yes

# Restart network service
sudo systemctl restart network

# Check all interfaces
ip addr show
```

</TabItem>
</Tabs>

### **3. Configure Network Bonding**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install bonding module
sudo modprobe bonding

# Create bond configuration
sudo nano /etc/netplan/03-bond.yaml

# Example bond configuration:
# network:
#   version: 2
#   renderer: networkd
#   bonds:
#     bond0:
#       interfaces: [enp0s3, enp0s8]
#       parameters:
#         mode: active-backup
#         mii-monitor-interval: 100
#       addresses:
#         - 192.168.1.100/24
#       gateway4: 192.168.1.1
#       nameservers:
#         addresses: [8.8.8.8, 8.8.4.4]

# Apply configuration
sudo netplan apply

# Verify bond interface
cat /proc/net/bonding/bond0
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Load bonding module
sudo modprobe bonding

# Create bond configuration
sudo nano /etc/sysconfig/network-scripts/ifcfg-bond0

# Example bond configuration:
# DEVICE=bond0
# BOOTPROTO=static
# IPADDR=192.168.1.100
# NETMASK=255.255.255.0
# GATEWAY=192.168.1.1
# ONBOOT=yes
# BONDING_OPTS="mode=active-backup miimon=100"

# Configure slave interfaces
sudo nano /etc/sysconfig/network-scripts/ifcfg-eth0
# Add: MASTER=bond0, SLAVE=yes

sudo nano /etc/sysconfig/network-scripts/ifcfg-eth1
# Add: MASTER=bond0, SLAVE=yes

# Restart network
sudo systemctl restart network

# Verify bond interface
cat /proc/net/bonding/bond0
```

</TabItem>
</Tabs>

---

## Hostname Configuration

### **1. Set System Hostname with hostnamectl**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check current hostname
hostname
hostnamectl status

# Set hostname
sudo hostnamectl set-hostname server01.example.com

# Set pretty hostname (display name)
sudo hostnamectl set-hostname "Production Server 01" --pretty

# Set static hostname
sudo hostnamectl set-hostname server01.example.com --static

# Verify hostname changes
hostname
hostnamectl status

# Check hostname in different contexts
hostname -f  # full hostname
hostname -s  # short hostname
hostname -d  # domain name
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check current hostname
hostname
hostnamectl status

# Set hostname
sudo hostnamectl set-hostname server01.example.com

# Set pretty hostname (display name)
sudo hostnamectl set-hostname "Production Server 01" --pretty

# Set static hostname
sudo hostnamectl set-hostname server01.example.com --static

# Verify hostname changes
hostname
hostnamectl status

# Check hostname in different contexts
hostname -f  # full hostname
hostname -s  # short hostname
hostname -d  # domain name
```

</TabItem>
</Tabs>

### **2. Configure Hostname in System Files**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Edit /etc/hostname file
sudo nano /etc/hostname

# Add hostname:
# server01.example.com

# Verify hostname file
cat /etc/hostname

# Check hostname resolution
getent hosts server01.example.com

# Test hostname resolution
nslookup server01.example.com
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Edit /etc/hostname file
sudo nano /etc/hostname

# Add hostname:
# server01.example.com

# Verify hostname file
cat /etc/hostname

# Check hostname resolution
getent hosts server01.example.com

# Test hostname resolution
nslookup server01.example.com
```

</TabItem>
</Tabs>

---

## DNS and Local Resolution Configuration

### **1. Edit /etc/hosts for Local Resolution**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Backup original hosts file
sudo cp /etc/hosts /etc/hosts.backup

# Edit hosts file
sudo nano /etc/hosts

# Example hosts file:
# 127.0.0.1 localhost
# 127.0.1.1 server01.example.com server01
# 192.168.1.100 server01.example.com server01
# 192.168.1.101 server02.example.com server02
# 192.168.1.102 database.example.com db

# Verify hosts file
cat /etc/hosts

# Test local resolution
ping server01.example.com
nslookup server01.example.com
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Backup original hosts file
sudo cp /etc/hosts /etc/hosts.backup

# Edit hosts file
sudo nano /etc/hosts

# Example hosts file:
# 127.0.0.1 localhost
# 127.0.1.1 server01.example.com server01
# 192.168.1.100 server01.example.com server01
# 192.168.1.101 server02.example.com server02
# 192.168.1.102 database.example.com db

# Verify hosts file
cat /etc/hosts

# Test local resolution
ping server01.example.com
nslookup server01.example.com
```

</TabItem>
</Tabs>

### **2. Configure /etc/resolv.conf for DNS**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Backup original resolv.conf
sudo cp /etc/resolv.conf /etc/resolv.conf.backup

# Edit resolv.conf
sudo nano /etc/resolv.conf

# Example resolv.conf:
# nameserver 8.8.8.8
# nameserver 8.8.4.4
# nameserver 1.1.1.1
# search example.com
# domain example.com

# Make resolv.conf immutable (prevent overwrite)
sudo chattr +i /etc/resolv.conf

# Verify DNS configuration
cat /etc/resolv.conf

# Test DNS resolution
nslookup google.com
dig google.com
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Backup original resolv.conf
sudo cp /etc/resolv.conf /etc/resolv.conf.backup

# Edit resolv.conf
sudo nano /etc/resolv.conf

# Example resolv.conf:
# nameserver 8.8.8.8
# nameserver 8.8.4.4
# nameserver 1.1.1.1
# search example.com
# domain example.com

# Make resolv.conf immutable (prevent overwrite)
sudo chattr +i /etc/resolv.conf

# Verify DNS configuration
cat /etc/resolv.conf

# Test DNS resolution
nslookup google.com
dig google.com
```

</TabItem>
</Tabs>

### **3. Configure systemd-resolved (Alternative DNS)**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Enable systemd-resolved
sudo systemctl enable systemd-resolved
sudo systemctl start systemd-resolved

# Create symbolic link
sudo ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf

# Configure systemd-resolved
sudo nano /etc/systemd/resolved.conf

# Example configuration:
# [Resolve]
# DNS=8.8.8.8 8.8.4.4 1.1.1.1
# Domains=example.com
# DNSSEC=yes

# Restart systemd-resolved
sudo systemctl restart systemd-resolved

# Check status
systemctl status systemd-resolved
resolvectl status
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Enable systemd-resolved
sudo systemctl enable systemd-resolved
sudo systemctl start systemd-resolved

# Create symbolic link
sudo ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf

# Configure systemd-resolved
sudo nano /etc/systemd/resolved.conf

# Example configuration:
# [Resolve]
# DNS=8.8.8.8 8.8.4.4 1.1.1.1
# Domains=example.com
# DNSSEC=yes

# Restart systemd-resolved
sudo systemctl restart systemd-resolved

# Check status
systemctl status systemd-resolved
resolvectl status
```

</TabItem>
</Tabs>

---

## Firewall Port Management

### **1. Open Only Required Ports on Firewall**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check UFW status
sudo ufw status

# Enable UFW firewall
sudo ufw enable

# Set default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (port 22)
sudo ufw allow 22/tcp

# Allow HTTP (port 80)
sudo ufw allow 80/tcp

# Allow HTTPS (port 443)
sudo ufw allow 443/tcp

# Allow specific port range
sudo ufw allow 8000:9000/tcp

# Allow from specific IP
sudo ufw allow from 192.168.1.0/24

# Check UFW rules
sudo ufw status numbered

# Delete rule by number
sudo ufw delete 1
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check firewalld status
sudo firewall-cmd --state

# Enable firewalld
sudo systemctl enable firewalld
sudo systemctl start firewalld

# Set default zone
sudo firewall-cmd --set-default-zone=public

# Allow SSH
sudo firewall-cmd --permanent --add-service=ssh

# Allow HTTP
sudo firewall-cmd --permanent --add-service=http

# Allow HTTPS
sudo firewall-cmd --permanent --add-service=https

# Allow specific port
sudo firewall-cmd --permanent --add-port=8080/tcp

# Allow port range
sudo firewall-cmd --permanent --add-port=8000-9000/tcp

# Allow from specific source
sudo firewall-cmd --permanent --add-source=192.168.1.0/24

# Reload firewall
sudo firewall-cmd --reload

# List all rules
sudo firewall-cmd --list-all
```

</TabItem>
</Tabs>

### **2. Configure iptables (Alternative Firewall)**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install iptables-persistent
sudo apt install iptables-persistent

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

# Allow HTTP
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# Allow HTTPS
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Save rules
sudo iptables-save > /etc/iptables/rules.v4

# Restore rules on boot
sudo systemctl enable netfilter-persistent
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Stop firewalld
sudo systemctl stop firewalld
sudo systemctl disable firewalld

# Install iptables-services
sudo yum install iptables-services

# Enable iptables
sudo systemctl enable iptables
sudo systemctl start iptables

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

# Allow HTTP
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# Allow HTTPS
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Save rules
sudo service iptables save
```

</TabItem>
</Tabs>

---

## Network Service Configuration

### **1. Configure Network Services**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check network service status
sudo systemctl status systemd-networkd
sudo systemctl status NetworkManager

# Enable network services
sudo systemctl enable systemd-networkd
sudo systemctl start systemd-networkd

# Configure NetworkManager (if using)
sudo nano /etc/NetworkManager/NetworkManager.conf

# Restart network services
sudo systemctl restart systemd-networkd
sudo systemctl restart NetworkManager

# Check network connectivity
ping -c 4 8.8.8.8
ping -c 4 google.com
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check network service status
sudo systemctl status network
sudo systemctl status NetworkManager

# Enable network services
sudo systemctl enable network
sudo systemctl start network

# Configure NetworkManager (if using)
sudo nano /etc/NetworkManager/NetworkManager.conf

# Restart network services
sudo systemctl restart network
sudo systemctl restart NetworkManager

# Check network connectivity
ping -c 4 8.8.8.8
ping -c 4 google.com
```

</TabItem>
</Tabs>

### **2. Network Troubleshooting**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check network interfaces
ip addr show
ip link show

# Check routing table
ip route show
route -n

# Check DNS resolution
nslookup google.com
dig google.com

# Check network connectivity
ping -c 4 8.8.8.8
traceroute google.com

# Check listening ports
netstat -tuln
ss -tuln

# Check network statistics
netstat -i
ip -s link show

# Check network configuration
cat /etc/netplan/*.yaml
cat /etc/resolv.conf
cat /etc/hosts
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check network interfaces
ip addr show
ip link show

# Check routing table
ip route show
route -n

# Check DNS resolution
nslookup google.com
dig google.com

# Check network connectivity
ping -c 4 8.8.8.8
traceroute google.com

# Check listening ports
netstat -tuln
ss -tuln

# Check network statistics
netstat -i
ip -s link show

# Check network configuration
ls /etc/sysconfig/network-scripts/
cat /etc/resolv.conf
cat /etc/hosts
```

</TabItem>
</Tabs>

---

## Network Security Configuration

### **1. Network Security Hardening**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Disable IPv6 (if not needed)
echo 'net.ipv6.conf.all.disable_ipv6 = 1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv6.conf.default.disable_ipv6 = 1' | sudo tee -a /etc/sysctl.conf

# Apply changes
sudo sysctl -p

# Configure TCP hardening
echo 'net.ipv4.tcp_syncookies = 1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.tcp_max_syn_backlog = 2048' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.tcp_fin_timeout = 30' | sudo tee -a /etc/sysctl.conf

# Apply TCP settings
sudo sysctl -p

# Check security settings
sysctl net.ipv4.tcp_syncookies
sysctl net.ipv6.conf.all.disable_ipv6
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Disable IPv6 (if not needed)
echo 'net.ipv6.conf.all.disable_ipv6 = 1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv6.conf.default.disable_ipv6 = 1' | sudo tee -a /etc/sysctl.conf

# Apply changes
sudo sysctl -p

# Configure TCP hardening
echo 'net.ipv4.tcp_syncookies = 1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.tcp_max_syn_backlog = 2048' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.tcp_fin_timeout = 30' | sudo tee -a /etc/sysctl.conf

# Apply TCP settings
sudo sysctl -p

# Check security settings
sysctl net.ipv4.tcp_syncookies
sysctl net.ipv6.conf.all.disable_ipv6
```

</TabItem>
</Tabs>

### **2. Network Monitoring**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Monitor network connections
netstat -tuln
ss -tuln

# Monitor network traffic
iftop
nethogs

# Monitor bandwidth usage
nload
bmon

# Check network logs
sudo journalctl -u systemd-networkd
sudo journalctl -u NetworkManager

# Monitor network interfaces
watch -n 1 'ip -s link show'
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Monitor network connections
netstat -tuln
ss -tuln

# Monitor network traffic
iftop
nethogs

# Monitor bandwidth usage
nload
bmon

# Check network logs
sudo journalctl -u network
sudo journalctl -u NetworkManager

# Monitor network interfaces
watch -n 1 'ip -s link show'
```

</TabItem>
</Tabs>

---

**Note**: Always test network configuration changes in a safe environment before applying them to production servers. Ensure you have alternative access methods (like console access) when making network changes to avoid being locked out of the system. 