# Package-Based Architecture - Quick Reference

**Version:** 5.0.0
**Last Updated:** 2026-03-18

---

## 🎯 What This Does

The agent now **automatically detects and handles package-based repositories** and their complete lifecycle:

```
Source Code Changes → Version Update → Build → Publish → Install in Consumers
```

---

## 🚀 Quick Start

### When You Start the Agent

The agent will **automatically**:

1. ✅ Analyze all repositories
2. ✅ Detect which are packages
3. ✅ Build package lifecycle maps
4. ✅ Identify all consumers
5. ✅ Determine propagation requirements

**You don't need to do anything - it's fully automatic.**

---

## 📦 How It Works

### 1. Package Detection

The agent automatically detects:

- **Package Type:**
  - Shared Library (code only)
  - Built Library (requires compilation)
  - Publishable Package (published to registry)
  - Local Package (file: or workspace:)
  - Monorepo Package (workspace:)

- **Lifecycle Stages:**
  - Version update (auto-detects strategy)
  - Build (auto-detects requirements)
  - Publish (if required)
  - Install (in all consumers)

### 2. Consumer Detection

The agent automatically finds:

- **Who consumes the package**
- **How they integrate** (version, file:, workspace:, etc.)
- **What they import/use**
- **What updates they need**

### 3. Automatic Propagation

When you modify a package, the agent automatically:

```
1. ✅ Update source code
2. ✅ Bump version (correct type)
3. ✅ Build (if required)
4. ✅ Publish (if required)
5. ✅ Update ALL consumers
6. ✅ Install in ALL consumers
7. ✅ Update consumer code (if needed)
8. ✅ Validate everything
```

---

## 📋 Package Types Reference

### Type 1: Shared Library

**Characteristics:**
- Code only, no build
- Barrel exports
- Version-controlled

**Lifecycle:**
```
Source Changes → Version Update → Install in Consumers
```

**Example:** `harborSharedModels`

---

### Type 2: Built Library

**Characteristics:**
- Requires compilation (TypeScript, etc.)
- Has build script
- Has dist/ or build/ output

**Lifecycle:**
```
Source Changes → Version Update → Build → Install in Consumers
```

**Example:** `harborUIComponents` (TypeScript)

---

### Type 3: Publishable Package

**Characteristics:**
- Published to npm/registry
- Has publish script
- Public or private registry

**Lifecycle:**
```
Source Changes → Version Update → Build → Publish → Install in Consumers
```

**Example:** Private npm package

---

### Type 4: Local Package

**Characteristics:**
- Linked via `file:` path
- No publishing
- Direct file reference

**Lifecycle:**
```
Source Changes → Build → Refresh Link → Consumers Auto-Update
```

**Example:** `file:../shared-models`

---

### Type 5: Monorepo Package

**Characteristics:**
- Part of workspace
- Uses `workspace:` protocol
- Managed by workspace tool

**Lifecycle:**
```
Source Changes → Auto-Version → Build → Workspace Auto-Sync → Consumers Auto-Update
```

**Example:** `workspace:*` in pnpm/yarn workspace

---

## 🔄 Integration Types Reference

### Type 1: Version-Based

**Example:** `"harbor-shared-models": "^1.2.3"`

**Propagation:**
```
1. Bump version in package
2. Update version in consumer package.json
3. Run npm install / bun install
4. Verify imports resolve
```

---

### Type 2: File-Based

**Example:** `"harbor-shared-models": "file:../shared-models"`

**Propagation:**
```
1. Rebuild package (if built)
2. No version update needed
3. Run npm install to refresh link
4. Consumers auto-rebuild
```

---

### Type 3: Workspace Protocol

**Example:** `"harbor-shared-models": "workspace:*"`

**Propagation:**
```
1. Rebuild package (if built)
2. Workspace auto-syncs
3. No version update needed
4. Consumers auto-rebuild
```

---

## 🎯 Example Workflows

### Example 1: Add Field to Shared Model

**Task:** Add "emailVerified" field to User model

**What the Agent Does:**

