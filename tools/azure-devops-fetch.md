# Azure DevOps Integration - Task Fetching

**Tool Version:** 1.0.0
**Last Updated:** 2025-03-06
**Purpose:** Define how Harbor AI agent retrieves active development tasks from Azure DevOps Boards

---

## Table of Contents

1. [Integration Purpose](#integration-purpose)
2. [Environment Configuration](#environment-configuration)
3. [Task Retrieval Process](#task-retrieval-process)
4. [Work Item Types](#work-item-types)
5. [Expected Output Format](#expected-output-format)
6. [Interaction Behavior](#interaction-behavior)
7. [Task Selection Criteria](#task-selection-criteria)
8. [Error Handling](#error-handling)

---

## Integration Purpose

### Why Azure DevOps Integration Exists

The Harbor AI agent needs to fetch active development tasks from Azure DevOps Boards to:

1. **Automated Task Intake:** Retrieve assigned work items without manual intervention
2. **Task Prioritization:** Understand which tasks should be tackled first based on priority and assignment
3. **Context Understanding:** Access complete task details including requirements, acceptance criteria, and technical specifications
4. **Development Automation:** Enable autonomous execution of development workflows
5. **Progress Tracking:** Monitor task status and updates throughout the development lifecycle

### Role in Harbor AI Workflow

The Azure DevOps integration serves as the **entry point** for the Harbor AI 6-phase workflow:

- **Phase 1 (Task Intake):** Fetch and analyze tasks from Azure DevOps
- **Phase 2-6:** Use fetched task details for planning, execution, testing, and PR creation

### Business Value

- **Reduced Manual Work:** Eliminates need to manually copy task details
- **Improved Accuracy:** Direct access to authoritative task information
- **Better Traceability:** Links AI work directly to Azure DevOps work items
- **Team Visibility:** Engineering team can see which tasks the AI is working on

---

## Environment Configuration

### Required Environment Variables

The Harbor AI agent requires the following environment variables to authenticate and interact with Azure DevOps:

#### AZURE_DEVOPS_PAT

**Description:** Personal Access Token for Azure DevOps authentication

**Purpose:** Authenticate API requests to Azure DevOps

**Permissions Required:**
- Read access to Work Items
- Read access to Boards
- Basic project access

**Security Considerations:**
- Should be stored securely (environment variables, secret management)
- Should have minimal required permissions (read-only)
- Should be rotated periodically
- Should never be committed to code repositories

**Format:** Alphanumeric string with specific token structure

---

#### AZURE_DEVOPS_ORG

**Description:** Azure DevOps organization name

**Purpose:** Identify which Azure DevOps organization to connect to

**Format:** Organization name as it appears in Azure DevOps URL
- Example: `https://dev.azure.com/{organization-name}`
- Environment variable should contain only: `{organization-name}`

**Notes:**
- Case-sensitive
- Must match the organization URL exactly
- Typically the company or team name

---

#### AZURE_DEVOPS_PROJECT

**Description:** Azure DevOps project name within the organization

**Purpose:** Identify which project contains the work items

**Format:** Project name as it appears in Azure DevOps URL
- Example: `https://dev.azure.com/{organization-name}/{project-name}`
- Environment variable should contain only: `{project-name}`

**Notes:**
- Case-sensitive
- Must match the project name exactly
- Organization can have multiple projects

---

### Environment Variable Validation

Before attempting to fetch tasks, the agent should verify:

1. **All Required Variables Present:** Confirm all three variables are set
2. **Valid Format:** Check that organization and project names are valid
3. **Authentication Test:** Perform a test API call to verify PAT is valid
4. **Access Verification:** Confirm the PAT has required permissions

### Missing Configuration Handling

If environment variables are missing or invalid:

1. **Log Error:** Clearly indicate which variable is missing or invalid
2. **Halt Execution:** Do not proceed with task fetching
3. **Provide Guidance:** Include instructions on how to obtain and configure missing variables
4. **Exit Gracefully:** Return appropriate error status without crashing

---

## Task Retrieval Process

### High-Level Workflow

The Harbor AI agent should follow this process when fetching tasks:

#### Step 1: Authenticate with Azure DevOps

- Use the Personal Access Token (PAT) to authenticate
- Establish API connection to Azure DevOps REST API
- Verify authentication was successful
- Handle authentication failures appropriately

#### Step 2: Query for Active Work Items

- Construct query to retrieve active work items
- Filter by assigned developer (if specified)
- Filter by work item type (User Stories, Tasks)
- Filter by State = Active (only fetch Active tickets)
- Sort by priority and assignment

#### Step 3: Retrieve Work Item Details

- For each work item ID returned, fetch complete details
- Include all fields: title, description, acceptance criteria, etc.
- Retrieve related information (attachments, links, comments)
- Handle pagination if many work items are returned

#### Step 4: Parse and Structure Data

- Parse Azure DevOps API response
- Extract relevant fields into structured format
- Normalize data for consistent handling
- Handle missing or optional fields gracefully

#### Step 5: Return Fetched Tasks

- Return structured list of tasks
- Include all relevant task details
- Maintain metadata (IDs, URLs, etc.)
- Provide clear indication of fetch success/failure

---

### Query Strategy

#### Recommended Query Approach

**WIQL (Work Item Query Language) Queries:**

Use WIQL to construct flexible queries that can:
- Filter by specific fields
- Combine multiple conditions
- Sort results
- Handle complex logic

**Example Query Logic:**
- Find work items where:
  - Assigned To = [Current Developer]
  - Work Item Type = [User Story OR Task]
  - State = Active
  - Area Path = [Harbor Project Areas]
- Order By: [Priority Descending], [Changed Date Ascending]

#### API Endpoint Usage

**Primary Endpoint:** Azure DevOps REST API for Work Items

**Endpoints to Use:**
- Query work items by WIQL
- Get work item details by ID
- Get work item revisions (if needed for history)
- Get work item attachments (if needed)

**Batching Strategy:**
- Fetch work item IDs in batches
- Retrieve details for each batch
- Handle rate limiting appropriately
- Use parallel requests where beneficial

---

### Task Retrieval Frequency

**On-Demand Fetching:**
- Agent should fetch tasks when starting new work session
- Fetch tasks when explicitly requested
- Refresh task list when context is unclear

**Cached Data:**
- Cache fetched tasks for current session
- Invalidate cache when tasks are modified
- Re-fetch if significant time has passed

---

## Work Item Types

### User Stories

**Description:** High-level feature requirements from user perspective

**When to Fetch:**
- Primary work items for feature development
- Typically represent complete features or user-facing capabilities
- Often contain multiple child Tasks

**Characteristics:**
- Rich descriptions with business context
- Include acceptance criteria
- Linked to product backlog
- May have story points or effort estimates
- Often have parent Features or Epics

**Use Cases:**
- New feature implementation
- Feature enhancements
- User experience improvements
- Product requirements

---

### Tasks

**Description:** Specific implementation work items

**When to Fetch:**
- Detailed technical work items
- Breakdown of User Stories into actionable items
- Bug fixes, refactoring, technical tasks

**Characteristics:**
- More technical and specific
- Shorter duration than User Stories
- Often child items of User Stories
- May have effort estimates (hours)
- Technical implementation details

**Use Cases:**
- Specific implementation steps
- Bug fixes
- Code refactoring
- Technical debt reduction
- Configuration changes
- Documentation updates

---

### Work Item Type Selection

**Primary Focus:** User Stories and Tasks

**What to Include:**
- User Stories that represent implementable features
- Tasks that are standalone or part of active features
- Items assigned to the AI agent or designated developer

**What to Exclude:**
- Features (too high-level)
- Epics (too high-level)
- Bugs (unless they represent development work)
- Test Cases (QA work, not development)
- Issues (unless converted to Tasks)

---

## Expected Output Format

### Task Object Structure

When the Harbor AI agent fetches tasks from Azure DevOps, each task should be structured with the following information:

#### Core Identity Fields

**Ticket ID:**
- **Field Name:** `id`
- **Type:** Integer or String
- **Description:** Unique work item identifier
- **Source:** Azure DevOps Work Item ID
- **Format:** Numeric ID (e.g., 12345)
- **Purpose:** Used to reference task in Azure DevOps, create PRs, update status

**Ticket URL:**
- **Field Name:** `url`
- **Type:** String (URL)
- **Description:** Direct link to work item in Azure DevOps web interface
- **Format:** `https://dev.azure.com/{org}/{project}/_workitems/{id}`
- **Purpose:** Quick access to task in browser, PR linking

---

#### Task Metadata

**Title:**
- **Field Name:** `title`
- **Type:** String
- **Description:** Concise summary of the work item
- **Source:** `System.Title` field
- **Length:** Typically 1-200 characters
- **Purpose:** Quick understanding of what the task is about

**Work Item Type:**
- **Field Name:** `type`
- **Type:** String (enum)
- **Description:** Type of work item
**Possible Values:**
- `"User Story"`
- `"Task"`
- `"Bug"`
- `"Feature"`
- Purpose: Determines approach, complexity, documentation requirements

**Priority:**
- **Field Name:** `priority`
- **Type:** Integer or String
- **Description:** Relative importance of the work item
**Typical Values:**
- `1` - Critical / Immediate
- `2` - High
- `3` - Medium
- `4` - Low
- Purpose: Task selection and execution order

**Assigned Developer:**
- **Field Name:** `assignedTo`
- **Type:** String or Object
- **Description:** Developer assigned to the work item
**Format Options:**
- String: Developer name or email
- Object: `{ name: string, email: string }`
- Purpose: Identify which tasks the AI should work on

**Status:**
- **Field Name:** `status`
- **Type:** String
- **Description:** Current state of the work item
**Common Values:**
- `"New"` - Recently created, not started
- `"Active"` - Currently being worked on
- `"In Progress"` - Work has begun
- `"Resolved"` - Implementation complete, awaiting verification
- `"Closed"` - Completed and verified
- Purpose: Determine if task should be worked on

**Area Path:**
- **Field Name:** `areaPath`
- **Type:** String
- **Description:** Hierarchical path indicating team/area
**Format:** `{Project}\{Team}\{Area}` (e.g., "Harbor\Backend\API")
- Purpose: Identify which service or area the task affects

**Iteration Path:**
- **Field Name:** `iterationPath`
- **Type:** String
- **Description:** Sprint or iteration the task belongs to
**Format:** `{Project}\{Sprint Name}` (e.g., "Harbor\Sprint 42")
- Purpose: Understand timeline and sprint context

---

#### Task Content

**Description:**
- **Field Name:** `description`
- **Type:** String (HTML or Markdown)
- **Description:** Detailed explanation of the work item
**Contents May Include:**
- Business context and background
- Technical requirements
- Implementation guidance
- References to documentation
- Code examples or snippets
- Architecture diagrams
- Purpose: Comprehensive understanding of what needs to be done

**Acceptance Criteria:**
- **Field Name:** `acceptanceCriteria`
- **Type:** String or Array
- **Description:** Conditions that must be met for task to be considered complete
**Format Options:**
- String: Formatted text with criteria
- Array: List of individual criteria items
**Purpose:**
- Define completion requirements
- Guide testing approach
- Provide objective completion check

**Repro Steps (for Bugs):**
- **Field Name:** `reproSteps`
- **Type:** String or Array
- **Description:** Steps to reproduce a bug (for Bug work items)
**Purpose:**
- Understand bug behavior
- Create test cases
- Verify fix

---

#### Additional Information

**Tags:**
- **Field Name:** `tags`
- **Type:** Array of Strings
- **Description:** Labels categorizing the work item
**Examples:**
- `["backend", "api", "urgent"]`
- `["frontend", "ui", "enhancement"]`
- Purpose: Quick categorization, filtering

**Related Work Items:**
- **Field Name:** `relatedWorkItems`
- **Type:** Array of Objects
**Format:**
```json
[
  {
    "id": 12344,
    "type": "Task",
    "relation": "child"
  },
  {
    "id": 12340,
    "type": "User Story",
    "relation": "parent"
  }
]
```
- Purpose: Understand task dependencies and context

**Attachments:**
- **Field Name:** `attachments`
- **Type:** Array of Objects
**Format:**
```json
[
  {
    "name": "architecture-diagram.png",
    "url": "https://dev.azure.com/..."
  },
  {
    "name": "requirements.pdf",
    "url": "https://dev.azure.com/..."
  }
]
```
- Purpose: Access additional documentation or assets

**Comments:**
- **Field Name:** `comments`
- **Type:** Array of Objects or String
**Format:**
```json
[
  {
    "author": "Developer Name",
    "text": "Comment text here",
    "timestamp": "2025-03-06T10:30:00Z"
  }
]
```
- Purpose: Understand discussion, decisions, clarifications

---

#### Metadata

**Created Date:**
- **Field Name:** `createdDate`
- **Type:** String (ISO 8601 datetime)
- **Description:** When the work item was created
- Purpose: Understand task age, prioritize older tasks

**Changed Date:**
- **Field Name:** `changedDate`
- **Type:** String (ISO 8601 datetime)
- **Description:** When the work item was last modified
- Purpose: Identify recent activity, staleness

**Created By:**
- **Field Name:** `createdBy`
- **Type:** String or Object
- **Description:** Who created the work item
- Purpose: Understand task origin, ask clarifying questions

**Story Points / Effort:**
- **Field Name:** `effort`
- **Type:** Number or String
- **Description:** Estimated effort or story points
- Purpose: Understand task complexity, plan execution

---

### Complete Output Example

**Single Task Object:**

```json
{
  "id": 12345,
  "url": "https://dev.azure.com/myorg/Harbor/_workitems/12345",
  "title": "Implement job recurring schedule feature",
  "type": "User Story",
  "priority": 2,
  "assignedTo": {
    "name": "Harbor AI Agent",
    "email": "harbor-ai@harbor.com"
  },
  "status": "Active",
  "areaPath": "Harbor\\Backend\\Job Service",
  "iterationPath": "Harbor\\Sprint 42",
  "description": "<div><p>As an employer, I want to schedule recurring jobs so that I don't have to manually create each instance.</p><h3>Requirements:</h3><ul><li>Daily, weekly, monthly recurrence patterns</li><li>Custom schedule support</li><li>End date conditions</li></ul></div>",
  "acceptanceCriteria": [
    "Employer can create recurring job with daily frequency",
    "Employer can set weekly recurrence with specific days",
    "Employer can specify end date or number of occurrences",
    "System generates job instances based on recurrence pattern",
    "Generated jobs appear in worker job feed"
  ],
  "tags": ["backend", "job-service", "recurring", "feature"],
  "relatedWorkItems": [
    {
      "id": 12346,
      "type": "Task",
      "relation": "child"
    },
    {
      "id": 12347,
      "type": "Task",
      "relation": "child"
    }
  ],
  "attachments": [],
  "comments": [
    {
      "author": "Product Owner",
      "text": "Please focus on daily and weekly patterns first",
      "timestamp": "2025-03-05T14:20:00Z"
    }
  ],
  "createdDate": "2025-03-01T09:00:00Z",
  "changedDate": "2025-03-05T14:20:00Z",
  "createdBy": {
    "name": "Product Owner",
    "email": "po@harbor.com"
  },
  "effort": 5
}
```

---

## Interaction Behavior

### When to Fetch Tasks

**Automatic Fetching:**
- When the Harbor AI agent starts a new work session
- When the agent is explicitly commanded to fetch tasks
- When the agent needs to identify what to work on next
- When current task context is unclear or stale

**Manual Request:**
- When developer explicitly requests task refresh
- When switching between different assigned developers
- When investigating specific work items

---

### How to Present Fetched Tasks

**Display Format:**
- Present tasks in a clear, organized manner
- Group by priority or work item type
- Show task count and summary
- Highlight critical or urgent tasks

**Task Listing Example:**
```
Fetched 5 active tasks from Azure DevOps:

[User Story] #12345 - Implement job recurring schedule feature (Priority: 2, Status: Active)
[Task] #12346 - Create recurrence database model (Priority: 2, Status: New)
[Task] #12347 - Implement recurrence calculation logic (Priority: 2, Status: New)
[User Story] #12350 - Add payment link generation (Priority: 3, Status: Active)
[Task] #12351 - Integrate Stripe payment link API (Priority: 3, Status: New)

Next steps: Select a task to begin work, or specify task ID.
```

---

### Task Selection Behavior

**Automatic Selection:**
- Select highest priority active task
- Select task assigned to AI agent or specified developer
- Consider dependencies (complete parent before child tasks)
- Consider task complexity and available time

**Manual Selection:**
- Accept user-specified task ID
- Validate task exists and is accessible
- Confirm task is appropriate for AI to work on
- Handle invalid task IDs gracefully

**Selection Criteria:**
1. **Status:** Active (only Active tickets)
2. **Assignment:** Assigned to AI agent or designated developer
3. **Priority:** Higher priority tasks preferred
4. **Dependencies:** Task dependencies are resolved
5. **Complexity:** Within AI agent's capabilities

---

### Task Context Switching

**When to Switch Tasks:**
- Current task is completed
- Current task is blocked or cannot be completed
- Higher priority task becomes available
- User explicitly requests task switch

**Context Preservation:**
- Save state of current task before switching
- Document progress on current task
- Leave clear markers for resumption
- Update task status if appropriate

**Switching Process:**
1. Document current progress
2. Update Azure DevOps task status (if needed)
3. Fetch details of new task
4. Load new task context
5. Begin work on new task

---

## Task Selection Criteria

### 🚨 SIGMA RULE: Active Tasks Only (CRITICAL - NON-NEGOTIABLE)

**🚨 THIS IS THE MOST CRITICAL RULE - NEVER FETCH CLOSED TASKS 🚨**

**THE RULE:**
**The Harbor AI Agent MUST ONLY fetch and work on tasks where `State = Active`**

**STRICTLY FORBIDDEN:**
- ❌ **NEVER** fetch tasks where `State = Closed`
- ❌ **NEVER** fetch tasks where `State = Resolved`
- ❌ **NEVER** fetch tasks where `State = Removed`
- ❌ **NEVER** fetch tasks where `State = New`
- ❌ **NEVER** fetch tasks where `State = In Progress`

**REQUIRED BEHAVIOR:**
1. **Azure DevOps Query MUST Filter:** `State = 'Active'` ONLY
2. **Double-Check Before Processing:** Verify task state == Active before starting work
3. **Skip Non-Active Tasks:** If a task is not Active, skip it immediately
4. **Log Filtered Tasks:** Document which tasks were skipped and why

**QUERY EXAMPLE:**
```sql
SELECT [System.Id], [System.Title], [System.State]
FROM WorkItems
WHERE [System.TeamProject] = @project
  AND [System.State] = 'Active'  -- 👈 CRITICAL: ONLY ACTIVE
  AND [System.WorkItemType] IN ('User Story', 'Task')
ORDER BY [Microsoft.VSTS.Common.Priority] ASC, [System.ChangedDate] ASC
```

**VALIDATION CHECKLIST (MANDATORY):**
- [ ] Query includes `WHERE [System.State] = 'Active'`
- [ ] No Closed tasks in fetched results
- [ ] No Resolved tasks in fetched results
- [ ] No New tasks in fetched results
- [ ] Only Active tasks are processed

**FAILURE CONSEQUENCES:**
- Fetching Closed tasks → WASTED EFFORT (task already done)
- Fetching Resolved tasks → DUPLICATE WORK (task already implemented)
- Fetching New tasks → WRONG WORKFLOW (task not ready for development)

**🚨 THIS RULE HAS ZERO EXCEPTIONS 🚨**

---

### Prioritization Factors

**Priority Level:**
- Priority 1 (Critical): Always select first
- Priority 2 (High): Select after critical tasks
- Priority 3 (Medium): Select after high-priority tasks
- Priority 4 (Low): Select when no higher-priority tasks available

**Task Status:**
- Only fetch tasks where State = Active
- Do not fetch: New, In Progress, Resolved, Closed, Removed

**Assignment:**
- Primary: Tasks assigned to AI agent
- Secondary: Tasks assigned to specific developer (if specified)
- Avoid: Tasks assigned to others (unless explicitly requested)

**Dependencies:**
- Parent tasks before child tasks
- Unblocker tasks before dependent tasks
- Sequential dependencies respected

**Complexity:**
- Consider effort estimates
- Balance simple and complex tasks
- Ensure task is within AI capabilities
- Break down complex tasks if needed

---

### Filtering Logic

**Include Tasks That:**
- Are assigned to the AI agent or specified developer
- Have State = Active (only Active tickets)
- Are User Stories or Tasks (not Features or Epics)
- Belong to the Harbor project

**Exclude Tasks That:**
- Are assigned to other developers (unless requested)
- Have State != Active (New, In Progress, Resolved, Closed, Removed)
- Are Features or Epics (too high-level)
- Belong to other projects
- Are test cases or purely QA work items

---

### Special Cases

**Blocked Tasks:**
- Identify if task is blocked
- Check block reason and resolution
- Prefer unblocked tasks
- Document blocked status if selected

**Urgent Tasks:**
- Check for urgent tags or markers
- Prioritize urgent tasks regardless of priority
- Alert developer if urgent task detected

**Task Clusters:**
- Identify groups of related tasks
- Consider working on clustered tasks together
- Maintain context across similar tasks

---

## Error Handling

### Authentication Errors

**Symptoms:**
- 401 Unauthorized responses
- 403 Forbidden responses
- Authentication failure messages

**Resolution:**
1. Verify AZURE_DEVOPS_PAT is set correctly
2. Check PAT has not expired
3. Confirm PAT has required permissions
4. Test authentication with simple API call
5. Provide clear error message to developer
6. Do not proceed with task fetching

---

### Network Errors

**Symptoms:**
- Connection timeout
- DNS resolution failures
- Network unreachable

**Resolution:**
1. Check internet connectivity
2. Verify Azure DevOps service availability
3. Retry with exponential backoff
4. Provide clear error context
5. Suggest manual verification

---

### Query Errors

**Symptoms:**
- 400 Bad Request (invalid query)
- Empty result sets
- Malformed WIQL queries

**Resolution:**
1. Validate WIQL query syntax
2. Check field names and values
3. Verify project and area paths
4. Simplify query and rebuild complexity
5. Log detailed error information
6. Provide constructive error messages

---

### Permission Errors

**Symptoms:**
- 403 Forbidden for specific work items
- Access denied to certain projects
- Missing work item fields

**Resolution:**
1. Verify PAT permissions include Work Item read access
2. Confirm user has access to specified project
3. Check area path permissions
4. Request additional permissions if needed
5. Document which tasks could not be accessed

---

### Rate Limiting

**Symptoms:**
- 429 Too Many Requests
- Throttling messages
- Slow response times

**Resolution:**
1. Implement exponential backoff
2. Reduce request frequency
3. Batch requests more efficiently
4. Use pagination to reduce payload size
5. Cache results to minimize repeated requests

---

### Missing or Invalid Data

**Symptoms:**
- Empty required fields
- Invalid data formats
- Missing relationships

**Resolution:**
1. Validate required fields are present
2. Provide default values for optional fields
3. Log data quality issues
4. Alert developer to missing critical information
5. Continue with available data if safe to do so

---

### Error Reporting

**Error Message Format:**
```
ERROR: Failed to fetch tasks from Azure DevOps

Details:
- Error Type: Authentication
- Message: Invalid Personal Access Token
- Code: 401 Unauthorized

Resolution Steps:
1. Verify AZURE_DEVOPS_PAT environment variable is set
2. Check PAT has not expired
3. Confirm PAT has Work Item read permissions
4. Test connection: curl -u :{PAT} https://dev.azure.com/{org}/{project}/_apis/wit/workitems

Status: Task fetching halted. Please resolve authentication issue and retry.
```

**Error Severity Levels:**
- **Critical:** Halt execution, require immediate resolution (authentication, permissions)
- **Warning:** Log issue, continue with degraded functionality (missing optional fields)
- **Info:** Log for awareness, no impact (data quality issues)

---

## Summary

This document defines how the Harbor AI agent interacts with Azure DevOps to fetch active development tasks. The integration enables the AI to:

1. **Authenticate** with Azure DevOps using Personal Access Token
2. **Query** for active User Stories and Tasks assigned to the AI
3. **Retrieve** complete task details including descriptions, acceptance criteria, and metadata
4. **Structure** task information in a consistent format for processing
5. **Select** appropriate tasks based on priority, status, and assignment
6. **Handle Errors** gracefully with clear error messages and resolution guidance

The fetched tasks serve as the foundation for the Harbor AI autonomous development workflow, enabling the agent to understand requirements, plan implementations, execute development work, and create pull requests linked to the original Azure DevOps work items.

**Key Integration Points:**
- Environment variables for authentication and configuration
- Azure DevOps REST API for task retrieval
- Structured output format for consistent task handling
- Error handling and resolution guidance
- Task selection and prioritization logic

**Last Updated:** 2025-03-06
**Next Review:** When Azure DevOps configuration or work item structure changes
