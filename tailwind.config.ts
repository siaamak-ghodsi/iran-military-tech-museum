import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        museum: {
          bg: 'var(--museum-bg)',
          elevated: 'var(--museum-bg-elevated)',
          card: 'var(--museum-bg-card)',
          border: 'var(--museum-border)',
          text: 'var(--museum-text)',
          muted: 'var(--museum-text-muted)',
          accent: 'var(--museum-accent)',
          gold: 'var(--museum-gold)',
        },
      },
      fontFamily: {
        display: ['var(--museum-font-display)'],
        body: ['var(--museum-font-body)'],
      },
    },
  },
  plugins: [],
} satisfies Config
