import React from 'react'
import { ComponentPreview, GitHubLink } from '@/components/react'

/**
 * MDX Components
 * 
 * Custom components available in MDX files
 */

// Enhanced code block component
const CodeBlock: React.FC<{ children: string; className?: string; title?: string }> = ({ 
  children, 
  className = '', 
  title = 'Code Example'
}) => {
  const language = className.replace('language-', '') || 'text'
  
  return (
    <ComponentPreview
      code={children.trim()}
      language={language}
      title={title}
      preview={['tsx', 'jsx', 'html'].includes(language)}
      showCopy={true}
    />
  )
}

// Enhanced heading with GitHub link support
const Heading: React.FC<{ 
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  id?: string
  'data-github-issue'?: string
}> = ({ level, children, id, 'data-github-issue': githubIssue, ...props }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  
  return (
    <HeadingTag id={id} {...props} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {children}
      {githubIssue && (
        <GitHubLink
          issueNumber={githubIssue}
          size="small"
          text=""
          title={`Discuss: ${children}`}
        />
      )}
    </HeadingTag>
  )
}

// Enhanced paragraph with GitHub link support
const Paragraph: React.FC<{ 
  children: React.ReactNode
  'data-github-issue'?: string
}> = ({ children, 'data-github-issue': githubIssue, ...props }) => {
  return (
    <p {...props} style={{ position: 'relative' }}>
      {children}
      {githubIssue && (
        <GitHubLink
          issueNumber={githubIssue}
          size="small"
          text=""
          title="Discuss this section"
          style={{ marginLeft: '0.5rem', verticalAlign: 'super' }}
        />
      )}
    </p>
  )
}

// Component showcase for documenting ELEVATE components
const ComponentShowcase: React.FC<{
  name: string
  description?: string
  children?: React.ReactNode
}> = ({ name, description, children }) => {
  return (
    <div style={{
      padding: '2rem',
      border: '1px solid var(--elevate-color-border-light, #e9ecef)',
      borderRadius: '0.5rem',
      margin: '2rem 0',
      background: 'var(--elevate-color-background-primary, #ffffff)'
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--elevate-color-primary, #0066cc)' }}>
          {name}
        </h3>
        {description && (
          <p style={{ margin: 0, color: 'var(--elevate-color-text-secondary, #4a4a4a)' }}>
            {description}
          </p>
        )}
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

// Do/Don't comparison component
const DosDonts: React.FC<{
  dos?: React.ReactNode[]
  donts?: React.ReactNode[]
}> = ({ dos = [], donts = [] }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      margin: '2rem 0'
    }}>
      {dos.length > 0 && (
        <div style={{
          padding: '1.5rem',
          border: '2px solid #28a745',
          borderRadius: '0.5rem',
          background: '#f8fff9'
        }}>
          <h4 style={{ 
            color: '#28a745', 
            margin: '0 0 1rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ✅ Do
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            {dos.map((item, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      
      {donts.length > 0 && (
        <div style={{
          padding: '1.5rem',
          border: '2px solid #dc3545',
          borderRadius: '0.5rem',
          background: '#fff8f8'
        }}>
          <h4 style={{ 
            color: '#dc3545', 
            margin: '0 0 1rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ❌ Don't
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            {donts.map((item, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// API table for component props
const APITable: React.FC<{
  data: Array<{
    name: string
    type: string
    required?: boolean
    default?: string
    description: string
  }>
}> = ({ data }) => {
  return (
    <div style={{ overflow: 'auto', margin: '2rem 0' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.875rem',
        border: '1px solid var(--elevate-color-border-light, #e9ecef)'
      }}>
        <thead>
          <tr style={{ background: 'var(--elevate-color-background-secondary, #f8f9fa)' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--elevate-color-border-light, #e9ecef)' }}>
              Property
            </th>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--elevate-color-border-light, #e9ecef)' }}>
              Type
            </th>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--elevate-color-border-light, #e9ecef)' }}>
              Default
            </th>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--elevate-color-border-light, #e9ecef)' }}>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} style={{ 
              borderBottom: '1px solid var(--elevate-color-border-light, #e9ecef)'
            }}>
              <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold' }}>
                {row.name}
                {row.required && <span style={{ color: '#dc3545', marginLeft: '0.25rem' }}>*</span>}
              </td>
              <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: 'var(--elevate-color-primary, #0066cc)' }}>
                {row.type}
              </td>
              <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.8em' }}>
                {row.default || '—'}
              </td>
              <td style={{ padding: '0.75rem' }}>
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * MDX component mapping
 * These components are available in all MDX files
 */
export const mdxComponents = {
  // Override default components
  pre: ({ children, ...props }: any) => {
    // Extract code from pre > code structure
    const codeElement = React.Children.toArray(children).find(
      (child: any) => child.props?.className?.startsWith('language-')
    )
    
    if (codeElement && typeof codeElement === 'object' && 'props' in codeElement) {
      return (
        <CodeBlock 
          className={codeElement.props.className} 
          title={props.title || 'Code Example'}
        >
          {codeElement.props.children}
        </CodeBlock>
      )
    }
    
    return <pre {...props}>{children}</pre>
  },
  
  // Enhanced headings
  h1: (props: any) => <Heading level={1} {...props} />,
  h2: (props: any) => <Heading level={2} {...props} />,
  h3: (props: any) => <Heading level={3} {...props} />,
  h4: (props: any) => <Heading level={4} {...props} />,
  h5: (props: any) => <Heading level={5} {...props} />,
  h6: (props: any) => <Heading level={6} {...props} />,
  
  // Enhanced paragraph
  p: Paragraph,
  
  // Custom components
  ComponentPreview,
  ComponentShowcase,
  DosDonts,
  APITable,
  GitHubLink,
}

export default mdxComponents