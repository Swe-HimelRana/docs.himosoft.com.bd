---
title: Compliance and Auditing
description: Comprehensive compliance and auditing using bash commands for auditd configuration, CIS benchmarks, and system change logging for Debian/Ubuntu and CentOS.
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Compliance and Auditing

Comprehensive compliance and auditing using bash commands for auditd configuration, CIS benchmarks, and system change logging for Debian/Ubuntu and CentOS.

---

## Auditd Configuration

### **1. Enable and configure auditd for auditing system events**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install auditd
sudo apt install auditd audispd-plugins

# Start and enable auditd
sudo systemctl start auditd
sudo systemctl enable auditd

# Check auditd status
sudo systemctl status auditd

# Configure auditd
sudo nano /etc/audit/auditd.conf

# Example configuration:
# log_file = /var/log/audit/audit.log
# log_format = RAW
# log_group = root
# priority_boost = 4
# flush = INCREMENTAL
# freq = 20
# num_logs = 5
# dispatcher = /sbin/audispd
# name_format = NONE
# max_log_file = 6
# max_log_file_action = ROTATE
# space_left = 75
# space_left_action = SYSLOG
# action_mail_acct = root
# admin_space_left = 50
# admin_space_left_action = SUSPEND
# disk_full_action = SUSPEND
# disk_error_action = SUSPEND

# Configure audit rules
sudo nano /etc/audit/rules.d/audit.rules

# Example rules:
# -w /etc/passwd -p wa -k identity
# -w /etc/group -p wa -k identity
# -w /etc/shadow -p wa -k identity
# -w /etc/gshadow -p wa -k identity
# -w /etc/ssh/sshd_config -p wa -k sshd
# -w /etc/sudoers -p wa -k sudoers
# -w /var/log/auth.log -p wa -k authlog
# -w /var/log/syslog -p wa -k syslog

# Restart auditd
sudo systemctl restart auditd

# Check audit rules
sudo auditctl -l

# Test audit logging
sudo auditctl -w /tmp/test -p wa -k test
echo "test" > /tmp/test
sudo ausearch -k test
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install auditd
sudo yum install audit

# Start and enable auditd
sudo systemctl start auditd
sudo systemctl enable auditd

# Check auditd status
sudo systemctl status auditd

# Configure auditd
sudo nano /etc/audit/auditd.conf

# Example configuration:
# log_file = /var/log/audit/audit.log
# log_format = RAW
# log_group = root
# priority_boost = 4
# flush = INCREMENTAL
# freq = 20
# num_logs = 5
# dispatcher = /sbin/audispd
# name_format = NONE
# max_log_file = 6
# max_log_file_action = ROTATE
# space_left = 75
# space_left_action = SYSLOG
# action_mail_acct = root
# admin_space_left = 50
# admin_space_left_action = SUSPEND
# disk_full_action = SUSPEND
# disk_error_action = SUSPEND

# Configure audit rules
sudo nano /etc/audit/rules.d/audit.rules

# Example rules:
# -w /etc/passwd -p wa -k identity
# -w /etc/group -p wa -k identity
# -w /etc/shadow -p wa -k identity
# -w /etc/gshadow -p wa -k identity
# -w /etc/ssh/sshd_config -p wa -k sshd
# -w /etc/sudoers -p wa -k sudoers
# -w /var/log/secure -p wa -k authlog
# -w /var/log/messages -p wa -k syslog

# Restart auditd
sudo systemctl restart auditd

# Check audit rules
sudo auditctl -l

