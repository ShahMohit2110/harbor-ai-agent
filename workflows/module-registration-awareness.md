# Module Registration Awareness (MANDATORY)

**Version:** 1.0.0
**Last Updated:** 2026-03-18
**Purpose:** Ensure ALL new modules are properly registered and integrated into the system

---

## 🚨 CRITICAL: MANDATORY REQUIREMENT

**This workflow is MANDATORY for EVERY module creation.**

**NEVER skip module registration detection.**
**NEVER assume registration is automatic.**
**ALWAYS verify complete integration before proceeding.**

---

## 🎯 Core Problem

When creating or modifying a new module (model, service, schema, entity, controller, etc.), the agent must:

1. ✅ Create the module file
2. ✅ **Register the module in all required locations** (MANDATORY)
3. ✅ **Verify the module is fully integrated** (MANDATORY)

**❌ COMMON MISTAKE:** Creating the module file but forgetting to register it, causing runtime errors.

---

## 📋 Module Registration Workflow

### Phase 1: Before Creating Any Module

**🚨 MANDATORY PRE-CREATION ANALYSIS**

Before creating ANY new module, the agent MUST:

#### Step 1: Identify Similar Existing Modules

```bash
# Search for existing modules of the same type
# Example: If creating a new model, search for existing models
find . -name "*.model.ts" -o -name "*Model.ts"
# OR
find . -path "*/models/*" -name "*.ts"
```

**Purpose:** Understand how existing modules are structured and integrated.

#### Step 2: Analyze Integration Patterns

For **EACH** similar existing module, identify:

1. **Where is it imported?**
   ```bash
   # Find all files that import this module
   grep -r "from.*ExistingModel" --include="*.ts" .
   ```

2. **Where is it registered?**
   - Check for barrel exports (`index.ts` files)
   - Check for central configuration files
   - Check for ORM/database registration files
   - Check for route registration files

3. **What is the initialization pattern?**
   - Is there an `init()` function?
   - Is there a setup/registration file?
   - Is there a loader/registry pattern?

#### Step 3: Document Registration Requirements

**Create a checklist of ALL registration points:**

```markdown
## Module Registration Checklist

Module Type: {model/service/controller/etc}

Existing Similar Modules:
- ExistingModel1
- ExistingModel2
- ExistingModel3

Registration Points Detected:
- [ ] models/index.ts (barrel export)
- [ ] database/index.ts (ORM registration)
- [ ] routes/index.ts (route registration)
- [ ] server.ts (app initialization)
- [ ] {other registration points}

Pattern: {describe the pattern}

Required Steps for New Module:
1. Create module file
2. Add export to models/index.ts
3. Register in database/index.ts
4. Import in routes/index.ts
5. Add route registration
6. Verify initialization
```

---

### Phase 2: Module Creation

**After completing Phase 1 analysis, proceed with creation:**

#### Step 4: Create the Module File

Follow detected patterns from existing modules.

#### Step 5: Register the Module

**🚨 MANDATORY: Apply ALL registration steps from Phase 1 checklist.**

**❌ FORBIDDEN:**
- Creating the module file only
- Skipping registration steps
- Assuming "it should work automatically"
- Assuming "the framework will handle it"

**✅ REQUIRED:**
- Complete ALL registration steps from the checklist
- Update ALL files that reference similar modules
- Add exports to ALL barrel files
- Register in ALL initialization files

---

### Phase 3: Verification

**🚨 MANDATORY: Verify complete integration before proceeding.**

#### Step 6: Verify Registration Completeness

**For EACH registration point from Phase 1:**

1. **Check file was updated:**
   ```bash
   # Verify the registration file includes the new module
   grep -n "NewModule" /path/to/registration/file.ts
   ```

2. **Check syntax is correct:**
   ```bash
   # Compile to check for errors
   npm run build
   # OR
   tsc --noEmit
   ```

3. **Check imports resolve:**
   - No "Cannot find module" errors
   - No undefined references
   - All exports are valid

#### Step 7: Verify Runtime Integration

**Before considering the module complete:**

1. **Verify module can be imported:**
   ```typescript
   // Test import in the application
   import { NewModule } from './modules/new-module';
   ```

2. **Verify module is initialized (if required):**
   - Check if module requires initialization
   - Verify initialization is called
   - Check initialization order (if dependencies exist)

3. **Verify module is accessible:**
   - If API endpoint: verify route is registered
   - If model: verify it's available in the ORM
   - If service: verify it can be imported and used

#### Step 8: Consistency Verification

**Verify the new module follows the EXACT same pattern as existing modules:**

