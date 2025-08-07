import React from 'react'

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <header>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '700', 
          marginBottom: '1rem',
          color: '#1a1a1a'
        }}>
          ELEVATE Design System
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#4a4a4a',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          Comprehensive documentation, components, and patterns for building exceptional user experiences with the ELEVATE Design System by INFORM.
        </p>
      </header>

      <main style={{ marginTop: '3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '900px'
        }}>
          <div style={{
            padding: '2rem',
            border: '1px solid #e9ecef',
            borderRadius: '0.5rem',
            backgroundColor: '#f8f9fa'
          }}>
            <h2 style={{ color: '#0066cc', marginBottom: '1rem' }}>🎨 For Designers</h2>
            <p>Visual guidelines, design tokens, and usage principles for creating cohesive user interfaces.</p>
          </div>

          <div style={{
            padding: '2rem',
            border: '1px solid #e9ecef',
            borderRadius: '0.5rem',
            backgroundColor: '#f8f9fa'
          }}>
            <h2 style={{ color: '#0066cc', marginBottom: '1rem' }}>⚡ For Developers</h2>
            <p>Component APIs, implementation guides, and code examples for integrating ELEVATE components.</p>
          </div>

          <div style={{
            padding: '2rem',
            border: '1px solid #e9ecef',
            borderRadius: '0.5rem',
            backgroundColor: '#f8f9fa'
          }}>
            <h2 style={{ color: '#0066cc', marginBottom: '1rem' }}>📊 For Product Managers</h2>
            <p>Best practices, business impact, and strategic guidance for design system adoption.</p>
          </div>
        </div>

        <div style={{ 
          marginTop: '3rem',
          padding: '2rem',
          backgroundColor: '#e3f2fd',
          borderRadius: '0.5rem',
          border: '1px solid #bbdefb'
        }}>
          <h3 style={{ color: '#1565c0', marginBottom: '1rem' }}>🚧 Site Under Development</h3>
          <p style={{ color: '#1976d2' }}>
            This documentation site is currently being built. Check back soon for comprehensive component documentation, patterns, and implementation guides.
          </p>
          <p style={{ 
            marginTop: '1rem', 
            fontSize: '0.875rem', 
            color: '#1976d2' 
          }}>
            Repository: <a 
              href="https://github.com/owrede-inform/elevate-docsite" 
              style={{ color: '#0d47a1', textDecoration: 'underline' }}
            >
              github.com/owrede-inform/elevate-docsite
            </a>
          </p>
        </div>
      </main>

      <footer style={{ 
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid #e9ecef',
        color: '#6c757d',
        fontSize: '0.875rem'
      }}>
        <p>Built with ❤️ by INFORM for the ELEVATE Design System</p>
      </footer>
    </div>
  )
}