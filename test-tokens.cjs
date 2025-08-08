const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
  });
  const page = await browser.newPage();
  
  const consoleMessages = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
    }
  });
  
  try {
    console.log('Navigating to tokens showcase...');
    await page.goto('http://localhost:3002/tokens-showcase', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait for components to load
    console.log('Waiting for components to load...');
    await page.waitForTimeout(3000);
    
    // Check if elvt-theme-light class is applied
    const themeClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('elvt-theme-light') || 
             document.body.classList.contains('elvt-theme-light');
    });
    console.log('elvt-theme-light class applied:', themeClass);
    
    // Check if elvt-button web components are registered
    const buttonRegistered = await page.evaluate(() => {
      return customElements.get('elvt-button') !== undefined;
    });
    console.log('elvt-button web component registered:', buttonRegistered);
    
    // Check button colors for different tones
    const buttonColors = await page.evaluate(() => {
      const buttons = document.querySelectorAll('elvt-button');
      const colors = {};
      buttons.forEach((button, index) => {
        const tone = button.getAttribute('tone') || 'primary';
        const styles = window.getComputedStyle(button);
        colors[tone] = {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          borderColor: styles.borderColor
        };
      });
      return colors;
    });
    console.log('Button colors by tone:', JSON.stringify(buttonColors, null, 2));
    
    // Wait a bit more for any late console messages
    await page.waitForTimeout(2000);
    
    if (consoleMessages.length > 0) {
      console.log('Console messages:');
      consoleMessages.forEach(msg => console.log(msg));
    } else {
      console.log('No console errors or warnings detected');
    }
    
    // Take screenshot
    console.log('Taking full page screenshot...');
    await page.screenshot({ 
      path: 'tokens-showcase-screenshot.png', 
      fullPage: true 
    });
    console.log('Screenshot saved as tokens-showcase-screenshot.png');
    
    // Check color swatches
    const colorSwatches = await page.evaluate(() => {
      const swatches = document.querySelectorAll('[class*="color-swatch"], .color-sample, [style*="background-color"]');
      const swatchInfo = [];
      swatches.forEach((swatch, index) => {
        const styles = window.getComputedStyle(swatch);
        if (styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && styles.backgroundColor !== 'transparent') {
          swatchInfo.push({
            index,
            backgroundColor: styles.backgroundColor,
            className: swatch.className,
            textContent: swatch.textContent && swatch.textContent.trim().substring(0, 50)
          });
        }
      });
      return swatchInfo.slice(0, 10); // First 10 meaningful swatches
    });
    console.log('Color swatches found:', JSON.stringify(colorSwatches, null, 2));
    
    // Check typography elements
    const typography = await page.evaluate(() => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const typographyInfo = [];
      headings.forEach((heading, index) => {
        const styles = window.getComputedStyle(heading);
        typographyInfo.push({
          tag: heading.tagName,
          fontSize: styles.fontSize,
          fontFamily: styles.fontFamily,
          fontWeight: styles.fontWeight,
          textContent: heading.textContent && heading.textContent.trim().substring(0, 30)
        });
      });
      return typographyInfo.slice(0, 5); // First 5 headings
    });
    console.log('Typography elements:', JSON.stringify(typography, null, 2));
    
  } catch (error) {
    console.error('Error during testing:', error.message);
  } finally {
    await browser.close();
  }
})();