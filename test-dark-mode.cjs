const { chromium } = require('playwright');

(async () => {
  console.log('🌙 Testing ESDS Dark Mode Implementation...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the home page
    console.log('📍 Navigating to http://localhost:3000');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Wait for components to render
    console.log('⏳ Waiting for page to load...');
    await page.waitForTimeout(2000);
    
    // Check for the theme toggle button
    console.log('🔍 Checking for theme toggle button...');
    const themeToggle = await page.locator('.esds-theme-toggle').first();
    const isToggleVisible = await themeToggle.isVisible().catch(() => false);
    console.log('✅ Theme toggle visibility:', isToggleVisible);
    
    if (isToggleVisible) {
      // Take screenshot in light mode
      console.log('📸 Taking light mode screenshot...');
      await page.screenshot({ 
        path: 'light-mode-screenshot.png', 
        fullPage: true 
      });
      
      // Click the theme toggle to switch to dark mode
      console.log('🔄 Switching to dark mode...');
      await themeToggle.click();
      await page.waitForTimeout(1000); // Wait for transition
      
      // Take screenshot in dark mode
      console.log('📸 Taking dark mode screenshot...');
      await page.screenshot({ 
        path: 'dark-mode-screenshot.png', 
        fullPage: true 
      });
      
      // Test that themes are properly applied
      console.log('🎨 Testing theme classes...');
      const rootClasses = await page.evaluate(() => {
        return {
          documentElement: document.documentElement.className,
          application: document.querySelector('elvt-application')?.className
        };
      });
      console.log('✅ Root classes:', rootClasses);
      
      // Test that dark mode tokens are applied
      console.log('🎯 Testing dark mode token application...');
      const darkTokens = await page.evaluate(() => {
        const computedStyle = getComputedStyle(document.documentElement);
        return {
          backgroundPrimary: computedStyle.getPropertyValue('--esds-color-background-primary').trim(),
          textPrimary: computedStyle.getPropertyValue('--esds-color-text-primary').trim(),
          borderLight: computedStyle.getPropertyValue('--esds-color-border-light').trim()
        };
      });
      console.log('🎨 Dark mode tokens:', darkTokens);
      
      // Test switching back to light mode
      console.log('☀️ Switching back to light mode...');
      await themeToggle.click();
      await page.waitForTimeout(1000);
      
      // Verify light mode is restored
      const lightTokens = await page.evaluate(() => {
        const computedStyle = getComputedStyle(document.documentElement);
        return {
          backgroundPrimary: computedStyle.getPropertyValue('--esds-color-background-primary').trim(),
          textPrimary: computedStyle.getPropertyValue('--esds-color-text-primary').trim(),
          borderLight: computedStyle.getPropertyValue('--esds-color-border-light').trim()
        };
      });
      console.log('☀️ Light mode tokens:', lightTokens);
      
      // Test localStorage persistence
      console.log('💾 Testing localStorage persistence...');
      const storedTheme = await page.evaluate(() => localStorage.getItem('esds-theme'));
      console.log('✅ Stored theme:', storedTheme);
      
      // Test ARIA attributes
      console.log('♿ Testing accessibility attributes...');
      const ariaPressed = await themeToggle.getAttribute('aria-pressed');
      const ariaLabel = await themeToggle.getAttribute('aria-label');
      console.log('✅ ARIA pressed:', ariaPressed);
      console.log('✅ ARIA label:', ariaLabel);
      
    } else {
      console.log('❌ Theme toggle button not found');
    }
    
    // Check for proper icon display
    console.log('🔍 Checking theme toggle icon...');
    const iconPath = await page.evaluate(() => {
      const icon = document.querySelector('.esds-theme-toggle svg path');
      return icon ? icon.getAttribute('d') : null;
    });
    console.log('🎨 Current icon path:', iconPath ? 'Found' : 'Not found');
    
    // Test system theme preference detection
    console.log('🖥️ Testing system theme preference...');
    const systemTheme = await page.evaluate(() => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });
    console.log('✅ System prefers:', systemTheme);
    
    console.log('🎉 Dark Mode Test Complete!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
})();