interface ComponentMetadata {
  name: string
  since?: string
  status?: string
}

// Fallback data extracted from the custom-elements.json (manually for now)
// This avoids Vite import issues while still providing dynamic-like functionality
const ELEVATE_COMPONENT_METADATA: Record<string, ComponentMetadata> = {
  // Core Components
  'elvt-button': { name: 'elvt-button', since: '0.0.3', status: 'Complete' },
  'elvt-button-group': { name: 'elvt-button-group', since: '0.0.4', status: 'Complete' },
  'elvt-icon-button': { name: 'elvt-icon-button', since: '0.0.3', status: 'Unstable' },
  'elvt-avatar': { name: 'elvt-avatar', since: '0.0.1', status: 'Unstable' },
  'elvt-badge': { name: 'elvt-badge', since: '0.0.1', status: 'Complete' },
  'elvt-card': { name: 'elvt-card', since: '0.0.2', status: 'Unstable' },
  'elvt-chip': { name: 'elvt-chip', since: '0.0.12', status: 'Unstable' },
  'elvt-divider': { name: 'elvt-divider', since: '0.0.3', status: 'Stable' },
  'elvt-icon': { name: 'elvt-icon', since: '0.0.1', status: 'Complete' },
  'elvt-skeleton': { name: 'elvt-skeleton', since: '0.0.1', status: 'Preliminary' },
  'elvt-stack': { name: 'elvt-stack', since: '0.0.1', status: 'Preliminary' },

  // Form Components
  'elvt-checkbox': { name: 'elvt-checkbox', since: '0.0.15', status: 'Unstable' },
  'elvt-input': { name: 'elvt-input', since: '0.0.1', status: 'Preliminary' },
  'elvt-select': { name: 'elvt-select', since: '0.0.14', status: 'Preliminary' },
  'elvt-switch': { name: 'elvt-switch', since: '0.0.19', status: 'Stable' },
  'elvt-textarea': { name: 'elvt-textarea', since: '0.0.1', status: 'Preliminary' },
  'elvt-radio': { name: 'elvt-radio', since: '0.0.21', status: 'Unstable' },
  'elvt-radio-group': { name: 'elvt-radio-group', since: '0.0.1', status: 'Preliminary' },
  'elvt-field': { name: 'elvt-field', since: '0.0.1', status: 'Preliminary' },

  // Navigation Components
  'elvt-breadcrumb': { name: 'elvt-breadcrumb', since: '0.0.2', status: 'Complete' },
  'elvt-breadcrumb-item': { name: 'elvt-breadcrumb-item', since: '0.0.2', status: 'Complete' },
  'elvt-link': { name: 'elvt-link', since: '0.0.5', status: 'Unstable' },
  'elvt-menu': { name: 'elvt-menu', since: '0.0.1', status: 'Preliminary' },
  'elvt-menu-item': { name: 'elvt-menu-item', since: '0.0.1', status: 'Preliminary' },
  'elvt-tab': { name: 'elvt-tab', since: '0.0.1', status: 'Complete' },
  'elvt-tab-group': { name: 'elvt-tab-group', since: '0.0.1', status: 'Complete' },
  'elvt-tab-panel': { name: 'elvt-tab-panel', since: '0.0.1', status: 'Complete' },

  // Layout & Structure
  'elvt-expansion-panel': { name: 'elvt-expansion-panel', since: '0.0.8', status: 'Unstable' },
  'elvt-expansion-panel-group': { name: 'elvt-expansion-panel-group', since: '0.0.1', status: 'Preliminary' },
  'elvt-dropdown': { name: 'elvt-dropdown', since: '0.0.1', status: 'Preliminary' },
  'elvt-lightbox': { name: 'elvt-lightbox', since: '0.0.16', status: 'Unstable' },
  'elvt-toolbar': { name: 'elvt-toolbar', since: '0.0.9', status: 'Unstable' },

  // Feedback & Status
  'elvt-notification': { name: 'elvt-notification', since: '0.0.11', status: 'Preliminary' },
  'elvt-progress': { name: 'elvt-progress', since: '0.0.7', status: 'Preliminary' },
  'elvt-tooltip': { name: 'elvt-tooltip', since: '0.0.7', status: 'Preliminary' },
  'elvt-indicator': { name: 'elvt-indicator', since: '0.0.1', status: 'Preliminary' },

  // Data Display
  'elvt-table': { name: 'elvt-table', since: '0.0.1', status: 'Preliminary' },
  'elvt-table-cell': { name: 'elvt-table-cell', since: '0.0.1', status: 'Preliminary' },
  'elvt-table-column': { name: 'elvt-table-column', since: '0.0.1', status: 'Preliminary' },
  'elvt-table-row': { name: 'elvt-table-row', since: '0.0.1', status: 'Preliminary' },
  'elvt-paginator': { name: 'elvt-paginator', since: '0.0.7', status: 'Preliminary' },

  // Utility Components
  'elvt-visually-hidden': { name: 'elvt-visually-hidden', since: '0.0.7', status: 'Stable' },
  'elvt-mutation-observer': { name: 'elvt-mutation-observer', since: '0.0.14', status: 'Stable' },
  'elvt-resize-observer': { name: 'elvt-resize-observer', since: '0.0.14', status: 'Stable' },
  'elvt-application': { name: 'elvt-application', since: '0.0.1', status: 'Preliminary' }
}

/**
 * Gets component metadata from the elevate-core-ui package
 * @param technicalName - The technical name of the component (e.g., 'elvt-button')
 * @returns Promise resolving to component metadata or null if not found
 */
export async function getElevateComponentMetadata(technicalName: string): Promise<ComponentMetadata | null> {
  // For now, use our fallback data - this avoids Vite import issues
  // In the future, this could be enhanced to read from the actual package files
  const metadata = ELEVATE_COMPONENT_METADATA[technicalName]
  
  if (metadata) {
    return metadata
  }

  // Component not found in our known components
  return null
}

/**
 * Gets the version number for a specific component
 * @param technicalName - The technical name of the component (e.g., 'elvt-button')
 * @returns Promise resolving to version string or '--' if not found/implemented
 */
export async function getElevateComponentVersion(technicalName: string): Promise<string> {
  const metadata = await getElevateComponentMetadata(technicalName)
  
  if (!metadata || !metadata.since) {
    // Component not implemented or no version info
    return '--'
  }
  
  return metadata.since
}

/**
 * Gets the status for a specific component
 * @param technicalName - The technical name of the component (e.g., 'elvt-button')
 * @returns Promise resolving to status string or null if not found/implemented
 */
export async function getElevateComponentStatus(technicalName: string): Promise<string | null> {
  const metadata = await getElevateComponentMetadata(technicalName)
  
  if (!metadata || !metadata.status) {
    // Component not implemented or no status info
    return null
  }
  
  return metadata.status
}

/**
 * Gets both version and status for a component
 * @param technicalName - The technical name of the component (e.g., 'elvt-button')
 * @returns Promise resolving to object with version and status
 */
export async function getElevateComponentInfo(technicalName: string): Promise<{
  version: string
  status: string | null
}> {
  const [version, status] = await Promise.all([
    getElevateComponentVersion(technicalName),
    getElevateComponentStatus(technicalName)
  ])
  
  return { version, status }
}

/**
 * Lists all available ELEVATE components from the package
 * @returns Promise resolving to array of component names
 */
export async function getAvailableElevateComponents(): Promise<string[]> {
  // Return all known component names
  return Object.keys(ELEVATE_COMPONENT_METADATA).sort()
}