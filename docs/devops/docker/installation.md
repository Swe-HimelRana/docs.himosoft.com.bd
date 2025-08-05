---
title: Docker Installation
description: Learn how to install Docker on different operating systems
sidebar_position: 1
---

# Docker Installation Guide

Docker is a platform for developing, shipping, and running applications in containers. This guide will help you install Docker on your system.

## Prerequisites

Before installing Docker, ensure your system meets the following requirements:

- **Linux**: Kernel version 3.10 or higher
- **Windows**: Windows 10/11 Pro, Enterprise, or Education (64-bit)
- **macOS**: macOS 10.15 or newer
- **RAM**: At least 4GB (8GB recommended)
- **Storage**: At least 20GB free space

## Installing Docker on Linux

### Ubuntu/Debian

```bash
# Update package index
sudo apt-get update

# Install prerequisites
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to the docker group (optional)
sudo usermod -aG docker $USER
```

### CentOS/RHEL/Fedora

```bash
# Install prerequisites
sudo yum install -y yum-utils

# Add Docker repository
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# Install Docker Engine
sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to the docker group (optional)
sudo usermod -aG docker $USER
```

## Installing Docker on Windows

### Using Docker Desktop (Recommended)

1. **Download Docker Desktop**:
   - Visit [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
   - Download the installer

2. **Install Docker Desktop**:
   ```powershell
   # Run the installer as Administrator
   Start-Process -FilePath "Docker Desktop Installer.exe" -Verb RunAs
   ```

3. **Enable WSL 2** (if not already enabled):
   ```powershell
   # Enable WSL feature
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   
   # Enable Virtual Machine feature
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   
   # Restart your computer
   Restart-Computer
   ```

4. **Install WSL 2 Linux kernel**:
   ```powershell
   # Download and install WSL 2 kernel
   Invoke-WebRequest -Uri "https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi" -OutFile "wsl_update_x64.msi"
   Start-Process -FilePath "wsl_update_x64.msi" -ArgumentList "/quiet" -Wait
   ```

5. **Set WSL 2 as default**:
   ```powershell
   wsl --set-default-version 2
   ```

### Using WSL 2 Backend

```powershell
# Install Docker in WSL 2
wsl --install -d Ubuntu

# In WSL 2 Ubuntu, run the Linux installation commands
sudo apt-get update
sudo apt-get install docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

## Installing Docker on macOS

### Using Docker Desktop (Recommended)

1. **Download Docker Desktop**:
   - Visit [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
   - Download the appropriate version (Intel or Apple Silicon)

2. **Install Docker Desktop**:
   ```bash
   # Mount the downloaded .dmg file
   hdiutil attach Docker.dmg
   
   # Copy Docker to Applications
   cp -R /Volumes/Docker/Docker.app /Applications/
   
   # Unmount the disk image
   hdiutil detach /Volumes/Docker
   ```

3. **Start Docker Desktop**:
   - Open Docker Desktop from Applications
   - Follow the setup wizard

### Using Homebrew

```bash
# Install Docker using Homebrew
brew install --cask docker

# Start Docker Desktop
open /Applications/Docker.app
```

### Using Colima (Alternative to Docker Desktop)

Colima is a lightweight Docker Desktop alternative for macOS that provides Docker Engine and Docker Compose without the overhead of Docker Desktop.

#### Prerequisites

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Docker CLI
brew install docker

# Install Docker Compose
brew install docker-compose
```

#### Install Colima

```bash
# Install Colima using Homebrew
brew install colima

# Start Colima with default settings
colima start

# Verify installation
docker --version
docker-compose --version
```

#### Advanced Colima Configuration

```bash
# Start Colima with custom settings
colima start \
  --cpu 4 \
  --memory 8 \
  --disk 100 \
  --arch x86_64

# Start with specific Docker version
colima start --kubernetes --kubernetes-version v1.24.0

# Start with custom Docker daemon configuration
colima start --edit

# Stop Colima
colima stop

# Delete Colima VM
colima delete

# Show Colima status
colima status
```

#### Colima with Different Architectures

```bash
# For Apple Silicon (M1/M2) Macs
colima start --arch aarch64

# For Intel Macs
colima start --arch x86_64

# Start with Rosetta 2 for x86_64 compatibility
colima start --arch x86_64 --vm-type=qemu
```

#### Colima with Kubernetes

```bash
# Start Colima with Kubernetes
colima start --kubernetes

# Start with specific Kubernetes version
colima start --kubernetes --kubernetes-version v1.24.0

# Enable Kubernetes dashboard
colima start --kubernetes --kubernetes-dashboard

# Check Kubernetes status
kubectl cluster-info
```

#### Colima Configuration File

Create `~/.colima/default/colima.yaml` for persistent configuration:

```yaml
# Colima configuration
cpu: 4
memory: 8
disk: 100
arch: x86_64
kubernetes:
  enabled: false
  version: v1.24.0
docker:
  daemon:
    features:
      buildkit: true
    experimental: true
```

#### Troubleshooting Colima

```bash
# Check Colima logs
colima logs

# Restart Colima
colima stop
colima start

# Reset Colima completely
colima delete
colima start

# Check Docker daemon
docker system info

# Test Docker functionality
docker run hello-world
```

#### Colima vs Docker Desktop

| Feature | Colima | Docker Desktop |
|---------|--------|----------------|
| **Resource Usage** | Lightweight | Heavy |
| **Startup Time** | Fast | Slow |
| **Kubernetes** | Optional | Built-in |
| **GUI** | CLI only | Full GUI |
| **Updates** | Manual | Automatic |
| **Cost** | Free | Free/Paid |
| **Customization** | High | Limited |

#### Colima Best Practices

1. **Resource Allocation**:
   ```bash
   # Allocate appropriate resources
   colima start --cpu 4 --memory 8 --disk 100
   ```

2. **Architecture Selection**:
   ```bash
   # Use native architecture for better performance
   colima start --arch aarch64  # For Apple Silicon
   colima start --arch x86_64    # For Intel
   ```

3. **Docker Compose Integration**:
   ```bash
   # Colima works seamlessly with Docker Compose
   docker-compose up -d
   ```

4. **Development Workflow**:
   ```bash
   # Start Colima for development
   colima start --cpu 2 --memory 4
   
   # Use Docker normally
   docker build -t myapp .
   docker run myapp
   
   # Stop when done
   colima stop
   ```

## Verifying Installation

After installation, verify Docker is working correctly:

```bash
# Check Docker version
docker --version

# Run hello-world container
docker run hello-world

# Check Docker system info
docker system info
```

## Docker Compose Installation

Docker Compose is included with Docker Desktop. For Linux installations:

```bash
# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make it executable
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker-compose --version
```

## Post-Installation Steps

### Configure Docker Daemon (Optional)

Create or edit `/etc/docker/daemon.json`:

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "insecure-registries": [],
  "registry-mirrors": []
}
```

### Restart Docker

```bash
# Linux
sudo systemctl restart docker

# macOS/Windows
# Restart Docker Desktop from the application
```

## Troubleshooting

### Common Issues

1. **Permission Denied**:
   ```bash
   # Add user to docker group
   sudo usermod -aG docker $USER
   newgrp docker
   ```

2. **Docker Daemon Not Running**:
   ```bash
   # Start Docker service
   sudo systemctl start docker
   ```

3. **WSL 2 Issues on Windows**:
   ```powershell
   # Update WSL
   wsl --update
   
   # Restart WSL
   wsl --shutdown
   ```

### Getting Help

- **Docker Documentation**: [docs.docker.com](https://docs.docker.com/)
- **Docker Community**: [forums.docker.com](https://forums.docker.com/)
- **GitHub Issues**: [github.com/docker/docker-ce](https://github.com/docker/docker-ce/issues)

## Next Steps

Now that Docker is installed, you can:

1. [Learn Docker basics](./basics.md)
2. [Create your first container](./first-container.md)
3. [Build Docker images](./building-images.md)
4. [Work with Docker Compose](./docker-compose.md)

Congratulations! You've successfully installed Docker on your system. 