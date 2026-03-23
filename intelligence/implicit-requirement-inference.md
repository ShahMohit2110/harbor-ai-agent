# Implicit Requirement Inference System

**Version:** 1.0.0
**Last Updated:** 2026-03-23
**Status:** MANDATORY for all Harbor AI Agent operations

---

## 🎯 Purpose

This system transforms the Harbor AI Agent from a **task follower** into a **system completer** by teaching it to infer requirements that are NOT explicitly mentioned in task descriptions.

---

## 🧠 Core Philosophy

### The Problem

**Before Implicit Requirement Inference:**

```
Task: "Create a Blog model"

Agent Thinking:
✅ Created Blog model in shared-models
✅ Published package
→ Done! (But system is BROKEN)

Result:
❌ Database table not created
❌ ORM doesn't recognize model
❌ Feature fails at runtime
```

### The Solution

**After Implicit Requirement Inference:**

```
Task: "Create a Blog model"

Agent Thinking:
✅ Created Blog model in shared-models
🧠 Wait... where does this become a table?
🧠 Database-sync repository found
🧠 How are existing models registered?
🧠 Replicating User model pattern
✅ Registered in database-sync
🧠 What about ORM?
✅ Added to ORM entities
→ System is complete and functional!

Result:
✅ Database table will be created
✅ ORM recognizes model
✅ Feature works end-to-end
```

---

## 🔥 The Missing Capability

**Right now your agent thinks:**

> "Task didn't mention database-sync → I won't touch it"

**But a senior engineer thinks:**

> "New model = DB table needed → database-sync MUST be updated"

👉 This is called **Implicit Requirement Inference**

---

## 📋 System Components

### 1. Domain Event Detection

**Detects:**
- New Model / Entity created
- Existing Model modified
- New Service created
- New API endpoint created

**Example:**

```javascript
// Agent detects:
{
  type: 'MODEL_CREATED',
  entities: ['Blog', 'Post', 'Comment'],
  severity: 'CRITICAL',
  inferredRequirements: [
    'DATABASE_SYNC',      // CRITICAL
    'MODEL_REGISTRATION', // HIGH
    'ORM_REGISTRATION',   // CRITICAL
    'DEPENDENT_UPDATE'    // MEDIUM
  ]
}
```

---

### 2. System Obligation Enforcement

**For NEW MODELS:**

A model is **NOT usable** until:

```
✅ Defined in source repository
✅ Published as package (if applicable)
✅ Registered in database-sync
✅ Included in ORM initialization
✅ Can create/sync table in database
✅ Consumed by dependent services (if applicable)
```

**❗ CRITICAL THINKING RULE:**

```
Creating a model WITHOUT database sync = INCOMPLETE FEATURE

Even if:
- APIs are written ✅
- Frontend is ready ✅
- Tests pass ✅

System will FAIL at runtime:
❌ Table does not exist
❌ Database error
❌ Feature broken
```

---

### 3. Auto-Trigger Dependent Repositories

**When model is created in shared-model:**

Agent automatically:

1. **Locates database-sync repository**
   ```
   Searches for:
   - DATABASE_SYNC_SERVICE role
   - "databasesync" in name
   - "db-sync" in name
   ```

2. **Locates ORM configuration repository**
   ```
   Searches for:
   - ORM_CONFIGURATION role
   - TypeORM config files
   - Entity registration patterns
   ```

3. **Locates dependent services**
   ```
   Searches for:
   - Dependencies on shared-models
   - HarborSharedModels package
   - Model import patterns
   ```

4. **Updates all repositories**
   ```
   - Registers model in database-sync
   - Adds entity to ORM configuration
   - Updates package versions in dependents
   - Installs updated packages
   ```

---

### 4. Pattern-Based Implementation

**🚨 DO NOT GUESS**

Agent MUST:

```javascript
// 1. Find existing pattern
const existingModels = await findExistingModelsInDatabaseSync(repo);
const userPattern = existingModels.find(m => m.name === 'User');

// 2. Replicate pattern for new model
const blogRegistration = generateRegistrationCode('Blog', userPattern);

// 3. Apply to database-sync
await addModelToDatabaseSync(repo, 'Blog', blogRegistration);

// 4. Validate
await validateRegistration(repo, 'Blog', userPattern);
```

**Example Pattern Replication:**

