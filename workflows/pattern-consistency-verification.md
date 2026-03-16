# Pattern Consistency Verification Workflow

**Version:** 1.0.0
**Last Updated:** 2026-03-13
**Purpose:** Ensure repository patterns are detected and followed consistently before finalizing changes

---

## 🚨 CRITICAL: THIS STEP IS MANDATORY

**This workflow MUST be executed BEFORE finalizing ANY code changes.**

**NO EXCEPTIONS.**

---

## Problem Statement

The agent sometimes makes changes without fully understanding the repository's existing patterns, leading to incomplete implementations.

**Example of the Problem:**
- Agent adds a translation key to `en.json` but forgets `fr.json` and `es.json`
- Repository has multiple language files, but agent only updates one
- This breaks the translation system's consistency

**Root Cause:**
Agent applies changes without verifying that the implementation is **consistent with the repository's existing patterns**.

---

## Required Behavior Change

**MANDATORY RULE:** Before finalizing any change, the agent must:

1. **Detect the repository's existing patterns** for the type of change being made
2. **Verify that all instances of the pattern** are updated consistently
3. **Adapt to the repository's structure** rather than making assumptions
4. **Maintain consistency** across the entire codebase

---

## Pattern Categories to Verify

The agent must check for these common pattern categories (and others as needed):

### 1. Multi-Language Translation Systems
**Pattern Indicators:**
- Multiple language files: `en.json`, `fr.json`, `es.json`, `de.json`, etc.
- Translation directories: `locales/`, `i18n/`, `translations/`, `lang/`
- Translation keys referenced in components

**Verification Steps:**
- ✅ When adding a translation key, add it to ALL language files
- ✅ Follow existing key structure and naming conventions
- ✅ Verify all language files have the same keys (no missing keys)
- ✅ Do not assume the repository only uses one language

**Example:**
```json
// If repository has:
// - locales/en.json
// - locales/fr.json
// - locales/es.json

// When adding "welcome.message", add to ALL THREE files:
// locales/en.json: { "welcome.message": "Welcome" }
// locales/fr.json: { "welcome.message": "Bienvenue" }
// locales/es.json: { "welcome.message": "Bienvenido" }
```

### 2. Configuration Structures
**Pattern Indicators:**
- Multiple environment configs: `.env.development`, `.env.production`, `.env.test`
- Config files: `config/` directory, multiple config variants
- Feature flags or settings files

**Verification Steps:**
- ✅ When adding config, add to ALL config files/environments
- ✅ Follow existing config structure and naming
- ✅ Ensure config is available across all environments

### 3. Environment Variable Usage
**Pattern Indicators:**
- `.env` files
- `process.env` usage throughout codebase
- Environment-specific configurations

**Verification Steps:**
- ✅ When adding environment variable, add to ALL relevant `.env` files
- ✅ Document in `.env.example` or similar
- ✅ Verify variable is used consistently across codebase

### 4. Shared Utilities
**Pattern Indicators:**
- `utils/`, `helpers/`, `lib/` directories
- Common functions used across multiple files
- Utility imports in components

**Verification Steps:**
- ✅ Check if existing utility can be used instead of creating new code
- ✅ Follow existing utility function patterns
- ✅ Use shared utilities when available

### 5. API Conventions
**Pattern Indicators:**
- Consistent API response structures
- Standard error handling patterns
- Authentication middleware patterns

**Verification Steps:**
- ✅ Follow existing API response format
- ✅ Use existing error handling patterns
- ✅ Apply authentication/authorization consistently

### 6. Folder Organization
**Pattern Indicators:**
- Consistent folder structures across features
- Feature-based vs. type-based organization
- Naming conventions for folders

**Verification Steps:**
- ✅ Place new files in locations consistent with existing patterns
- ✅ Follow existing folder naming conventions
- ✅ Maintain organization consistency

### 7. Reusable Components
**Pattern Indicators:**
- `components/` directories
- Shared UI components
- Component libraries (Ant Design, Material UI, etc.)

**Verification Steps:**
- ✅ Check if existing component can be used
- ✅ Follow component composition patterns
- ✅ Use shared component library when appropriate

### 8. Naming Conventions
**Pattern Indicators:**
- File naming: `kebab-case`, `camelCase`, `PascalCase`
- Variable naming patterns
- API endpoint naming patterns

