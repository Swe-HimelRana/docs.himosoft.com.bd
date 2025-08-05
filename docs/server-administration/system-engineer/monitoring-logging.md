---
title: Monitoring and Logging
description: Comprehensive monitoring and logging using bash commands for system resources, monitoring tools, log management, and centralized logging for Debian/Ubuntu and CentOS.
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Monitoring and Logging

Comprehensive monitoring and logging using bash commands for system resources, monitoring tools, log management, and centralized logging for Debian/Ubuntu and CentOS.

---

## System Resource Monitoring

### **1. Monitor System Resources with top, htop, iotop**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install monitoring tools
sudo apt update
sudo apt install htop iotop glances

# Monitor with top
top
# Interactive commands in top:
# - Press 'q' to quit
# - Press '1' to show all CPUs
# - Press 'M' to sort by memory
# - Press 'P' to sort by CPU
# - Press 'k' to kill process

# Monitor with htop (enhanced top)
htop
# Interactive commands in htop:
# - F1: Help
# - F2: Setup
# - F3: Search
# - F4: Filter
# - F5: Tree view
# - F6: Sort
# - F9: Kill process
# - F10: Quit

# Monitor disk I/O with iotop
sudo iotop
# Shows real-time disk I/O usage

# Monitor with glances (comprehensive)
glances
# Provides comprehensive system overview
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install monitoring tools
sudo yum install htop iotop glances

# Monitor with top
top
# Interactive commands in top:
# - Press 'q' to quit
# - Press '1' to show all CPUs
# - Press 'M' to sort by memory
# - Press 'P' to sort by CPU
# - Press 'k' to kill process

# Monitor with htop (enhanced top)
htop
# Interactive commands in htop:
# - F1: Help
# - F2: Setup
# - F3: Search
# - F4: Filter
# - F5: Tree view
# - F6: Sort
# - F9: Kill process
# - F10: Quit

# Monitor disk I/O with iotop
sudo iotop
# Shows real-time disk I/O usage

# Monitor with glances (comprehensive)
glances
# Provides comprehensive system overview
```

</TabItem>
</Tabs>

### **2. Advanced System Monitoring**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Monitor CPU usage
mpstat 1 5
vmstat 1 5

# Monitor memory usage
free -h
cat /proc/meminfo

# Monitor disk usage
df -h
du -sh /*

# Monitor network usage
iftop
nethogs

# Monitor process tree
pstree
ps aux --forest

# Monitor system load
uptime
cat /proc/loadavg

# Monitor system uptime
who
w
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Monitor CPU usage
mpstat 1 5
vmstat 1 5

# Monitor memory usage
free -h
cat /proc/meminfo

# Monitor disk usage
df -h
du -sh /*

# Monitor network usage
iftop
nethogs

# Monitor process tree
pstree
ps aux --forest

# Monitor system load
uptime
cat /proc/loadavg

# Monitor system uptime
who
w
```

</TabItem>
</Tabs>

---

## Monitoring Tools Installation and Configuration

### **1. Install and Configure Glances**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install glances
sudo apt install glances

# Run glances in web mode
glances -w
# Access web interface at http://server-ip:61208

# Run glances with specific configuration
glances --config /etc/glances/glances.conf

# Create glances configuration
sudo nano /etc/glances/glances.conf

# Example configuration:
# [global]
# refresh = 2
# theme = white
# 
# [cpu]
# cpu_percent = True
# 
# [mem]
# mem_percent = True

# Run glances as service
sudo systemctl enable glances
sudo systemctl start glances
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install glances
sudo yum install glances

# Run glances in web mode
glances -w
# Access web interface at http://server-ip:61208

# Run glances with specific configuration
glances --config /etc/glances/glances.conf

# Create glances configuration
sudo nano /etc/glances/glances.conf

# Example configuration:
# [global]
# refresh = 2
# theme = white
# 
# [cpu]
# cpu_percent = True
# 
# [mem]
# mem_percent = True

