import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function analyzeApplicationShell() {
  console.log('🚀 Starting ApplicationShell analysis...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000 
  });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    console.log('📱 Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle',
      timeout: 10000 
    });
    
    // Wait for React components to render
    await page.waitForTimeout(2000);
    
    // 1. Take initial screenshot
    console.log('📸 Taking initial screenshot...');
    await page.screenshot({ 
      path: 'analysis-screenshots/initial-layout.png', 
      fullPage: true 
    });
    
    // 2. Analyze ElvtApplication component structure
    console.log('🔍 Analyzing ElvtApplication DOM structure...');
    const appStructure = await page.evaluate(() => {
      const elvtApp = document.querySelector('[data-component*="ElvtApplication"], .elvt-application, .application-shell');
      if (!elvtApp) {
        return { error: 'ElvtApplication component not found' };
      }
      
      return {
        tagName: elvtApp.tagName,
        className: elvtApp.className,
        id: elvtApp.id,
        children: Array.from(elvtApp.children).map(child => ({
          tagName: child.tagName,
          className: child.className,
          id: child.id,
          role: child.getAttribute('role')
        })),
        styles: window.getComputedStyle(elvtApp),
        dimensions: elvtApp.getBoundingClientRect()
      };
    });
    
    // 3. Analyze header layout and logo positioning
    console.log('🎯 Analyzing header layout...');
    const headerAnalysis = await page.evaluate(() => {
      const headers = [
        document.querySelector('header'),
        document.querySelector('.header'),
        document.querySelector('[role="banner"]'),
        document.querySelector('.app-header'),
        document.querySelector('.elvt-header')
      ].filter(Boolean);
      
      const logos = [
        document.querySelector('.logo'),
        document.querySelector('[alt*="logo"]'),
        document.querySelector('[alt*="INFORM"]'),
        document.querySelector('img[src*="logo"]')
      ].filter(Boolean);
      
      return {
        headers: headers.map(header => ({
          tagName: header.tagName,
          className: header.className,
          id: header.id,
          position: window.getComputedStyle(header).position,
          top: window.getComputedStyle(header).top,
          left: window.getComputedStyle(header).left,
          width: window.getComputedStyle(header).width,
          height: window.getComputedStyle(header).height,
          zIndex: window.getComputedStyle(header).zIndex,
          display: window.getComputedStyle(header).display,
          flexDirection: window.getComputedStyle(header).flexDirection,
          justifyContent: window.getComputedStyle(header).justifyContent,
          alignItems: window.getComputedStyle(header).alignItems,
          dimensions: header.getBoundingClientRect()
        })),
        logos: logos.map(logo => ({
          tagName: logo.tagName,
          className: logo.className,
          id: logo.id,
          src: logo.src,
          alt: logo.alt,
          position: window.getComputedStyle(logo).position,
          top: window.getComputedStyle(logo).top,
          left: window.getComputedStyle(logo).left,
          dimensions: logo.getBoundingClientRect()
        }))
      };
    });
    
    // 4. Analyze sidebar navigation
    console.log('🧭 Analyzing sidebar navigation...');
    const sidebarAnalysis = await page.evaluate(() => {
      const sidebars = [
        document.querySelector('nav'),
        document.querySelector('.sidebar'),
        document.querySelector('.navigation'),
        document.querySelector('[role="navigation"]'),
        document.querySelector('.elvt-sidebar')
      ].filter(Boolean);
      
      const navItems = document.querySelectorAll('nav a, .nav-item, .navigation-item, [role="menuitem"]');
      
      return {
        sidebars: sidebars.map(sidebar => ({
          tagName: sidebar.tagName,
          className: sidebar.className,
          id: sidebar.id,
          position: window.getComputedStyle(sidebar).position,
          width: window.getComputedStyle(sidebar).width,
          height: window.getComputedStyle(sidebar).height,
          display: window.getComputedStyle(sidebar).display,
          flexDirection: window.getComputedStyle(sidebar).flexDirection,
          dimensions: sidebar.getBoundingClientRect(),
          childrenCount: sidebar.children.length,
          children: Array.from(sidebar.children).map(child => ({
            tagName: child.tagName,
            className: child.className,
            textContent: child.textContent.trim().substring(0, 50)
          }))
        })),
        navigationItems: Array.from(navItems).map(item => ({
          tagName: item.tagName,
          className: item.className,
          textContent: item.textContent.trim(),
          href: item.href,
          role: item.getAttribute('role'),
          ariaExpanded: item.getAttribute('aria-expanded'),
          hasChildren: item.querySelector('ul, ol, .submenu, .children') !== null,
          dimensions: item.getBoundingClientRect()
        }))
      };
    });
    
    // 5. Check ELEVATE components rendering
    console.log('🏗️ Checking ELEVATE component rendering...');
    const elevateComponents = await page.evaluate(() => {
      const elvtComponents = document.querySelectorAll('[class*="elvt-"], [data-component*="Elvt"]');
      const elevateShowcase = document.querySelector('.elevate-showcase, [data-component*="ElevateShowcase"]');
      
      return {
        elevateComponentsCount: elvtComponents.length,
        elevateComponents: Array.from(elvtComponents).map(comp => ({
          tagName: comp.tagName,
          className: comp.className,
          id: comp.id,
          dataComponent: comp.getAttribute('data-component'),
          textContent: comp.textContent.trim().substring(0, 100),
          dimensions: comp.getBoundingClientRect(),
          styles: {
            display: window.getComputedStyle(comp).display,
            visibility: window.getComputedStyle(comp).visibility,
            opacity: window.getComputedStyle(comp).opacity
          }
        })),
        elevateShowcase: elevateShowcase ? {
          found: true,
          className: elevateShowcase.className,
          childrenCount: elevateShowcase.children.length,
          dimensions: elevateShowcase.getBoundingClientRect()
        } : { found: false }
      };
    });
    
    // 6. Check for CSS issues
    console.log('🎨 Checking for CSS issues...');
    const cssIssues = await page.evaluate(() => {
      const issues = [];
      
      // Check for elements with zero dimensions
      const allElements = document.querySelectorAll('*');
      Array.from(allElements).forEach(el => {
        const rect = el.getBoundingClientRect();
        const styles = window.getComputedStyle(el);
        
        if (rect.width === 0 && rect.height === 0 && styles.display !== 'none') {
          issues.push({
            type: 'zero-dimensions',
            element: `${el.tagName}${el.className ? '.' + el.className.split(' ').join('.') : ''}`,
            className: el.className
          });
        }
        
        // Check for missing CSS
        if (styles.fontFamily === '' || styles.fontSize === '') {
          issues.push({
            type: 'missing-typography',
            element: `${el.tagName}${el.className ? '.' + el.className.split(' ').join('.') : ''}`,
            className: el.className
          });
        }
      });
      
      // Check for broken images
      const images = document.querySelectorAll('img');
      Array.from(images).forEach(img => {
        if (!img.complete || img.naturalHeight === 0) {
          issues.push({
            type: 'broken-image',
            src: img.src,
            alt: img.alt,
            className: img.className
          });
        }
      });
      
      return issues.slice(0, 20); // Limit to first 20 issues
    });
    
    // Take focused screenshots
    console.log('📸 Taking focused screenshots...');
    
    // Header screenshot
    const headerExists = await page.$('header, .header, [role="banner"]');
    if (headerExists) {
      await headerExists.screenshot({ path: 'analysis-screenshots/header-section.png' });
    }
    
    // Sidebar screenshot
    const sidebarExists = await page.$('nav, .sidebar, .navigation');
    if (sidebarExists) {
      await sidebarExists.screenshot({ path: 'analysis-screenshots/sidebar-section.png' });
    }
    
    // Generate analysis report
    const report = {
      timestamp: new Date().toISOString(),
      url: 'http://localhost:3000',
      viewport: { width: 1920, height: 1080 },
      analysis: {
        appStructure,
        headerAnalysis,
        sidebarAnalysis,
        elevateComponents,
        cssIssues
      },
      recommendations: []
    };
    
    // Generate recommendations based on findings
    if (!appStructure.error && appStructure.children.length === 0) {
      report.recommendations.push('❌ ElvtApplication component appears to be empty or not rendering children properly');
    }
    
    if (headerAnalysis.headers.length === 0) {
      report.recommendations.push('❌ No header elements found - header layout may be missing');
    } else if (headerAnalysis.logos.length === 0) {
      report.recommendations.push('⚠️ No INFORM logo found in header - check logo implementation');
    }
    
    if (sidebarAnalysis.sidebars.length === 0) {
      report.recommendations.push('❌ No sidebar navigation found - navigation structure may be missing');
    } else {
      const hasCollapsibleItems = sidebarAnalysis.navigationItems.some(item => 
        item.ariaExpanded !== null || item.hasChildren
      );
      if (!hasCollapsibleItems) {
        report.recommendations.push('⚠️ No collapsible navigation items found - check tree structure implementation');
      }
    }
    
    if (elevateComponents.elevateComponentsCount === 0) {
      report.recommendations.push('❌ No ELEVATE components found - check component imports and rendering');
    }
    
    if (cssIssues.length > 0) {
      report.recommendations.push(`⚠️ Found ${cssIssues.length} CSS issues - check styling implementation`);
    }
    
    // Save analysis report
    fs.mkdirSync('analysis-screenshots', { recursive: true });
    fs.writeFileSync('analysis-report.json', JSON.stringify(report, null, 2));
    
    console.log('📊 Analysis complete! Results saved to:');
    console.log('  - analysis-report.json (detailed findings)');
    console.log('  - analysis-screenshots/ (visual evidence)');
    
    // Display summary
    console.log('\n🔍 ANALYSIS SUMMARY:');
    console.log('====================');
    report.recommendations.forEach(rec => console.log(rec));
    
    if (report.recommendations.length === 0) {
      console.log('✅ No major issues detected in initial analysis');
    }
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    
    // Take error screenshot if possible
    try {
      await page.screenshot({ path: 'analysis-screenshots/error-state.png' });
    } catch (screenshotError) {
      console.error('Failed to capture error screenshot:', screenshotError.message);
    }
  } finally {
    await browser.close();
  }
}

// Run analysis
analyzeApplicationShell().catch(console.error);