- [ ] File structure matches existing modules
- [ ] Export pattern matches existing modules
- [ ] Registration pattern matches existing modules
- [ ] Import pattern matches existing modules
- [ ] Initialization pattern matches existing modules

---

## 🔍 Common Registration Patterns

### Pattern 1: Barrel Export (TypeScript/JavaScript)

**Detection:**
```bash
# Find barrel export files
find . -name "index.ts" -o -name "index.js"
```

**Pattern:**
```typescript
// models/index.ts
export { User } from './user.model';
export { Job } from './job.model';
export { Profile } from './profile.model';
// ✅ ADD NEW MODULE HERE
export { NewModule } from './new-module.model';
```

**Registration Step:**
- Add export to the barrel export file
- Follow the exact import/export pattern used

---

### Pattern 2: ORM Registration (Sequelize/TypeORM/Mongoose)

**Detection:**
```bash
# Find ORM registration files
find . -name "database.ts" -o -name "db.ts" -o -name "sequelize.ts"
# OR
grep -r "sequelize\|typeorm\|mongoose" --include="*.ts" .
```

**Pattern (Sequelize):**
```typescript
// database/index.ts
import { Sequelize } from 'sequelize';
import { User } from '../models/user.model';
import { Job } from '../models/job.model';
// ✅ ADD IMPORT HERE
import { NewModule } from '../models/new-module.model';

export const sequelize = new Sequelize(...);

export const db = {
  User,
  Job,
  // ✅ REGISTER HERE
  NewModule,
  sequelize
};

// ✅ ADD TO SYNC CALL (if using sync)
export const initDatabase = async () => {
  await sequelize.sync();
};
```

**Registration Step:**
- Import the model in the database file
- Add to the database object
- Include in initialization (if required)

---

### Pattern 3: Route Registration (Express/Fastify)

**Detection:**
```bash
# Find route registration files
find . -name "routes.ts" -o -name "routes/index.ts"
# OR
grep -r "router.use\|app.use" --include="*.ts" .
```

**Pattern:**
```typescript
// routes/index.ts
import { Router } from 'express';
import userRoutes from './user.routes';
import jobRoutes from './job.routes';
// ✅ ADD IMPORT HERE
import newModuleRoutes from './new-module.routes';

const router = Router();

// ✅ REGISTER ROUTE HERE
router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/new-modules', newModuleRoutes);

export default router;
```

**Registration Step:**
- Import the route file
- Register with `router.use()` or `app.use()`
- Follow the exact pattern used by existing routes

---

### Pattern 4: Service Registration (Dependency Injection)

**Detection:**
```bash
# Find service registration/containers
find . -name "container.ts" -o -name "services.ts" -o -name "di.ts"
# OR
grep -r "container.register\|DIContainer" --include="*.ts" .
```

**Pattern:**
```typescript
// services/container.ts
import { Container } from 'inversify';
import { UserService } from './user.service';
import { JobService } from './job.service';
// ✅ ADD IMPORT HERE
import { NewModuleService } from './new-module.service';

export const container = new Container();

// ✅ REGISTER SERVICE HERE
container.bind<UserService>('UserService').to(UserService);
container.bind<JobService>('JobService').to(JobService);
container.bind<NewModuleService>('NewModuleService').to(NewModuleService);
```

**Registration Step:**
- Import the service
- Register in the DI container
- Follow the exact binding pattern

---

### Pattern 5: Configuration Registration

**Detection:**
```bash
# Find configuration files
find . -name "config.ts" -o -name "app.config.ts"
# OR
find . -path "*/config/*" -name "*.ts"
```

**Pattern:**
```typescript
// config/modules.config.ts
export const moduleConfig = {
  userModule: {
    enabled: true,
    options: { ... }
  },
  jobModule: {
    enabled: true,
    options: { ... }
  },
  // ✅ ADD CONFIGURATION HERE
  newModule: {
    enabled: true,
    options: { ... }
  }
};
```

**Registration Step:**
- Add configuration for the new module
- Follow the exact configuration structure

---

### Pattern 6: Migration-Based Registration

**Detection:**
```bash
# Find migration files
find . -path "*/migrations/*" -name "*.ts"
```

**Pattern:**
```typescript
// migrations/YYYY-MM-DD-create-new-module-table.ts
export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('new_modules', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    // ... fields
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('new_modules');
}
```

**Registration Step:**
- Create migration file
- Follow existing migration naming pattern
- Include `up()` and `down()` functions

---

### Pattern 7: Module Loader/Registry Pattern

**Detection:**
```bash
# Find module loader files
find . -name "loader.ts" -o -name "registry.ts" -o -name "modules.ts"
# OR
grep -r "registerModule\|loadModule" --include="*.ts" .
```

