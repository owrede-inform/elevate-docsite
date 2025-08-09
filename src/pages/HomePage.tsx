import React from 'react'
import { Link } from 'react-router-dom'
import { 
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
  ComponentPreview
} from '../components/mdx/MDXComponents'

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              ELEVATE Design System
            </h1>
            <p className="hero-subtitle">
              Comprehensive documentation, components, and patterns for building exceptional user experiences with the ELEVATE Design System by INFORM.
            </p>
            <HeroActions>
              <PrimaryButton to="/components">Explore Components</PrimaryButton>
              <SecondaryButton to="/guides">View Guides</SecondaryButton>
            </HeroActions>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="features">
          <h2 className="features-title">Built for Everyone</h2>
          <FeatureGrid>
            <FeatureCard 
              icon="🎨" 
              title="For Designers" 
              link="/guides/designers" 
              linkText="Design Guidelines →"
            >
              Visual guidelines, design tokens, and usage principles for creating cohesive user interfaces. 
              Access color palettes, typography scales, and spacing systems.
            </FeatureCard>

            <FeatureCard 
              icon="⚡" 
              title="For Developers" 
              link="/guides/developers" 
              linkText="Implementation Docs →"
            >
              Component APIs, implementation guides, and code examples for integrating ELEVATE components. 
              TypeScript support and comprehensive documentation.
            </FeatureCard>

            <FeatureCard 
              icon="📊" 
              title="For Product Managers" 
              link="/guides/product-managers" 
              linkText="Strategy Guide →"
            >
              Best practices, business impact, and strategic guidance for design system adoption. 
              ROI metrics and team collaboration workflows.
            </FeatureCard>
          </FeatureGrid>
        </section>

        {/* Quick Start */}
        <QuickStart>
          <QuickStartText>
            <h2>Get Started in Minutes</h2>
            <p>
              Install the ELEVATE components and start building with our comprehensive design system.
              Everything you need is documented and ready to use.
            </p>
            <PrimaryButton to="/guides/getting-started">
              Quick Start Guide
            </PrimaryButton>
          </QuickStartText>
          
          <CodeBlock title="Terminal">
            <pre><code>{`npm install @inform-design/elevate-core-ui
npm install @inform-design/elevate-design-tokens
npm install @inform-design/elevate-icons`}</code></pre>
          </CodeBlock>
        </QuickStart>

        {/* Stats */}
        <StatsGrid>
          <Stat number="50+" label="Components" />
          <Stat number="100+" label="Patterns" />
          <Stat number="3" label="User Roles" />
          <Stat number="TypeScript" label="Support" />
        </StatsGrid>

        {/* ELEVATE Integration Note */}
        <section className="elevate-integration">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>ELEVATE Components Ready</h2>
            <p>ELEVATE components are now integrated and can be used throughout the documentation. 
            Check out the Component Preview examples below to see them in action.</p>
          </div>
        </section>

        {/* ComponentPreview Test */}
        <section className="component-preview-demo">
          <h2>Component Preview Demo</h2>
          <p>Test of the new ComponentPreview component with ELEVATE web components:</p>
          
          <ComponentPreview
            title="ELEVATE Button Examples"
            code={`<elvt-button tone="primary">Primary Button</elvt-button>
<elvt-button tone="secondary">Secondary Button</elvt-button>
<elvt-button tone="danger">Danger Button</elvt-button>`}
            preview={true}
            showCopy={true}
          />
          
          <ComponentPreview
            title="ELEVATE Stack Layout"
            code={`<elvt-stack gap="m" direction="row">
  <elvt-button tone="primary">Button 1</elvt-button>
  <elvt-button tone="secondary">Button 2</elvt-button>
  <elvt-button tone="tertiary">Button 3</elvt-button>
</elvt-stack>`}
            preview={true}
            showCopy={true}
          />
        </section>

        {/* Features List */}
        <section className="features-detailed">
          <h2>What's Included</h2>
          <div className="features-list">
            <div className="features-column">
              <h3>Components & Patterns</h3>
              <ul>
                <li>✅ 50+ Production-ready components</li>
                <li>✅ Interactive code examples</li>
                <li>✅ Copy-paste patterns</li>
                <li>✅ Accessibility built-in</li>
                <li>✅ Responsive design</li>
              </ul>
            </div>
            <div className="features-column">
              <h3>Developer Experience</h3>
              <ul>
                <li>✅ TypeScript definitions</li>
                <li>✅ Live code previews</li>
                <li>✅ GitHub issue integration</li>
                <li>✅ Search functionality</li>
                <li>✅ Mobile-optimized</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .home-page {
          padding: 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        /* Hero Section */
        .hero {
          padding: 4rem 0 6rem 0;
          text-align: center;
          background: linear-gradient(135deg, 
            var(--esds-alias-background-page) 0%,
            var(--esds-alias-background-surface) 100%);
        }

        .hero-title {
          font-size: var(--esds-alias-display-1-font-size);
          font-weight: var(--esds-alias-display-1-font-weight);
          line-height: var(--esds-alias-display-1-line-height);
          letter-spacing: var(--esds-alias-display-1-letter-spacing);
          margin-bottom: 1.5rem;
          color: var(--esds-alias-text-heading);
        }

        .hero-subtitle {
          font-size: var(--esds-alias-body-large-font-size);
          font-weight: var(--esds-alias-body-large-font-weight);
          line-height: var(--esds-alias-body-large-line-height);
          color: var(--esds-alias-text-muted);
          margin-bottom: 2.5rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Features Section */
        .features {
          padding: 4rem 0;
        }

        .features-title {
          text-align: center;
          font-size: var(--esds-alias-heading-1-font-size);
          font-weight: var(--esds-alias-heading-1-font-weight);
          margin-bottom: 3rem;
          color: var(--esds-alias-text-heading);
        }

        /* ELEVATE Integration */
        .elevate-integration {
          padding: 3rem 0;
          border-top: 1px solid var(--esds-alias-sidebar-border);
          border-bottom: 1px solid var(--esds-alias-sidebar-border);
          background: var(--esds-alias-background-surface);
        }

        .component-preview-demo {
          padding: 4rem 0;
          border-bottom: 1px solid var(--esds-alias-sidebar-border);
        }

        .component-preview-demo h2 {
          text-align: center;
          font-size: var(--esds-alias-heading-2-font-size);
          margin-bottom: 1rem;
          color: var(--esds-alias-text-heading);
        }

        .component-preview-demo p {
          text-align: center;
          font-size: var(--esds-alias-body-large-font-size);
          color: var(--esds-alias-text-muted);
          margin-bottom: 2rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .features-detailed {
          padding: 4rem 0;
        }

        .features-detailed h2 {
          text-align: center;
          font-size: var(--esds-alias-heading-2-font-size);
          margin-bottom: 3rem;
          color: var(--esds-alias-text-heading);
        }

        .features-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 3rem;
        }

        .features-column h3 {
          font-size: var(--esds-alias-heading-4-font-size);
          margin-bottom: 1.5rem;
          color: var(--esds-alias-text-heading);
        }

        .features-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .features-column li {
          padding: 0.5rem 0;
          color: var(--esds-alias-text-muted);
          font-size: var(--esds-alias-body-large-font-size);
          line-height: 1.5;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero {
            padding: 3rem 0 4rem 0;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: var(--esds-alias-body-font-size);
          }
          
          .features-list {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </div>
  )
}

export default HomePage