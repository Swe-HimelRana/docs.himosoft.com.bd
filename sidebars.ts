import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main sidebar with logical grouping
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🚀 DevOps',
      items: [
        {
          type: 'category',
          label: '🐳 Docker',
          items: [
            'devops/docker/installation',
            'devops/docker/basics',
            'devops/docker/first-container',
            'devops/docker/building-images',
            'devops/docker/container-management',
            'devops/docker/volumes-networks',
            'devops/docker/docker-compose',
            'devops/docker/sample-applications',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🔧 Server Administration',
      items: [
        {
          type: 'category',
          label: '⚡ Basic Server Commands',
          items: [
            'server-administration/basic_server_commands/ssh-key-setup',
            'server-administration/basic_server_commands/static-ip-configuration',
            'server-administration/basic_server_commands/network-configuration-refresh',
            'server-administration/basic_server_commands/network-information-gathering',
          ],
        },
        {
          type: 'category',
          label: '🌐 Apache HTTP Server',
          items: [
            'server-administration/apache-server/installation',
            'server-administration/apache-server/basic-config',
            'server-administration/apache-server/virtual-hosts',
            'server-administration/apache-server/ssl-configuration',
            'server-administration/apache-server/htaccess',
            'server-administration/apache-server/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: '🚀 Nginx HTTP Server',
          items: [
            'server-administration/nginx-server/installation',
            'server-administration/nginx-server/basic-config',
            'server-administration/nginx-server/server-blocks',
            'server-administration/nginx-server/ssl-configuration',
            'server-administration/nginx-server/advanced-config',
            'server-administration/nginx-server/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: '🔥 Linux iptables Firewall',
          items: [
            'server-administration/linux-iptables/basics',
            'server-administration/linux-iptables/advanced-rules',
            'server-administration/linux-iptables/practical-examples',
            'server-administration/linux-iptables/troubleshooting',
            'server-administration/linux-iptables/openvpn-setup',
          ],
        },
        {
          type: 'category',
          label: '🔧 System Engineer',
          items: [
            'server-administration/system-engineer/security-configuration',
            'server-administration/system-engineer/system-resource-configuration',
            'server-administration/system-engineer/package-service-management',
            'server-administration/system-engineer/disk-filesystem-management',
            'server-administration/system-engineer/networking-configuration',
            'server-administration/system-engineer/monitoring-logging',
            'server-administration/system-engineer/backup-recovery',
            'server-administration/system-engineer/automation-configuration',
            'server-administration/system-engineer/compliance-auditing',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
