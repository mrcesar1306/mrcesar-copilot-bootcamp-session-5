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

### REST API Validation Pattern

**Context**: POST/PUT endpoints that accept user input for creating or updating resources

**Problem**: Invalid or missing data can cause runtime errors or inconsistent state

**Solution**: Validate input early in the request handler and return 400 Bad Request with descriptive error messages

**Example**:
```javascript
// ✅ Proper validation pattern
app.post('/api/todos', (req, res) => {
  const { title } = req.body;

  // Validate: check for missing and empty
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  // Proceed with valid data
  const newTodo = { id: nextId++, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
```

**Related Files**: 
- `packages/backend/src/app.js` (POST /api/todos)

**Notes**: 
- Use early returns to avoid nested if statements
- Check for both `!value` (null/undefined) and `.trim() === ''` (empty strings)
- Return 400 status code for client errors
- Include descriptive error messages for debugging

---

### 404 Handling Pattern

**Context**: API endpoints that operate on specific resources by ID (PUT, PATCH, DELETE)

**Problem**: Operating on non-existent resources can cause undefined errors or incorrect responses

**Solution**: Always check if resource exists before operating on it, return 404 if not found

**Example**:
```javascript
// ✅ Proper 404 handling
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  // Proceed with found resource
  todo.title = req.body.title;
  res.json(todo);
});
```

**Related Files**: 
- `packages/backend/src/app.js` (PUT, PATCH, DELETE endpoints)

**Notes**: 
- Use early return pattern for clarity
- Consistent error message format across endpoints
- Parse ID to integer when comparing with numeric IDs
- Return descriptive error messages

---

### Array Removal Pattern

**Context**: DELETE endpoints that need to remove items from in-memory arrays

**Problem**: Finding and removing items from arrays requires correct approach to avoid errors

**Solution**: Use `findIndex()` to locate item, check if found, then use `splice()` to remove

**Example**:
```javascript
// ✅ Safe array removal
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.json(deletedTodo);
});
```

**Related Files**: 
- `packages/backend/src/app.js` (DELETE /api/todos/:id)

**Notes**: 
- `findIndex()` returns -1 when not found (not undefined)
- `splice()` modifies the original array and returns removed elements
- Can return the deleted item for confirmation
- Alternative: use `filter()` to create new array without the item
