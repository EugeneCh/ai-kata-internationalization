# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # TypeScript check + production build
npm run lint         # ESLint
npm test             # Run Vitest (watch mode)
npm run test:coverage  # Coverage report (enforced: 95% lines/functions/statements/branches)
```

To run a single test file:

```bash
npx vitest run src/lib/budgetUtils.test.ts
```

Commits must follow conventional commit format (enforced by commitlint + Husky).

## Architecture

**Northstar Travel** — a React 19 + TypeScript travel planning SPA demonstrating i18n patterns.

### Key layers

**Pages** (`src/pages/`) — Three routes via React Router 7:

- `/` — `HomePage`: stateful page managing destination selection, booking form fields, validation, and summary display
- `/guides` — `GuidesPage`
- `/help` — `HelpPage`

**Services** (`src/services/`) — Pure business logic, no React dependencies:

- `bookingRequestBuilder.ts`: assembles form data, estimates cost, formats summaries
- `tripRecommender.ts`: scores/ranks destinations by budget affordability and pace preference

**Lib** (`src/lib/`) — Utility functions:

- `budgetUtils.ts`: parses budget strings, calculates group totals, categorizes (budget/mid-range/luxury)
- `validateBookingForm.ts`: returns first validation error from form state
- `filterDestinations.ts`: filters by search text and pace

### Internationalization

All UI text flows through `react-i18next`. Three languages: English (`en`), Lithuanian (`lt`), Mandarin Chinese (`zh`).

- `src/i18n/index.ts`: initializes i18next, auto-detects browser language, persists choice to `localStorage` (`northstar-language` key), updates `<html lang>`
- `src/i18n/locales/`: full translation JSON files — includes not just labels but entire destination data, FAQs, guides, and policy text
- `src/i18n/content.ts`: `useLocalizedContent()` hook — typed access to structured content (destinations, FAQs, steps, guides, months, etc.)

When adding new user-facing text, add keys to all three locale files and access via `useTranslation()` or `useLocalizedContent()`.

### Data types

`src/data/destinations.ts` defines core types: `Destination` (id, name, country, bestFor, pace, priceFrom, flightTime, blurb, highlights[]) and `TravelPace` (`slow | balanced | fast`).
