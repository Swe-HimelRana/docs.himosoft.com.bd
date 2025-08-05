---
title: Practical iptables Examples
description: Real-world iptables configurations for common scenarios with detailed explanations and parameter breakdowns.
sidebar_position: 3
---

# Practical iptables Examples

Real-world iptables configurations for common scenarios with detailed parameter explanations.

---

## Web Server Configuration

### **Basic Web Server Rules**
```bash
#!/bin/bash
# Web Server iptables Configuration

# Flush existing rules
iptables -F
iptables -X

# Set default policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# Allow established connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow SSH (with rate limiting)
iptables -A INPUT -p tcp --dport 22 -m limit --limit 5/minute --limit-burst 10 -j ACCEPT

# Allow HTTP
iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# Allow HTTPS
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Log and drop everything else
iptables -A INPUT -j LOG --log-prefix "DROP: "
iptables -A INPUT -j DROP

# Save rules
iptables-save > /etc/iptables/rules.v4
```

### **Advanced Web Server with DDoS Protection**
```bash
#!/bin/bash
# Advanced Web Server with DDoS Protection

# Clear existing rules
iptables -F
iptables -X

# Set policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback and established connections
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Anti-spoofing rules
iptables -A INPUT -s 127.0.0.0/8 -j DROP
iptables -A INPUT -s 0.0.0.0/8 -j DROP
iptables -A INPUT -s 255.255.255.255 -j DROP

# Block fragmented packets
iptables -A INPUT -f -j DROP

# SYN flood protection
iptables -A INPUT -p tcp --syn -m limit --limit 1/s -j ACCEPT
iptables -A INPUT -p tcp --syn -j DROP

# SSH with connection limiting
iptables -A INPUT -p tcp --dport 22 -m connlimit --connlimit-above 3 -j DROP
iptables -A INPUT -p tcp --dport 22 -m limit --limit 5/minute --limit-burst 10 -j ACCEPT

# HTTP with rate limiting
iptables -A INPUT -p tcp --dport 80 -m limit --limit 100/minute --limit-burst 200 -j ACCEPT

# HTTPS with rate limiting
iptables -A INPUT -p tcp --dport 443 -m limit --limit 100/minute --limit-burst 200 -j ACCEPT

# Log and drop
iptables -A INPUT -j LOG --log-prefix "DROP: "
iptables -A INPUT -j DROP
```

---

## Mail Server Configuration

### **SMTP/POP3/IMAP Server**
```bash
#!/bin/bash
# Mail Server Configuration

# Clear rules
iptables -F
iptables -X

# Set policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback and established
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# SSH access
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# SMTP (port 25)
iptables -A INPUT -p tcp --dport 25 -j ACCEPT

# SMTP submission (port 587)
iptables -A INPUT -p tcp --dport 587 -j ACCEPT

# SMTPS (port 465)
iptables -A INPUT -p tcp --dport 465 -j ACCEPT

# POP3 (port 110)
iptables -A INPUT -p tcp --dport 110 -j ACCEPT

# POP3S (port 995)
iptables -A INPUT -p tcp --dport 995 -j ACCEPT

# IMAP (port 143)
iptables -A INPUT -p tcp --dport 143 -j ACCEPT

# IMAPS (port 993)
iptables -A INPUT -p tcp --dport 993 -j ACCEPT

# DNS queries
iptables -A INPUT -p udp --dport 53 -j ACCEPT
iptables -A INPUT -p tcp --dport 53 -j ACCEPT

# Log and drop
iptables -A INPUT -j LOG --log-prefix "DROP: "
iptables -A INPUT -j DROP
```

---

## VPN Server Configuration

### **OpenVPN Server**
```bash
#!/bin/bash
# OpenVPN Server Configuration

# Clear rules
iptables -F
iptables -X

# Set policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback and established
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# SSH access
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# OpenVPN port (default 1194)
iptables -A INPUT -p tcp --dport 1194 -j ACCEPT
iptables -A INPUT -p udp --dport 1194 -j ACCEPT

# Allow forwarding for VPN clients
iptables -A FORWARD -i tun0 -j ACCEPT
iptables -A FORWARD -o tun0 -j ACCEPT

# NAT for VPN clients
iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE

# Log and drop
iptables -A INPUT -j LOG --log-prefix "DROP: "
iptables -A INPUT -j DROP
```

---

## Home Network Router

### **Basic Home Router**
```bash
#!/bin/bash
# Home Network Router Configuration

# Clear rules
iptables -F
iptables -X

# Set policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback and established
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# SSH access (only from local network)
iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT

# Allow forwarding between interfaces
iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT
iptables -A FORWARD -i eth0 -o eth1 -m state --state ESTABLISHED,RELATED -j ACCEPT

# NAT for internet access
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o eth0 -j MASQUERADE

# Log and drop
iptables -A INPUT -j LOG --log-prefix "DROP: "
iptables -A INPUT -j DROP
```