**Verification Steps:**
- ✅ Follow existing naming conventions
- ✅ Match patterns used in similar files/components
- ✅ Maintain consistency with codebase style

---

## Pattern Detection Workflow

### Step 1: Identify the Change Type

Before making changes, ask:

**What type of change am I making?**
- Translation/localization change?
- Configuration change?
- Environment variable change?
- API endpoint change?
- UI component change?
- Data model change?

### Step 2: Search for Similar Patterns

**Search the repository for existing implementations:**

```bash
# Find all language files
find . -name "*.json" -path "*/locales/*" -o -name "*.json" -path "*/i18n/*" -o -name "*.json" -path "*/lang/*"

# Find all config files
find . -name "config.*" -o -name "*.config.*" -o -name ".env.*"

# Find similar components
find . -name "*component*" -o -name "*Component*"

# Find similar API endpoints
grep -r "router\." ./src --include="*.ts" | grep similar-pattern
```

**Using Grep tool:**
- Search for similar file patterns
- Search for similar code patterns
- Search for similar naming conventions

### Step 3: Analyze the Pattern Structure

**For the detected pattern, analyze:**
- How many files use this pattern?
- What is the structure/organization?
- What are the naming conventions?
- Are there variations or sub-patterns?

**Example Analysis:**
```markdown
## Pattern Analysis: Translation System

**Pattern Type:** Multi-language translation files
**Languages Detected:** English, French, Spanish, German
**File Locations:**
- locales/en.json
- locales/fr.json
- locales/es.json
- locales/de.json

**Structure:** Nested object keys
**Naming Convention:** lowercase with dots (e.g., "welcome.message")
**Key Count:** 150+ keys per file
**Consistency Check:** All files have identical key structure
```

### Step 4: Apply Changes Consistently

**Update ALL instances of the pattern:**

**Checklist:**
- [ ] Identified all files using this pattern
- [ ] Applied change to ALL relevant files
- [ ] Verified consistency across all files
- [ ] Followed existing naming/structure conventions
- [ ] No files were missed or skipped

---

## Verification Questions

**Before finalizing ANY change, the agent MUST ask itself:**

### ✅ Pattern Detection
- [ ] Did I detect ALL instances of this pattern in the repository?
- [ ] Did I search for similar implementations?
- [ ] Did I understand the repository's structure for this pattern?

### ✅ Consistency Verification
- [ ] Did I update ALL relevant files?
- [ ] Are my changes consistent with existing patterns?
- [ ] Did I follow naming conventions?
- [ ] Did I maintain structure consistency?

### ✅ Completeness Check
- [ ] Could this change require updates in other related files?
- [ ] Does the repository remain consistent after my changes?
- [ ] Are all language files updated? (if translation pattern)
- [ ] Are all config files updated? (if config pattern)

---

## Common Examples

### Example 1: Adding a Translation Key

**❌ WRONG (Inconsistent):**
```json
// Only updates en.json
{
  "newKey": "New value"
}
```
**Problem:** fr.json, es.json, de.json don't have the key

**✅ CORRECT (Consistent):**
```json
// Updates ALL language files
// en.json: { "newKey": "New value" }
// fr.json: { "newKey": "Nouvelle valeur" }
// es.json: { "newKey": "Nuevo valor" }
// de.json: { "newKey": "Neuer Wert" }
```

### Example 2: Adding Environment Variable

**❌ WRONG (Inconsistent):**
```bash
# Only adds to .env
NEW_FEATURE=true
```
**Problem:** .env.example, .env.development don't have it

**✅ CORRECT (Consistent):**
```bash
# Adds to ALL relevant files
# .env: NEW_FEATURE=true
# .env.example: NEW_FEATURE=true
# .env.development: NEW_FEATURE=true
# .env.production: NEW_FEATURE=true
```

### Example 3: Creating a New Component

**❌ WRONG (Ignores existing patterns):**
- Creates component in random location
- Doesn't use existing component library
- Uses different naming convention

**✅ CORRECT (Follows patterns):**
- Places component in existing components directory
- Uses existing component library components
- Follows existing naming convention
- Checks if similar component already exists

---

## Integration with Execution Workflow

### When to Run Pattern Consistency Verification

**This workflow runs DURING the Execution phase:**

```
Planning → Repository Impact Analysis → Execution (with Pattern Verification) → Validation → Testing → PR
```

### Execution Phase Integration

**In the execution workflow, after making code changes:**

