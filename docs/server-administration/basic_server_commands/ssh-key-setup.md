---
title: SSH Key Setup and Authentication
description: Complete guide to generate SSH keys, copy them to servers, and configure passwordless authentication.
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SSH Key Setup and Authentication

This guide covers how to generate SSH keys, copy them to remote servers, and configure secure passwordless authentication.

---

## Generate SSH Key Pair

### 1. Generate ED25519 Key (Recommended)

```bash
ssh-keygen -t ed25519 -C "your@email.example"
```

**Options:**
- `-t ed25519`: Use ED25519 algorithm (more secure and faster)
- `-C "your@email.example"`: Add a comment (usually your email)

### 2. Alternative: Generate RSA Key

```bash
ssh-keygen -t rsa -b 4096 -C "your@email.example"
```

**Options:**
- `-t rsa`: Use RSA algorithm
- `-b 4096`: Use 4096-bit key length (more secure)

### 3. Key Generation Process

When prompted:

1. **File location**: Press Enter to accept default (`~/.ssh/id_ed25519` or `~/.ssh/id_rsa`)
2. **Passphrase**: 
   - Enter a strong passphrase for extra security
   - Or leave empty for passwordless login (less secure)

---

## Copy Public Key to Server

### Method 1: Using ssh-copy-id (Recommended)

```bash
ssh-copy-id root@194.163.176.149
```

**What it does:**
- Automatically copies your public key to the server
- Sets correct permissions on the server
- Works with most Linux distributions

### Method 2: Manual Copy (if ssh-copy-id unavailable)

```bash
cat ~/.ssh/id_ed25519.pub | ssh root@194.163.176.149 'mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'
```

**What this command does:**
1. `cat ~/.ssh/id_ed25519.pub`: Display your public key
2. `ssh root@194.163.176.149`: Connect to the server
3. `mkdir -p ~/.ssh`: Create .ssh directory if it doesn't exist
4. `chmod 700 ~/.ssh`: Set secure permissions on .ssh directory
5. `cat >> ~/.ssh/authorized_keys`: Append public key to authorized_keys
6. `chmod 600 ~/.ssh/authorized_keys`: Set secure permissions on authorized_keys

### Method 3: Manual Upload

1. **Display your public key:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

2. **Copy the output and manually add to server:**
   ```bash
   # On the server
   mkdir -p ~/.ssh
   chmod 700 ~/.ssh
   echo "your-public-key-here" >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

---

## Test SSH Connection

### 1. Test Login

```bash
ssh root@194.163.176.149
```

### 2. Verify Key Authentication

If successful, you should be logged in without entering a password (unless you set a passphrase).

### 3. Check Connection Details

```bash
ssh -v root@194.163.176.149
```

The `-v` flag provides verbose output showing the authentication process.

---

## Security Best Practices

### 1. Key Management

- **Use ED25519 keys** when possible (more secure than RSA)
- **Set strong passphrases** for your private keys
- **Use different keys** for different servers/environments
- **Regularly rotate keys** (every 6-12 months)

### 2. Server Configuration

- **Disable password authentication** after setting up keys:
  ```bash
  # Edit /etc/ssh/sshd_config
  PasswordAuthentication no
  PubkeyAuthentication yes
  
  # Restart SSH service
  sudo systemctl restart sshd
  ```

- **Use non-root users** when possible:
  ```bash
  # Create a new user
  sudo adduser username
  sudo usermod -aG sudo username
  ```

### 3. Key Permissions

Ensure correct permissions on your local machine:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 600 ~/.ssh/authorized_keys
```

---

## Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| Permission denied (publickey) | Check file permissions on server: `~/.ssh` (700), `~/.ssh/authorized_keys` (600) |
| Key not found | Verify key path: `ls -la ~/.ssh/` |
| Wrong key type | Check server supports your key type in `/etc/ssh/sshd_config` |
| Connection timeout | Verify server IP, port, and firewall settings |

### Debug Commands

```bash
# Test with verbose output
ssh -v root@194.163.176.149

# Test specific key
ssh -i ~/.ssh/id_ed25519 root@194.163.176.149

# Check SSH agent
ssh-add -l

# Add key to SSH agent
ssh-add ~/.ssh/id_ed25519
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Generate ED25519 key | `ssh-keygen -t ed25519 -C "email@example.com"` |
| Generate RSA key | `ssh-keygen -t rsa -b 4096 -C "email@example.com"` |
| Copy key to server | `ssh-copy-id user@server` |
| Test connection | `ssh user@server` |
| List SSH keys | `ls -la ~/.ssh/` |
| Display public key | `cat ~/.ssh/id_ed25519.pub` |

---

**Security Note:** Always keep your private key (`~/.ssh/id_ed25519`) secure and never share it. Only the public key (`~/.ssh/id_ed25519.pub`) should be copied to servers.