### **Advanced Home Router with Guest Network**
```bash
#!/bin/bash
# Advanced Home Router with Guest Network

# Clear rules
iptables -F
iptables -X

# Set policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback and established
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# SSH access (main network only)
iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT

# Main network to internet
iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT
iptables -A FORWARD -i eth0 -o eth1 -m state --state ESTABLISHED,RELATED -j ACCEPT

# Guest network to internet (isolated)
iptables -A FORWARD -i eth2 -o eth0 -j ACCEPT
iptables -A FORWARD -i eth0 -o eth2 -m state --state ESTABLISHED,RELATED -j ACCEPT

# Block communication between main and guest networks
iptables -A FORWARD -i eth1 -o eth2 -j DROP
iptables -A FORWARD -i eth2 -o eth1 -j DROP

# NAT for both networks
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o eth0 -j MASQUERADE
iptables -t nat -A POSTROUTING -s 192.168.2.0/24 -o eth0 -j MASQUERADE

# Log and drop
iptables -A INPUT -j LOG --log-prefix "DROP: "
iptables -A INPUT -j DROP
```

---

## Database Server Configuration

### **MySQL/MariaDB Server**
```bash
#!/bin/bash
# Database Server Configuration

# Clear rules
iptables -F
iptables -X

# Set policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback and established
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# SSH access
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# MySQL (port 3306) - only from application servers
iptables -A INPUT -p tcp --dport 3306 -s 192.168.1.100 -j ACCEPT
iptables -A INPUT -p tcp --dport 3306 -s 192.168.1.101 -j ACCEPT

# PostgreSQL (port 5432) - only from application servers
iptables -A INPUT -p tcp --dport 5432 -s 192.168.1.100 -j ACCEPT
iptables -A INPUT -p tcp --dport 5432 -s 192.168.1.101 -j ACCEPT

# Log and drop
iptables -A INPUT -j LOG --log-prefix "DROP: "
iptables -A INPUT -j DROP
```

---

## Game Server Configuration

### **Minecraft Server**
```bash
#!/bin/bash
# Minecraft Server Configuration

# Clear rules
iptables -F
iptables -X

# Set policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback and established
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# SSH access
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Minecraft default port (25565)
iptables -A INPUT -p tcp --dport 25565 -j ACCEPT

# Minecraft query port (25575)
iptables -A INPUT -p udp --dport 25575 -j ACCEPT

# RCON port (25575)
iptables -A INPUT -p tcp --dport 25575 -j ACCEPT

# Log and drop
iptables -A INPUT -j LOG --log-prefix "DROP: "
iptables -A INPUT -j DROP
```

---

## Monitoring and Logging

### **Comprehensive Logging Setup**
```bash
#!/bin/bash
# Comprehensive Logging Setup

# Create custom logging chain
iptables -N LOGGING

# Add logging rules
iptables -A LOGGING -j LOG --log-prefix "IPTABLES-LOG: "
iptables -A LOGGING -j DROP

# Log specific events
# SSH attempts
iptables -A INPUT -p tcp --dport 22 -m limit --limit 5/minute -j LOG --log-prefix "SSH-ATTEMPT: "

# HTTP requests
iptables -A INPUT -p tcp --dport 80 -m limit --limit 10/minute -j LOG --log-prefix "HTTP-REQUEST: "

# HTTPS requests
iptables -A INPUT -p tcp --dport 443 -m limit --limit 10/minute -j LOG --log-prefix "HTTPS-REQUEST: "

# Use logging chain for dropped packets
iptables -A INPUT -j LOGGING
```

### **Monitoring Script**
```bash
#!/bin/bash
# iptables Monitoring Script

echo "=== iptables Statistics ==="
echo "Rules with packet counts:"
iptables -L -v

echo -e "\n=== Recent Logs ==="
echo "Recent iptables logs:"
tail -20 /var/log/messages | grep "IPTABLES-LOG"

echo -e "\n=== Connection States ==="
echo "Current connections:"
netstat -tuln

echo -e "\n=== Interface Statistics ==="
echo "Interface packet counts:"
cat /proc/net/dev
```

---

## Troubleshooting Examples

### **Debugging Connection Issues**
```bash
#!/bin/bash
# Debugging Script

echo "=== Testing Basic Connectivity ==="

# Test if iptables is blocking ping
ping -c 3 8.8.8.8

echo -e "\n=== Checking Rule Order ==="
iptables -L INPUT --line-numbers

echo -e "\n=== Testing Specific Rules ==="
# Test SSH rule
iptables -C INPUT -p tcp --dport 22 -j ACCEPT
if [ $? -eq 0 ]; then
    echo "SSH rule exists"
else
    echo "SSH rule missing"
fi

echo -e "\n=== Checking Logs ==="
tail -10 /var/log/messages | grep "DROP"
```

---

## Parameter Reference

### **Common Parameters Used in Examples**

#### **Chain Operations**
```bash
-A chain     # Append rule to end
-I chain [n] # Insert rule at position n
-D chain n   # Delete rule number n
-F chain     # Flush all rules in chain
-L chain     # List rules in chain
```

#### **Protocol and Port Matching**
```bash
-p tcp       # TCP protocol
-p udp       # UDP protocol
--dport 80   # Destination port 80
--sport 1024:65535 # Source port range
```

#### **Address Matching**
```bash
-s 192.168.1.0/24  # Source network
-d 10.0.0.0/8      # Destination network
-i eth0             # Input interface
-o eth0             # Output interface
```

#### **State Matching**
```bash
-m state --state ESTABLISHED,RELATED
-m conntrack --ctstate NEW,ESTABLISHED
```

#### **Rate Limiting**
```bash
-m limit --limit 10/minute --limit-burst 20
-m connlimit --connlimit-above 3
```

---

**Note:** Always test configurations in a safe environment and ensure you have alternative access methods before applying restrictive rules. 