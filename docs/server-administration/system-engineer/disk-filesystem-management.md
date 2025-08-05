---
title: Disk and Filesystem Management
description: Comprehensive disk and filesystem management using bash commands for Debian/Ubuntu and CentOS with step-by-step instructions.
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Disk and Filesystem Management

Comprehensive disk and filesystem management using bash commands for Debian/Ubuntu and CentOS with step-by-step instructions.

---

## Disk Partitioning

### **1. List Available Disks**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# List all disks
lsblk

# List disks with details
sudo fdisk -l

# List disks with UUID
sudo blkid

# List disk partitions
cat /proc/partitions

# Show disk usage
df -h
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# List all disks
lsblk

# List disks with details
sudo fdisk -l

# List disks with UUID
sudo blkid

# List disk partitions
cat /proc/partitions

# Show disk usage
df -h
```

</TabItem>
</Tabs>

### **2. Create Partitions with fdisk**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Start fdisk for a disk
sudo fdisk /dev/sdb

# fdisk commands:
# n - new partition
# p - primary partition
# 1 - partition number
# Enter - use default start sector
# +10G - size (10GB)
# w - write changes and exit

# List partitions after creation
sudo fdisk -l /dev/sdb
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Start fdisk for a disk
sudo fdisk /dev/sdb

# fdisk commands:
# n - new partition
# p - primary partition
# 1 - partition number
# Enter - use default start sector
# +10G - size (10GB)
# w - write changes and exit

# List partitions after creation
sudo fdisk -l /dev/sdb
```

</TabItem>
</Tabs>

### **3. Create Partitions with parted**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Start parted for a disk
sudo parted /dev/sdb

# parted commands:
# print - show current partitions
# mklabel gpt - create GPT partition table
# mkpart primary ext4 0% 100% - create partition
# quit - exit parted

# Create partition from command line
sudo parted /dev/sdb mklabel gpt
sudo parted /dev/sdb mkpart primary ext4 0% 100%
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Start parted for a disk
sudo parted /dev/sdb

# parted commands:
# print - show current partitions
# mklabel gpt - create GPT partition table
# mkpart primary ext4 0% 100% - create partition
# quit - exit parted

# Create partition from command line
sudo parted /dev/sdb mklabel gpt
sudo parted /dev/sdb mkpart primary ext4 0% 100%
```

</TabItem>
</Tabs>

---

## Filesystem Creation

### **1. Create ext4 Filesystem**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create ext4 filesystem
sudo mkfs.ext4 /dev/sdb1

# Create filesystem with specific options
sudo mkfs.ext4 -L data /dev/sdb1

# Check filesystem
sudo fsck.ext4 /dev/sdb1

# Show filesystem information
sudo tune2fs -l /dev/sdb1
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create ext4 filesystem
sudo mkfs.ext4 /dev/sdb1

# Create filesystem with specific options
sudo mkfs.ext4 -L data /dev/sdb1

# Check filesystem
sudo fsck.ext4 /dev/sdb1

# Show filesystem information
sudo tune2fs -l /dev/sdb1
```

</TabItem>
</Tabs>

### **2. Create XFS Filesystem**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install XFS tools
sudo apt install xfsprogs

# Create XFS filesystem
sudo mkfs.xfs /dev/sdb1

# Create XFS with specific options
sudo mkfs.xfs -L data /dev/sdb1

# Check XFS filesystem
sudo xfs_repair /dev/sdb1

# Show XFS information
sudo xfs_info /dev/sdb1
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install XFS tools (usually pre-installed)
sudo yum install xfsprogs

# Create XFS filesystem
sudo mkfs.xfs /dev/sdb1

# Create XFS with specific options
sudo mkfs.xfs -L data /dev/sdb1

# Check XFS filesystem
sudo xfs_repair /dev/sdb1

# Show XFS information
sudo xfs_info /dev/sdb1
```

</TabItem>
</Tabs>

### **3. Create Other Filesystems**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create Btrfs filesystem
sudo mkfs.btrfs /dev/sdb1

# Create FAT32 filesystem
sudo mkfs.vfat /dev/sdb1

# Create NTFS filesystem
sudo mkfs.ntfs /dev/sdb1

# Create swap partition
sudo mkswap /dev/sdb2
sudo swapon /dev/sdb2
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create Btrfs filesystem
sudo mkfs.btrfs /dev/sdb1

# Create FAT32 filesystem
sudo mkfs.vfat /dev/sdb1

# Create NTFS filesystem
sudo mkfs.ntfs /dev/sdb1

# Create swap partition
sudo mkswap /dev/sdb2
sudo swapon /dev/sdb2
```

</TabItem>
</Tabs>

---

## Mount Points and /etc/fstab

