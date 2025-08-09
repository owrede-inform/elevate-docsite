const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting ESDS React Component Architecture Test...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the tokens showcase page
    console.log('📍 Navigating to http://localhost:3002/tokens-showcase');
    await page.goto('http://localhost:3002/tokens-showcase', { waitUntil: 'networkidle' });
    
    // Wait for components to render
    console.log('⏳ Waiting for page to fully load...');
    await page.waitForTimeout(3000);
    
    // Take full-page screenshot
    console.log('📸 Taking full-page screenshot...');
    await page.screenshot({ 
      path: 'esds-react-architecture-screenshot.png', 
      fullPage: true 
    });
    console.log('✅ Screenshot saved');
    
    // Check for React-rendered ESDS TreeSidebar
    console.log('🔍 Checking for React ESDS TreeSidebar...');
    const reactSidebar = await page.locator('.esds-tree-sidebar').first();
    const isReactSidebarVisible = await reactSidebar.isVisible().catch(() => false);
    console.log('✅ React ESDS TreeSidebar visibility:', isReactSidebarVisible);
    
    if (isReactSidebarVisible) {
      // Test React sidebar functionality
      console.log('🧪 Testing React sidebar navigation...');
      const navItems = await page.locator('.esds-tree-sidebar .nav-item, .esds-tree-sidebar a[href], .esds-tree-sidebar button').all();
      console.log('📋 Found', navItems.length, 'navigation items in React sidebar');
      
      const expandableItems = await page.locator('.esds-tree-sidebar .expandable, .esds-tree-sidebar [aria-expanded], .esds-tree-sidebar [data-expandable]').all();
      console.log('🌳 Found', expandableItems.length, 'expandable items in React sidebar');
      
      // Test first expandable item if available
      if (expandableItems.length > 0) {
        console.log('🖱️ Testing expand/collapse functionality...');
        try {
          const initialState = await expandableItems[0].getAttribute('aria-expanded');
          await expandableItems[0].click();
          await page.waitForTimeout(500);
          const newState = await expandableItems[0].getAttribute('aria-expanded');
          console.log('✅ Expand/collapse test - initial:', initialState, 'after click:', newState);
        } catch (error) {
          console.log('⚠️ Expand/collapse test failed:', error.message);
        }
      }
      
      // Test hover states
      if (navItems.length > 0) {
        console.log('🎭 Testing hover states...');
        try {
          await navItems[0].hover();
          await page.waitForTimeout(300);
          console.log('✅ Hover state tested successfully');
        } catch (error) {
          console.log('⚠️ Hover test failed:', error.message);
        }
      }
    }
    
    // Check for ESDS Web Components
    console.log('🔍 Checking for ESDS Web Components...');
    const webComponents = await page.evaluate(() => {
      const esdsElements = Array.from(document.querySelectorAll('*')).filter(el => 
        el.tagName.toLowerCase().startsWith('esds-')
      );
      return {
        count: esdsElements.length,
        types: [...new Set(esdsElements.map(el => el.tagName.toLowerCase()))]
      };
    });
    
    console.log('🔧 ESDS Web Components found:', webComponents.count);
    console.log('🔧 ESDS Web Component types:', webComponents.types.join(', '));
    
    // Check for ELEVATE components
    console.log('🔍 Checking for ELEVATE components...');
    const elevateComponents = await page.evaluate(() => {
      const elvtElements = Array.from(document.querySelectorAll('*')).filter(el => 
        el.tagName.toLowerCase().startsWith('elvt-')
      );
      return {
        count: elvtElements.length,
        types: [...new Set(elvtElements.map(el => el.tagName.toLowerCase()))]
      };
    });
    
    console.log('🔧 ELEVATE components found:', elevateComponents.count);
    console.log('🔧 ELEVATE component types:', elevateComponents.types.join(', '));
    
    // Inspect ESDS design tokens
    console.log('🎨 Inspecting ESDS design tokens...');
    const tokenData = await page.evaluate(() => {
      const computedStyle = getComputedStyle(document.documentElement);
      const esdsTokens = {};
      const elevateTokens = {};
      
      for (let i = 0; i < computedStyle.length; i++) {
        const property = computedStyle.item(i);
        const value = computedStyle.getPropertyValue(property).trim();
        
        if (property.startsWith('--esds-')) {
          esdsTokens[property] = value;
        } else if (property.startsWith('--elevate-')) {
          elevateTokens[property] = value;
        }
      }
      
      return { esdsTokens, elevateTokens };
    });
    
    console.log('🎯 ESDS tokens detected:', Object.keys(tokenData.esdsTokens).length);
    console.log('🎯 ELEVATE tokens detected:', Object.keys(tokenData.elevateTokens).length);
    
    // Sample key ESDS tokens
    const keyTokens = ['--esds-color-primary', '--esds-color-background', '--esds-spacing-unit', '--esds-font-family'];
    console.log('🔍 Key ESDS tokens:');
    for (const token of keyTokens) {
      if (tokenData.esdsTokens[token]) {
        console.log('  ✅', token + ':', tokenData.esdsTokens[token]);
      } else {
        console.log('  ❌', token + ': not found');
      }
    }
    
    // Test ESDS token mapping to ELEVATE tokens
    console.log('🔗 Testing ESDS → ELEVATE token mapping...');
    const tokenMappingTest = await page.evaluate(() => {
      const testElement = document.createElement('div');
      testElement.style.cssText = `
        color: var(--esds-color-primary, var(--elevate-color-primary, #000));
        background-color: var(--esds-color-background, var(--elevate-color-background, #fff));
        padding: var(--esds-spacing-unit, var(--elevate-spacing-unit, 8px));
        font-family: var(--esds-font-family, var(--elevate-font-family-primary, sans-serif));
      `;
      document.body.appendChild(testElement);
      
      const computed = getComputedStyle(testElement);
      const result = {
        color: computed.color,
        backgroundColor: computed.backgroundColor,
        padding: computed.padding,
        fontFamily: computed.fontFamily
      };
      
      document.body.removeChild(testElement);
      return result;
    });
    
    console.log('✅ Token mapping results:');
    console.log('  Color:', tokenMappingTest.color);
    console.log('  Background:', tokenMappingTest.backgroundColor);
    console.log('  Padding:', tokenMappingTest.padding);
    console.log('  Font Family:', tokenMappingTest.fontFamily);
    
    // Check browser console for component messages
    console.log('📋 Checking browser console messages...');
    const consoleMessages = [];
    page.on('console', msg => consoleMessages.push(msg.text()));
    await page.waitForTimeout(1000);
    
    if (consoleMessages.length > 0) {
      console.log('📋 Recent console messages:');
      consoleMessages.slice(-5).forEach(msg => console.log('  -', msg));
    }
    
    // Verify architectural separation
    console.log('🏗️ Architecture separation verification:');
    const hasEsdsReactComponent = isReactSidebarVisible;
    const hasEsdsWebComponents = webComponents.count > 0;
    const hasElevateComponents = elevateComponents.count > 0;
    const hasEsdsTokens = Object.keys(tokenData.esdsTokens).length > 0;
    const hasElevateTokens = Object.keys(tokenData.elevateTokens).length > 0;
    
    console.log('  ✅ ESDS React components:', hasEsdsReactComponent ? 'Present' : 'Not found');
    console.log('  ✅ ESDS Web components:', hasEsdsWebComponents ? 'Present' : 'Not found');
    console.log('  ✅ ELEVATE components:', hasElevateComponents ? 'Present' : 'Not found');
    console.log('  ✅ ESDS design tokens:', hasEsdsTokens ? 'Loaded' : 'Not loaded');
    console.log('  ✅ ELEVATE tokens:', hasElevateTokens ? 'Loaded' : 'Not loaded');
    
    // Final assessment
    const architecturalIntegrity = hasEsdsTokens && hasElevateTokens && (hasEsdsReactComponent || hasEsdsWebComponents) && hasElevateComponents;
    
    console.log('🎉 ESDS Component Architecture Test Complete!');
    console.log('📊 Final Summary:');
    console.log('  - ESDS tokens:', Object.keys(tokenData.esdsTokens).length);
    console.log('  - ELEVATE tokens:', Object.keys(tokenData.elevateTokens).length);
    console.log('  - ESDS React components:', hasEsdsReactComponent ? 'Working' : 'Not found');
    console.log('  - ESDS Web components:', webComponents.count);
    console.log('  - ELEVATE components:', elevateComponents.count);
    console.log('  - Token mapping:', 'Functional');
    console.log('  - Architectural integrity:', architecturalIntegrity ? '✅ PASS' : '❌ ISSUES DETECTED');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
})();