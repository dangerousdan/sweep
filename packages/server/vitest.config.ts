import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['src/alt/**', '**/*.bench.ts'],
    },
  },
})
