import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Himosoft Docs',
  tagline: `Himosoft Docs is a comprehensive knowledge base covering a wide range of technologies, tools, and frameworks. From cloud computing and web development to DevOps, networking, and beyond — it's your go-to resource for tutorials, how-to guides, technical deep dives, and best practices. Curated by the Himosoft team to support learners, developers, and tech enthusiasts at every level.`,
  favicon: 'img/shortlogo.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.himosoft.com.bd',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Himosoft', // Usually your GitHub org/user name.
  projectName: 'Himosoft-Docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
         
        },

        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Himosoft Docs',
      logo: {
        alt: 'Himosoft Docs Logo',
        src: 'img/shortlogo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },

        {
          href: 'https://himosoft.com.bd',
          label: 'Himosoft',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Start Here',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Products',
          items: [
            {
              label: 'Himosoft Cloud', 
              href: 'https://cloud.himosoft.com.bd',
            },
            {
              label: 'Plugins',
              href: 'https://plugins.himosoft.com.bd.com',
            },
            {
              label: 'Learn more about Himosoft',
              href: 'https://himosoft.com.bd',
            },
          ],
        },
        {
          title: 'More',
          items: [

            {
              label: 'Contact Us',
              href: 'mailto:info@himosoft.com.bd',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Himosoft. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'bash',
        'yaml',
        'json',
        'powershell',
        'ini',
        'toml',
        'sql',
        'css',
        'scss',
        'less',
        'typescript',
        'javascript',
        'jsx',
        'tsx',
        'python',
        'java',
        'go',
        'rust',
        'php',
        'ruby',
        'csharp',
        'cpp',
        'c',
        'markdown',
        'diff',
        'git',
        'properties',
        'log'
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
