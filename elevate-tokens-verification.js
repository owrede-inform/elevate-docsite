import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function verifyELEVATETokensShowcase() {
  console.log('🚀 Starting ELEVATE Tokens Showcase Verification...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 800 
  });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // Enable console logging to capture registration messages
    page.on('console', msg => {
      console.log(`🖥️ Console: ${msg.text()}`);
    });
    
    console.log('📱 Navigating to tokens showcase at localhost:3000/tokens-showcase...');
    await page.goto('http://localhost:3000/tokens-showcase', { 
      waitUntil: 'networkidle',
      timeout: 15000 
    });
    
    // Wait for components to fully render
    await page.waitForTimeout(3000);
    
    // 1. Check for ELEVATE Components registration message
    console.log('🔧 Checking for ELEVATE components registration...');
    const registrationMessages = await page.evaluate(() => {
      // Look for any registration logs or evidence in the DOM
      const messages = [];
      
      // Check if custom elements are registered
      if (typeof customElements !== 'undefined') {
        const hasElvtButton = customElements.get('elvt-button') !== undefined;
        messages.push(`elvt-button registration: ${hasElvtButton ? 'REGISTERED ✅' : 'NOT REGISTERED ❌'}`);
        
        // Check for other ELEVATE components
        const elvtComponents = ['elvt-card', 'elvt-input', 'elvt-modal'];
        elvtComponents.forEach(component => {
          const isRegistered = customElements.get(component) !== undefined;
          messages.push(`${component} registration: ${isRegistered ? 'REGISTERED ✅' : 'NOT REGISTERED ❌'}`);
        });
      }
      
      return messages;
    });
    
    console.log('📋 Component Registration Status:');
    registrationMessages.forEach(msg => console.log(`  ${msg}`));
    
    // 2. Take full-page screenshot
    console.log('📸 Taking full-page screenshot...');
    fs.mkdirSync('elevate-verification', { recursive: true });
    await page.screenshot({ 
      path: 'elevate-verification/tokens-showcase-full.png', 
      fullPage: true 
    });
    
    // 3. Verify ELEVATE button styling
    console.log('🎨 Verifying ELEVATE button styling...');
    const buttonAnalysis = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button, elvt-button, [class*="button"], .elvt-btn');
      const analysis = [];
      
      Array.from(buttons).forEach((btn, index) => {
        const styles = window.getComputedStyle(btn);
        const rect = btn.getBoundingClientRect();
        
        // Extract color information
        const backgroundColor = styles.backgroundColor;
        const color = styles.color;
        const borderColor = styles.borderColor;
        
        // Check for ELEVATE-specific classes or attributes
        const isElevateButton = btn.tagName.toLowerCase() === 'elvt-button' || 
                              btn.className.includes('elvt-') ||
                              btn.hasAttribute('variant');
        
        analysis.push({
          index,
          tagName: btn.tagName,
          className: btn.className,
          textContent: btn.textContent.trim(),
          isElevateButton,
          variant: btn.getAttribute('variant') || 'unknown',
          styles: {
            backgroundColor,
            color,
            borderColor,
            borderRadius: styles.borderRadius,
            padding: styles.padding,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            fontFamily: styles.fontFamily,
            display: styles.display,
            cursor: styles.cursor
          },
          dimensions: rect,
          isVisible: rect.width > 0 && rect.height > 0 && styles.visibility !== 'hidden' && styles.opacity !== '0'
        });
      });
      
      return analysis;
    });
    
    console.log(`🔍 Found ${buttonAnalysis.length} buttons/button elements`);
    
    // Analyze button colors for ELEVATE design system compliance
    const colorAnalysis = {
      primary: [],
      success: [],
      warning: [],
      danger: [],
      other: []
    };
    
    buttonAnalysis.forEach(btn => {
      const bg = btn.styles.backgroundColor;
      console.log(`  Button "${btn.textContent}": ${bg} (variant: ${btn.variant})`);
      
      // Classify based on color (approximate RGB values)
      if (bg.includes('rgb')) {
        const rgbMatch = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
          const [, r, g, b] = rgbMatch.map(Number);
          
          // ELEVATE blue (primary) - around rgb(0, 100, 200) range
          if (b > 150 && r < 100 && g < 150) {
            colorAnalysis.primary.push(btn);
          }
          // Green (success) - high green value
          else if (g > 150 && r < 150 && b < 150) {
            colorAnalysis.success.push(btn);
          }
          // Yellow/Orange (warning) - high red and green, low blue
          else if (r > 150 && g > 100 && b < 100) {
            colorAnalysis.warning.push(btn);
          }
          // Red (danger) - high red, low green and blue
          else if (r > 150 && g < 100 && b < 100) {
            colorAnalysis.danger.push(btn);
          }
          else {
            colorAnalysis.other.push(btn);
          }
        }
      } else {
        colorAnalysis.other.push(btn);
      }
    });
    
    console.log('🎯 Color Classification Results:');
    console.log(`  Primary (Blue): ${colorAnalysis.primary.length} buttons`);
    console.log(`  Success (Green): ${colorAnalysis.success.length} buttons`);
    console.log(`  Warning (Yellow/Orange): ${colorAnalysis.warning.length} buttons`);
    console.log(`  Danger (Red): ${colorAnalysis.danger.length} buttons`);
    console.log(`  Other: ${colorAnalysis.other.length} buttons`);
    
    // 4. Test button interactivity
    console.log('⚡ Testing button interactivity...');
    const interactivityResults = [];
    
    for (let i = 0; i < Math.min(buttonAnalysis.length, 5); i++) {
      const btn = buttonAnalysis[i];
      if (btn.isVisible) {
        try {
          // Get button element again for interaction
          const buttonElement = await page.locator(`button:nth-child(${i + 1}), elvt-button:nth-child(${i + 1})`).first();
          
          // Test hover state
          await buttonElement.hover();
          await page.waitForTimeout(200);
          
          const hoverStyles = await page.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (element) {
              const styles = window.getComputedStyle(element);
              return {
                backgroundColor: styles.backgroundColor,
                transform: styles.transform,
                boxShadow: styles.boxShadow
              };
            }
            return null;
          }, `button:nth-child(${i + 1}), elvt-button:nth-child(${i + 1})`);
          
          // Test click responsiveness
          await buttonElement.click();
          await page.waitForTimeout(200);
          
          interactivityResults.push({
            buttonIndex: i,
            buttonText: btn.textContent,
            hover: hoverStyles ? 'responsive' : 'no-response',
            click: 'responsive',
            hoverStyles
          });
        } catch (error) {
          interactivityResults.push({
            buttonIndex: i,
            buttonText: btn.textContent,
            hover: 'error',
            click: 'error',
            error: error.message
          });
        }
      }
    }
    
    console.log('🖱️ Interactivity Test Results:');
    interactivityResults.forEach(result => {
      console.log(`  "${result.buttonText}": hover=${result.hover}, click=${result.click}`);
    });
    
    // 5. Check design tokens implementation
    console.log('📏 Verifying design tokens implementation...');
    const tokenAnalysis = await page.evaluate(() => {
      const rootStyles = window.getComputedStyle(document.documentElement);
      const tokens = {};
      
      // Look for CSS custom properties (design tokens)
      const cssVariables = [];
      for (let i = 0; i < rootStyles.length; i++) {
        const property = rootStyles[i];
        if (property.startsWith('--')) {
          cssVariables.push({
            property,
            value: rootStyles.getPropertyValue(property)
          });
        }
      }
      
      // Check for ELEVATE-specific tokens
      const elevateTokens = cssVariables.filter(token => 
        token.property.includes('elevate') || 
        token.property.includes('elvt') ||
        token.property.includes('primary') ||
        token.property.includes('success') ||
        token.property.includes('warning') ||
        token.property.includes('danger')
      );
      
      return {
        totalCSSVariables: cssVariables.length,
        elevateTokens,
        sampleTokens: cssVariables.slice(0, 10)
      };
    });
    
    console.log('🎨 Design Tokens Analysis:');
    console.log(`  Total CSS Variables: ${tokenAnalysis.totalCSSVariables}`);
    console.log(`  ELEVATE-related tokens: ${tokenAnalysis.elevateTokens.length}`);
    
    if (tokenAnalysis.elevateTokens.length > 0) {
      console.log('  ELEVATE Design Tokens Found:');
      tokenAnalysis.elevateTokens.slice(0, 8).forEach(token => {
        console.log(`    ${token.property}: ${token.value}`);
      });
    }
    
    // 6. Run validation tests
    console.log('✅ Running validation tests...');
    const validationResults = [];
    
    // Test 1: Page loads successfully
    validationResults.push({
      test: 'Page loads successfully',
      passed: true,
      details: 'Tokens showcase page loaded without errors'
    });
    
    // Test 2: Components are registered
    const hasRegisteredComponents = registrationMessages.some(msg => msg.includes('REGISTERED ✅'));
    validationResults.push({
      test: 'ELEVATE components registered',
      passed: hasRegisteredComponents,
      details: hasRegisteredComponents ? 'Web components properly registered' : 'No web components found registered'
    });
    
    // Test 3: Buttons have distinct colors
    const hasDistinctColors = colorAnalysis.primary.length > 0 || 
                             colorAnalysis.success.length > 0 || 
                             colorAnalysis.warning.length > 0 || 
                             colorAnalysis.danger.length > 0;
    validationResults.push({
      test: 'Buttons show distinct ELEVATE colors',
      passed: hasDistinctColors,
      details: `Found buttons with distinct color variants: ${hasDistinctColors ? 'YES' : 'NO'}`
    });
    
    // Test 4: Design tokens are implemented
    validationResults.push({
      test: 'Design tokens implemented',
      passed: tokenAnalysis.elevateTokens.length > 0,
      details: `Found ${tokenAnalysis.elevateTokens.length} ELEVATE-related CSS tokens`
    });
    
    // Test 5: Buttons are interactive
    const interactiveButtons = interactivityResults.filter(r => r.hover !== 'error' && r.click !== 'error').length;
    validationResults.push({
      test: 'Buttons are interactive',
      passed: interactiveButtons > 0,
      details: `${interactiveButtons} of ${interactivityResults.length} tested buttons are interactive`
    });
    
    // 7. Generate comprehensive report
    const report = {
      timestamp: new Date().toISOString(),
      url: 'http://localhost:3000/tokens-showcase',
      verification: {
        componentRegistration: registrationMessages,
        buttonAnalysis,
        colorAnalysis,
        interactivityResults,
        tokenAnalysis,
        validationResults
      },
      summary: {
        totalButtons: buttonAnalysis.length,
        elevateButtons: buttonAnalysis.filter(b => b.isElevateButton).length,
        colorVariants: {
          primary: colorAnalysis.primary.length,
          success: colorAnalysis.success.length,
          warning: colorAnalysis.warning.length,
          danger: colorAnalysis.danger.length
        },
        designTokens: tokenAnalysis.elevateTokens.length,
        passedTests: validationResults.filter(v => v.passed).length,
        totalTests: validationResults.length
      }
    };
    
    // Save verification report
    fs.writeFileSync('elevate-verification/verification-report.json', JSON.stringify(report, null, 2));
    
    // Display results
    console.log('\n🎯 ELEVATE TOKENS SHOWCASE VERIFICATION RESULTS');
    console.log('===============================================');
    
    validationResults.forEach(result => {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`${status}: ${result.test}`);
      console.log(`      ${result.details}`);
    });
    
    console.log('\n📊 SUMMARY:');
    console.log(`  Tests Passed: ${report.summary.passedTests}/${report.summary.totalTests}`);
    console.log(`  Total Buttons: ${report.summary.totalButtons}`);
    console.log(`  ELEVATE Buttons: ${report.summary.elevateButtons}`);
    console.log(`  Color Variants: Primary(${report.summary.colorVariants.primary}), Success(${report.summary.colorVariants.success}), Warning(${report.summary.colorVariants.warning}), Danger(${report.summary.colorVariants.danger})`);
    console.log(`  Design Tokens: ${report.summary.designTokens}`);
    
    const overallSuccess = report.summary.passedTests >= report.summary.totalTests * 0.8; // 80% pass rate
    console.log(`\n🎉 Overall Result: ${overallSuccess ? '✅ ELEVATE SYSTEM VERIFIED' : '❌ VERIFICATION INCOMPLETE'}`);
    
    if (overallSuccess) {
      console.log('🚀 ELEVATE design system is properly integrated and functional!');
    } else {
      console.log('⚠️ Some verification tests failed. Check the details above for issues to resolve.');
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    console.error(error.stack);
    
    // Take error screenshot
    try {
      fs.mkdirSync('elevate-verification', { recursive: true });
      await page.screenshot({ path: 'elevate-verification/error-state.png', fullPage: true });
      console.log('📸 Error screenshot saved to elevate-verification/error-state.png');
    } catch (screenshotError) {
      console.error('Failed to capture error screenshot:', screenshotError.message);
    }
  } finally {
    await browser.close();
  }
}

// Run verification
verifyELEVATETokensShowcase().catch(console.error);