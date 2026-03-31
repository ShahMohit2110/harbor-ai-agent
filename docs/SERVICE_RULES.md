# Harbor AI - Service Rules

**Last Updated:** 2026-03-24

---

## DOs and DON'Ts

### ✅ DO

**Follow documentation-first approach**

**Read ALL documentation before implementation**

**Understand cross-service relationships**

**Generate complete documentation**

**Validate all changes**

### ❌ DON'T

**Assume architecture without reading docs**

**Skip documentation validation**

🚨 **Create new services/repositories for tasks that fit existing services**

**Break existing services without planning**

**Duplicate functionality across services**

---

## Critical Rules

**1. Documentation First**
- /docs is single source of truth
- Read before implementing
- Generate when missing

**2. Service Creation**
- 🚨 **NEVER create new repositories for features that can fit in existing services**
- Example: "Blog creation" → Add to User Service, NOT create BlogService
- Example: "User comments" → Add to relevant service (User/Job), NOT create CommentService
- Only create new services when:
  - Domain is completely separate from existing services
  - Requires independent scalability
  - Has different data retention requirements
  - Approved by architecture team

**3. Cross-Service Intelligence**
- Understand dependencies
- Analyze change impact
- Respect service boundaries

---

**End of SERVICE_RULES.md**
