# 광진실업 (COSY FEEL) 홈페이지

B2B 충전재 브랜드 광진실업 / COSY FEEL 공식 홈페이지.

## 기술 스택

- **Frontend**: Nuxt 3 (Vue 3 + TypeScript)
- **Styling**: Tailwind CSS (다크모드 기반 + 골드/에코 포인트)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Hosting**: GitHub Pages (Static Site Generation)

## 개발 실행

```bash
npm install
cp .env.example .env   # Supabase 키 입력
npm run dev            # 개발서버 (http://localhost:3000)
npm run generate       # 정적 사이트 빌드
```

## 폴더 구조

```
gwangjin-website/
├─ app/
│  ├─ pages/              # 라우트 (파일명 = URL)
│  ├─ components/
│  │  ├─ common/          # 공통 컴포넌트 (헤더/푸터 등)
│  │  └─ admin/           # 관리자 전용 컴포넌트
│  ├─ layouts/            # 페이지 레이아웃 (default, admin)
│  ├─ composables/        # 재사용 로직 (useProducts 등)
│  ├─ middleware/         # 라우트 가드 (auth 등)
│  ├─ assets/css/         # Tailwind main.css
│  └─ types/              # TypeScript 타입
├─ supabase/migrations/   # DB 스키마 SQL
├─ public/                # 정적 자산 (favicon 등)
└─ docs/                  # 프로젝트 문서
```

## Supabase 초기 설정

1. Supabase 콘솔에서 새 프로젝트 생성
2. **SQL Editor**에서 `supabase/migrations/0001_init.sql` 실행
3. **Storage**에서 `images` 버킷 생성 (Public bucket, 10MB 제한)
4. **Authentication** → 관리자 계정 생성 (Email + Password)
5. Project Settings → API → URL과 anon key를 `.env`에 복사

## 배포 (GitHub Pages)

GitHub Actions가 push 시점에 자동으로 빌드 → `gh-pages` 브랜치에 배포.
