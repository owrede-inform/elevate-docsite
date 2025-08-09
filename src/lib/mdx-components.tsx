import React from 'react'
import { MDXComponents } from '@mdx-js/react'

// Import all ESDS components
import {
  EsdsLiveExample,
  EsdsCodeBlock,
  EsdsStatusBadge,
  EsdsTokenTable,
  EsdsThemeToggle
} from '../components/esds'

/**
 * MDX Components Provider
 * 
 * Enhanced HTML elements and custom ESDS components for MDX content.
 * This provider maps standard HTML elements to ESDS-styled versions
 * and makes all ESDS components available in MDX files.
 */

// Enhanced HTML elements with ESDS token styling
const enhancedElements = {
  // Headers with ESDS typography tokens
  h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 
      {...props}
      style={{
        color: 'var(--esds-alias-color-text-primary)',
        fontSize: 'var(--esds-alias-typography-heading-1-size)',
        fontWeight: 'var(--esds-alias-typography-heading-weight)',
        lineHeight: 'var(--esds-alias-typography-heading-1-line-height)',
        marginBottom: 'var(--esds-alias-spacing-lg)',
        ...props.style
      }}
    >
      {children}
    </h1>
  ),

  h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 
      {...props}
      style={{
        color: 'var(--esds-alias-color-text-primary)',
        fontSize: 'var(--esds-alias-typography-heading-2-size)',
        fontWeight: 'var(--esds-alias-typography-heading-weight)',
        lineHeight: 'var(--esds-alias-typography-heading-2-line-height)',
        marginTop: 'var(--esds-alias-spacing-xl)',
        marginBottom: 'var(--esds-alias-spacing-md)',
        ...props.style
      }}
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 
      {...props}
      style={{
        color: 'var(--esds-alias-color-text-primary)',
        fontSize: 'var(--esds-alias-typography-heading-3-size)',
        fontWeight: 'var(--esds-alias-typography-heading-weight)',
        lineHeight: 'var(--esds-alias-typography-heading-3-line-height)',
        marginTop: 'var(--esds-alias-spacing-lg)',
        marginBottom: 'var(--esds-alias-spacing-sm)',
        ...props.style
      }}
    >
      {children}
    </h3>
  ),

  h4: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h4 
      {...props}
      style={{
        color: 'var(--esds-alias-color-text-primary)',
        fontSize: 'var(--esds-alias-typography-heading-4-size)',
        fontWeight: 'var(--esds-alias-typography-heading-weight)',
        lineHeight: 'var(--esds-alias-typography-heading-4-line-height)',
        marginTop: 'var(--esds-alias-spacing-md)',
        marginBottom: 'var(--esds-alias-spacing-sm)',
        ...props.style
      }}
    >
      {children}
    </h4>
  ),

  h5: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h5 
      {...props}
      style={{
        color: 'var(--esds-alias-color-text-primary)',
        fontSize: 'var(--esds-alias-typography-heading-5-size)',
        fontWeight: 'var(--esds-alias-typography-heading-weight)',
        lineHeight: 'var(--esds-alias-typography-heading-5-line-height)',
        marginTop: 'var(--esds-alias-spacing-md)',
        marginBottom: 'var(--esds-alias-spacing-xs)',
        ...props.style
      }}
    >
      {children}
    </h5>
  ),

  h6: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h6 
      {...props}
      style={{
        color: 'var(--esds-alias-color-text-secondary)',
        fontSize: 'var(--esds-alias-typography-heading-6-size)',
        fontWeight: 'var(--esds-alias-typography-heading-weight)',
        lineHeight: 'var(--esds-alias-typography-heading-6-line-height)',
        marginTop: 'var(--esds-alias-spacing-sm)',
        marginBottom: 'var(--esds-alias-spacing-xs)',
        ...props.style
      }}
    >
      {children}
    </h6>
  ),

  // Body text with ESDS typography
  p: ({ children, ...props }: React.HTMLProps<HTMLParagraphElement>) => (
    <p 
      {...props}
      style={{
        color: 'var(--esds-alias-color-text-primary)',
        fontSize: 'var(--esds-alias-typography-body-size)',
        lineHeight: 'var(--esds-alias-typography-body-line-height)',
        marginBottom: 'var(--esds-alias-spacing-md)',
        ...props.style
      }}
    >
      {children}
    </p>
  ),

  // Links with ESDS interactive colors
  a: ({ children, ...props }: React.HTMLProps<HTMLAnchorElement>) => (
    <a 
      {...props}
      style={{
        color: 'var(--esds-alias-color-interactive-primary)',
        textDecoration: 'underline',
        textDecorationColor: 'var(--esds-alias-color-interactive-primary)',
        transition: 'color var(--esds-alias-transition-standard)',
        ...props.style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--esds-alias-color-interactive-primary-hover)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--esds-alias-color-interactive-primary)'
      }}
    >
      {children}
    </a>
  ),

  // Inline code with ESDS styling
  code: ({ children, ...props }: React.HTMLProps<HTMLElement>) => (
    <code 
      {...props}
      style={{
        backgroundColor: 'var(--esds-alias-color-surface-secondary)',
        color: 'var(--esds-alias-color-text-code)',
        fontSize: 'var(--esds-alias-typography-code-size)',
        fontFamily: 'var(--esds-alias-typography-code-family)',
        padding: 'var(--esds-alias-spacing-xs) var(--esds-alias-spacing-sm)',
        borderRadius: 'var(--esds-alias-border-radius-sm)',
        border: '1px solid var(--esds-alias-color-border-subtle)',
        ...props.style
      }}
    >
      {children}
    </code>
  ),

  // Block quotes with ESDS styling
  blockquote: ({ children, ...props }: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote 
      {...props}
      style={{
        backgroundColor: 'var(--esds-alias-color-surface-secondary)',
        borderLeft: '4px solid var(--esds-alias-color-interactive-primary)',
        padding: 'var(--esds-alias-spacing-md) var(--esds-alias-spacing-lg)',
        margin: 'var(--esds-alias-spacing-md) 0',
        borderRadius: '0 var(--esds-alias-border-radius-md) var(--esds-alias-border-radius-md) 0',
        fontStyle: 'italic',
        color: 'var(--esds-alias-color-text-secondary)',
        ...props.style
      }}
    >
      {children}
    </blockquote>
  ),

  // Lists with ESDS spacing
  ul: ({ children, ...props }: React.HTMLProps<HTMLUListElement>) => (
    <ul 
      {...props}
      style={{
        paddingLeft: 'var(--esds-alias-spacing-lg)',
        marginBottom: 'var(--esds-alias-spacing-md)',
        color: 'var(--esds-alias-color-text-primary)',
        ...props.style
      }}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: React.HTMLProps<HTMLOListElement>) => (
    <ol 
      {...props}
      style={{
        paddingLeft: 'var(--esds-alias-spacing-lg)',
        marginBottom: 'var(--esds-alias-spacing-md)',
        color: 'var(--esds-alias-color-text-primary)',
        ...props.style
      }}
    >
      {children}
    </ol>
  ),

  li: ({ children, ...props }: React.HTMLProps<HTMLLIElement>) => (
    <li 
      {...props}
      style={{
        marginBottom: 'var(--esds-alias-spacing-xs)',
        lineHeight: 'var(--esds-alias-typography-body-line-height)',
        ...props.style
      }}
    >
      {children}
    </li>
  ),

  // Tables with ESDS styling
  table: ({ children, ...props }: React.HTMLProps<HTMLTableElement>) => (
    <div style={{ 
      overflowX: 'auto',
      marginBottom: 'var(--esds-alias-spacing-lg)',
      border: '1px solid var(--esds-alias-color-border-default)',
      borderRadius: 'var(--esds-alias-border-radius-md)'
    }}>
      <table 
        {...props}
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 'var(--esds-alias-typography-body-size)',
          ...props.style
        }}
      >
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }: React.HTMLProps<HTMLTableCellElement>) => (
    <th 
      {...props}
      style={{
        backgroundColor: 'var(--esds-alias-color-surface-secondary)',
        color: 'var(--esds-alias-color-text-primary)',
        fontWeight: 'var(--esds-alias-typography-heading-weight)',
        padding: 'var(--esds-alias-spacing-sm) var(--esds-alias-spacing-md)',
        borderBottom: '2px solid var(--esds-alias-color-border-default)',
        textAlign: 'left',
        ...props.style
      }}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }: React.HTMLProps<HTMLTableCellElement>) => (
    <td 
      {...props}
      style={{
        padding: 'var(--esds-alias-spacing-sm) var(--esds-alias-spacing-md)',
        borderBottom: '1px solid var(--esds-alias-color-border-subtle)',
        color: 'var(--esds-alias-color-text-primary)',
        ...props.style
      }}
    >
      {children}
    </td>
  ),

  // Horizontal rule with ESDS styling
  hr: ({ ...props }: React.HTMLProps<HTMLHRElement>) => (
    <hr 
      {...props}
      style={{
        border: 'none',
        height: '1px',
        backgroundColor: 'var(--esds-alias-color-border-default)',
        margin: 'var(--esds-alias-spacing-xl) 0',
        ...props.style
      }}
    />
  ),

  // Pre-formatted code blocks (will be overridden by EsdsCodeBlock when used directly)
  pre: ({ children, ...props }: React.HTMLProps<HTMLPreElement>) => (
    <pre 
      {...props}
      style={{
        backgroundColor: 'var(--esds-alias-color-surface-code)',
        color: 'var(--esds-alias-color-text-code)',
        fontFamily: 'var(--esds-alias-typography-code-family)',
        fontSize: 'var(--esds-alias-typography-code-size)',
        lineHeight: 'var(--esds-alias-typography-code-line-height)',
        padding: 'var(--esds-alias-spacing-md)',
        borderRadius: 'var(--esds-alias-border-radius-md)',
        border: '1px solid var(--esds-alias-color-border-subtle)',
        overflow: 'auto',
        marginBottom: 'var(--esds-alias-spacing-md)',
        ...props.style
      }}
    >
      {children}
    </pre>
  )
}

// Custom ESDS components available in MDX
const esdsComponents = {
  EsdsLiveExample,
  EsdsCodeBlock,
  EsdsStatusBadge,  
  EsdsTokenTable,
  EsdsThemeToggle,
  
  // Aliases for easier use in MDX
  LiveExample: EsdsLiveExample,
  CodeBlock: EsdsCodeBlock,
  StatusBadge: EsdsStatusBadge,
  TokenTable: EsdsTokenTable,
  ThemeToggle: EsdsThemeToggle
}

// Combined MDX components
export const mdxComponents: MDXComponents = {
  ...enhancedElements,
  ...esdsComponents
}

export default mdxComponents