// Component documentation types
export interface ComponentDoc {
  name: string
  description: string
  category: string
  props?: PropDoc[]
  examples?: CodeExample[]
  patterns?: string[] // Pattern IDs that use this component
  githubIssues?: string[]
}

export interface PropDoc {
  name: string
  type: string
  required: boolean
  default?: string
  description: string
}

export interface CodeExample {
  title: string
  description?: string
  code: string
  preview?: boolean
  language?: string
}

// Pattern types
export interface Pattern {
  id: string
  title: string
  description: string
  tags: string[]
  components: string[] // Component names used in this pattern
  code: string
  preview?: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
  role?: UserRole[]
}

export type UserRole = 'designer' | 'developer' | 'product-manager'

// Content types
export interface ContentMeta {
  title: string
  description: string
  role?: UserRole[]
  category: string
  tags?: string[]
  lastUpdated?: string
  githubIssue?: string
}

// ESDS Component types
export interface ESDSComponent {
  tagName: string
  displayName: string
  description: string
  props: Record<string, any>
  events?: string[]
  slots?: string[]
}

// GitHub integration
export interface GitHubIssue {
  number: number
  title: string
  url: string
  state: 'open' | 'closed'
}

// Cache types
export interface CacheEntry<T = any> {
  data: T
  timestamp: number
  ttl: number
}

export interface BuildCache {
  components: Record<string, ComponentDoc>
  patterns: Record<string, Pattern>
  navigation: NavItem[]
  lastBuild: number
}