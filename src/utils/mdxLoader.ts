/**
 * Dynamic MDX Content Loader Utility
 * 
 * Provides utilities for dynamically loading and parsing MDX content files
 * with automatic path-to-URL mapping and frontmatter support.
 */

export interface MDXFrontmatter {
  title: string
  description: string
  layout?: string
  status?: 'stable' | 'beta' | 'alpha' | 'deprecated'
  category?: string
  tags?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  components?: string[]
  role?: string
  order?: number
  technicalName?: string
  version?: string
}

export interface MDXContent {
  frontmatter: MDXFrontmatter
  content: string
  slug: string
  path: string
  url: string
}

export interface ContentIndex {
  pages: Record<string, MDXContent>
  guides: Record<string, MDXContent>
  components: Record<string, MDXContent>
  tokens: Record<string, MDXContent>
  patterns: Record<string, MDXContent>
}

/**
 * Dynamic MDX imports - using Vite's glob import feature
 */
const mdxModules = import.meta.glob('/src/content/**/*.mdx', {
  eager: true,
  as: 'raw'
})

/**
 * Parse frontmatter from MDX content
 */
function parseFrontmatter(content: string): { frontmatter: MDXFrontmatter; body: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return {
      frontmatter: {
        title: 'Untitled',
        description: ''
      },
      body: content
    }
  }
  
  const [, frontmatterYaml, body] = match
  const frontmatter: Partial<MDXFrontmatter> = {}
  
  // Simple YAML parser for frontmatter
  frontmatterYaml.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '')
      if (key && value) {
        (frontmatter as any)[key] = value
      }
    }
  })
  
  return {
    frontmatter: frontmatter as MDXFrontmatter,
    body
  }
}

/**
 * Convert file path to URL path
 */
function pathToUrl(filePath: string): string {
  // Remove /src/content prefix and .mdx extension
  let url = filePath.replace(/^\/src\/content/, '').replace(/\.mdx$/, '')
  
  // Handle pages directory - map to root level
  if (url.startsWith('/pages/')) {
    url = url.replace('/pages', '')
  }
  
  // Handle index files - map to their parent directory
  if (url.endsWith('/index')) {
    url = url.replace('/index', '')
  }
  
  // Ensure leading slash
  if (!url.startsWith('/')) {
    url = '/' + url
  }
  
  // Handle home page
  if (url === '/home') {
    url = '/'
  }
  
  // Handle root index
  if (url === '') {
    url = '/'
  }
  
  return url
}

/**
 * Extract slug from file path
 */
function pathToSlug(filePath: string): string {
  const parts = filePath.split('/')
  const fileName = parts[parts.length - 1]
  return fileName.replace(/\.mdx$/, '')
}

/**
 * Build dynamic content index
 */
function buildContentIndex(): ContentIndex {
  const index: ContentIndex = {
    pages: {},
    guides: {},
    components: {},
    tokens: {},
    patterns: {}
  }
  
  Object.entries(mdxModules).forEach(([filePath, rawContent]) => {
    const { frontmatter, body } = parseFrontmatter(rawContent as string)
    const slug = pathToSlug(filePath)
    const url = pathToUrl(filePath)
    
    const mdxContent: MDXContent = {
      frontmatter,
      content: body,
      slug,
      path: filePath,
      url
    }
    
    // Categorize based on path
    if (filePath.includes('/pages/')) {
      index.pages[slug] = mdxContent
    } else if (filePath.includes('/guides/')) {
      index.guides[slug] = mdxContent
    } else if (filePath.includes('/components/')) {
      index.components[slug] = mdxContent
    } else if (filePath.includes('/tokens/')) {
      index.tokens[slug] = mdxContent
    } else if (filePath.includes('/patterns/')) {
      index.patterns[slug] = mdxContent
    }
  })
  
  return index
}

/**
 * Dynamic content index - built at module load time
 */
export const contentIndex = buildContentIndex()


/**
 * Get content by URL path
 */
export function getContentByUrl(url: string): MDXContent | null {
  // Normalize URL
  if (url === '' || url === '/') {
    url = '/'
  }
  
  // Find content by URL
  const allContent = [
    ...Object.values(contentIndex.pages),
    ...Object.values(contentIndex.guides),
    ...Object.values(contentIndex.components),
    ...Object.values(contentIndex.tokens),
    ...Object.values(contentIndex.patterns),
  ]
  
  return allContent.find(content => content.url === url) || null
}

/**
 * Get content by type and slug
 */
export function getContent(type: keyof ContentIndex, slug: string): MDXContent | null {
  const content = (contentIndex[type] as Record<string, MDXContent>)[slug]
  return content || null
}

/**
 * Get all content of a specific type
 */
export function getAllContent(type: keyof ContentIndex): MDXContent[] {
  return Object.values(contentIndex[type] as Record<string, MDXContent>)
}

/**
 * Search content by query
 */
export function searchContent(query: string): MDXContent[] {
  const allContent = [
    ...Object.values(contentIndex.pages),
    ...Object.values(contentIndex.guides),
    ...Object.values(contentIndex.components),
    ...Object.values(contentIndex.tokens),
    ...Object.values(contentIndex.patterns),
  ]
  
  const lowercaseQuery = query.toLowerCase()
  
  return allContent.filter(content => 
    content.frontmatter.title.toLowerCase().includes(lowercaseQuery) ||
    content.frontmatter.description.toLowerCase().includes(lowercaseQuery) ||
    content.frontmatter.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    content.frontmatter.category?.toLowerCase().includes(lowercaseQuery)
  )
}

/**
 * Get content by category
 */
export function getContentByCategory(category: string): MDXContent[] {
  return Object.values(contentIndex.components).filter(
    content => content.frontmatter.category === category
  )
}

/**
 * Get content by tags
 */
export function getContentByTags(tags: string[]): MDXContent[] {
  return Object.values(contentIndex.patterns).filter(
    content => content.frontmatter.tags?.some(tag => tags.includes(tag))
  )
}