```typescript
// EXISTING PATTERN (User model)
export const UserModel = {
  name: 'User',
  tableName: 'users',
  columns: { /* ... */ },
  relations: { /* ... */ }
};

// REPLICATED PATTERN (Blog model)
export const BlogModel = {
  name: 'Blog',
  tableName: 'blogs',
  columns: { /* ... */ },
  relations: { /* ... */ }
};
```

---

## 🔄 Model Lifecycle Awareness

**Every model MUST go through complete lifecycle:**

```
┌─────────────────────────────────────────────────────┐
│          MODEL LIFECYCLE (MANDATORY)                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. ✅ Defined in shared-model repository           │
│     ↓                                               │
│  2. ✅ Published as package (version + build)       │
│     ↓                                               │
│  3. ✅ Consumed by services (package install)       │
│     ↓                                               │
│  4. ✅ Registered in database-sync                  │
│     ↓                                               │
│  5. ✅ Materialized as DB table (ORM registration)  │
│                                                     │
└─────────────────────────────────────────────────────┘

If ANY step missing → System is INCOMPLETE
```

---

## 🚫 Task Description is NOT Complete Truth

**The agent MUST understand:**

```
The task description may be incomplete.

The agent MUST:
✅ Think beyond instructions
✅ Consider system architecture
✅ Fill missing steps
✅ Infer implicit requirements

The agent MUST NOT:
❌ Only do what's explicitly mentioned
❌ Assume "not mentioned = not required"
❌ Leave system in broken state
```

---

## 🧠 Final Thinking Model

**You are not following instructions. You are completing the SYSTEM.**

### Before This System (WRONG):
```
"I created Blog model → done"
"Task didn't mention database-sync → not my job"
"Only do what's asked → incomplete system"
```

### After This System (CORRECT):
```
"Wait… where does this model become a table?"
"→ Oh database-sync → I must update it"
"→ How are existing models registered?"
"→ Let me replicate that pattern"
"→ What about ORM? Need to update that too"
"→ Dependent services need the new package"
"→ Now the feature is complete and functional"
```

---

## 🛑 Completion Rule

**Task is NOT complete until:**

```
✔ Model exists in source repository
✔ Model is registered in database-sync
✔ Model is included in ORM configuration
✔ Model can create table in database
✔ Dependent services are updated (if applicable)
✔ System can run without failure

If ANY step missing → Continue execution
```

---

## 🎯 Real-World Example: Blogs Module

### Task Description:
```
"Create a Blogs module with Blog model"
```

### Agent Thinking (WITH Implicit Requirement Inference):

```
🔍 Domain Event Detected:
   → NEW MODEL: Blog

🧠 Implicit Requirements Inferred:
   → Database sync needed (CRITICAL)
   → ORM registration needed (CRITICAL)
   → Model export needed (HIGH)
   → Dependent services may need updates (MEDIUM)

🔗 Repositories Auto-Triggered:
   → harborDatabaseSync (REGISTER_MODEL)
   → harborOrmConfig (REGISTER_ORM_ENTITY)
   → harborBlogService (CONSUME_MODEL)

🔣 Pattern-Based Implementation:
   → Found existing User model in database-sync
   → Replicated registration pattern for Blog
   → Found existing ORM entity pattern
   → Replicated entity registration for Blog

✅ Completion Status:
   → Blog model created ✅
   → Database sync updated ✅
   → ORM configuration updated ✅
   → Table will be created on next sync ✅
   → Feature is runnable end-to-end ✅
```

### WITHOUT Implicit Requirement Inference (WRONG):

```
❌ Blog model created
❌ Database sync NOT updated
❌ ORM NOT updated
❌ Table NOT created
❌ Feature FAILS at runtime
```

---

## 📊 Output Format

**After completing implicit requirement inference, agent outputs:**

```
## 🧠 Implicit Requirement Inference Complete

### 🔍 Domain Events Detected:
- MODEL_CREATED: Blog, Post, Comment

### 🎯 Inferred Requirements:
✅ DATABASE_SYNC (CRITICAL) → harborDatabaseSync
✅ ORM_REGISTRATION (CRITICAL) → harborOrmConfig
✅ MODEL_EXPORT (HIGH) → harborSharedModels
✅ DEPENDENT_UPDATE (MEDIUM) → harborBlogService

### 🔗 Repositories Auto-Triggered:
✅ harborDatabaseSync - REGISTER_MODEL (Blocking)
✅ harborOrmConfig - REGISTER_ORM_ENTITY (Blocking)
⏳ harborBlogService - UPDATE_DEPENDENCY (Non-blocking)

### 🔣 Pattern-Based Implementation:
✅ Replicated User model registration pattern for Blog
✅ Replicated existing ORM entity pattern
✅ All registrations follow existing conventions

### 🛑 Completion Validation:
✅ Model exists in source
✅ Model registered in database sync
✅ Model registered in ORM
✅ Dependent services updated
✅ System is runnable

Status: Ready for implementation
```

