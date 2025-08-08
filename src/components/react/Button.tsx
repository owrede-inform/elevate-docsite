import React, { useEffect, useRef } from 'react'
import type { ButtonVariant, ButtonSize } from '../esds/register-components'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  href?: string
  target?: string
  icon?: string
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  children: React.ReactNode
  className?: string
  onClick?: (event: CustomEvent) => void
}

/**
 * React wrapper for elevate-button WebComponent
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  href,
  target,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className,
  onClick
}) => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set properties directly on the element
    ;(element as any).variant = variant
    ;(element as any).size = size
    ;(element as any).disabled = disabled
    ;(element as any).loading = loading
    ;(element as any).href = href
    ;(element as any).target = target
    ;(element as any).icon = icon
    ;(element as any).iconPosition = iconPosition
    ;(element as any).fullWidth = fullWidth
  }, [variant, size, disabled, loading, href, target, icon, iconPosition, fullWidth])

  useEffect(() => {
    const element = elementRef.current
    if (!element || !onClick) return

    const handleClick = (event: CustomEvent) => {
      onClick(event)
    }

    element.addEventListener('elevate-button-click', handleClick as EventListener)
    return () => element.removeEventListener('elevate-button-click', handleClick as EventListener)
  }, [onClick])

  return (
    <elevate-button
      ref={elementRef}
      className={className}
    >
      {children}
    </elevate-button>
  )
}

export default Button