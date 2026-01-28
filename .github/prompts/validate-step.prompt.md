---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: ["search", "read", "execute", "web", "todo"]
---

# Validate Step Success Criteria

Validate that all success criteria for the specified step have been met. Check each criterion against the current workspace state and provide clear guidance.

## Input

**Step number (REQUIRED)**: ${input:step-number:Enter the step number to validate (e.g., 5-0, 5-1, 5-2)}

## Instructions

### 1. Find the Main Exercise Issue

Use gh CLI to find the exercise issue (see Workflow Utilities in .github/copilot-instructions.md):

```bash
gh issue list --state open
```

Look for the issue with "Exercise:" in the title.
Note the issue number.

### 2. Get Issue with Comments

```bash
gh issue view <issue-number> --comments
```

This retrieves:
- The main issue body
- All comments containing step instructions

### 3. Find the Specified Step

Search through the issue output for:
```
# Step ${step-number}:
```

Example: If step-number is "5-1", search for "# Step 5-1:"

### 4. Extract Success Criteria

Within the step section, find the **Success Criteria** section.

Example format:
```
## Success Criteria

- [ ] Todos array is initialized as empty array
- [ ] ID counter starts at 1
- [ ] POST endpoint tests pass
- [ ] No compilation errors
```

Extract all criteria items.

### 5. Validate Each Criterion

For each criterion, check the current workspace state:

#### A. Code State Checks

For criteria about code changes:
- Read relevant files
- Verify the expected code exists
- Check implementation matches requirements

Example:
```
Criterion: "Todos array is initialized as empty array"

Checking: packages/backend/src/app.js
Looking for: let todos = []

✅ PASS: Found 'let todos = []' on line 8
```

#### B. Test Checks

For criteria about tests passing:
- Run the relevant tests
- Verify they pass
- Check for specific test names if mentioned

Example:
```
Criterion: "POST endpoint tests pass"

Running: npm test -- --testNamePattern="POST /api/todos"

✅ PASS: All POST endpoint tests passing (3/3)
```

#### C. Lint/Compilation Checks

For criteria about code quality:
- Run linter: `npm run lint`
- Check for errors in relevant files
- Verify zero errors

Example:
```
Criterion: "No ESLint errors in backend"

Running: npm run lint

✅ PASS: Zero ESLint errors in packages/backend/
```

#### D. Feature Checks

For criteria about features working:
- Run the application if needed
- Test the feature manually
- Verify expected behavior

Example:
```
Criterion: "Todos can be created via API"

Testing: curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo"}'

✅ PASS: Returns 201 with todo object containing id, title, completed
```

### 6. Generate Validation Report

Create a clear report showing:
- Total criteria checked
- How many passed
- How many failed
- Specific details for each criterion
- Guidance for fixing any failures

**Report Format:**

```
# Validation Report: Step ${step-number}

## Summary
✅ Passed: X/Y criteria
❌ Failed: Y/Y criteria

## Detailed Results

### ✅ Criterion 1: [description]
Status: PASS
Details: [what was checked and confirmed]

### ❌ Criterion 2: [description]
Status: FAIL
Details: [what was checked and why it failed]
Guidance: [specific steps to fix this]

### ✅ Criterion 3: [description]
Status: PASS
Details: [what was checked and confirmed]

## Next Steps

[If all passed:]
🎉 All success criteria met! You can now:
1. Run /commit-and-push to save your work
2. Move to the next step

[If some failed:]
⚠️ Some criteria not yet met. Complete the following:
1. [Specific action for failed criterion 1]
2. [Specific action for failed criterion 2]
Then run /validate-step again to recheck.
```

### 7. Handle Edge Cases

**If step not found:**
```
⚠️ Step ${step-number} not found in the exercise issue.

Available steps in this issue:
- Step 5-0: Project Setup
- Step 5-1: Backend Initialization
- Step 5-2: Lint Resolution

Please check the step number and try again.
```

**If no success criteria:**
```
ℹ️ Step ${step-number} has no explicit success criteria defined.

Consider these general checks:
- All tests pass
- No lint errors
- Features work as expected
- Code is committed
```

**If tests fail:**
```
❌ Tests failing prevents validation completion.

Failed tests:
- [test name 1]
- [test name 2]

Recommendation:
1. Fix failing tests using @tdd-developer agent
2. Run /validate-step again after fixes
```

## Example Validation

```
User input: step-number = "5-1"

Step 1: Finding exercise issue...
Found: Issue #1 "Exercise: Session 5 - Agentic Development"

Step 2: Getting issue details...
Retrieved issue with all comments

Step 3: Finding Step 5-1...
Located: "# Step 5-1: Initialize Backend State"

Step 4: Extracting success criteria...
Found 4 criteria:
1. Todos array is initialized as empty array
2. ID counter variable exists and starts at 1
3. POST /api/todos tests pass
4. No undefined variable errors

Step 5: Validating each criterion...

Criterion 1: Todos array is initialized
Checking: packages/backend/src/app.js
✅ PASS - Found 'let todos = []' on line 8

Criterion 2: ID counter exists
Checking: packages/backend/src/app.js
✅ PASS - Found 'let idCounter = 1' on line 9

Criterion 3: POST tests pass
Running: npm test -- --testNamePattern="POST"
✅ PASS - All 3 POST tests passing

Criterion 4: No undefined errors
Running: npm test
✅ PASS - No undefined variable errors

Step 6: Generating report...

# Validation Report: Step 5-1

## Summary
✅ Passed: 4/4 criteria

## Detailed Results

### ✅ Criterion 1: Todos array is initialized
Status: PASS
Details: Found 'let todos = []' in packages/backend/src/app.js

### ✅ Criterion 2: ID counter exists  
Status: PASS
Details: Found 'let idCounter = 1' in packages/backend/src/app.js

### ✅ Criterion 3: POST tests pass
Status: PASS
Details: All 3 POST endpoint tests passing

### ✅ Criterion 4: No undefined errors
Status: PASS
Details: All tests run without undefined variable errors

## Next Steps

🎉 All success criteria met! You can now:
1. Run /commit-and-push to save your work
2. Move to Step 5-2
```

## Validation Best Practices

### Be Thorough
- Check each criterion completely
- Don't skip checks even if one fails
- Provide complete report

### Be Specific
- Show exact file locations
- Include line numbers when relevant
- Quote actual code when helpful

### Be Helpful
- Provide clear guidance for failures
- Suggest specific fixes
- Link to relevant documentation

### Be Systematic
- Follow the same order as criteria listed
- Use consistent formatting
- Make status clear (✅ PASS / ❌ FAIL)

## Memory Integration

After validation:
- Update `.github/memory/scratch/working-notes.md` with validation results
- Document any patterns in `.github/memory/patterns-discovered.md`
- If step complete, add summary to `.github/memory/session-notes.md`

## Important Reminders

- **Step Number Required**: Cannot proceed without step number
- **Complete Check**: Validate ALL criteria, not just first failure
- **Clear Guidance**: Always tell user what to do next
- **Code Review Focus**: Use code-reviewer agent principles for quality checks

Let's systematically validate your step completion!