---

## 🔥 Key Insight

**This enhancement solves the core problem:**

> "Agent does what's asked, but doesn't complete the system"

**Now the agent thinks:**

> "If I create something, I must ensure it actually WORKS in the system."

---

## 🎯 Non-Breaking Enhancement

**This system:**
- ✅ Is purely additive
- ✅ Does not modify existing logic
- ✅ Adds intelligence layer on top
- ✅ Prevents incomplete implementation
- ✅ Automatically enforces system completeness
- ✅ Works with existing dependency intelligence
- ✅ Integrates with evidence-based validation

---

## 📚 Integration Points

### Works With:

1. **Phase 5.7: Cross-Repository Dependency Intelligence**
   - Identifies database-sync repositories
   - Maps dependent services
   - Provides repository context

2. **Phase 5.75: Implicit Requirement Inference**
   - Detects domain events (model creation)
   - Infers system obligations
   - Auto-triggers dependent repos

3. **Phase 6.9: Evidence-Based Validation**
   - Validates model was registered
   - Confirms database-sync updated
   - Verifies ORM configuration complete

4. **Rule 7: Model Lifecycle Awareness**
   - Enforces complete lifecycle
   - Validates all stages complete
   - Ensures system functionality

---

## 🚨 Enforcement Rules

**Rule: Implicit Requirements are MANDATORY**

```
IF domain event detected (model created):
   → All inferred requirements are MANDATORY
   → Not optional, not "if mentioned in task"
   → Required for system to function

Agent MUST:
✅ Detect all domain events
✅ Infer all system obligations
✅ Execute all required actions
✅ Validate completeness

Agent MUST NOT:
❌ Skip inferred requirements
❌ Wait for explicit instructions
❌ Leave system in broken state
❌ Assume "not mentioned = not required"
```

---

## 🎓 Training Examples

### Example 1: New Model Creation

**Task:** "Add Comment model to blog module"

**Agent Execution:**

1. ✅ Create Comment model in harborSharedModels
2. 🧠 Detect: New model created
3. 🧠 Infer: Database sync needed
4. ✅ Register in harborDatabaseSync
5. 🧠 Infer: ORM registration needed
6. ✅ Add to harborOrmConfig
7. 🧠 Infer: Package version update needed
8. ✅ Update version
9. ✅ Build package
10. ✅ System complete

---

### Example 2: Model Modification

**Task:** "Add publishedAt field to Blog model"

**Agent Execution:**

1. ✅ Add publishedAt field to Blog model
2. 🧠 Detect: Model modified
3. 🧠 Infer: Database sync update needed
4. ✅ Update harborDatabaseSync (migration needed)
5. 🧠 Infer: Dependent services may need updates
6. ✅ Check consumers for breaking changes
7. ✅ System complete

---

### Example 3: New Service with Models

**Task:** "Create NotificationService with Notification model"

**Agent Execution:**

1. ✅ Create Notification model
2. 🧠 Detect: New model created
3. 🧠 Infer: Full model lifecycle required
4. ✅ Register in database-sync
5. ✅ Add to ORM configuration
6. ✅ Create NotificationService
7. 🧠 Detect: New service created
8. 🧠 Infer: Service registration needed
9. ✅ Register in service discovery
10. ✅ System complete

---

## 🏆 Success Criteria

**System is working correctly when:**

✅ Agent automatically detects when models are created
✅ Agent automatically infers database-sync requirement
✅ Agent automatically locates database-sync repository
✅ Agent automatically replicates existing patterns
✅ Agent automatically updates ORM configuration
✅ Agent automatically updates dependent services
✅ Agent validates complete lifecycle before finishing
✅ No more incomplete features
✅ No more "forgotten" database sync
✅ No more runtime failures from missing tables

---

## 📞 Support

For issues or questions about the Implicit Requirement Inference System, refer to:

- **Main Workflow:** `/harbor-ai/workflows/global-agent-workflow.md` (Phase 5.75)
- **Integration:** Works with Phase 5.7, 6.9, and Rule 7
- **Examples:** See training examples above

---

**Status:** ✅ ACTIVE - MANDATORY for all operations

**Last Updated:** 2026-03-23

**Version:** 1.0.0
