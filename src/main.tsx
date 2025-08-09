import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'

import App from './App'
// Import ESDS Design System - includes all token tiers and components
import './styles/esds-design-system.css'
// Import MDX components provider
import { mdxComponents } from './lib/mdx-components'

// ELEVATE package imports - exactly as specified in instructions
import '@inform-elevate/elevate-core-ui';
import '@inform-elevate/elevate-core-ui/dist/elevate.css';
import '@inform-elevate/elevate-core-ui/dist/themes/light.css';
import '@inform-elevate/elevate-core-ui/dist/themes/dark.css';

// Import all ELEVATE components to ensure registration
import * as ElevateComponents from '@inform-elevate/elevate-core-ui';

// Import ESDS Web Components
import './components/esds/register-components'

// Register ELEVATE components manually
if (typeof window !== 'undefined') {
  // Get all the components we need
  const { 
    ButtonComponent,
    IconComponent,
    DividerComponent,
    MenuComponent,
    MenuItemComponent,
    ApplicationComponent,
    ToolbarComponent,
    StackComponent,
    IconButtonComponent
  } = ElevateComponents;
  
  const componentsToRegister = [
    { name: 'elvt-button', component: ButtonComponent },
    { name: 'elvt-icon', component: IconComponent },
    { name: 'elvt-divider', component: DividerComponent },
    { name: 'elvt-menu', component: MenuComponent },
    { name: 'elvt-menu-item', component: MenuItemComponent },
    { name: 'elvt-application', component: ApplicationComponent },
    { name: 'elvt-toolbar', component: ToolbarComponent },
    { name: 'elvt-stack', component: StackComponent },
    { name: 'elvt-icon-button', component: IconButtonComponent }
  ];
  
  componentsToRegister.forEach(({ name, component }) => {
    if (component && !customElements.get(name)) {
      customElements.define(name, component);
    }
  });
  
  if (import.meta.env.DEV) {
    console.log('🔧 ELEVATE Components manually registered:', 
      componentsToRegister.map(c => c.name).filter(name => customElements.get(name))
    );
  }
}

// Initialize theme from localStorage or default to light
const savedTheme = localStorage.getItem('elevate-theme') || 'light'
document.documentElement.setAttribute('data-theme', savedTheme)

// Add ELEVATE theme classes
document.documentElement.classList.add(`elvt-theme-${savedTheme}`)
document.body.classList.add(`elvt-theme-${savedTheme}`)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.PROD ? '/elevate-docsite' : ''}>
      <MDXProvider components={mdxComponents}>
        <App />
      </MDXProvider>
    </BrowserRouter>
  </React.StrictMode>,
)