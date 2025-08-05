import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface CodeBlockProps {
  children: string;
  className?: string;
  metastring?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className, metastring }) => {
  const { isDarkTheme } = useDocusaurusContext();
  
  // Extract language from className (e.g., "language-bash" -> "bash")
  const language = className?.replace('language-', '') || 'text';
  
  // Determine theme based on dark/light mode
  const theme = isDarkTheme ? themes.dracula : themes.github;
  
  return (
    <div className="code-block-wrapper">
      <Highlight
        theme={theme}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock; 