### **1. Create Mount Points**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create mount directory
sudo mkdir -p /mnt/data

# Mount filesystem temporarily
sudo mount /dev/sdb1 /mnt/data

# Check mount status
mount | grep sdb1
df -h

# Unmount filesystem
sudo umount /mnt/data
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create mount directory
sudo mkdir -p /mnt/data

# Mount filesystem temporarily
sudo mount /dev/sdb1 /mnt/data

# Check mount status
mount | grep sdb1
df -h

# Unmount filesystem
sudo umount /mnt/data
```

</TabItem>
</Tabs>

### **2. Configure /etc/fstab**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Get UUID of partition
sudo blkid /dev/sdb1

# Backup fstab
sudo cp /etc/fstab /etc/fstab.backup

# Add entry to fstab
echo "UUID=your-uuid-here /mnt/data ext4 defaults 0 2" | sudo tee -a /etc/fstab

# Test fstab configuration
sudo mount -a

# Verify mount
df -h
mount | grep data
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Get UUID of partition
sudo blkid /dev/sdb1

# Backup fstab
sudo cp /etc/fstab /etc/fstab.backup

# Add entry to fstab
echo "UUID=your-uuid-here /mnt/data ext4 defaults 0 2" | sudo tee -a /etc/fstab

# Test fstab configuration
sudo mount -a

# Verify mount
df -h
mount | grep data
```

</TabItem>
</Tabs>

### **3. Mount Options**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Mount with specific options
sudo mount -o noatime,nodiratime /dev/sdb1 /mnt/data

# Mount read-only
sudo mount -o ro /dev/sdb1 /mnt/data

# Mount with user permissions
sudo mount -o uid=1000,gid=1000 /dev/sdb1 /mnt/data

# Remount with different options
sudo mount -o remount,rw /mnt/data
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Mount with specific options
sudo mount -o noatime,nodiratime /dev/sdb1 /mnt/data

# Mount read-only
sudo mount -o ro /dev/sdb1 /mnt/data

# Mount with user permissions
sudo mount -o uid=1000,gid=1000 /dev/sdb1 /mnt/data

# Remount with different options
sudo mount -o remount,rw /mnt/data
```

</TabItem>
</Tabs>

---

## Disk Space Monitoring

### **1. Check Disk Usage**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Show disk usage
df -h

# Show disk usage in human readable format
df -h --total

# Show disk usage for specific directory
du -sh /var/log

# Show disk usage for all directories
du -sh /*

# Find largest files
find / -type f -size +100M -exec ls -lh {} \; 2>/dev/null
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Show disk usage
df -h

# Show disk usage in human readable format
df -h --total

# Show disk usage for specific directory
du -sh /var/log

# Show disk usage for all directories
du -sh /*

# Find largest files
find / -type f -size +100M -exec ls -lh {} \; 2>/dev/null
```

</TabItem>
</Tabs>

### **2. Advanced Disk Analysis**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install ncdu for disk usage analysis
sudo apt install ncdu

# Analyze disk usage interactively
sudo ncdu /

# Analyze specific directory
ncdu /var/log

# Show disk usage by file type
find / -type f -name "*.log" -exec du -ch {} + | tail -1

# Show disk usage by directory depth
du -h --max-depth=2 /var
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install ncdu for disk usage analysis
sudo yum install ncdu

# Analyze disk usage interactively
sudo ncdu /

# Analyze specific directory
ncdu /var/log

# Show disk usage by file type
find / -type f -name "*.log" -exec du -ch {} + | tail -1

# Show disk usage by directory depth
du -h --max-depth=2 /var
```

</TabItem>
</Tabs>

### **3. Disk Space Cleanup**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Clean package cache
sudo apt clean
sudo apt autoclean

# Remove old log files
sudo find /var/log -name "*.log" -mtime +30 -delete

# Remove old kernel versions
sudo apt autoremove

# Clean temporary files
sudo find /tmp -type f -mtime +7 -delete

# Clean user cache
rm -rf ~/.cache/*
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Clean package cache
sudo yum clean all
sudo dnf clean all

# Remove old log files
sudo find /var/log -name "*.log" -mtime +30 -delete

# Remove old kernel versions
sudo yum autoremove
sudo dnf autoremove

# Clean temporary files
sudo find /tmp -type f -mtime +7 -delete

# Clean user cache
rm -rf ~/.cache/*
```

</TabItem>
</Tabs>

---

## Log Rotation

### **1. Configure logrotate**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check logrotate configuration
sudo cat /etc/logrotate.conf

# Check specific logrotate configs
sudo ls /etc/logrotate.d/

# Test logrotate configuration
sudo logrotate -d /etc/logrotate.conf

