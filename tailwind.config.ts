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
          deep:     '#DCD0B0',       // Footer 전용 — paper-warm보다 한 단계 진한 베이지 (페이지 본문과 명확 분리)
        },
        // 다크 톤 — paper와 어우러지는 mid-brown (이전보다 살짝 옅게, 부드러운 인상)
        dark: {
          DEFAULT:  '#3D3127',       // mid brown — Trust·Contact·Hero 등 메인 다크 섹션
          soft:     '#473A2F',
          mid:      '#544537',
          card:     '#615040',
          deep:     '#241C13',       // 푸터용 deep coffee (가장 어두움 유지)
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
        // 포인트 — bronze 단일 액센트로 통일
        accent: {
          bronze:        '#8B7355',
          'bronze-soft': '#B59B7A',
          // 옛 eco 토큰을 bronze로 alias (잔존 코드 호환)
          eco:           '#8B7355',
          'eco-soft':    '#B59B7A',
        },
        // ─── Admin 패널 전용 alias (옛 토큰 호환) ───
        // admin은 v3 톤이 아닌 자체 라이트 패널 디자인 유지
        bg: {
          DEFAULT:      '#1A1814',     // = dark.DEFAULT (admin 사이드바)
          'light-soft': '#F2EEE6',     // = paper.soft (admin 본문)
          mid:          '#22201B',     // = dark.soft
        },
        'ink-dark': {
          DEFAULT: '#1A1814',          // = ink.DEFAULT
          muted:   '#7A7367',          // = ink.muted
          faint:   '#A8A192',          // = ink.faint
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
