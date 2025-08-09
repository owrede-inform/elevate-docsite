/**
 * Navigation YAML Configuration Loader
 * 
 * Loads navigation configuration from /src/config/navigation.yaml
 */

// Import the navigation data directly since we're in a bundled environment
// This is more reliable than trying to fetch YAML at runtime
import { navigationSections } from '@/config/navigation-data'

export interface NavigationPage {
  title?: string
  path: string
}

export interface NavigationSection {
  title: string
  pages: NavigationPage[]
}

/**
 * Load navigation sections from the navigation configuration
 * 
 * In a bundled environment, we use the pre-converted TypeScript data
 * rather than loading YAML at runtime for better performance and reliability
 */
export function loadNavigationSections(): NavigationSection[] {
  return navigationSections
}

/**
 * Convert navigation sections to match the EsdsTreeSidebar interface
 */
export function getTreeSidebarSections(): NavigationSection[] {
  const sections = loadNavigationSections()
  
  return sections.map(section => ({
    title: section.title,
    pages: section.pages.map(page => ({
      title: page.title || getPageTitleFromPath(page.path),
      path: page.path
    }))
  }))
}

/**
 * Generate a readable title from a path if no title is provided
 */
function getPageTitleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1] || ''
  
  // Convert kebab-case to Title Case
  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Find a section by title (case-insensitive)
 */
export function findSectionByTitle(title: string): NavigationSection | null {
  const sections = loadNavigationSections()
  return sections.find(section => 
    section.title.toLowerCase() === title.toLowerCase()
  ) || null
}

/**
 * Get all navigation pages as a flat list
 */
export function getAllNavigationPages(): Array<{ title: string; path: string; section: string }> {
  const sections = loadNavigationSections()
  const allPages: Array<{ title: string; path: string; section: string }> = []
  
  sections.forEach(section => {
    section.pages.forEach(page => {
      allPages.push({
        title: page.title || getPageTitleFromPath(page.path),
        path: page.path,
        section: section.title
      })
    })
  })
  
  return allPages
}