# Test audit logging
sudo auditctl -w /tmp/test -p wa -k test
echo "test" > /tmp/test
sudo ausearch -k test
```

</TabItem>
</Tabs>

---

## CIS Benchmarks Implementation

### **1. Follow CIS Benchmarks or similar hardening guidelines**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install CIS benchmark tools
sudo apt install lynis

# Run security audit
sudo lynis audit system

# Install additional security tools
sudo apt install rkhunter chkrootkit

# Configure rkhunter
sudo rkhunter --update
sudo rkhunter --propupd

# Run rkhunter scan
sudo rkhunter --check

# Install and configure fail2ban
sudo apt install fail2ban

# Configure fail2ban
sudo nano /etc/fail2ban/jail.local

# Example configuration:
# [sshd]
# enabled = true
# port = ssh
# filter = sshd
# logpath = /var/log/auth.log
# maxretry = 3
# bantime = 3600

# Restart fail2ban
sudo systemctl restart fail2ban

# Check fail2ban status
sudo fail2ban-client status

# Configure password policies
sudo nano /etc/login.defs

# Set password policies:
# PASS_MAX_DAYS 90
# PASS_MIN_DAYS 7
# PASS_MIN_LEN 12
# PASS_WARN_AGE 7

# Configure PAM password complexity
sudo nano /etc/pam.d/common-password

# Add password complexity rules:
# password requisite pam_pwquality.so retry=3 minlen=12 difok=3 ucredit=-1 lcredit=-1 dcredit=-1 ocredit=-1
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install CIS benchmark tools
sudo yum install lynis

# Run security audit
sudo lynis audit system

# Install additional security tools
sudo yum install rkhunter

# Configure rkhunter
sudo rkhunter --update
sudo rkhunter --propupd

# Run rkhunter scan
sudo rkhunter --check

# Install and configure fail2ban
sudo yum install fail2ban

# Configure fail2ban
sudo nano /etc/fail2ban/jail.local

# Example configuration:
# [sshd]
# enabled = true
# port = ssh
# filter = sshd
# logpath = /var/log/secure
# maxretry = 3
# bantime = 3600

# Restart fail2ban
sudo systemctl restart fail2ban

# Check fail2ban status
sudo fail2ban-client status

# Configure password policies
sudo nano /etc/login.defs

# Set password policies:
# PASS_MAX_DAYS 90
# PASS_MIN_DAYS 7
# PASS_MIN_LEN 12
# PASS_WARN_AGE 7

# Configure PAM password complexity
sudo nano /etc/pam.d/system-auth

# Add password complexity rules:
# password requisite pam_pwquality.so retry=3 minlen=12 difok=3 ucredit=-1 lcredit=-1 dcredit=-1 ocredit=-1
```

</TabItem>
</Tabs>

---

## System Change Logging

### **1. Document all changes and maintain system change logs**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create system change log directory
sudo mkdir -p /var/log/system-changes
sudo chown root:root /var/log/system-changes
sudo chmod 700 /var/log/system-changes

# Create change logging script
sudo nano /usr/local/bin/log-change.sh

#!/bin/bash
# System change logging script

CHANGE_LOG="/var/log/system-changes/$(date +%Y%m).log"
USER=$(whoami)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] User: $USER - $*" >> "$CHANGE_LOG"

# Make script executable
sudo chmod +x /usr/local/bin/log-change.sh

# Create alias for easy logging
echo 'alias logchange="/usr/local/bin/log-change.sh"' >> ~/.bashrc

# Create configuration change tracking
sudo nano /usr/local/bin/track-config.sh

#!/bin/bash
# Configuration change tracking

CONFIG_DIR="/etc"
BACKUP_DIR="/var/backups/config"
LOG="/var/log/system-changes/config-changes.log"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup configuration files
for file in /etc/ssh/sshd_config /etc/nginx/nginx.conf /etc/fail2ban/jail.local; do
    if [ -f "$file" ]; then
        cp "$file" "$BACKUP_DIR/$(basename $file).$(date +%Y%m%d-%H%M%S)"
        echo "$(date): Backed up $file" >> "$LOG"
    fi
done

# Make script executable
sudo chmod +x /usr/local/bin/track-config.sh

