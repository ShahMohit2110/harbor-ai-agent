# Harbor AI – Autonomous Development Agent

**Harbor AI** is an intelligent autonomous development agent that integrates with Azure DevOps to automatically execute software development tasks. The system fetches active work items, analyzes requirements, implements code following architectural standards, runs tests, creates pull requests, and updates tickets—all without human intervention.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Repository Structure](#repository-structure)
- [Harbor AI Workflow](#harbor-ai-workflow)
- [Branch Strategy](#branch-strategy)
- [Environment Setup](#environment-setup)
- [Security Note](#security-note)
- [Demonstration Dashboard](#demonstration-dashboard)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## 🎯 Project Overview

Harbor AI is designed to automate the end-to-end software development lifecycle for the Harbor platform. When activated, the agent:

1. **Fetches Active Tasks** – Retrieves work items from Azure DevOps where `State = Active`
2. **Analyzes Architecture** – Studies system architecture, service dependencies, and affected components
3. **Plans Implementation** – Creates detailed technical plans with specifications
4. **Generates Code** – Writes production-ready code following Harbor coding standards
5. **Validates & Tests** – Runs automated tests to verify functionality
6. **Creates Branches** – Generates feature branches from the `dev` branch
7. **Commits & Pushes** – Commits changes with descriptive messages and pushes to remote
8. **Generates Pull Requests** – Creates comprehensive PRs targeting the `dev` branch
9. **Closes Tickets** – Updates Azure DevOps ticket status to **Closed** with PR links

### Purpose

Harbor AI exists to:
- **Reduce manual development work** through intelligent automation
- **Enforce consistent architecture** across all code changes
- **Accelerate development velocity** by handling routine tasks autonomously
- **Maintain code quality** through automated testing and validation
- **Streamline workflow** by integrating directly with Azure DevOps and Git

---

## ✨ Key Features

### Autonomous Task Execution
- Fully automated development workflow from task intake to completion
- No manual intervention required for standard development tasks
- Continuous operation through multiple queued tasks

### Azure DevOps Integration
- Direct API integration for work item retrieval and updates
- Automatic filtering for `State = Active` tickets only
- Seamless ticket lifecycle management

### Architecture-Aware Code Generation
- Deep understanding of Harbor microservices architecture
- Service map awareness for dependency management
- Consistent implementation of architectural patterns

### Automated Git Workflow
- Automatic branch creation from `dev` branch
- Semantic commit messages following project conventions
- Clean branch management with standardized naming

### Automated Pull Request Generation
- Comprehensive PR descriptions with implementation details
- Automatic linking to Azure DevOps tickets
- Consistent PR formatting and structure

### Development Standards Enforcement
- Adherence to Harbor coding rules and best practices
- TypeScript type safety and error handling
- Consistent code structure across services

### Reduced Developer Workload
- Eliminates repetitive development tasks
- Frees developers to focus on complex feature work
- Reduces context switching between tasks

---

## 📁 Repository Structure

```
harbor-ai/
├── agents/                      # AI agent behavior definitions
│   └── harbor-backend-agent.md  # Core agent responsibilities and workflow
├── workflows/                   # Execution pipeline definitions
│   ├── ai-workflow.md           # Master workflow document
│   ├── planning.md              # Planning phase instructions
│   ├── execution.md             # Execution phase instructions
│   ├── testing.md               # Testing phase instructions
│   └── pr.md                    # Pull Request creation instructions
├── tools/                       # Tool and integration documentation
│   └── azure-devops-fetch.md    # Azure DevOps integration guide
├── context/                     # Task processing protocols
│   ├── task-intake.md           # Task intake and analysis
│   └── repo-context.md          # Repository context documentation
├── architecture/                # System architecture documentation
│   ├── architecture-overview.md # High-level system design
│   ├── service-map.md           # Service responsibilities and boundaries
│   └── service-dependency-map.md # Service dependency relationships
├── standards/                   # Development standards
│   └── coding-rules.md          # Coding standards and conventions
├── memory/                      # Agent knowledge base
│   └── harbor-agent-memory.md   # Persistent system knowledge
├── recovery/                    # Error handling procedures
│   └── failure-recovery.md      # Failure recovery strategies
├── agent-progress/              # Presentation dashboard
│   ├── index.html               # Dashboard UI
│   ├── styles.css               # Dashboard styling
│   └── script.js                # Dashboard interactivity
└── .env                         # Environment configuration (not in repository)

harborJobSvc/                    # Job Service implementation
├── src/                         # Source code
│   ├── controllers/             # API controllers
│   ├── services/                # Business logic
│   ├── repository/              # Data access layer
│   ├── models/                  # Data models
│   └── middleware/              # Express middleware
├── tests/                       # Test suites
└── package.json                 # Dependencies and scripts
```

### Directory Explanations

- **`agents/`** – Defines AI agent behavior, responsibilities, and operational modes
- **`workflows/`** – Contains the complete execution pipeline and phase transitions
- **`tools/`** – Documentation for external integrations (Azure DevOps, Git, etc.)
- **`context/`** – Task intake protocols and repository context
- **`architecture/`** – System design documentation and service boundaries
- **`standards/`** – Coding rules, conventions, and best practices
- **`memory/`** – Persistent knowledge base for the AI agent
- **`recovery/`** – Error handling and failure recovery procedures
- **`agent-progress/`** – Presentation dashboard for demonstrations

---

## 🔄 Harbor AI Workflow

The Harbor AI agent follows a strict **6-phase autonomous workflow**:

### Phase 1: Task Intake
1. Connect to Azure DevOps using configured credentials
2. Fetch work items where `State = Active`
3. Parse ticket details, requirements, and acceptance criteria
4. Identify affected services using the service map
5. Classify task type (feature, bug fix, enhancement, refactoring)

### Phase 2: Architecture Analysis
1. Study the architecture overview and service map
2. Analyze service dependencies and integration points
3. Identify database schema changes (if applicable)
4. Map API endpoints and data flow
5. Review architectural patterns and conventions

### Phase 3: Implementation Planning
1. Create detailed implementation plan
2. Define database schema changes
3. Design API endpoints and contracts
4. Plan validation logic and error handling
5. Document testing strategy

### Phase 4: Code Implementation
1. Generate TypeScript models and interfaces
2. Implement repository layer with data access logic
3. Create service layer with business logic
4. Build API controllers and routes
5. Add validation middleware and error handling
6. Follow Harbor coding standards and conventions

### Phase 5: Testing & Validation
1. Run unit tests for implemented code
2. Execute integration tests
3. Validate API responses and error handling
4. Verify requirements against acceptance criteria
5. Fix any failing tests

### Phase 6: Git Operations & PR Creation
1. Create feature branch from `dev` branch
2. Stage and commit changes with semantic messages
3. Push branch to remote repository
4. Generate comprehensive Pull Request
5. Link PR to Azure DevOps ticket
6. Update ticket status to **Closed**

### Workflow Visualization

```
Azure DevOps (Active Tickets)
         ↓
   Task Intake & Analysis
         ↓
   Architecture Study
         ↓
   Implementation Planning
         ↓
   Code Generation
         ↓
   Testing & Validation
         ↓
   Branch Creation (from dev)
         ↓
   Commit & Push
         ↓
   PR Creation (target: dev)
         ↓
   Ticket Closed
```

---

## 🌿 Branch Strategy

Harbor AI follows a strict Git workflow to maintain code quality and traceability.

### Branch Naming Convention

All feature branches must follow this format:

```
feature/<ticket-id>-<short-description>
```

**Examples:**
- `feature/83-fetch-users-without-cv`
- `feature/86-user-profile-endpoint`
- `feature/92-payment-integration`

### Branch Rules

1. **Source Branch**: All feature branches must be created from `dev`
2. **Target Branch**: All Pull Requests must target the `dev` branch
3. **Branch Isolation**: Each ticket gets its own feature branch
4. **Deletion**: Merged branches should be deleted after PR completion

### Git Workflow

```
dev (main development branch)
         ↓ create feature branch
feature/83-fetch-users-without-cv
         ↓ development commits
feature/83-fetch-users-without-cv
         ↓ pull request
dev (merge PR)
```

### Commit Message Format

Commits should follow semantic commit message conventions:

```
feat: add user profile endpoint
fix: resolve pagination bug
test: add integration tests for user service
docs: update API documentation
```

---

## 🔧 Environment Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **PostgreSQL** (for local development)
- Azure DevOps account and Personal Access Token (PAT)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd harbor-ai
   ```

2. **Install Dependencies**
   ```bash
   cd harborJobSvc
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the project root:

   ```env
   # Azure DevOps Configuration
   AZURE_DEVOPS_ORG=HarborApp
   AZURE_DEVOPS_PROJECT=Harbor
   AZURE_DEVOPS_PAT=your-personal-access-token

   # Database Configuration
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_NAME=harbor_db
   DATABASE_USER=your_db_user
   DATABASE_PASSWORD=your_db_password

   # Service Configuration
   PORT=3004
   NODE_ENV=development
   ```

4. **Run Development Service**
   ```bash
   cd harborJobSvc
   npm run dev
   ```

5. **Run Tests**
   ```bash
   npm test
   ```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `AZURE_DEVOPS_ORG` | Azure DevOps organization name | Yes |
| `AZURE_DEVOPS_PROJECT` | Azure DevOps project name | Yes |
| `AZURE_DEVOPS_PAT` | Personal Access Token for authentication | Yes |
| `DATABASE_HOST` | Database server host | Yes |
| `DATABASE_PORT` | Database server port | Yes |
| `DATABASE_NAME` | Database name | Yes |
| `DATABASE_USER` | Database user | Yes |
| `DATABASE_PASSWORD` | Database password | Yes |
| `PORT` | Service port number | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |

---

## 🔒 Security Note

**⚠️ Critical Security Requirements:**

1. **Never commit sensitive data** to the repository, including:
   - API keys and secrets
   - Database passwords
   - Azure DevOps Personal Access Tokens
   - Third-party service credentials

2. **Use `.env` file** for all sensitive configuration

3. **Add `.env` to `.gitignore`** to prevent accidental commits

4. **Rotate credentials regularly** and update `.env` accordingly

5. **Use environment-specific configurations** for development and production

6. **Never log sensitive information** in console output or error messages

7. **Secure PAT permissions** – Use minimal required permissions for Azure DevOps integration

---

## 📊 Demonstration Dashboard

The `agent-progress/` folder contains a **presentation dashboard** that visually demonstrates how the Harbor AI agent workflow operates.

### Dashboard Features

- **Architecture Overview** – Visual representation of the system flow
- **Workflow Pipeline** – Step-by-step visualization of the autonomous workflow
- **Live Status Simulation** – Interactive console showing agent execution
- **Automation Benefits** – Highlights of system capabilities

### Usage

Open the dashboard in a web browser:

```bash
open agent-progress/index.html
```

Or navigate to:
```
file:///path/to/harbor-ai/agent-progress/index.html
```

**Note:** This dashboard is for **presentation and demonstration purposes only**. It does not execute the actual agent, modify files, or interact with Azure DevOps.

---

## 🚀 Future Improvements

Planned enhancements for the Harbor AI system:

### AI Planning Capabilities
- Advanced natural language understanding for complex requirements
- Multi-step task decomposition and planning
- Learning from previous implementations

### Automated Testing
- Expanded test coverage with automated test generation
- Performance testing integration
- Security vulnerability scanning

### CI/CD Pipeline Integration
- Automatic deployment to staging environments
- Production deployment automation
- Rollback capabilities

### Monitoring & Observability
- Real-time agent execution monitoring
- Performance metrics and analytics
- Error tracking and alerting
- Dashboard for agent status and history

### Enhanced Architecture Understanding
- Dynamic architecture discovery
- Automatic dependency mapping
- Architecture compliance validation

### Collaboration Features
- Integration with code review processes
- Automated documentation generation
- Knowledge base integration

---

## 📄 License

**[License Information]**

Copyright © 2025 Harbor Service. All rights reserved.

---

## 📞 Support

For questions, issues, or contributions related to Harbor AI:

- Review the documentation in the `workflows/` and `architecture/` directories
- Check existing implementation patterns in service directories
- Refer to the `agents/harbor-backend-agent.md` for agent behavior details

---

**Harbor AI** – Autonomous Development Agent for the Harbor Platform
