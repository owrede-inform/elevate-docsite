import React from 'react'

interface EsdsStatusBadgeProps {
  status: 'stable' | 'beta' | 'alpha' | 'deprecated' | 'new'
  className?: string
  size?: 'small' | 'medium'
}

/**
 * ESDS Status Badge Component
 * 
 * Displays the status of components, patterns, or features with
 * appropriate colors and styling.
 */
const EsdsStatusBadge: React.FC<EsdsStatusBadgeProps> = ({
  status,
  className = '',
  size = 'medium'
}) => {
  const getStatusConfig = (status: string) => {
    const configs = {
      stable: {
        label: 'Stable',
        description: 'Production ready'
      },
      beta: {
        label: 'Beta',
        description: 'Feature complete, testing phase'
      },
      alpha: {
        label: 'Alpha',
        description: 'Early development, subject to change'
      },
      deprecated: {
        label: 'Deprecated',
        description: 'No longer recommended for use'
      },
      new: {
        label: 'New',
        description: 'Recently added feature'
      }
    }
    return configs[status as keyof typeof configs] || configs.stable
  }

  const config = getStatusConfig(status)

  return (
    <span 
      className={`esds-status-badge esds-status-${status} size-${size} ${className}`}
      title={config.description}
      role="status"
      aria-label={`Status: ${config.label} - ${config.description}`}
    >
      {config.label}
      
      <style>{`
        .esds-status-badge {
          display: inline-flex;
          align-items: center;
          padding: var(--esds-status-badge-padding);
          font-size: var(--esds-status-badge-font-size);
          font-weight: var(--esds-status-badge-font-weight);
          font-family: var(--esds-alias-font-family-primary);
          border-radius: var(--esds-status-badge-radius);
          text-transform: uppercase;
          letter-spacing: 0.025em;
          line-height: 1;
          white-space: nowrap;
        }

        .size-small {
          padding: 0.125rem 0.375rem;
          font-size: 0.6875rem;
        }

        .size-medium {
          padding: var(--esds-status-badge-padding);
          font-size: var(--esds-status-badge-font-size);
        }

        .esds-status-stable {
          background: var(--esds-status-stable-background);
          color: var(--esds-status-stable-color);
        }

        .esds-status-beta {
          background: var(--esds-status-beta-background);
          color: var(--esds-status-beta-color);
        }

        .esds-status-alpha {
          background: var(--esds-status-alpha-background);
          color: var(--esds-status-alpha-color);
        }

        .esds-status-deprecated {
          background: var(--esds-status-deprecated-background);
          color: var(--esds-status-deprecated-color);
        }

        .esds-status-new {
          background: var(--esds-status-new-background);
          color: var(--esds-status-new-color);
        }
      `}</style>
    </span>
  )
}

export default EsdsStatusBadge