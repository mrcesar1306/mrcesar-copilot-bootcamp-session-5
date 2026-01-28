# Working Memory System

## Purpose

This memory system tracks patterns, decisions, and lessons learned during development. It helps GitHub Copilot provide more context-aware suggestions by building a knowledge base of project-specific discoveries.

## Memory Types

### Persistent Memory
- **Location**: `.github/copilot-instructions.md`
- **Content**: Foundational principles, workflows, and coding standards
- **Lifespan**: Permanent - defines the core project guidelines
- **Committed**: Yes - part of the permanent repository

### Working Memory
- **Location**: `.github/memory/`
- **Content**: Discoveries, patterns, and session-specific learnings
- **Lifespan**: Evolves over time as patterns emerge
- **Committed**: Partially (see structure below)

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md             # Historical session summaries (COMMITTED)
├── patterns-discovered.md       # Accumulated code patterns (COMMITTED)
└── scratch/
    ├── .gitignore              # Ignores all scratch files
    └── working-notes.md        # Active session notes (NOT COMMITTED)
```

### File Purposes

#### `session-notes.md` (Committed)
- **Purpose**: Document completed development sessions for future reference
- **Content**: Session summaries with accomplishments, key findings, and outcomes
- **When to update**: At the END of each development session
- **Committed to git**: YES - provides historical context for future work

#### `patterns-discovered.md` (Committed)
- **Purpose**: Document recurring code patterns discovered during development
- **Content**: Pattern templates with context, problem, solution, and examples
- **When to update**: When you discover a new pattern or refine an existing one
- **Committed to git**: YES - helps AI understand project-specific patterns

#### `scratch/working-notes.md` (Not Committed)
- **Purpose**: Active note-taking during current development session
- **Content**: Current task, approach, findings, decisions, blockers, next steps
- **When to update**: DURING active development in real-time
- **Committed to git**: NO - ephemeral working space, cleared between sessions
- **End of session**: Summarize key findings into `session-notes.md`, then clear

## When to Use Each File

### During TDD Workflow

**Active Development** (`scratch/working-notes.md`):
```
Current Task: Implement POST /api/todos endpoint
Approach: Write failing test first, then implement
Key Findings: 
  - Need to initialize todos array
  - ID counter missing
Decisions Made:
  - Use simple incrementing ID
Next Steps: Run test to verify it passes
```

**After Session** (`session-notes.md`):
```
## Session: Backend CRUD Implementation - Jan 28, 2026
Implemented POST endpoint with proper validation
Fixed todos array initialization bug
Tests now pass for create functionality
```

**Pattern Emerges** (`patterns-discovered.md`):
```
### Service Initialization
Empty arrays should be initialized, not null
Example: let todos = [] (not let todos = null)
```

### During Linting Workflow

**Active Work** (`scratch/working-notes.md`):
```
Current Task: Fix ESLint errors in app.js
Key Findings:
  - 5 unused variables
  - 3 console.log statements
Approach: Fix unused vars first, then console logs
```

**After Session** (`session-notes.md`):
```
## Session: Code Quality Pass - Jan 28, 2026
Fixed all ESLint errors in backend
Removed unused variables, replaced console.log with proper logging
```

### During Debugging Workflow

**Active Investigation** (`scratch/working-notes.md`):
```
Current Task: Debug toggle function bug
Problem: Always sets completed to true
Key Findings:
  - Line 45: todo.completed = true (hardcoded)
  - Should be: todo.completed = !todo.completed
Decision: Fix and add test to prevent regression
```

**After Fix** (`session-notes.md`):
```
## Session: Toggle Bug Fix - Jan 28, 2026
Fixed toggle function to properly flip boolean state
Added regression test
All tests now pass
```

## How AI Reads and Applies Patterns

When you provide context to GitHub Copilot, it reads these files to:

1. **Understand Project History**: Reads `session-notes.md` to see what's been done
2. **Apply Known Patterns**: Reads `patterns-discovered.md` to suggest consistent code
3. **Continue Current Work**: Reads `scratch/working-notes.md` to understand active context

### Example AI Application

You ask: "Implement DELETE /api/todos/:id endpoint"

AI reads:
- `patterns-discovered.md`: "Always validate ID exists before deletion"
- `session-notes.md`: "POST endpoint uses simple incrementing IDs"
- `scratch/working-notes.md`: "Currently working on CRUD completion"

AI suggests code that:
- Validates ID exists (from patterns)
- Returns 404 if not found (from patterns)
- Uses consistent error handling (from patterns)
- Follows TDD approach (from instructions)

## Workflow Integration

### Start of Session
1. Open `scratch/working-notes.md`
2. Document current task and approach
3. Reference `patterns-discovered.md` for relevant patterns

### During Development
1. Update `scratch/working-notes.md` in real-time
2. Document findings, decisions, and blockers as you work
3. Use notes to maintain focus and track progress

### End of Session
1. Review `scratch/working-notes.md` for key learnings
2. Summarize important findings into `session-notes.md`
3. Extract new patterns into `patterns-discovered.md`
4. Clear or archive `scratch/working-notes.md` for next session

### Commit Strategy
```bash
# Commit historical learnings
git add .github/memory/session-notes.md
git add .github/memory/patterns-discovered.md
git commit -m "docs: update development memory"

# Scratch files are automatically ignored
# (scratch/.gitignore ensures they're never committed)
```

## Best Practices

### For `scratch/working-notes.md` (Active Session)
- ✅ Update in real-time as you work
- ✅ Be verbose - capture everything
- ✅ Include code snippets and error messages
- ✅ Document "why" behind decisions
- ❌ Don't commit to git
- ❌ Don't worry about formatting

### For `session-notes.md` (Historical Record)
- ✅ Summarize at end of session
- ✅ Focus on key accomplishments and findings
- ✅ Be concise but informative
- ✅ Commit to git
- ❌ Don't include every detail

### For `patterns-discovered.md` (Knowledge Base)
- ✅ Document when pattern appears 2-3 times
- ✅ Include context and rationale
- ✅ Provide concrete examples
- ✅ Update as patterns evolve
- ✅ Commit to git
- ❌ Don't document one-off solutions

## Benefits

1. **Context Continuity**: AI understands project history across sessions
2. **Pattern Consistency**: AI suggests code following discovered patterns
3. **Knowledge Accumulation**: Team builds shared understanding over time
4. **Faster Onboarding**: New developers (and AI) learn from documented patterns
5. **Better Suggestions**: AI provides more relevant, project-specific guidance

## Getting Started

1. Start your development session
2. Open `.github/memory/scratch/working-notes.md`
3. Document what you're working on
4. Update notes as you work
5. At end of session, summarize key findings into `session-notes.md`
6. Extract recurring patterns into `patterns-discovered.md`
7. Commit the historical files, leave scratch for next session

The memory system grows more valuable over time as patterns accumulate!
