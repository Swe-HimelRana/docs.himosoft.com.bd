---
title: System & Resource Configuration
description: Comprehensive system and resource configuration using bash commands for timezone, NTP, swap, user limits, and ulimit tuning for Debian/Ubuntu and CentOS.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# System & Resource Configuration

Comprehensive system and resource configuration using bash commands for timezone, NTP, swap, user limits, and ulimit tuning for Debian/Ubuntu and CentOS.

---

## Timezone Configuration

### **1. Set Correct Timezone Using timedatectl**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check current timezone
timedatectl status

# List available timezones
timedatectl list-timezones

# Set timezone to UTC
sudo timedatectl set-timezone UTC

# Set timezone to specific region
sudo timedatectl set-timezone America/New_York
sudo timedatectl set-timezone Europe/London
sudo timedatectl set-timezone Asia/Dhaka

# Verify timezone change
timedatectl status

# Check system time
date
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check current timezone
timedatectl status

# List available timezones
timedatectl list-timezones

# Set timezone to UTC
sudo timedatectl set-timezone UTC

# Set timezone to specific region
sudo timedatectl set-timezone America/New_York
sudo timedatectl set-timezone Europe/London
sudo timedatectl set-timezone Asia/Dhaka

# Verify timezone change
timedatectl status

# Check system time
date
```

</TabItem>
</Tabs>

### **2. Configure Timezone Manually**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create symbolic link to timezone
sudo ln -sf /usr/share/zoneinfo/UTC /etc/localtime

# Or for specific timezone
sudo ln -sf /usr/share/zoneinfo/America/New_York /etc/localtime

# Update /etc/timezone file
echo "UTC" | sudo tee /etc/timezone

# Verify timezone
date
cat /etc/timezone
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create symbolic link to timezone
sudo ln -sf /usr/share/zoneinfo/UTC /etc/localtime

# Or for specific timezone
sudo ln -sf /usr/share/zoneinfo/America/New_York /etc/localtime

# Update /etc/timezone file
echo "UTC" | sudo tee /etc/timezone

# Verify timezone
date
cat /etc/timezone
```

</TabItem>
</Tabs>

---

## NTP Time Synchronization

### **1. Enable Time Sync with systemd-timesyncd**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check NTP status
timedatectl status

# Enable NTP synchronization
sudo timedatectl set-ntp true

# Disable NTP synchronization
sudo timedatectl set-ntp false

# Check NTP servers
timedatectl show-timesync

# Check NTP status
timedatectl timesync-status

# View NTP logs
sudo journalctl -u systemd-timesyncd
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check NTP status
timedatectl status

# Enable NTP synchronization
sudo timedatectl set-ntp true

# Disable NTP synchronization
sudo timedatectl set-ntp false

# Check NTP servers
timedatectl show-timesync

# Check NTP status
timedatectl timesync-status

# View NTP logs
sudo journalctl -u systemd-timesyncd
```

</TabItem>
</Tabs>

### **2. Configure Chrony (Alternative NTP)**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install chrony
sudo apt install chrony

# Edit chrony configuration
sudo nano /etc/chrony/chrony.conf

# Add NTP servers:
# server 0.pool.ntp.org iburst
# server 1.pool.ntp.org iburst
# server 2.pool.ntp.org iburst

# Start and enable chrony
sudo systemctl start chrony
sudo systemctl enable chrony

# Check chrony status
sudo chronyc sources
sudo chronyc tracking
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install chrony
sudo yum install chrony

# Edit chrony configuration
sudo nano /etc/chrony.conf

# Add NTP servers:
# server 0.pool.ntp.org iburst
# server 1.pool.ntp.org iburst
# server 2.pool.ntp.org iburst

# Start and enable chrony
sudo systemctl start chronyd
sudo systemctl enable chronyd

# Check chrony status
sudo chronyc sources
sudo chronyc tracking
```

</TabItem>
</Tabs>

---

## Swap Space Configuration

### **1. Check Current Swap Status**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check swap usage
free -h

# Check swap partitions
swapon --show

# Check swap files
ls -la /swap*

# Check swap in /proc
cat /proc/swaps

# Check swap configuration
cat /proc/meminfo | grep -i swap
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check swap usage
free -h

# Check swap partitions
swapon --show

# Check swap files
ls -la /swap*

# Check swap in /proc
cat /proc/swaps

# Check swap configuration
cat /proc/meminfo | grep -i swap
```

</TabItem>
</Tabs>

### **2. Create Swap File**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create 4GB swap file
sudo fallocate -l 4G /swapfile

# Or use dd for older systems
sudo dd if=/dev/zero of=/swapfile bs=1M count=4096

# Set proper permissions
sudo chmod 600 /swapfile

# Make it swap
sudo mkswap /swapfile

# Enable swap
sudo swapon /swapfile

# Verify swap is active
free -h
swapon --show
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create 4GB swap file
sudo fallocate -l 4G /swapfile

# Or use dd for older systems
sudo dd if=/dev/zero of=/swapfile bs=1M count=4096

# Set proper permissions
sudo chmod 600 /swapfile

# Make it swap
sudo mkswap /swapfile

# Enable swap
sudo swapon /swapfile

# Verify swap is active
free -h
swapon --show
```