# Run glances as service
sudo systemctl enable glances
sudo systemctl start glances
```

</TabItem>
</Tabs>

### **2. Install and Configure Netdata**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install netdata
bash <(curl -Ss https://my-netdata.io/kickstart.sh)

# Or install via package manager
sudo apt install netdata

# Configure netdata
sudo nano /etc/netdata/netdata.conf

# Example configuration:
# [global]
#     hostname = server01
#     memory mode = ram
#     page cache size = 32
#     dbengine multihost disk space = 256

# Configure netdata web interface
sudo nano /etc/netdata/netdata.conf

# Add to [web] section:
# [web]
#     bind to = 0.0.0.0:19999
#     allow connections from = *

# Restart netdata
sudo systemctl restart netdata

# Check netdata status
sudo systemctl status netdata

# Access web interface at http://server-ip:19999
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install netdata
bash <(curl -Ss https://my-netdata.io/kickstart.sh)

# Or install via package manager
sudo yum install netdata

# Configure netdata
sudo nano /etc/netdata/netdata.conf

# Example configuration:
# [global]
#     hostname = server01
#     memory mode = ram
#     page cache size = 32
#     dbengine multihost disk space = 256

# Configure netdata web interface
sudo nano /etc/netdata/netdata.conf

# Add to [web] section:
# [web]
#     bind to = 0.0.0.0:19999
#     allow connections from = *

# Restart netdata
sudo systemctl restart netdata

# Check netdata status
sudo systemctl status netdata

# Access web interface at http://server-ip:19999
```

</TabItem>
</Tabs>

### **3. Install and Configure Prometheus Exporters**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install node_exporter for system metrics
wget https://github.com/prometheus/node_exporter/releases/download/v1.3.1/node_exporter-1.3.1.linux-amd64.tar.gz
tar xvfz node_exporter-1.3.1.linux-amd64.tar.gz
sudo mv node_exporter-1.3.1.linux-amd64/node_exporter /usr/local/bin/

# Create systemd service for node_exporter
sudo tee /etc/systemd/system/node_exporter.service << 'EOF'
[Unit]
Description=Node Exporter
After=network.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
EOF

# Create user for node_exporter
sudo useradd -rs /bin/false node_exporter

# Enable and start node_exporter
sudo systemctl daemon-reload
sudo systemctl enable node_exporter
sudo systemctl start node_exporter

# Check node_exporter status
sudo systemctl status node_exporter

# Test metrics endpoint
curl http://localhost:9100/metrics
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install node_exporter for system metrics
wget https://github.com/prometheus/node_exporter/releases/download/v1.3.1/node_exporter-1.3.1.linux-amd64.tar.gz
tar xvfz node_exporter-1.3.1.linux-amd64.tar.gz
sudo mv node_exporter-1.3.1.linux-amd64/node_exporter /usr/local/bin/

# Create systemd service for node_exporter
sudo tee /etc/systemd/system/node_exporter.service << 'EOF'
[Unit]
Description=Node Exporter
After=network.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
EOF

# Create user for node_exporter
sudo useradd -rs /bin/false node_exporter

# Enable and start node_exporter
sudo systemctl daemon-reload
sudo systemctl enable node_exporter
sudo systemctl start node_exporter

# Check node_exporter status
sudo systemctl status node_exporter

# Test metrics endpoint
curl http://localhost:9100/metrics
```

</TabItem>
</Tabs>

---

## Log Management and Monitoring

### **1. Check and Manage Logs: /var/log/syslog, /var/log/auth.log, etc.**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# View system logs
sudo tail -f /var/log/syslog
sudo tail -f /var/log/messages

# View authentication logs
sudo tail -f /var/log/auth.log
sudo grep "Failed password" /var/log/auth.log

# View kernel logs
sudo dmesg
sudo journalctl -k

# View service logs
sudo journalctl -u ssh
sudo journalctl -u nginx
sudo journalctl -u apache2

# View boot logs
sudo journalctl -b

# View logs from specific time
sudo journalctl --since "2023-01-01 00:00:00"
sudo journalctl --since "1 hour ago"

# View logs with priority
sudo journalctl -p err
sudo journalctl -p warning

# Search logs
sudo journalctl | grep "error"
sudo grep "error" /var/log/syslog
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# View system logs
sudo tail -f /var/log/messages
sudo tail -f /var/log/syslog

# View authentication logs
sudo tail -f /var/log/secure
sudo grep "Failed password" /var/log/secure

# View kernel logs
sudo dmesg
sudo journalctl -k

# View service logs
sudo journalctl -u sshd
sudo journalctl -u nginx
sudo journalctl -u httpd

# View boot logs
sudo journalctl -b

# View logs from specific time
sudo journalctl --since "2023-01-01 00:00:00"
sudo journalctl --since "1 hour ago"

# View logs with priority
sudo journalctl -p err
sudo journalctl -p warning

# Search logs
sudo journalctl | grep "error"
sudo grep "error" /var/log/messages
```

