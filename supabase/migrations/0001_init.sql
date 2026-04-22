-- =====================================================================
-- 광진실업 (COSY FEEL) — 초기 DB 스키마
-- 실행 위치: Supabase Dashboard → SQL Editor → New Query
-- =====================================================================

-- 0. 확장 모듈
create extension if not exists "uuid-ossp";

-- =====================================================================
-- 1. site_settings (싱글톤): 로고, 푸터, 소셜 등 사이트 전역 설정
-- =====================================================================
create table if not exists public.site_settings (
  id              int primary key default 1,
  logo_url        text,
  footer_tagline  text,
  copyright_text  text,
  social_links    jsonb default '{}'::jsonb,
  updated_at      timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

-- =====================================================================
-- 2. company_info (싱글톤): 주소/전화/이메일/CEO 인사말 등
-- =====================================================================
create table if not exists public.company_info (
  id               int primary key default 1,
  company_name     text not null default '주식회사 광진실업',
  brand_name       text not null default 'COSY FEEL',
  address          text,
  tel              text,
  email            text,
  business_hours   text,
  ceo_name         text,
  ceo_image_url    text,
  ceo_message      text,
  vision_html      text,
  business_area    text,
  kakao_map_embed  text,
  updated_at       timestamptz not null default now(),
  constraint company_info_singleton check (id = 1)
);

-- =====================================================================
-- 3. hero (싱글톤): 메인 페이지 히어로 배너
-- =====================================================================
create table if not exists public.hero (
  id            int primary key default 1,
  title         text not null default 'Nature Meets Innovation',
  subtitle      text default 'Premium Filling Materials for a Comfortable Tomorrow',
  background_url text,
  cta_label     text default 'Contact Us',
  cta_link      text default '/contact',
  updated_at    timestamptz not null default now(),
  constraint hero_singleton check (id = 1)
);

-- =====================================================================
-- 4. products: 제품 라인업 (Conju, Polarfil ... + 추가)
-- =====================================================================
create table if not exists public.products (
  id              uuid primary key default uuid_generate_v4(),
  slug            text unique not null,
  sort_order      int not null default 0,
  name            text not null,
  korean_name     text,
  short_desc      text,
  long_desc       text,
  image_url       text,
  thumb_url       text,
  spec_table      jsonb default '[]'::jsonb,  -- [{label, value}]
  use_tags        text[] default '{}',
  -- 특성 매트릭스 8개 축
  trait_lightweight   boolean default false,  -- 경량
  trait_warmth        boolean default false,  -- 보온
  trait_down_alt      boolean default false,  -- 다운대체
  trait_eco           boolean default false,  -- 친환경
  trait_hypoallergenic boolean default false, -- 저자극
  trait_washable      boolean default false,  -- 세탁OK
  trait_resilient     boolean default false,  -- 탄성복원
  trait_breathable    boolean default false,  -- 흡습통기
  is_highlight        boolean default false,  -- 메인 하이라이트 카드 노출 여부
  is_published        boolean default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists products_sort_idx on public.products(sort_order);
create index if not exists products_published_idx on public.products(is_published);

-- =====================================================================
-- 5. history_items: 회사 연혁 타임라인
-- =====================================================================
create table if not exists public.history_items (
  id          uuid primary key default uuid_generate_v4(),
  year        text not null,         -- '1995', '2024.05' 등 자유 형식
  sort_order  int not null default 0,
  title       text not null,
  description text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists history_sort_idx on public.history_items(sort_order);

-- =====================================================================
-- 6. certifications: 인증서 (OEKO-TEX, GRS 등)
-- =====================================================================
create table if not exists public.certifications (
  id              uuid primary key default uuid_generate_v4(),
  sort_order      int not null default 0,
  cert_type       text not null,         -- 'OEKO-TEX', 'GRS' 등
  name            text not null,
  cert_number     text,
  issued_at       text,                  -- '2023.10' 등 자유 형식
  description     text,
  image_url       text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- =====================================================================
-- 7. process_steps: 생산 공정 단계
-- =====================================================================
create table if not exists public.process_steps (
  id          uuid primary key default uuid_generate_v4(),
  step_number int not null,
  title       text not null,
  description text,
  image_url   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists process_step_idx on public.process_steps(step_number);

-- =====================================================================
-- 8. factory_gallery: 공장/생산시설 이미지 갤러리
-- =====================================================================
create table if not exists public.factory_gallery (
  id          uuid primary key default uuid_generate_v4(),
  sort_order  int not null default 0,
  caption     text,
  image_url   text not null,
  created_at  timestamptz not null default now()
);

-- =====================================================================
-- 9. strength_sections: Strength 페이지 섹션 (OEKO-TEX, GRS)
-- =====================================================================
create table if not exists public.strength_sections (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,    -- 'oekotex', 'grs'
  sort_order    int not null default 0,
  badge         text,                    -- 'OEKO-TEX Standard 100'
  title         text not null,
  description   text,
  image_url     text,
  accent_color  text,                    -- '#FFD700', '#2E7D32'
  layout_dir    text default 'left',     -- 'left' | 'right' (이미지 위치)
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- =====================================================================
-- updated_at 자동 갱신 트리거
-- =====================================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
declare
  t text;
begin
  for t in
    select unnest(array[
      'site_settings','company_info','hero','products',
      'history_items','certifications','process_steps','strength_sections'
    ])
  loop
    execute format('drop trigger if exists trg_%1$s_updated on public.%1$s;', t);
    execute format(
      'create trigger trg_%1$s_updated before update on public.%1$s
       for each row execute function public.set_updated_at();',
      t
    );
  end loop;
end $$;

-- =====================================================================
-- 싱글톤 행 시드
-- =====================================================================
insert into public.site_settings (id) values (1) on conflict (id) do nothing;
insert into public.company_info (id) values (1) on conflict (id) do nothing;
insert into public.hero (id) values (1) on conflict (id) do nothing;

-- =====================================================================
-- RLS (Row Level Security)
--   - 공개 페이지: anon이 SELECT 가능
--   - 관리자 페이지: 인증된 사용자(authenticated)만 INSERT/UPDATE/DELETE 가능
-- =====================================================================
alter table public.site_settings     enable row level security;
alter table public.company_info      enable row level security;
alter table public.hero              enable row level security;
alter table public.products          enable row level security;
alter table public.history_items     enable row level security;
alter table public.certifications    enable row level security;
alter table public.process_steps     enable row level security;
alter table public.factory_gallery   enable row level security;
alter table public.strength_sections enable row level security;

-- 모든 테이블: 익명 사용자도 SELECT 허용 (공개 페이지에서 조회용)
do $$
declare
  t text;
begin
  for t in
    select unnest(array[
      'site_settings','company_info','hero','products',
      'history_items','certifications','process_steps','factory_gallery','strength_sections'
    ])
  loop
    execute format('drop policy if exists "public_read_%1$s" on public.%1$s;', t);
    execute format(
      'create policy "public_read_%1$s" on public.%1$s
       for select using (true);',
      t
    );

    execute format('drop policy if exists "auth_write_%1$s" on public.%1$s;', t);
    execute format(
      'create policy "auth_write_%1$s" on public.%1$s
       for all to authenticated using (true) with check (true);',
      t
    );
  end loop;
end $$;

-- =====================================================================
-- Storage 버킷 (이미지 업로드용) — Dashboard에서 수동 생성 권장
-- =====================================================================
-- Supabase Dashboard → Storage → New Bucket
--   1) bucket name: 'images'
--   2) Public bucket: ON  (공개 접근 가능)
--   3) File size limit: 10 MB
--   4) Allowed MIME types: image/jpeg, image/png, image/webp, image/avif
--
-- Storage 정책:
--   - SELECT (다운로드): public 허용 (Public bucket이면 자동)
--   - INSERT/UPDATE/DELETE: authenticated 사용자만 허용
