import React from 'react'

interface TokenData {
  name: string
  value: string
  description: string
  category: string
}

interface EsdsTokenTableProps {
  category?: 'color' | 'spacing' | 'typography' | 'all'
  component?: string
  tokens?: TokenData[]
  className?: string
}

/**
 * ESDS Token Table Component
 * 
 * Displays design tokens in a structured table format with
 * visual previews and descriptions.
 */
const EsdsTokenTable: React.FC<EsdsTokenTableProps> = ({
  category = 'all',
  component,
  tokens = [],
  className = ''
}) => {
  // Sample token data - in a real implementation, this would come from config
  const getTokenData = (): TokenData[] => {
    if (tokens.length > 0) return tokens

    const sampleTokens: TokenData[] = [
      // Color tokens
      {
        name: '--elvt-alias-color-primary',
        value: '#2563eb',
        description: 'Primary brand color for main actions and key interface elements',
        category: 'color'
      },
      {
        name: '--elvt-alias-color-secondary',
        value: '#0d9488',
        description: 'Secondary brand color for supporting actions and accents',
        category: 'color'
      },
      {
        name: '--elvt-alias-text-primary',
        value: '#111827',
        description: 'Primary text color for headings and body content',
        category: 'color'
      },
      {
        name: '--elvt-alias-text-secondary',
        value: '#4b5563',
        description: 'Secondary text color for supporting content and captions',
        category: 'color'
      },
      // Spacing tokens
      {
        name: '--elvt-primitives-spacing-xs',
        value: '0.25rem',
        description: 'Extra small spacing for tight layouts and fine details',
        category: 'spacing'
      },
      {
        name: '--elvt-primitives-spacing-sm',
        value: '0.5rem',
        description: 'Small spacing for compact elements and close relationships',
        category: 'spacing'
      },
      {
        name: '--elvt-primitives-spacing-md',
        value: '1rem',
        description: 'Medium spacing for general component padding and gaps',
        category: 'spacing'
      },
      {
        name: '--elvt-primitives-spacing-lg',
        value: '1.5rem',
        description: 'Large spacing for section separation and prominent gaps',
        category: 'spacing'
      },
      // Typography tokens
      {
        name: '--elvt-primitives-font-size-sm',
        value: '0.875rem',
        description: 'Small font size for captions, labels, and secondary text',
        category: 'typography'
      },
      {
        name: '--elvt-primitives-font-size-base',
        value: '1rem',
        description: 'Base font size for body text and general content',
        category: 'typography'
      },
      {
        name: '--elvt-primitives-font-size-lg',
        value: '1.125rem',
        description: 'Large font size for subheadings and prominent text',
        category: 'typography'
      },
      {
        name: '--elvt-primitives-font-weight-regular',
        value: '400',
        description: 'Regular font weight for body text and general content',
        category: 'typography'
      }
    ]

    return category === 'all' 
      ? sampleTokens 
      : sampleTokens.filter(token => token.category === category)
  }

  const tokenData = getTokenData()

  const renderTokenPreview = (token: TokenData) => {
    switch (token.category) {
      case 'color':
        return (
          <div className="token-color-preview">
            <div 
              className="color-swatch"
              style={{ backgroundColor: `var(${token.name}, ${token.value})` }}
              title={`${token.name}: ${token.value}`}
            />
            <span className="color-value">{token.value}</span>
          </div>
        )
      
      case 'spacing':
        return (
          <div className="token-spacing-preview">
            <div 
              className="spacing-bar"
              style={{ width: `var(${token.name}, ${token.value})` }}
              title={`${token.name}: ${token.value}`}
            />
            <span className="spacing-value">{token.value}</span>
          </div>
        )
      
      case 'typography':
        if (token.name.includes('font-size')) {
          return (
            <div className="token-typography-preview">
              <span 
                className="typography-sample"
                style={{ fontSize: `var(${token.name}, ${token.value})` }}
                title={`${token.name}: ${token.value}`}
              >
                Aa
              </span>
              <span className="typography-value">{token.value}</span>
            </div>
          )
        }
        if (token.name.includes('font-weight')) {
          return (
            <div className="token-typography-preview">
              <span 
                className="typography-sample"
                style={{ fontWeight: `var(${token.name}, ${token.value})` }}
                title={`${token.name}: ${token.value}`}
              >
                Aa
              </span>
              <span className="typography-value">{token.value}</span>
            </div>
          )
        }
        return <span className="token-value">{token.value}</span>
      
      default:
        return <span className="token-value">{token.value}</span>
    }
  }

  if (tokenData.length === 0) {
    return (
      <div className="esds-token-table-empty">
        <p>No tokens available for the selected category.</p>
      </div>
    )
  }

  return (
    <div className={`esds-token-table ${className}`}>
      {component && (
        <div className="table-header">
          <h4>Design Tokens for {component}</h4>
          {category !== 'all' && (
            <span className="category-badge">{category}</span>
          )}
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Token Name</th>
              <th>Preview</th>
              <th>Description</th>
              {category === 'all' && <th>Category</th>}
            </tr>
          </thead>
          <tbody>
            {tokenData.map((token, index) => (
              <tr key={index}>
                <td>
                  <code className="token-name">{token.name}</code>
                </td>
                <td className="token-preview-cell">
                  {renderTokenPreview(token)}
                </td>
                <td className="token-description">
                  {token.description}
                </td>
                {category === 'all' && (
                  <td>
                    <span className={`category-tag category-${token.category}`}>
                      {token.category}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .esds-token-table {
          background: var(--esds-token-table-background);
          border: var(--esds-token-table-border-width) solid var(--esds-token-table-border-color);
          border-radius: var(--esds-token-table-border-radius);
          overflow: hidden;
          margin: var(--elvt-primitives-spacing-lg) 0;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--elvt-primitives-spacing-md) var(--elvt-primitives-spacing-lg);
          background: var(--esds-token-table-header-background);
          border-bottom: 1px solid var(--esds-token-table-border-color);
        }

        .table-header h4 {
          margin: 0;
          color: var(--esds-token-table-header-color);
          font-weight: var(--esds-token-table-header-font-weight);
          font-size: var(--elvt-primitives-font-size-lg);
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.5rem;
          background: var(--elvt-alias-color-primary);
          color: white;
          border-radius: var(--elvt-primitives-radius-sm);
          font-size: var(--elvt-primitives-font-size-xs);
          font-weight: var(--elvt-primitives-font-weight-medium);
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .table-container {
          overflow-x: auto;
        }

        .esds-token-table table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--elvt-primitives-font-size-sm);
        }

        .esds-token-table th {
          background: var(--esds-token-table-header-background);
          color: var(--esds-token-table-header-color);
          font-weight: var(--esds-token-table-header-font-weight);
          text-align: left;
          padding: var(--esds-token-table-cell-padding);
          border-bottom: 1px solid var(--esds-token-table-row-border-color);
        }

        .esds-token-table td {
          padding: var(--esds-token-table-cell-padding);
          border-bottom: 1px solid var(--esds-token-table-row-border-color);
          vertical-align: top;
        }

        .esds-token-table tbody tr:last-child td {
          border-bottom: none;
        }

        .esds-token-table tbody tr:hover {
          background: var(--elvt-alias-surface-hover, var(--elvt-primitives-color-gray-50));
        }

        .token-name {
          font-family: var(--esds-alias-font-family-code);
          font-size: var(--elvt-primitives-font-size-xs);
          background: var(--elvt-primitives-color-gray-100);
          padding: 0.125rem 0.25rem;
          border-radius: var(--elvt-primitives-radius-sm);
          color: var(--elvt-primitives-color-gray-800);
          white-space: nowrap;
        }

        .token-preview-cell {
          min-width: 120px;
        }

        .token-description {
          color: var(--elvt-alias-text-secondary);
          line-height: var(--elvt-primitives-line-height-normal);
        }

        /* Token Preview Styles */
        .token-color-preview {
          display: flex;
          align-items: center;
          gap: var(--elvt-primitives-spacing-sm);
        }

        .color-swatch {
          width: 24px;
          height: 24px;
          border-radius: var(--elvt-primitives-radius-sm);
          border: 1px solid var(--elvt-alias-border-light);
          flex-shrink: 0;
        }

        .color-value {
          font-family: var(--esds-alias-font-family-code);
          font-size: var(--elvt-primitives-font-size-xs);
          color: var(--elvt-alias-text-secondary);
        }

        .token-spacing-preview {
          display: flex;
          align-items: center;
          gap: var(--elvt-primitives-spacing-sm);
        }

        .spacing-bar {
          height: 4px;
          background: var(--elvt-alias-color-primary);
          border-radius: var(--elvt-primitives-radius-sm);
          min-width: 4px;
          max-width: 100px;
        }

        .spacing-value {
          font-family: var(--esds-alias-font-family-code);
          font-size: var(--elvt-primitives-font-size-xs);
          color: var(--elvt-alias-text-secondary);
          white-space: nowrap;
        }

        .token-typography-preview {
          display: flex;
          align-items: center;
          gap: var(--elvt-primitives-spacing-sm);
        }

        .typography-sample {
          font-family: var(--esds-alias-font-family-primary);
          color: var(--elvt-alias-text-primary);
        }

        .typography-value {
          font-family: var(--esds-alias-font-family-code);
          font-size: var(--elvt-primitives-font-size-xs);
          color: var(--elvt-alias-text-secondary);
        }

        .token-value {
          font-family: var(--esds-alias-font-family-code);
          font-size: var(--elvt-primitives-font-size-xs);
          color: var(--elvt-alias-text-secondary);
        }

        .category-tag {
          display: inline-flex;
          padding: 0.125rem 0.375rem;
          border-radius: var(--elvt-primitives-radius-sm);
          font-size: var(--elvt-primitives-font-size-xs);
          font-weight: var(--elvt-primitives-font-weight-medium);
          text-transform: capitalize;
        }

        .category-color {
          background: var(--elvt-primitives-color-red-100);
          color: var(--elvt-primitives-color-red-800);
        }

        .category-spacing {
          background: var(--elvt-primitives-color-blue-100);
          color: var(--elvt-primitives-color-blue-800);
        }

        .category-typography {
          background: var(--elvt-primitives-color-purple-100);
          color: var(--elvt-primitives-color-purple-800);
        }

        /* Empty State */
        .esds-token-table-empty {
          padding: var(--elvt-primitives-spacing-xl);
          text-align: center;
          color: var(--elvt-alias-text-secondary);
          background: var(--elvt-alias-background-secondary);
          border: 1px solid var(--elvt-alias-border-light);
          border-radius: var(--elvt-primitives-radius-lg);
          margin: var(--elvt-primitives-spacing-lg) 0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .table-header {
            flex-direction: column;
            gap: var(--elvt-primitives-spacing-sm);
            align-items: flex-start;
          }

          .esds-token-table th,
          .esds-token-table td {
            padding: var(--elvt-primitives-spacing-sm);
          }

          .token-name {
            font-size: 0.6875rem;
          }

          /* Stack token preview on mobile */
          .token-color-preview,
          .token-spacing-preview,
          .token-typography-preview {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
          }
        }

        /* High Contrast Mode */
        @media (prefers-contrast: high) {
          .color-swatch {
            border: 2px solid;
          }
          
          .spacing-bar {
            border: 1px solid;
          }
        }
      `}</style>
    </div>
  )
}

export default EsdsTokenTable