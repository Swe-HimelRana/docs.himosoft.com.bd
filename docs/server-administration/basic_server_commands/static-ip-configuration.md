---
title: Static IP Configuration
description: Complete guide to configure static IP addresses on Linux systems using NetworkManager, netplan, and traditional methods.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Static IP Configuration

This guide covers how to configure static IP addresses on different Linux distributions and network management systems.

---

## Prerequisites

Before configuring a static IP, gather the following information:

- **IP Address**: The static IP you want to assign
- **Subnet Mask**: Usually `/24` (255.255.255.0) for home networks
- **Gateway**: Your router's IP address (usually `.1` or `.254`)
- **DNS Servers**: Primary and secondary DNS servers

### Find Current Network Information

```bash
# Get current IP configuration
ip addr show

# Get current gateway
ip route show default

# Get current DNS servers
cat /etc/resolv.conf
```

---

## Configuration Methods

<Tabs>
<TabItem value="networkmanager" label="NetworkManager (Ubuntu/Debian)" default>

### 1. Using nmcli (Command Line)

```bash
# List available connections
nmcli connection show

# Create a new static connection
sudo nmcli connection add type ethernet con-name "static-eth0" ifname eth0

# Configure static IP
sudo nmcli connection modify "static-eth0" ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify "static-eth0" ipv4.gateway 192.168.1.1
sudo nmcli connection modify "static-eth0" ipv4.dns "8.8.8.8,8.8.4.4"
sudo nmcli connection modify "static-eth0" ipv4.method manual

# Activate the connection
sudo nmcli connection up "static-eth0"
```

### 2. Using nmtui (Text Interface)

```bash
sudo nmtui
```

**Steps in nmtui:**
1. Select "Edit a connection"
2. Choose your network interface
3. Select "Edit"
4. Set IPv4 configuration to "Manual"
5. Add your static IP, gateway, and DNS servers
6. Select "OK" and "Back"
7. Select "Activate a connection" and activate your new connection

### 3. Using GUI (Network Settings)

1. Open **Settings** → **Network**
2. Click the gear icon next to your connection
3. Go to **IPv4** tab
4. Change method to **Manual**
5. Enter your static IP configuration
6. Click **Apply**

</TabItem>
<TabItem value="netplan" label="Netplan (Ubuntu 18.04+)">

### 1. Create Netplan Configuration

```bash
# Create or edit netplan configuration
sudo nano /etc/netplan/01-netcfg.yaml
```

### 2. Netplan Configuration Example

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      dhcp4: false
      addresses:
        - 192.168.1.100/24
      gateway4: 192.168.1.1
      nameservers:
        addresses:
          - 8.8.8.8
          - 8.8.4.4
```

### 3. Apply Configuration

```bash
# Test configuration
sudo netplan try

# Apply configuration
sudo netplan apply

# Check status
sudo netplan status
```

</TabItem>
<TabItem value="traditional" label="Traditional (Debian/CentOS)">

### 1. Edit Network Interfaces File

```bash
# Debian/Ubuntu
sudo nano /etc/network/interfaces

# CentOS/RHEL
sudo nano /etc/sysconfig/network-scripts/ifcfg-eth0
```

### 2. Debian/Ubuntu Configuration

```bash
# /etc/network/interfaces
auto eth0
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4
```

### 3. CentOS/RHEL Configuration

```bash
# /etc/sysconfig/network-scripts/ifcfg-eth0
TYPE=Ethernet
BOOTPROTO=static
NAME=eth0
DEVICE=eth0
ONBOOT=yes
IPADDR=192.168.1.100
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
DNS1=8.8.8.8
DNS2=8.8.4.4
```

### 4. Restart Network Service

```bash
# Debian/Ubuntu
sudo systemctl restart networking

# CentOS/RHEL
sudo systemctl restart network
```

</TabItem>
</Tabs>

---

## Verification

### 1. Check IP Configuration

```bash
# Check current IP address
ip addr show

# Alternative command
ifconfig

# Check routing table
ip route show
```

### 2. Test Connectivity

```bash
# Test gateway connectivity
ping -c 4 192.168.1.1

# Test DNS resolution
nslookup google.com

# Test internet connectivity
ping -c 4 8.8.8.8
```

### 3. Check DNS Resolution

```bash
# Test DNS
dig google.com

# Check DNS servers
cat /etc/resolv.conf
```

---

## Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| No internet access | Check gateway and DNS configuration |
| IP conflict | Verify IP is not in use by another device |
| Connection not working | Restart network service or reboot |
| DNS not resolving | Check DNS server configuration |

### Debug Commands

```bash
# Check network interface status
ip link show

# Check routing table
ip route show

# Test specific interface
ping -I eth0 8.8.8.8

# Check network manager status
systemctl status NetworkManager

# View network logs
journalctl -u NetworkManager
```

---

## Quick Reference

| Task | Command |
|------|---------|
| List connections | `nmcli connection show` |
| Show IP config | `ip addr show` |
| Show routing | `ip route show` |
| Test connectivity | `ping -c 4 8.8.8.8` |
| Restart network | `sudo systemctl restart networking` |
| Apply netplan | `sudo netplan apply` |

---

## Security Notes

- **Use private IP ranges**: 192.168.x.x, 10.x.x.x, or 172.16-31.x.x
- **Avoid IP conflicts**: Check your network for existing IPs
- **Document changes**: Keep track of static IP assignments
- **Backup configs**: Save original network configurations before changes

---

**Tip:** Always test your configuration with `netplan try` (Ubuntu) or restart network services to ensure changes work before rebooting.