# Add to crontab (daily)
echo "0 2 * * * /usr/local/bin/track-config.sh" | sudo crontab -
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create system change log directory
sudo mkdir -p /var/log/system-changes
sudo chown root:root /var/log/system-changes
sudo chmod 700 /var/log/system-changes

# Create change logging script
sudo nano /usr/local/bin/log-change.sh

#!/bin/bash
# System change logging script

CHANGE_LOG="/var/log/system-changes/$(date +%Y%m).log"
USER=$(whoami)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] User: $USER - $*" >> "$CHANGE_LOG"

# Make script executable
sudo chmod +x /usr/local/bin/log-change.sh

# Create alias for easy logging
echo 'alias logchange="/usr/local/bin/log-change.sh"' >> ~/.bashrc

# Create configuration change tracking
sudo nano /usr/local/bin/track-config.sh

#!/bin/bash
# Configuration change tracking

CONFIG_DIR="/etc"
BACKUP_DIR="/var/backups/config"
LOG="/var/log/system-changes/config-changes.log"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup configuration files
for file in /etc/ssh/sshd_config /etc/nginx/nginx.conf /etc/fail2ban/jail.local; do
    if [ -f "$file" ]; then
        cp "$file" "$BACKUP_DIR/$(basename $file).$(date +%Y%m%d-%H%M%S)"
        echo "$(date): Backed up $file" >> "$LOG"
    fi
done

# Make script executable
sudo chmod +x /usr/local/bin/track-config.sh

# Add to crontab (daily)
echo "0 2 * * * /usr/local/bin/track-config.sh" | sudo crontab -
```

</TabItem>
</Tabs>

---

## Security Monitoring and Reporting

### **1. Monitor security events and generate reports**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create security monitoring script
sudo nano /usr/local/bin/security-monitor.sh

#!/bin/bash
# Security monitoring script

LOG="/var/log/security-report.log"
REPORT="/var/log/security-report-$(date +%Y%m%d).txt"

echo "=== Security Report - $(date) ===" > "$REPORT"

# Check failed login attempts
echo "Failed login attempts (last 24h):" >> "$REPORT"
grep "Failed password" /var/log/auth.log | grep "$(date '+%b %d')" | wc -l >> "$REPORT"

# Check SSH connections
echo "SSH connections (last 24h):" >> "$REPORT"
grep "sshd" /var/log/auth.log | grep "Accepted" | grep "$(date '+%b %d')" | wc -l >> "$REPORT"

# Check audit events
echo "Audit events (last 24h):" >> "$REPORT"
sudo ausearch -ts today | wc -l >> "$REPORT"

# Check system integrity
echo "System integrity check:" >> "$REPORT"
sudo rkhunter --check --skip-keypress --report-warnings-only >> "$REPORT" 2>&1

# Check fail2ban status
echo "Fail2ban status:" >> "$REPORT"
sudo fail2ban-client status >> "$REPORT"

# Send report
mail -s "Security Report $(date)" admin@example.com < "$REPORT"

# Make script executable
sudo chmod +x /usr/local/bin/security-monitor.sh

# Add to crontab (daily)
echo "0 6 * * * /usr/local/bin/security-monitor.sh" | sudo crontab -
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create security monitoring script
sudo nano /usr/local/bin/security-monitor.sh

#!/bin/bash
# Security monitoring script

LOG="/var/log/security-report.log"
REPORT="/var/log/security-report-$(date +%Y%m%d).txt"

echo "=== Security Report - $(date) ===" > "$REPORT"

# Check failed login attempts
echo "Failed login attempts (last 24h):" >> "$REPORT"
grep "Failed password" /var/log/secure | grep "$(date '+%b %d')" | wc -l >> "$REPORT"

# Check SSH connections
echo "SSH connections (last 24h):" >> "$REPORT"
grep "sshd" /var/log/secure | grep "Accepted" | grep "$(date '+%b %d')" | wc -l >> "$REPORT"

# Check audit events
echo "Audit events (last 24h):" >> "$REPORT"
sudo ausearch -ts today | wc -l >> "$REPORT"

# Check system integrity
echo "System integrity check:" >> "$REPORT"
sudo rkhunter --check --skip-keypress --report-warnings-only >> "$REPORT" 2>&1

# Check fail2ban status
echo "Fail2ban status:" >> "$REPORT"
sudo fail2ban-client status >> "$REPORT"

# Send report
mail -s "Security Report $(date)" admin@example.com < "$REPORT"

# Make script executable
sudo chmod +x /usr/local/bin/security-monitor.sh

# Add to crontab (daily)
echo "0 6 * * * /usr/local/bin/security-monitor.sh" | sudo crontab -
```

