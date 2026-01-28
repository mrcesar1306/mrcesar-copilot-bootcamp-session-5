# GitHub Copilot Instructions

## Project Context

This is a full-stack TODO application with a React frontend and Express backend. The development approach emphasizes iterative, feedback-driven development with a strong focus on quality and maintainability.

**Current Phase**: Backend stabilization and frontend feature completion

## Documentation References

Refer to these documentation files to understand project architecture and standards:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles for all development work:

- **Test-Driven Development**: Follow the Red-Green-Refactor cycle for all changes
- **Incremental Changes**: Make small, testable modifications rather than large rewrites
- **Systematic Debugging**: Use test failures as guides to identify and fix issues
- **Validation Before Commit**: Ensure all tests pass and there are no lint errors before committing

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

- **Backend**: Jest + Supertest for API testing
- **Frontend**: React Testing Library for component unit/integration tests
- **Manual Testing**: Browser testing for full UI verification

**Important Constraints**:
- DO NOT suggest or implement e2e test frameworks (Playwright, Cypress, Selenium)
- DO NOT suggest browser automation tools
- Reason: Keep the lab focused on unit/integration tests without e2e complexity

**Testing Approach by Context**:

- **Backend API changes**: Write Jest tests FIRST, then implement (RED-GREEN-REFACTOR)
- **Frontend component features**: Write React Testing Library tests FIRST for component behavior, then implement (RED-GREEN-REFACTOR). Follow with manual browser testing for full UI flows.
- **This is true TDD**: Test first, then code to pass the test

## Workflow Patterns

Follow these development workflows for consistent, high-quality results:

1. **TDD Workflow**: Write/fix tests → Run tests → Fail (Red) → Implement code → Pass (Green) → Refactor → Repeat
2. **Code Quality Workflow**: Run lint → Categorize issues → Fix systematically → Re-validate → Commit
3. **Integration Workflow**: Identify issue → Debug with tests → Test fix → Implement fix → Verify end-to-end

## Agent Usage

Use specialized agents for specific types of work:

- **tdd-developer**: For test-related work and Red-Green-Refactor cycles. Use when writing tests, implementing features with TDD, or debugging test failures.
- **code-reviewer**: For addressing lint errors, code quality improvements, and reviewing code changes systematically.

## Memory System

- **Persistent Memory**: This file (.github/copilot-instructions.md) contains foundational principles and workflows
- **Working Memory**: .github/memory/ directory contains discoveries and patterns
- During active development, take notes in .github/memory/scratch/working-notes.md (not committed)
- At end of session, summarize key findings into .github/memory/session-notes.md (committed)
- Document recurring code patterns in .github/memory/patterns-discovered.md (committed)
- Reference these files when providing context-aware suggestions

## Workflow Utilities

Use GitHub CLI commands for workflow automation (available to all modes):

**Issue Management**:
- List open issues: `gh issue list --state open`
- Get issue details: `gh issue view <issue-number>`
- Get issue with comments: `gh issue view <issue-number> --comments`

**Exercise Workflow**:
- The main exercise issue will have "Exercise:" in the title
- Steps are posted as comments on the main issue
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked

## Git Workflow

Follow these Git conventions for clear, maintainable history:

**Conventional Commits**:
- Use semantic prefixes: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`
- Example: `feat: add delete functionality to todo items`
- Example: `fix: resolve backend CORS configuration`

**Branch Strategy**:
- Feature branches: `feature/<descriptive-name>`
- Example: `feature/todo-delete-button`

**Commit Process**:
1. Stage all changes: `git add .`
2. Commit with conventional format: `git commit -m "feat: description"`
3. Push to correct branch: `git push origin <branch-name>`
