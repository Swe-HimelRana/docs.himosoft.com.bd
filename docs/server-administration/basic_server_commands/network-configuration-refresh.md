---
title: Network Configuration Refresh
description: Complete guide to refresh and reset network configurations on Linux systems.
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Network Configuration Refresh

This guide covers various methods to refresh, reset, and reload network configurations on different Linux distributions.

---

## Quick Network Refresh Commands

### 1. Release and Renew DHCP

```bash
# Release current IP
sudo dhclient -r

# Renew IP from DHCP server
sudo dhclient

# Release and renew in one command
sudo dhclient -r && sudo dhclient
```

### 2. Restart Network Services

<Tabs>
<TabItem value="systemd" label="Systemd Systems" default>

```bash
# Restart NetworkManager
sudo systemctl restart NetworkManager

# Restart networking service
sudo systemctl restart networking

# Restart network service (CentOS/RHEL)
sudo systemctl restart network

# Check service status
sudo systemctl status NetworkManager
```

</TabItem>
<TabItem value="netplan" label="Netplan (Ubuntu 18.04+)">

```bash
# Apply netplan configuration
sudo netplan apply

# Try configuration (reverts after 120 seconds if failed)
sudo netplan try

# Generate configuration
sudo netplan generate

# Check netplan status
sudo netplan status
```

</TabItem>
<TabItem value="traditional" label="Traditional Methods">

```bash
# Restart network interface
sudo ifdown eth0 && sudo ifup eth0

# Restart all interfaces
sudo service networking restart

# Reload network configuration
sudo /etc/init.d/networking reload
```

</TabItem>
</Tabs>

---

## Interface-Specific Refresh

### 1. Bring Interface Down and Up

```bash
# Bring interface down
sudo ip link set eth0 down

# Bring interface up
sudo ip link set eth0 up

# Combined command
sudo ip link set eth0 down && sudo ip link set eth0 up
```

### 2. Using ifconfig

```bash
# Disable interface
sudo ifconfig eth0 down

# Enable interface
sudo ifconfig eth0 up

# Combined command
sudo ifconfig eth0 down && sudo ifconfig eth0 up
```

### 3. Using nmcli (NetworkManager)

```bash
# Disconnect connection
sudo nmcli connection down "connection-name"

# Connect connection
sudo nmcli connection up "connection-name"

# Restart specific connection
sudo nmcli connection down "connection-name" && sudo nmcli connection up "connection-name"
```

---

## Complete Network Reset

### 1. Full Network Reset (Ubuntu/Debian)

```bash
# Stop NetworkManager
sudo systemctl stop NetworkManager

# Flush all IP addresses
sudo ip addr flush dev eth0

# Remove all routes
sudo ip route flush dev eth0

# Restart NetworkManager
sudo systemctl start NetworkManager

# Or restart networking service
sudo systemctl restart networking
```

### 2. Full Network Reset (CentOS/RHEL)

```bash
# Stop network service
sudo systemctl stop network

# Flush IP configuration
sudo ip addr flush dev eth0
sudo ip route flush dev eth0

# Start network service
sudo systemctl start network
```

### 3. Reset NetworkManager Connections

```bash
# List all connections
nmcli connection show

# Delete specific connection
sudo nmcli connection delete "connection-name"

# Reload NetworkManager
sudo systemctl reload NetworkManager
```

---

## DNS Configuration Refresh

### 1. Flush DNS Cache

```bash
# Flush systemd-resolved cache
sudo systemctl flush-dns

# Alternative method
sudo resolvectl flush-caches

# Restart systemd-resolved
sudo systemctl restart systemd-resolved
```

### 2. Update DNS Configuration

```bash
# Reload resolv.conf
sudo systemctl restart systemd-resolved

# Check DNS configuration
cat /etc/resolv.conf

# Test DNS resolution
nslookup google.com
```

---

## Troubleshooting Network Issues

### 1. Check Network Status

```bash
# Check interface status
ip link show

# Check IP addresses
ip addr show

# Check routing table
ip route show

# Check network services
sudo systemctl status NetworkManager
sudo systemctl status networking
```

### 2. Common Refresh Scenarios

| Scenario | Command |
|----------|---------|
| IP not updating | `sudo dhclient -r && sudo dhclient` |
| DNS not working | `sudo systemctl restart systemd-resolved` |
| Connection lost | `sudo systemctl restart NetworkManager` |
| Static IP not applied | `sudo netplan apply` (Ubuntu) |
| Interface not responding | `sudo ip link set eth0 down && sudo ip link set eth0 up` |

### 3. Network Debug Commands

```bash
# Check network interface details
ethtool eth0

# Check network statistics
cat /proc/net/dev

# Monitor network traffic
sudo netstat -i

# Check ARP table
arp -a

# Test connectivity
ping -c 4 8.8.8.8
```

---

## Automated Network Refresh Scripts

### 1. Simple Refresh Script

```bash
#!/bin/bash
# network-refresh.sh

echo "Refreshing network configuration..."

# Release and renew DHCP
sudo dhclient -r
sudo dhclient

# Restart NetworkManager
sudo systemctl restart NetworkManager

# Flush DNS cache
sudo systemctl flush-dns

echo "Network refresh completed!"
```

### 2. Advanced Refresh Script

```bash
#!/bin/bash
# advanced-network-refresh.sh

INTERFACE="eth0"

echo "Starting advanced network refresh for $INTERFACE..."

# Bring interface down
sudo ip link set $INTERFACE down
sleep 2

# Flush IP configuration
sudo ip addr flush dev $INTERFACE
sudo ip route flush dev $INTERFACE

# Bring interface up
sudo ip link set $INTERFACE up
sleep 2

# Release and renew DHCP
sudo dhclient -r $INTERFACE
sudo dhclient $INTERFACE

# Restart NetworkManager
sudo systemctl restart NetworkManager

# Flush DNS cache
sudo systemctl flush-dns

echo "Advanced network refresh completed!"
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Release DHCP | `sudo dhclient -r` |
| Renew DHCP | `sudo dhclient` |
| Restart NetworkManager | `sudo systemctl restart NetworkManager` |
| Apply netplan | `sudo netplan apply` |
| Flush DNS | `sudo systemctl flush-dns` |
| Interface down/up | `sudo ip link set eth0 down && sudo ip link set eth0 up` |
| Check status | `ip addr show` |

---

## Best Practices

1. **Test changes**: Always verify network connectivity after refresh
2. **Backup configs**: Save network configurations before major changes
3. **Use appropriate method**: Choose the right refresh method for your system
4. **Monitor logs**: Check system logs if refresh fails
5. **Gradual approach**: Try less disruptive methods first

---

**Warning:** Some network refresh operations may temporarily disconnect your SSH session. Use console access when possible for critical operations.