</TabItem>
</Tabs>

---

## Compliance Reporting

### **1. Generate compliance reports and documentation**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create compliance reporting script
sudo nano /usr/local/bin/compliance-report.sh

#!/bin/bash
# Compliance reporting script

REPORT_DIR="/var/log/compliance"
REPORT="$REPORT_DIR/compliance-report-$(date +%Y%m%d).txt"

mkdir -p "$REPORT_DIR"

echo "=== Compliance Report - $(date) ===" > "$REPORT"

# System information
echo "System Information:" >> "$REPORT"
uname -a >> "$REPORT"
cat /etc/os-release >> "$REPORT"

# User account audit
echo "User Account Audit:" >> "$REPORT"
cat /etc/passwd | grep -v nologin | grep -v false >> "$REPORT"

# Group membership audit
echo "Group Membership Audit:" >> "$REPORT"
cat /etc/group >> "$REPORT"

# Service status audit
echo "Service Status Audit:" >> "$REPORT"
systemctl list-units --type=service --state=active >> "$REPORT"

# File permission audit
echo "Critical File Permissions:" >> "$REPORT"
ls -la /etc/passwd /etc/shadow /etc/group /etc/gshadow >> "$REPORT"

# Network service audit
echo "Network Services:" >> "$REPORT"
netstat -tuln >> "$REPORT"

# Security tool status
echo "Security Tools Status:" >> "$REPORT"
systemctl status auditd fail2ban >> "$REPORT" 2>&1

# Make script executable
sudo chmod +x /usr/local/bin/compliance-report.sh

# Run compliance report
sudo /usr/local/bin/compliance-report.sh
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create compliance reporting script
sudo nano /usr/local/bin/compliance-report.sh

#!/bin/bash
# Compliance reporting script

REPORT_DIR="/var/log/compliance"
REPORT="$REPORT_DIR/compliance-report-$(date +%Y%m%d).txt"

mkdir -p "$REPORT_DIR"

echo "=== Compliance Report - $(date) ===" > "$REPORT"

# System information
echo "System Information:" >> "$REPORT"
uname -a >> "$REPORT"
cat /etc/os-release >> "$REPORT"

# User account audit
echo "User Account Audit:" >> "$REPORT"
cat /etc/passwd | grep -v nologin | grep -v false >> "$REPORT"

# Group membership audit
echo "Group Membership Audit:" >> "$REPORT"
cat /etc/group >> "$REPORT"

# Service status audit
echo "Service Status Audit:" >> "$REPORT"
systemctl list-units --type=service --state=active >> "$REPORT"

# File permission audit
echo "Critical File Permissions:" >> "$REPORT"
ls -la /etc/passwd /etc/shadow /etc/group /etc/gshadow >> "$REPORT"

# Network service audit
echo "Network Services:" >> "$REPORT"
netstat -tuln >> "$REPORT"

# Security tool status
echo "Security Tools Status:" >> "$REPORT"
systemctl status auditd fail2ban >> "$REPORT" 2>&1

# Make script executable
sudo chmod +x /usr/local/bin/compliance-report.sh

