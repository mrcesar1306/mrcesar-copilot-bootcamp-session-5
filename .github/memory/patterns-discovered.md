# Discovered Code Patterns

## Purpose

This file documents recurring code patterns discovered during development. These patterns help maintain consistency and guide future implementation decisions.

**Update Cadence**: When a pattern appears 2-3 times or when refining existing patterns  
**Committed to Git**: YES - this is accumulated project knowledge

---

## Pattern Template

```markdown
### [Pattern Name]

**Context**: [When/where this pattern applies]

**Problem**: [What issue does this pattern solve?]

**Solution**: [How to implement the pattern]

**Example**:
```[language]
[Code example demonstrating the pattern]
```

**Related Files**: [List of files where this pattern is used]

**Notes**: [Additional context or considerations]
```

---

## Discovered Patterns

### Service Initialization

**Context**: Backend API services that maintain in-memory state

**Problem**: Uninitialized variables cause "Cannot read property" errors when trying to use array methods like `.push()`, `.map()`, or `.filter()`

**Solution**: Always initialize service state with appropriate empty data structures. Use empty arrays `[]` for collections, not `null` or `undefined`.

**Example**:
```javascript
// ❌ Don't do this
let todos;

// ✅ Do this
let todos = [];

// ❌ Don't do this
let idCounter;

// ✅ Do this
let idCounter = 1;
```

**Related Files**: 
- `packages/backend/src/app.js` (todos array, idCounter)

**Notes**: 
- This prevents runtime errors when API endpoints try to manipulate data
- Makes code more predictable and easier to test
- Follows defensive programming principles

---

### Toggle Boolean State

**Context**: PATCH endpoints that flip boolean values (e.g., completed status)

**Problem**: Hardcoding boolean values prevents proper toggling behavior

**Solution**: Use the NOT operator (`!`) to flip the current boolean state

**Example**:
```javascript
// ❌ Don't do this (always sets to true)
todo.completed = true;

// ✅ Do this (properly toggles)
todo.completed = !todo.completed;
```

**Related Files**:
- `packages/backend/src/app.js` (PATCH /api/todos/:id)

**Notes**:
- Test both directions: false → true AND true → false
- Consider if you need separate "complete" and "uncomplete" endpoints vs toggle

---

## Pattern Discovery Guidelines

### When to Document a Pattern

✅ **DO document when**:
- The same solution appears in 2-3 places
- You debug a common mistake
- You establish a project convention
- You discover a best practice specific to this codebase

❌ **DON'T document when**:
- It's a one-off solution
- It's already covered in general best practices
- It's framework-specific (covered in framework docs)
- It's too obvious or trivial

### How to Write Good Patterns

1. **Be Specific**: Include concrete code examples
2. **Explain Why**: Document the reasoning behind the pattern
3. **Show Don't Tell**: Use ❌ and ✅ examples
4. **Reference Usage**: Link to files where pattern appears
5. **Keep Updated**: Refine patterns as understanding evolves

---

## Your Patterns

*Add new patterns below as you discover them during development*

### [New Pattern Name]

**Context**: [When does this apply?]

**Problem**: [What issue does this solve?]

**Solution**: [How to implement?]

**Example**:
```javascript
// Your example here
```

**Related Files**: 
- [List files]

**Notes**: 
- [Additional context]
