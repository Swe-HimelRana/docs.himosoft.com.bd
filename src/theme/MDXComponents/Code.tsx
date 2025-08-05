import type {ComponentProps, ReactNode} from 'react';
import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import CodeInline from '@theme/CodeInline';
import type {Props} from '@theme/MDXComponents/Code';

function shouldBeInline(props: Props) {
  return (
    // empty code blocks have no props.children,
    // see https://github.com/facebook/docusaurus/pull/9704
    typeof props.children !== 'undefined' &&
    React.Children.toArray(props.children).every(
      (el) => typeof el === 'string' && !el.includes('\n'),
    )
  );
}

export default function MDXCode(props: Props): ReactNode {
  // Enhanced language detection for better syntax highlighting
  const enhancedProps = {...props};
  
  // Map common language aliases to proper Prism.js languages
  if (enhancedProps.className) {
    const languageMap: Record<string, string> = {
      'language-bash': 'language-bash',
      'language-shell': 'language-bash',
      'language-sh': 'language-bash',
      'language-zsh': 'language-bash',
      'language-fish': 'language-bash',
      'language-powershell': 'language-powershell',
      'language-ps1': 'language-powershell',
      'language-dockerfile': 'language-bash',
      'language-docker': 'language-bash',
      'language-yaml': 'language-yaml',
      'language-yml': 'language-yaml',
      'language-json': 'language-json',
      'language-js': 'language-javascript',
      'language-ts': 'language-typescript',
      'language-jsx': 'language-jsx',
      'language-tsx': 'language-tsx',
      'language-py': 'language-python',
      'language-rb': 'language-ruby',
      'language-php': 'language-php',
      'language-java': 'language-java',
      'language-go': 'language-go',
      'language-rust': 'language-rust',
      'language-cpp': 'language-cpp',
      'language-c': 'language-c',
      'language-cs': 'language-csharp',
      'language-sql': 'language-sql',
      'language-css': 'language-css',
      'language-scss': 'language-scss',
      'language-less': 'language-less',
      'language-md': 'language-markdown',
      'language-markdown': 'language-markdown',
      'language-diff': 'language-diff',
      'language-git': 'language-git',
      'language-properties': 'language-properties',
      'language-log': 'language-log',
    };
    
    const mappedLanguage = languageMap[enhancedProps.className];
    if (mappedLanguage) {
      enhancedProps.className = mappedLanguage;
    }
  }
  
  return shouldBeInline(enhancedProps) ? (
    <CodeInline {...enhancedProps} />
  ) : (
    <CodeBlock {...(enhancedProps as ComponentProps<typeof CodeBlock>)} />
  );
}