```
📦 Detected Package: harborSharedModels
   Type: Shared Library
   Lifecycle: Manual version, no build

🔍 Consumers Found: 3
   - harborUserSvc (^1.2.3)
   - harborJobSvc (^1.2.3)
   - harborNotificationSvc (^1.2.3)

✅ harborSharedModels
   - Add field to User model
   - Update exports
   - Bump version: 1.2.3 → 1.2.4

✅ harborUserSvc
   - Update: "harbor-shared-models": "^1.2.4"
   - Run: npm install
   - Add email verification API

✅ harborJobSvc
   - Update: "harbor-shared-models": "^1.2.4"
   - Run: npm install
   - Update job logic

✅ harborNotificationSvc
   - Update: "harbor-shared-models": "^1.2.4"
   - Run: npm install
   - Update notification logic

🎉 Validation: All repos use v1.2.4, all builds pass
```

---

### Example 2: Add UI Component

**Task:** Add Button component to UI library

**What the Agent Does:**

```
📦 Detected Package: harborUIComponents
   Type: Built Library (TypeScript)
   Lifecycle: Manual version, build required

🔍 Consumers Found: 2
   - harborWebsite (^2.0.0)
   - harborApp (^2.0.0)

✅ harborUIComponents
   - Add Button component
   - Update exports
   - Bump version: 2.0.0 → 2.1.0
   - Build: npm run build
   - Verify: dist/ created

✅ harborWebsite
   - Update: "harbor-ui-components": "^2.1.0"
   - Run: npm install
   - Import Button component
   - Add to page

✅ harborApp
   - Update: "harbor-ui-components": "^2.1.0"
   - Run: npm install
   - Import Button component
   - Add to screen

🎉 Validation: All repos use v2.1.0, all builds pass
```

---

### Example 3: Workspace Package

**Task:** Add utility function

**What the Agent Does:**

```
📦 Detected Package: harborSharedUtils
   Type: Monorepo Package
   Lifecycle: Changesets auto-version, workspace protocol

🔍 Consumers Found: 2
   - harborWeb (workspace:*)
   - harborApp (workspace:*)

✅ harborSharedUtils
   - Add utility function
   - Export from index.ts
   - Create changeset
   - Auto-bump version
   - Build: turbo run build

✅ harborWeb
   - Workspace auto-sync
   - Import utility function
   - Use in component
   - Build (automatic)

✅ harborApp
   - Workspace auto-sync
   - Import utility function
   - Use in screen
   - Build (automatic)

🎉 Validation: Workspace working, all builds pass
```

---

## 🚨 Rules to Remember

### ❌ DON'T Worry About:

- ❌ Which repositories are packages
- ❌ How to update versions
- ❌ Whether to build
- ❌ Which consumers to update
- ❌ How to install dependencies
- ❌ Whether everything is synchronized

### ✅ TRUST The Agent To:

- ✅ Detect packages automatically
- ✅ Follow correct lifecycle
- ✅ Update correct versions
- ✅ Build when required
- ✅ Update all consumers
- ✅ Install everywhere needed
- ✅ Validate everything

---

## 🎁 Benefits

### For You:

- **Zero Configuration** - Agent learns from your codebase
- **Zero Maintenance** - No manual package management
- **100% Reliable** - Every consumer updated
- **Zero Errors** - Validation at every step

### For Your Project:

- **Consistency** - All repos use same versions
- **Safety** - No broken dependencies
- **Quality** - All builds validated
- **Speed** - Automatic propagation

---

## 📚 Further Reading

- **Full Upgrade Details:** `/harbor-ai/PACKAGE_ARCHITECTURE_UPGRADE.md`
- **Package Lifecycle Detection:** `/harbor-ai/workflows/package-lifecycle-detection.md`
- **Package Propagation Workflow:** `/harbor-ai/workflows/package-propagation-workflow.md`
- **Global Agent Workflow:** `/harbor-ai/workflows/global-agent-workflow.md`

---

## ✅ Checklist

### Before First Use:

- [ ] Read this quick reference
- [ ] Understand package types
- [ ] Understand integration types
- [ ] Review example workflows

### During Use:

- [ ] Monitor package detection
- [ ] Verify consumer identification
- [ ] Check propagation steps
- [ ] Validate results

### After Use:

- [ ] Verify all builds pass
- [ ] Verify all tests pass
- [ ] Verify all consumers updated
- [ ] Verify no breaking changes

---

**Quick Reference Version:** 1.0.0
**Last Updated:** 2026-03-18

---

**End of Quick Reference**