1. **Make initial code changes** (add translation key, add config, etc.)
2. **RUN PATTERN CONSISTENCY VERIFICATION** ← THIS STEP
3. **Verify all instances updated**
4. **Continue to validation phase**

### Mandatory Verification Step

**Before marking execution complete, the agent MUST:**

1. **Detect patterns** for the type of change made
2. **Search for all instances** of the pattern
3. **Verify consistency** across all instances
4. **Fix any inconsistencies** found
5. **Only then proceed** to validation phase

---

## Agent Behavior Rules

### ✅ REQUIRED BEHAVIOR

1. **Always detect patterns before making changes**
   - Search for similar implementations
   - Understand repository structure
   - Identify all relevant files

2. **Always update all instances of a pattern**
   - If multiple language files exist, update all
   - If multiple config files exist, update all
   - If multiple environments exist, update all

3. **Always follow existing conventions**
   - Use existing naming conventions
   - Follow existing structure
   - Match existing patterns

4. **Always verify consistency before finalizing**
   - Check all relevant files updated
   - Verify no files missed
   - Confirm repository is consistent

### ❌ PROHIBITED BEHAVIOR

1. **NEVER assume single-file implementation**
   - Don't assume only one language file exists
   - Don't assume only one config file exists
   - Don't assume pattern only appears once

2. **NEVER skip pattern detection**
   - Don't make changes without searching for patterns
   - Don't assume based on other repositories
   - Don't guess about repository structure

3. **NEVER apply changes inconsistently**
   - Don't update some files but not others
   - Don't use different naming conventions
   - Don't break existing patterns

4. **NEVER proceed without verification**
   - Don't finalize changes without consistency check
   - Don't assume changes are complete
   - Don't skip verification questions

---

## Technical Implementation

### Using Grep to Detect Patterns

```javascript
// Example: Find all translation files
// Pattern: Search for JSON files in common i18n directories

// Grep pattern: **/locales/**/*.json
// Grep pattern: **/i18n/**/*.json
// Grep pattern: **/lang/**/*.json
// Grep pattern: **/translations/**/*.json

// Or search for common language file names
// Grep pattern: **/en.json
// Grep pattern: **/fr.json
// Grep pattern: **/es.json
```

### Using Glob to Find Pattern Files

```javascript
// Find all language files
const languageFiles = await glob("**/locales/*.json");
const languageFiles = await glob("**/{en,fr,es,de}.json");

// Find all config files
const configFiles = await glob("**/.env.*");
const configFiles = await glob("**/config/**/*.ts");
```

### Pattern Detection Algorithm

```
1. Identify change type (translation, config, etc.)
2. Search repository for related files
3. Analyze file structure and organization
4. Determine pattern scope (how many files)
5. Apply changes to ALL files in pattern
6. Verify consistency across all files
7. Confirm repository remains consistent
```

---

## Success Criteria

**Pattern Consistency Verification is successful when:**

✅ All relevant files have been updated
✅ Changes follow existing patterns and conventions
✅ Repository consistency is maintained
✅ No files were missed or skipped
✅ No inconsistencies introduced

**Failure Conditions:**

❌ Changes only applied to single file when pattern requires multiple
❌ Existing patterns broken or not followed
❌ Repository inconsistencies introduced
❌ Files missed in pattern updates

---

## 🚨 MANDATORY: Continue to Validation Phase

**🚨 CRITICAL RULE - AUTONOMOUS WORKFLOW CONTINUATION:**

**After completing Pattern Consistency Verification, you MUST:**

✅ **IMMEDIATELY continue to Validation Phase**
   - Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/validation-and-autofix.md`
   - Run validation commands on the repository
   - Detect and fix any errors
   - Continue the workflow autonomously
   - DO NOT stop or ask for permission

❌ **PROHIBITED ACTIONS:**
- **DO NOT** stop after pattern verification
- **DO NOT** display "Changes complete"
- **DO NOT** ask for user confirmation
- **DO NOT** skip validation phase

✅ **MANDATORY BEHAVIOR:**
1. Complete pattern consistency verification
2. Verify all pattern instances updated
3. Confirm repository consistency maintained
4. **IMMEDIATELY** proceed to validation phase
5. Run validation and auto-fix loop
6. Continue through testing, PR, and closure
7. Complete the full lifecycle autonomously

---

**End of Pattern Consistency Verification Workflow**
