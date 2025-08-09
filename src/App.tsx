// React is automatically imported by JSX transform
import { Routes, Route } from 'react-router-dom'

import Layout from './components/layout/Layout'
import MDXContentRenderer from './components/content/MDXContentRenderer'
import HomePage from './pages/HomePage'
import TestPage from './pages/TestPage'
import DesignTokensShowcase from './pages/DesignTokensShowcase'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Layout>
      <Routes>
        {/* Home page uses the existing HomePage component with MDX components */}
        <Route path="/" element={<HomePage />} />
        
        {/* Test and showcase pages remain unchanged */}
        <Route path="/test" element={<TestPage />} />
        <Route path="/tokens-showcase" element={<DesignTokensShowcase />} />
        
        {/* Dynamic MDX routing - handles all content automatically */}
        <Route path="/components" element={<MDXContentRenderer />} />
        <Route path="/components/:componentName" element={<MDXContentRenderer />} />
        
        <Route path="/patterns" element={<MDXContentRenderer />} />
        <Route path="/patterns/:patternId" element={<MDXContentRenderer />} />
        
        <Route path="/guides" element={<MDXContentRenderer />} />
        <Route path="/guides/:role" element={<MDXContentRenderer />} />
        <Route path="/guides/:role/:guide" element={<MDXContentRenderer />} />
        
        {/* 404 page remains unchanged */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App