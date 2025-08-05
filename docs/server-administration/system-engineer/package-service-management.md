---
title: Package & Service Management
description: Comprehensive package and service management using bash commands for Debian/Ubuntu and CentOS with step-by-step instructions.
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Package & Service Management

Comprehensive package and service management using bash commands for Debian/Ubuntu and CentOS with step-by-step instructions.

---

## Package Management

### **1. Update Package Lists**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Update package lists
sudo apt update

# Check for available updates
apt list --upgradable

# Show package information
apt show package_name
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Update package lists (CentOS 7)
sudo yum update

# Update package lists (CentOS 8+)
sudo dnf update

# Check for available updates
yum check-update
dnf check-update

# Show package information
yum info package_name
dnf info package_name
```

</TabItem>
</Tabs>

### **2. Install and Remove Packages**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install a package
sudo apt install package_name

# Install multiple packages
sudo apt install package1 package2 package3

# Remove a package (keep config files)
sudo apt remove package_name

# Remove a package and config files
sudo apt purge package_name

# Remove unused dependencies
sudo apt autoremove

# Clean package cache
sudo apt clean
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install a package (CentOS 7)
sudo yum install package_name

# Install a package (CentOS 8+)
sudo dnf install package_name

# Install multiple packages
sudo yum install package1 package2 package3
sudo dnf install package1 package2 package3

# Remove a package
sudo yum remove package_name
sudo dnf remove package_name

# Clean package cache
sudo yum clean all
sudo dnf clean all
```

</TabItem>
</Tabs>

### **3. Search for Packages**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Search for packages
apt search keyword

# Search for installed packages
apt list --installed | grep keyword

# Show package contents
dpkg -L package_name

# Check if package is installed
dpkg -l | grep package_name
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Search for packages (CentOS 7)
yum search keyword

# Search for packages (CentOS 8+)
dnf search keyword

# List installed packages
yum list installed | grep keyword
dnf list installed | grep keyword

# Show package contents
rpm -ql package_name

# Check if package is installed
rpm -q package_name
```

</TabItem>
</Tabs>

---

## Service Management

### **1. Check Service Status**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check service status
sudo systemctl status service_name

# Check if service is running
sudo systemctl is-active service_name

# Check if service is enabled
sudo systemctl is-enabled service_name

# List all services
sudo systemctl list-units --type=service

# List running services
sudo systemctl list-units --type=service --state=running
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check service status
sudo systemctl status service_name

# Check if service is running
sudo systemctl is-active service_name

# Check if service is enabled
sudo systemctl is-enabled service_name

# List all services
sudo systemctl list-units --type=service

# List running services
sudo systemctl list-units --type=service --state=running
```

</TabItem>
</Tabs>

### **2. Start, Stop, and Restart Services**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Start a service
sudo systemctl start service_name

# Stop a service
sudo systemctl stop service_name

# Restart a service
sudo systemctl restart service_name

# Reload service configuration
sudo systemctl reload service_name

# Enable service to start at boot
sudo systemctl enable service_name

# Disable service from starting at boot
sudo systemctl disable service_name
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Start a service
sudo systemctl start service_name

# Stop a service
sudo systemctl stop service_name

# Restart a service
sudo systemctl restart service_name

# Reload service configuration
sudo systemctl reload service_name

# Enable service to start at boot
sudo systemctl enable service_name

# Disable service from starting at boot
sudo systemctl disable service_name
```

</TabItem>
</Tabs>

### **3. Service Logs and Troubleshooting**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# View service logs
sudo journalctl -u service_name

# View recent logs
sudo journalctl -u service_name -f

# View logs since boot
sudo journalctl -u service_name -b

# View logs for last hour
sudo journalctl -u service_name --since "1 hour ago"

# Check service dependencies
sudo systemctl list-dependencies service_name
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# View service logs
sudo journalctl -u service_name

# View recent logs
sudo journalctl -u service_name -f

# View logs since boot
sudo journalctl -u service_name -b

# View logs for last hour
sudo journalctl -u service_name --since "1 hour ago"

# Check service dependencies
sudo systemctl list-dependencies service_name
```

</TabItem>
</Tabs>

---

## Automatic Updates

### **1. Configure Automatic Updates**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install unattended-upgrades
sudo apt install unattended-upgrades

# Configure automatic updates
sudo dpkg-reconfigure unattended-upgrades

# Edit configuration
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades

# Enable automatic updates
sudo systemctl enable unattended-upgrades
sudo systemctl start unattended-upgrades

# Check status
sudo systemctl status unattended-upgrades
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install dnf-automatic (CentOS 8+)
sudo dnf install dnf-automatic

# Configure automatic updates
sudo nano /etc/dnf/automatic.conf

# Enable automatic updates
sudo systemctl enable dnf-automatic.timer
sudo systemctl start dnf-automatic.timer

# Check status
sudo systemctl status dnf-automatic.timer

