import React, { useEffect, useRef } from 'react'
import type { PatternCardData } from '../esds/register-components'

interface ComponentPreviewProps {
  code: string
  language?: string
  title?: string
  preview?: boolean
  showCopy?: boolean
  previewBackground?: string
  className?: string
  onCopy?: () => void
}

/**
 * React wrapper for esds-component-preview WebComponent
 */
export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  code,
  language = 'typescript',
  title = 'Example',
  preview = true,
  showCopy = true,
  previewBackground = 'white',
  className,
  onCopy
}) => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set properties directly on the element
    ;(element as any).code = code
    ;(element as any).language = language
    ;(element as any).title = title
    ;(element as any).preview = preview
    ;(element as any).showCopy = showCopy
    ;(element as any).previewBackground = previewBackground
  }, [code, language, title, preview, showCopy, previewBackground])

  useEffect(() => {
    const element = elementRef.current
    if (!element || !onCopy) return

    const handleCopy = () => {
      onCopy()
    }

    element.addEventListener('copy', handleCopy)
    return () => element.removeEventListener('copy', handleCopy)
  }, [onCopy])

  return (
    <esds-component-preview
      ref={elementRef}
      className={className}
    />
  )
}

export default ComponentPreview