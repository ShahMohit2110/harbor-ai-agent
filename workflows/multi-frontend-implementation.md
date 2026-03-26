# 🎨 Multi-Frontend Implementation Enforcement

**Version:** 1.0.0
**Priority:** CRITICAL - PREVENTS INCOMPLETE FEATURES
**Status:** MANDATORY FOR ALL UI FEATURES

---

## 🚨 THE RULE

**When implementing a feature with UI components, the agent MUST:**

1. ✅ Identify ALL frontend repositories in workspace
2. ✅ Implement feature in ALL frontend repos
3. ✅ NOT skip ANY frontend repo

**🚨 CRITICAL: A feature is NOT complete until it's in ALL frontend apps.**

---

## 🔍 Frontend Repository Detection

### Step 1: Discover All Repos

```bash
# Find ALL git repositories in workspace
WORKSPACE_ROOT=$(pwd)
while [ "$WORKSPACE_ROOT" != "/" ] && [ ! -d "$WORKSPACE_ROOT/.git" ]; do
  WORKSPACE_ROOT=$(dirname "$WORKSPACE_ROOT")
done

cd "$WORKSPACE_ROOT"

# Discover ALL repos dynamically
ALL_REPOS=$(find "$WORKSPACE_ROOT" -maxdepth 2 -type d -name ".git" | sed 's|/.git||' | sort)

echo "🔍 Discovered repositories:"
echo "$ALL_REPOS"
echo "Total: $(echo "$ALL_REPOS" | wc -l) repos"
```

### Step 2: Identify Frontend Repos

```bash
# For EACH repository, check if it's a frontend app
FRONTEND_REPOS=()

for repo in $ALL_REPOS; do
    REPO_NAME=$(basename "$repo")
    PACKAGE_JSON="$repo/package.json"

    # Check if package.json exists
    if [ -f "$PACKAGE_JSON" ]; then
        # Check if it's a React Native app
        if grep -q '"react-native"' "$PACKAGE_JSON"; then
            FRONTEND_REPOS+=("$repo|mobile|react-native")
            echo "📱 MOBILE FRONTEND: $REPO_NAME (React Native)"
        fi

        # Check if it's a Next.js app
        if grep -q '"next"' "$PACKAGE_JSON"; then
            FRONTEND_REPOS+=("$repo|web|nextjs")
            echo "🌐 WEB FRONTEND: $REPO_NAME (Next.js)"
        fi

        # Check if it's a React app
        if grep -q '"react"' "$PACKAGE_JSON" && ! grep -q '"next"' "$PACKAGE_JSON"; then
            FRONTEND_REPOS+=("$repo|web|react")
            echo "🌐 WEB FRONTEND: $REPO_NAME (React)"
        fi
    fi
done

echo ""
echo "📱 Frontend Repositories Identified:"
echo "Total: ${#FRONTEND_REPOS[@]} frontend repos"

for frontend in "${FRONTEND_REPOS[@]}"; do
    IFS='|' read -r repo type platform <<< "$frontend"
    REPO_NAME=$(basename "$repo")
    echo "  - $REPO_NAME ($type - $platform)"
done
```

---

## 🚨 Feature Implementation Rule

### If Multiple Frontend Repos Exist:

```bash
# Count frontend repos
FRONTEND_COUNT=${#FRONTEND_REPOS[@]}

if [ $FRONTEND_COUNT -gt 1 ]; then
    echo ""
    echo "⚠️  WARNING: Multiple frontend repos detected"
    echo ""
    echo "📋 Feature MUST be implemented in ALL $FRONTEND_COUNT frontend repos:"
    echo ""

    # List all frontend repos that need the feature
    for frontend in "${FRONTEND_REPOS[@]}"; do
        IFS='|' read -r repo type platform <<< "$frontend"
        REPO_NAME=$(basename "$repo")
        echo "   - $REPO_NAME ($type - $platform)"
    done

    echo ""
    echo "🎯 Implementation Plan:"
    echo "   - Backend: [identified backend service]"
    for frontend in "${FRONTEND_REPOS[@]}"; do
        IFS='|' read -r repo type platform <<< "$frontend"
        REPO_NAME=$(basename "$repo")
        echo "   - Frontend ($type): $REPO_NAME"
    done
    echo ""
    echo "✅ Implementation is ONLY complete when ALL frontend repos have the feature."
    echo ""
fi
```

---

## 📋 Implementation Checklist

### For Each Frontend Repo:

```markdown
## Frontend Implementation: [REPO-NAME]

**Platform:** [mobile|web]
**Framework:** [react-native|nextjs|react]

### Components to Create:
- [ ] Feature list/view screen
- [ ] Feature detail screen
- [ ] Feature create/edit form (if applicable)
- [ ] Feature card/item component
- [ ] Feature list component
- [ ] Feature navigation

### API Integration:
- [ ] API service file
- [ ] API hooks (useFeatureList, useFeatureDetail, etc.)
- [ ] Error handling
- [ ] Loading states

### State Management:
- [ ] Redux/Context setup
- [ ] Actions and reducers
- [ ] State selectors

### Navigation:
- [ ] Routes defined
- [ ] Navigation integrated
- [ ] Deep links (if mobile)

### Styling:
- [ ] Component styles
- [ ] Responsive design (web) / Adaptive layout (mobile)
- [ ] Theme consistency

### Testing:
- [ ] Components tested
- [ ] API integration tested
- [ ] User flow tested
```

---

## 🎯 Example: Blog Feature Implementation

### When Task is "Implement blog feature":

#### Step 1: Identify Frontend Repos

```bash
📱 Frontend Repositories Identified:
Total: 2 frontend repos
  - harborWebsite (web - nextjs)
  - harborApp (mobile - react-native)
```

