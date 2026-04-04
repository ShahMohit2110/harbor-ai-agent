import { useState } from 'react'

function RevenueStrategy() {
  const [activeSection, setActiveSection] = useState('overview')

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />
      case 'strategies':
        return <StrategiesSection />
      case 'roadmap':
        return <RoadmapSection />
      case 'pricing':
        return <PricingSection />
      case 'architecture':
        return <ArchitectureSection />
      default:
        return <OverviewSection />
    }
  }

  return (
    <div className="revenue-strategy-container">
      <div className="revenue-strategy-header">
        <h1 className="revenue-strategy-title">
          <span className="title-icon">💰</span>
          Revenue Growth Strategy
        </h1>
        <p className="revenue-strategy-subtitle">
          Path to $1000/month - Harbor AI Monetization Plan
        </p>
      </div>

      <div className="revenue-strategy-nav">
        <button
          className={`nav-button ${activeSection === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveSection('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`nav-button ${activeSection === 'strategies' ? 'active' : ''}`}
          onClick={() => setActiveSection('strategies')}
        >
          🎯 Strategies
        </button>
        <button
          className={`nav-button ${activeSection === 'roadmap' ? 'active' : ''}`}
          onClick={() => setActiveSection('roadmap')}
        >
          📅 Roadmap
        </button>
        <button
          className={`nav-button ${activeSection === 'pricing' ? 'active' : ''}`}
          onClick={() => setActiveSection('pricing')}
        >
          💵 Pricing
        </button>
        <button
          className={`nav-button ${activeSection === 'architecture' ? 'active' : ''}`}
          onClick={() => setActiveSection('architecture')}
        >
          🏗️ Architecture
        </button>
      </div>

      <div className="revenue-strategy-content">
        {renderContent()}
      </div>
    </div>
  )
}

const OverviewSection = () => (
  <div className="strategy-section">
    <div className="metrics-grid">
      <div className="metric-card primary">
        <div className="metric-icon">🎯</div>
        <div className="metric-content">
          <div className="metric-label">Target Revenue</div>
          <div className="metric-value">$1,000/month</div>
          <div className="metric-subtitle">By Week 8</div>
        </div>
      </div>

      <div className="metric-card success">
        <div className="metric-icon">👥</div>
        <div className="metric-content">
          <div className="metric-label">Current Users</div>
          <div className="metric-value">1,500+</div>
          <div className="metric-subtitle">Active User Base</div>
        </div>
      </div>

      <div className="metric-card info">
        <div className="metric-icon">🚀</div>
        <div className="metric-content">
          <div className="metric-label">Time to Launch</div>
          <div className="metric-value">6-8 Weeks</div>
          <div className="metric-subtitle">Full Implementation</div>
        </div>
      </div>

      <div className="metric-card warning">
        <div className="metric-icon">💡</div>
        <div className="metric-content">
          <div className="metric-label">Revenue Potential</div>
          <div className="metric-value">$750-1,400</div>
          <div className="metric-subtitle">Monthly Range</div>
        </div>
      </div>
    </div>

    <div className="content-card">
      <h2 className="card-title">Quick Path to $1000/Month</h2>
      <table className="strategy-table">
        <thead>
          <tr>
            <th>Strategy</th>
            <th>Monthly Revenue</th>
            <th>Time to Launch</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Premium Job Features</td>
            <td className="revenue-positive">$300-500</td>
            <td>2-3 weeks</td>
            <td><span className="priority-badge high">HIGH</span></td>
          </tr>
          <tr>
            <td>Community Monetization Suite</td>
            <td className="revenue-positive">$200-400</td>
            <td>3-4 weeks</td>
            <td><span className="priority-badge high">HIGH</span></td>
          </tr>
          <tr>
            <td>AI-Powered Upsells</td>
            <td className="revenue-positive">$150-300</td>
            <td>4-6 weeks</td>
            <td><span className="priority-badge medium">MEDIUM</span></td>
          </tr>
          <tr>
            <td>Engagement & Retention</td>
            <td className="revenue-positive">$100-200</td>
            <td>1-2 weeks</td>
            <td><span className="priority-badge high">HIGH</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="content-card">
      <h2 className="card-title">Key Revenue Ideas (Fastest Wins)</h2>
      <div className="ideas-grid">
        <div className="idea-card">
          <div className="idea-header">
            <span className="idea-icon">⭐</span>
            <h3>Featured Job Listings</h3>
          </div>
          <p className="idea-description">
            Jobs appear at top of search, highlighted in feed
          </p>
          <div className="idea-details">
            <span className="idea-price">$29/job</span>
            <span className="idea-impact">$290-435/mo</span>
          </div>
        </div>

        <div className="idea-card">
          <div className="idea-header">
            <span className="idea-icon">🏅</span>
            <h3>Premium Profile Badges</h3>
          </div>
          <p className="idea-description">
            Verified badge, priority in search, featured profile
          </p>
          <div className="idea-details">
            <span className="idea-price">$3/month</span>
            <span className="idea-impact">$90-150/mo</span>
          </div>
        </div>

        <div className="idea-card">
          <div className="idea-header">
            <span className="idea-icon">📈</span>
            <h3>Job Analytics</h3>
          </div>
          <p className="idea-description">
            Track views, applications, and candidate sources
          </p>
          <div className="idea-details">
            <span className="idea-price">$19/month</span>
            <span className="idea-impact">$285-380/mo</span>
          </div>
        </div>

        <div className="idea-card">
          <div className="idea-header">
            <span className="idea-icon">🤖</span>
            <h3>AI Job Optimizer</h3>
          </div>
          <p className="idea-description">
            AI analyzes and improves job descriptions
          </p>
          <div className="idea-details">
            <span className="idea-price">$5/use</span>
            <span className="idea-impact">$150-250/mo</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const StrategiesSection = () => (
  <div className="strategy-section">
    <div className="content-card">
      <h2 className="card-title">Strategy 1: Premium Job Features</h2>
      <div className="strategy-details">
        <div className="strategy-feature">
          <h3>Featured Job Listings</h3>
          <ul>
            <li><strong>Price:</strong> $29/job post (one-time)</li>
            <li><strong>Value:</strong> Jobs appear at top of search, highlighted in feed</li>
            <li><strong>Target:</strong> Employers hiring urgently</li>
            <li><strong>Revenue:</strong> 10-15 featured jobs/month = $290-435</li>
          </ul>
        </div>
        <div className="strategy-feature">
          <h3>Job Application Analytics</h3>
          <ul>
            <li><strong>Price:</strong> $19/month subscription</li>
            <li><strong>Value:</strong> Employers see who viewed jobs, application sources</li>
            <li><strong>Target:</strong> Active employers posting multiple jobs</li>
            <li><strong>Revenue:</strong> 15-20 subscribers = $285-380</li>
          </ul>
        </div>
        <div className="strategy-feature">
          <h3>Candidate Matching Alerts</h3>
          <ul>
            <li><strong>Price:</strong> $9/alert pack (5 alerts)</li>
            <li><strong>Value:</strong> Employers notified when matching candidates join</li>
            <li><strong>Target:</strong> Niche/technical roles</li>
            <li><strong>Revenue:</strong> 30-40 alert packs/month = $270-360</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="content-card">
      <h2 className="card-title">Strategy 2: Community Monetization Suite</h2>
      <div className="strategy-details">
        <div className="strategy-feature">
          <h3>Community Analytics Dashboard</h3>
          <ul>
            <li><strong>Price:</strong> $29/month for community owners</li>
            <li><strong>Value:</strong> Engagement metrics, member growth, popular content</li>
            <li><strong>Target:</strong> Community owners with 50+ members</li>
            <li><strong>Revenue:</strong> 8-12 community owners = $232-348</li>
          </ul>
        </div>
        <div className="strategy-feature">
          <h3>Community Boost/Promotion</h3>
          <ul>
            <li><strong>Price:</strong> $19/week</li>
            <li><strong>Value:</strong> Community appears in "Featured Communities"</li>
            <li><strong>Target:</strong> Growing communities seeking members</li>
            <li><strong>Revenue:</strong> 10-15 boosts/month = $190-285</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="content-card">
      <h2 className="card-title">Strategy 3: AI-Powered Upsells</h2>
      <div className="strategy-details">
        <div className="strategy-feature">
          <h3>AI Job Description Optimizer</h3>
          <ul>
            <li><strong>Price:</strong> $5/job description</li>
            <li><strong>Value:</strong> AI analyzes and improves job descriptions</li>
            <li><strong>Target:</strong> Employers with low application rates</li>
            <li><strong>Revenue:</strong> 30-50 uses/month = $150-250</li>
          </ul>
        </div>
        <div className="strategy-feature">
          <h3>AI Resume Assistant</h3>
          <ul>
            <li><strong>Price:</strong> $10/resume review</li>
            <li><strong>Value:</strong> AI provides detailed resume feedback</li>
            <li><strong>Target:</strong> Job seekers</li>
            <li><strong>Revenue:</strong> 15-25 reviews/month = $150-250</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

const RoadmapSection = () => (
  <div className="strategy-section">
    <div className="content-card">
      <h2 className="card-title">Implementation Roadmap</h2>
      
      <div className="roadmap-phase">
        <div className="phase-header">
          <span className="phase-number">1</span>
          <div className="phase-info">
            <h3>Quick Wins (Weeks 1-2)</h3>
            <span className="phase-target">Target: $100-200/month</span>
          </div>
          <span className="priority-badge high">HIGH</span>
        </div>
        <ul className="phase-tasks">
          <li>Launch Featured Job Listings ($29/job)</li>
          <li>Add Premium Profile Badges ($3/month)</li>
          <li>Implement Community Boost ($19/week)</li>
          <li>Basic Job Analytics (free tier → prepare for premium)</li>
        </ul>
      </div>

      <div className="roadmap-phase">
        <div className="phase-header">
          <span className="phase-number">2</span>
          <div className="phase-info">
            <h3>Core Monetization (Weeks 3-4)</h3>
            <span className="phase-target">Target: $300-500/month</span>
          </div>
          <span className="priority-badge high">HIGH</span>
        </div>
        <ul className="phase-tasks">
          <li>Job Application Analytics ($19/month)</li>
          <li>Community Analytics Dashboard ($29/month)</li>
          <li>AI Job Description Optimizer ($5/job)</li>
          <li>Candidate Matching Alerts ($9/pack)</li>
        </ul>
      </div>

      <div className="roadmap-phase">
        <div className="phase-header">
          <span className="phase-number">3</span>
          <div className="phase-info">
            <h3>Advanced Features (Weeks 5-6)</h3>
            <span className="phase-target">Target: $200-400/month</span>
          </div>
          <span className="priority-badge medium">MEDIUM</span>
        </div>
        <ul className="phase-tasks">
          <li>AI Resume Assistant ($10/resume)</li>
          <li>Premium Community Templates ($49/template)</li>
          <li>Skill Verification ($5/skill)</li>
          <li>Smart Job Recommendations ($15/month)</li>
        </ul>
      </div>

      <div className="roadmap-phase">
        <div className="phase-header">
          <span className="phase-number">4</span>
          <div className="phase-info">
            <h3>Optimization (Weeks 7-8)</h3>
            <span className="phase-target">Target: $150-300/month</span>
          </div>
          <span className="priority-badge medium">MEDIUM</span>
        </div>
        <ul className="phase-tasks">
          <li>Direct Messaging Credits ($2/pack)</li>
          <li>Advanced Employer Analytics</li>
          <li>Community Engagement Tools</li>
          <li>Referral Program (10% commission)</li>
        </ul>
      </div>
    </div>
  </div>
)

const PricingSection = () => (
  <div className="strategy-section">
    <div className="content-card">
      <h2 className="card-title">Price Points</h2>
      <table className="strategy-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Price</th>
            <th>Billing</th>
            <th>Target</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Featured Job</td>
            <td>$29</td>
            <td>One-time</td>
            <td>Employers</td>
          </tr>
          <tr>
            <td>Job Analytics</td>
            <td>$19</td>
            <td>Monthly</td>
            <td>Active employers</td>
          </tr>
          <tr>
            <td>Profile Badge</td>
            <td>$3</td>
            <td>Monthly</td>
            <td>Active users</td>
          </tr>
          <tr>
            <td>Community Boost</td>
            <td>$19</td>
            <td>Weekly</td>
            <td>Community owners</td>
          </tr>
          <tr>
            <td>AI Job Optimizer</td>
            <td>$5</td>
            <td>Per-use</td>
            <td>All employers</td>
          </tr>
          <tr>
            <td>AI Resume Review</td>
            <td>$10</td>
            <td>Per-use</td>
            <td>Job seekers</td>
          </tr>
          <tr>
            <td>Skill Verification</td>
            <td>$5</td>
            <td>Per-skill</td>
            <td>Professionals</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="content-card">
      <h2 className="card-title">Bundle Deals</h2>
      <div className="bundle-grid">
        <div className="bundle-card">
          <h3>Employer Starter Pack</h3>
          <div className="bundle-price">$49/month</div>
          <ul className="bundle-features">
            <li>✓ Featured Job</li>
            <li>✓ Analytics Dashboard</li>
            <li>✓ Candidate Alerts</li>
          </ul>
        </div>

        <div className="bundle-card">
          <h3>Job Seeker Pro</h3>
          <div className="bundle-price">$25/month</div>
          <ul className="bundle-features">
            <li>✓ Premium Badge</li>
            <li>✓ AI Resume Review</li>
            <li>✓ Smart Recommendations</li>
          </ul>
        </div>

        <div className="bundle-card">
          <h3>Community Growth Pack</h3>
          <div className="bundle-price">$79/month</div>
          <ul className="bundle-features">
            <li>✓ Analytics Dashboard</li>
            <li>✓ Community Boost</li>
            <li>✓ Premium Templates</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

const ArchitectureSection = () => (
  <div className="strategy-section">
    <div className="content-card">
      <h2 className="card-title">System Architecture Overview</h2>
      <pre className="architecture-diagram">
{`
┌─────────────────────────────────────────────────────────────┐
│                     Harbor AI Platform                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Frontend   │  │   Mobile     │  │  Ticket      │      │
│  │ (Next.js)    │  │ (React Nat.) │  │  Tracker     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│                            ▼                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              API Gateway (Port: 7000)                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│         ┌──────────────────┼──────────────────┐              │
│         ▼                  ▼                  ▼              │
│  ┌────────────┐    ┌────────────┐    ┌────────────┐        │
│  │   User     │    │    Job     │    │ Community  │        │
│  │   Svc      │    │    Svc     │    │   Svc      │        │
│  │  (3001)    │    │  (3004)    │    │  (UserSvc) │        │
│  └────────────┘    └────────────┘    └────────────┘        │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            ▼                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Revenue Feature Layer (NEW)                 │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  • Premium Features Manager                           │   │
│  │  • Subscription Manager                              │   │
│  │  • Analytics & Reporting                              │   │
│  │  • AI Services Integration                            │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│                            ▼                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Data Layer                                │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  • PostgreSQL (User Data, Transactions)               │   │
│  │  • Redis (Caching, Sessions)                          │   │
│  │  • Stripe (Payments, Subscriptions)                   │   │
│  │  • AI API (OpenAI/Anthropic)                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
`}
      </pre>
    </div>

    <div className="content-card">
      <h2 className="card-title">Integration Points</h2>
      <div className="integration-grid">
        <div className="integration-item">
          <h4>harborJobSvc</h4>
          <ul>
            <li>Add featured flag to Job model</li>
            <li>Track job views and applications</li>
            <li>Implement candidate matching</li>
          </ul>
        </div>

        <div className="integration-item">
          <h4>harborUserSvc</h4>
          <ul>
            <li>Add premium subscription fields</li>
            <li>Track profile badge status</li>
            <li>Implement skill verification</li>
          </ul>
        </div>

        <div className="integration-item">
          <h4>harborWebsite</h4>
          <ul>
            <li>Premium upgrade UI components</li>
            <li>Analytics dashboards</li>
            <li>Subscription management</li>
          </ul>
        </div>

        <div className="integration-item">
          <h4>harborAISvc (NEW)</h4>
          <ul>
            <li>AI service integration layer</li>
            <li>Rate limiting and usage tracking</li>
            <li>Cost management</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default RevenueStrategy