**Pattern:**
```typescript
// modules/registry.ts
const modules = [];

export function registerModule(moduleConfig) {
  modules.push(moduleConfig);
  // Initialize module
  moduleConfig.init();
}

// Usage somewhere
registerModule({
  name: 'user',
  init: () => { ... }
});
registerModule({
  name: 'job',
  init: () => { ... }
});
// ✅ ADD REGISTRATION HERE
registerModule({
  name: 'newModule',
  init: () => { ... }
});
```

**Registration Step:**
- Call the registration function
- Pass the required module configuration
- Follow the exact registration pattern

---

## ✅ Pre-Implementation Checklist

**Before creating ANY module, complete this checklist:**

```markdown
## Module Registration Pre-Implementation Checklist

Module to Create: {module name}
Module Type: {model/service/controller/etc}

### Phase 1: Analysis Complete
- [ ] Searched for existing similar modules
- [ ] Identified integration patterns
- [ ] Documented all registration points
- [ ] Created registration requirements checklist

### Phase 2: Pattern Detection
- [ ] Detected barrel export pattern: {YES/NO + location}
- [ ] Detected ORM registration pattern: {YES/NO + location}
- [ ] Detected route registration pattern: {YES/NO + location}
- [ ] Detected service registration pattern: {YES/NO + location}
- [ ] Detected configuration pattern: {YES/NO + location}
- [ ] Detected migration pattern: {YES/NO + location}
- [ ] Detected loader/registry pattern: {YES/NO + location}

### Phase 3: Registration Steps Documented
Total Registration Steps Required: {count}

Registration Steps:
1. [ ] {step 1}
2. [ ] {step 2}
3. [ ] {step 3}
...

### Ready to Proceed?
- [ ] YES - All registration points identified
- [ ] NO - Need more analysis

⚠️ If "NO", DO NOT proceed with module creation.
```

---

## ✅ Post-Implementation Checklist

**After creating the module, complete this checklist:**

```markdown
## Module Registration Post-Implementation Checklist

Module Created: {module name}

### Phase 1: Module File Created
- [ ] Module file created following detected patterns
- [ ] File structure matches existing modules
- [ ] Code follows existing conventions

### Phase 2: Registration Complete
- [ ] Barrel export updated (if required)
- [ ] ORM registration updated (if required)
- [ ] Route registration updated (if required)
- [ ] Service registration updated (if required)
- [ ] Configuration updated (if required)
- [ ] Migration created (if required)
- [ ] Loader/registry updated (if required)

### Phase 3: Verification
- [ ] All registration files updated
- [ ] Module can be imported without errors
- [ ] TypeScript compilation succeeds
- [ ] No "Cannot find module" errors
- [ ] Module follows exact same pattern as existing modules
- [ ] Module is initialized (if required)
- [ ] Module is accessible (API endpoint, ORM, etc.)

### Phase 4: Consistency Check
- [ ] Module structure matches existing modules
- [ ] Export pattern matches existing modules
- [ ] Registration pattern matches existing modules
- [ ] Import pattern matches existing modules
- [ ] Initialization pattern matches existing modules

### Ready to Proceed?
- [ ] YES - All checks passed, module fully integrated
- [ ] NO - Registration incomplete, fix before proceeding

⚠️ If "NO", fix registration issues before proceeding.
```

---

## 🚨 Critical Rules

### Rule 1: Never Assume Auto-Registration

**❌ FORBIDDEN ASSUMPTIONS:**
- "The framework will detect it automatically"
- "It should work without registration"
- "I'll add registration later"
- "Registration is probably not needed"

**✅ REQUIRED BEHAVIOR:**
- **ALWAYS** detect registration patterns
- **ALWAYS** complete ALL registration steps
- **NEVER** assume auto-registration without evidence

---

### Rule 2: Never Skip Verification

**❌ FORBIDDEN:**
- Creating module file only
- Assuming registration worked without testing
- Proceeding without compilation check
- Skipping consistency verification

**✅ REQUIRED:**
- **ALWAYS** compile to verify
- **ALWAYS** test import
- **ALWAYS** verify runtime integration
- **ALWAYS** check consistency with existing modules

---

### Rule 3: Never Hardcode File Names

**❌ FORBIDDEN:**
```typescript
// ❌ WRONG: Hardcoded assumption
// "Add to models/index.ts" (file might not exist)
```

**✅ REQUIRED:**
```typescript
// ✅ CORRECT: Dynamic detection
// 1. Search for registration files
find . -name "index.ts" -path "*/models/*"

// 2. Analyze existing patterns
grep -r "export.*Model" models/index.ts

// 3. Follow detected pattern
// If models/index.ts exists and has exports, add there
// If database.ts exists and has registrations, add there
```

