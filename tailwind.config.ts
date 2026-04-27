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
  theme: {
    extend: {
      colors: {
        // 라이트 톤
        paper: {
          DEFAULT:  '#FAF8F4',
          soft:     '#F2EEE6',
          warm:     '#EDE6D8',
          line:     '#D9D2C0',
          'line-soft': '#E4DCC9',
        },
        // 다크 톤
        dark: {
          DEFAULT:  '#1A1814',
          soft:     '#22201B',
          mid:      '#2A2823',
          card:     '#322F29',
          deep:     '#0F0E0B',       // 푸터용 더 깊은 검정
        },
        // 텍스트
        ink: {
          DEFAULT:    '#1A1814',
          dim:        '#4A453E',
          muted:      '#7A7367',
          faint:      '#A8A192',
          inverse:    '#FAF8F4',
          'inverse-dim':   '#D4CDC0',
          'inverse-muted': '#9A9486',
          'inverse-faint': '#5E584D',
        },
        // 포인트
        accent: {
          bronze:       '#8B7355',
          'bronze-soft': '#B59B7A',
          eco:          '#5F7E4E',
          'eco-soft':   '#8BA275',
        },
      },
      fontFamily: {
        sans:    ['Pretendard Variable', 'Pretendard', 'Apple SD Gothic Neo', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Pretendard Variable', 'Pretendard', 'system-ui', 'sans-serif'],
        serif:   ['Noto Serif KR', 'Times New Roman', 'serif'],
        mono:    ['JetBrains Mono', 'SF Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(64px, 10vw, 156px)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(52px, 7.5vw, 116px)', { lineHeight: '0.94', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(40px, 5vw, 72px)',   { lineHeight: '1.0',  letterSpacing: '-0.03em'  }],
        'display-sm': ['clamp(32px, 3.8vw, 56px)', { lineHeight: '1.32', letterSpacing: '-0.02em'  }],
      },
      letterSpacing: {
        tightest:   '-0.04em',
        'eyebrow':  '0.32em',
        'label':    '0.3em',
        'caps-xs':  '0.22em',
      },
      maxWidth: {
        container: '1440px',
        'container-narrow': '1280px',
      },
      transitionTimingFunction: {
        'out-expo':   'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-cubic':  'cubic-bezier(0.33, 1, 0.68, 1)',
      },
      animation: {
        'fade-in':      'fadeIn 1400ms cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-up':      'fadeUp 1400ms cubic-bezier(0.16,1,0.3,1) forwards',
        'hero-accent':  'heroAccent 1600ms cubic-bezier(0.16,1,0.3,1) 300ms both',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heroAccent: {
          '0%':   { opacity: '0', transform: 'translateY(20px) scale(0.92)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
