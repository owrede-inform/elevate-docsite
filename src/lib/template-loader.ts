/**
 * Template Loader
 * 
 * Dynamically loads page templates based on frontmatter layout value
 */

import React from 'react'
import { MDXContent } from '../utils/mdxLoader'

// Import all available templates
import PageTemplate, { PageTemplateProps } from '../templates/pages/page'
import HomeTemplate from '../templates/pages/home'
import ComponentTemplate from '../templates/pages/component'
import GuideTemplate from '../templates/pages/guide'
import PatternTemplate from '../templates/pages/pattern'
import TokenTemplate from '../templates/pages/token'

export type TemplateComponent = React.FC<PageTemplateProps>

// Template registry - maps layout names to template components
const TEMPLATE_REGISTRY: Record<string, TemplateComponent> = {
  'page': PageTemplate,
  'home': HomeTemplate,
  'component': ComponentTemplate,
  'guide': GuideTemplate,
  'pattern': PatternTemplate,
  'token': TokenTemplate
}

/**
 * Get template component by layout name
 * 
 * @param layout - The layout name from frontmatter
 * @returns Template component or null if not found
 */
export function getTemplate(layout?: string): TemplateComponent {
  // Default to 'page' if no layout specified
  if (!layout) {
    return PageTemplate
  }
  
  // Look up template in registry
  const template = TEMPLATE_REGISTRY[layout.toLowerCase()]
  
  if (!template) {
    console.warn(`Missing template: ${layout}`)
    return PageTemplate // Fallback to default page template
  }
  
  return template
}

/**
 * Get template name by content type (path-based fallback)
 * 
 * This is used when frontmatter doesn't specify a layout
 * but we can infer one from the file path
 */
export function getTemplateByContentType(path: string): string {
  if (path.includes('/pages/')) return 'page'
  if (path.includes('/components/')) return 'component'
  if (path.includes('/patterns/')) return 'pattern'
  if (path.includes('/guides/')) return 'guide'
  if (path.includes('/tokens/')) return 'token'
  return 'page' // Default fallback
}

/**
 * Get all available template names
 */
export function getAvailableTemplates(): string[] {
  return Object.keys(TEMPLATE_REGISTRY)
}

/**
 * Check if a template exists
 */
export function templateExists(layout: string): boolean {
  return layout.toLowerCase() in TEMPLATE_REGISTRY
}

/**
 * Render content using the appropriate template
 * 
 * This is the main function used by MDXContentRenderer
 */
export function renderWithTemplate(
  content: MDXContent, 
  params: any, 
  children: React.ReactNode
): React.ReactElement {
  const { frontmatter, path } = content
  
  // Determine template to use
  let templateName = frontmatter.layout
  
  // If no layout specified in frontmatter, infer from path
  if (!templateName) {
    templateName = getTemplateByContentType(path)
  }
  
  // Get the template component
  const TemplateComponent = getTemplate(templateName)
  
  // Render with the selected template
  return React.createElement(TemplateComponent, {
    content,
    params,
    children
  })
}