# For CentOS 7, use yum-cron
sudo yum install yum-cron
sudo systemctl enable yum-cron
sudo systemctl start yum-cron
```

</TabItem>
</Tabs>

### **2. Manual Update Procedures**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Update package lists
sudo apt update

# Upgrade all packages
sudo apt upgrade

# Upgrade distribution
sudo apt dist-upgrade

# Check for security updates
sudo apt list --upgradable | grep security

# Install security updates only
sudo apt upgrade -s
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Update package lists (CentOS 7)
sudo yum update

# Update package lists (CentOS 8+)
sudo dnf update

# Check for security updates
sudo yum update --security
sudo dnf update --security

# Install security updates only
sudo yum update --security
sudo dnf update --security
```

</TabItem>
</Tabs>

---

## Remove Unused Packages and Services

### **1. Find and Remove Unused Packages**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Find unused packages
sudo apt autoremove --dry-run

# Remove unused packages
sudo apt autoremove

# Find orphaned packages
sudo deborphan

# Remove orphaned packages
sudo apt purge $(deborphan)

# Clean package cache
sudo apt clean
sudo apt autoclean
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Find unused packages (CentOS 7)
sudo package-cleanup --leaves

# Remove unused packages (CentOS 7)
sudo yum autoremove

# Find unused packages (CentOS 8+)
sudo dnf autoremove --dry-run

# Remove unused packages (CentOS 8+)
sudo dnf autoremove

# Clean package cache
sudo yum clean all
sudo dnf clean all
```

</TabItem>
</Tabs>

### **2. Disable Unused Services**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# List all services
sudo systemctl list-units --type=service --all

# List enabled services
sudo systemctl list-units --type=service --state=enabled

# Disable unused service
sudo systemctl disable service_name

# Stop unused service
sudo systemctl stop service_name

# Mask service (prevent enabling)
sudo systemctl mask service_name

# Unmask service
sudo systemctl unmask service_name
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# List all services
sudo systemctl list-units --type=service --all

# List enabled services
sudo systemctl list-units --type=service --state=enabled

# Disable unused service
sudo systemctl disable service_name

# Stop unused service
sudo systemctl stop service_name

# Mask service (prevent enabling)
sudo systemctl mask service_name

# Unmask service
sudo systemctl unmask service_name
```

</TabItem>
</Tabs>

---

## Package Repository Management

### **1. Add and Remove Repositories**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Add repository
sudo add-apt-repository ppa:repository-name

# Remove repository
sudo add-apt-repository --remove ppa:repository-name

# Update package lists after adding repository
sudo apt update

# List enabled repositories
grep -r --include="*.list" "^deb" /etc/apt/sources.list.d/

# Backup current sources
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Add EPEL repository (CentOS 7)
sudo yum install epel-release

# Add EPEL repository (CentOS 8+)
sudo dnf install epel-release

# Add repository from URL
sudo yum-config-manager --add-repo repository-url
sudo dnf config-manager --add-repo repository-url

# Enable/disable repositories
sudo yum-config-manager --enable repository-name
sudo dnf config-manager --enable repository-name

# List enabled repositories
sudo yum repolist
sudo dnf repolist
```

</TabItem>
</Tabs>

### **2. GPG Key Management**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Import GPG key
sudo apt-key add key-file.asc

# List GPG keys
apt-key list

# Remove GPG key
sudo apt-key del key-id

# Update GPG keys
sudo apt-key update
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Import GPG key (CentOS 7)
sudo rpm --import key-file.asc

# Import GPG key (CentOS 8+)
sudo rpm --import key-file.asc

# List GPG keys
rpm -qa gpg-pubkey*

# Remove GPG key
sudo rpm -e gpg-pubkey-key-id
```

</TabItem>
</Tabs>

---

## Package Verification and Security

### **1. Verify Package Integrity**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Verify package signature
dpkg-sig --verify package.deb

# Check package contents
dpkg -c package.deb

# Verify installed package
dpkg -V package_name

# Check package dependencies
apt-cache depends package_name
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Verify package signature
rpm --checksig package.rpm

# Check package contents
rpm -qlp package.rpm

# Verify installed package
rpm -V package_name

# Check package dependencies
yum deplist package_name
dnf deplist package_name
```

</TabItem>
</Tabs>

### **2. Security Updates**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check for security updates
apt list --upgradable | grep security

# Install security updates only
sudo apt upgrade -s

# Check security advisories
apt-get changelog package_name

# Update security packages
sudo unattended-upgrade --dry-run
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check for security updates (CentOS 7)
yum updateinfo list security

# Check for security updates (CentOS 8+)
dnf updateinfo list security

# Install security updates only
sudo yum update --security
sudo dnf update --security

# Check security advisories
yum updateinfo info package_name
dnf updateinfo info package_name
```

</TabItem>
</Tabs>

---

**Note**: Always test package installations and service changes in a safe environment before applying them to production servers. Keep backups of important configuration files before making changes. 