</TabItem>
</Tabs>

### **3. Make Swap Permanent**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Add swap to /etc/fstab
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verify fstab entry
cat /etc/fstab

# Test fstab (will be applied on reboot)
sudo swapoff /swapfile
sudo swapon /swapfile

# Check swap after reboot
free -h
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Add swap to /etc/fstab
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verify fstab entry
cat /etc/fstab

# Test fstab (will be applied on reboot)
sudo swapoff /swapfile
sudo swapon /swapfile

# Check swap after reboot
free -h
```

</TabItem>
</Tabs>

### **4. Optimize Swap Settings**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check current swappiness
cat /proc/sys/vm/swappiness

# Set swappiness to 10 (less aggressive)
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf

# Apply immediately
sudo sysctl vm.swappiness=10

# Verify change
cat /proc/sys/vm/swappiness

# Check swap usage
free -h
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check current swappiness
cat /proc/sys/vm/swappiness

# Set swappiness to 10 (less aggressive)
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf

# Apply immediately
sudo sysctl vm.swappiness=10

# Verify change
cat /proc/sys/vm/swappiness

# Check swap usage
free -h
```

</TabItem>
</Tabs>

---

## User and Process Limits

### **1. Configure /etc/security/limits.conf**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Edit limits configuration
sudo nano /etc/security/limits.conf

# Add the following lines for all users:
# * soft nofile 1024
# * hard nofile 2048
# * soft nproc 1024
# * hard nproc 2048

# Add specific limits for root:
# root soft nofile 4096
# root hard nofile 8192

# Add limits for specific user:
# username soft nofile 2048
# username hard nofile 4096

# Apply changes (requires logout/login)
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Edit limits configuration
sudo nano /etc/security/limits.conf

# Add the following lines for all users:
# * soft nofile 1024
# * hard nofile 2048
# * soft nproc 1024
# * hard nproc 2048

# Add specific limits for root:
# root soft nofile 4096
# root hard nofile 8192

# Add limits for specific user:
# username soft nofile 2048
# username hard nofile 4096

# Apply changes (requires logout/login)
```

</TabItem>
</Tabs>

### **2. Configure ulimit Settings**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check current limits
ulimit -a

# Set limits for current session
ulimit -n 2048
ulimit -u 1024

# Check specific limits
ulimit -n  # open files
ulimit -u  # processes
ulimit -s  # stack size
ulimit -c  # core file size

# Set limits in profile
echo 'ulimit -n 2048' >> ~/.bashrc
echo 'ulimit -u 1024' >> ~/.bashrc
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check current limits
ulimit -a

# Set limits for current session
ulimit -n 2048
ulimit -u 1024

# Check specific limits
ulimit -n  # open files
ulimit -u  # processes
ulimit -s  # stack size
ulimit -c  # core file size

# Set limits in profile
echo 'ulimit -n 2048' >> ~/.bashrc
echo 'ulimit -u 1024' >> ~/.bashrc
```

</TabItem>
</Tabs>

### **3. Configure Systemd Limits**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create systemd override directory
sudo mkdir -p /etc/systemd/system.conf.d

# Create limits override
sudo tee /etc/systemd/system.conf.d/limits.conf << 'EOF'
[Manager]
DefaultLimitNOFILE=2048
DefaultLimitNPROC=1024
EOF

# Reload systemd
sudo systemctl daemon-reload

# Restart systemd
sudo systemctl restart systemd

# Verify limits
systemctl show --property=DefaultLimitNOFILE
systemctl show --property=DefaultLimitNPROC
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create systemd override directory
sudo mkdir -p /etc/systemd/system.conf.d

# Create limits override
sudo tee /etc/systemd/system.conf.d/limits.conf << 'EOF'
[Manager]
DefaultLimitNOFILE=2048
DefaultLimitNPROC=1024
EOF

# Reload systemd
sudo systemctl daemon-reload

# Restart systemd
sudo systemctl restart systemd

# Verify limits
systemctl show --property=DefaultLimitNOFILE
systemctl show --property=DefaultLimitNPROC
```

</TabItem>
</Tabs>

---

## System Resource Monitoring

### **1. Monitor System Resources**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check CPU usage
top
htop
mpstat 1 5

# Check memory usage
free -h
vmstat 1 5

# Check disk usage
df -h
du -sh /*

# Check disk I/O
iostat -x 1 5
iotop

# Check network usage
iftop
nethogs
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check CPU usage
top
htop
mpstat 1 5

# Check memory usage
free -h
vmstat 1 5

# Check disk usage
df -h
du -sh /*

# Check disk I/O
iostat -x 1 5
iotop

# Check network usage
iftop
nethogs
```

</TabItem>
</Tabs>

### **2. Monitor Process Resources**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check process memory usage
ps aux --sort=-%mem | head -10

# Check process CPU usage
ps aux --sort=-%cpu | head -10

# Check specific process
ps -p $(pgrep nginx) -o pid,ppid,cmd,%mem,%cpu

