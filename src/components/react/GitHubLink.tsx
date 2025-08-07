import React, { useEffect, useRef } from 'react'

interface GitHubLinkProps {
  repo?: string
  issueNumber?: string
  text?: string
  title?: string
  size?: 'small' | 'medium' | 'large'
  showIcon?: boolean
  externalLink?: boolean
  className?: string
  onClick?: (data: { repo: string; issueNumber: string; url: string }) => void
}

/**
 * React wrapper for esds-github-link WebComponent
 */
export const GitHubLink: React.FC<GitHubLinkProps> = ({
  repo = 'owrede-inform/elevate-docsite',
  issueNumber = '',
  text = '',
  title = '',
  size = 'small',
  showIcon = true,
  externalLink = true,
  className,
  onClick
}) => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set properties directly on the element
    ;(element as any).repo = repo
    ;(element as any).issueNumber = issueNumber
    ;(element as any).text = text
    ;(element as any).title = title
    ;(element as any).size = size
    ;(element as any).showIcon = showIcon
    ;(element as any).externalLink = externalLink
  }, [repo, issueNumber, text, title, size, showIcon, externalLink])

  useEffect(() => {
    const element = elementRef.current
    if (!element || !onClick) return

    const handleClick = (event: CustomEvent) => {
      onClick(event.detail)
    }

    element.addEventListener('github-link-click', handleClick as EventListener)
    return () => element.removeEventListener('github-link-click', handleClick as EventListener)
  }, [onClick])

  return (
    <esds-github-link
      ref={elementRef}
      className={className}
    />
  )
}

export default GitHubLink