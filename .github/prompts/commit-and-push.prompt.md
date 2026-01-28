---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ["read", "execute", "todo"]
---

# Commit and Push Changes

Analyze the current changes, generate a descriptive conventional commit message, and push to the specified feature branch.

## Input

**Branch name (REQUIRED)**: ${input:branch-name:Enter the feature branch name (e.g., feature/step-5-1-backend-init)}

## Instructions

### 1. Validate Branch Name

If no branch name provided:
- **STOP and ask the user for a branch name**
- Suggested format: `feature/<descriptive-name>`
- Example: `feature/step-5-1-backend-init`
- Do NOT proceed without a branch name

### 2. Analyze Changes

Run: `git status` to see what files have changed

Run: `git diff` to see the specific changes

Analyze:
- Which files were modified?
- What functionality was added/changed/fixed?
- What category does this change fall into?
  - `feat:` - New feature
  - `fix:` - Bug fix
  - `chore:` - Maintenance (dependencies, config)
  - `docs:` - Documentation changes
  - `test:` - Test changes
  - `refactor:` - Code refactoring without feature changes

### 3. Generate Commit Message

Based on the changes, create a commit message following conventional commit format (see Git Workflow in .github/copilot-instructions.md):

**Format:**
```
<type>: <short description>

<optional longer description if needed>
```

**Examples:**
```
feat: add POST /api/todos endpoint with validation

Implements todo creation with proper error handling
and ID generation. All tests passing.
```

```
fix: initialize todos array to prevent undefined errors

Backend was failing because todos array was not initialized.
Changed from undefined to empty array [].
```

```
test: add unit tests for DELETE endpoint

Covers successful deletion, 404 for missing todo,
and validation of remaining todos after deletion.
```

```
chore: resolve ESLint errors in backend

Fixed unused variables and removed console.log statements.
All tests still passing.
```

### 4. Create or Switch to Branch

Check if branch exists: `git branch --list ${branch-name}`

**If branch does NOT exist:**
```bash
git checkout -b ${branch-name}
```

**If branch exists:**
```bash
git checkout ${branch-name}
```

### 5. Stage All Changes

```bash
git add .
```

Verify staged changes: `git status`

### 6. Commit with Generated Message

```bash
git commit -m "<generated commit message>"
```

### 7. Push to Remote Branch

```bash
git push origin ${branch-name}
```

**CRITICAL**: Only push to the user-provided branch name. DO NOT push to:
- ❌ `main`
- ❌ `master`
- ❌ Any branch other than what the user specified

### 8. Confirm Completion

Report to the user:
```
✅ Changes committed and pushed!

Branch: ${branch-name}
Commit: <commit message>

Next steps:
- Continue with next step, or
- Create a pull request if ready to merge
```

## Example Execution

```
User input: branch-name = "feature/step-5-1-backend-init"

Step 1: Branch name provided ✓

Step 2: Analyzing changes...
git status shows:
- modified: packages/backend/src/app.js
- modified: packages/backend/__tests__/app.test.js

git diff shows:
- Added: let todos = []
- Added: let idCounter = 1
- Implemented: POST /api/todos endpoint

Step 3: Generating commit message...
Type: feat (new functionality)
Message: "feat: implement POST endpoint and initialize backend state"

Step 4: Creating branch...
git checkout -b feature/step-5-1-backend-init
✓ Switched to new branch

Step 5: Staging changes...
git add .
✓ All changes staged

Step 6: Committing...
git commit -m "feat: implement POST endpoint and initialize backend state"
✓ Committed

Step 7: Pushing...
git push origin feature/step-5-1-backend-init
✓ Pushed to remote

✅ Complete! Changes are now on feature/step-5-1-backend-init
```

## Edge Cases

### Merge Conflicts
If push fails due to conflicts:
```
⚠️ Push failed due to conflicts.

Actions needed:
1. Pull latest changes: git pull origin ${branch-name}
2. Resolve conflicts
3. Run tests to verify: npm test
4. Re-commit and push
```

### No Changes to Commit
If `git status` shows no changes:
```
ℹ️ No changes to commit.

The working directory is clean. Make changes first, then run this prompt.
```

### Invalid Branch Name
If branch name contains invalid characters:
```
⚠️ Invalid branch name: "${branch-name}"

Branch names should:
- Use lowercase and hyphens
- Follow pattern: feature/<descriptive-name>
- Example: feature/step-5-1-backend-init

Please provide a valid branch name.
```

## Git Workflow Reference

This prompt follows the Git Workflow documented in `.github/copilot-instructions.md`:

- **Conventional Commits**: Use semantic prefixes (feat, fix, chore, docs, test, refactor)
- **Feature Branches**: Create branches with pattern `feature/<descriptive-name>`
- **Commit Process**: Stage all changes, commit with clear message, push to correct branch

## Important Reminders

- **Branch Name Required**: Always get branch name from user input
- **Only Specified Branch**: Never commit/push to main or other branches
- **Conventional Commits**: Follow the format strictly
- **Verify Before Push**: Check that changes are correct
- **Clear Communication**: Tell user exactly what happened

Let's commit and push your changes systematically!
