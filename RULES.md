# 🚀 Harbor AI Agent - Rules Summary

**Last Updated:** 2026-03-26
**Purpose:** Single source of truth for all agent rules

---

## 🔒 CRITICAL RULES (ZERO TOLERANCE)

### 1. 🚨 NO GIT OPERATIONS
**Agent MUST NOT:**
- Use ANY git commands (add, commit, push, status, log, diff, etc.)
- Create branches
- Create pull requests
- Modify remote repository

**User handles all git operations.**

---

### 2. 🚨 NO NEW SERVICE OR REPO
**Agent MUST:**
- Read ALL documentation from existing services FIRST
- Find existing service that can handle the task
- Use existing service
- ONLY create new if ALL existing services prohibit (with documentation proof)

---

### 3. 🚨 DOCUMENTATION FIRST
**Agent MUST:**
- Validate ALL repos have docs/ folder
- Validate ALL repos have 12/12 .md files
- Generate missing files automatically
- ONLY proceed when documentation is complete

**Required files:** ARCHITECTURE.md, STRUCTURE.md, DEPENDENCIES.md, DATABASE.md, MODEL_FLOW.md, API_PATTERNS.md, AUTH.md, SERVICE_RULES.md, SHARED_SERVICES.md, CHANGE_IMPACT.md, DEVELOPMENT_RULES.md, GIT_RULES.md

---

### 4. 🚨 AUTONOMOUS EXECUTION
**Agent MUST:**
- Run through ALL phases automatically
- NOT ask for permission
- NOT stop at checkpoints
- Continue until task complete

---

### 5. 🚨 MULTIPLE FRONTENDS
**Agent MUST:**
- Identify ALL frontend repos (React Native, Next.js, etc.)
- Implement features in ALL frontend repos
- NOT skip ANY frontend repo

---

## 📋 References

**For detailed rules, see:**
- `workflows/DOCUMENTATION-GATE-MANDATORY.md`
- `workflows/multi-frontend-implementation.md`
- `memory/HARBOR_NO_PUSH_RULE.md`

---

**End of Rules Summary**
