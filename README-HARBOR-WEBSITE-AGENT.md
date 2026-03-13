# Harbor Website AI Agent - Implementation Guide

**Version:** 1.0.0
**Date:** 2026-03-10
**Status:** ✅ Ready for Use

---

## Overview

The **Harbor Website AI Agent** is an autonomous frontend development agent that works with the existing `harborWebsite` repository. It follows the same structured workflow pattern as the Harbor Backend AI Agent but is specifically adapted for frontend development using Next.js, React, TypeScript, and Redux.

---

## What Has Been Created

### Core Agent Files

1. **`agents/harbor-website-agent.md`**
   - Complete agent definition
   - Agent responsibilities and workflow
   - Knowledge base requirements
   - Phase-by-phase behavior

2. **`workflows/frontend-workflow.md`**
   - Frontend-specific 6-phase workflow
   - Detailed execution steps
   - Code examples and patterns
   - Best practices and troubleshooting

3. **`standards/frontend-coding-rules.md`**
   - Frontend coding rules summary
   - Folder structure rules
   - Component rules
   - API integration rules
   - Quick reference checklists

5. **`context/frontend-repo-context.md`**
   - Repository context for the agent
   - Key documentation files
   - Common file patterns
   - Build and deployment info

---

## File Structure

```
harbor-ai/
├── agents/
│   ├── harbor-backend-agent.md          # Backend agent (existing)
│   └── harbor-website-agent.md          # Frontend agent (NEW)
├── workflows/
│   ├── ai-workflow.md                   # Master workflow (existing)
│   ├── planning.md                      # Planning phase (existing)
│   ├── execution.md                     # Execution phase (existing)
│   ├── testing.md                       # Testing phase (existing)
│   ├── pr.md                            # PR creation (existing)
│   └── frontend-workflow.md             # Frontend workflow (NEW)
├── standards/
│   ├── coding-rules.md                  # Backend rules (existing)
│   └── frontend-coding-rules.md         # Frontend rules (NEW)
├── context/
│   ├── repo-context.md                  # Backend context (existing)
│   └── frontend-repo-context.md         # Frontend context (NEW)
└── memory/
    ├── harbor-agent-memory.md           # Backend memory (existing)
    └── harbor-website-agent-memory.md   # Frontend memory (TO BE CREATED)
```

---

## Target Repository

**Location:** `/Users/mohitshah/Documents/HarborService/harborWebsite`

**Key Files in harborWebsite:**
- `ARCHITECTURE.md` - Full architecture documentation
- `RULES.md` - Development rules and conventions
- `package.json` - Dependencies and scripts

---

## How the Harbor Website Agent Works

### 6-Phase Workflow

```
Phase 1: Fetch & Analyze
    ├─ Read harborWebsite/ARCHITECTURE.md
    ├─ Read harborWebsite/RULES.md
    ├─ Read harborWebsite/package.json
    ├─ Analyze project structure
    └─ Understand task requirements
              ↓
Phase 2: Planning
    ├─ Generate implementation plan
    ├─ Identify files to create/modify
    ├─ Plan component structure
    ├─ Plan API integration
    ├─ Plan state management
    └─ Verify compliance with rules
              ↓
Phase 3: Execution
    ├─ Create/modify components
    ├─ Create/modify pages
    ├─ Create/modify hooks
    ├─ Implement API calls
    ├─ Apply styles
    └─ Handle state
              ↓
Phase 4: Testing
    ├─ Navigate to harborWebsite
    ├─ Run yarn build
    ├─ Check TypeScript errors
    ├─ Check ESLint errors
    └─ Validate build success
              ↓
Phase 5: Git Operations
    ├─ Create branch from dev
    ├─ Stage changes
    ├─ Commit changes
    └─ Push to remote
              ↓
Phase 6: Pull Request Creation
    ├─ Generate PR title
    ├─ Generate PR description
    ├─ Reference ticket
    └─ Target dev branch
```

---

## Key Features

### ✅ Architecture-Aware

