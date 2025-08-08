/**
 * Utility functions for handling paths in development vs production
 */

/**
 * Creates a path that works both in development and production (GitHub Pages)
 * @param path - The path to create (should start with /)
 * @returns The correct path for the current environment
 */
export const createPath = (path: string): string => {
  const basePath = import.meta.env.PROD ? '/elevate-docsite' : ''
  return `${basePath}${path}`
}

/**
 * Gets the base path for the current environment
 * @returns The base path ('/elevate-docsite' in production, '' in development)
 */
export const getBasePath = (): string => {
  return import.meta.env.PROD ? '/elevate-docsite' : ''
}

/**
 * Checks if a given path is the current active path
 * @param href - The href to check
 * @param currentPath - The current router path
 * @returns Whether the path is active
 */
export const isActivePath = (href: string, currentPath: string): boolean => {
  // Remove base path from href for comparison
  const basePath = getBasePath()
  const normalizedHref = href.startsWith(basePath) ? href.slice(basePath.length) : href
  
  return currentPath === normalizedHref || currentPath.startsWith(normalizedHref + '/')
}