# Run compliance report
sudo /usr/local/bin/compliance-report.sh
```

</TabItem>
</Tabs>

---

## Audit Log Analysis

### **1. Analyze audit logs and security events**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create audit log analysis script
sudo nano /usr/local/bin/audit-analysis.sh

#!/bin/bash
# Audit log analysis script

LOG="/var/log/audit-analysis.log"
REPORT="/var/log/audit-analysis-$(date +%Y%m%d).txt"

echo "=== Audit Log Analysis - $(date) ===" > "$REPORT"

# Analyze failed login attempts
echo "Failed Login Analysis:" >> "$REPORT"
grep "Failed password" /var/log/auth.log | tail -20 >> "$REPORT"

# Analyze SSH connections
echo "SSH Connection Analysis:" >> "$REPORT"
grep "sshd.*Accepted" /var/log/auth.log | tail -10 >> "$REPORT"

# Analyze sudo usage
echo "Sudo Usage Analysis:" >> "$REPORT"
grep "sudo" /var/log/auth.log | tail -10 >> "$REPORT"

# Analyze audit events by key
echo "Audit Events by Key:" >> "$REPORT"
sudo ausearch -k identity | tail -10 >> "$REPORT"
sudo ausearch -k sshd | tail -10 >> "$REPORT"

# Analyze file access events
echo "File Access Events:" >> "$REPORT"
sudo ausearch -f /etc/passwd | tail -10 >> "$REPORT"
sudo ausearch -f /etc/shadow | tail -10 >> "$REPORT"

# Generate summary statistics
echo "Summary Statistics:" >> "$REPORT"
echo "Total audit events today: $(sudo ausearch -ts today | wc -l)" >> "$REPORT"
echo "Failed login attempts today: $(grep 'Failed password' /var/log/auth.log | grep "$(date '+%b %d')" | wc -l)" >> "$REPORT"

# Make script executable
sudo chmod +x /usr/local/bin/audit-analysis.sh

# Run audit analysis
sudo /usr/local/bin/audit-analysis.sh
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create audit log analysis script
sudo nano /usr/local/bin/audit-analysis.sh

#!/bin/bash
# Audit log analysis script

LOG="/var/log/audit-analysis.log"
REPORT="/var/log/audit-analysis-$(date +%Y%m%d).txt"

echo "=== Audit Log Analysis - $(date) ===" > "$REPORT"

# Analyze failed login attempts
echo "Failed Login Analysis:" >> "$REPORT"
grep "Failed password" /var/log/secure | tail -20 >> "$REPORT"

# Analyze SSH connections
echo "SSH Connection Analysis:" >> "$REPORT"
grep "sshd.*Accepted" /var/log/secure | tail -10 >> "$REPORT"

# Analyze sudo usage
echo "Sudo Usage Analysis:" >> "$REPORT"
grep "sudo" /var/log/secure | tail -10 >> "$REPORT"

# Analyze audit events by key
echo "Audit Events by Key:" >> "$REPORT"
sudo ausearch -k identity | tail -10 >> "$REPORT"
sudo ausearch -k sshd | tail -10 >> "$REPORT"

# Analyze file access events
echo "File Access Events:" >> "$REPORT"
sudo ausearch -f /etc/passwd | tail -10 >> "$REPORT"
sudo ausearch -f /etc/shadow | tail -10 >> "$REPORT"

# Generate summary statistics
echo "Summary Statistics:" >> "$REPORT"
echo "Total audit events today: $(sudo ausearch -ts today | wc -l)" >> "$REPORT"
echo "Failed login attempts today: $(grep 'Failed password' /var/log/secure | grep "$(date '+%b %d')" | wc -l)" >> "$REPORT"

# Make script executable
sudo chmod +x /usr/local/bin/audit-analysis.sh

# Run audit analysis
sudo /usr/local/bin/audit-analysis.sh
```

</TabItem>
</Tabs>

---

**Note**: Always review and customize audit rules and security policies according to your organization's specific compliance requirements. Regularly test and validate security controls to ensure they meet regulatory standards. 