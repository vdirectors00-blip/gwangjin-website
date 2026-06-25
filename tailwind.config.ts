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
        // 라이트 톤 — 원래 베이지 단계 복원
        paper: {
          DEFAULT:  '#FAF8F4',       // 가장 연한 베이지 (거의 흰) — 사용처에서 bg-white로 직접 교체
          soft:     '#F2EEE6',       // 연한 베이지
          warm:     '#EDE6D8',       // 더 진한 베이지
          line:     '#D9D2C0',       // 라인
          'line-soft': '#E4DCC9',
          deep:     '#F2EEE6',       // Footer 전용 — 연한 베이지
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
        // 2026-06-09 전체 Pretendard 통일 — serif/mono 도 Pretendard 스택으로.
        // 되돌리려면 아래 두 줄을 원복(주석 처리된 원본 값) + app.vue 의 Noto Serif KR·JetBrains Mono CDN 링크는 그대로 유지 중.
        //   serif: ['Noto Serif KR', 'Times New Roman', 'serif'],
        //   mono:  ['JetBrains Mono', 'SF Mono', 'ui-monospace', 'monospace'],
        serif:   ['Pretendard Variable', 'Pretendard', 'Apple SD Gothic Neo', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['Pretendard Variable', 'Pretendard', 'Apple SD Gothic Neo', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(44px, 6vw, 88px)',   { lineHeight: '1.04', letterSpacing: '-0.02em'  }],
        'display-lg': ['clamp(38px, 5vw, 68px)',   { lineHeight: '1.08', letterSpacing: '-0.02em'  }],
        'display-md': ['clamp(32px, 4vw, 50px)',   { lineHeight: '1.14', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(28px, 3.2vw, 42px)', { lineHeight: '1.3',  letterSpacing: '-0.01em'  }],
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
