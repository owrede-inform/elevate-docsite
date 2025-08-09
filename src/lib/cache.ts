import fs from 'fs'
import path from 'path'
import { CacheEntry, BuildCache } from '@/types'

const CACHE_DIR = path.join(process.cwd(), '.cache')
const CACHE_FILE = path.join(CACHE_DIR, 'build-cache.json')
const DEFAULT_TTL = 1000 * 60 * 60 * 24 // 24 hours

/**
 * Simple file-based cache for build optimization
 */
export class Cache {
  private static cache: Map<string, CacheEntry> = new Map()
  private static initialized = false

  private static initialize() {
    if (this.initialized) return

    // Ensure cache directory exists
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true })
    }

    // Load existing cache
    try {
      if (fs.existsSync(CACHE_FILE)) {
        const data = fs.readFileSync(CACHE_FILE, 'utf-8')
        const parsed = JSON.parse(data)
        
        Object.entries(parsed).forEach(([key, entry]) => {
          this.cache.set(key, entry as CacheEntry)
        })
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('Failed to load cache:', error);
      }
    }

    this.initialized = true
  }

  /**
   * Get cached value if not expired
   */
  static get<T>(key: string): T | null {
    this.initialize()
    
    const entry = this.cache.get(key)
    if (!entry) return null

    const now = Date.now()
    if (now > entry.timestamp + entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  /**
   * Set cache value with TTL
   */
  static set<T>(key: string, data: T, ttl: number = DEFAULT_TTL): void {
    this.initialize()
    
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl
    }

    this.cache.set(key, entry)
    this.persist()
  }

  /**
   * Check if cache has valid entry
   */
  static has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * Clear specific cache entry
   */
  static delete(key: string): void {
    this.initialize()
    this.cache.delete(key)
    this.persist()
  }

  /**
   * Clear all cache entries
   */
  static clear(): void {
    this.initialize()
    this.cache.clear()
    this.persist()
  }

  /**
   * Persist cache to disk
   */
  private static persist(): void {
    try {
      const data = Object.fromEntries(this.cache.entries())
      fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2))
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('Failed to persist cache:', error);
      }
    }
  }

  /**
   * Get cache statistics
   */
  static getStats() {
    this.initialize()
    
    const now = Date.now()
    let validEntries = 0
    let expiredEntries = 0

    this.cache.forEach((entry) => {
      if (now <= entry.timestamp + entry.ttl) {
        validEntries++
      } else {
        expiredEntries++
      }
    })

    return {
      total: this.cache.size,
      valid: validEntries,
      expired: expiredEntries,
      hitRate: validEntries / (validEntries + expiredEntries) || 0
    }
  }
}

/**
 * Cache utilities for specific data types
 */
export const CacheUtils = {
  /**
   * Cache key generators
   */
  keys: {
    component: (name: string) => `component:${name}`,
    pattern: (id: string) => `pattern:${id}`,
    mdx: (filePath: string) => `mdx:${filePath}`,
    github: (endpoint: string) => `github:${endpoint}`,
    build: () => 'build:metadata'
  },

  /**
   * Component-specific cache methods
   */
  component: {
    get: (name: string) => Cache.get(CacheUtils.keys.component(name)),
    set: (name: string, data: any) => Cache.set(CacheUtils.keys.component(name), data)
  },

  /**
   * Pattern-specific cache methods
   */
  pattern: {
    get: (id: string) => Cache.get(CacheUtils.keys.pattern(id)),
    set: (id: string, data: any) => Cache.set(CacheUtils.keys.pattern(id), data)
  },

  /**
   * MDX file cache methods
   */
  mdx: {
    get: (filePath: string) => Cache.get(CacheUtils.keys.mdx(filePath)),
    set: (filePath: string, data: any) => Cache.set(CacheUtils.keys.mdx(filePath), data)
  }
}