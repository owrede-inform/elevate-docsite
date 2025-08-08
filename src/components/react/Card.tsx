import React, { useEffect, useRef } from 'react'
import type { CardVariant } from '../esds/register-components'

interface CardProps {
  variant?: CardVariant
  interactive?: boolean
  href?: string
  target?: string
  children: React.ReactNode
  className?: string
  header?: React.ReactNode
  footer?: React.ReactNode
  onClick?: (event: CustomEvent) => void
}

/**
 * React wrapper for elevate-card WebComponent
 */
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  interactive = false,
  href,
  target,
  children,
  className,
  header,
  footer,
  onClick
}) => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set properties directly on the element
    ;(element as any).variant = variant
    ;(element as any).interactive = interactive
    ;(element as any).href = href
    ;(element as any).target = target
  }, [variant, interactive, href, target])

  useEffect(() => {
    const element = elementRef.current
    if (!element || !onClick) return

    const handleClick = (event: CustomEvent) => {
      onClick(event)
    }

    element.addEventListener('elevate-card-click', handleClick as EventListener)
    return () => element.removeEventListener('elevate-card-click', handleClick as EventListener)
  }, [onClick])

  return (
    <elevate-card
      ref={elementRef}
      className={className}
    >
      {header && <div slot="header">{header}</div>}
      {children}
      {footer && <div slot="footer">{footer}</div>}
    </elevate-card>
  )
}

export default Card