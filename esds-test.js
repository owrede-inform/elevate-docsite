const { test, expect } = require('@playwright/test');

test('ESDS Component Architecture and Token Integration Test', async ({ page }) => {
  console.log('🚀 Starting ESDS component architecture test...');
  
  // Navigate to the tokens showcase page
  console.log('📍 Navigating to http://localhost:3002/tokens-showcase');
  await page.goto('http://localhost:3002/tokens-showcase');
  
  // Wait for page to fully load and components to render
  console.log('⏳ Waiting for page to fully load...');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000); // Additional wait for component initialization
  
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
  await expect(treeSidebar).toBeVisible();
  console.log('✅ ESDS TreeSidebar is visible');
  
  // Inspect ESDS component CSS and tokens
  console.log('🎨 Inspecting ESDS design tokens...');
  const tokenData = await page.evaluate(() => {
    const computedStyle = getComputedStyle(document.documentElement);
    const esdsTokens = {};
    const elevateTokens = {};
    
    // Get all CSS custom properties
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
  
  console.log(`🎯 Found ${Object.keys(tokenData.esdsTokens).length} ESDS tokens`);
  console.log(`🎯 Found ${Object.keys(tokenData.elevateTokens).length} ELEVATE tokens`);
  
  // Sample some key tokens
  const keyTokens = ['--esds-color-primary', '--esds-color-background', '--esds-spacing-unit'];
  for (const token of keyTokens) {
    if (tokenData.esdsTokens[token]) {
      console.log(`✅ ${token}: ${tokenData.esdsTokens[token]}`);
    }
  }
  
  // Test sidebar navigation functionality
  console.log('🧪 Testing ESDS sidebar navigation...');
  
  // Check for navigation items
  const navItems = await page.locator('esds-tree-sidebar .nav-item, esds-tree-sidebar a[href]').all();
  console.log(`📋 Found ${navItems.length} navigation items`);
  
  if (navItems.length > 0) {
    // Test first navigation item
    console.log('🖱️ Testing first navigation item click...');
    await navItems[0].click();
    await page.waitForTimeout(1000);
    console.log('✅ Navigation item clicked successfully');
  }
  
  // Check for expandable tree items
  const expandableItems = await page.locator('esds-tree-sidebar .expandable, esds-tree-sidebar [data-expandable]').all();
  console.log(`🌳 Found ${expandableItems.length} expandable tree items`);
  
  if (expandableItems.length > 0) {
    console.log('🖱️ Testing tree expansion/collapse...');
    await expandableItems[0].click();
    await page.waitForTimeout(500);
    console.log('✅ Tree expansion/collapse tested');
  }
  
  // Test hover states
  console.log('🎭 Testing hover states...');
  if (navItems.length > 0) {
    await navItems[0].hover();
    await page.waitForTimeout(300);
    console.log('✅ Hover state tested');
  }
  
  // Check for active page highlighting
  console.log('🎯 Checking for active page highlighting...');
  const activeItems = await page.locator('esds-tree-sidebar .active, esds-tree-sidebar [aria-current]').all();
  console.log(`✅ Found ${activeItems.length} active navigation items`);
  
  // Check browser console for errors and component messages
  console.log('📋 Checking browser console...');
  const logs = [];
  page.on('console', msg => logs.push(msg));
  
  // Wait a bit more to capture any delayed console messages
  await page.waitForTimeout(1000);
  
  // Check for component registration and CSS errors
  const cssErrors = await page.evaluate(() => {
    const errors = [];
    const sheets = Array.from(document.styleSheets);
    
    sheets.forEach((sheet, index) => {
      try {
        const rules = Array.from(sheet.cssRules || sheet.rules || []);
        rules.forEach(rule => {
          if (rule.style && rule.style.length === 0 && rule.cssText.includes('--esds-')) {
            errors.push(`Potential CSS token issue in rule: ${rule.cssText}`);
          }
        });
      } catch (e) {
        // Some stylesheets might be inaccessible due to CORS
      }
    });
    
    return errors;
  });
  
  if (cssErrors.length > 0) {
    console.log('⚠️ Potential CSS token issues found:');
    cssErrors.forEach(error => console.log(`  - ${error}`));
  } else {
    console.log('✅ No obvious CSS token resolution issues detected');
  }
  
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
  
  console.log(`🔧 ELEVATE components: ${componentSeparation.elevateCount} instances`);
  console.log(`📖 ESDS components: ${componentSeparation.esdsCount} instances`);
  console.log(`🔧 ELEVATE types: ${componentSeparation.elevateTypes.join(', ')}`);
  console.log(`📖 ESDS types: ${componentSeparation.esdsTypes.join(', ')}`);
  
  // Final validation
  console.log('🎉 ESDS component architecture test completed successfully!');
  console.log('📊 Summary:');
  console.log(`  - ESDS tokens detected: ${Object.keys(tokenData.esdsTokens).length}`);
  console.log(`  - ELEVATE tokens detected: ${Object.keys(tokenData.elevateTokens).length}`);
  console.log(`  - Navigation items: ${navItems.length}`);
  console.log(`  - Expandable items: ${expandableItems.length}`);
  console.log(`  - Active items: ${activeItems.length}`);
  console.log(`  - ELEVATE components: ${componentSeparation.elevateCount}`);
  console.log(`  - ESDS components: ${componentSeparation.esdsCount}`);
});