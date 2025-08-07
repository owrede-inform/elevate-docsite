import React, { useEffect, useRef } from 'react'
import type { PatternCardData } from '../esds/register-components'

interface PatternCardProps {
  pattern: PatternCardData
  interactive?: boolean
  size?: 'small' | 'medium' | 'large'
  className?: string
  onPatternSelect?: (pattern: PatternCardData) => void
  onComponentSelect?: (componentName: string) => void
}

/**
 * React wrapper for esds-pattern-card WebComponent
 */
export const PatternCard: React.FC<PatternCardProps> = ({
  pattern,
  interactive = true,
  size = 'medium',
  className,
  onPatternSelect,
  onComponentSelect
}) => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set properties directly on the element
    ;(element as any).pattern = pattern
    ;(element as any).interactive = interactive
    ;(element as any).size = size
  }, [pattern, interactive, size])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handlePatternSelect = (event: CustomEvent) => {
      if (onPatternSelect) {
        onPatternSelect(event.detail.pattern)
      }
    }

    const handleComponentSelect = (event: CustomEvent) => {
      if (onComponentSelect) {
        onComponentSelect(event.detail.componentName)
      }
    }

    element.addEventListener('pattern-select', handlePatternSelect as EventListener)
    element.addEventListener('component-select', handleComponentSelect as EventListener)

    return () => {
      element.removeEventListener('pattern-select', handlePatternSelect as EventListener)
      element.removeEventListener('component-select', handleComponentSelect as EventListener)
    }
  }, [onPatternSelect, onComponentSelect])

  return (
    <esds-pattern-card
      ref={elementRef}
      className={className}
    />
  )
}

export default PatternCard