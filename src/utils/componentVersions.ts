import fs from 'fs'
import path from 'path'

interface ComponentVersionInfo {
  version: string
  status: string
}

// Cache for component version info to avoid repeated file reads
const versionCache = new Map<string, ComponentVersionInfo>()

/**
 * Extracts version and status from ELEVATE component TypeScript definition files
 * @param technicalName - The technical name of the component (e.g., 'elvt-button')
 * @returns Object with version and status, or defaults if not found
 */
export function getComponentVersionInfo(technicalName: string): ComponentVersionInfo {
  // Return cached result if available
  if (versionCache.has(technicalName)) {
    return versionCache.get(technicalName)!
  }

  // Default fallback values
  const defaultInfo: ComponentVersionInfo = {
    version: '0.0.1',
    status: 'preliminary'
  }

  try {
    // Map technical name to file path
    const componentName = technicalName.replace('elvt-', '')
    const filePath = getComponentFilePath(componentName)
    
    if (!filePath) {
      versionCache.set(technicalName, defaultInfo)
      return defaultInfo
    }

    // Read the TypeScript definition file
    const fileContent = fs.readFileSync(filePath, 'utf8')
    
    // Extract @since version using regex
    const sinceMatch = fileContent.match(/@since\s+([^\s\n\r*]+)/i)
    const version = sinceMatch ? sinceMatch[1] : defaultInfo.version

    // Extract @status using regex
    const statusMatch = fileContent.match(/@status\s+([^\s\n\r*]+)/i)
    const status = statusMatch ? statusMatch[1].toLowerCase() : defaultInfo.status

    const info: ComponentVersionInfo = { version, status }
    
    // Cache the result
    versionCache.set(technicalName, info)
    
    return info
  } catch (error) {
    console.warn(`Could not read version info for ${technicalName}:`, error)
    versionCache.set(technicalName, defaultInfo)
    return defaultInfo
  }
}

/**
 * Maps component names to their TypeScript definition file paths
 * @param componentName - Component name without elvt- prefix
 * @returns File path or null if not found
 */
function getComponentFilePath(componentName: string): string | null {
  const basePath = path.join(process.cwd(), 'node_modules', '@inform-elevate', 'elevate-core-ui', 'dist', 'components')
  
  // Component name to directory/file mapping
  const componentPaths: Record<string, string> = {
    // Single directory components
    'avatar': 'avatar/avatar.component.d.ts',
    'badge': 'badge/badge.component.d.ts',
    'card': 'card/card.component.d.ts',
    'checkbox': 'checkbox/checkbox.component.d.ts',
    'chip': 'chip/chip.component.d.ts',
    'divider': 'divider/divider.component.d.ts',
    'dropdown': 'dropdown/dropdown.component.d.ts',
    'icon': 'icon/icon.component.d.ts',
    'indicator': 'indicator/indicator.component.d.ts',
    'input': 'input/input.component.d.ts',
    'lightbox': 'lightbox/lightbox.component.d.ts',
    'link': 'link/link.component.d.ts',
    'notification': 'notification/notification.component.d.ts',
    'paginator': 'paginator/paginator.component.d.ts',
    'progress': 'progress/progress.component.d.ts',
    'select': 'select/select.component.d.ts',
    'skeleton': 'skeleton/skeleton.component.d.ts',
    'stack': 'stack/stack.component.d.ts',
    'switch': 'switch/switch.component.d.ts',
    'textarea': 'textarea/textarea.component.d.ts',
    'tooltip': 'tooltip/tooltip.component.d.ts',
    'toolbar': 'toolbar/toolbar.component.d.ts',
    'application': 'application/application.component.d.ts',
    'mutation-observer': 'mutation-observer/mutation-observer.component.d.ts',
    'resize-observer': 'resize-observer/resize-observer.component.d.ts',
    'visually-hidden': 'visually-hidden/visually-hidden.component.d.ts',

    // Nested directory components  
    'button': 'buttons/button/button.component.d.ts',
    'button-group': 'buttons/button-group/button-group.component.d.ts',
    'icon-button': 'icon-button/icon-button.component.d.ts',
    
    'breadcrumb': 'breadcrumbs/breadcrumb/breadcrumb.component.d.ts',
    'breadcrumb-item': 'breadcrumbs/breadcrumb-item/breadcrumb-item.component.d.ts',
    
    'expansion-panel': 'expansion-panels/expansion-panel/expansion-panel.component.d.ts',
    'expansion-panel-group': 'expansion-panels/expansion-panel-group/expansion-panel-group.component.d.ts',
    
    'field': 'fields/field/field.component.d.ts',
    
    'menu': 'menus/menu/menu.component.d.ts',
    'menu-item': 'menus/menu-item/menu-item.component.d.ts',
    
    'radio': 'radios/radio/radio.component.d.ts',
    'radio-group': 'radios/radio-group/radio-group.component.d.ts',
    
    'tab': 'tabs/tab/tab.component.d.ts',
    'tab-panel': 'tabs/tab-panel/tab-panel.component.d.ts',
    'tab-group': 'tabs/tab-group/tab-group.component.d.ts',
    
    'table': 'tables/table/table.component.d.ts',
    'table-cell': 'tables/table-cell/table-cell.component.d.ts',
    'table-column': 'tables/table-column/table-column.component.d.ts',
    'table-row': 'tables/table-row/table-row.component.d.ts',
    
    // Components that might not exist in the actual package yet
    'charts': null, // Not implemented yet
    'date-picker': null, // Not implemented yet
    'dialog': null, // Not implemented yet
    'drawer': null, // Not implemented yet
    'empty-state': null, // Not implemented yet
    'file-dropzone': null, // Not implemented yet
    'inline-notification': null, // Probably same as notification
    'list': null, // Not implemented yet
    'pagination': null, // Should be paginator
    'progress-bar': null, // Should be progress
    'progress-stepper': null, // Not implemented yet
    'radio-button': null, // Should be radio
    'range-input': null, // Not implemented yet
    'segmented-control': null, // Not implemented yet
    'side-navigation': null, // Not implemented yet
    'slider': null, // Not implemented yet
    'split-panel': null, // Not implemented yet
    'time-picker': null, // Not implemented yet
    'toast': null, // Probably same as notification
    'top-navigation': null, // Not implemented yet
    'tree': null, // Not implemented yet
    'tree-item': null, // Not implemented yet
  }

  const relativePath = componentPaths[componentName]
  if (!relativePath) {
    return null
  }

  const fullPath = path.join(basePath, relativePath)
  
  try {
    // Check if file exists
    fs.accessSync(fullPath, fs.constants.F_OK)
    return fullPath
  } catch {
    return null
  }
}

/**
 * Clear the version cache (useful for development/testing)
 */
export function clearVersionCache(): void {
  versionCache.clear()
}