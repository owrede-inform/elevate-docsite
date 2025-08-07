import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PatternCard } from '@/components/react'
import type { PatternCardData } from '@/components/react'

const PatternsPage: React.FC = () => {
  const { patternId } = useParams()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('')

  // Sample pattern data - in production this would come from MDX files
  const samplePatterns: PatternCardData[] = [
    {
      id: 'login-form',
      title: 'Login Form',
      description: 'Complete login form with validation, error handling, and accessibility features',
      tags: ['forms', 'authentication', 'validation'],
      difficulty: 'beginner',
      components: ['Input', 'Button', 'Checkbox'],
    },
    {
      id: 'dashboard-layout',
      title: 'Dashboard Layout',
      description: 'Responsive dashboard layout with sidebar navigation and content areas',
      tags: ['layout', 'navigation', 'responsive'],
      difficulty: 'intermediate',
      components: ['Navigation', 'Card', 'Grid'],
    },
    {
      id: 'data-table',
      title: 'Data Table with Actions',
      description: 'Advanced data table with sorting, filtering, and bulk actions',
      tags: ['tables', 'data-display', 'actions'],
      difficulty: 'advanced',
      components: ['Table', 'Button', 'Checkbox', 'Dropdown'],
    },
    {
      id: 'modal-form',
      title: 'Modal Form',
      description: 'Form within a modal dialog with proper focus management',
      tags: ['forms', 'modals', 'accessibility'],
      difficulty: 'intermediate',
      components: ['Modal', 'Input', 'Button'],
    },
    {
      id: 'notification-system',
      title: 'Notification System',
      description: 'Toast notifications with different types and auto-dismiss functionality',
      tags: ['notifications', 'feedback', 'animations'],
      difficulty: 'intermediate',
      components: ['Alert', 'Button'],
    },
    {
      id: 'search-interface',
      title: 'Search Interface',
      description: 'Advanced search with filters, suggestions, and result highlighting',
      tags: ['search', 'filters', 'autocomplete'],
      difficulty: 'advanced',
      components: ['Input', 'Dropdown', 'Badge', 'Card'],
    },
  ]

  const allTags = [...new Set(samplePatterns.flatMap(p => p.tags))]
  const difficulties = ['beginner', 'intermediate', 'advanced']

  const filteredPatterns = samplePatterns.filter(pattern => {
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => pattern.tags.includes(tag))
    const matchesDifficulty = !selectedDifficulty || pattern.difficulty === selectedDifficulty
    return matchesTags && matchesDifficulty
  })

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handlePatternSelect = (pattern: PatternCardData) => {
    window.location.href = `/patterns/${pattern.id}`
  }

  const handleComponentSelect = (componentName: string) => {
    window.location.href = `/components/${componentName.toLowerCase()}`
  }

  if (patternId) {
    const pattern = samplePatterns.find(p => p.id === patternId)
    
    if (!pattern) {
      return (
        <div className="pattern-not-found">
          <div className="container">
            <h1>Pattern not found</h1>
            <p>The pattern "{patternId}" could not be found.</p>
            <a href="/patterns">← Back to Patterns</a>
          </div>
        </div>
      )
    }

    return (
      <div className="pattern-detail-page">
        <div className="container">
          <div className="breadcrumb">
            <a href="/patterns">Patterns</a>
            <span> / </span>
            <span>{pattern.title}</span>
          </div>
          
          <header className="pattern-header">
            <h1>{pattern.title}</h1>
            <p>{pattern.description}</p>
          </header>
          
          <div className="pattern-content">
            <div className="placeholder-notice">
              <h3>🚧 Pattern Documentation Coming Soon</h3>
              <p>
                This pattern's full documentation will be loaded from MDX files in the 
                <code>/src/content/patterns/</code> directory.
              </p>
              <p>Each pattern will include:</p>
              <ul>
                <li>Complete implementation example</li>
                <li>Step-by-step breakdown</li>
                <li>Component usage details</li>
                <li>Accessibility considerations</li>
                <li>Responsive behavior</li>
                <li>Related patterns and variations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="patterns-page">
      <div className="container">
        <header className="page-header">
          <h1>Patterns</h1>
          <p>
            Reusable code patterns and examples using ELEVATE components. 
            Each pattern includes complete implementation details and best practices.
          </p>
        </header>

        {/* Filters */}
        <div className="filters">
          <div className="filter-group">
            <h3>Filter by Tags</h3>
            <div className="tag-filters">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`tag-filter ${selectedTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Filter by Difficulty</h3>
            <select 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="difficulty-filter"
            >
              <option value="">All Difficulties</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {(selectedTags.length > 0 || selectedDifficulty) && (
            <div className="filter-group">
              <button 
                className="clear-filters"
                onClick={() => {
                  setSelectedTags([])
                  setSelectedDifficulty('')
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="results-info">
          <span>Showing {filteredPatterns.length} of {samplePatterns.length} patterns</span>
        </div>

        {/* Patterns grid */}
        <div className="patterns-grid">
          {filteredPatterns.map(pattern => (
            <PatternCard
              key={pattern.id}
              pattern={pattern}
              interactive={true}
              onPatternSelect={handlePatternSelect}
              onComponentSelect={handleComponentSelect}
            />
          ))}
        </div>

        {filteredPatterns.length === 0 && (
          <div className="no-results">
            <h3>No patterns found</h3>
            <p>Try adjusting your filters to see more patterns.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .patterns-page {
          padding: 2rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .page-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .page-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .page-header p {
          font-size: 1.125rem;
          color: var(--elevate-color-text-secondary, #4a4a4a);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .filters {
          background: var(--elevate-color-background-secondary, #f8f9fa);
          border: 1px solid var(--elevate-color-border-light, #e9ecef);
          border-radius: 0.5rem;
          padding: 2rem;
          margin-bottom: 2rem;
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 2rem;
          align-items: start;
        }

        .filter-group h3 {
          font-size: 1rem;
          margin-bottom: 1rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .tag-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag-filter {
          padding: 0.5rem 1rem;
          background: var(--elevate-color-background-primary, #ffffff);
          border: 1px solid var(--elevate-color-border-light, #e9ecef);
          border-radius: 1.5rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tag-filter:hover {
          border-color: var(--elevate-color-primary, #0066cc);
        }

        .tag-filter.active {
          background: var(--elevate-color-primary, #0066cc);
          color: white;
          border-color: var(--elevate-color-primary, #0066cc);
        }

        .difficulty-filter {
          padding: 0.5rem 1rem;
          border: 1px solid var(--elevate-color-border-light, #e9ecef);
          border-radius: 0.25rem;
          font-size: 0.875rem;
          background: var(--elevate-color-background-primary, #ffffff);
        }

        .clear-filters {
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid var(--elevate-color-danger, #dc3545);
          color: var(--elevate-color-danger, #dc3545);
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .clear-filters:hover {
          background: var(--elevate-color-danger, #dc3545);
          color: white;
        }

        .results-info {
          margin-bottom: 2rem;
          color: var(--elevate-color-text-secondary, #6c757d);
          font-size: 0.875rem;
        }

        .patterns-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--elevate-color-text-secondary, #6c757d);
        }

        .no-results h3 {
          margin-bottom: 0.5rem;
        }

        .pattern-not-found,
        .pattern-detail-page {
          padding: 2rem 0;
        }

        .breadcrumb {
          margin-bottom: 2rem;
          font-size: 0.875rem;
          color: var(--elevate-color-text-secondary, #6c757d);
        }

        .breadcrumb a {
          color: var(--elevate-color-primary, #0066cc);
          text-decoration: none;
        }

        .breadcrumb a:hover {
          text-decoration: underline;
        }

        .pattern-header {
          margin-bottom: 3rem;
        }

        .pattern-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .placeholder-notice {
          background: var(--elevate-color-background-secondary, #f8f9fa);
          border: 1px solid var(--elevate-color-border-light, #e9ecef);
          border-radius: 0.5rem;
          padding: 2rem;
          text-align: center;
        }

        .placeholder-notice h3 {
          color: var(--elevate-color-primary, #0066cc);
          margin-bottom: 1rem;
        }

        .placeholder-notice ul {
          text-align: left;
          max-width: 600px;
          margin: 0 auto;
        }

        .placeholder-notice code {
          background: var(--elevate-color-background-primary, #ffffff);
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .filters {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .patterns-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default PatternsPage