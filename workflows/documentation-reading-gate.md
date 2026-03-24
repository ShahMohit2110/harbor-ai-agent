# 🚨 CRITICAL: Documentation Reading Gate (NON-SKIPPABLE)

**Version:** 1.0.0
**Last Updated:** 2026-03-24
**Purpose:** FORCE agent to READ and UNDERSTAND all documentation before implementation

---

## 🚨 THE PROBLEM THIS SOLVES

**Current Behavior (BROKEN):**
1. Agent generates docs for 10 repos ✅
2. Agent says "loaded into memory" (but doesn't actually read) ❌
3. Agent starts implementation WITHOUT understanding docs ❌
4. Agent makes wrong decisions, breaks things ❌

**Desired Behavior (FIXED):**
1. Agent generates docs for 10 repos ✅
2. Agent READS every single .md file ✅
3. Agent UNDERSTANDS cross-repo relationships ✅
4. Agent ONLY THEN starts implementation ✅

---

## 🚨 CRITICAL RULE

**After generating/validating documentation, the agent MUST:**

> **"READ ALL THE DOCUMENTATION. EVERY SINGLE .md FILE. UNDERSTAND IT. ONLY THEN PROCEED."**

**This is NOT optional. This is NOT a suggestion. This is MANDATORY.**

---

## Execution Flow (MANDATORY)

### Step 1: Generate/Validate Documentation

**If docs missing:**
```bash
# Generate docs for each repo
for repo in $(find . -maxdepth 2 -type d -name ".git" | sed 's|/.git||'); do
    cd "$repo"
    # Generate all required .md files
done
```

### Step 2: READ ALL DOCUMENTATION (MANDATORY - CRITICAL)

**🚨 THIS STEP CANNOT BE SKIPPED 🚨**

**For EVERY repository, READ EVERY .md file:**

```bash
# Navigate to workspace root
cd /Users/mohitshah/Documents/HarborService/

# For EACH repository
for repo in $(find . -maxdepth 2 -type d -name ".git" | sed 's|/.git||'); do
    echo "📚 READING DOCUMENTATION: $repo"
    cd "$repo"

    # READ EVERY .md file in docs/
    for md_file in docs/*.md; do
        echo "  📖 READING: $md_file"
        # Actually READ the file content
        cat "$md_file"
        # Store in context
        echo "  ✅ LOADED INTO CONTEXT: $md_file"
    done

    cd ..
done
```

**🚨 CRITICAL VALIDATION CHECKLIST:**

Before proceeding to implementation, verify:
- [ ] READ `harbor-ai/docs/ARCHITECTURE.md` - System architecture overview
- [ ] READ `harbor-ai/docs/STRUCTURE.md` - System structure
- [ ] READ `harbor-ai/docs/DEPENDENCIES.md` - Dependencies
- [ ] READ `harbor-ai/docs/SERVICE_RULES.md` - Service rules
- [ ] READ `harbor-ai/docs/SHARED_SERVICES.md` - Shared services (CRITICAL!)
- [ ] READ `harbor-ai/docs/CHANGE_IMPACT.md` - Change impact analysis
- [ ] READ `harborUserSvc/docs/ARCHITECTURE.md` - User service architecture
- [ ] READ `harborUserSvc/docs/SHARED_SERVICES.md` - What user service depends on
- [ ] READ `harborUserSvc/docs/CHANGE_IMPACT.md` - Impact of changes to user service
- [ ] READ `harborJobSvc/docs/ARCHITECTURE.md` - Job service architecture
- [ ] READ `harborJobSvc/docs/SHARED_SERVICES.md` - What job service depends on
- [ ] READ `harborJobSvc/docs/CHANGE_IMPACT.md` - Impact of changes to job service
- [ ] READ `harborBlogSvc/docs/ARCHITECTURE.md` - Blog service architecture (if exists)
- [ ] READ `harborBlogSvc/docs/SHARED_SERVICES.md` - What blog service depends on
- [ ] READ `harborBlogSvc/docs/CHANGE_IMPACT.md` - Impact of changes to blog service
- [ ] READ `shared-models/docs/ARCHITECTURE.md` - Shared models architecture (CRITICAL!)
- [ ] READ `shared-models/docs/CHANGE_IMPACT.md` - Impact of changing shared models (CRITICAL!)

**🚨 FOR ALL OTHER REPOS:**
- [ ] Repeat for ALL repositories in workspace
- [ ] NO exceptions
- [ ] NO skipping
- [ ] READ EVERYTHING

### Step 3: Cross-Repository Analysis (MANDATORY)

**After reading all documentation, perform cross-repository analysis:**

```markdown
## Cross-Repository Analysis

### Repository Map
1. **harbor-ai** - Documentation and workflows
2. **harborUserSvc** - User management service
3. **harborJobSvc** - Job management service
4. **harborBlogSvc** - Blog service
5. **shared-models** - Shared data models
6. **harborWebsite** - Frontend (Next.js)
7. **harborShared** - Shared utilities
8. **api-gateway** - API gateway
9. **harborNotificationSvc** - Notification service
10. **socket-service** - WebSocket service

### Shared Services (CRITICAL - READ THESE CAREFULLY)

**From SHARED_SERVICES.md files:**
- **shared-models** - Used by ALL services (HIGH IMPACT)
- **harborShared** - Used by all backend services (MEDIUM IMPACT)

### Dependency Relationships (UNDERSTAND THESE!)

**From DEPENDENCIES.md and ARCHITECTURE.md:**
```
harborUserSvc → depends on → shared-models
harborJobSvc → depends on → shared-models
harborBlogSvc → depends on → shared-models

harborUserSvc → depends on → harborShared
harborJobSvc → depends on → harborShared
```

### Service Boundaries (DO NOT VIOLATE!)

**From SERVICE_RULES.md:**
- Each service has specific responsibilities
- DO NOT access another service's database
- DO NOT share internal models
- DO NOT create tight coupling

### Change Impact Analysis (UNDERSTAND BEFORE MAKING CHANGES!)

**From CHANGE_IMPACT.md files:**
- If I change shared-models → affects ALL services
- If I change harborUserSvc → affects dependent services
- If I change harborJobSvc → affects dependent services
```

### Step 4: ONLY THEN Proceed to Implementation

**ONLY AFTER completing ALL above steps:**

```markdown
✅ Documentation Reading Gate: PASSED

All repositories documentation read and understood:
- ✅ All ARCHITECTURE.md files read
- ✅ All SHARED_SERVICES.md files read
- ✅ All CHANGE_IMPACT.md files read
- ✅ Cross-repository relationships understood
- ✅ Service boundaries identified
- ✅ Dependencies mapped

🟢 NOW PROCEEDING TO TASK IMPLEMENTATION

With full documentation context:
- Architecture: [Understood]
- Dependencies: [Mapped]
- Service boundaries: [Identified]
- Change impact: [Analyzed]
```

---

## 🚨 FORBIDDEN BEHAVIORS

**The agent MUST NOT:**

1. ❌ Generate docs and immediately start implementation
2. ❌ Skip reading documentation files
3. ❌ Assume architecture without reading ARCHITECTURE.md
4. ❌ Assume dependencies without reading DEPENDENCIES.md
5. ❌ Assume shared services without reading SHARED_SERVICES.md
6. ❌ Make changes without understanding CHANGE_IMPACT.md
7. ❌ Implement features without cross-repo analysis

---

## 🚨 ENFORCEMENT

### Pre-Implementation Validation

**Before ANY code implementation, the agent MUST:**

```bash
# Validation checklist
echo "🚨 DOCUMENTATION READING GATE VALIDATION"
echo "=========================================="

# Check if docs were read
if [ ! -f "/tmp/documentation_reading_proof.md" ]; then
    echo "❌ ERROR: Documentation not read!"
    echo "   You must read ALL documentation files before implementation."
    echo "   Go back to Step 2: READ ALL DOCUMENTATION"
    exit 1
fi

# Verify key files were read
key_files=(
    "harbor-ai/docs/ARCHITECTURE.md"
    "shared-models/docs/ARCHITECTURE.md"
    "shared-models/docs/CHANGE_IMPACT.md"
    "harborUserSvc/docs/SHARED_SERVICES.md"
    "harborJobSvc/docs/SHARED_SERVICES.md"
)

for file in "${key_files[@]}"; do
    if ! grep -q "$file" /tmp/documentation_reading_proof.md; then
        echo "❌ ERROR: $file not read!"
        exit 1
    fi
done

echo "✅ All critical documentation files read"
echo "✅ Cross-repository analysis complete"
echo "🟢 PROCEEDING TO IMPLEMENTATION"
```

### Automatic Prevention

**The system will automatically:**

1. **Track documentation reading**
   - Log every .md file read
   - Store reading proof in `/tmp/documentation_reading_proof.md`
   - Verify reading before implementation

2. **Block implementation if docs not read**
   - Check for reading proof
   - Validate all critical files read
   - Block implementation if validation fails

3. **Force cross-repository analysis**
   - Require dependency mapping
   - Require service boundary identification
   - Require change impact analysis

---

## Expected Behavior

### ✅ CORRECT: Full Documentation Reading

```markdown
Task: "Add user notifications"

Agent Actions:
1. ✅ Validate/Generate docs for all repos
2. ✅ READ harborUserSvc/docs/ARCHITECTURE.md
3. ✅ READ harborUserSvc/docs/SHARED_SERVICES.md
4. ✅ READ harborUserSvc/docs/CHANGE_IMPACT.md
5. ✅ READ shared-models/docs/ARCHITECTURE.md
6. ✅ READ shared-models/docs/CHANGE_IMPACT.md
7. ✅ READ all other repos' documentation
8. ✅ Perform cross-repository analysis
9. ✅ Identify: "harborNotificationSvc exists - use it!"
10. ✅ Identify: "shared-models - need to check impact"
11. ✅ Plan implementation with full context
12. ✅ Implement with understanding of dependencies

Result: ✅ Correct implementation, no breaking changes
```

### ❌ WRONG: Skip Documentation Reading

```markdown
Task: "Add user notifications"

Agent Actions:
1. ✅ Generate docs for all repos
2. ❌ SKIP reading docs (says "loaded into memory")
3. ❌ START implementation immediately
4. ❌ ASSUME architecture without reading
5. ❌ CREATE new notification service (duplicate!)
6. ❌ MISS existing harborNotificationSvc
7. ❌ BREAK shared-models dependencies
8. ❌ VIOLATE service boundaries

Result: ❌ Broken implementation, duplicate code, breaking changes
```

---

## Quick Reference

### Before ANY Implementation

**MUST COMPLETE:**

1. [ ] Generate/Validate docs for ALL repos
2. [ ] READ every .md file in EVERY repo's docs/
3. [ ] Understand cross-repository dependencies
4. [ ] Identify shared services
5. [ ] Analyze change impact
6. [ ] Create implementation plan with full context
7. [ ] ONLY THEN implement code

### Proof of Reading

**After reading all documentation, create proof:**

```bash
cat > /tmp/documentation_reading_proof.md << EOF
# Documentation Reading Proof

**Date:** $(date)
**Task:** {Task description}

## Documentation Files Read

### harbor-ai
- ✅ docs/ARCHITECTURE.md
- ✅ docs/STRUCTURE.md
- ✅ docs/DEPENDENCIES.md
- ✅ docs/SERVICE_RULES.md
- ✅ docs/SHARED_SERVICES.md
- ✅ docs/CHANGE_IMPACT.md

### shared-models
- ✅ docs/ARCHITECTURE.md
- ✅ docs/CHANGE_IMPACT.md

### harborUserSvc
- ✅ docs/ARCHITECTURE.md
- ✅ docs/SHARED_SERVICES.md
- ✅ docs/CHANGE_IMPACT.md

### harborJobSvc
- ✅ docs/ARCHITECTURE.md
- ✅ docs/SHARED_SERVICES.md
- ✅ docs/CHANGE_IMPACT.md

### [All other repos...]

## Cross-Repository Analysis

[Summary of dependencies and relationships]

## Implementation Context

[What was understood from documentation]

EOF
```

---

## Summary

**🚨 CRITICAL RULE:**

> **"READ ALL THE DOCUMENTATION. EVERY SINGLE .md FILE. UNDERSTAND IT. ONLY THEN PROCEED."**

**This rule is NON-NEGOTIABLE.**

**The agent MUST:**
- ✅ Generate docs if missing
- ✅ READ every .md file
- ✅ Understand cross-repository relationships
- ✅ Analyze change impact
- ✅ ONLY THEN implement

**The agent MUST NOT:**
- ❌ Generate docs and skip reading
- ❌ Start implementation without reading
- ❌ Assume without verifying
- ❌ Implement without context

---

**End of Documentation Reading Gate**
