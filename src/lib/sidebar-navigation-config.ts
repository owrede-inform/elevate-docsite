import { navigationSections } from '@/config/navigation-data'
import type { NavigationSection } from '@/components/navigation/SidebarNavigation'

/**
 * Load navigation configuration optimized for sidebar layout
 * Transforms the existing navigation data into a sidebar-friendly structure
 */
export function loadSidebarNavigationConfig(): NavigationSection[] {
  return navigationSections.map(section => ({
    title: section.title,
    pages: section.pages || []
  }))
}

/**
 * Get all navigation pages as a flat array for search/filtering
 */
export function getAllSidebarNavigationPages() {
  const sections = loadSidebarNavigationConfig()
  return sections.flatMap(section => 
    section.pages.map(page => ({
      ...page,
      section: section.title
    }))
  )
}

/**
 * Find navigation section and page by path
 */
export function findNavigationItemByPath(path: string) {
  const sections = loadSidebarNavigationConfig()
  
  for (const section of sections) {
    const page = section.pages.find(p => p.path === path)
    if (page) {
      return {
        section: section.title,
        page
      }
    }
  }
  
  return null
}