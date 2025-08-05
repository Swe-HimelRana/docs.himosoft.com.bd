---
title: Backup & Recovery
description: Comprehensive backup and recovery using bash commands for automated backups, cloud storage, restore testing, and filesystem snapshots for Debian/Ubuntu and CentOS.
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Backup & Recovery

Comprehensive backup and recovery using bash commands for automated backups, cloud storage, restore testing, and filesystem snapshots for Debian/Ubuntu and CentOS.

---

## Automated Backups with rsync

### **1. Set up automated backups with rsync**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install rsync
sudo apt install rsync

# Create backup directory
sudo mkdir -p /backup
sudo chown root:root /backup
sudo chmod 700 /backup

# Create rsync backup script
sudo nano /usr/local/bin/backup-rsync.sh

#!/bin/bash
# Rsync backup script

SOURCE="/home /etc /var/www"
DEST="/backup/$(date +%Y%m%d)"
LOG="/var/log/backup-rsync.log"

# Create backup directory
mkdir -p "$DEST"

# Run rsync backup
rsync -av --delete --exclude='*.tmp' --exclude='*.log' \
    $SOURCE "$DEST" >> "$LOG" 2>&1

# Remove old backups (keep 7 days)
find /backup -type d -mtime +7 -exec rm -rf {} \;

echo "Backup completed: $(date)" >> "$LOG"

# Make script executable
sudo chmod +x /usr/local/bin/backup-rsync.sh

# Add to crontab (daily at 2 AM)
echo "0 2 * * * /usr/local/bin/backup-rsync.sh" | sudo crontab -
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install rsync
sudo yum install rsync

# Create backup directory
sudo mkdir -p /backup
sudo chown root:root /backup
sudo chmod 700 /backup

# Create rsync backup script
sudo nano /usr/local/bin/backup-rsync.sh

#!/bin/bash
# Rsync backup script

SOURCE="/home /etc /var/www"
DEST="/backup/$(date +%Y%m%d)"
LOG="/var/log/backup-rsync.log"

# Create backup directory
mkdir -p "$DEST"

# Run rsync backup
rsync -av --delete --exclude='*.tmp' --exclude='*.log' \
    $SOURCE "$DEST" >> "$LOG" 2>&1

# Remove old backups (keep 7 days)
find /backup -type d -mtime +7 -exec rm -rf {} \;

echo "Backup completed: $(date)" >> "$LOG"

# Make script executable
sudo chmod +x /usr/local/bin/backup-rsync.sh

# Add to crontab (daily at 2 AM)
echo "0 2 * * * /usr/local/bin/backup-rsync.sh" | sudo crontab -
```

</TabItem>
</Tabs>

---

## Cloud Storage Backups

### **1. Store backups offsite or in the cloud**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install cloud tools
sudo apt install rclone awscli

# Configure rclone for cloud storage
rclone config

# Create cloud backup script
sudo nano /usr/local/bin/backup-cloud.sh

#!/bin/bash
# Cloud backup script

LOCAL_BACKUP="/backup"
CLOUD_REMOTE="backup-drive"
LOG="/var/log/backup-cloud.log"

# Sync to cloud storage
rclone sync "$LOCAL_BACKUP" "$CLOUD_REMOTE:/backups/$(hostname)" \
    --progress --log-file="$LOG"

# Verify cloud backup
rclone check "$LOCAL_BACKUP" "$CLOUD_REMOTE:/backups/$(hostname)"

echo "Cloud backup completed: $(date)" >> "$LOG"

# Make script executable
sudo chmod +x /usr/local/bin/backup-cloud.sh

# Add to crontab (weekly)
echo "0 3 * * 0 /usr/local/bin/backup-cloud.sh" | sudo crontab -
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install cloud tools
sudo yum install rclone awscli

# Configure rclone for cloud storage
rclone config

# Create cloud backup script
sudo nano /usr/local/bin/backup-cloud.sh

#!/bin/bash
# Cloud backup script

LOCAL_BACKUP="/backup"
CLOUD_REMOTE="backup-drive"
LOG="/var/log/backup-cloud.log"

# Sync to cloud storage
rclone sync "$LOCAL_BACKUP" "$CLOUD_REMOTE:/backups/$(hostname)" \
    --progress --log-file="$LOG"

# Verify cloud backup
rclone check "$LOCAL_BACKUP" "$CLOUD_REMOTE:/backups/$(hostname)"

echo "Cloud backup completed: $(date)" >> "$LOG"

# Make script executable
sudo chmod +x /usr/local/bin/backup-cloud.sh

# Add to crontab (weekly)
echo "0 3 * * 0 /usr/local/bin/backup-cloud.sh" | sudo crontab -
```

</TabItem>
</Tabs>

---

## Restore Testing

### **1. Test backup restore procedures regularly**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create restore test script
sudo nano /usr/local/bin/test-restore.sh

#!/bin/bash
# Restore testing script

TEST_DIR="/tmp/restore-test"
BACKUP_DIR="/backup"

# Create test directory
mkdir -p "$TEST_DIR"

# Test rsync restore
echo "Testing rsync restore..."
rsync -av "$BACKUP_DIR/$(ls -t $BACKUP_DIR | head -1)/" "$TEST_DIR/"

# Verify restored files
echo "Verifying restored files..."
find "$TEST_DIR" -type f | head -10

# Cleanup test
rm -rf "$TEST_DIR"

echo "Restore test completed: $(date)"

# Make script executable
sudo chmod +x /usr/local/bin/test-restore.sh

