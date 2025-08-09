import { getElevateComponentInfo } from './elevatePackageReader'

interface ComponentVersionInfo {
  version: string
  status: string | null
}

// Cache for component info to avoid repeated async calls
const componentCache = new Map<string, ComponentVersionInfo>()

/**
 * Gets component version and status information dynamically from the elevate-core-ui package
 * @param technicalName - The technical name of the component (e.g., 'elvt-button')
 * @returns Promise resolving to object with version and status
 */
export async function getComponentVersionInfoAsync(technicalName: string): Promise<ComponentVersionInfo> {
  // Check cache first
  if (componentCache.has(technicalName)) {
    return componentCache.get(technicalName)!
  }

  try {
    // Get info from the elevate package
    const info = await getElevateComponentInfo(technicalName)
    
    // Cache the result
    componentCache.set(technicalName, info)
    
    return info
  } catch (error) {
    console.warn(`Could not get component info for ${technicalName}:`, error)
    
    // Fallback for unknown components
    const fallback = { version: '--', status: null }
    componentCache.set(technicalName, fallback)
    
    return fallback
  }
}

/**
 * Synchronous version that returns cached data or a placeholder
 * Used for components that need immediate rendering
 * @param technicalName - The technical name of the component (e.g., 'elvt-button')
 * @returns Object with version and status (may be placeholder)
 */
export function getComponentVersionInfo(technicalName: string): ComponentVersionInfo {
  // Return cached data if available
  if (componentCache.has(technicalName)) {
    return componentCache.get(technicalName)!
  }

  // Start async loading in background
  getComponentVersionInfoAsync(technicalName).catch(() => {
    // Ignore errors - async function will handle them
  })

  // Return placeholder until real data is loaded
  return { version: '...', status: 'Loading...' }
}

/**
 * Preloads component information for better performance
 * @param componentNames - Array of component technical names
 */
export async function preloadComponentInfo(componentNames: string[]): Promise<void> {
  const promises = componentNames
    .filter(name => !componentCache.has(name))
    .map(name => getComponentVersionInfoAsync(name))
  
  await Promise.all(promises)
}

/**
 * Gets all available component names from the elevate package
 * @returns Promise resolving to array of all component technical names
 */
export async function getAllComponentNamesAsync(): Promise<string[]> {
  try {
    const { getAvailableElevateComponents } = await import('./elevatePackageReader')
    return await getAvailableElevateComponents()
  } catch (error) {
    console.warn('Could not get component names from elevate package:', error)
    return []
  }
}

/**
 * Legacy synchronous function for compatibility
 * @returns Empty array (use getAllComponentNamesAsync for real data)
 * @deprecated Use getAllComponentNamesAsync instead
 */
export function getAllComponentNames(): string[] {
  console.warn('getAllComponentNames is deprecated, use getAllComponentNamesAsync instead')
  return []
}