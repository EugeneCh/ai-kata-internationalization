---
name: unit-test
description: Write or improve Vitest unit tests for any TypeScript file in src/. Targets 95%+ coverage across lib utilities, services, React pages, and i18n hooks. Use when asked to write tests, add coverage, or test a specific file.
compatibility: Designed for Claude Code. Requires Node.js, Vitest, and @testing-library/react already installed.
metadata:
  author: northstar-travel
  version: "1.0"
allowed-tools: Read Glob Grep Bash Edit Write
---

## Invocation

```
/unit-test [path/to/file.ts]
```

If no path is provided, ask the user which file to target.

## Steps

1. **Read the target file** — understand all exports, logic branches, and edge cases.
2. **Check for an existing test file** (same path, `.test.ts` suffix). If found, read it and identify gaps rather than starting fresh.
3. **Write or update the test file directly** — no plan, no preamble.
4. **Run the tests** and fix any failures before finishing:
   ```bash
   npx vitest run <test-file-path>
   ```

## Coverage standard

Target **95%+ coverage**: all exported symbols, every meaningful branch (error paths, empty inputs, boundary values, type coercions). Skip trivial tests that only inflate numbers.

## Scope by file location

| Path                | Focus                                                                               |
| ------------------- | ----------------------------------------------------------------------------------- |
| `src/lib/`          | Pure function I/O, edge cases (empty string, 0, negative, large numbers)            |
| `src/services/`     | Business logic, scoring/ranking, all conditional branches, returned shape           |
| `src/pages/`        | Render smoke test, user interactions, form validation feedback, conditional renders |
| `src/i18n/`         | Hook returns correct keys, language switching, `useLocalizedContent()` typed fields |
| Other `src/**/*.ts` | Full branch coverage of all exported symbols                                        |

## Tech stack rules

- **Runner**: Vitest — `describe`, `it`, `expect`
- **React**: `@testing-library/react` + `@testing-library/user-event`
- **Mocking**: `vi.fn()`, `vi.mock()` — mock only at system boundaries (`localStorage`, `i18next`, external APIs); never mock internal project modules
- **i18n**: mock `react-i18next` so tests are language-agnostic
- **No new dependencies** — use only what is already installed

## Style rules

- Group with `describe` blocks matching the exported symbol name
- Name tests `it('does X when Y')` — behavior-first
- `expect(...).toEqual(...)` for objects, `.toBe(...)` for primitives
- Share setup with `beforeEach` when state is reused across tests
- No inline comments unless logic is genuinely non-obvious
