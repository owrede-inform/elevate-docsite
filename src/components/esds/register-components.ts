/**
 * ESDS Component Registration
 * 
 * This file imports and registers all ESDS WebComponents.
 * Import this file to ensure all components are available.
 */

// Import all ESDS components to register them
import './component-preview'
import './pattern-card'
import './navigation'
import './github-link'

// Export types for TypeScript support
export type { PatternCardData } from './pattern-card'
export type { NavigationItem, NavigationData } from './navigation'

// Component registration status
const registeredComponents = [
  'esds-component-preview',
  'esds-pattern-card', 
  'esds-navigation',
  'esds-github-link'
] as const

export type RegisteredComponent = typeof registeredComponents[number]

/**
 * Check if all ESDS components are registered
 */
export function areComponentsRegistered(): boolean {
  return registeredComponents.every(tagName => 
    customElements.get(tagName) !== undefined
  )
}

/**
 * Get list of registered component names
 */
export function getRegisteredComponents(): readonly string[] {
  return registeredComponents
}

// Log registration status in development
if (import.meta.env.DEV) {
  console.log('🔧 ESDS Components registered:', registeredComponents)
  
  if (!areComponentsRegistered()) {
    console.warn('⚠️ Some ESDS components may not be registered yet')
  }
}