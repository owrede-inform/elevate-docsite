/**
 * Navigation configuration loader
 */
import { createPath } from './path-utils'
import type { NavigationData, NavigationItem } from '@/components/esds/register-components'
import { navigationSections, type NavigationSection } from '@/config/navigation-data'

/**
 * Convert navigation sections to NavigationData format
 */
function convertToNavigationData(sections: NavigationSection[]): NavigationData {
  // Create primary navigation from top-level sections
  const primary: NavigationItem[] = sections.map(section => ({
    label: section.title,
    href: createPath(section.pages[0]?.path || `/${section.title.toLowerCase().replace(/\s+/g, '-')}`),
    children: section.pages.length > 1 ? section.pages.map(page => ({
      label: page.title || page.path.split('/').pop()?.replace(/-/g, ' ') || 'Unknown',
      href: createPath(page.path)
    })) : undefined
  }))

  // Create secondary navigation from commonly accessed items
  const secondary: NavigationItem[] = [
    {
      label: 'Getting Started',
      href: createPath('/getting-started'),
      role: ['designer', 'developer', 'product-manager']
    },
    {
      label: 'Components',
      href: createPath('/components'),
      role: ['developer', 'designer']
    },
    {
      label: 'Design Tokens',
      href: createPath('/tokens'),
      role: ['designer', 'developer']
    },
    {
      label: 'Contributing',
      href: createPath('/contributions'),
      role: ['developer']
    }
  ]

  return {
    homeHref: createPath('/'),
    primary,
    secondary
  }
}

/**
 * Load navigation configuration from static data
 */
export function loadNavigationConfig(): NavigationData {
  try {
    return convertToNavigationData(navigationSections)
  } catch (error) {
    console.error('Error loading navigation configuration:', error)
    
    // Fallback navigation
    return {
      homeHref: createPath('/'),
      primary: [
        {
          label: 'Components',
          href: createPath('/components'),
        },
        {
          label: 'Patterns',
          href: createPath('/patterns'),
        },
        {
          label: 'Guides',
          href: createPath('/guides'),
        }
      ],
      secondary: [
        {
          label: 'Getting Started',
          href: createPath('/getting-started'),
          role: ['designer', 'developer', 'product-manager']
        }
      ]
    }
  }
}

/**
 * Get all navigation items as a flat list (useful for search, sitemap, etc.)
 */
export function getAllNavigationItems(): Array<{ label: string; href: string; section: string }> {
  const config = loadNavigationConfig()
  const items: Array<{ label: string; href: string; section: string }> = []
  
  config.primary.forEach(item => {
    items.push({ label: item.label, href: item.href, section: 'primary' })
    
    if (item.children) {
      item.children.forEach(child => {
        items.push({ label: child.label, href: child.href, section: item.label })
      })
    }
  })
  
  if (config.secondary) {
    config.secondary.forEach(item => {
      items.push({ label: item.label, href: item.href, section: 'secondary' })
    })
  }
  
  return items
}