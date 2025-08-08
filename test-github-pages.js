import { chromium } from 'playwright';

(async () => {
  console.log('🚀 Testing GitHub Pages site: https://owrede-inform.github.io/elevate-docsite/');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set up console logging
  page.on('console', msg => {
    const type = msg.type();
    if (type === 'error') {
      console.log('❌ Console Error:', msg.text());
    } else if (type === 'warn') {
      console.log('⚠️  Console Warning:', msg.text());
    } else {
      console.log('ℹ️  Console Log:', msg.text());
    }
  });
  
  // Set up network monitoring
  page.on('response', response => {
    if (response.status() >= 400) {
      console.log(`🔴 Failed request: ${response.status()} ${response.url()}`);
    }
  });
  
  try {
    console.log('\n📋 TEST 1: Loading GitHub Pages site...');
    const startTime = Date.now();
    await page.goto('https://owrede-inform.github.io/elevate-docsite/', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    const loadTime = Date.now() - startTime;
    console.log(`✅ Site loaded in ${loadTime}ms`);
    
    console.log('\n📋 TEST 2: Checking React app initialization...');
    await page.waitForTimeout(2000); // Wait for React to initialize
    
    // Check if React root is populated
    const rootContent = await page.evaluate(() => {
      const root = document.getElementById('root');
      return {
        hasContent: root && root.innerHTML.length > 0,
        contentLength: root ? root.innerHTML.length : 0,
        innerHTML: root ? root.innerHTML.substring(0, 500) : null
      };
    });
    
    console.log(`Root content length: ${rootContent.contentLength}`);
    console.log(`Has content: ${rootContent.hasContent}`);
    
    if (rootContent.hasContent) {
      console.log('✅ React app initialized successfully');
      console.log('First 500 chars of content:', rootContent.innerHTML);
    } else {
      console.log('❌ React app failed to initialize - root is empty');
    }
    
    console.log('\n📋 TEST 3: Checking for JavaScript errors...');
    // Wait a bit more to catch any delayed errors
    await page.waitForTimeout(3000);
    
    console.log('\n📋 TEST 4: Checking page content...');
    const title = await page.title();
    console.log(`Page title: "${title}"`);
    
    // Check for specific elements that should be present
    const elementsCheck = await page.evaluate(() => {
      return {
        hasHeader: document.querySelector('header') !== null,
        hasNav: document.querySelector('nav') !== null,
        hasMain: document.querySelector('main') !== null,
        hasFooter: document.querySelector('footer') !== null,
        bodyClasses: document.body.className,
        totalElements: document.querySelectorAll('*').length
      };
    });
    
    console.log('Element check:', elementsCheck);
    
    console.log('\n📋 TEST 5: Checking for ESDS components...');
    const esdsCheck = await page.evaluate(() => {
      // Look for any elements that might indicate ESDS components loaded
      const elementsWithEsds = document.querySelectorAll('[class*="esds"], [data-component*="esds"]');
      return {
        esdsElementsCount: elementsWithEsds.length,
        hasCustomElements: document.querySelectorAll('[class*="component"]').length > 0
      };
    });
    
    console.log('ESDS components check:', esdsCheck);
    
    console.log('\n📋 TEST 6: Performance and network check...');
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: navigation ? Math.round(navigation.loadEventEnd - navigation.fetchStart) : null,
        domContentLoaded: navigation ? Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart) : null
      };
    });
    
    console.log('Performance metrics:', performanceMetrics);
    
    // Take a screenshot for visual verification
    await page.screenshot({ path: 'github-pages-test.png', fullPage: true });
    console.log('📸 Screenshot saved as github-pages-test.png');
    
    console.log('\n🎯 SUMMARY:');
    console.log(`✅ Site loads: YES`);
    console.log(`✅ React initialized: ${rootContent.hasContent ? 'YES' : 'NO'}`);
    console.log(`✅ Content present: ${rootContent.contentLength > 100 ? 'YES' : 'NO'}`);
    console.log(`✅ Load time: ${performanceMetrics.loadTime}ms`);
    
    if (rootContent.hasContent && rootContent.contentLength > 100) {
      console.log('🎉 SUCCESS: GitHub Pages deployment appears to be working correctly!');
    } else {
      console.log('❌ ISSUE: Site loads but content may not be displaying properly');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
  
  console.log('\n⏳ Keeping browser open for 10 seconds for manual inspection...');
  await page.waitForTimeout(10000);
  
  await browser.close();
  console.log('✅ Test completed');
})();