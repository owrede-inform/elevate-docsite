import React from 'react'
import { resolveIcon, generateSVG, type IconDetail } from '@/utils/icons'

export interface EsdsIconProps {
  /** 
   * Icon specification - supports:
   * - MDI icons: "mdi:icon-name" (e.g., "mdi:chevron-left")
   * - SVG paths: Direct SVG path string
   * - SVG strings: Full SVG markup
   * - URLs: HTTP/HTTPS URLs or data URLs
   */
  icon: string
  
  /** 
   * Icon size in pixels 
   * @default 24
   */
  size?: number
  
  /** 
   * CSS class name to apply to the icon 
   */
  className?: string
  
  /** 
   * Icon color (CSS color value)
   */
  color?: string
  
  /** 
   * Accessibility label for screen readers 
   */
  label?: string
  
  /** 
   * Whether the icon is decorative (hidden from screen readers)
   * @default false
   */
  decorative?: boolean
  
  /** 
   * Click handler for interactive icons 
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  
  /** 
   * Custom styles 
   */
  style?: React.CSSProperties
}

/**
 * EsdsIcon Component
 * 
 * A flexible icon component that supports MDI icons, custom SVG paths, 
 * SVG strings, and external icon URLs. Follows ESDS design principles
 * and integrates with the ELEVATE design system.
 * 
 * @example
 * // MDI icon
 * <EsdsIcon icon="mdi:chevron-left" size={20} />
 * 
 * // Custom SVG path
 * <EsdsIcon icon="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
 * 
 * // External URL
 * <EsdsIcon icon="/icons/custom-icon.svg" size={32} />
 */
const EsdsIcon: React.FC<EsdsIconProps> = ({
  icon,
  size = 24,
  className = '',
  color,
  label,
  decorative = false,
  onClick,
  style,
}) => {
  const iconDetail: IconDetail = resolveIcon(icon)
  
  // If it's a URL (including data URLs), use img element
  if (iconDetail.url) {
    return (
      <img
        src={iconDetail.url}
        alt={decorative ? '' : (label || 'Icon')}
        className={`esds-icon ${className}`}
        width={size}
        height={size}
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          color,
          cursor: onClick ? 'pointer' : undefined,
          ...style
        }}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick(e as any)
          }
        } : undefined}
      />
    )
  }

  // For SVG content (paths or full SVG strings)
  const svgContent = iconDetail.svg || (iconDetail.path ? 
    `<path d="${iconDetail.path}" />` : 
    ''
  )
  
  const viewBox = iconDetail.viewBox || '0 0 24 24'
  
  // Build accessibility attributes
  const accessibilityProps = decorative 
    ? { 'aria-hidden': true }
    : { 
        role: 'img', 
        'aria-label': label || 'Icon',
        ...(onClick && { role: 'button', tabIndex: 0 })
      }

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="currentColor"
      className={`esds-icon ${className}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        color,
        cursor: onClick ? 'pointer' : undefined,
        ...style
      }}
      onClick={onClick}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(e as any)
        }
      } : undefined}
      {...accessibilityProps}
    >
      {iconDetail.svg ? (
        // For full SVG strings, parse and render content
        <g dangerouslySetInnerHTML={{ __html: svgContent.replace(/<\/?svg[^>]*>/g, '') }} />
      ) : (
        // For paths, render directly
        <path d={iconDetail.path || ''} />
      )}
    </svg>
  )
}

export default EsdsIcon