#### Step 2: Implementation Plan

```markdown
🎯 Implementation Plan:

📦 Backend Implementation:
- harborUserSvc: Blog CRUD API
- harborSharedModels: Blog TypeScript types

🌐 Frontend Implementations (2 total):
1. harborWebsite (web - Next.js)
   - Blog pages (BlogListPage, BlogDetailPage, BlogCreatePage, BlogEditPage)
   - Blog components (BlogCard, BlogList, BlogForm)
   - Blog API integration
   - Blog Redux setup

2. harborApp (mobile - React Native)
   - Blog screens (BlogListScreen, BlogDetailScreen, BlogCreateScreen, BlogEditScreen)
   - Blog components (BlogCard, BlogList, BlogForm)
   - Blog API integration
   - Blog navigation

⚠️  Feature is ONLY complete when implemented in BOTH frontend apps.
```

#### Step 3: Implement in ALL Frontend Repos

**Agent MUST:**
1. ✅ Implement in harborWebsite (web)
2. ✅ Implement in harborApp (mobile)
3. ❌ NOT skip any frontend repo

---

## ❌ What Happens When Rule is Violated

### Example: Blog Feature Without harborApp

**What agent did:**
- ✅ harborSharedModels: Blog Model
- ✅ harborUserSvc: Blog API
- ✅ harborWebsite: Blog UI (web)
- ❌ harborApp: SKIPPED (mobile)

**Result:**
```
❌ INCOMPLETE FEATURE

Feature: Blog module
Status: 75% complete

Implemented in:
- ✅ harborSharedModels (types)
- ✅ harborUserSvc (backend)
- ✅ harborWebsite (web frontend)

Missing from:
- ❌ harborApp (mobile frontend)

Impact:
- Web users can access blog feature
- Mobile users CANNOT access blog feature
- Inconsistent feature across platforms
- User experience is fragmented

This is a CRITICAL FAILURE.
```

---

## ✅ Compliance Check

### Before Marking Feature Complete:

**Agent MUST verify:**

```bash
echo "🔍 Frontend Implementation Compliance Check"
echo ""

# Check each frontend repo
COMPLIANT_COUNT=0
for frontend in "${FRONTEND_REPOS[@]}"; do
    IFS='|' read -r repo type platform <<< "$frontend"
    REPO_NAME=$(basename "$repo")

    # Check if feature files exist
    if [ -d "$repo/features/blog" ] || [ -d "$repo/app/blog" ] || [ -d "$repo/screens/Blog" ]; then
        echo "✅ $REPO_NAME: Feature implemented"
        COMPLIANT_COUNT=$((COMPLIANT_COUNT + 1))
    else
        echo "❌ $REPO_NAME: Feature MISSING"
    fi
done

echo ""
echo "Compliance: $COMPLIANT_COUNT/${#FRONTEND_REPOS[@]} frontend repos complete"

if [ $COMPLIANT_COUNT -lt ${#FRONTEND_REPOS[@]} ]; then
    echo ""
    echo "❌ FEATURE INCOMPLETE"
    echo "Missing $(${#FRONTEND_REPOS[@]} - COMPLIANT_COUNT) frontend implementations"
    echo "CANNOT mark feature as complete"
    exit 1
else
    echo ""
    echo "✅ ALL FRONTEND REPOS COMPLETE"
    echo "Feature is complete and ready for testing"
fi
```

---

## 🔒 Enforcement

### In global-agent-workflow-v11.md:

**Add to Phase 0.5 (Pre-Execution Intelligence Analysis):**

```markdown
#### 🎨 Step 2.5: Frontend Repository Identification (NEW - MANDATORY)

**After discovering all repositories, identify frontend repos:**

1. Check each repo's package.json for frontend frameworks
2. Identify React Native apps (mobile)
3. Identify Next.js apps (web)
4. Identify React apps (web)
5. Output list of ALL frontend repos

**If multiple frontend repos exist:**
- ✅ Plan implementation for ALL frontend repos
- ✅ Output which repos will get the feature
- ✅ Confirm feature will be in ALL frontend apps
- ❌ DO NOT skip ANY frontend repo

**⚠️  CRITICAL: Feature is ONLY complete when implemented in ALL frontend repos.**
```

**Add to Phase 12 (Task Completion):**

```markdown
### Frontend Implementation Compliance Check

**Before marking task complete, verify:**

**Detected Frontend Repos:** [List repos discovered in Phase 0.5]

- [ ] [FRONTEND-REPO-NAME-1]: Feature implemented
- [ ] [FRONTEND-REPO-NAME-2]: Feature implemented
- [ ] ALL frontend repos have the feature
- [ ] NO frontend repos were skipped

**Note:** Replace [FRONTEND-REPO-NAME-N] with actual repo names discovered during Phase 0.5
**Example:** If harborApp and harborWebsite were detected, list those specific repos.

**If ANY frontend repo is missing the feature:**
- ❌ TASK IS INCOMPLETE
- ❌ DO NOT mark as complete
- ❌ DO NOT commit changes
- ✅ IMPLEMENT in missing frontend repo first
```

---

## 📋 Summary

**Rule:** ALL frontend repos must get UI features

**Why:** Users expect feature parity across platforms

**How:**
1. Identify ALL frontend repos during Phase 0.5
2. Plan implementation for ALL frontend repos
3. Implement in ALL frontend repos
4. Verify ALL frontend repos have the feature
5. Only then mark task complete

**Files:**
- `workflows/multi-frontend-implementation.md` (this file)

**Enforcement:** MANDATORY for all UI features

---

**Status:** 🔒 ACTIVE - PREVENTS INCOMPLETE FEATURES
**Date:** 2026-03-26
**Priority:** CRITICAL - USER EXPECTS FEATURE PARITY
