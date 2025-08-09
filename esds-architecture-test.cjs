const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting ESDS component architecture test...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the tokens showcase page
    console.log('📍 Navigating to http://localhost:3002/tokens-showcase');
    await page.goto('http://localhost:3002/tokens-showcase', { waitUntil: 'networkidle' });
    
    // Wait for components to render
    console.log('⏳ Waiting for page to fully load...');
    await page.waitForTimeout(2000);
    
    // Take full-page screenshot
    console.log('📸 Taking full-page screenshot...');
    await page.screenshot({ 
      path: 'esds-tokens-showcase-screenshot.png', 
      fullPage: true 
    });
    console.log('✅ Screenshot saved as esds-tokens-showcase-screenshot.png');
    
    // Check if ESDS TreeSidebar is present
    console.log('🔍 Checking for ESDS TreeSidebar component...');
    const treeSidebar = await page.locator('esds-tree-sidebar').first();
    const isVisible = await treeSidebar.isVisible().catch(() => false);
    console.log('✅ ESDS TreeSidebar visibility:', isVisible);
    
    // Inspect ESDS component CSS and tokens
    console.log('🎨 Inspecting ESDS design tokens...');
    const tokenData = await page.evaluate(() => {
      const computedStyle = getComputedStyle(document.documentElement);
      const esdsTokens = {};
      const elevateTokens = {};
      
      for (let i = 0; i < computedStyle.length; i++) {
        const property = computedStyle.item(i);
        if (property.startsWith('--esds-')) {
          esdsTokens[property] = computedStyle.getPropertyValue(property).trim();
        } else if (property.startsWith('--elevate-')) {
          elevateTokens[property] = computedStyle.getPropertyValue(property).trim();
        }
      }
      
      return { esdsTokens, elevateTokens };
    });
    
    console.log('🎯 Found', Object.keys(tokenData.esdsTokens).length, 'ESDS tokens');
    console.log('🎯 Found', Object.keys(tokenData.elevateTokens).length, 'ELEVATE tokens');
    
    // Sample some key tokens
    const keyTokens = ['--esds-color-primary', '--esds-color-background', '--esds-spacing-unit'];
    for (const token of keyTokens) {
      if (tokenData.esdsTokens[token]) {
        console.log('✅', token + ':', tokenData.esdsTokens[token]);
      }
    }
    
    // Test sidebar navigation functionality
    console.log('🧪 Testing ESDS sidebar navigation...');
    const navItems = await page.locator('esds-tree-sidebar .nav-item, esds-tree-sidebar a[href], esds-tree-sidebar [role=button]').all();
    console.log('📋 Found', navItems.length, 'navigation items');
    
    // Test expandable items
    const expandableItems = await page.locator('esds-tree-sidebar .expandable, esds-tree-sidebar [data-expandable], esds-tree-sidebar [aria-expanded]').all();
    console.log('🌳 Found', expandableItems.length, 'expandable tree items');
    
    // Check for active page highlighting
    const activeItems = await page.locator('esds-tree-sidebar .active, esds-tree-sidebar [aria-current], esds-tree-sidebar [data-active=true]').all();
    console.log('✅ Found', activeItems.length, 'active navigation items');
    
    // Validate component architecture separation
    console.log('🏗️ Validating component architecture separation...');
    const componentSeparation = await page.evaluate(() => {
      const elevateComponents = Array.from(document.querySelectorAll('*')).filter(el => 
        el.tagName.toLowerCase().startsWith('elvt-')
      );
      const esdsComponents = Array.from(document.querySelectorAll('*')).filter(el => 
        el.tagName.toLowerCase().startsWith('esds-')
      );
      
      return {
        elevateCount: elevateComponents.length,
        esdsCount: esdsComponents.length,
        elevateTypes: [...new Set(elevateComponents.map(el => el.tagName.toLowerCase()))],
        esdsTypes: [...new Set(esdsComponents.map(el => el.tagName.toLowerCase()))]
      };
    });
    
    console.log('🔧 ELEVATE components:', componentSeparation.elevateCount, 'instances');
    console.log('📖 ESDS components:', componentSeparation.esdsCount, 'instances');
    console.log('🔧 ELEVATE types:', componentSeparation.elevateTypes.join(', '));
    console.log('📖 ESDS types:', componentSeparation.esdsTypes.join(', '));
    
    // Test interaction if components are available
    if (navItems.length > 0) {
      console.log('🖱️ Testing first navigation item interaction...');
      try {
        await navItems[0].hover();
        await page.waitForTimeout(300);
        console.log('✅ Hover state tested successfully');
      } catch (error) {
        console.log('⚠️ Hover test failed:', error.message);
      }
    }
    
    // Check console logs
    const consoleMessages = [];
    page.on('console', msg => consoleMessages.push(msg.text()));
    await page.waitForTimeout(1000);
    
    console.log('📋 Console messages captured:', consoleMessages.length);
    if (consoleMessages.length > 0) {
      console.log('Latest messages:', consoleMessages.slice(-3));
    }
    
    // Inspect specific ESDS tree sidebar structure
    console.log('🔍 Inspecting ESDS tree sidebar structure...');
    const sidebarStructure = await page.evaluate(() => {
      const sidebar = document.querySelector('esds-tree-sidebar');
      if (!sidebar) return { found: false };
      
      return {
        found: true,
        tagName: sidebar.tagName.toLowerCase(),
        className: sidebar.className,
        childNodes: sidebar.childNodes.length,
        innerHTML: sidebar.innerHTML.substring(0, 200) + '...'
      };
    });
    
    if (sidebarStructure.found) {
      console.log('✅ ESDS sidebar structure:', sidebarStructure);
    } else {
      console.log('⚠️ ESDS sidebar not found in DOM');
    }
    
    // Test token mapping and fallbacks
    console.log('🔗 Testing token mapping and fallbacks...');
    const tokenMappingTest = await page.evaluate(() => {
      const testElement = document.createElement('div');
      testElement.style.cssText = `
        color: var(--esds-color-primary, var(--elevate-color-primary, #000));
        background: var(--esds-color-background, var(--elevate-color-background, #fff));
        padding: var(--esds-spacing-unit, var(--elevate-spacing-unit, 8px));
      `;
      document.body.appendChild(testElement);
      
      const computed = getComputedStyle(testElement);
      const result = {
        color: computed.color,
        background: computed.backgroundColor,
        padding: computed.padding
      };
      
      document.body.removeChild(testElement);
      return result;
    });
    
    console.log('✅ Token mapping test results:', tokenMappingTest);
    
    // Final validation
    console.log('🎉 ESDS component architecture test completed!');
    console.log('📊 Summary:');
    console.log('  - ESDS tokens detected:', Object.keys(tokenData.esdsTokens).length);
    console.log('  - ELEVATE tokens detected:', Object.keys(tokenData.elevateTokens).length);
    console.log('  - Navigation items:', navItems.length);
    console.log('  - Expandable items:', expandableItems.length);
    console.log('  - Active items:', activeItems.length);
    console.log('  - ELEVATE components:', componentSeparation.elevateCount);
    console.log('  - ESDS components:', componentSeparation.esdsCount);
    console.log('  - ESDS sidebar found:', sidebarStructure.found);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
})();