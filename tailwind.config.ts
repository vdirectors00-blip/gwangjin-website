import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.{js,ts}',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0a',
          soft: '#111111',
          mid: '#1a1a1a',
          card: '#222222',
          light: '#FFFFFF',
          'light-soft': '#F5F5F5',
        },
        ink: {
          DEFAULT: '#FFFFFF',
          dim: '#CCCCCC',
          muted: '#AAAAAA',
          faint: '#777777',
          dark: '#111111',
          'dark-dim': '#444444',
          'dark-muted': '#666666',
        },
        accent: {
          gold: '#FFD700',
          eco: '#2E7D32',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
}
