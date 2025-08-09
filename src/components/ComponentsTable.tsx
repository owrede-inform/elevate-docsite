import React, { useState, useEffect } from 'react'
import { getAllContent } from '../utils/mdxLoader'
import { getComponentVersionInfoAsync, preloadComponentInfo } from '../utils/componentVersionsClient'
import ComponentVersionBadge from './ComponentVersionBadge'
import './ComponentsTable.css'

interface ComponentInfo {
  name: string
  tagName: string
  href: string
}

interface SortConfig {
  key: keyof ComponentInfo
  direction: 'asc' | 'desc'
}

const ComponentsTable: React.FC = () => {
  const [components, setComponents] = useState<ComponentInfo[]>([])
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' })
  const [sortedComponents, setSortedComponents] = useState<ComponentInfo[]>([])
  const [componentVersionData, setComponentVersionData] = useState<Map<string, { version: string, status: string | null }>>(new Map())

  useEffect(() => {
    // Load component data dynamically from MDX content
    const allComponentContent = getAllContent('components')
    const componentData: ComponentInfo[] = allComponentContent
      .filter(component => component.slug !== 'index') // Exclude the index page itself
      .map(component => ({
        name: component.frontmatter.title,
        tagName: component.frontmatter.technicalName || `elvt-${component.slug}`,
        href: component.url
      }))
    
    setComponents(componentData)

    // Preload component version information for better performance
    const tagNames = componentData.map(c => c.tagName)
    const loadVersionData = async () => {
      const newVersionData = new Map()
      
      try {
        await preloadComponentInfo(tagNames)
        
        // Load all component version data into state for sorting
        for (const tagName of tagNames) {
          try {
            const info = await getComponentVersionInfoAsync(tagName)
            newVersionData.set(tagName, info)
          } catch (error) {
            console.warn(`Failed to load version data for ${tagName}:`, error)
            newVersionData.set(tagName, { version: '--', status: null })
          }
        }
        
        setComponentVersionData(newVersionData)
      } catch (error) {
        console.warn('Failed to preload component info:', error)
      }
    }
    
    loadVersionData()
  }, [])

  // Helper function: Convert version string to numbers for semantic sorting
  const parseVersion = (versionString: string): number[] => {
    // Handle non-numeric versions like "--"
    if (versionString === '--' || !versionString || !versionString.match(/^\d+(\.\d+)*$/)) {
      return [-1] // Put non-numeric versions at the beginning
    }
    return versionString.split('.').map(Number)
  }

  // Helper function: Compare two semantic versions
  const compareVersions = (versionA: string, versionB: string): number => {
    // Handle special cases first
    if (versionA === '--' && versionB === '--') return 0
    if (versionA === '--') return -1 // "--" sorts first
    if (versionB === '--') return 1
    
    const va = parseVersion(versionA)
    const vb = parseVersion(versionB)
    
    // If both are non-numeric, sort alphabetically
    if (va[0] === -1 && vb[0] === -1) {
      return versionA.localeCompare(versionB)
    }
    
    // If one is non-numeric, it sorts first
    if (va[0] === -1) return -1
    if (vb[0] === -1) return 1
    
    const maxLength = Math.max(va.length, vb.length)
    
    for (let i = 0; i < maxLength; i++) {
      const numA = va[i] || 0 // Default to 0 if undefined
      const numB = vb[i] || 0 // Default to 0 if undefined
      
      if (numA !== numB) {
        return numA - numB
      }
    }
    return 0
  }

  // Helper function: Compare status values (handle null)
  const compareStatus = (statusA: string | null, statusB: string | null): number => {
    // Handle null values (unimplemented components)
    if (statusA === null && statusB === null) return 0
    if (statusA === null) return 1 // null sorts last
    if (statusB === null) return -1
    
    // Sort alphabetically for valid status values
    return statusA.localeCompare(statusB)
  }

  // Sort components with version/status data
  useEffect(() => {
    const sorted = [...components].sort((a, b) => {
      let comparison = 0

      if (sortConfig.key === 'version') {
        const aVersionInfo = componentVersionData.get(a.tagName) || { version: '--', status: null }
        const bVersionInfo = componentVersionData.get(b.tagName) || { version: '--', status: null }
        comparison = compareVersions(aVersionInfo.version, bVersionInfo.version)
      } else if (sortConfig.key === 'status') {
        const aVersionInfo = componentVersionData.get(a.tagName) || { version: '--', status: null }
        const bVersionInfo = componentVersionData.get(b.tagName) || { version: '--', status: null }
        comparison = compareStatus(aVersionInfo.status, bVersionInfo.status)
      } else {
        const aValue = a[sortConfig.key as keyof ComponentInfo] as string
        const bValue = b[sortConfig.key as keyof ComponentInfo] as string
        comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      }
      
      // Apply sort direction
      return sortConfig.direction === 'asc' ? comparison : -comparison
    })
    
    setSortedComponents(sorted)
  }, [components, sortConfig, componentVersionData])

  const handleSort = (key: keyof ComponentInfo | 'version' | 'status') => {
    setSortConfig(prevConfig => ({
      key: key as keyof ComponentInfo,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }))
  }


  const getSortIcon = (columnKey: keyof ComponentInfo | 'version' | 'status') => {
    if (sortConfig.key !== columnKey) {
      return '⇅' // Both arrows
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }


  return (
    <div className="esds-component-table">
      <table className="esds-component-table__table">
          <thead className="esds-component-table__header">
            <tr>
              <th className="esds-component-table__header-cell">
                <button
                  onClick={() => handleSort('name')}
                  className="esds-component-table__sort-button"
                >
                  Component {getSortIcon('name')}
                </button>
              </th>
              <th className="esds-component-table__header-cell">
                <button
                  onClick={() => handleSort('tagName')}
                  className="esds-component-table__sort-button"
                >
                  Tag Name {getSortIcon('tagName')}
                </button>
              </th>
              <th className="esds-component-table__header-cell">
                <button
                  onClick={() => handleSort('version')}
                  className="esds-component-table__sort-button"
                >
                  Since {getSortIcon('version')}
                </button>
              </th>
              <th className="esds-component-table__header-cell">
                <button
                  onClick={() => handleSort('status')}
                  className="esds-component-table__sort-button"
                >
                  Status {getSortIcon('status')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedComponents.map((component) => (
              <tr key={component.tagName} className="esds-component-table__row">
                <td className="esds-component-table__cell">
                  <a 
                    href={component.href}
                    className="esds-component-table__link"
                  >
                    {component.name}
                  </a>
                </td>
                <td className="esds-component-table__cell">
                  <code className="esds-component-table__code">
                    {component.tagName}
                  </code>
                </td>
                <td className="esds-component-table__cell">
                  <ComponentVersionBadge 
                    tagName={component.tagName} 
                    type="since" 
                  />
                </td>
                <td className="esds-component-table__cell">
                  <ComponentVersionBadge 
                    tagName={component.tagName} 
                    type="status" 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default ComponentsTable