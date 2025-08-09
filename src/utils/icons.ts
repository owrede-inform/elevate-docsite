/**
 * Icon Utility System for ESDS Components
 * 
 * Supports:
 * 1. MDI icons (prefix with "mdi:")
 * 2. Custom SVG paths
 * 3. SVG strings
 * 4. URLs to icon files
 */

import * as mdiIcons from '@mdi/js'

export interface IconDetail {
  path?: string
  svg?: string
  url?: string
  viewBox?: string
  width?: number
  height?: number
}

/**
 * MDI Icon Registry - maps simplified names to actual MDI constants
 */
export const MDI_ICON_REGISTRY: Record<string, string> = {
  // Navigation
  'chevron-left': mdiIcons.mdiChevronLeft,
  'chevron-right': mdiIcons.mdiChevronRight,
  'chevron-up': mdiIcons.mdiChevronUp,
  'chevron-down': mdiIcons.mdiChevronDown,
  'menu': mdiIcons.mdiMenu,
  'close': mdiIcons.mdiClose,
  'arrow-left': mdiIcons.mdiArrowLeft,
  'arrow-right': mdiIcons.mdiArrowRight,
  
  // UI Elements  
  'plus': mdiIcons.mdiPlus,
  'minus': mdiIcons.mdiMinus,
  'check': mdiIcons.mdiCheck,
  'star': mdiIcons.mdiStar,
  'heart': mdiIcons.mdiHeart,
  'settings': mdiIcons.mdiCog,
  'search': mdiIcons.mdiMagnify,
  'filter': mdiIcons.mdiFilter,
  
  // Content
  'folder': mdiIcons.mdiFolder,
  'folder-open': mdiIcons.mdiFolderOpen,
  'file': mdiIcons.mdiFile,
  'document': mdiIcons.mdiFileDocument,
  'image': mdiIcons.mdiImage,
  'video': mdiIcons.mdiVideo,
  
  // Actions
  'edit': mdiIcons.mdiPencil,
  'delete': mdiIcons.mdiDelete,
  'download': mdiIcons.mdiDownload,
  'upload': mdiIcons.mdiUpload,
  'share': mdiIcons.mdiShare,
  'copy': mdiIcons.mdiContentCopy,
  
  // Status & Alerts
  'info': mdiIcons.mdiInformation,
  'warning': mdiIcons.mdiAlert,
  'error': mdiIcons.mdiAlertCircle,
  'success': mdiIcons.mdiCheckCircle,
  
  // User & Account
  'account': mdiIcons.mdiAccount,
  'login': mdiIcons.mdiLogin,
  'logout': mdiIcons.mdiLogout,
  'key': mdiIcons.mdiKey,
  
  // Theme
  'sun': mdiIcons.mdiWeatherSunny,
  'moon': mdiIcons.mdiWeatherNight,
  'palette': mdiIcons.mdiPalette,
  
  // External
  'external-link': mdiIcons.mdiOpenInNew,
  'github': mdiIcons.mdiGithub,
  'link': mdiIcons.mdiLink,
}

/**
 * Resolves an icon specification to an IconDetail object
 * 
 * @param icon - Icon specification (MDI name, SVG path, URL, etc.)
 * @returns IconDetail object with resolved icon data
 */
export function resolveIcon(icon: string): IconDetail {
  if (!icon) {
    return { path: '' }
  }

  // Handle MDI icons with "mdi:" prefix
  if (icon.startsWith('mdi:')) {
    const iconName = icon.slice(4) // Remove "mdi:" prefix
    const mdiPath = MDI_ICON_REGISTRY[iconName]
    
    if (mdiPath) {
      return {
        path: mdiPath,
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      }
    }
    
    // If not in registry, try to access directly from mdiIcons
    const directMdiName = `mdi${iconName.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('')}`
    
    const directMdiIcon = (mdiIcons as any)[directMdiName]
    if (directMdiIcon && typeof directMdiIcon === 'string') {
      return {
        path: directMdiIcon,
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      }
    }
    
    console.warn(`MDI icon "${iconName}" not found in registry or direct import`)
    return { path: '' }
  }

  // Handle URLs
  if (icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('/')) {
    return { url: icon }
  }

  // Handle SVG strings (start with <svg)
  if (icon.trim().startsWith('<svg')) {
    return { svg: icon }
  }

  // Handle data URLs
  if (icon.startsWith('data:')) {
    return { url: icon }
  }

  // Default: treat as SVG path
  return {
    path: icon,
    viewBox: '0 0 24 24',
    width: 24,
    height: 24
  }
}

/**
 * Generates an SVG string from an IconDetail
 * 
 * @param iconDetail - The icon detail object
 * @param size - Optional size override (width and height)
 * @param className - Optional CSS class name
 * @returns SVG string
 */
export function generateSVG(
  iconDetail: IconDetail, 
  size: number = 24, 
  className?: string
): string {
  if (iconDetail.svg) {
    // Return the SVG as-is, but add class if provided
    if (className) {
      return iconDetail.svg.replace('<svg', `<svg class="${className}"`)
    }
    return iconDetail.svg
  }

  if (iconDetail.url) {
    // For URLs, return an img tag wrapped in a div
    return `<img src="${iconDetail.url}" alt="" class="${className || ''}" width="${size}" height="${size}" />`
  }

  if (iconDetail.path) {
    const viewBox = iconDetail.viewBox || '0 0 24 24'
    const classAttr = className ? ` class="${className}"` : ''
    
    return `<svg width="${size}" height="${size}" viewBox="${viewBox}" fill="currentColor"${classAttr}>
      <path d="${iconDetail.path}" />
    </svg>`
  }

  return ''
}

/**
 * Helper function to create icon props for ESDS components
 * 
 * @param icon - Icon specification
 * @param size - Icon size
 * @param className - CSS class name
 * @returns Object with icon-related props
 */
export function createIconProps(icon: string, size: number = 24, className?: string) {
  const iconDetail = resolveIcon(icon)
  return {
    iconDetail,
    iconSvg: generateSVG(iconDetail, size, className),
    iconSize: size,
    iconClass: className
  }
}

/**
 * List of commonly used icons for UI components
 */
export const COMMON_ICONS = {
  navigation: {
    menu: 'mdi:menu',
    close: 'mdi:close',
    back: 'mdi:arrow-left',
    next: 'mdi:arrow-right',
    up: 'mdi:chevron-up',
    down: 'mdi:chevron-down',
    left: 'mdi:chevron-left',
    right: 'mdi:chevron-right',
  },
  actions: {
    add: 'mdi:plus',
    remove: 'mdi:minus',
    edit: 'mdi:edit',
    delete: 'mdi:delete',
    save: 'mdi:check',
    cancel: 'mdi:close',
    search: 'mdi:search',
    filter: 'mdi:filter',
  },
  content: {
    folder: 'mdi:folder',
    folderOpen: 'mdi:folder-open',
    file: 'mdi:file',
    document: 'mdi:document',
  },
  status: {
    info: 'mdi:info',
    success: 'mdi:success',
    warning: 'mdi:warning',
    error: 'mdi:error',
  },
  theme: {
    light: 'mdi:sun',
    dark: 'mdi:moon',
  }
}