- Reads and follows `harborWebsite/ARCHITECTURE.md`
- Understands Next.js 14 App Router patterns
- Knows the component hierarchy
- Understands Redux store structure

### ✅ Rules-Compliant

- Reads and follows `harborWebsite/RULES.md`
- Maintains folder structure conventions
- Follows component creation rules
- Adheres to API integration patterns

### ✅ Pattern-Consistent

- Uses existing `getApiData` helper for API calls
- Uses Ant Design components for UI
- Uses Redux Toolkit for shared state
- Uses styled-components for custom styles

### ✅ Build-Validated

- Always runs `yarn build` before committing
- Checks for TypeScript errors
- Checks for ESLint errors
- Fixes issues before proceeding

### ✅ Git-Aware

- Creates branches from `dev`
- Uses proper branch naming: `feature/<ticket-id>-<description>`
- Writes descriptive commit messages
- Creates comprehensive Pull Requests

---

## Tech Stack

The agent works with:

| Component | Technology |
|-----------|-----------|
| Framework | Next.js 14.2.16 (App Router) |
| UI | React 18 |
| Language | TypeScript 5 |
| State | Redux Toolkit, React Redux, redux-persist |
| Styling | Ant Design 5, styled-components 6 |
| Auth | NextAuth (Credentials, Google, Facebook) |
| Networking | Axios (via apiHelper.js) |
| Realtime | socket.io-client |
| Notifications | Firebase Cloud Messaging |
| Package Manager | Yarn |

---

## Comparison: Backend vs Frontend Agents

| Aspect | Backend Agent | Frontend Agent |
|--------|---------------|----------------|
| **Target** | Microservices (Node.js/Express) | harborWebsite (Next.js/React) |
| **Base Branch** | `dev` | `dev` |
| **Documentation** | Service architecture docs | ARCHITECTURE.md, RULES.md |
| **Primary Task** | API endpoints, services, repositories | Pages, components, hooks |
| **State Management** | Not applicable | Redux Toolkit |
| **Styling** | Not applicable | Ant Design + styled-components |
| **Validation** | Unit tests, integration tests | Build validation (yarn build) |
| **Git Workflow** | Same pattern | Same pattern |
| **PR Target** | `dev` | `dev` |

---

## Using the Harbor Website Agent

### Prerequisites

1. **harborWebsite repository exists** at:
   `/Users/mohitshah/Documents/HarborService/harborWebsite`

2. **Documentation files present:**
   - `harborWebsite/ARCHITECTURE.md`
   - `harborWebsite/RULES.md`
   - `harborWebsite/package.json`

3. **Git repository initialized** with `dev` branch

### Activation

The agent activates when:
- A work item is fetched from Azure DevOps
- The task is identified as **frontend-related**
- The task has clear requirements

### Task Types

The agent handles:
- ✅ New page/route creation
- ✅ New component development
- ✅ Feature implementation
- ✅ Bug fixes (UI/UX)
- ✅ API integration
- ✅ State management (Redux)
- ✅ Styling updates

---

## Agent Memory

To create persistent memory for the frontend agent, create:

**`memory/harbor-website-agent-memory.md`**

This should contain:
- Common patterns discovered
- Repeated issues and solutions
- Component library catalog
- API endpoint catalog
- Lessons learned

---

## Workflow Integration

The Harbor Website Agent integrates with the existing Harbor AI workflow:

1. **Task Intake** - Fetch from Azure DevOps
2. **Task Classification** - Determine if frontend or backend
3. **Agent Selection** - Route to appropriate agent
4. **Execution** - Agent follows 6-phase workflow
5. **Completion** - Update ticket and create PR

---

## Quality Assurance

### Before Committing

The agent verifies:
- ✅ Build succeeds (`yarn build`)
- ✅ No TypeScript errors
- ✅ No critical ESLint errors
- ✅ Changes follow ARCHITECTURE.md
- ✅ Changes follow RULES.md
- ✅ No secrets committed

### Code Quality

- TypeScript types properly defined
- No unnecessary `any` types
- Error handling implemented
- Loading states handled
- Components are reusable
- Styles follow theme

---

## Troubleshooting