</TabItem>
</Tabs>

### **2. Log Rotation Configuration**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Check logrotate configuration
sudo cat /etc/logrotate.conf

# Configure logrotate for custom logs
sudo nano /etc/logrotate.d/custom-logs

# Example configuration:
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

# Test logrotate configuration
sudo logrotate -d /etc/logrotate.conf

# Force logrotate execution
sudo logrotate -f /etc/logrotate.conf

# Check logrotate status
sudo systemctl status logrotate
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Check logrotate configuration
sudo cat /etc/logrotate.conf

# Configure logrotate for custom logs
sudo nano /etc/logrotate.d/custom-logs

# Example configuration:
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

# Test logrotate configuration
sudo logrotate -d /etc/logrotate.conf

# Force logrotate execution
sudo logrotate -f /etc/logrotate.conf

# Check logrotate status
sudo systemctl status logrotate
```

</TabItem>
</Tabs>

### **3. Log Analysis and Monitoring**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install log analysis tools
sudo apt install logwatch fail2ban

# Generate daily log report
sudo logwatch --detail High --mailto admin@example.com

# Monitor failed login attempts
sudo grep "Failed password" /var/log/auth.log | wc -l
sudo grep "Failed password" /var/log/auth.log | tail -10

# Monitor SSH connections
sudo grep "sshd" /var/log/auth.log | grep "Accepted"
sudo grep "sshd" /var/log/auth.log | grep "session opened"

# Monitor system errors
sudo journalctl -p err --since "1 hour ago"
sudo grep -i error /var/log/syslog | tail -20

# Monitor disk space usage
sudo du -sh /var/log/*
sudo find /var/log -name "*.log" -exec ls -lh {} \;

# Monitor log file sizes
sudo ls -lh /var/log/*.log
sudo find /var/log -name "*.log" -size +100M
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install log analysis tools
sudo yum install logwatch fail2ban

# Generate daily log report
sudo logwatch --detail High --mailto admin@example.com

# Monitor failed login attempts
sudo grep "Failed password" /var/log/secure | wc -l
sudo grep "Failed password" /var/log/secure | tail -10

# Monitor SSH connections
sudo grep "sshd" /var/log/secure | grep "Accepted"
sudo grep "sshd" /var/log/secure | grep "session opened"

# Monitor system errors
sudo journalctl -p err --since "1 hour ago"
sudo grep -i error /var/log/messages | tail -20

# Monitor disk space usage
sudo du -sh /var/log/*
sudo find /var/log -name "*.log" -exec ls -lh {} \;

# Monitor log file sizes
sudo ls -lh /var/log/*.log
sudo find /var/log -name "*.log" -size +100M
```

</TabItem>
</Tabs>

---

## Centralized Logging Configuration

### **1. Configure rsyslog for Centralized Logging**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install rsyslog
sudo apt install rsyslog

# Configure rsyslog as client
sudo nano /etc/rsyslog.conf

# Add to end of file:
# # Send all logs to central server
# *.* @@central-server-ip:514

# Configure rsyslog as server
sudo nano /etc/rsyslog.conf

# Uncomment these lines:
# module(load="imudp")
# input(type="imudp" port="514")
# module(load="imtcp")
# input(type="imtcp" port="514")

# Create log directory
sudo mkdir -p /var/log/remote

# Add to rsyslog.conf:
# # Template for remote logs
# $template RemoteLogs,"/var/log/remote/%HOSTNAME%/%PROGRAMNAME%.log"
# *.* ?RemoteLogs

# Restart rsyslog
sudo systemctl restart rsyslog

# Check rsyslog status
sudo systemctl status rsyslog

# Test log forwarding
logger "Test message from client"
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install rsyslog
sudo yum install rsyslog

