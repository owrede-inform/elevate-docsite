import { chromium } from 'playwright';

(async () => {
  console.log('🔍 Comparing GitHub Pages vs Local Development Server');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  // Test both sites
  const sites = [
    { name: 'GitHub Pages', url: 'https://owrede-inform.github.io/elevate-docsite/' },
    { name: 'Local Dev', url: 'http://localhost:3000/' }
  ];
  
  const results = {};
  
  for (const site of sites) {
    console.log(`\n🚀 Testing ${site.name}: ${site.url}`);
    const page = await context.newPage();
    
    const errors = [];
    const warnings = [];
    const networkErrors = [];
    
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error') {
        errors.push(text);
      } else if (type === 'warn') {
        warnings.push(text);
      }
    });
    
    page.on('response', response => {
      if (response.status() >= 400) {
        networkErrors.push(`${response.status()} ${response.url()}`);
      }
    });
    
    try {
      const startTime = Date.now();
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 10000 });
      const loadTime = Date.now() - startTime;
      
      await page.waitForTimeout(2000); // Wait for React
      
      const analysis = await page.evaluate(() => {
        const root = document.getElementById('root');
        return {
          title: document.title,
          hasContent: root && root.innerHTML.length > 0,
          contentLength: root ? root.innerHTML.length : 0,
          bodyText: document.body.textContent.substring(0, 200),
          currentUrl: window.location.href,
          esdsElements: document.querySelectorAll('[class*="esds"]').length,
          totalElements: document.querySelectorAll('*').length,
          is404: document.body.textContent.includes('404') || document.body.textContent.includes('Page Not Found'),
          hasNavigation: document.querySelector('esds-navigation') !== null,
          hasMainContent: document.querySelector('.main-content') !== null
        };
      });
      
      results[site.name] = {
        success: true,
        loadTime,
        errors: errors.slice(0, 5), // Limit to first 5 errors
        warnings: warnings.slice(0, 3),
        networkErrors: networkErrors.slice(0, 3),
        ...analysis
      };
      
      console.log(`✅ ${site.name} loaded successfully`);
      console.log(`   Load time: ${loadTime}ms`);
      console.log(`   Content length: ${analysis.contentLength}`);
      console.log(`   Is 404 page: ${analysis.is404}`);
      
    } catch (error) {
      console.log(`❌ ${site.name} failed: ${error.message}`);
      results[site.name] = {
        success: false,
        error: error.message,
        errors,
        warnings,
        networkErrors
      };
    }
    
    await page.close();
  }
  
  await browser.close();
  
  // Compare results
  console.log('\n📊 COMPARISON SUMMARY:');
  console.log('=====================================');
  
  for (const [name, result] of Object.entries(results)) {
    console.log(`\n${name}:`);
    if (result.success) {
      console.log(`  ✅ Status: Working`);
      console.log(`  📊 Load time: ${result.loadTime}ms`);
      console.log(`  📝 Title: "${result.title}"`);
      console.log(`  📄 Content: ${result.contentLength} chars`);
      console.log(`  🔍 Is 404: ${result.is404 ? 'YES' : 'NO'}`);
      console.log(`  🧩 ESDS elements: ${result.esdsElements}`);
      console.log(`  📱 Has navigation: ${result.hasNavigation ? 'YES' : 'NO'}`);
      console.log(`  🎯 Current URL: ${result.currentUrl}`);
      
      if (result.errors.length > 0) {
        console.log(`  ❌ JS Errors: ${result.errors.length}`);
        result.errors.forEach(err => console.log(`     - ${err}`));
      }
      
      if (result.networkErrors.length > 0) {
        console.log(`  🔴 Network Errors: ${result.networkErrors.length}`);
        result.networkErrors.forEach(err => console.log(`     - ${err}`));
      }
      
    } else {
      console.log(`  ❌ Status: Failed - ${result.error}`);
    }
  }
  
  // Final assessment
  console.log('\n🎯 FINAL ASSESSMENT:');
  console.log('====================================');
  
  const ghPages = results['GitHub Pages'];
  const localDev = results['Local Dev'];
  
  if (ghPages?.success && localDev?.success) {
    if (ghPages.is404 && !localDev.is404) {
      console.log('⚠️  GitHub Pages is showing 404 while local dev shows content');
      console.log('   This suggests routing issues with the deployed version');
    } else if (!ghPages.is404 && !localDev.is404) {
      console.log('🎉 Both sites are working correctly!');
    } else {
      console.log('❓ Mixed results - need further investigation');
    }
  } else if (ghPages?.success && !localDev?.success) {
    console.log('✅ GitHub Pages is working (local dev server may not be running)');
  } else if (!ghPages?.success && localDev?.success) {
    console.log('❌ GitHub Pages has issues but local dev works');
  } else {
    console.log('❌ Both sites have issues');
  }
  
  console.log('\n✅ Comparison completed');
})();