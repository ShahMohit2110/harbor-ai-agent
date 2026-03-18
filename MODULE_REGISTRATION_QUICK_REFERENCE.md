# Module Registration Quick Reference

**Version:** 1.0.0
**Last Updated:** 2026-03-18
**Purpose:** Quick reference for Module Registration Awareness

---

## 🚨 CRITICAL RULE

**When creating ANY new module (model, service, controller, entity, etc.), you MUST:**

1. ✅ Detect ALL registration points BEFORE creating
2. ✅ Complete ALL registration steps AFTER creating
3. ✅ Verify complete integration BEFORE proceeding

**❌ NEVER create the module file only and stop there.**

---

## 📋 3-Phase Workflow

### Phase 1: Pre-Creation Analysis (MANDATORY)

```bash
# 1. Search for existing similar modules
find . -name "*.model.ts" -o -name "*Model.ts"

# 2. Find where they're imported
grep -r "from.*ExistingModel" --include="*.ts" .

# 3. Find where they're registered
grep -r "export.*Model\|registerModel" --include="*.ts" .

# 4. Document all registration points
```

**Create checklist:**
```markdown
Registration Points Detected:
- [ ] models/index.ts (barrel export)
- [ ] database/index.ts (ORM registration)
- [ ] routes/index.ts (route registration)
```

---

### Phase 2: Module Creation

1. Create module file following detected patterns
2. Apply ALL registration steps from checklist

**❌ FORBIDDEN:**
- Creating module file only
- Skipping registration steps
- Assuming "it should work automatically"

**✅ REQUIRED:**
- Complete ALL registration steps
- Update ALL registration files
- Follow exact same pattern as existing modules

---

### Phase 3: Verification (MANDATORY)

```bash
# 1. Verify registration files updated
grep -n "NewModule" /path/to/registration/file.ts

# 2. Compile to check for errors
npm run build
# OR
tsc --noEmit

# 3. Test import
# Try importing the module in the application

# 4. Verify runtime integration
# Check if module is accessible (API endpoint, ORM, etc.)
```

**Verification Checklist:**
- [ ] All registration files updated
- [ ] Module can be imported without errors
- [ ] TypeScript compilation succeeds
- [ ] Module follows exact same pattern as existing modules
- [ ] Module is initialized (if required)
- [ ] Module is accessible

---

## 🔍 Common Registration Patterns

### Pattern 1: Barrel Export

**Detect:**
```bash
find . -name "index.ts" -path "*/models/*"
```

**Apply:**
```typescript
// models/index.ts
export { User } from './user.model';
export { Job } from './job.model';
// ✅ ADD HERE
export { NewModule } from './new-module.model';
```

---

### Pattern 2: ORM Registration

**Detect:**
```bash
find . -name "database.ts" -o -name "db.ts"
grep -r "sequelize\|typeorm" --include="*.ts" .
```

**Apply:**
```typescript
// database/index.ts
import { User } from '../models/user.model';
import { Job } from '../models/job.model';
// ✅ ADD IMPORT
import { NewModule } from '../models/new-module.model';

export const db = {
  User,
  Job,
  // ✅ REGISTER
  NewModule,
  sequelize
};
```

---

### Pattern 3: Route Registration

**Detect:**
```bash
find . -name "routes.ts" -o -name "routes/index.ts"
grep -r "router.use\|app.use" --include="*.ts" .
```

**Apply:**
```typescript
// routes/index.ts
import userRoutes from './user.routes';
import jobRoutes from './job.routes';
// ✅ ADD IMPORT
import newModuleRoutes from './new-module.routes';

router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
// ✅ REGISTER ROUTE
router.use('/new-modules', newModuleRoutes);
```

---

### Pattern 4: Service Registration

**Detect:**
```bash
find . -name "container.ts" -o -name "services.ts"
grep -r "container.register\|DIContainer" --include="*.ts" .
```

**Apply:**
```typescript
// services/container.ts
import { UserService } from './user.service';
import { JobService } from './job.service';
// ✅ ADD IMPORT
import { NewModuleService } from './new-module.service';

container.bind<UserService>('UserService').to(UserService);
container.bind<JobService>('JobService').to(JobService);
// ✅ REGISTER SERVICE
container.bind<NewModuleService>('NewModuleService').to(NewModuleService);
```

---

## 🚨 4 Critical Rules

### Rule 1: Never Assume Auto-Registration

**❌ FORBIDDEN:**
- "The framework will detect it automatically"
- "It should work without registration"

**✅ REQUIRED:**
- **ALWAYS** detect registration patterns
- **ALWAYS** complete ALL registration steps

---

### Rule 2: Never Skip Verification

**❌ FORBIDDEN:**
- Creating module file only
- Assuming registration worked without testing

**✅ REQUIRED:**
- **ALWAYS** compile to verify
- **ALWAYS** test import
- **ALWAYS** verify runtime integration

---

### Rule 3: Never Hardcode File Names

**❌ FORBIDDEN:**
```typescript
// "Add to models/index.ts" (might not exist)
```

**✅ REQUIRED:**
```typescript
// 1. Search for registration files
find . -name "index.ts" -path "*/models/*"

// 2. Analyze existing patterns
grep -r "export.*Model" models/index.ts

// 3. Follow detected pattern
```

---

### Rule 4: Follow Exact Patterns

**❌ FORBIDDEN:**
- Creating new registration pattern
- "Improving" existing pattern

**✅ REQUIRED:**
- **EXACTLY** match existing patterns
- **NEVER** deviate from detected pattern

---

## ✅ Pre-Implementation Checklist

**Before creating ANY module:**

- [ ] Searched for existing similar modules
- [ ] Identified integration patterns
- [ ] Documented all registration points
- [ ] Created registration requirements checklist
- [ ] Detected barrel export pattern: {YES/NO + location}
- [ ] Detected ORM registration pattern: {YES/NO + location}
- [ ] Detected route registration pattern: {YES/NO + location}
- [ ] Detected service registration pattern: {YES/NO + location}

**⚠️ DO NOT proceed until all items checked.**

---

## ✅ Post-Implementation Checklist

**After creating the module:**

- [ ] Module file created following detected patterns
- [ ] Barrel export updated (if required)
- [ ] ORM registration updated (if required)
- [ ] Route registration updated (if required)
- [ ] Service registration updated (if required)
- [ ] All registration files updated
- [ ] Module can be imported without errors
- [ ] TypeScript compilation succeeds
- [ ] Module follows exact same pattern as existing modules
- [ ] Module is initialized (if required)
- [ ] Module is accessible

**⚠️ DO NOT proceed until all items checked.**

---

## 📚 Full Documentation

- **Comprehensive Workflow:** `workflows/module-registration-awareness.md`
- **Execution Integration:** `workflows/execution.md` (Step 6.5)
- **Repository Rule Detector:** `workflows/repository-rule-detector.md`
- **Summary:** `MODULE_REGISTRATION_FIX_SUMMARY.md`

---

## 🔧 Troubleshooting

**Module not found?**
→ Check if exported in barrel file

**TypeScript errors?**
→ Run `npm run build` or `tsc --noEmit`

**Runtime errors?**
→ Verify module is registered and imported

**Inconsistent pattern?**
→ Match existing module pattern exactly

---

**End of Quick Reference**

**Remember: Detect → Register → Verify**