# Configure rsyslog as client
sudo nano /etc/rsyslog.conf

# Add to end of file:
# # Send all logs to central server
# *.* @@central-server-ip:514

# Configure rsyslog as server
sudo nano /etc/rsyslog.conf

# Uncomment these lines:
# module(load="imudp")
# input(type="imudp" port="514")
# module(load="imtcp")
# input(type="imtcp" port="514")

# Create log directory
sudo mkdir -p /var/log/remote

# Add to rsyslog.conf:
# # Template for remote logs
# $template RemoteLogs,"/var/log/remote/%HOSTNAME%/%PROGRAMNAME%.log"
# *.* ?RemoteLogs

# Restart rsyslog
sudo systemctl restart rsyslog

# Check rsyslog status
sudo systemctl status rsyslog

# Test log forwarding
logger "Test message from client"
```

</TabItem>
</Tabs>

### **2. Configure Log Forwarding with systemd-journal-remote**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install systemd-journal-remote
sudo apt install systemd-journal-remote

# Configure journal-remote
sudo nano /etc/systemd/journal-remote.conf

# Example configuration:
# [Remote]
# ServerKeyFile=/etc/ssl/private/journal-remote.pem
# ServerCertificateFile=/etc/ssl/certs/journal-remote.pem
# TrustedCertificateFile=/etc/ssl/certs/journal-remote-ca.pem

# Create SSL certificates for secure logging
sudo openssl req -x509 -newkey rsa:4096 -keyout /etc/ssl/private/journal-remote.pem -out /etc/ssl/certs/journal-remote.pem -days 365 -nodes

# Configure journal-upload
sudo nano /etc/systemd/journal-upload.conf

# Example configuration:
# [Upload]
# URL=https://central-server:19532
# ServerKeyFile=/etc/ssl/private/journal-upload.pem
# ServerCertificateFile=/etc/ssl/certs/journal-upload.pem
# TrustedCertificateFile=/etc/ssl/certs/journal-upload-ca.pem

# Enable and start journal-upload
sudo systemctl enable systemd-journal-upload
sudo systemctl start systemd-journal-upload

# Check status
sudo systemctl status systemd-journal-upload
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install systemd-journal-remote
sudo yum install systemd-journal-remote

# Configure journal-remote
sudo nano /etc/systemd/journal-remote.conf

# Example configuration:
# [Remote]
# ServerKeyFile=/etc/ssl/private/journal-remote.pem
# ServerCertificateFile=/etc/ssl/certs/journal-remote.pem
# TrustedCertificateFile=/etc/ssl/certs/journal-remote-ca.pem

# Create SSL certificates for secure logging
sudo openssl req -x509 -newkey rsa:4096 -keyout /etc/ssl/private/journal-remote.pem -out /etc/ssl/certs/journal-remote.pem -days 365 -nodes

# Configure journal-upload
sudo nano /etc/systemd/journal-upload.conf

# Example configuration:
# [Upload]
# URL=https://central-server:19532
# ServerKeyFile=/etc/ssl/private/journal-upload.pem
# ServerCertificateFile=/etc/ssl/certs/journal-upload.pem
# TrustedCertificateFile=/etc/ssl/certs/journal-upload-ca.pem

# Enable and start journal-upload
sudo systemctl enable systemd-journal-upload
sudo systemctl start systemd-journal-upload

# Check status
sudo systemctl status systemd-journal-upload
```

</TabItem>
</Tabs>

---

## Real-time Monitoring Scripts

### **1. Create Custom Monitoring Scripts**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create system monitoring script
sudo nano /usr/local/bin/system-monitor.sh

#!/bin/bash
# System monitoring script

echo "=== System Resource Monitor ==="
echo "Date: $(date)"
echo "Uptime: $(uptime)"
echo ""

echo "=== CPU Usage ==="
top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1
echo ""

echo "=== Memory Usage ==="
free -h | grep -E "Mem|Swap"
echo ""

echo "=== Disk Usage ==="
df -h | grep -E "^/dev"
echo ""

echo "=== Top Processes ==="
ps aux --sort=-%cpu | head -5
echo ""

echo "=== Network Connections ==="
netstat -tuln | wc -l
echo ""

