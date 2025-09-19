---
title: Network Information Gathering
description: Comprehensive guide to gather network information, diagnose connectivity issues, and analyze network performance on Linux systems.
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Network Information Gathering

This guide covers essential commands and techniques to gather network information, diagnose issues, and monitor network performance.

---

## Basic Network Information

### 1. Interface Information

```bash
# Show all network interfaces
ip addr show

# Show specific interface
ip addr show eth0

# Alternative command
ifconfig

# Show interface statistics
ip -s link show

# Show only active interfaces
ip link show up
```

### 2. IP Address Information

```bash
# Show all IP addresses
ip addr show

# Show only IPv4 addresses
ip -4 addr show

# Show only IPv6 addresses
ip -6 addr show

# Get public IP address
curl ifconfig.me
curl ipinfo.io/ip
wget -qO- ifconfig.me
```

### 3. Routing Information

```bash
# Show routing table
ip route show

# Show default gateway
ip route show default

# Show specific route
ip route get 8.8.8.8

# Alternative routing command
route -n
```

---

## Advanced Network Information

### 1. Network Statistics

```bash
# Show network interface statistics
cat /proc/net/dev

# Show detailed interface statistics
ip -s -s link show

# Show network connections
ss -tuln

# Show listening ports
ss -tuln | grep LISTEN

# Show established connections
ss -tuln | grep ESTAB
```

### 2. ARP Table Information

```bash
# Show ARP table
arp -a

# Show ARP table (alternative)
ip neigh show

# Show specific ARP entry
arp -a | grep 192.168.1.1
```

### 3. DNS Information

```bash
# Show DNS configuration
cat /etc/resolv.conf

# Show DNS servers
systemd-resolve --status

# Test DNS resolution
nslookup google.com

# Test DNS with dig
dig google.com

# Test reverse DNS
dig -x 8.8.8.8
```

---

## Network Connectivity Testing

### 1. Ping Tests

```bash
# Basic ping test
ping -c 4 8.8.8.8

# Ping with specific interface
ping -I eth0 8.8.8.8

# Ping with specific source IP
ping -S 192.168.1.100 8.8.8.8

# Continuous ping
ping 8.8.8.8

# Ping with timestamp
ping -D 8.8.8.8
```

### 2. Traceroute Analysis

```bash
# Basic traceroute
traceroute 8.8.8.8

# Traceroute with specific interface
traceroute -i eth0 8.8.8.8

# Traceroute with no DNS resolution
traceroute -n 8.8.8.8

# Alternative traceroute
mtr 8.8.8.8
```

### 3. Port Connectivity Testing

```bash
# Test specific port
telnet 8.8.8.8 53

# Test port with nc (netcat)
nc -zv 8.8.8.8 53

# Test multiple ports
nc -zv 8.8.8.8 53 80 443

# Test port range
nmap -p 1-1000 8.8.8.8
```

---

## Network Performance Analysis

### 1. Bandwidth Testing

```bash
# Test download speed
wget -O /dev/null http://speedtest.wdc01.softlayer.com/downloads/test100.zip

# Test with curl
curl -o /dev/null -s -w "%{speed_download}\n" http://speedtest.wdc01.softlayer.com/downloads/test100.zip

# Test upload speed (if server supports)
curl -T /dev/zero -o /dev/null -s -w "%{speed_upload}\n" ftp://speedtest.tele2.net/upload/100MB.zip
```

### 2. Network Latency Analysis

```bash
# Measure latency
ping -c 10 8.8.8.8 | tail -1

# Measure latency with timestamp
ping -D -c 10 8.8.8.8

# Measure latency to multiple hosts
for host in 8.8.8.8 1.1.1.1 208.67.222.222; do
    echo "Testing $host:"
    ping -c 5 $host | tail -1
done
```

### 3. Network Load Monitoring

```bash
# Monitor network traffic
iftop

# Monitor network usage
nethogs

# Monitor network statistics
watch -n 1 'cat /proc/net/dev'

# Monitor specific interface
watch -n 1 'ip -s link show eth0'
```