### Build Failures

**TypeScript Errors:**
- Check import paths
- Add type definitions
- Fix type mismatches

**Module Not Found:**
- Verify file paths
- Check imports
- Install dependencies

**ESLint Errors:**
- Fix linting issues
- Ensure code follows rules

### Git Issues

**Merge Conflicts:**
- Pull latest dev
- Resolve conflicts
- Test build
- Commit resolution

**Push Failures:**
- Check remote status
- Verify branch name
- Check credentials

---

## Next Steps

### 1. Create Agent Memory

Create `memory/harbor-website-agent-memory.md` with:
- Common patterns
- Component catalog
- API catalog
- Lessons learned

### 2. Test the Agent

Run a test task to verify:
- Agent can read documentation
- Agent can analyze structure
- Agent can plan implementation
- Agent can execute changes
- Agent can validate build
- Agent can create PR

### 3. Integration

Integrate with existing Harbor AI system:
- Task classification logic
- Agent routing
- Unified workflow
- Reporting

---

## File Locations Reference

### Agent Files

```
harbor-ai/agents/harbor-website-agent.md
harbor-ai/workflows/frontend-workflow.md
harbor-ai/standards/frontend-coding-rules.md
harbor-ai/context/frontend-repo-context.md
```

### Target Repository

```
harborWebsite/ARCHITECTURE.md
harborWebsite/RULES.md
harborWebsite/package.json
harborWebsite/app/
```

---

## Best Practices

### For the Agent

1. **Always read documentation first** - ARCHITECTURE.md and RULES.md
2. **Follow existing patterns** - Don't introduce new architecture
3. **Validate before committing** - Always run yarn build
4. **Use descriptive messages** - Clear commits and PRs
5. **Handle errors gracefully** - Proper error handling and loading states

### For Users

1. **Provide clear requirements** - Detailed acceptance criteria
2. **Specify task type** - Frontend vs backend
3. **Review PRs** - Human review still important
4. **Provide feedback** - Help agent learn and improve

---

## Architecture Compliance

The agent ensures:

✅ **Folder Structure Compliance**
- Components in `app/_components`
- Pages in appropriate route group
- Hooks in `app/_hooks`
- Helpers in `app/_helpers`

✅ **Component Rules Compliance**
- `"use client"` only when needed
- TypeScript interfaces for props
- Ant Design components used
- Proper error handling

✅ **State Management Compliance**
- Redux for shared state
- Local state for component-only
- Typed hooks used
- Persistence decisions made

✅ **API Integration Compliance**
- `getApiData` helper used
- TypeScript interfaces defined
- Error handling implemented
- Loading states shown

---

## Success Metrics

The Harbor Website Agent is successful when:

1. ✅ Tasks completed autonomously
2. ✅ Code follows architectural guidelines
3. ✅ Code follows coding rules
4. ✅ Build succeeds after changes
5. ✅ PRs created with proper descriptions
6. ✅ Tickets updated with completion status
7. ✅ No existing functionality broken

---

## Support and Maintenance

### Documentation Updates

Keep these files updated:
- `frontend-architecture.md` - When architecture changes
- `frontend-coding-rules.md` - When rules change
- `frontend-repo-context.md` - When repo structure changes
- `frontend-workflow.md` - When workflow changes

### Agent Improvements

Potential enhancements:
- Add more component examples
- Add API endpoint catalog
- Add component library reference
- Add troubleshooting guide
- Add performance optimization patterns

---

## Conclusion

The **Harbor Website AI Agent** provides a structured, architecture-aware approach to frontend development for the Harbor platform. By following the 6-phase workflow and adhering to the ARCHITECTURE.md and RULES.md guidelines, the agent ensures consistent, high-quality frontend code that integrates seamlessly with the existing codebase.

The agent maintains consistency with the Harbor Backend AI Agent workflow while being specifically adapted for frontend development with Next.js, React, TypeScript, and Redux.

---

**Version:** 1.0.0
**Last Updated:** 2026-03-10
**Status:** ✅ Ready for Use
**Maintained by:** Harbor Development Team
