---
name: unit-test-writer
description: >-
  Generate unit tests for React components, hooks, and utility functions in this
  project. Uses Vitest + React Testing Library + jest-dom. Apply when the user
  asks to write tests, add test coverage, or test a specific function or component.
---

# Unit Test Writer

## Stack

| Tool | Role |
|------|------|
| Vitest | Test runner (globals enabled — no imports needed for `describe`, `it`, `expect`, `vi`) |
| @testing-library/react | Component rendering (`render`, `screen`, `fireEvent`, `waitFor`) |
| @testing-library/user-event | Realistic user interactions (`userEvent.click`, `.type`, etc.) |
| @testing-library/jest-dom | Extra matchers (`toBeInTheDocument`, `toHaveValue`, etc.) |

| Command | What it does |
|---------|-------------|
| `npm test` | Watch mode — re-runs on file save |
| `npm run test:ui` | Browser UI at localhost:51204 with live coverage map |
| `npm run test:coverage` | Single run, prints coverage table, writes `coverage/index.html` |

Open `coverage/index.html` in a browser for a line-by-line HTML report.

**Coverage thresholds** (CI will fail below these):
lines 80% · functions 80% · branches 75% · statements 80%

## File placement

Co-locate tests with source:

```
src/components/Hero.tsx
src/components/Hero.test.tsx   ← test file goes here
```

## i18n setup

All components use `useTranslation`. Wrap with a real i18n provider in tests — do **not** mock `useTranslation`:

```tsx
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'

function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>)
}
```

Import this helper from `src/test/helpers.tsx` (create it if not present).

## React Router

Components using `NavLink` or `useNavigate` need a router wrapper:

```tsx
import { MemoryRouter } from 'react-router-dom'

function renderWithRouter(ui: React.ReactElement, { initialEntries = ['/'] } = {}) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
    </MemoryRouter>
  )
}
```

## AAA pattern

Every test must follow **Arrange → Act → Assert**, with a blank line separating each phase. No comments — just the blank lines:

```tsx
it('does something', async () => {
  const user = userEvent.setup()
  const onSelect = vi.fn()
  renderWithI18n(<ComponentName onSelect={onSelect} />)

  await user.click(screen.getByRole('button', { name: /select/i }))

  expect(onSelect).toHaveBeenCalledWith('expected-id')
})
```

Rules:
- Separate Arrange, Act, and Assert with a blank line each
- No `// Arrange` / `// Act` / `// Assert` comments — structure is communicated through spacing alone
- For render-only tests with no interaction, combine Arrange + Act (the render call is the act) — one blank line before the assertions

## Test structure

```tsx
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { renderWithI18n } from '../test/helpers'
import { ComponentName } from './ComponentName'

describe('ComponentName', () => {
  it('renders the expected content', () => {
    renderWithI18n(<ComponentName />)

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('calls onSelect with the correct id when button is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    renderWithI18n(<ComponentName onSelect={onSelect} />)

    await user.click(screen.getByRole('button', { name: /select/i }))

    expect(onSelect).toHaveBeenCalledWith('expected-id')
  })
})
```

## Coverage checklist

For each unit, always generate tests for:

- [ ] Happy path — normal usage renders correctly
- [ ] Props variation — different prop values produce different output
- [ ] User interactions — clicks, inputs, form submission
- [ ] Conditional rendering — empty states, loading, error states
- [ ] Callbacks — verify `onX` props are called with correct arguments
- [ ] Edge cases — null/undefined props, empty arrays, boundary numbers

## Mocking rules

- **Prefer real implementations** over mocks (real i18n, real router)
- **Mock only** external side-effects: `fetch`, `localStorage`, timers, third-party SDKs
- Mock `localStorage`:

```ts
vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('lt')
```

- Mock `fetch`:

```ts
vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => ({}) }))
```

- Always restore mocks after each test:

```ts
afterEach(() => vi.restoreAllMocks())
```

## Anti-patterns to avoid

- Don't assert on CSS classes — use roles, labels, or text
- Don't test implementation details (internal state, private functions)
- Don't use `container.querySelector` — prefer `screen` queries
- Don't leave `console.error` suppression in committed tests
- Don't skip assertions — every `it` block must have at least one `expect`

## Additional resources

- See [examples.md](examples.md) for complete test examples for this project
