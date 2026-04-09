import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      // 'text'  → printed in terminal after each run
      // 'html'  → browsable report at coverage/index.html
      // 'lcov'  → for CI / external tools (Codecov, SonarQube, etc.)
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: [
        'src/**',
      ],
      exclude: [
        'src/test/**',
        '**/*.d.ts',
        'vite.config.ts',
        // Not executable code — CSS and binary assets have no functions or branches to instrument
        '**/*.css',
        'src/assets/**',
        // DOM bootstrap entry point — only calls ReactDOM.createRoot().render(); no logic to test
        'src/main.tsx',
        // Router wiring only — no business logic, just <BrowserRouter><Routes> structure
        'src/App.tsx',
        // Pure data exports (translation JSON, type definitions) — no functions or branches
        'src/i18n/locales/**',
        'src/data/**',
        // i18next bootstrap with module-level side effects (localStorage, navigator, document);
        // behaves like an entry point and is covered by integration/e2e tests instead
        'src/i18n/index.ts',
      ],
      thresholds: {
        lines: 95,
        functions: 95,
        branches: 95,
        statements: 95,
      },
    },
  },
})
