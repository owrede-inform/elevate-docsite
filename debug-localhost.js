import { chromium } from 'playwright';

(async () => {
  console.log('🔍 Comprehensive localhost:3000 Debugging Analysis');
  console.log('=' .repeat(60));
  
  const browser = await chromium.launch({ headless: false, devtools: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Enhanced logging for all console messages
  const consoleMessages = [];
  page.on('console', msg => {
    const timestamp = new Date().toISOString();
    const level = msg.type().toUpperCase();
    const text = msg.text();
    
    consoleMessages.push({ timestamp, level, text });
    console.log(`[${timestamp}] ${level}: ${text}`);
  });
  
  // Track all network requests and responses
  const networkLog = [];
  page.on('request', request => {
    networkLog.push({
      type: 'REQUEST',
      url: request.url(),
      method: request.method(),
      headers: request.headers(),
      timestamp: new Date().toISOString()
    });
  });
  
  page.on('response', response => {
    networkLog.push({
      type: 'RESPONSE',
      url: response.url(),
      status: response.status(),
      statusText: response.statusText(),
      headers: response.headers(),
      timestamp: new Date().toISOString()
    });
    
    if (response.status() >= 400) {
      console.log(`❌ Failed Request: ${response.status()} ${response.url()}`);
    }
  });
  
  // Track page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push({
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    console.log(`🚨 Page Error: ${error.message}`);
  });
  
  try {
    console.log('\n📍 Step 1: Attempting to load localhost:3000');
    console.log('⏱️  Timeout set to 30 seconds for initial load');
    
    const startTime = Date.now();
    
    // Try to navigate to localhost:3000
    const response = await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    const loadTime = Date.now() - startTime;
    console.log(`✅ Initial response received in ${loadTime}ms`);
    console.log(`📊 Response status: ${response.status()} ${response.statusText()}`);
    console.log(`🌐 Final URL: ${response.url()}`);
    
    // Wait additional time for React to initialize
    console.log('\n📍 Step 2: Waiting for React app initialization');
    await page.waitForTimeout(3000);
    
    // Get page title and basic info
    const title = await page.title();
    console.log(`📄 Page title: "${title}"`);
    
    // Check if main React root is populated
    console.log('\n📍 Step 3: Analyzing React app state');
    const reactAnalysis = await page.evaluate(() => {
      const root = document.getElementById('root');
      const body = document.body;
      
      return {
        hasRoot: !!root,
        rootContent: root ? root.innerHTML.length : 0,
        rootFirstChild: root ? root.firstElementChild?.tagName : null,
        bodyClasses: body.className,
        bodyContent: body.textContent.substring(0, 200),
        totalElements: document.querySelectorAll('*').length,
        scripts: Array.from(document.querySelectorAll('script')).map(s => ({
          src: s.src,
          type: s.type,
          hasContent: s.textContent.length > 0
        })),
        stylesheets: Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href),
        customElements: Object.getOwnPropertyNames(window).filter(name => 
          name.includes('elevate') || name.includes('esds')
        ),
        webComponents: Array.from(document.querySelectorAll('*')).filter(el => 
          el.tagName.toLowerCase().includes('elevate') || 
          el.tagName.toLowerCase().includes('esds')
        ).map(el => el.tagName.toLowerCase()),
        moduleErrors: window.__moduleErrors || []
      };
    });
    
    console.log('\n📊 React App Analysis:');
    console.log(`   Root element exists: ${reactAnalysis.hasRoot}`);
    console.log(`   Root content length: ${reactAnalysis.rootContent}`);
    console.log(`   Root first child: ${reactAnalysis.rootFirstChild}`);
    console.log(`   Total DOM elements: ${reactAnalysis.totalElements}`);
    console.log(`   Body classes: "${reactAnalysis.bodyClasses}"`);
    console.log(`   Web components found: ${reactAnalysis.webComponents.length > 0 ? reactAnalysis.webComponents.join(', ') : 'None'}`);
    
    if (reactAnalysis.rootContent === 0) {
      console.log('⚠️  WARNING: React root is empty - app may not be initializing');
    }
    
    console.log('\n📍 Step 4: Checking for ELEVATE/ESDS components');
    const componentStatus = await page.evaluate(() => {
      // Check if our custom elements are registered
      const componentChecks = [
        'elevate-button',
        'elevate-card', 
        'elevate-container',
        'esds-navigation',
        'esds-component-preview',
        'esds-pattern-card',
        'esds-github-link'
      ];
      
      return componentChecks.map(tagName => ({
        tagName,
        isDefined: customElements.get(tagName) !== undefined,
        inDOM: document.querySelectorAll(tagName).length
      }));
    });
    
    console.log('\n🧩 Component Registration Status:');
    componentStatus.forEach(comp => {
      const status = comp.isDefined ? '✅ Registered' : '❌ Not Registered';
      const domCount = comp.inDOM > 0 ? ` (${comp.inDOM} in DOM)` : ' (0 in DOM)';
      console.log(`   ${comp.tagName}: ${status}${domCount}`);
    });
    
    // Check for module loading errors
    console.log('\n📍 Step 5: Module and Script Analysis');
    console.log(`   Scripts loaded: ${reactAnalysis.scripts.length}`);
    reactAnalysis.scripts.forEach((script, idx) => {
      if (script.src) {
        console.log(`   Script ${idx + 1}: ${script.src}`);
      }
    });
    
    console.log(`   Stylesheets loaded: ${reactAnalysis.stylesheets.length}`);
    reactAnalysis.stylesheets.forEach((stylesheet, idx) => {
      console.log(`   Stylesheet ${idx + 1}: ${stylesheet}`);
    });
    
    // Take a screenshot for visual debugging
    await page.screenshot({ 
      path: 'localhost-debug-screenshot.png', 
      fullPage: true 
    });
    console.log('\n📸 Screenshot saved as localhost-debug-screenshot.png');
    
    // Check specific elements that should be present
    console.log('\n📍 Step 6: Looking for expected UI elements');
    const uiElements = await page.evaluate(() => {
      return {
        hasNavigation: document.querySelector('esds-navigation') !== null,
        hasMain: document.querySelector('main') !== null,
        hasFooter: document.querySelector('footer') !== null,
        hasContainer: document.querySelector('elevate-container') !== null,
        navigationText: document.querySelector('esds-navigation') ? 
          document.querySelector('esds-navigation').textContent : 'Not found',
        visibleText: document.body.textContent.substring(0, 500)
      };
    });
    
    console.log('\n🎯 UI Elements Check:');
    console.log(`   Navigation component: ${uiElements.hasNavigation ? '✅ Found' : '❌ Missing'}`);
    console.log(`   Main element: ${uiElements.hasMain ? '✅ Found' : '❌ Missing'}`);  
    console.log(`   Footer element: ${uiElements.hasFooter ? '✅ Found' : '❌ Missing'}`);
    console.log(`   Container component: ${uiElements.hasContainer ? '✅ Found' : '❌ Missing'}`);
    
    if (uiElements.visibleText.length > 0) {
      console.log(`\n📝 First 500 chars of visible text:`);
      console.log(`"${uiElements.visibleText}"`);
    } else {
      console.log('\n⚠️  No visible text found on page');
    }
    
  } catch (error) {
    console.error('\n❌ Critical Error During Analysis:');
    console.error(`   Error Type: ${error.name}`);
    console.error(`   Error Message: ${error.message}`);
    if (error.stack) {
      console.error(`   Stack Trace: ${error.stack.split('\n')[0]}`);
    }
  }
  
  // Summary of all collected data
  console.log('\n📋 DIAGNOSTIC SUMMARY:');
  console.log('=' .repeat(40));
  console.log(`Console Messages: ${consoleMessages.length}`);
  console.log(`Network Requests: ${networkLog.filter(n => n.type === 'REQUEST').length}`);
  console.log(`Network Responses: ${networkLog.filter(n => n.type === 'RESPONSE').length}`);
  console.log(`Failed Requests: ${networkLog.filter(n => n.type === 'RESPONSE' && n.status >= 400).length}`);
  console.log(`Page Errors: ${pageErrors.length}`);
  
  if (consoleMessages.length > 0) {
    console.log('\n📊 Console Message Breakdown:');
    const messageTypes = {};
    consoleMessages.forEach(msg => {
      messageTypes[msg.level] = (messageTypes[msg.level] || 0) + 1;
    });
    Object.entries(messageTypes).forEach(([level, count]) => {
      console.log(`   ${level}: ${count}`);
    });
  }
  
  if (pageErrors.length > 0) {
    console.log('\n🚨 Page Errors Details:');
    pageErrors.forEach((error, idx) => {
      console.log(`   Error ${idx + 1}: ${error.message}`);
    });
  }
  
  console.log('\n⏳ Keeping browser open for 15 seconds for manual inspection...');
  await page.waitForTimeout(15000);
  
  await browser.close();
  console.log('\n✅ Diagnostic analysis completed');
})().catch(console.error);