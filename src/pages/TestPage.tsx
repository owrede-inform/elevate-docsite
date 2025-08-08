import React from 'react'
import { 
  ElvtButton, 
  ElvtIcon, 
  ElvtDivider,
  ElvtMenu,
  ElvtMenuItem
} from '@inform-elevate/elevate-core-ui/dist/react'

const TestPage: React.FC = () => {
  return (
    <div className="test-page">
      <div className="test-section">
        <h1>ELEVATE Components Test Page</h1>
        <p>This page tests the confirmed working ELEVATE components to verify proper setup and styling.</p>
      </div>

      {/* Button Tests */}
      <div className="test-section">
        <h2>✅ Buttons (Confirmed Working)</h2>
        <div className="component-grid">
          <ElvtButton variant="primary">Primary Button</ElvtButton>
          <ElvtButton variant="secondary">Secondary Button</ElvtButton>
          <ElvtButton variant="tertiary">Tertiary Button</ElvtButton>
          <ElvtButton disabled>Disabled Button</ElvtButton>
          <ElvtButton variant="primary">
            <ElvtIcon name="home" />
            Button with Icon
          </ElvtButton>
        </div>
      </div>

      <ElvtDivider />

      {/* Icon Tests */}
      <div className="test-section">
        <h2>✅ Icons (Confirmed Working)</h2>
        <div className="component-grid">
          <div className="icon-item">
            <ElvtIcon name="home" />
            <span>home</span>
          </div>
          <div className="icon-item">
            <ElvtIcon name="user" />
            <span>user</span>
          </div>
          <div className="icon-item">
            <ElvtIcon name="settings" />
            <span>settings</span>
          </div>
          <div className="icon-item">
            <ElvtIcon name="search" />
            <span>search</span>
          </div>
          <div className="icon-item">
            <ElvtIcon name="menu" />
            <span>menu</span>
          </div>
          <div className="icon-item">
            <ElvtIcon name="check" />
            <span>check</span>
          </div>
          <div className="icon-item">
            <ElvtIcon name="close" />
            <span>close</span>
          </div>
          <div className="icon-item">
            <ElvtIcon name="chevron-down" />
            <span>chevron-down</span>
          </div>
          <div className="icon-item">
            <ElvtIcon name="chevron-right" />
            <span>chevron-right</span>
          </div>
          <div className="icon-item">
            <ElvtIcon name="github" />
            <span>github</span>
          </div>
        </div>
      </div>

      <ElvtDivider />

      {/* Menu Tests */}
      <div className="test-section">
        <h2>✅ Menu Components (Confirmed Working)</h2>
        <div className="menu-test">
          <h3>Navigation Menu Example</h3>
          <ElvtMenu>
            <ElvtMenuItem>Menu Item 1</ElvtMenuItem>
            <ElvtMenuItem selected>Selected Menu Item</ElvtMenuItem>
            <ElvtMenuItem>Menu Item 3</ElvtMenuItem>
            <ElvtMenuItem disabled>Disabled Menu Item</ElvtMenuItem>
          </ElvtMenu>
        </div>
      </div>

      <ElvtDivider />

      {/* Integration Status */}
      <div className="test-section">
        <h2>🔧 ELEVATE Integration Status</h2>
        <div className="status-grid">
          <div className="status-item success">
            <ElvtIcon name="check" />
            <h4>Working Components</h4>
            <ul>
              <li>ElvtButton (all variants)</li>
              <li>ElvtIcon (various icons)</li>
              <li>ElvtDivider</li>
              <li>ElvtMenu & ElvtMenuItem</li>
              <li>ElvtApplication & ElvtToolbar (in layout)</li>
            </ul>
          </div>
          
          <div className="status-item warning">
            <ElvtIcon name="settings" />
            <h4>Components to Test</h4>
            <ul>
              <li>ElvtCard</li>
              <li>ElvtBadge</li>
              <li>ElvtInput</li>
              <li>ElvtSelect</li>
              <li>ElvtCheckbox</li>
              <li>ElvtAlert</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .test-page {
          padding: var(--elevate-spacing-xl, 2rem);
          max-width: 1200px;
          margin: 0 auto;
        }

        .test-section {
          margin-bottom: var(--elevate-spacing-2xl, 3rem);
        }

        .test-section h1 {
          color: var(--elevate-color-primary, #0066cc);
          margin-bottom: var(--elevate-spacing-lg, 1.5rem);
          font-size: var(--elevate-font-size-3xl, 2rem);
          font-weight: var(--elevate-font-weight-bold, 700);
        }

        .test-section h2 {
          color: var(--elevate-color-text-primary, #1a1a1a);
          margin-bottom: var(--elevate-spacing-md, 1rem);
          font-size: var(--elevate-font-size-xl, 1.25rem);
          font-weight: var(--elevate-font-weight-semibold, 600);
          border-bottom: 2px solid var(--elevate-color-border-light, #e9ecef);
          padding-bottom: var(--elevate-spacing-sm, 0.5rem);
        }

        .test-section h3 {
          color: var(--elevate-color-text-primary, #1a1a1a);
          margin-bottom: var(--elevate-spacing-sm, 0.5rem);
          font-size: var(--elevate-font-size-lg, 1.125rem);
          font-weight: var(--elevate-font-weight-medium, 500);
        }

        .component-grid {
          display: flex;
          flex-wrap: wrap;
          gap: var(--elevate-spacing-md, 1rem);
          align-items: center;
        }

        .icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--elevate-spacing-xs, 0.25rem);
          padding: var(--elevate-spacing-md, 1rem);
          border: 1px solid var(--elevate-color-border-light, #e9ecef);
          border-radius: var(--elevate-radius-md, 0.375rem);
          background: var(--elevate-color-background-primary, #ffffff);
          min-width: 100px;
        }

        .icon-item elvt-icon {
          width: 24px;
          height: 24px;
        }

        .icon-item span {
          font-size: var(--elevate-font-size-xs, 0.75rem);
          color: var(--elevate-color-text-secondary, #6c757d);
          text-align: center;
        }

        .menu-test {
          max-width: 300px;
          padding: var(--elevate-spacing-lg, 1.5rem);
          border: 1px solid var(--elevate-color-border-light, #e9ecef);
          border-radius: var(--elevate-radius-md, 0.375rem);
          background: var(--elevate-color-background-primary, #ffffff);
        }

        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--elevate-spacing-lg, 1.5rem);
        }

        .status-item {
          padding: var(--elevate-spacing-lg, 1.5rem);
          border-radius: var(--elevate-radius-md, 0.375rem);
          border: 1px solid var(--elevate-color-border-light, #e9ecef);
        }

        .status-item.success {
          background: var(--elevate-color-success-light, #f0f9ff);
          border-color: var(--elevate-color-success, #10b981);
        }

        .status-item.warning {
          background: var(--elevate-color-warning-light, #fffbeb);
          border-color: var(--elevate-color-warning, #f59e0b);
        }

        .status-item h4 {
          margin: 0 0 var(--elevate-spacing-sm, 0.5rem) 0;
          font-size: var(--elevate-font-size-base, 1rem);
          font-weight: var(--elevate-font-weight-semibold, 600);
          display: flex;
          align-items: center;
          gap: var(--elevate-spacing-sm, 0.5rem);
        }

        .status-item ul {
          margin: 0;
          padding-left: var(--elevate-spacing-lg, 1.5rem);
          list-style-type: disc;
        }

        .status-item li {
          margin-bottom: var(--elevate-spacing-xs, 0.25rem);
          font-size: var(--elevate-font-size-sm, 0.875rem);
          color: var(--elevate-color-text-secondary, #6c757d);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .component-grid {
            justify-content: center;
          }
          
          .status-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default TestPage