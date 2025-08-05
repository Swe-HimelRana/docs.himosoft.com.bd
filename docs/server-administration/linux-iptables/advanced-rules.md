---
title: Advanced iptables Rules
description: Advanced iptables configurations including NAT, port forwarding, and complex rule sets with detailed explanations.
sidebar_position: 2
---

# Advanced iptables Rules

Advanced iptables configurations for complex networking scenarios with detailed parameter explanations.

---

## Network Address Translation (NAT)

### **Source NAT (SNAT)**
Changes the source IP address of outgoing packets.

#### **Basic SNAT**
```bash
# Change source IP to 192.168.1.1
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -j SNAT --to-source 203.0.113.1

# Explanation:
# -t nat              : Use NAT table
# -A POSTROUTING      : Append to POSTROUTING chain
# -s 192.168.1.0/24  : Source network (internal)
# -j SNAT             : Source NAT target
# --to-source 203.0.113.1 : New source IP (external)
```

#### **MASQUERADE (Dynamic IP)**
```bash
# Use interface IP for NAT (for dynamic IP)
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o eth0 -j MASQUERADE

# Explanation:
# -t nat              : Use NAT table
# -A POSTROUTING      : Append to POSTROUTING chain
# -s 192.168.1.0/24  : Source network
# -o eth0             : Output interface
# -j MASQUERADE       : Use interface IP for NAT
```

### **Destination NAT (DNAT)**
Changes the destination IP address of incoming packets.

#### **Port Forwarding**
```bash
# Forward external port 8080 to internal server
iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to-destination 192.168.1.100:80

# Explanation:
# -t nat                    : Use NAT table
# -A PREROUTING            : Append to PREROUTING chain
# -p tcp                   : TCP protocol
# --dport 8080             : External port
# -j DNAT                  : Destination NAT target
# --to-destination 192.168.1.100:80 : Internal server:port
```

#### **Load Balancing**
```bash
# Load balance between multiple servers
iptables -t nat -A PREROUTING -p tcp --dport 80 -m statistic --mode random --probability 0.5 -j DNAT --to-destination 192.168.1.100:80
iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.1.101:80

# Explanation:
# -m statistic --mode random --probability 0.5 : 50% probability
# First rule: 50% to 192.168.1.100
# Second rule: Remaining 50% to 192.168.1.101
```

---

## Advanced Matching Modules

### **String Matching (-m string)**
Match packets containing specific strings.

```bash
# Block packets containing "malware" string
iptables -A INPUT -m string --string "malware" --algo bm -j DROP

# Explanation:
# -m string              : Use string match module
# --string "malware"     : String to match
# --algo bm              : Boyer-Moore algorithm (faster)
# -j DROP                : Drop matching packets
```

### **Time Matching (-m time)**
Match packets based on time criteria.

```bash
# Allow SSH only during business hours
iptables -A INPUT -p tcp --dport 22 -m time --timestart 09:00 --timestop 17:00 --days Mon,Tue,Wed,Thu,Fri -j ACCEPT

# Explanation:
# -m time                : Use time match module
# --timestart 09:00      : Start time
# --timestop 17:00       : End time
# --days Mon,Tue,Wed,Thu,Fri : Days of week
```

### **Connection Limit (-m connlimit)**
Limit the number of connections per IP.

```bash
# Limit SSH connections to 3 per IP
iptables -A INPUT -p tcp --dport 22 -m connlimit --connlimit-above 3 -j DROP

# Explanation:
# -m connlimit           : Use connection limit module
# --connlimit-above 3    : Drop if more than 3 connections
```

### **Recent Module (-m recent)**
Track recent connections and take action.

```bash
# Block IPs with too many SSH attempts
iptables -A INPUT -p tcp --dport 22 -m recent --name SSH --set
iptables -A INPUT -p tcp --dport 22 -m recent --name SSH --update --seconds 60 --hitcount 3 -j DROP

# Explanation:
# --name SSH             : Name for tracking list
# --set                  : Add source IP to list
# --update               : Update existing entry
# --seconds 60           : Time window
# --hitcount 3          : Block after 3 attempts
```

---

## Custom Chains

### **Creating Custom Chains**
```bash
# Create custom chain for web traffic
iptables -N WEB

# Add rules to custom chain
iptables -A WEB -p tcp --dport 80 -j ACCEPT
iptables -A WEB -p tcp --dport 443 -j ACCEPT
iptables -A WEB -j DROP

# Use custom chain in INPUT
iptables -A INPUT -p tcp -j WEB

# Explanation:
# -N WEB                 : Create new chain named WEB
# -A WEB                 : Add rules to WEB chain
# -A INPUT -p tcp -j WEB : Jump to WEB chain for TCP traffic
```

