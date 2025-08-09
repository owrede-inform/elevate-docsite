import React, { ComponentType } from 'react'

// Frontmatter interface
export interface MDXFrontmatter {
  title: string
  description: string
  category?: string
  tags?: string[]
  elevate_component?: string
  status?: 'stable' | 'beta' | 'alpha' | 'deprecated' | 'new'
  version?: string
  [key: string]: any
}

// MDX Content interface
export interface MDXContent {
  frontmatter: MDXFrontmatter
  Component: ComponentType
  slug: string
  path: string
}

// Content registry
export interface ContentRegistry {
  guides: Record<string, MDXContent>
  components: Record<string, MDXContent>
  tokens: Record<string, MDXContent>
  patterns: Record<string, MDXContent>
}

/**
 * MDX Content Loader
 * 
 * Handles dynamic loading and parsing of MDX content files
 * with frontmatter extraction and component registration.
 */
class MDXLoader {
  private contentCache = new Map<string, MDXContent>()
  private registryCache: ContentRegistry | null = null

  /**
   * Load an individual MDX file
   */
  async loadMDXFile(path: string): Promise<MDXContent> {
    if (this.contentCache.has(path)) {
      return this.contentCache.get(path)!
    }

    try {
      // Dynamic import of the MDX file
      const module = await import(/* @vite-ignore */ path)
      
      // Extract frontmatter and component
      const frontmatter: MDXFrontmatter = module.frontmatter || {}
      const Component: ComponentType = module.default

      // Create slug from path
      const slug = this.pathToSlug(path)

      const content: MDXContent = {
        frontmatter,
        Component,
        slug,
        path
      }

      // Cache the content
      this.contentCache.set(path, content)

      return content
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error(`Error loading MDX file: ${path}`, error);
      }
      throw error
    }
  }

  /**
   * Load all content files and build registry
   */
  async loadContentRegistry(): Promise<ContentRegistry> {
    if (this.registryCache) {
      return this.registryCache
    }

    const registry: ContentRegistry = {
      guides: {},
      components: {},
      tokens: {},
      patterns: {}
    }

    try {
      // Use Vite's import.meta.glob to discover MDX files
      const contentModules = import.meta.glob('/src/content/**/*.mdx', { eager: false })

      // Load each content file
      for (const [path, moduleLoader] of Object.entries(contentModules)) {
        try {
          const module = await moduleLoader()
          const frontmatter: MDXFrontmatter = (module as any).frontmatter || {}
          const Component: ComponentType = (module as any).default

          const slug = this.pathToSlug(path)
          const category = this.getCategoryFromPath(path)

          const content: MDXContent = {
            frontmatter,
            Component,
            slug,
            path
          }

          // Add to appropriate registry section
          if (category === 'guides') {
            registry.guides[slug] = content
          } else if (category === 'components') {
            registry.components[slug] = content
          } else if (category === 'tokens') {
            registry.tokens[slug] = content
          } else if (category === 'patterns') {
            registry.patterns[slug] = content
          }

          // Also cache individually
          this.contentCache.set(path, content)
        } catch (error) {
          if (import.meta.env.DEV) {
            console.warn(`Failed to load content file: ${path}`, error);
          }
        }
      }

      this.registryCache = registry
      return registry
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error loading content registry:', error);
      }
      throw error
    }
  }

  /**
   * Get content by category and slug
   */
  async getContent(category: keyof ContentRegistry, slug: string): Promise<MDXContent | null> {
    const registry = await this.loadContentRegistry()
    return registry[category][slug] || null
  }

  /**
   * Get all content in a category
   */
  async getContentByCategory(category: keyof ContentRegistry): Promise<MDXContent[]> {
    const registry = await this.loadContentRegistry()
    return Object.values(registry[category])
  }

  /**
   * Search content by query
   */
  async searchContent(query: string, categories?: Array<keyof ContentRegistry>): Promise<MDXContent[]> {
    const registry = await this.loadContentRegistry()
    const searchIn = categories || ['guides', 'components', 'tokens', 'patterns']
    
    const results: MDXContent[] = []
    const lowerQuery = query.toLowerCase()

    for (const category of searchIn) {
      for (const content of Object.values(registry[category])) {
        const { frontmatter } = content
        
        // Search in title, description, and tags
        const searchText = [
          frontmatter.title,
          frontmatter.description,
          ...(frontmatter.tags || [])
        ].join(' ').toLowerCase()

        if (searchText.includes(lowerQuery)) {
          results.push(content)
        }
      }
    }

    return results
  }

  /**
   * Convert file path to slug
   */
  private pathToSlug(path: string): string {
    return path
      .replace(/^\/src\/content\//, '')
      .replace(/\.mdx$/, '')
      .replace(/\//g, '-')
  }

  /**
   * Extract category from file path
   */
  private getCategoryFromPath(path: string): string {
    const match = path.match(/\/src\/content\/([^/]+)\//)
    return match ? match[1] : 'misc'
  }

  /**
   * Clear all caches
   */
  clearCache(): void {
    this.contentCache.clear()
    this.registryCache = null
  }

  /**
   * Get content metadata without loading the full component
   */
  async getContentMetadata(category: keyof ContentRegistry, slug: string): Promise<MDXFrontmatter | null> {
    const content = await this.getContent(category, slug)
    return content ? content.frontmatter : null
  }

  /**
   * Get content list with metadata only (for navigation, search, etc.)
   */
  async getContentList(category: keyof ContentRegistry): Promise<Array<{ slug: string; frontmatter: MDXFrontmatter }>> {
    const registry = await this.loadContentRegistry()
    
    return Object.entries(registry[category]).map(([slug, content]) => ({
      slug,
      frontmatter: content.frontmatter
    }))
  }
}

// Create singleton instance
export const mdxLoader = new MDXLoader()

// Convenience functions for common operations
export const loadContentRegistry = () => mdxLoader.loadContentRegistry()
export const getContent = (category: keyof ContentRegistry, slug: string) => mdxLoader.getContent(category, slug)
export const getContentByCategory = (category: keyof ContentRegistry) => mdxLoader.getContentByCategory(category)
export const searchContent = (query: string, categories?: Array<keyof ContentRegistry>) => mdxLoader.searchContent(query, categories)
export const getContentList = (category: keyof ContentRegistry) => mdxLoader.getContentList(category)
export const clearContentCache = () => mdxLoader.clearCache()

/**
 * React hook for loading MDX content
 */
export const useMDXContent = (category: keyof ContentRegistry, slug: string) => {
  const [content, setContent] = React.useState<MDXContent | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    let mounted = true

    const loadContent = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const loadedContent = await mdxLoader.getContent(category, slug)
        
        if (mounted) {
          setContent(loadedContent)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'))
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadContent()

    return () => {
      mounted = false
    }
  }, [category, slug])

  return { content, loading, error, reload: () => mdxLoader.clearCache() }
}

/**
 * React hook for loading content list
 */
export const useMDXContentList = (category: keyof ContentRegistry) => {
  const [contentList, setContentList] = React.useState<Array<{ slug: string; frontmatter: MDXFrontmatter }>>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    let mounted = true

    const loadContentList = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const list = await mdxLoader.getContentList(category)
        
        if (mounted) {
          setContentList(list)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'))
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadContentList()

    return () => {
      mounted = false
    }
  }, [category])

  return { contentList, loading, error, reload: () => mdxLoader.clearCache() }
}