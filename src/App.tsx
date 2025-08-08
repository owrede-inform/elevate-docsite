import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ComponentsPage from './pages/ComponentsPage'
import PatternsPage from './pages/PatternsPage'
import GuidesPage from './pages/GuidesPage'
import TestPage from './pages/TestPage'
import DesignTokensShowcase from './pages/DesignTokensShowcase'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/tokens-showcase" element={<DesignTokensShowcase />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/components/:componentName" element={<ComponentsPage />} />
        <Route path="/patterns" element={<PatternsPage />} />
        <Route path="/patterns/:patternId" element={<PatternsPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/:role" element={<GuidesPage />} />
        <Route path="/guides/:role/:guide" element={<GuidesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App