/**
 * Routing Utilities
 * 
 * Helper functions for generating routes and handling navigation
 * with the new MDX content system.
 */

import { contentIndex } from './mdxLoader'

/**
 * Generate route paths for different content types
 */
export const routes = {
  home: '/',
  components: {
    index: '/components',
    detail: (componentName: string) => `/components/${componentName}`,
  },
  patterns: {
    index: '/patterns',
    detail: (patternId: string) => `/patterns/${patternId}`,
  },
  guides: {
    index: '/guides',
    role: (role: string) => `/guides/${role}`,
    detail: (role: string, guide: string) => `/guides/${role}/${guide}`,
  },
  test: '/test',
  tokens: '/tokens-showcase',
}

/**
 * Get all available routes for a content type
 */
export function getContentRoutes(contentType: keyof typeof contentIndex): string[] {
  switch (contentType) {
    case 'components':
      return Object.keys(contentIndex.components).map(routes.components.detail)
      
    case 'patterns':
      return Object.keys(contentIndex.patterns).map(routes.patterns.detail)
      
    case 'guides':
      const guideRoutes: string[] = []
      Object.entries(contentIndex.guides).forEach(([role, guides]) => {
        guideRoutes.push(routes.guides.role(role))
        Object.keys(guides).forEach(guide => {
          guideRoutes.push(routes.guides.detail(role, guide))
        })
      })
      return guideRoutes
      
    default:
      return []
  }
}

/**
 * Get all available content items for navigation
 */
export function getNavigationItems() {
  return {
    main: [
      { label: 'Home', href: routes.home },
      { label: 'Components', href: routes.components.index },
      { label: 'Patterns', href: routes.patterns.index },
      { label: 'Guides', href: routes.guides.index },
    ],
    components: Object.entries(contentIndex.components).map(([slug, content]) => ({
      label: content.frontmatter.title,
      href: routes.components.detail(slug),
      category: content.frontmatter.category,
    })),
    patterns: Object.entries(contentIndex.patterns).map(([slug, content]) => ({
      label: content.frontmatter.title,
      href: routes.patterns.detail(slug),
      difficulty: content.frontmatter.difficulty,
      tags: content.frontmatter.tags,
    })),
    guides: Object.entries(contentIndex.guides).map(([role, guides]) => ({
      role,
      label: role.charAt(0).toUpperCase() + role.slice(1),
      href: routes.guides.role(role),
      guides: Object.entries(guides).map(([slug, guide]) => ({
        label: guide.frontmatter.title,
        href: routes.guides.detail(role, slug),
        order: guide.frontmatter.order,
      })),
    })),
  }
}

/**
 * Validate if a route exists in the content system
 */
export function validateRoute(path: string): boolean {
  // Remove leading slash and split path
  const segments = path.replace(/^\//, '').split('/').filter(Boolean)
  
  if (segments.length === 0) {
    return true // Home route
  }
  
  const [contentType, ...rest] = segments
  
  switch (contentType) {
    case 'components':
      if (rest.length === 0) return true // Components index
      if (rest.length === 1) {
        return rest[0] in contentIndex.components
      }
      return false
      
    case 'patterns':
      if (rest.length === 0) return true // Patterns index
      if (rest.length === 1) {
        return rest[0] in contentIndex.patterns
      }
      return false
      
    case 'guides':
      if (rest.length === 0) return true // Guides index
      if (rest.length === 1) {
        return rest[0] in contentIndex.guides
      }
      if (rest.length === 2) {
        const [role, guide] = rest
        return role in contentIndex.guides && guide in contentIndex.guides[role]
      }
      return false
      
    case 'test':
    case 'tokens-showcase':
      return rest.length === 0
      
    default:
      return false
  }
}

/**
 * Get breadcrumb navigation for a route
 */
export function getBreadcrumbs(path: string): Array<{ label: string; href?: string }> {
  const segments = path.replace(/^\//, '').split('/').filter(Boolean)
  const breadcrumbs: Array<{ label: string; href?: string }> = []
  
  if (segments.length === 0) {
    return [{ label: 'Home' }]
  }
  
  const [contentType, ...rest] = segments
  
  switch (contentType) {
    case 'components':
      breadcrumbs.push({ label: 'Components', href: routes.components.index })
      if (rest.length === 1 && rest[0] in contentIndex.components) {
        const component = contentIndex.components[rest[0]]
        breadcrumbs.push({ label: component.frontmatter.title })
      }
      break
      
    case 'patterns':
      breadcrumbs.push({ label: 'Patterns', href: routes.patterns.index })
      if (rest.length === 1 && rest[0] in contentIndex.patterns) {
        const pattern = contentIndex.patterns[rest[0]]
        breadcrumbs.push({ label: pattern.frontmatter.title })
      }
      break
      
    case 'guides':
      breadcrumbs.push({ label: 'Guides', href: routes.guides.index })
      if (rest.length >= 1 && rest[0] in contentIndex.guides) {
        const role = rest[0]
        const roleLabel = role.charAt(0).toUpperCase() + role.slice(1)
        breadcrumbs.push({ label: roleLabel, href: routes.guides.role(role) })
        
        if (rest.length === 2 && rest[1] in contentIndex.guides[role]) {
          const guide = contentIndex.guides[role][rest[1]]
          breadcrumbs.push({ label: guide.frontmatter.title })
        }
      }
      break
      
    default:
      breadcrumbs.push({ label: contentType.charAt(0).toUpperCase() + contentType.slice(1) })
  }
  
  return breadcrumbs
}

/**
 * Get next/previous navigation for guides
 */
export function getGuideNavigation(role: string, currentGuide: string) {
  const guides = contentIndex.guides[role]
  if (!guides) return { prev: null, next: null }
  
  const guideList = Object.entries(guides)
    .sort(([, a], [, b]) => (a.frontmatter.order || 0) - (b.frontmatter.order || 0))
  
  const currentIndex = guideList.findIndex(([slug]) => slug === currentGuide)
  if (currentIndex === -1) return { prev: null, next: null }
  
  const prev = currentIndex > 0 ? guideList[currentIndex - 1] : null
  const next = currentIndex < guideList.length - 1 ? guideList[currentIndex + 1] : null
  
  return {
    prev: prev ? {
      label: prev[1].frontmatter.title,
      href: routes.guides.detail(role, prev[0])
    } : null,
    next: next ? {
      label: next[1].frontmatter.title,
      href: routes.guides.detail(role, next[0])
    } : null,
  }
}