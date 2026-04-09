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
