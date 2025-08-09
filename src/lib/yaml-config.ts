import yaml from 'js-yaml'
import React from 'react'

// Type definitions for YAML configurations
export interface NavigationSection {
  title: string
  sections: Array<{
    title: string
    path: string
    description?: string
    component?: string
  }>
}

export interface NavigationConfig {
  navigation: {
    main: NavigationSection[]
    secondary?: {
      footer: Array<{
        title: string
        links: Array<{
          title: string
          url: string
          external?: boolean
        }>
      }>
    }
    mobile?: {
      breakpoint: number
      collapsible_sections: boolean
      search_enabled: boolean
    }
  }
}

export interface TokenSystemConfig {
  token_system: {
    layers: Array<{
      name: string
      prefix: string
      description?: string
      source?: string
      inherits?: string | string[]
      immutable?: boolean
      can_override?: boolean
      extensions?: boolean
    }>
    categories: Record<string, {
      primitive_tokens?: string[]
      alias_tokens?: string[]
      component_tokens?: string[]
    }>
  }
  live_example?: {
    isolation_mode: string
    description?: string
    allowed_prefixes?: string[]
    blocked_prefixes?: string[]
    containment?: Record<string, boolean>
  }
  validation?: {
    required_fallbacks?: boolean
    circular_references?: boolean
    unused_tokens?: 'warn' | 'error'
    missing_primitives?: 'warn' | 'error'
  }
}

export interface ComponentProp {
  name: string
  type: string
  required?: boolean
  options?: string[]
  default?: any
  description?: string
}

export interface ComponentExample {
  name: string
  title?: string
  description?: string
  code: string
}

export interface ComponentToken {
  name: string
  category: string
  description: string
}

export interface ComponentConfig {
  elevate_component: string
  category: string
  status: 'stable' | 'beta' | 'alpha' | 'deprecated'
  version: string
  description: string
  props?: ComponentProp[]
  tokens?: ComponentToken[]
  examples?: ComponentExample[]
}

export interface ComponentsConfig {
  components: Record<string, ComponentConfig>
  global?: {
    example_container?: Record<string, string>
    code_block?: Record<string, any>
    token_table?: Record<string, any>
  }
}

export interface SiteConfig {
  site: {
    title: string
    description: string
    version: string
    base_url: string
    metadata?: Record<string, any>
    brand?: Record<string, any>
    content?: Record<string, any>
    features?: Record<string, boolean>
    build?: Record<string, any>
    development?: Record<string, boolean>
    analytics?: Record<string, any>
    accessibility?: Record<string, boolean>
    performance?: Record<string, any>
    deployment?: Record<string, any>
  }
}

/**
 * YAML Configuration Loader
 * 
 * Utilities for loading and parsing YAML configuration files
 * used throughout the ESDS documentation system.
 */
class YamlConfigLoader {
  private configCache = new Map<string, any>()

  /**
   * Load and parse a YAML configuration file
   */
  async loadConfig<T = any>(configPath: string): Promise<T> {
    if (this.configCache.has(configPath)) {
      return this.configCache.get(configPath)
    }

    try {
      // In a browser environment, we need to fetch the config file
      const response = await fetch(configPath)
      if (!response.ok) {
        throw new Error(`Failed to load config: ${response.statusText}`)
      }
      
      const yamlText = await response.text()
      const config = yaml.load(yamlText) as T
      
      // Cache the parsed config
      this.configCache.set(configPath, config)
      
      return config
    } catch (error) {
      console.error(`Error loading YAML config from ${configPath}:`, error)
      throw error
    }
  }

  /**
   * Load navigation configuration
   */
  async loadNavigationConfig(): Promise<NavigationConfig> {
    return this.loadConfig<NavigationConfig>('/config/navigation.yml')
  }

  /**
   * Load token system configuration
   */
  async loadTokenConfig(): Promise<TokenSystemConfig> {
    return this.loadConfig<TokenSystemConfig>('/config/tokens.yml')
  }

  /**
   * Load components configuration
   */
  async loadComponentsConfig(): Promise<ComponentsConfig> {
    return this.loadConfig<ComponentsConfig>('/config/components.yml')
  }

  /**
   * Load site configuration
   */
  async loadSiteConfig(): Promise<SiteConfig> {
    return this.loadConfig<SiteConfig>('/config/site.yml')
  }

  /**
   * Get component configuration by name
   */
  async getComponentConfig(componentName: string): Promise<ComponentConfig | null> {
    try {
      const config = await this.loadComponentsConfig()
      return config.components[componentName] || null
    } catch (error) {
      console.error(`Error loading component config for ${componentName}:`, error)
      return null
    }
  }

  /**
   * Clear configuration cache
   */
  clearCache(): void {
    this.configCache.clear()
  }

  /**
   * Validate configuration structure
   */
  validateConfig(config: any, requiredFields: string[]): boolean {
    for (const field of requiredFields) {
      if (!(field in config)) {
        console.warn(`Missing required field: ${field}`)
        return false
      }
    }
    return true
  }
}

// Create singleton instance
export const yamlConfigLoader = new YamlConfigLoader()

// Convenience functions for common operations
export const loadNavigationConfig = () => yamlConfigLoader.loadNavigationConfig()
export const loadTokenConfig = () => yamlConfigLoader.loadTokenConfig() 
export const loadComponentsConfig = () => yamlConfigLoader.loadComponentsConfig()
export const loadSiteConfig = () => yamlConfigLoader.loadSiteConfig()
export const getComponentConfig = (name: string) => yamlConfigLoader.getComponentConfig(name)

// Development helpers
export const reloadConfigs = () => yamlConfigLoader.clearCache()

/**
 * Hook for React components to load configuration
 */
export const useYamlConfig = <T>(configPath: string) => {
  const [config, setConfig] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    let mounted = true

    const loadConfiguration = async () => {
      try {
        setLoading(true)
        setError(null)
        const loadedConfig = await yamlConfigLoader.loadConfig<T>(configPath)
        
        if (mounted) {
          setConfig(loadedConfig)
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

    loadConfiguration()

    return () => {
      mounted = false
    }
  }, [configPath])

  return { config, loading, error, reload: () => yamlConfigLoader.clearCache() }
}