# Monitor specific process
top -p $(pgrep nginx)

# Check process limits
cat /proc/$(pgrep nginx)/limits
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check process memory usage
ps aux --sort=-%mem | head -10

# Check process CPU usage
ps aux --sort=-%cpu | head -10

# Check specific process
ps -p $(pgrep nginx) -o pid,ppid,cmd,%mem,%cpu

# Monitor specific process
top -p $(pgrep nginx)

# Check process limits
cat /proc/$(pgrep nginx)/limits
```

</TabItem>
</Tabs>

---

## System Tuning and Optimization

### **1. Kernel Parameter Tuning**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check current kernel parameters
sysctl -a | grep vm
sysctl -a | grep fs
sysctl -a | grep net

# Set kernel parameters
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
echo 'vm.dirty_ratio=15' | sudo tee -a /etc/sysctl.conf
echo 'vm.dirty_background_ratio=5' | sudo tee -a /etc/sysctl.conf

# Apply changes
sudo sysctl -p

# Set parameters immediately
sudo sysctl vm.swappiness=10

# Check parameters
sysctl vm.swappiness
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check current kernel parameters
sysctl -a | grep vm
sysctl -a | grep fs
sysctl -a | grep net

# Set kernel parameters
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
echo 'vm.dirty_ratio=15' | sudo tee -a /etc/sysctl.conf
echo 'vm.dirty_background_ratio=5' | sudo tee -a /etc/sysctl.conf

# Apply changes
sudo sysctl -p

# Set parameters immediately
sudo sysctl vm.swappiness=10

# Check parameters
sysctl vm.swappiness
```

</TabItem>
</Tabs>

### **2. File System Optimization**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check file system type
df -T

# Optimize ext4 file system
sudo tune2fs -O has_journal /dev/sda1
sudo tune2fs -m 1 /dev/sda1

# Check file system parameters
sudo tune2fs -l /dev/sda1

# Optimize mount options in /etc/fstab
# Add: defaults,noatime,nodiratime,data=writeback

# Check current mount options
mount | grep "on / "
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check file system type
df -T

# Optimize ext4 file system
sudo tune2fs -O has_journal /dev/sda1
sudo tune2fs -m 1 /dev/sda1

# Check file system parameters
sudo tune2fs -l /dev/sda1

# Optimize mount options in /etc/fstab
# Add: defaults,noatime,nodiratime,data=writeback

# Check current mount options
mount | grep "on / "
```

</TabItem>
</Tabs>

---

## Memory Management

### **1. Check Memory Usage**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Detailed memory information
cat /proc/meminfo

# Memory usage summary
free -h

# Memory usage by process
ps aux --sort=-%mem | head -10

# Check memory fragmentation
cat /proc/buddyinfo

# Check memory pressure
cat /proc/pressure/memory
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Detailed memory information
cat /proc/meminfo

# Memory usage summary
free -h

# Memory usage by process
ps aux --sort=-%mem | head -10

# Check memory fragmentation
cat /proc/buddyinfo

# Check memory pressure
cat /proc/pressure/memory
```

</TabItem>
</Tabs>

### **2. Clear Memory Cache**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check current cache usage
free -h

# Clear page cache
sudo sync && sudo echo 1 > /proc/sys/vm/drop_caches

# Clear dentries and inodes
sudo sync && sudo echo 2 > /proc/sys/vm/drop_caches

# Clear all caches
sudo sync && sudo echo 3 > /proc/sys/vm/drop_caches

# Verify cache cleared
free -h
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check current cache usage
free -h

# Clear page cache
sudo sync && sudo echo 1 > /proc/sys/vm/drop_caches

# Clear dentries and inodes
sudo sync && sudo echo 2 > /proc/sys/vm/drop_caches

# Clear all caches
sudo sync && sudo echo 3 > /proc/sys/vm/drop_caches

# Verify cache cleared
free -h
```

</TabItem>
</Tabs>

---

## System Information and Diagnostics

### **1. System Information Commands**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# System information
uname -a
cat /etc/os-release
lsb_release -a

# Hardware information
lshw
dmidecode
lscpu

# Kernel information
cat /proc/version
uname -r

# System uptime
uptime
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# System information
uname -a
cat /etc/os-release
lsb_release -a

# Hardware information
lshw
dmidecode
lscpu

# Kernel information
cat /proc/version
uname -r

# System uptime
uptime
```

</TabItem>
</Tabs>

### **2. System Diagnostics**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check system logs
journalctl -f
tail -f /var/log/syslog

# Check system errors
dmesg | grep -i error
journalctl -p err

# Check system warnings
dmesg | grep -i warning
journalctl -p warning

# Check system load
cat /proc/loadavg
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check system logs
journalctl -f
tail -f /var/log/messages

# Check system errors
dmesg | grep -i error
journalctl -p err

# Check system warnings
dmesg | grep -i warning
journalctl -p warning

# Check system load
cat /proc/loadavg
```

</TabItem>
</Tabs>

---

**Note**: Always test configuration changes in a safe environment before applying them to production servers. Monitor system performance after making changes to ensure optimal operation. 