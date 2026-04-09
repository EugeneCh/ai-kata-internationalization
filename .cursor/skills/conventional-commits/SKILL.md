---
name: conventional-commits
description: >-
  Write git commit messages following the Conventional Commits 1.0.0 spec and
  this project's commitlint rules. Apply when the user asks to commit changes,
  write a commit message, stage files, or prepare a git commit.
---

# Conventional Commits

## Format

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

## Project rules (commitlint.config.ts)

| Rule | Requirement |
|------|-------------|
| `type` | must be one of the types listed below |
| `description` | lowercase, no trailing period, max 100 chars total header |
| `body` | blank line after description; each line ≤ 100 chars |
| `footer` | blank line after body |

## Allowed types

| Type | When to use |
|------|-------------|
| `feat` | new feature visible to users |
| `fix` | bug fix |
| `refactor` | code change that is neither a fix nor a feature |
| `test` | adding or updating tests |
| `docs` | documentation only |
| `style` | formatting, whitespace — no logic change |
| `perf` | performance improvement |
| `chore` | build scripts, dependency updates, tooling |
| `ci` | CI/CD pipeline changes |
| `revert` | reverts a previous commit |

## Scope (optional)

Noun describing the area of the codebase in parentheses:

```
feat(i18n): add Lithuanian locale
fix(form): validate budget before submit
test(budgetUtils): add boundary cases for categorizeBudget
```

Good scopes for this project: `i18n`, `hero`, `form`, `filters`, `destinations`, `guides`, `help`, `services`, `lib`, `ci`, `deps`

## Breaking changes

Two equivalent ways — pick one:

```
feat(api)!: rename departingFrom to departureCity

feat(api): rename departingFrom to departureCity

BREAKING CHANGE: form field key changed from departingFrom to departureCity
```

## Body

Use the body when the *why* isn't obvious from the description. Wrap at 100 chars.

```
refactor(filters): extract filterDestinations into lib/

Inline filter logic in HomePage grew complex enough to make the component
hard to test in isolation. Moving it to a pure function makes unit testing
straightforward and removes the useMemo dependency on getPaceLabel.
```

## Footer tokens

```
Refs: #42
Co-authored-by: Name <email>
Reviewed-by: Name
Closes: #99
```

## Workflow

When asked to commit:

1. Run `git diff --staged` to see what is staged (or `git diff` if nothing staged yet)
2. Identify the primary change type from the diff
3. Choose scope if the change is clearly scoped to one area
4. Write a description: imperative mood, lowercase start, no period, ≤ 72 chars
5. Add a body if the diff has non-obvious reasoning
6. Validate mentally: would `echo "<message>" | npx commitlint` pass?
7. Commit to preserve newlines:

```bash
git commit -m "feat(i18n): add Lithuanian translations for hero section

Covers all keys under hero.*, heroVisual.*, and hero.metrics.*
including the new responseValue and stepsValue metric keys."
```

## Good vs bad examples

| Bad | Good |
|-----|------|
| `Added tests` | `test(budgetUtils): add boundary cases for categorizeBudget` |
| `Fix bug` | `fix(form): prevent submit when budget field is empty` |
| `Updates` | `chore(deps): upgrade vitest to v4` |
| `WIP` | *(commit when the work is actually complete)* |
| `feat: Added new feature.` | `feat: add trip recommender service` |
| `FEAT: add thing` | `feat: add thing` |
