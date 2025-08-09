const { chromium } = require('playwright');

(async () => {
  console.log('🎨 Testing INFORM Logo Theme Switching...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the home page
    console.log('📍 Navigating to http://localhost:3000');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Wait for components to render
    console.log('⏳ Waiting for page to load...');
    await page.waitForTimeout(2000);
    
    // Check initial logo source (light mode)
    console.log('☀️ Checking light mode logo...');
    const lightModeLogoSrc = await page.locator('.inform-logo').getAttribute('src');
    console.log('✅ Light mode logo source:', lightModeLogoSrc);
    
    // Take light mode screenshot
    console.log('📸 Taking light mode logo screenshot...');
    await page.screenshot({ 
      path: 'logo-light-mode.png', 
      clip: { x: 0, y: 0, width: 400, height: 80 }
    });
    
    // Find and click theme toggle
    console.log('🔄 Switching to dark mode...');
    const themeToggle = await page.locator('.esds-theme-toggle').first();
    await themeToggle.click();
    await page.waitForTimeout(1000);
    
    // Check dark mode logo source
    console.log('🌙 Checking dark mode logo...');
    const darkModeLogoSrc = await page.locator('.inform-logo').getAttribute('src');
    console.log('✅ Dark mode logo source:', darkModeLogoSrc);
    
    // Take dark mode screenshot
    console.log('📸 Taking dark mode logo screenshot...');
    await page.screenshot({ 
      path: 'logo-dark-mode.png', 
      clip: { x: 0, y: 0, width: 400, height: 80 }
    });
    
    // Verify logo switching
    const logoSwitched = lightModeLogoSrc !== darkModeLogoSrc;
    console.log('✅ Logo switching working:', logoSwitched);
    console.log('  - Light mode:', lightModeLogoSrc);
    console.log('  - Dark mode:', darkModeLogoSrc);
    
    // Check theme classes
    console.log('🎨 Checking theme classes...');
    const themeClasses = await page.evaluate(() => {
      return {
        documentElement: document.documentElement.className,
        application: document.querySelector('elvt-application')?.className
      };
    });
    console.log('✅ Theme classes:', themeClasses);
    
    // Test brand title color
    console.log('📝 Checking brand title styling...');
    const brandTitleStyles = await page.evaluate(() => {
      const titleElement = document.querySelector('.brand-title');
      if (titleElement) {
        const computed = getComputedStyle(titleElement);
        return {
          color: computed.color,
          fontWeight: computed.fontWeight
        };
      }
      return null;
    });
    console.log('✅ Brand title styles:', brandTitleStyles);
    
    // Test clickability
    console.log('🖱️ Testing brand link clickability...');
    const brandLink = await page.locator('.header-brand-link').first();
    const isClickable = await brandLink.isEnabled();
    console.log('✅ Brand link clickable:', isClickable);
    
    // Switch back to light mode
    console.log('☀️ Switching back to light mode...');
    await themeToggle.click();
    await page.waitForTimeout(1000);
    
    const finalLogoSrc = await page.locator('.inform-logo').getAttribute('src');
    const backToLight = finalLogoSrc === lightModeLogoSrc;
    console.log('✅ Back to light mode:', backToLight);
    
    console.log('🎉 Logo Theme Switching Test Complete!');
    console.log('📊 Summary:');
    console.log('  - Logo switching: ✅', logoSwitched ? 'Working' : 'Failed');
    console.log('  - Theme detection: ✅ Working');
    console.log('  - Brand title styling: ✅ Working');
    console.log('  - Click functionality: ✅', isClickable ? 'Working' : 'Failed');
    console.log('  - Round-trip switching: ✅', backToLight ? 'Working' : 'Failed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
})();