echo "=== Recent Logs ==="
tail -5 /var/log/syslog
```

# Make script executable
sudo chmod +x /usr/local/bin/system-monitor.sh

# Run monitoring script
sudo /usr/local/bin/system-monitor.sh

# Create cron job for regular monitoring
echo "*/5 * * * * /usr/local/bin/system-monitor.sh >> /var/log/system-monitor.log" | sudo crontab -
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create system monitoring script
sudo nano /usr/local/bin/system-monitor.sh

#!/bin/bash
# System monitoring script

echo "=== System Resource Monitor ==="
echo "Date: $(date)"
echo "Uptime: $(uptime)"
echo ""

echo "=== CPU Usage ==="
top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1
echo ""

echo "=== Memory Usage ==="
free -h | grep -E "Mem|Swap"
echo ""

echo "=== Disk Usage ==="
df -h | grep -E "^/dev"
echo ""

echo "=== Top Processes ==="
ps aux --sort=-%cpu | head -5
echo ""

echo "=== Network Connections ==="
netstat -tuln | wc -l
echo ""

echo "=== Recent Logs ==="
tail -5 /var/log/messages
```

# Make script executable
sudo chmod +x /usr/local/bin/system-monitor.sh

# Run monitoring script
sudo /usr/local/bin/system-monitor.sh

# Create cron job for regular monitoring
echo "*/5 * * * * /usr/local/bin/system-monitor.sh >> /var/log/system-monitor.log" | sudo crontab -
```

</TabItem>
</Tabs>

### **2. Create Log Monitoring Scripts**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Create log monitoring script
sudo nano /usr/local/bin/log-monitor.sh

#!/bin/bash
# Log monitoring script

LOG_DIR="/var/log"
ALERT_EMAIL="admin@example.com"

echo "=== Log Monitor Report ==="
echo "Date: $(date)"
echo ""

# Check for error logs
echo "=== Error Logs (Last Hour) ==="
sudo journalctl -p err --since "1 hour ago" | tail -10
echo ""

# Check for failed login attempts
echo "=== Failed Login Attempts ==="
sudo grep "Failed password" /var/log/auth.log | tail -5
echo ""

# Check for disk space issues
echo "=== Disk Space Check ==="
df -h | awk '$5 > "80%" {print $0}'
echo ""

# Check for large log files
echo "=== Large Log Files (>100MB) ==="
sudo find /var/log -name "*.log" -size +100M -exec ls -lh {} \;
echo ""

# Check for service failures
echo "=== Service Status ==="
sudo systemctl --failed
echo ""

# Send alert if critical issues found
if [ $(sudo journalctl -p err --since "1 hour ago" | wc -l) -gt 10 ]; then
    echo "Critical: High number of errors detected" | mail -s "System Alert" $ALERT_EMAIL
fi
```

# Make script executable
sudo chmod +x /usr/local/bin/log-monitor.sh

# Run log monitoring script
sudo /usr/local/bin/log-monitor.sh
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Create log monitoring script
sudo nano /usr/local/bin/log-monitor.sh

#!/bin/bash
# Log monitoring script

LOG_DIR="/var/log"
ALERT_EMAIL="admin@example.com"

echo "=== Log Monitor Report ==="
echo "Date: $(date)"
echo ""

# Check for error logs
echo "=== Error Logs (Last Hour) ==="
sudo journalctl -p err --since "1 hour ago" | tail -10
echo ""

# Check for failed login attempts
echo "=== Failed Login Attempts ==="
sudo grep "Failed password" /var/log/secure | tail -5
echo ""

# Check for disk space issues
echo "=== Disk Space Check ==="
df -h | awk '$5 > "80%" {print $0}'
echo ""

# Check for large log files
echo "=== Large Log Files (>100MB) ==="
sudo find /var/log -name "*.log" -size +100M -exec ls -lh {} \;
echo ""

# Check for service failures
echo "=== Service Status ==="
sudo systemctl --failed
echo ""

# Send alert if critical issues found
if [ $(sudo journalctl -p err --since "1 hour ago" | wc -l) -gt 10 ]; then
    echo "Critical: High number of errors detected" | mail -s "System Alert" $ALERT_EMAIL
fi
```

# Make script executable
sudo chmod +x /usr/local/bin/log-monitor.sh

# Run log monitoring script
sudo /usr/local/bin/log-monitor.sh
```

