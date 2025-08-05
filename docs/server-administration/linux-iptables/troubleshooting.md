---
title: iptables Troubleshooting
description: Comprehensive troubleshooting guide for iptables with common issues, debugging techniques, and solutions.
sidebar_position: 4
---

# iptables Troubleshooting

Comprehensive troubleshooting guide for iptables with detailed explanations of common issues and solutions.

---

## Common Issues and Solutions

### **1. Connection Issues**

#### **Problem: Can't connect to SSH**
```bash
# Check if SSH rule exists
iptables -L INPUT --line-numbers | grep 22

# Check if rule is being hit
iptables -L INPUT -v | grep 22

# Test SSH rule specifically
iptables -C INPUT -p tcp --dport 22 -j ACCEPT
```

#### **Solution: Add SSH rule**
```bash
# Allow SSH
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Or insert at beginning for higher priority
iptables -I INPUT 1 -p tcp --dport 22 -j ACCEPT
```

#### **Problem: Web server not accessible**
```bash
# Check HTTP/HTTPS rules
iptables -L INPUT --line-numbers | grep -E "(80|443)"

# Check if established connections are allowed
iptables -L INPUT | grep ESTABLISHED
```

#### **Solution: Add web server rules**
```bash
# Allow HTTP and HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Allow established connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
```

---

### **2. Rule Order Problems**

#### **Problem: Rules not working as expected**
```bash
# Check rule order
iptables -L INPUT --line-numbers

# Check default policy
iptables -L INPUT | grep "policy"
```

#### **Solution: Reorder rules**
```bash
# Insert rule at specific position
iptables -I INPUT 1 -p tcp --dport 22 -j ACCEPT

# Delete rule by number
iptables -D INPUT 5

# Replace rule
iptables -R INPUT 3 -p tcp --dport 80 -j ACCEPT
```

---

### **3. NAT Issues**

#### **Problem: NAT not working**
```bash
# Check if IP forwarding is enabled
cat /proc/sys/net/ipv4/ip_forward

# Check NAT rules
iptables -t nat -L -v

# Check FORWARD chain
iptables -L FORWARD -v
```

#### **Solution: Enable IP forwarding and NAT**
```bash
# Enable IP forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward

# Make permanent
echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf
sysctl -p

# Add NAT rule
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o eth0 -j MASQUERADE

# Allow forwarding
iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT
iptables -A FORWARD -i eth0 -o eth1 -m state --state ESTABLISHED,RELATED -j ACCEPT
```

---

### **4. Performance Issues**

#### **Problem: High CPU usage**
```bash
# Check rule counts
iptables -L INPUT -v

# Check for inefficient rules
iptables -L INPUT --line-numbers
```

#### **Solution: Optimize rule order**
```bash
# Move common rules to top
iptables -I INPUT 1 -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -I INPUT 2 -i lo -j ACCEPT

# Use ipset for large lists
ipset create blocked hash:ip
iptables -A INPUT -m set --match-set blocked src -j DROP
```

---

## Debugging Techniques

### **1. Rule Testing**

#### **Test if rule exists**
```bash
# Test specific rule
iptables -C INPUT -p tcp --dport 22 -j ACCEPT

# Check exit code
echo $?
# 0 = rule exists, 1 = rule doesn't exist
```

#### **Test packet flow**
```bash
# Simulate packet with iptables-save
iptables-save | grep -A 10 -B 10 "your-rule"
```

### **2. Packet Tracing**

#### **Enable packet logging**
```bash
# Log all packets temporarily
iptables -I INPUT 1 -j LOG --log-prefix "DEBUG: "

# Log specific packets
iptables -A INPUT -p tcp --dport 22 -j LOG --log-prefix "SSH: "
```

#### **Monitor logs**
```bash
# Watch logs in real-time
tail -f /var/log/messages | grep "DEBUG:"

# Check recent logs
grep "SSH:" /var/log/messages | tail -10
```

### **3. Connection Testing**

#### **Test connectivity**
```bash
# Test basic connectivity
ping -c 3 8.8.8.8

# Test specific port
telnet localhost 22

# Test from remote
telnet your-server-ip 22
```

#### **Check connection states**
```bash
# Check current connections
netstat -tuln

# Check connection tracking
cat /proc/net/nf_conntrack | head -10
```

---

## Diagnostic Commands

### **1. Rule Analysis**

#### **List all rules with details**
```bash
# List with line numbers and packet counts
iptables -L INPUT --line-numbers -v

# List with numeric addresses
iptables -L INPUT -n

# Show rule specifications
iptables -L INPUT -x
```

#### **Check specific chains**
```bash
# Check INPUT chain
iptables -L INPUT -v

# Check NAT table
iptables -t nat -L -v

# Check mangle table
iptables -t mangle -L -v
```

### **2. Statistics and Counters**

#### **Reset counters**
```bash
# Reset all counters
iptables -Z

# Reset specific chain
iptables -Z INPUT
```

#### **Monitor packet flow**
```bash
# Watch packet counts
watch -n 1 'iptables -L INPUT -v'

# Monitor specific rule
watch -n 1 'iptables -L INPUT -v | grep "your-rule"'
```

