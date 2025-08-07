import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'

import App from './App'
import { mdxComponents } from './lib/mdx-components'
import './styles/globals.css'

// Import ESDS Web Components
import './components/esds/register-components'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MDXProvider components={mdxComponents}>
        <App />
      </MDXProvider>
    </BrowserRouter>
  </React.StrictMode>,
)