import React, { useState, useEffect } from 'react'
import { getComponentVersionInfoAsync } from '../utils/componentVersionsClient'

/**
 * ComponentVersionBadge displays version information for ELEVATE components
 * 
 * IMPORTANT: Version Terminology
 * - "Since": Shows the elevate-core-ui version when a component was FIRST introduced
 * - "Version": Would show the elevate-core-ui version when a component was LAST updated
 * 
 * Current Implementation: Only "Since" is available (first introduction)
 * Future Enhancement: "Version" (last updated) would require:
 *   1. Parsing file modification dates from elevate-core-ui source
 *   2. Cross-referencing with release dates from package.json history
 *   3. Determining the last release that included changes to each component
 */

interface ComponentVersionBadgeProps {
  tagName: string
  type?: 'since' | 'status' | 'both' // Note: 'since' shows first introduced version, not latest update
}

const ComponentVersionBadge: React.FC<ComponentVersionBadgeProps> = ({ 
  tagName, 
  type = 'both' 
}) => {
  const [componentData, setComponentData] = useState<{
    since: string // The elevate-core-ui version when component was first introduced
    status: string | null
    loading: boolean
  }>({ version: '...', status: 'Loading...', loading: true })

  useEffect(() => {
    let isMounted = true

    const loadComponentData = async () => {
      try {
        const data = await getComponentVersionInfoAsync(tagName)
        
        if (isMounted) {
          setComponentData({
            since: data.version, // API returns 'version' but semantically this is 'since'
            status: data.status,
            loading: false
          })
        }
      } catch (error) {
        if (isMounted) {
          console.warn(`Failed to load component data for ${tagName}:`, error)
          setComponentData({
            since: '--',
            status: null,
            loading: false
          })
        }
      }
    }

    loadComponentData()

    return () => {
      isMounted = false
    }
  }, [tagName])

  const { since, status, loading } = componentData

  // Map status to appropriate badge tone
  const getStatusTone = (status: string | null, isLoading: boolean = false) => {
    if (isLoading) return 'neutral'
    if (!status) return 'subtle'
    const statusTones: Record<string, string> = {
      'stable': 'success',
      'complete': 'success', 
      'beta': 'warning',
      'alpha': 'warning',
      'preliminary': 'neutral',
      'unstable': 'warning',
      'deprecated': 'danger',
      'experimental': 'danger'
    }
    return statusTones[status.toLowerCase()] || 'neutral'
  }

  // Map status to display text
  const getStatusDisplayText = (status: string | null, isLoading: boolean = false) => {
    if (isLoading) return 'Loading...'
    if (!status) return 'Not Implemented'
    const statusText: Record<string, string> = {
      'stable': 'Stable',
      'complete': 'Complete',
      'beta': 'Beta', 
      'alpha': 'Alpha',
      'preliminary': 'Preliminary',
      'unstable': 'Unstable',
      'deprecated': 'Deprecated'
    }
    return statusText[status.toLowerCase()] || status
  }

  if (type === 'since') {
    const isPlaceholder = since === '...' || loading
    const displaySince = isPlaceholder ? '...' : (since === '--' ? '--' : `v${since}`)
    
    return (
      <elvt-badge shape="pill" tone={since === '--' ? 'subtle' : 'neutral'} size="small">
        {displaySince}
      </elvt-badge>
    )
  }

  if (type === 'status') {
    return (
      <elvt-badge shape="pill" tone={getStatusTone(status, loading)} size="small">
        {getStatusDisplayText(status, loading)}
      </elvt-badge>
    )
  }

  // Default: both status and since
  const isSincePlaceholder = since === '...' || loading
  const displaySince = isSincePlaceholder ? '...' : (since === '--' ? '--' : `v${since}`)
  
  return (
    <>
      <elvt-badge shape="pill" tone={getStatusTone(status, loading)} size="small">
        {getStatusDisplayText(status, loading)}
      </elvt-badge>{' '}
      <elvt-badge shape="pill" tone={since === '--' ? 'subtle' : 'neutral'} size="small">
        {displaySince}
      </elvt-badge>
    </>
  )
}

export default ComponentVersionBadge