### **Logging Chain**
```bash
# Create logging chain
iptables -N LOGGING

# Add logging rules
iptables -A LOGGING -j LOG --log-prefix "IPTABLES-LOG: "
iptables -A LOGGING -j DROP

# Use logging chain
iptables -A INPUT -p tcp --dport 22 -j LOGGING
```

---

## Complex Rule Examples

### **Web Server Protection**
```bash
# Allow established connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow HTTP/HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Rate limit HTTP requests
iptables -A INPUT -p tcp --dport 80 -m limit --limit 100/minute --limit-burst 200 -j ACCEPT

# Block excessive requests
iptables -A INPUT -p tcp --dport 80 -m limit --limit 10/minute -j LOG --log-prefix "HTTP-FLOOD: "
iptables -A INPUT -p tcp --dport 80 -j DROP
```

### **FTP Server Rules**
```bash
# Allow FTP control connection
iptables -A INPUT -p tcp --dport 21 -j ACCEPT

# Allow FTP data connections (related)
iptables -A INPUT -m state --state RELATED -j ACCEPT

# Allow passive FTP ports (if needed)
iptables -A INPUT -p tcp --dport 30000:31000 -j ACCEPT
```

### **DMZ Configuration**
```bash
# Allow traffic to DMZ
iptables -A FORWARD -i eth0 -o eth1 -d 192.168.2.0/24 -j ACCEPT

# Allow return traffic from DMZ
iptables -A FORWARD -i eth1 -o eth0 -s 192.168.2.0/24 -j ACCEPT

# NAT for DMZ
iptables -t nat -A POSTROUTING -s 192.168.2.0/24 -o eth0 -j MASQUERADE
```

---

## Performance Optimization

### **Rule Ordering**
```bash
# Most common rules first (for performance)
iptables -I INPUT 1 -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -I INPUT 2 -i lo -j ACCEPT
iptables -I INPUT 3 -p tcp --dport 22 -j ACCEPT
```

### **Using ipset for Large Lists**
```bash
# Create ipset for blocked IPs
ipset create blocked hash:ip

# Add IPs to set
ipset add blocked 192.168.1.100
ipset add blocked 10.0.0.50

# Use ipset in iptables
iptables -A INPUT -m set --match-set blocked src -j DROP
```

---

## Monitoring and Debugging

### **Packet Counting**
```bash
# List rules with packet counts
iptables -L -v

# Reset counters
iptables -Z
```

### **Rule Testing**
```bash
# Test specific rule
iptables -C INPUT -p tcp --dport 22 -j ACCEPT

# Check if rule exists (exit code 0 = exists)
echo $?
```

### **Logging and Monitoring**
```bash
# Log all dropped packets
iptables -A INPUT -j LOG --log-prefix "DROP: "

# Monitor logs
tail -f /var/log/messages | grep "DROP: "
```

---

## Security Considerations

### **Anti-Spoofing Rules**
```bash
# Block spoofed packets
iptables -A INPUT -s 127.0.0.0/8 -j DROP
iptables -A INPUT -s 0.0.0.0/8 -j DROP
iptables -A INPUT -s 255.255.255.255 -j DROP
```

### **Fragment Protection**
```bash
# Block fragmented packets (potential attacks)
iptables -A INPUT -f -j DROP
```

### **SYN Flood Protection**
```bash
# Limit SYN packets (SYN flood protection)
iptables -A INPUT -p tcp --syn -m limit --limit 1/s -j ACCEPT
iptables -A INPUT -p tcp --syn -j DROP
```

---

## Persistence and Management

### **Save Rules**
```bash
# Save rules to file
iptables-save > /etc/iptables/rules.v4

# Restore rules
iptables-restore < /etc/iptables/rules.v4
```

### **Automatic Restoration**
```bash
# Create systemd service for auto-restore
cat > /etc/systemd/system/iptables-restore.service << EOF
[Unit]
Description=Restore iptables rules
Before=network.target

[Service]
Type=oneshot
ExecStart=/sbin/iptables-restore /etc/iptables/rules.v4
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

# Enable service
systemctl enable iptables-restore.service
```

---

**Note:** Test all rules in a safe environment before applying to production systems. 