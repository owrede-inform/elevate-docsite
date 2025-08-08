import React, { useEffect, useRef } from 'react'
import type { ContainerSize } from '../esds/register-components'

interface ContainerProps {
  size?: ContainerSize
  padding?: boolean
  centered?: boolean
  children: React.ReactNode
  className?: string
}

/**
 * React wrapper for elevate-container WebComponent
 */
export const Container: React.FC<ContainerProps> = ({
  size = 'lg',
  padding = true,
  centered = true,
  children,
  className
}) => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set properties directly on the element
    ;(element as any).size = size
    ;(element as any).padding = padding
    ;(element as any).centered = centered
  }, [size, padding, centered])

  return (
    <elevate-container
      ref={elementRef}
      className={className}
    >
      {children}
    </elevate-container>
  )
}

export default Container