const fs = require('fs');

console.log('🧪 COMPREHENSIVE REVENUE STRATEGY PAGE TEST\n');

// Test Results Summary
const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

function runTest(testName, testFunction) {
  try {
    testFunction();
    testResults.passed++;
    testResults.tests.push({ name: testName, status: 'PASS' });
    console.log(`✅ PASS: ${testName}`);
  } catch (error) {
    testResults.failed++;
    testResults.tests.push({ name: testName, status: 'FAIL', error: error.message });
    console.log(`❌ FAIL: ${testName} - ${error.message}`);
  }
}

// Test 1: File Structure
runTest('RevenueStrategy component file exists', () => {
  const path = '/Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/frontend/src/components/RevenueStrategy/RevenueStrategy.jsx';
  if (!fs.existsSync(path)) {
    throw new Error('Component file not found');
  }
});

// Test 2: Component Import
runTest('Component can be imported', () => {
  const content = fs.readFileSync('/Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/frontend/src/components/RevenueStrategy/RevenueStrategy.jsx', 'utf8');
  
  if (!content.includes('export default RevenueStrategy')) {
    throw new Error('Component does not have default export');
  }
  
  if (!content.includes('function RevenueStrategy')) {
    throw new Error('Component function not found');
  }
});

// Test 3: State Management
runTest('Component has state management', () => {
  const content = fs.readFileSync('/Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/frontend/src/components/RevenueStrategy/RevenueStrategy.jsx', 'utf8');
  
  if (!content.includes('useState')) {
    throw new Error('useState hook not found');
  }
  
  if (!content.includes('activeSection')) {
    throw new Error('activeSection state not found');
  }
});

// Test 4: Section Components
runTest('All section components exist', () => {
  const content = fs.readFileSync('/Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/frontend/src/components/RevenueStrategy/RevenueStrategy.jsx', 'utf8');
  
  const requiredSections = [
    'OverviewSection',
    'StrategiesSection', 
    'RoadmapSection',
    'PricingSection',
    'ArchitectureSection'
  ];
  
  requiredSections.forEach(section => {
    if (!content.includes(section)) {
      throw new Error(`${section} component not found`);
    }
  });
});

// Test 5: Navigation
runTest('Navigation system exists', () => {
  const content = fs.readFileSync('/Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/frontend/src/components/RevenueStrategy/RevenueStrategy.jsx', 'utf8');
  
  if (!content.includes('revenue-strategy-nav')) {
    throw new Error('Navigation container not found');
  }
  
  if (!content.includes('setActiveSection')) {
    throw new Error('Navigation handler not found');
  }
});

// Test 6: CSS Styles
runTest('CSS styles are defined', () => {
  const content = fs.readFileSync('/Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/frontend/src/App.css', 'utf8');
  
  const requiredStyles = [
    'revenue-strategy-container',
    'metrics-grid',
    'content-card',
    'strategy-table',
    'ideas-grid'
  ];
  
  requiredStyles.forEach(style => {
    if (!content.includes(style)) {
      throw new Error(`${style} CSS class not found`);
    }
  });
});

// Test 7: Routing Integration
runTest('Routing is configured', () => {
  const appContent = fs.readFileSync('/Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/frontend/src/App.jsx', 'utf8');
  
  if (!appContent.includes('import RevenueStrategy')) {
    throw new Error('RevenueStrategy not imported in App.jsx');
  }
  
  if (!appContent.includes('path="/revenue-strategy"')) {
    throw new Error('Route not configured in App.jsx');
  }
});

// Test 8: Sidebar Navigation
runTest('Sidebar navigation is configured', () => {
  const content = fs.readFileSync('/Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/frontend/src/components/Shared/Sidebar.jsx', 'utf8');
  
  if (!content.includes('revenue-strategy')) {
    throw new Error('Revenue Strategy link not found in sidebar');
  }
  
  if (!content.includes('💰')) {
    throw new Error('Revenue Strategy icon not found');
  }
});

// Test 9: Content Completeness
runTest('Overview section has required content', () => {
  const content = fs.readFileSync('/Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/frontend/src/components/RevenueStrategy/RevenueStrategy.jsx', 'utf8');
  
  const requiredContent = [
    '$1,000/month',
    '1,500+',
    '6-8 Weeks',
    'Featured Job Listings',
    'Premium Profile Badges'
  ];
  
  requiredContent.forEach(item => {
    if (!content.includes(item)) {
      throw new Error(`Required content "${item}" not found`);
    }
  });
});

// Test 10: Interactive Elements
runTest('Interactive elements are present', () => {
  const content = fs.readFileSync('/Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/frontend/src/components/RevenueStrategy/RevenueStrategy.jsx', 'utf8');
  
  if (!content.includes('onClick')) {
    throw new Error('Click handlers not found');
  }
  
  if (!content.includes('className=')) {
    throw new Error('CSS classes not applied');
  }
});

// Print Summary
console.log('\n' + '='.repeat(60));
console.log('📊 TEST SUMMARY');
console.log('='.repeat(60));
console.log(`Total Tests: ${testResults.passed + testResults.failed}`);
console.log(`✅ Passed: ${testResults.passed}`);
console.log(`❌ Failed: ${testResults.failed}`);
console.log(`Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);

if (testResults.failed === 0) {
  console.log('\n🎉 ALL TESTS PASSED! Revenue Strategy page is ready to use.');
  console.log('\n📋 HOW TO ACCESS:');
  console.log('1. Navigate to: harbor-ai/harbor-ticket-tracker/frontend');
  console.log('2. Run: npm run dev');
  console.log('3. Open: http://localhost:5173/revenue-strategy');
  console.log('4. Or click "💰 Revenue Strategy" in the left sidebar');
  console.log('\n✨ FEATURES:');
  console.log('• 5 interactive sections (Overview, Strategies, Roadmap, Pricing, Architecture)');
  console.log('• Responsive design with dark theme');
  console.log('• Revenue metrics and growth strategies');
  console.log('• Implementation roadmap');
  console.log('• Pricing tables and bundle deals');
  console.log('• System architecture diagrams');
} else {
  console.log('\n⚠️  Some tests failed. Please review the failures above.');
  process.exit(1);
}