# Force logrotate to run
sudo logrotate -f /etc/logrotate.conf

# Check logrotate status
sudo cat /var/lib/logrotate/status
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check logrotate configuration
sudo cat /etc/logrotate.conf

# Check specific logrotate configs
sudo ls /etc/logrotate.d/

# Test logrotate configuration
sudo logrotate -d /etc/logrotate.conf

# Force logrotate to run
sudo logrotate -f /etc/logrotate.conf

# Check logrotate status
sudo cat /var/lib/logrotate/status
```

</TabItem>
</Tabs>

### **2. Create Custom logrotate Configuration**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create custom logrotate config
sudo nano /etc/logrotate.d/custom-app

# Add configuration:
# /var/log/custom-app/*.log {
#     daily
#     missingok
#     rotate 7
#     compress
#     delaycompress
#     notifempty
#     create 644 root root
#     postrotate
#         systemctl reload custom-app
#     endscript
# }

# Test custom configuration
sudo logrotate -d /etc/logrotate.d/custom-app
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create custom logrotate config
sudo nano /etc/logrotate.d/custom-app

# Add configuration:
# /var/log/custom-app/*.log {
#     daily
#     missingok
#     rotate 7
#     compress
#     delaycompress
#     notifempty
#     create 644 root root
#     postrotate
#         systemctl reload custom-app
#     endscript
# }

# Test custom configuration
sudo logrotate -d /etc/logrotate.d/custom-app
```

</TabItem>
</Tabs>

---

## Filesystem Maintenance

### **1. Check and Repair Filesystems**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check filesystem (ext4)
sudo fsck.ext4 /dev/sdb1

# Check filesystem (XFS)
sudo xfs_repair /dev/sdb1

# Check all filesystems on boot
sudo touch /forcefsck

# Check filesystem usage
sudo tune2fs -l /dev/sdb1

# Show filesystem statistics
sudo stat -f /mnt/data
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check filesystem (ext4)
sudo fsck.ext4 /dev/sdb1

# Check filesystem (XFS)
sudo xfs_repair /dev/sdb1

# Check all filesystems on boot
sudo touch /forcefsck

# Check filesystem usage
sudo tune2fs -l /dev/sdb1

# Show filesystem statistics
sudo stat -f /mnt/data
```

</TabItem>
</Tabs>

### **2. Filesystem Optimization**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Optimize ext4 filesystem
sudo tune2fs -O has_journal /dev/sdb1
sudo tune2fs -m 1 /dev/sdb1

# Set filesystem label
sudo e2label /dev/sdb1 data-partition

# Show filesystem information
sudo tune2fs -l /dev/sdb1

# Check filesystem health
sudo smartctl -a /dev/sdb
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Optimize ext4 filesystem
sudo tune2fs -O has_journal /dev/sdb1
sudo tune2fs -m 1 /dev/sdb1

# Set filesystem label
sudo e2label /dev/sdb1 data-partition

# Show filesystem information
sudo tune2fs -l /dev/sdb1

# Check filesystem health
sudo smartctl -a /dev/sdb
```

</TabItem>
</Tabs>

---

## LVM (Logical Volume Management)

### **1. Create LVM Volumes**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install LVM tools
sudo apt install lvm2

# Create physical volume
sudo pvcreate /dev/sdb1

# Create volume group
sudo vgcreate vg_data /dev/sdb1

# Create logical volume
sudo lvcreate -L 10G -n lv_data vg_data

# Create filesystem on logical volume
sudo mkfs.ext4 /dev/vg_data/lv_data
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install LVM tools (usually pre-installed)
sudo yum install lvm2

# Create physical volume
sudo pvcreate /dev/sdb1

# Create volume group
sudo vgcreate vg_data /dev/sdb1

# Create logical volume
sudo lvcreate -L 10G -n lv_data vg_data

# Create filesystem on logical volume
sudo mkfs.ext4 /dev/vg_data/lv_data
```

</TabItem>
</Tabs>

### **2. LVM Management**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# List physical volumes
sudo pvdisplay

# List volume groups
sudo vgdisplay

# List logical volumes
sudo lvdisplay

# Extend logical volume
sudo lvextend -L +5G /dev/vg_data/lv_data

# Resize filesystem
sudo resize2fs /dev/vg_data/lv_data
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# List physical volumes
sudo pvdisplay

# List volume groups
sudo vgdisplay

# List logical volumes
sudo lvdisplay

# Extend logical volume
sudo lvextend -L +5G /dev/vg_data/lv_data

# Resize filesystem
sudo resize2fs /dev/vg_data/lv_data
```

</TabItem>
</Tabs>

---

**Note**: Always backup important data before making changes to disk partitions and filesystems. Test commands in a safe environment before applying them to production servers. 