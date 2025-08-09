/**
 * MDX Components
 * 
 * Custom components that can be used within MDX content files.
 * These provide enhanced functionality and consistent styling.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { ComponentPreview } from '../react/ComponentPreview'

// Hero Section Components
export const HeroActions: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="hero-actions">
    {children}
    <style>{`
      .hero-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
        margin: 2rem 0;
      }
      
      @media (max-width: 768px) {
        .hero-actions {
          flex-direction: column;
          align-items: center;
        }
      }
    `}</style>
  </div>
)

export const PrimaryButton: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="btn btn-primary">
    {children}
    <style>{`
      .btn {
        display: inline-block;
        padding: 0.875rem 2rem;
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;
        border-radius: 0.5rem;
        transition: all 0.2s ease;
        border: 2px solid transparent;
      }

      .btn-primary {
        background: var(--esds-alias-color-brand-primary);
        color: white;
      }

      .btn-primary:hover {
        background: var(--esds-alias-color-brand-primary);
        opacity: 0.9;
        transform: translateY(-1px);
      }
      
      @media (max-width: 768px) {
        .btn {
          width: 100%;
          max-width: 300px;
          text-align: center;
        }
      }
    `}</style>
  </Link>
)

export const SecondaryButton: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="btn btn-secondary">
    {children}
    <style>{`
      .btn-secondary {
        background: transparent;
        color: var(--esds-alias-color-brand-primary);
        border-color: var(--esds-alias-color-brand-primary);
      }

      .btn-secondary:hover {
        background: var(--esds-alias-color-brand-primary);
        color: white;
        transform: translateY(-1px);
      }
    `}</style>
  </Link>
)

// Feature Grid Components
export const FeatureGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="feature-grid">
    {children}
    <style>{`
      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
        margin: 3rem 0;
      }
    `}</style>
  </div>
)

export const FeatureCard: React.FC<{
  icon: string
  title: string
  link: string
  linkText: string
  children: React.ReactNode
}> = ({ icon, title, link, linkText, children }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{children}</p>
    <Link to={link} className="feature-link">
      {linkText}
    </Link>
    
    <style>{`
      .feature-card {
        padding: 2rem;
        background: var(--esds-alias-background-elevated);
        border: 1px solid var(--esds-alias-sidebar-border);
        border-radius: 0.75rem;
        text-align: center;
        transition: all 0.2s ease;
      }

      .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      .feature-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      .feature-card h3 {
        font-size: var(--esds-alias-heading-4-font-size);
        margin-bottom: 1rem;
        color: var(--esds-alias-text-heading);
      }

      .feature-card p {
        color: var(--esds-alias-text-muted);
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }

      .feature-link {
        color: var(--esds-alias-color-brand-primary);
        text-decoration: none;
        font-weight: 600;
        font-size: 1rem;
      }

      .feature-link:hover {
        text-decoration: underline;
      }
    `}</style>
  </div>
)

// Quick Start Components
export const QuickStart: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section className="quick-start">
    <div className="quick-start-content">
      {children}
    </div>
    
    <style>{`
      .quick-start {
        padding: 4rem 0;
        background: var(--esds-alias-background-surface);
        border-radius: 1rem;
        margin: 3rem 0;
      }

      .quick-start-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
      }

      @media (max-width: 768px) {
        .quick-start-content {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
      }
    `}</style>
  </section>
)

export const QuickStartText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="quick-start-text">
    {children}
    <style>{`
      .quick-start-text h2 {
        font-size: var(--esds-alias-heading-2-font-size);
        margin-bottom: 1rem;
        color: var(--esds-alias-text-heading);
      }

      .quick-start-text p {
        font-size: var(--esds-alias-body-large-font-size);
        color: var(--esds-alias-text-muted);
        line-height: 1.6;
        margin-bottom: 2rem;
      }
    `}</style>
  </div>
)

export const CodeBlock: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="code-block">
    <div className="code-header">
      <span>{title}</span>
    </div>
    <div className="code-content">
      {children}
    </div>
    
    <style>{`
      .code-block {
        background: var(--esds-alias-background-page);
        border: 1px solid var(--esds-alias-sidebar-border);
        border-radius: 0.5rem;
        overflow: hidden;
      }

      [data-theme="dark"] .code-block {
        background: var(--esds-alias-text-heading);
      }

      .code-header {
        padding: 0.75rem 1rem;
        background: var(--esds-alias-background-surface);
        color: var(--esds-alias-text-muted);
        font-size: var(--esds-alias-label-small-font-size);
        font-weight: var(--esds-alias-label-small-font-weight);
        border-bottom: 1px solid var(--esds-alias-sidebar-border);
      }

      [data-theme="dark"] .code-header {
        background: var(--esds-alias-background-overlay, rgba(255, 255, 255, 0.1));
        color: white;
      }

      .code-content pre {
        margin: 0;
        padding: 1.5rem;
        background: none;
        border: none;
        overflow-x: auto;
        font-family: var(--esds-alias-font-family-code);
        font-size: var(--esds-alias-code-block-font-size);
        line-height: var(--esds-alias-code-block-line-height);
      }

      .code-content code {
        color: var(--esds-alias-color-brand-primary);
        font-family: var(--esds-alias-font-family-code);
      }

      [data-theme="dark"] .code-content code {
        color: #61dafb;
      }
    `}</style>
  </div>
)

// Stats Grid Components
export const StatsGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="stats-grid">
    {children}
    <style>{`
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin: 3rem 0;
        padding: 2rem;
        background: var(--esds-alias-background-surface);
        border-radius: 1rem;
      }
    `}</style>
  </div>
)

export const Stat: React.FC<{ number: string; label: string }> = ({ number, label }) => (
  <div className="stat-item">
    <div className="stat-number">{number}</div>
    <div className="stat-label">{label}</div>
    
    <style>{`
      .stat-item {
        text-align: center;
        padding: 1.5rem;
      }

      .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--esds-alias-color-brand-primary);
        margin-bottom: 0.5rem;
        line-height: 1;
      }

      .stat-label {
        color: var(--esds-alias-text-muted);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: var(--esds-alias-label-small-font-size);
      }
    `}</style>
  </div>
)

// Component Status
export const ComponentStatus: React.FC<{ status: 'stable' | 'beta' | 'alpha' | 'deprecated' }> = ({ status }) => (
  <div className={`component-status status-${status}`}>
    <span className="status-indicator"></span>
    <span className="status-text">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    
    <style>{`
      .component-status {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: var(--esds-alias-label-small-font-size);
        font-weight: var(--esds-alias-label-small-font-weight);
        margin-bottom: 1rem;
      }

      .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      .status-stable {
        background: var(--esds-status-stable-background, #dcfce7);
        color: var(--esds-status-stable-color, #166534);
      }

      .status-stable .status-indicator {
        background: var(--esds-status-stable-background, #22c55e);
      }

      .status-beta {
        background: var(--esds-status-beta-background, #fef3c7);
        color: var(--esds-status-beta-color, #92400e);
      }

      .status-beta .status-indicator {
        background: var(--esds-status-beta-background, #f59e0b);
      }

      .status-alpha {
        background: var(--esds-status-alpha-background, #e0e7ff);
        color: var(--esds-status-alpha-color, #3730a3);
      }

      .status-alpha .status-indicator {
        background: var(--esds-status-alpha-background, #6366f1);
      }

      .status-deprecated {
        background: var(--esds-status-deprecated-background, #fee2e2);
        color: var(--esds-status-deprecated-color, #991b1b);
      }

      .status-deprecated .status-indicator {
        background: var(--esds-status-deprecated-background, #ef4444);
      }
    `}</style>
  </div>
)

// ComponentPreview component for MDX usage
export { ComponentPreview }

// Export all components for MDX usage
export const mdxComponents = {
  HeroActions,
  PrimaryButton,
  SecondaryButton,
  FeatureGrid,
  FeatureCard,
  QuickStart,
  QuickStartText,
  CodeBlock,
  StatsGrid,
  Stat,
  ComponentStatus,
  ComponentPreview,
}