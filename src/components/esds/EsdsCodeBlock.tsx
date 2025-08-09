import React, { useState, useEffect } from 'react'
import Prism from 'prismjs'

// Import Prism CSS (you may need to adjust the import path)
import 'prismjs/themes/prism.css'

// Import language support
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-bash'

interface EsdsCodeBlockProps {
  children: string
  language?: string
  showLineNumbers?: boolean
  showCopyButton?: boolean
  title?: string
  highlightLines?: number[]
  className?: string
}

/**
 * ESDS Code Block Component
 * 
 * Syntax-highlighted code blocks with copy functionality and line numbers.
 * Uses Prism.js for syntax highlighting with custom ESDS theming.
 */
const EsdsCodeBlock: React.FC<EsdsCodeBlockProps> = ({
  children,
  language = 'markup',
  showLineNumbers = true,
  showCopyButton = true,
  title,
  highlightLines = [],
  className = ''
}) => {
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState('')

  // Process and highlight code
  useEffect(() => {
    if (children) {
      // Clean the code string
      const code = children.trim()
      
      // Check if language is supported by Prism
      const grammar = Prism.languages[language]
      if (grammar) {
        const highlighted = Prism.highlight(code, grammar, language)
        setHighlightedCode(highlighted)
      } else {
        // Fallback for unsupported languages
        setHighlightedCode(escapeHtml(code))
      }
    }
  }, [children, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Failed to copy code:', err);
      }
    }
  }

  const escapeHtml = (text: string): string => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  const getLanguageDisplayName = (lang: string): string => {
    const langMap: Record<string, string> = {
      'markup': 'HTML',
      'html': 'HTML',
      'xml': 'XML',
      'css': 'CSS',
      'scss': 'SCSS',
      'sass': 'Sass',
      'javascript': 'JavaScript',
      'js': 'JavaScript',
      'typescript': 'TypeScript',
      'ts': 'TypeScript',
      'jsx': 'JSX',
      'tsx': 'TSX',
      'json': 'JSON',
      'yaml': 'YAML',
      'yml': 'YAML',
      'bash': 'Bash',
      'shell': 'Shell',
      'python': 'Python',
      'py': 'Python'
    }
    return langMap[lang] || lang.toUpperCase()
  }

  const formatLineNumbers = (code: string): string[] => {
    return code.split('\n')
  }

  const codeLines = formatLineNumbers(children.trim())

  return (
    <div className={`esds-code-block ${className}`}>
      {/* Header */}
      {(title || showCopyButton || language) && (
        <div className="code-header">
          <div className="code-info">
            {title && <span className="code-title">{title}</span>}
            {language && (
              <span className="code-language">
                {getLanguageDisplayName(language)}
              </span>
            )}
          </div>
          
          {showCopyButton && (
            <button
              className="copy-button"
              onClick={handleCopy}
              aria-label="Copy code to clipboard"
              title="Copy code"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                {copied ? (
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                ) : (
                  <>
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2H9.5a1 1 0 0 0-1 1v1H4.5a1 1 0 0 0-1-1V1.5z"/>
                    <path d="M9.5 3.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V3.5z"/>
                  </>
                )}
              </svg>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}

      {/* Code Content */}
      <div className="code-content">
        <pre className={`language-${language}`}>
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
          
          {/* Line Numbers */}
          {showLineNumbers && (
            <div className="line-numbers" aria-hidden="true">
              {codeLines.map((_, index) => (
                <div 
                  key={index + 1}
                  className={`line-number ${highlightLines.includes(index + 1) ? 'highlighted' : ''}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          )}
        </pre>
      </div>

      <style>{`
        .esds-code-block {
          background: var(--esds-code-block-background);
          border: var(--esds-code-block-border-width) solid var(--esds-code-block-border-color);
          border-radius: var(--esds-code-block-border-radius);
          margin: var(--esds-code-block-margin);
          box-shadow: var(--esds-code-block-shadow);
          overflow: hidden;
          font-family: var(--esds-code-block-font-family);
          font-size: var(--esds-code-block-font-size);
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--elvt-primitives-spacing-sm) var(--esds-code-block-padding);
          background: var(--elvt-alias-background-secondary, var(--elvt-primitives-color-gray-100));
          border-bottom: 1px solid var(--esds-code-block-border-color);
        }

        .code-info {
          display: flex;
          align-items: center;
          gap: var(--elvt-primitives-spacing-sm);
        }

        .code-title {
          font-weight: var(--elvt-primitives-font-weight-semibold);
          color: var(--esds-code-block-color);
          font-size: var(--elvt-primitives-font-size-sm);
        }

        .code-language {
          display: inline-flex;
          align-items: center;
          padding: 0.125rem 0.375rem;
          background: var(--elvt-alias-color-primary, var(--elvt-primitives-color-blue-600));
          color: white;
          border-radius: var(--elvt-primitives-radius-sm);
          font-size: var(--elvt-primitives-font-size-xs);
          font-weight: var(--elvt-primitives-font-weight-medium);
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .copy-button {
          display: flex;
          align-items: center;
          gap: var(--elvt-primitives-spacing-xs);
          padding: var(--elvt-primitives-spacing-xs) var(--elvt-primitives-spacing-sm);
          background: transparent;
          border: 1px solid var(--elvt-alias-border-medium, var(--elvt-primitives-color-gray-300));
          border-radius: var(--elvt-primitives-radius-sm);
          color: var(--esds-code-block-color);
          font-size: var(--elvt-primitives-font-size-xs);
          font-family: var(--esds-alias-font-family-primary);
          cursor: pointer;
          transition: all var(--esds-alias-transition-normal);
        }

        .copy-button:hover {
          background: var(--elvt-alias-surface-hover, var(--elvt-primitives-color-gray-50));
          border-color: var(--elvt-alias-border-strong, var(--elvt-primitives-color-gray-400));
        }

        .copy-button:focus-visible {
          outline: var(--esds-focus-width) var(--esds-focus-style) var(--esds-focus-color);
          outline-offset: var(--esds-focus-offset);
        }

        .code-content {
          position: relative;
        }

        .code-content pre {
          margin: 0;
          padding: var(--esds-code-block-padding);
          background: var(--esds-code-block-background);
          color: var(--esds-code-block-color);
          font-family: var(--esds-code-block-font-family);
          font-size: var(--esds-code-block-font-size);
          line-height: var(--esds-code-block-line-height);
          overflow-x: auto;
          max-height: var(--esds-code-block-max-height);
          overflow-y: auto;
        }

        .code-content code {
          font-family: inherit;
          font-size: inherit;
          color: inherit;
          background: none;
          padding: 0;
          border-radius: 0;
        }

        .line-numbers {
          position: absolute;
          top: 0;
          left: 0;
          padding: var(--esds-code-block-padding) 0;
          padding-right: var(--elvt-primitives-spacing-sm);
          background: var(--elvt-alias-background-tertiary, var(--elvt-primitives-color-gray-50));
          border-right: 1px solid var(--esds-code-block-border-color);
          color: var(--elvt-alias-text-tertiary, var(--elvt-primitives-color-gray-500));
          font-size: var(--elvt-primitives-font-size-xs);
          line-height: var(--esds-code-block-line-height);
          text-align: right;
          user-select: none;
          pointer-events: none;
          width: 3rem;
        }

        .code-content pre[class*="language-"] {
          padding-left: calc(3rem + var(--esds-code-block-padding));
        }

        .line-number {
          padding-right: var(--elvt-primitives-spacing-xs);
        }

        .line-number.highlighted {
          background: var(--elvt-alias-color-primary-light, var(--elvt-primitives-color-blue-50));
          color: var(--elvt-alias-color-primary, var(--elvt-primitives-color-blue-600));
          font-weight: var(--elvt-primitives-font-weight-medium);
        }

        /* Syntax Highlighting Overrides */
        .esds-code-block .token.comment,
        .esds-code-block .token.prolog,
        .esds-code-block .token.doctype,
        .esds-code-block .token.cdata {
          color: var(--esds-primitives-color-syntax-comment, #6a737d);
        }

        .esds-code-block .token.punctuation {
          color: var(--esds-code-block-color);
        }

        .esds-code-block .token.property,
        .esds-code-block .token.tag,
        .esds-code-block .token.boolean,
        .esds-code-block .token.number,
        .esds-code-block .token.constant,
        .esds-code-block .token.symbol,
        .esds-code-block .token.deleted {
          color: var(--esds-primitives-color-syntax-keyword, #d73a49);
        }

        .esds-code-block .token.selector,
        .esds-code-block .token.attr-name,
        .esds-code-block .token.string,
        .esds-code-block .token.char,
        .esds-code-block .token.builtin,
        .esds-code-block .token.inserted {
          color: var(--esds-primitives-color-syntax-string, #032f62);
        }

        .esds-code-block .token.operator,
        .esds-code-block .token.entity,
        .esds-code-block .token.url,
        .esds-code-block .language-css .token.string,
        .esds-code-block .style .token.string {
          color: var(--esds-primitives-color-syntax-variable, #e36209);
        }

        .esds-code-block .token.atrule,
        .esds-code-block .token.attr-value,
        .esds-code-block .token.keyword {
          color: var(--esds-primitives-color-syntax-function, #6f42c1);
        }

        .esds-code-block .token.function,
        .esds-code-block .token.class-name {
          color: var(--esds-primitives-color-syntax-function, #6f42c1);
        }

        /* Dark Theme Syntax Colors */
        :global(.esds-theme-dark) .esds-code-block .token.comment,
        :global(.esds-theme-dark) .esds-code-block .token.prolog,
        :global(.esds-theme-dark) .esds-code-block .token.doctype,
        :global(.esds-theme-dark) .esds-code-block .token.cdata {
          color: var(--esds-primitives-color-syntax-comment-dark, #8b949e);
        }

        :global(.esds-theme-dark) .esds-code-block .token.property,
        :global(.esds-theme-dark) .esds-code-block .token.tag,
        :global(.esds-theme-dark) .esds-code-block .token.boolean,
        :global(.esds-theme-dark) .esds-code-block .token.number,
        :global(.esds-theme-dark) .esds-code-block .token.constant,
        :global(.esds-theme-dark) .esds-code-block .token.symbol,
        :global(.esds-theme-dark) .esds-code-block .token.deleted {
          color: var(--esds-primitives-color-syntax-keyword-dark, #ff7b72);
        }

        :global(.esds-theme-dark) .esds-code-block .token.selector,
        :global(.esds-theme-dark) .esds-code-block .token.attr-name,
        :global(.esds-theme-dark) .esds-code-block .token.string,
        :global(.esds-theme-dark) .esds-code-block .token.char,
        :global(.esds-theme-dark) .esds-code-block .token.builtin,
        :global(.esds-theme-dark) .esds-code-block .token.inserted {
          color: var(--esds-primitives-color-syntax-string-dark, #a5d6ff);
        }

        :global(.esds-theme-dark) .esds-code-block .token.operator,
        :global(.esds-theme-dark) .esds-code-block .token.entity,
        :global(.esds-theme-dark) .esds-code-block .token.url,
        :global(.esds-theme-dark) .esds-code-block .language-css .token.string,
        :global(.esds-theme-dark) .esds-code-block .style .token.string {
          color: var(--esds-primitives-color-syntax-variable-dark, #ffa657);
        }

        :global(.esds-theme-dark) .esds-code-block .token.atrule,
        :global(.esds-theme-dark) .esds-code-block .token.attr-value,
        :global(.esds-theme-dark) .esds-code-block .token.keyword {
          color: var(--esds-primitives-color-syntax-function-dark, #d2a8ff);
        }

        :global(.esds-theme-dark) .esds-code-block .token.function,
        :global(.esds-theme-dark) .esds-code-block .token.class-name {
          color: var(--esds-primitives-color-syntax-function-dark, #d2a8ff);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .code-header {
            flex-direction: column;
            gap: var(--elvt-primitives-spacing-sm);
            align-items: flex-start;
          }
          
          .copy-button {
            align-self: flex-end;
          }

          .code-content pre {
            font-size: var(--elvt-primitives-font-size-sm);
          }

          .line-numbers {
            width: 2.5rem;
          }

          .code-content pre[class*="language-"] {
            padding-left: calc(2.5rem + var(--elvt-primitives-spacing-sm));
          }
        }

        /* High Contrast Mode */
        @media (prefers-contrast: high) {
          .copy-button:focus-visible {
            outline: 3px solid;
            outline-offset: 2px;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .copy-button {
            transition: none;
          }
        }
      `}</style>
    </div>
  )
}

export default EsdsCodeBlock