</TabItem>
</Tabs>

---

## Monitoring Dashboard Setup

### **1. Simple Web-based Monitoring Dashboard**

<Tabs>
<TabItem value="debian" label="Debian/Ubuntu" default>

```bash
# Install web server
sudo apt install nginx

# Create monitoring dashboard directory
sudo mkdir -p /var/www/monitoring

# Create simple monitoring dashboard
sudo nano /var/www/monitoring/index.html

<!DOCTYPE html>
<html>
<head>
    <title>System Monitor</title>
    <meta http-equiv="refresh" content="30">
</head>
<body>
    <h1>System Monitoring Dashboard</h1>
    <div id="content">
        <h2>System Status</h2>
        <pre id="status"></pre>
    </div>
    <script>
        // Simple AJAX call to get system status
        fetch('/cgi-bin/system-status')
            .then(response => response.text())
            .then(data => {
                document.getElementById('status').textContent = data;
            });
    </script>
</body>
</html>

# Create CGI script for system status
sudo nano /var/www/monitoring/cgi-bin/system-status

#!/bin/bash
echo "Content-type: text/plain"
echo ""
echo "=== System Status ==="
echo "Date: $(date)"
echo "Uptime: $(uptime)"
echo "CPU: $(top -bn1 | grep 'Cpu(s)' | awk '{print $2}')"
echo "Memory: $(free -h | grep Mem | awk '{print $3"/"$2}')"
echo "Disk: $(df -h / | tail -1 | awk '{print $5}')"
echo "Load: $(cat /proc/loadavg | awk '{print $1, $2, $3}')"

# Make CGI script executable
sudo chmod +x /var/www/monitoring/cgi-bin/system-status

# Configure nginx
sudo nano /etc/nginx/sites-available/monitoring

server {
    listen 80;
    server_name monitoring.example.com;
    root /var/www/monitoring;
    index index.html;
    
    location /cgi-bin/ {
        alias /var/www/monitoring/cgi-bin/;
        cgi_pass;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/monitoring /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

</TabItem>
<TabItem value="centos" label="CentOS/RHEL">

```bash
# Install web server
sudo yum install nginx

# Create monitoring dashboard directory
sudo mkdir -p /var/www/monitoring

# Create simple monitoring dashboard
sudo nano /var/www/monitoring/index.html

<!DOCTYPE html>
<html>
<head>
    <title>System Monitor</title>
    <meta http-equiv="refresh" content="30">
</head>
<body>
    <h1>System Monitoring Dashboard</h1>
    <div id="content">
        <h2>System Status</h2>
        <pre id="status"></pre>
    </div>
    <script>
        // Simple AJAX call to get system status
        fetch('/cgi-bin/system-status')
            .then(response => response.text())
            .then(data => {
                document.getElementById('status').textContent = data;
            });
    </script>
</body>
</html>

# Create CGI script for system status
sudo nano /var/www/monitoring/cgi-bin/system-status

#!/bin/bash
echo "Content-type: text/plain"
echo ""
echo "=== System Status ==="
echo "Date: $(date)"
echo "Uptime: $(uptime)"
echo "CPU: $(top -bn1 | grep 'Cpu(s)' | awk '{print $2}')"
echo "Memory: $(free -h | grep Mem | awk '{print $3"/"$2}')"
echo "Disk: $(df -h / | tail -1 | awk '{print $5}')"
echo "Load: $(cat /proc/loadavg | awk '{print $1, $2, $3}')"

# Make CGI script executable
sudo chmod +x /var/www/monitoring/cgi-bin/system-status

# Configure nginx
sudo nano /etc/nginx/conf.d/monitoring.conf

server {
    listen 80;
    server_name monitoring.example.com;
    root /var/www/monitoring;
    index index.html;
    
    location /cgi-bin/ {
        alias /var/www/monitoring/cgi-bin/;
        cgi_pass;
    }
}

# Test and reload nginx
sudo nginx -t
sudo systemctl reload nginx
```

</TabItem>
</Tabs>

---

**Note**: Always configure monitoring tools with appropriate security measures, especially when exposing web interfaces. Use firewalls to restrict access to monitoring ports and implement authentication where necessary. 