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
        // 라이트 (메인)
        paper: {
          DEFAULT: '#FAF8F4',     // 메인 배경 — 따뜻한 오프화이트
          soft:    '#F2EEE6',     // 보조 배경
          warm:    '#EDE6D8',     // 카드/구분 — HAUS OF SONG 베이지
          line:    '#D9D2C0',     // 구분선
        },
        // 다크 (포인트)
        dark: {
          DEFAULT: '#1A1814',     // 따뜻한 차콜
          soft:    '#22201B',
          mid:     '#2A2823',
          card:    '#322F29',
        },
        // 텍스트
        ink: {
          DEFAULT:    '#1A1814',     // 라이트 위 본문
          dim:        '#4A453E',     // 라이트 위 보조
          muted:      '#7A7367',     // 라이트 위 캡션
          faint:      '#A8A192',     // 라이트 위 약한
          inverse:    '#FAF8F4',     // 다크 위 본문
          'inverse-dim':   '#D4CDC0',
          'inverse-muted': '#9A9486',
          'inverse-faint': '#5E584D',
        },
        // 포인트
        accent: {
          bronze: '#8B7355',          // 헤리티지 브론즈
          'bronze-soft': '#B59B7A',
          eco:    '#5F7E4E',          // subtle 에코 그린
          'eco-soft': '#8BA275',
        },
      },
      fontFamily: {
        sans:    ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Pretendard', 'system-ui', 'sans-serif'],
        serif:   ['Noto Serif KR', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        container: '1440px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade-in':  'fadeIn 1s ease-out forwards',
        'fade-up':  'fadeUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
