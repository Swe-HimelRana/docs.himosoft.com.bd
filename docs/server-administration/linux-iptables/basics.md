---
title: iptables Basics
description: Learn the fundamentals of Linux iptables firewall with detailed parameter explanations.
sidebar_position: 1
---

# iptables Basics

iptables is a powerful Linux firewall that controls network traffic using rules and chains. This guide explains the fundamentals with detailed parameter explanations.

---

## Understanding iptables

### What is iptables?
iptables is a user-space utility program that allows you to configure the Linux kernel firewall (netfilter). It controls incoming and outgoing network traffic based on rules you define.

### Key Concepts

#### **Tables**
iptables uses different tables for different purposes:
- **filter**: Default table for packet filtering (ACCEPT, DROP, REJECT)
- **nat**: Network Address Translation (PREROUTING, POSTROUTING)
- **mangle**: Packet modification (TOS, TTL, MARK)
- **raw**: Connection tracking exemption

#### **Chains**
Chains are rule lists that packets traverse:
- **INPUT**: Packets destined for the local system
- **OUTPUT**: Packets originating from the local system
- **FORWARD**: Packets routed through the system
- **PREROUTING**: Packets entering the system (nat table)
- **POSTROUTING**: Packets leaving the system (nat table)

---

## Basic iptables Syntax

### Command Structure
```bash
iptables [-t table] -[A|I|D|R] chain rule-specification [options]
```

### Parameter Breakdown

#### **Table Selection (-t)**
```bash
-t filter    # Default table (packet filtering)
-t nat       # Network Address Translation
-t mangle    # Packet modification
-t raw       # Connection tracking exemption
```

#### **Chain Operations**
```bash
-A chain     # Append rule to end of chain
-I chain [position]  # Insert rule at position (default: 1)
-D chain rule_number # Delete rule by number
-R chain rule_number # Replace rule by number
-F chain     # Flush (delete all rules in chain)
-L chain     # List rules in chain
```

#### **Rule Specification**
```bash
-p protocol  # Protocol (tcp, udp, icmp, all)
-s source    # Source address/network
-d destination # Destination address/network
-i interface # Input interface
-o interface # Output interface
--sport port # Source port
--dport port # Destination port
-j target    # Jump to target (ACCEPT, DROP, REJECT)
```

---

## Common Parameters Explained

### **Protocol (-p)**
```bash
-p tcp       # TCP protocol
-p udp       # UDP protocol
-p icmp      # ICMP protocol
-p all       # All protocols (default)
```

### **Address Specification (-s, -d)**
```bash
-s 192.168.1.100        # Single IP address
-s 192.168.1.0/24       # Network with CIDR notation
-s 192.168.1.0/255.255.255.0  # Network with netmask
-s !192.168.1.100       # Negation (NOT this address)
-d 10.0.0.0/8           # Destination network
```

### **Interface Specification (-i, -o)**
```bash
-i eth0      # Input interface
-i eth+      # Any interface starting with "eth"
-o wlan0     # Output interface
-i !eth0     # Negation (NOT this interface)
```

### **Port Specification (--sport, --dport)**
```bash
--sport 80           # Source port 80
--dport 22           # Destination port 22
--sport 1024:65535   # Source port range
--dport :1024        # Destination port less than 1024
--dport 80,443       # Multiple ports
```

### **Targets (-j)**
```bash
-j ACCEPT    # Accept the packet
-j DROP      # Drop the packet silently
-j REJECT    # Reject the packet with error message
-j LOG       # Log the packet
-j RETURN    # Return to calling chain
-j DNAT      # Destination NAT
-j SNAT      # Source NAT
-j MASQUERADE # Source NAT with dynamic IP
```

---

## Basic Examples

### **Allow SSH (Port 22)**
```bash
# Allow incoming SSH connections
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Explanation:
# -A INPUT     : Append to INPUT chain
# -p tcp       : TCP protocol
# --dport 22   : Destination port 22
# -j ACCEPT    : Accept the packet
```

### **Allow HTTP and HTTPS**
```bash
# Allow HTTP (port 80)
iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# Allow HTTPS (port 443)
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

### **Allow Local Network**
```bash
# Allow traffic from local network
iptables -A INPUT -s 192.168.1.0/24 -j ACCEPT

# Explanation:
# -A INPUT           : Append to INPUT chain
# -s 192.168.1.0/24 : Source network 192.168.1.0/24
# -j ACCEPT          : Accept the packet
```

### **Block Specific IP**
```bash
# Block traffic from specific IP
iptables -A INPUT -s 192.168.1.100 -j DROP

# Explanation:
# -A INPUT           : Append to INPUT chain
# -s 192.168.1.100   : Source IP 192.168.1.100
# -j DROP            : Drop the packet
```

### **Allow Established Connections**
```bash
# Allow established and related connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Explanation:
# -A INPUT                    : Append to INPUT chain
# -m state                    : Use state match module
# --state ESTABLISHED,RELATED : Match established/related connections
# -j ACCEPT                   : Accept the packet
```

---

## Advanced Parameters

### **State Matching (-m state)**
```bash
-m state --state NEW,ESTABLISHED,RELATED,INVALID

# States:
# NEW        : New connection
# ESTABLISHED : Established connection
# RELATED    : Related connection (e.g., FTP data)
# INVALID    : Invalid packet
```

### **Connection Tracking (-m conntrack)**
```bash
-m conntrack --ctstate ESTABLISHED,RELATED

# More precise than state module
# --ctstate : Connection tracking state
```

### **Limit Rate (-m limit)**
```bash
-m limit --limit 10/minute --limit-burst 20

# --limit 10/minute : Allow 10 packets per minute
# --limit-burst 20  : Allow burst of 20 packets
```

### **Logging with Limit**
```bash
# Log SSH attempts with rate limiting
iptables -A INPUT -p tcp --dport 22 -m limit --limit 5/minute --limit-burst 10 -j LOG --log-prefix "SSH: "
iptables -A INPUT -p tcp --dport 22 -j DROP
```

---

## Useful Commands

### **List Rules**
```bash
iptables -L                    # List all rules
iptables -L -v                 # List with packet counts
iptables -L -n                 # List with numeric addresses
iptables -L --line-numbers     # List with rule numbers
```

### **Save and Restore**
```bash
# Save rules
iptables-save > /etc/iptables/rules.v4

# Restore rules
iptables-restore < /etc/iptables/rules.v4
```

### **Clear Rules**
```bash
iptables -F                    # Flush all rules
iptables -F INPUT              # Flush INPUT chain only
iptables -X                    # Delete custom chains
```

### **Set Default Policies**
```bash
iptables -P INPUT DROP         # Set default INPUT policy to DROP
iptables -P OUTPUT ACCEPT      # Set default OUTPUT policy to ACCEPT
iptables -P FORWARD DROP       # Set default FORWARD policy to DROP
```

---

## Best Practices

### **1. Set Default Policies**
```bash
# Set restrictive default policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT
```

### **2. Allow Loopback**
```bash
# Allow loopback interface
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT
```

### **3. Allow Established Connections**
```bash
# Allow established connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
```

### **4. Log Dropped Packets**
```bash
# Log dropped packets (with rate limiting)
iptables -A INPUT -m limit --limit 5/minute -j LOG --log-prefix "DROP: "
```

### **5. Save Rules**
```bash
# Save rules for persistence
iptables-save > /etc/iptables/rules.v4
```

---

**Note:** Always test your rules carefully and ensure you have alternative access methods before applying restrictive policies. 