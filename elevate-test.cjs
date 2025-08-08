const { chromium } = require('playwright');

async function testElevateIntegration() {
  console.log('🧪 Starting ELEVATE Components integration test...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the tokens showcase
    console.log('📍 Navigating to tokens showcase...');
    await page.goto('http://localhost:3002/tokens-showcase', { 
      waitUntil: 'networkidle',
      timeout: 20000 
    });
    
    // Wait for page to fully load
    console.log('⏳ Waiting for page to load...');
    await page.waitForTimeout(3000);
    
    // Check console for ELEVATE registration message
    console.log('🔍 Monitoring console logs...');
    const consoleLogs = [];
    page.on('console', msg => {
      const logText = msg.text();
      consoleLogs.push(logText);
      console.log(`Console [${msg.type()}]: ${logText}`);
    });
    
    // Wait a bit more for console messages
    await page.waitForTimeout(2000);
    
    // Check if ELEVATE components are registered
    const elevateRegistered = await page.evaluate(() => {
      const components = [
        'elvt-button', 'elvt-icon', 'elvt-divider', 'elvt-card',
        'elvt-input', 'elvt-textarea', 'elvt-select', 'elvt-checkbox',
        'elvt-radio', 'elvt-switch', 'elvt-badge', 'elvt-chip',
        'elvt-tooltip', 'elvt-modal', 'elvt-dropdown', 'elvt-tabs',
        'elvt-accordion', 'elvt-progress', 'elvt-spinner', 'elvt-alert',
        'elvt-breadcrumb', 'elvt-pagination', 'elvt-table', 'elvt-avatar',
        'elvt-skeleton', 'elvt-toast'
      ];
      
      const registered = [];
      components.forEach(component => {
        if (customElements.get(component)) {
          registered.push(component);
        }
      });
      
      return {
        total: components.length,
        registered: registered.length,
        components: registered
      };
    });
    
    console.log(`✅ ELEVATE Components Registration: ${elevateRegistered.registered}/${elevateRegistered.total} components registered`);
    console.log('Registered components:', elevateRegistered.components.join(', '));
    
    // Take full page screenshot
    console.log('📸 Taking full page screenshot...');
    await page.screenshot({ 
      path: 'elevate-tokens-showcase.png', 
      fullPage: true 
    });
    
    // Check for Button Components section
    console.log('🔍 Looking for Button Components section...');
    const buttonSectionExists = await page.locator('h2:has-text("Button Components"), h3:has-text("Button Components")').first().isVisible().catch(() => false);
    
    if (buttonSectionExists) {
      console.log('✅ Found Button Components section');
      await page.locator('h2:has-text("Button Components"), h3:has-text("Button Components")').first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
    }
    
    // Check for ELEVATE buttons and their styling
    console.log('🔍 Checking ELEVATE buttons...');
    const buttonCount = await page.locator('elvt-button').count();
    console.log(`Found ${buttonCount} elvt-button elements`);
    
    if (buttonCount > 0) {
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = page.locator('elvt-button').nth(i);
        const tone = await button.getAttribute('tone').catch(() => 'primary');
        const isVisible = await button.isVisible().catch(() => false);
        console.log(`Button ${i + 1}: tone="${tone}", visible=${isVisible}`);
        
        if (isVisible) {
          // Test button interactivity
          try {
            await button.hover();
            await page.waitForTimeout(500);
            console.log(`✅ Button ${i + 1} hover interaction works`);
          } catch (e) {
            console.log(`⚠️ Button ${i + 1} hover failed: ${e.message}`);
          }
        }
      }
    }
    
    // Check for regular buttons (should be minimal if ELEVATE is working)
    const regularButtonCount = await page.locator('button:not([is]):not(elvt-button *)').count();
    console.log(`Found ${regularButtonCount} regular HTML buttons`);
    
    // Check navigation header for ELEVATE ApplicationShell
    console.log('🔍 Checking navigation header...');
    const navHeaderExists = await page.locator('header, nav, [role="banner"]').first().isVisible().catch(() => false);
    
    if (navHeaderExists) {
      console.log('✅ Navigation header found');
      const hasElevateClasses = await page.locator('header, nav, [role="banner"]').first().evaluate(el => {
        return el.className.includes('elvt-') || 
               el.querySelector('[class*="elvt-"]') !== null ||
               el.tagName.toLowerCase().includes('elvt-');
      }).catch(() => false);
      console.log(`Navigation uses ELEVATE styling: ${hasElevateClasses}`);
    }
    
    // Check for design tokens in CSS
    console.log('🔍 Checking design tokens...');
    const hasDesignTokens = await page.evaluate(() => {
      const styles = Array.from(document.styleSheets);
      let tokenCount = 0;
      
      try {
        styles.forEach(sheet => {
          try {
            const rules = Array.from(sheet.cssRules || sheet.rules || []);
            rules.forEach(rule => {
              if (rule.cssText && rule.cssText.includes('var(--elvt-')) {
                tokenCount++;
              }
            });
          } catch (e) {
            // Skip CORS-protected stylesheets
          }
        });
      } catch (e) {
        console.log('Could not analyze all stylesheets');
      }
      
      return tokenCount;
    });
    
    console.log(`Found ${hasDesignTokens} design token usages in CSS`);
    
    // Check if manual registration message appears
    const hasManualRegistration = consoleLogs.some(log => 
      log.includes('🔧 ELEVATE Components manually registered') || 
      log.includes('ELEVATE Components manually registered')
    );
    console.log(`Manual registration message found: ${hasManualRegistration}`);
    
    // Take a focused screenshot of the button section if found
    if (buttonSectionExists) {
      console.log('📸 Taking focused screenshot of Button Components section...');
      const buttonSection = page.locator('h2:has-text("Button Components"), h3:has-text("Button Components")').first();
      await buttonSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      
      const boundingBox = await buttonSection.boundingBox().catch(() => null);
      if (boundingBox) {
        await page.screenshot({ 
          path: 'elevate-buttons-section.png',
          clip: boundingBox
        });
      }
    }
    
    // Final status report
    console.log('\n📋 INTEGRATION TEST SUMMARY:');
    console.log(`• Components registered: ${elevateRegistered.registered}/${elevateRegistered.total}`);
    console.log(`• ELEVATE buttons found: ${buttonCount}`);
    console.log(`• Regular buttons found: ${regularButtonCount}`);
    console.log(`• Design tokens in use: ${hasDesignTokens}`);
    console.log(`• Manual registration message: ${hasManualRegistration}`);
    console.log(`• Screenshot saved: elevate-tokens-showcase.png`);
    
    console.log('✅ ELEVATE Components integration test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testElevateIntegration().catch(console.error);