### **3. System Information**

#### **Check kernel modules**
```bash
# Check if iptables modules are loaded
lsmod | grep -E "(iptable|nf_conntrack)"

# Load missing modules
modprobe iptable_filter
modprobe nf_conntrack
```

#### **Check system limits**
```bash
# Check connection tracking limits
cat /proc/sys/net/netfilter/nf_conntrack_max

# Check connection tracking table
cat /proc/net/nf_conntrack | wc -l
```

---

## Common Error Messages

### **1. "No chain/target/match by that name"**
```bash
# Problem: Module not loaded
# Solution: Load required module
modprobe iptable_nat
modprobe nf_conntrack
```

### **2. "Bad argument"**
```bash
# Problem: Invalid syntax
# Solution: Check parameter format
# Correct: --dport 80
# Wrong: --dport 80:90 (use --dport 80:90 for ranges)
```

### **3. "Permission denied"**
```bash
# Problem: Not running as root
# Solution: Use sudo
sudo iptables -L
```

### **4. "Table does not exist"**
```bash
# Problem: Table not available
# Solution: Check if table is compiled in kernel
cat /proc/net/ip_tables_names
```

---

## Recovery Procedures

### **1. Emergency Access**

#### **If locked out via SSH**
```bash
# Connect via console or KVM
# Flush all rules
iptables -F
iptables -X

# Set permissive policies
iptables -P INPUT ACCEPT
iptables -P FORWARD ACCEPT
iptables -P OUTPUT ACCEPT
```

#### **If web server is blocked**
```bash
# Temporarily allow all traffic
iptables -P INPUT ACCEPT

# Or add specific rule
iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT
iptables -I INPUT 1 -p tcp --dport 443 -j ACCEPT
```

### **2. Rule Recovery**

#### **Restore from backup**
```bash
# Restore saved rules
iptables-restore < /etc/iptables/rules.v4

# Or restore from specific file
iptables-restore < /path/to/backup.rules
```

#### **Rebuild rules step by step**
```bash
# Start with basic rules
iptables -P INPUT DROP
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

---

## Monitoring Scripts

### **1. Basic Monitoring**
```bash
#!/bin/bash
# Basic iptables monitoring

echo "=== iptables Status ==="
iptables -L INPUT --line-numbers -v

echo -e "\n=== Recent Logs ==="
tail -10 /var/log/messages | grep -E "(DROP|ACCEPT|LOG)"

echo -e "\n=== Connection Count ==="
netstat -an | grep ESTABLISHED | wc -l
```

### **2. Advanced Monitoring**
```bash
#!/bin/bash
# Advanced monitoring with alerts

# Check for excessive drops
DROP_COUNT=$(iptables -L INPUT -v | grep DROP | awk '{sum+=$1} END {print sum}')
if [ "$DROP_COUNT" -gt 100 ]; then
    echo "WARNING: High number of dropped packets: $DROP_COUNT"
fi

# Check for SSH brute force
SSH_ATTEMPTS=$(grep "SSH" /var/log/messages | wc -l)
if [ "$SSH_ATTEMPTS" -gt 50 ]; then
    echo "WARNING: High number of SSH attempts: $SSH_ATTEMPTS"
fi

# Check connection tracking
CONN_COUNT=$(cat /proc/net/nf_conntrack | wc -l)
echo "Current connections: $CONN_COUNT"
```

### **3. Rule Testing Script**
```bash
#!/bin/bash
# Test common rules

echo "Testing common iptables rules..."

# Test SSH rule
if iptables -C INPUT -p tcp --dport 22 -j ACCEPT 2>/dev/null; then
    echo "✓ SSH rule exists"
else
    echo "✗ SSH rule missing"
fi

# Test HTTP rule
if iptables -C INPUT -p tcp --dport 80 -j ACCEPT 2>/dev/null; then
    echo "✓ HTTP rule exists"
else
    echo "✗ HTTP rule missing"
fi

# Test established connections rule
if iptables -C INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT 2>/dev/null; then
    echo "✓ Established connections rule exists"
else
    echo "✗ Established connections rule missing"
fi

# Check default policies
echo "Default policies:"
iptables -L | grep "policy"
```

---

## Best Practices for Troubleshooting

### **1. Always test in safe environment**
```bash
# Use test machine or VM
# Have console access ready
# Test rules before applying to production
```

### **2. Use logging for debugging**
```bash
# Add temporary logging
iptables -I INPUT 1 -j LOG --log-prefix "DEBUG: "

# Remove after debugging
iptables -D INPUT 1
```

### **3. Keep backups**
```bash
# Save rules regularly
iptables-save > /etc/iptables/rules.v4.backup

# Version control your rules
git add /etc/iptables/rules.v4
git commit -m "Update iptables rules"
```

### **4. Document changes**
```bash
# Comment your rules
iptables -A INPUT -p tcp --dport 22 -j ACCEPT  # SSH access

# Keep change log
echo "$(date): Added SSH rule" >> /var/log/iptables-changes.log
```

---

**Note:** Always have alternative access methods (console, KVM) before applying restrictive iptables rules to avoid being locked out. 