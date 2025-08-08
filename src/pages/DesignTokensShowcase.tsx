import React from 'react'
import { 
  ElvtButton, 
  ElvtIcon, 
  ElvtDivider,
  ElvtMenu,
  ElvtMenuItem
} from '@inform-elevate/elevate-core-ui/dist/react'

const DesignTokensShowcase: React.FC = () => {
  return (
    <div className="tokens-showcase elvt-theme-light">
      <div className="showcase-header">
        <h1>ELEVATE Design Tokens Showcase</h1>
        <p>This page demonstrates that ELEVATE design tokens are properly loaded and applied to components.</p>
      </div>

      {/* Color Primitives Showcase */}
      <section className="token-section">
        <h2>🎨 Color Primitives</h2>
        <div className="color-grid">
          <div className="color-group">
            <h3>Blue Palette</h3>
            <div className="color-row">
              <div className="color-swatch blue-50">
                <span>Blue 50</span>
                <code>--elvt-primitives-color-blue-50</code>
              </div>
              <div className="color-swatch blue-100">
                <span>Blue 100</span>
                <code>--elvt-primitives-color-blue-100</code>
              </div>
              <div className="color-swatch blue-200">
                <span>Blue 200</span>
                <code>--elvt-primitives-color-blue-200</code>
              </div>
              <div className="color-swatch blue-500">
                <span>Blue 500</span>
                <code>--elvt-primitives-color-blue-500</code>
              </div>
              <div className="color-swatch blue-600">
                <span>Blue 600</span>
                <code>--elvt-primitives-color-blue-600</code>
              </div>
              <div className="color-swatch blue-700">
                <span>Blue 700</span>
                <code>--elvt-primitives-color-blue-700</code>
              </div>
            </div>
          </div>

          <div className="color-group">
            <h3>Gray Palette</h3>
            <div className="color-row">
              <div className="color-swatch gray-50">
                <span>Gray 50</span>
                <code>--elvt-primitives-color-gray-50</code>
              </div>
              <div className="color-swatch gray-100">
                <span>Gray 100</span>
                <code>--elvt-primitives-color-gray-100</code>
              </div>
              <div className="color-swatch gray-300">
                <span>Gray 300</span>
                <code>--elvt-primitives-color-gray-300</code>
              </div>
              <div className="color-swatch gray-600">
                <span>Gray 600</span>
                <code>--elvt-primitives-color-gray-600</code>
              </div>
              <div className="color-swatch gray-900">
                <span>Gray 900</span>
                <code>--elvt-primitives-color-gray-900</code>
              </div>
            </div>
          </div>

          <div className="color-group">
            <h3>Status Colors</h3>
            <div className="color-row">
              <div className="color-swatch red-500">
                <span>Red 500</span>
                <code>--elvt-primitives-color-red-500</code>
              </div>
              <div className="color-swatch green-500">
                <span>Green 500</span>
                <code>--elvt-primitives-color-green-500</code>
              </div>
              <div className="color-swatch yellow-500">
                <span>Yellow 500</span>
                <code>--elvt-primitives-color-yellow-500</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ElvtDivider />

      {/* Button Component Showcase with Theme */}
      <section className="token-section">
        <h2>🔘 Button Components with Design Tokens</h2>
        <p>These buttons should demonstrate proper ELEVATE theming:</p>
        
        <div className="button-showcase">
          <div className="button-group">
            <h3>Primary Buttons</h3>
            <ElvtButton tone="primary" size="small">Small Primary</ElvtButton>
            <ElvtButton tone="primary">Medium Primary</ElvtButton>
            <ElvtButton tone="primary" size="large">Large Primary</ElvtButton>
            <ElvtButton tone="primary" disabled>Disabled Primary</ElvtButton>
          </div>

          <div className="button-group">
            <h3>Success Buttons</h3>
            <ElvtButton tone="success" size="small">Small Success</ElvtButton>
            <ElvtButton tone="success">Medium Success</ElvtButton>
            <ElvtButton tone="success" size="large">Large Success</ElvtButton>
            <ElvtButton tone="success" disabled>Disabled Success</ElvtButton>
          </div>

          <div className="button-group">
            <h3>Warning Buttons</h3>
            <ElvtButton tone="warning" size="small">Small Warning</ElvtButton>
            <ElvtButton tone="warning">Medium Warning</ElvtButton>
            <ElvtButton tone="warning" size="large">Large Warning</ElvtButton>
            <ElvtButton tone="warning" disabled>Disabled Warning</ElvtButton>
          </div>

          <div className="button-group">
            <h3>Danger Buttons</h3>
            <ElvtButton tone="danger" size="small">Small Danger</ElvtButton>
            <ElvtButton tone="danger">Medium Danger</ElvtButton>
            <ElvtButton tone="danger" size="large">Large Danger</ElvtButton>
            <ElvtButton tone="danger" disabled>Disabled Danger</ElvtButton>
          </div>
        </div>
      </section>

      <ElvtDivider />

      {/* Typography Showcase */}
      <section className="token-section">
        <h2>📝 Typography Tokens</h2>
        <div className="typography-showcase">
          <div className="font-sample font-xs">Font XS - --elvt-primitives-font-size-xs</div>
          <div className="font-sample font-sm">Font Small - --elvt-primitives-font-size-sm</div>
          <div className="font-sample font-md">Font Medium - --elvt-primitives-font-size-md</div>
          <div className="font-sample font-lg">Font Large - --elvt-primitives-font-size-lg</div>
          <div className="font-sample font-xl">Font XL - --elvt-primitives-font-size-xl</div>
          <div className="font-sample font-2xl">Font 2XL - --elvt-primitives-font-size-2xl</div>
        </div>
      </section>

      <ElvtDivider />

      {/* Spacing Showcase */}
      <section className="token-section">
        <h2>📏 Spacing Tokens</h2>
        <div className="spacing-showcase">
          <div className="spacing-demo">
            <div className="spacing-box spacing-xs">XS</div>
            <span>--elvt-primitives-spacing-xs</span>
          </div>
          <div className="spacing-demo">
            <div className="spacing-box spacing-sm">SM</div>
            <span>--elvt-primitives-spacing-sm</span>
          </div>
          <div className="spacing-demo">
            <div className="spacing-box spacing-md">MD</div>
            <span>--elvt-primitives-spacing-md</span>
          </div>
          <div className="spacing-demo">
            <div className="spacing-box spacing-lg">LG</div>
            <span>--elvt-primitives-spacing-lg</span>
          </div>
          <div className="spacing-demo">
            <div className="spacing-box spacing-xl">XL</div>
            <span>--elvt-primitives-spacing-xl</span>
          </div>
        </div>
      </section>

      <ElvtDivider />

      {/* Token Validation */}
      <section className="token-section">
        <h2>✅ Token Validation</h2>
        <div className="validation-grid">
          <div className="validation-item token-test-primary">
            <h4>Primary Color Test</h4>
            <p>This should be blue if tokens work</p>
            <code>var(--elvt-primitives-color-blue-600)</code>
          </div>
          
          <div className="validation-item token-test-gray">
            <h4>Gray Background Test</h4>
            <p>This should have light gray background</p>
            <code>var(--elvt-primitives-color-gray-50)</code>
          </div>
          
          <div className="validation-item token-test-font">
            <h4>Font Family Test</h4>
            <p>This should use Inter font</p>
            <code>var(--elvt-primitives-font-family-inter)</code>
          </div>
          
          <div className="validation-item token-test-spacing">
            <h4>Spacing Test</h4>
            <div className="spacing-test-box">Padding using tokens</div>
            <code>var(--elvt-primitives-spacing-lg)</code>
          </div>
        </div>
      </section>

      <style>{`
        .tokens-showcase {
          padding: var(--elevate-spacing-xl, 2rem);
          max-width: 1200px;
          margin: 0 auto;
          font-family: var(--elvt-primitives-font-family-inter, 'Inter', sans-serif);
        }

        .showcase-header {
          text-align: center;
          margin-bottom: var(--elevate-spacing-2xl, 3rem);
        }

        .showcase-header h1 {
          color: var(--elvt-primitives-color-blue-600, #0066cc);
          font-size: var(--elevate-font-size-3xl, 2rem);
          font-weight: var(--elevate-font-weight-bold, 700);
          margin-bottom: var(--elevate-spacing-md, 1rem);
        }

        .token-section {
          margin-bottom: var(--elevate-spacing-2xl, 3rem);
        }

        .token-section h2 {
          color: var(--elvt-primitives-color-gray-900, #1a1a1a);
          font-size: var(--elevate-font-size-xl, 1.25rem);
          font-weight: var(--elevate-font-weight-semibold, 600);
          margin-bottom: var(--elevate-spacing-lg, 1.5rem);
          border-bottom: 2px solid var(--elvt-primitives-color-blue-100, #e6f3ff);
          padding-bottom: var(--elevate-spacing-sm, 0.5rem);
        }

        .token-section h3 {
          color: var(--elvt-primitives-color-gray-700, #545972);
          font-size: var(--elevate-font-size-lg, 1.125rem);
          font-weight: var(--elevate-font-weight-medium, 500);
          margin-bottom: var(--elevate-spacing-md, 1rem);
        }

        /* Color Swatches */
        .color-grid {
          display: flex;
          flex-direction: column;
          gap: var(--elevate-spacing-xl, 2rem);
        }

        .color-row {
          display: flex;
          gap: var(--elevate-spacing-sm, 0.5rem);
          flex-wrap: wrap;
        }

        .color-swatch {
          min-width: 120px;
          height: 80px;
          border-radius: var(--elevate-radius-md, 0.375rem);
          border: 1px solid var(--elvt-primitives-color-gray-200, #bec3cd);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 4px;
        }

        .color-swatch span {
          font-weight: var(--elevate-font-weight-medium, 500);
          font-size: var(--elevate-font-size-xs, 0.75rem);
        }

        .color-swatch code {
          font-size: 10px;
          opacity: 0.7;
        }

        /* Color Swatches - Using actual ELEVATE tokens */
        .blue-50 { background: var(--elvt-primitives-color-blue-50, #eaf4ff); color: var(--elvt-primitives-color-blue-900, #233347); }
        .blue-100 { background: var(--elvt-primitives-color-blue-100, #b9dbff); color: var(--elvt-primitives-color-blue-900, #233347); }
        .blue-200 { background: var(--elvt-primitives-color-blue-200, #90c6ff); color: var(--elvt-primitives-color-blue-900, #233347); }
        .blue-500 { background: var(--elvt-primitives-color-blue-500, #0072ff); color: var(--elvt-primitives-color-white, white); }
        .blue-600 { background: var(--elvt-primitives-color-blue-600, #0b5cdf); color: var(--elvt-primitives-color-white, white); }
        .blue-700 { background: var(--elvt-primitives-color-blue-700, #1b50a6); color: var(--elvt-primitives-color-white, white); }
        
        .gray-50 { background: var(--elvt-primitives-color-gray-50, #f3f4f7); color: var(--elvt-primitives-color-gray-900, #33394d); }
        .gray-100 { background: var(--elvt-primitives-color-gray-100, #d5d9e1); color: var(--elvt-primitives-color-gray-900, #33394d); }
        .gray-300 { background: var(--elvt-primitives-color-gray-300, #a3aab4); color: var(--elvt-primitives-color-gray-900, #33394d); }
        .gray-600 { background: var(--elvt-primitives-color-gray-600, #707a8f); color: var(--elvt-primitives-color-white, white); }
        .gray-900 { background: var(--elvt-primitives-color-gray-900, #33394d); color: var(--elvt-primitives-color-white, white); }
        
        .red-500 { background: var(--elvt-primitives-color-red-500, #f50101); color: var(--elvt-primitives-color-white, white); }
        .green-500 { background: var(--elvt-primitives-color-green-500, #01b759); color: var(--elvt-primitives-color-white, white); }
        .yellow-500 { background: var(--elvt-primitives-color-yellow-500, #ffd700); color: var(--elvt-primitives-color-gray-900, #33394d); }

        /* Button Showcase */
        .button-showcase {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--elevate-spacing-xl, 2rem);
        }

        .button-group {
          padding: var(--elevate-spacing-lg, 1.5rem);
          border: 1px solid var(--elvt-primitives-color-gray-200, #bec3cd);
          border-radius: var(--elevate-radius-lg, 0.5rem);
          background: var(--elvt-primitives-color-white, white);
        }

        .button-group elvt-button {
          margin: var(--elevate-spacing-xs, 0.25rem);
        }

        /* Typography Showcase */
        .typography-showcase {
          display: flex;
          flex-direction: column;
          gap: var(--elevate-spacing-md, 1rem);
        }

        .font-sample {
          padding: var(--elevate-spacing-sm, 0.5rem) var(--elevate-spacing-md, 1rem);
          border: 1px solid var(--elvt-primitives-color-gray-200, #bec3cd);
          border-radius: var(--elevate-radius-sm, 0.25rem);
          font-family: var(--elvt-primitives-font-family-inter, 'Inter', sans-serif);
        }

        .font-xs { font-size: var(--elevate-font-size-xs, 0.75rem); }
        .font-sm { font-size: var(--elevate-font-size-sm, 0.875rem); }
        .font-md { font-size: var(--elevate-font-size-base, 1rem); }
        .font-lg { font-size: var(--elevate-font-size-lg, 1.125rem); }
        .font-xl { font-size: var(--elevate-font-size-xl, 1.25rem); }
        .font-2xl { font-size: var(--elevate-font-size-2xl, 1.5rem); }

        /* Spacing Showcase */
        .spacing-showcase {
          display: flex;
          flex-direction: column;
          gap: var(--elevate-spacing-lg, 1.5rem);
        }

        .spacing-demo {
          display: flex;
          align-items: center;
          gap: var(--elevate-spacing-md, 1rem);
        }

        .spacing-box {
          background: var(--elvt-primitives-color-blue-100, #b9dbff);
          color: var(--elvt-primitives-color-blue-900, #233347);
          border-radius: var(--elevate-radius-sm, 0.25rem);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: var(--elevate-font-weight-medium, 500);
          font-size: var(--elevate-font-size-xs, 0.75rem);
          min-width: 60px;
          height: 40px;
        }

        .spacing-xs { padding: var(--elevate-spacing-xs, 0.25rem); }
        .spacing-sm { padding: var(--elevate-spacing-sm, 0.5rem); }
        .spacing-md { padding: var(--elevate-spacing-md, 1rem); }
        .spacing-lg { padding: var(--elevate-spacing-lg, 1.5rem); }
        .spacing-xl { padding: var(--elevate-spacing-xl, 2rem); }

        /* Validation Tests */
        .validation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--elevate-spacing-lg, 1.5rem);
        }

        .validation-item {
          padding: var(--elevate-spacing-lg, 1.5rem);
          border-radius: var(--elevate-radius-md, 0.375rem);
          border: 2px solid var(--elvt-primitives-color-gray-200, #bec3cd);
        }

        .validation-item h4 {
          margin: 0 0 var(--elevate-spacing-sm, 0.5rem) 0;
          font-weight: var(--elevate-font-weight-semibold, 600);
        }

        .validation-item code {
          background: var(--elvt-primitives-color-gray-100, #d5d9e1);
          padding: 2px 6px;
          border-radius: 3px;
          font-size: var(--elevate-font-size-xs, 0.75rem);
          font-family: monospace;
        }

        .token-test-primary {
          border-color: var(--elvt-primitives-color-blue-600, #0b5cdf);
          background: var(--elvt-primitives-color-blue-50, #eaf4ff);
          color: var(--elvt-primitives-color-blue-900, #233347);
        }

        .token-test-gray {
          background: var(--elvt-primitives-color-gray-50, #f3f4f7);
          color: var(--elvt-primitives-color-gray-900, #33394d);
        }

        .token-test-font {
          font-family: var(--elvt-primitives-font-family-inter, 'Inter', sans-serif);
          font-weight: var(--elevate-font-weight-medium, 500);
        }

        .token-test-spacing .spacing-test-box {
          background: var(--elvt-primitives-color-blue-100, #b9dbff);
          padding: var(--elevate-spacing-lg, 1.5rem);
          border-radius: var(--elevate-radius-md, 0.375rem);
          margin-top: var(--elevate-spacing-sm, 0.5rem);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .color-row {
            justify-content: center;
          }
          .color-swatch {
            min-width: 100px;
            height: 60px;
          }
          .button-showcase {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default DesignTokensShowcase