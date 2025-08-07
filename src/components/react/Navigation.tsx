import React, { useEffect, useRef } from 'react'
import type { NavigationData } from '../esds/register-components'

interface NavigationProps {
  navigation: NavigationData
  currentPath?: string
  mobile?: boolean
  expanded?: boolean
  className?: string
  onRoleChange?: (role: string) => void
}

/**
 * React wrapper for esds-navigation WebComponent
 */
export const Navigation: React.FC<NavigationProps> = ({
  navigation,
  currentPath = '/',
  mobile = false,
  expanded = false,
  className,
  onRoleChange
}) => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set properties directly on the element
    ;(element as any).navigation = navigation
    ;(element as any).currentPath = currentPath
    ;(element as any).mobile = mobile
    ;(element as any).expanded = expanded
  }, [navigation, currentPath, mobile, expanded])

  useEffect(() => {
    const element = elementRef.current
    if (!element || !onRoleChange) return

    const handleRoleChange = (event: CustomEvent) => {
      onRoleChange(event.detail.role)
    }

    element.addEventListener('role-change', handleRoleChange as EventListener)
    return () => element.removeEventListener('role-change', handleRoleChange as EventListener)
  }, [onRoleChange])

  return (
    <esds-navigation
      ref={elementRef}
      className={className}
    />
  )
}

export default Navigation