---

### Rule 4: Follow Exact Patterns

**❌ FORBIDDEN:**
- Creating a new registration pattern
- Using a different export style
- Registering in a different location
- "Improving" the existing pattern

**✅ REQUIRED:**
- **EXACTLY** match existing patterns
- **EXACTLY** match export style
- **EXACTLY** match registration location
- **NEVER** deviate from detected pattern

---

## 🔧 Detection Algorithms

### Algorithm 1: Detect All Registration Points

```javascript
async function detectAllRegistrationPoints(repository, moduleType) {
  const registrationPoints = [];

  // 1. Search for barrel exports
  const barrelExports = await findBarrelExports(repository, moduleType);
  registrationPoints.push(...barrelExports);

  // 2. Search for ORM registration
  const ormRegistrations = await findORMRegistrations(repository);
  registrationPoints.push(...ormRegistrations);

  // 3. Search for route registration
  const routeRegistrations = await findRouteRegistrations(repository);
  registrationPoints.push(...routeRegistrations);

  // 4. Search for service registration
  const serviceRegistrations = await findServiceRegistrations(repository);
  registrationPoints.push(...serviceRegistrations);

  // 5. Search for configuration files
  const configRegistrations = await findConfigRegistrations(repository);
  registrationPoints.push(...configRegistrations);

  // 6. Search for migration patterns
  const migrationPattern = await findMigrationPattern(repository);
  if (migrationPattern) {
    registrationPoints.push(migrationPattern);
  }

  // 7. Search for loader/registry patterns
  const loaderPatterns = await findLoaderPatterns(repository);
  registrationPoints.push(...loaderPatterns);

  return registrationPoints;
}
```

---

### Algorithm 2: Verify Registration Completeness

```javascript
async function verifyRegistrationCompleteness(
  repository,
  moduleName,
  registrationPoints
) {
  const verificationResults = [];

  for (const point of registrationPoints) {
    const result = {
      point: point.file,
      type: point.type,
      registered: false,
      error: null
    };

    try {
      // Check if module is registered
      const content = await readFile(point.file);
      const isRegistered = content.includes(moduleName);

      if (isRegistered) {
        result.registered = true;
      } else {
        result.error = `Module ${moduleName} not found in ${point.file}`;
      }
    } catch (error) {
      result.error = error.message;
    }

    verificationResults.push(result);
  }

  // Check if all registrations are complete
  const allRegistered = verificationResults.every(r => r.registered);

  return {
    complete: allRegistered,
    results: verificationResults
  };
}
```

---

### Algorithm 3: Module Registration Workflow

```javascript
async function createAndRegisterModule(repository, moduleName, moduleType) {
  // Phase 1: Detection
  console.log('🔍 Phase 1: Detecting registration patterns...');
  const registrationPoints = await detectAllRegistrationPoints(
    repository,
    moduleType
  );

  console.log(`Found ${registrationPoints.length} registration points:`);
  registrationPoints.forEach(point => {
    console.log(`  - ${point.type}: ${point.file}`);
  });

  // Phase 2: Creation
  console.log('📝 Phase 2: Creating module...');
  await createModuleFile(repository, moduleName, moduleType);

  // Phase 3: Registration
  console.log('🔧 Phase 3: Registering module...');
  for (const point of registrationPoints) {
    console.log(`  Registering in ${point.file}...`);
    await registerModule(point, moduleName);
  }

  // Phase 4: Verification
  console.log('✅ Phase 4: Verifying registration...');
  const verification = await verifyRegistrationCompleteness(
    repository,
    moduleName,
    registrationPoints
  );

  if (!verification.complete) {
    console.error('❌ Registration incomplete!');
    verification.results.forEach(result => {
      if (!result.registered) {
        console.error(`  Missing: ${result.point}`);
        console.error(`  Error: ${result.error}`);
      }
    });
    throw new Error('Module registration incomplete');
  }

  console.log('✅ Module fully registered and integrated!');

  return {
    success: true,
    module: moduleName,
    registeredIn: registrationPoints.map(p => p.file)
  };
}
```

---

## 📊 Summary

### What This Workflow Ensures

✅ **Complete Integration:** Every module is fully registered in all required locations

✅ **Pattern Consistency:** New modules follow EXACT same patterns as existing modules

✅ **Runtime Safety:** No runtime errors from missing registration

✅ **Repository Integrity:** Repository remains consistent after module addition

### What This Workflow Prevents

❌ Partial implementations (module created but not registered)

❌ Runtime errors (module not found, undefined references)

❌ Inconsistent patterns (new module doesn't match existing patterns)

❌ Assumption-based development (assuming "it should work")

---

**End of Module Registration Awareness Document**