---

## Network Troubleshooting Commands

### 1. Connection Analysis

```bash
# Show active connections
ss -tuln

# Show connections by process
ss -tulnp

# Show listening ports
netstat -tuln

# Show established connections
netstat -tuln | grep ESTABLISHED
```

### 2. Firewall and Security

```bash
# Check iptables rules
sudo iptables -L -n -v

# Check UFW status
sudo ufw status

# Check firewalld status
sudo firewall-cmd --list-all

# Check open ports
sudo nmap -sT -O localhost
```

### 3. Network Service Status

```bash
# Check NetworkManager status
systemctl status NetworkManager

# Check networking service
systemctl status networking

# Check DNS service
systemctl status systemd-resolved

# Check network interfaces
ip link show
```

---

## Network Information Scripts

### 1. Complete Network Information Script

```bash
#!/bin/bash
# network-info.sh

echo "=== Network Information Report ==="
echo "Generated on: $(date)"
echo

echo "=== Network Interfaces ==="
ip addr show
echo

echo "=== Routing Table ==="
ip route show
echo

echo "=== DNS Configuration ==="
cat /etc/resolv.conf
echo

echo "=== ARP Table ==="
arp -a
echo

echo "=== Active Connections ==="
ss -tuln
echo

echo "=== Network Statistics ==="
cat /proc/net/dev
```

### 2. Network Health Check Script

```bash
#!/bin/bash
# network-health.sh

echo "=== Network Health Check ==="
echo "Generated on: $(date)"
echo

# Test local connectivity
echo "Testing local connectivity..."
ping -c 3 127.0.0.1 > /dev/null && echo "✓ Local loopback: OK" || echo "✗ Local loopback: FAILED"

# Test gateway connectivity
GATEWAY=$(ip route show default | awk '{print $3}' | head -1)
if [ ! -z "$GATEWAY" ]; then
    echo "Testing gateway connectivity ($GATEWAY)..."
    ping -c 3 $GATEWAY > /dev/null && echo "✓ Gateway: OK" || echo "✗ Gateway: FAILED"
fi

# Test DNS resolution
echo "Testing DNS resolution..."
nslookup google.com > /dev/null 2>&1 && echo "✓ DNS resolution: OK" || echo "✗ DNS resolution: FAILED"

# Test internet connectivity
echo "Testing internet connectivity..."
ping -c 3 8.8.8.8 > /dev/null && echo "✓ Internet: OK" || echo "✗ Internet: FAILED"

echo
echo "=== Network Interface Status ==="
ip link show | grep -E "(UP|DOWN)"
```

---

## Quick Reference Commands

| Task | Command |
|------|---------|
| Show interfaces | `ip addr show` |
| Show routing | `ip route show` |
| Show connections | `ss -tuln` |
| Test connectivity | `ping -c 4 8.8.8.8` |
| Test DNS | `nslookup google.com` |
| Show ARP table | `arp -a` |
| Show network stats | `cat /proc/net/dev` |
| Get public IP | `curl ifconfig.me` |
| Test port | `nc -zv host port` |
| Monitor traffic | `iftop` |

---

## Useful Network Tools

### 1. Installation Commands

<Tabs>
<TabItem value="ubuntu" label="Ubuntu/Debian" default>

```bash
# Install network tools
sudo apt update
sudo apt install -y net-tools iputils-ping traceroute dnsutils netcat-openbsd nmap iftop nethogs mtr-tiny
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install network tools
sudo yum install -y net-tools iputils traceroute bind-utils nmap-ncat nmap iftop nethogs mtr
```

</TabItem>
</Tabs>

### 2. Advanced Tools

- **iftop**: Real-time network bandwidth monitoring
- **nethogs**: Per-process network usage
- **mtr**: Network diagnostic tool combining ping and traceroute
- **nmap**: Network discovery and security auditing
- **tcpdump**: Network packet analyzer
- **wireshark**: Network protocol analyzer (GUI)

---

**Tip:** Use `watch` command to monitor network information in real-time: `watch -n 1 'ip addr show'`