# Run restore test
sudo /usr/local/bin/test-restore.sh
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create restore test script
sudo nano /usr/local/bin/test-restore.sh

#!/bin/bash
# Restore testing script

TEST_DIR="/tmp/restore-test"
BACKUP_DIR="/backup"

# Create test directory
mkdir -p "$TEST_DIR"

# Test rsync restore
echo "Testing rsync restore..."
rsync -av "$BACKUP_DIR/$(ls -t $BACKUP_DIR | head -1)/" "$TEST_DIR/"

# Verify restored files
echo "Verifying restored files..."
find "$TEST_DIR" -type f | head -10

# Cleanup test
rm -rf "$TEST_DIR"

echo "Restore test completed: $(date)"

# Make script executable
sudo chmod +x /usr/local/bin/test-restore.sh

# Run restore test
sudo /usr/local/bin/test-restore.sh
```

</TabItem>
</Tabs>

---

## Filesystem Snapshots

### **1. Use filesystem snapshots (LVM, btrfs, zfs) if available**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check available filesystems
df -T
lsblk -f

# LVM Snapshot (if using LVM)
# Check LVM setup
sudo lvs
sudo vgs

# Create LVM snapshot
sudo lvcreate -L 10G -s -n root_snap /dev/vg0/root

# Mount snapshot
sudo mkdir -p /mnt/snapshot
sudo mount -o ro /dev/vg0/root_snap /mnt/snapshot

# Verify snapshot
ls -la /mnt/snapshot/

# Remove snapshot
sudo umount /mnt/snapshot
sudo lvremove /dev/vg0/root_snap

# Btrfs snapshot (if using btrfs)
# Check btrfs subvolumes
sudo btrfs subvolume list /

# Create btrfs snapshot
sudo btrfs subvolume snapshot / /backup/snapshot-$(date +%Y%m%d)

# List snapshots
sudo btrfs subvolume list /

# Remove old snapshots
sudo btrfs subvolume delete /backup/snapshot-$(date -d '7 days ago' +%Y%m%d)
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check available filesystems
df -T
lsblk -f

# LVM Snapshot (if using LVM)
# Check LVM setup
sudo lvs
sudo vgs

# Create LVM snapshot
sudo lvcreate -L 10G -s -n root_snap /dev/vg0/root

# Mount snapshot
sudo mkdir -p /mnt/snapshot
sudo mount -o ro /dev/vg0/root_snap /mnt/snapshot

# Verify snapshot
ls -la /mnt/snapshot/

# Remove snapshot
sudo umount /mnt/snapshot
sudo lvremove /dev/vg0/root_snap

# Btrfs snapshot (if using btrfs)
# Check btrfs subvolumes
sudo btrfs subvolume list /

# Create btrfs snapshot
sudo btrfs subvolume snapshot / /backup/snapshot-$(date +%Y%m%d)

# List snapshots
sudo btrfs subvolume list /

# Remove old snapshots
sudo btrfs subvolume delete /backup/snapshot-$(date -d '7 days ago' +%Y%m%d)
```

</TabItem>
</Tabs>

---

## Backup Monitoring and Verification

### **1. Monitor backup status and verify integrity**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create backup monitoring script
sudo nano /usr/local/bin/backup-monitor.sh

#!/bin/bash
# Backup monitoring script

BACKUP_DIR="/backup"
LOG="/var/log/backup-status.log"

echo "=== Backup Status Report ===" > "$LOG"
echo "Date: $(date)" >> "$LOG"

# Check backup directory size
echo "Backup directory size:" >> "$LOG"
du -sh "$BACKUP_DIR" >> "$LOG"

# Check recent backups
echo "Recent backups:" >> "$LOG"
find "$BACKUP_DIR" -type d -mtime -1 >> "$LOG"

# Check backup integrity
echo "Backup integrity check:" >> "$LOG"
find "$BACKUP_DIR" -name "*.md5" -exec md5sum -c {} \; >> "$LOG" 2>&1

# Send report
mail -s "Backup Status Report" admin@example.com < "$LOG"

# Make script executable
sudo chmod +x /usr/local/bin/backup-monitor.sh

# Add to crontab (daily)
echo "0 6 * * * /usr/local/bin/backup-monitor.sh" | sudo crontab -
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create backup monitoring script
sudo nano /usr/local/bin/backup-monitor.sh

#!/bin/bash
# Backup monitoring script

BACKUP_DIR="/backup"
LOG="/var/log/backup-status.log"

echo "=== Backup Status Report ===" > "$LOG"
echo "Date: $(date)" >> "$LOG"

# Check backup directory size
echo "Backup directory size:" >> "$LOG"
du -sh "$BACKUP_DIR" >> "$LOG"

# Check recent backups
echo "Recent backups:" >> "$LOG"
find "$BACKUP_DIR" -type d -mtime -1 >> "$LOG"

# Check backup integrity
echo "Backup integrity check:" >> "$LOG"
find "$BACKUP_DIR" -name "*.md5" -exec md5sum -c {} \; >> "$LOG" 2>&1

# Send report
mail -s "Backup Status Report" admin@example.com < "$LOG"

# Make script executable
sudo chmod +x /usr/local/bin/backup-monitor.sh

# Add to crontab (daily)
echo "0 6 * * * /usr/local/bin/backup-monitor.sh" | sudo crontab -
```

</TabItem>
</Tabs>

---

**Note**: Always test backup and restore procedures in a safe environment before implementing in production. Regularly verify backup integrity and maintain multiple backup copies for critical data. 