---
title: Automation & Configuration Management
description: Comprehensive automation and configuration management using bash commands for Ansible, Puppet, Chef, SaltStack, scripting, and Git version control for Debian/Ubuntu and CentOS.
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Automation & Configuration Management

Comprehensive automation and configuration management using bash commands for Ansible, Puppet, Chef, SaltStack, scripting, and Git version control for Debian/Ubuntu and CentOS.

---

## Ansible Automation

### **1. Use Ansible for automation**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install Ansible
sudo apt update
sudo apt install ansible

# Create Ansible directory structure
mkdir -p ~/ansible/{inventory,roles,playbooks}
cd ~/ansible

# Create inventory file
cat > inventory/hosts << 'EOF'
[webservers]
web1 ansible_host=192.168.1.10
web2 ansible_host=192.168.1.11

[dbservers]
db1 ansible_host=192.168.1.20

[all:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=~/.ssh/id_rsa
EOF

# Create simple playbook
cat > playbooks/webserver.yml << 'EOF'
---
- name: Configure web servers
  hosts: webservers
  become: yes
  tasks:
    - name: Update package cache
      apt:
        update_cache: yes

    - name: Install nginx
      apt:
        name: nginx
        state: present

    - name: Start and enable nginx
      service:
        name: nginx
        state: started
        enabled: yes
EOF

# Run playbook
ansible-playbook -i inventory/hosts playbooks/webserver.yml
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install Ansible
sudo yum install ansible

# Create Ansible directory structure
mkdir -p ~/ansible/{inventory,roles,playbooks}
cd ~/ansible

# Create inventory file
cat > inventory/hosts << 'EOF'
[webservers]
web1 ansible_host=192.168.1.10
web2 ansible_host=192.168.1.11

[dbservers]
db1 ansible_host=192.168.1.20

[all:vars]
ansible_user=centos
ansible_ssh_private_key_file=~/.ssh/id_rsa
EOF

# Create simple playbook
cat > playbooks/webserver.yml << 'EOF'
---
- name: Configure web servers
  hosts: webservers
  become: yes
  tasks:
    - name: Install nginx
      yum:
        name: nginx
        state: present

    - name: Start and enable nginx
      service:
        name: nginx
        state: started
        enabled: yes
EOF

# Run playbook
ansible-playbook -i inventory/hosts playbooks/webserver.yml
```

</TabItem>
</Tabs>

---

## Bash Scripting for Common Tasks

### **1. Write Bash scripts for common tasks**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create system maintenance script
sudo nano /usr/local/bin/system-maintenance.sh

#!/bin/bash
# System maintenance script

LOG="/var/log/maintenance.log"
DATE=$(date +%Y%m%d)

echo "=== System Maintenance - $DATE ===" >> "$LOG"

# Update package lists
echo "Updating package lists..." >> "$LOG"
apt update >> "$LOG" 2>&1

# Upgrade packages
echo "Upgrading packages..." >> "$LOG"
apt upgrade -y >> "$LOG" 2>&1

# Clean package cache
echo "Cleaning package cache..." >> "$LOG"
apt autoremove -y >> "$LOG" 2>&1
apt autoclean >> "$LOG" 2>&1

# Check disk space
echo "Disk space usage:" >> "$LOG"
df -h >> "$LOG"

# Check system load
echo "System load:" >> "$LOG"
uptime >> "$LOG"

# Check failed services
echo "Failed services:" >> "$LOG"
systemctl --failed >> "$LOG"

echo "Maintenance completed: $(date)" >> "$LOG"

# Make script executable
sudo chmod +x /usr/local/bin/system-maintenance.sh

# Add to crontab (weekly)
echo "0 2 * * 0 /usr/local/bin/system-maintenance.sh" | sudo crontab -
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create system maintenance script
sudo nano /usr/local/bin/system-maintenance.sh

#!/bin/bash
# System maintenance script

LOG="/var/log/maintenance.log"
DATE=$(date +%Y%m%d)

echo "=== System Maintenance - $DATE ===" >> "$LOG"

# Update package lists
echo "Updating package lists..." >> "$LOG"
yum update -y >> "$LOG" 2>&1

# Clean package cache
echo "Cleaning package cache..." >> "$LOG"
yum autoremove -y >> "$LOG" 2>&1
yum clean all >> "$LOG" 2>&1

# Check disk space
echo "Disk space usage:" >> "$LOG"
df -h >> "$LOG"

# Check system load
echo "System load:" >> "$LOG"
uptime >> "$LOG"

# Check failed services
echo "Failed services:" >> "$LOG"
systemctl --failed >> "$LOG"

echo "Maintenance completed: $(date)" >> "$LOG"

# Make script executable
sudo chmod +x /usr/local/bin/system-maintenance.sh

# Add to crontab (weekly)
echo "0 2 * * 0 /usr/local/bin/system-maintenance.sh" | sudo crontab -
```

</TabItem>
</Tabs>

---

## Git Version Control

### **1. Keep configuration files under version control (e.g., Git)**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install Git
sudo apt install git

# Configure Git
git config --global user.name "System Administrator"
git config --global user.email "admin@example.com"

# Create configuration repository
mkdir -p /etc/config-repo
cd /etc/config-repo

# Initialize Git repository
git init

# Create .gitignore
cat > .gitignore << 'EOF'
*.log
*.tmp
*.bak
*.swp
*.pyc
__pycache__/
.DS_Store
EOF

# Add configuration files
sudo cp /etc/nginx/nginx.conf /etc/config-repo/
sudo cp /etc/ssh/sshd_config /etc/config-repo/
sudo cp /etc/fstab /etc/config-repo/

# Add files to Git
git add .
git commit -m "Initial configuration backup"

# Create backup script
sudo nano /usr/local/bin/config-backup.sh

#!/bin/bash
# Configuration backup script

CONFIG_DIR="/etc/config-repo"
LOG="/var/log/config-backup.log"

cd "$CONFIG_DIR"

# Copy current configurations
sudo cp /etc/nginx/nginx.conf .
sudo cp /etc/ssh/sshd_config .
sudo cp /etc/fstab .

# Add and commit changes
git add .
git commit -m "Configuration update $(date)" >> "$LOG" 2>&1

echo "Configuration backup completed: $(date)" >> "$LOG"

# Make script executable
sudo chmod +x /usr/local/bin/config-backup.sh

# Add to crontab (daily)
echo "0 1 * * * /usr/local/bin/config-backup.sh" | sudo crontab -
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install Git
sudo yum install git

# Configure Git
git config --global user.name "System Administrator"
git config --global user.email "admin@example.com"

# Create configuration repository
mkdir -p /etc/config-repo
cd /etc/config-repo

# Initialize Git repository
git init

# Create .gitignore
cat > .gitignore << 'EOF'
*.log
*.tmp
*.bak
*.swp
*.pyc
__pycache__/
.DS_Store
EOF

# Add configuration files
sudo cp /etc/nginx/nginx.conf /etc/config-repo/
sudo cp /etc/ssh/sshd_config /etc/config-repo/
sudo cp /etc/fstab /etc/config-repo/

# Add files to Git
git add .
git commit -m "Initial configuration backup"

# Create backup script
sudo nano /usr/local/bin/config-backup.sh

#!/bin/bash
# Configuration backup script

CONFIG_DIR="/etc/config-repo"
LOG="/var/log/config-backup.log"

cd "$CONFIG_DIR"

# Copy current configurations
sudo cp /etc/nginx/nginx.conf .
sudo cp /etc/ssh/sshd_config .
sudo cp /etc/fstab .

# Add and commit changes
git add .
git commit -m "Configuration update $(date)" >> "$LOG" 2>&1

echo "Configuration backup completed: $(date)" >> "$LOG"

# Make script executable
sudo chmod +x /usr/local/bin/config-backup.sh

# Add to crontab (daily)
echo "0 1 * * * /usr/local/bin/config-backup.sh" | sudo crontab -
```

</TabItem>
</Tabs>

---

**Note**: Always test automation scripts and configuration management tools in a safe environment before implementing in production. Use version control for all configuration files and maintain proper documentation for automation workflows. 