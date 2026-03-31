# 🚨 CRITICAL: WORK IN EXISTING REPOS ONLY

**🚨 THIS IS THE ABSOLUTE FIRST RULE**

---

## 🔴 ZERO TOLERANCE: NO NEW REPOSITORIES

**AGENT MUST NEVER:**

- ❌ Create new repository
- ❌ Initialize new git repository
- ❌ Run `git init`
- ❌ Create new service folder
- ❌ Create new project structure

---

## ✅ WHAT AGENT MUST DO:

**ONLY work in EXISTING repositories:**

1. ✅ Discover ALL existing repositories
2. ✅ Read documentation from ALL existing repositories
3. ✅ Choose ONE existing repository
4. ✅ Work in THAT existing repository
5. ✅ Modify existing code
6. ✅ Stop there

---

## 📋 Example:

### ❌ WRONG:
```
Task: Add blog feature
Agent: I'll create a new repository called "harborBlogSvc"
Execute: git init harborBlogSvc
WRONG WRONG WRONG - NEVER DO THIS
```

### ✅ CORRECT:
```
Task: Add blog feature
Agent: Let me discover existing repositories...
Found: harborUserSvc, harborJobSvc, harborWebsite, etc.
Read documentation from all...
Decision: harborUserSvc can handle blog features
Work in: harborUserSvc (EXISTING repository)
DONE
```

---

## 🔒 ENFORCEMENT

**If agent attempts to create new repository:**

```
🚨 CRITICAL ERROR: NEW REPOSITORY CREATION BLOCKED

The Harbor AI Agent is NOT permitted to create new repositories.

Rule: WORK IN EXISTING REPOS ONLY - ZERO TOLERANCE

This action has been BLOCKED.

You MUST:
1. Work in existing repository
2. Use existing services
3. Modify existing code

User creates new repositories if needed.

🚨 COMMAND BLOCKED - NOT EXECUTED
```

---

## 🎯 WHY

**User handles:**
- Creating new repositories
- Initializing git repos
- Setting up project structure

**Agent handles:**
- Working in existing repositories
- Modifying existing code
- Implementing features

**Separation of concerns.**

---

**End of Rule - AGENT MUST NOT CREATE NEW REPOSITORIES**

**Status:** 🔒 ACTIVE - ZERO TOLERANCE
**Date:** 2026-03-26
