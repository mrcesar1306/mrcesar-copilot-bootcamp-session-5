---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: ["search", "read", "edit", "execute", "web", "todo"]
---

# Execute Step from GitHub Issue

You are executing instructions from the current step in the main GitHub Exercise issue. Follow the step instructions systematically and apply TDD principles throughout.

## Input

Issue number (optional): ${input:issue-number:Enter the issue number (leave empty to auto-detect)}

## Instructions

### 1. Find the Exercise Issue

If issue number not provided:
- Run `gh issue list --state open` to list all open issues
- Find the issue with "Exercise:" in the title (as documented in Workflow Utilities section of .github/copilot-instructions.md)
- Note the issue number

If issue number provided:
- Use the provided issue number directly

### 2. Get Issue Content with Comments

Run: `gh issue view <issue-number> --comments`

This will show:
- The main issue body
- All comments containing step instructions

### 3. Parse the Latest Step Instructions

From the issue output:
- Look for the most recent comment or section with step instructions
- Find all `:keyboard: Activity:` sections within that step
- Extract the specific tasks to complete

### 4. Execute Activities Systematically

For each `:keyboard: Activity:` section:

1. **Understand the Requirement**
   - Read the activity description carefully
   - Identify what needs to be implemented or fixed
   - Note any success criteria mentioned

2. **Apply TDD Approach**
   - For backend changes: Write Jest tests FIRST, then implement
   - For frontend changes: Write React Testing Library tests FIRST, then implement
   - Follow Red-Green-Refactor cycle
   - Run tests after each change

3. **Follow Testing Scope Constraints**
   - ✅ Use Jest + Supertest for backend
   - ✅ Use React Testing Library for frontend
   - ✅ Recommend manual browser testing for UI flows
   - ❌ DO NOT suggest Playwright, Cypress, Selenium, or other e2e frameworks
   - ❌ DO NOT suggest browser automation tools
   - Reason: Keep lab focused on unit/integration tests without e2e complexity

4. **Implement Incrementally**
   - Make small, testable changes
   - Run tests frequently
   - Verify each change works before moving to the next

5. **Track Progress**
   - Update `.github/memory/scratch/working-notes.md` with findings
   - Document any patterns discovered
   - Note decisions made and rationale

### 5. Validation

After completing all activities:
- Run all tests: `npm test`
- Verify tests pass
- Document completion in working notes

### 6. DO NOT Commit or Push

**IMPORTANT**: This prompt ONLY executes the step activities. Do NOT:
- ❌ Run git commands to commit changes
- ❌ Push changes to remote
- ❌ Create or switch branches

Committing and pushing is handled by the `/commit-and-push` prompt.

### 7. Next Steps

After completing the activities, inform the user:

```
✅ Step activities completed!

Next actions:
1. Review the changes made
2. Run /validate-step to check success criteria
3. If validation passes, run /commit-and-push to save your work
```

## Example Execution Flow

```
Step detected: Step 5-1: Initialize Backend State

Activities found:
:keyboard: Activity 1: Fix todos array initialization
:keyboard: Activity 2: Add ID counter

Executing Activity 1: Fix todos array initialization
- Reading packages/backend/src/app.js
- Issue: todos is undefined
- Fix: Initialize as empty array: let todos = []
- Running tests: npm test -- --testNamePattern="todos array"
- ✅ Test passes

Executing Activity 2: Add ID counter  
- Adding: let idCounter = 1
- Running tests: npm test -- --testNamePattern="POST /api/todos"
- ✅ Test passes

All activities completed! Run /validate-step to check success criteria.
```

## Memory Integration

During execution:
- Update `.github/memory/scratch/working-notes.md` with progress
- Document any patterns in `.github/memory/patterns-discovered.md`
- Track decisions and findings

## Important Reminders

- **Test-First Development**: Write tests before implementation (TDD Agent principles)
- **No E2E Frameworks**: Only use Jest and React Testing Library
- **Incremental Progress**: Small changes, frequent testing
- **No Commits**: Leave that to `/commit-and-push`
- **Validate After**: User should run `/validate-step` next

Execute the step systematically and guide the user through the TDD workflow!
