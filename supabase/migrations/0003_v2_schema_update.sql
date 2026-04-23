-- =====================================================================
-- v2 스키마 업데이트
--   1. certifications에 category 컬럼 추가 ('certification' | 'patent')
--   2. hero_slides 테이블 신설 (히어로 이미지/영상 여러 장 crossfade용)
--   3. company_info에 mission_statement(역발상 카피용) 컬럼 추가
-- =====================================================================

-- ----- 1. certifications.category --------------------------------------
alter table public.certifications
  add column if not exists category text not null default 'certification';
-- 'certification' (ISO 등) | 'patent' (특허)

create index if not exists certifications_category_idx
  on public.certifications(category);

-- ----- 2. hero_slides --------------------------------------------------
create table if not exists public.hero_slides (
  id          uuid primary key default uuid_generate_v4(),
  sort_order  int not null default 0,
  media_type  text not null default 'image',  -- 'image' | 'video'
  media_url   text not null,
  caption     text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists hero_slides_sort_idx on public.hero_slides(sort_order);
create index if not exists hero_slides_active_idx on public.hero_slides(is_active);

-- 트리거 (updated_at 자동 갱신)
drop trigger if exists trg_hero_slides_updated on public.hero_slides;
create trigger trg_hero_slides_updated
  before update on public.hero_slides
  for each row execute function public.set_updated_at();

-- RLS
alter table public.hero_slides enable row level security;
drop policy if exists "public_read_hero_slides" on public.hero_slides;
create policy "public_read_hero_slides"
  on public.hero_slides for select using (true);
drop policy if exists "auth_write_hero_slides" on public.hero_slides;
create policy "auth_write_hero_slides"
  on public.hero_slides for all
  to authenticated using (true) with check (true);

-- ----- 3. company_info 추가 컬럼 ---------------------------------------
alter table public.company_info
  add column if not exists tagline text;            -- 히어로 한 줄 카피
alter table public.company_info
  add column if not exists tagline_en text;         -- 영문 슬로건 ("Heritage in Every Fiber")
alter table public.company_info
  add column if not exists founded_year int;        -- 1994
alter table public.company_info
  add column if not exists production_lines int;    -- 5
alter table public.company_info
  add column if not exists patent_count int;        -- 4
alter table public.company_info
  add column if not exists product_count int;       -- 10

-- 시드 값 (자료 기반)
update public.company_info
   set company_name = '주식회사 광진실업',
       brand_name   = 'COSY FEEL',
       address      = '인천광역시 서구 가정로 58번길 3 (가좌동)',
       tel          = '032-582-4149',
       email        = 'info@gwangjin.co.kr',
       business_hours = '월-금 09:00-18:00',
       ceo_name     = '최광은',
       founded_year = 1994,
       production_lines = 5,
       patent_count = 4,
       product_count = 10,
       tagline_en   = 'Heritage in Every Fiber',
       tagline      = '솜 한 가닥에, 30년의 기술',
       business_area = '부직포 및 제면 분야에서 여러 해 동안 축적해온 기술과 노하우를 바탕으로 여러 브랜드의 이불솜 및 침대 부자재를 생산하고 있습니다.',
       ceo_message  = E'안녕하세요. COSY FEEL 입니다.\n\n(주)광진실업은 부직포 및 제면 분야에서 여러 해 동안 축적해온 기술과 노하우를 바탕으로 여러 브랜드의 이불솜 및 침대 부자재를 생산하고 있는 업체입니다.\n\n우수하고 깨끗한 제품과 고객에 대한 신뢰를 바탕으로 침장업계 품질을 위해 힘쓰고, 최고의 설비와 풍부한 기술과 경험을 바탕으로 귀사에 더욱더 좋은 제품을 제공하기 위해 언제나 노력하고 있습니다.\n\n미래지향적인 생산 설비와 시스템을 기반으로 고객에게 다가가 항상 노력하고 발전하는 기업이 될 수 있도록 최선을 다해 성심껏 보답하겠습니다.\n\n감사합니다.'
 where id = 1;

-- 시드: 인증서 4건 + 특허 4건
insert into public.certifications (sort_order, cert_type, name, cert_number, issued_at, description, category)
values
  (1, 'ISO 9001',        '품질경영시스템 인증',     'KS Q ISO 9001',   '2023.05', '국제 품질경영시스템 표준 인증', 'certification'),
  (2, 'ISO 14001',       '환경경영시스템 인증',     'KSI ISO 14001',   '2023.05', '국제 환경경영시스템 표준 인증', 'certification'),
  (3, '한국인증원',       'Q E R 인증 (국문/영문)', null,              '2025.04', '품질·환경·신뢰성 통합 인증', 'certification'),
  (4, '이노비즈(Inno-Biz)', '기술혁신형 중소기업 인증', null,            '2024.03', '기술 혁신성과 사업화 능력 검증', 'certification'),
  (5, '특허', '침구용 목화솜 제조장치',           '제10-1138980호', '2012.04', '천연 목화솜 가공 기술', 'patent'),
  (6, '특허', '자동 점선 커팅장치',                '제10-1138979호', '2012.04', '효율적 원단 절단 자동화 기술', 'patent'),
  (7, '특허', '자연섬유 줄누비직포로 이루어진 이불', '제10-1169060호', '2012.07', '자연섬유 직조 이불 제조법', 'patent'),
  (8, '특허', '볼륨 내구성을 갖는 패딩 제조방법',   '제10-0994645호', '2010.11', '볼륨감과 내구성을 동시에 갖춘 패딩 기술', 'patent')
on conflict do nothing;

-- 시드: 연혁 19개 (자료 기반)
insert into public.history_items (year, sort_order, title, description)
values
  ('1994.05', 1,  '광진실업 설립',                    null),
  ('1999.05', 2,  '2라인 증설',                        null),
  ('2001.03', 3,  '광진빌딩 신축',                    null),
  ('2001.06', 4,  '광진실업 광진빌딩으로 이전',      null),
  ('2010.11', 5,  '특허 등록 — 볼륨 내구성 패딩',    '제10-0994645호'),
  ('2011.05', 6,  '목화펀칭 라인 증설',              null),
  ('2011.08', 7,  '삼광 설립',                        '침구류 제조'),
  ('2012.01', 8,  '법인 전환 — ㈜광진실업',          null),
  ('2012.04', 9,  '특허 등록 — 침구용 목화솜 제조장치', '제10-1138980호'),
  ('2012.04', 10, '특허 등록 — 자동 점선 커팅장치',  '제10-1138979호'),
  ('2012.05', 11, '3라인 증설',                        null),
  ('2012.07', 12, '특허 등록 — 자연섬유 줄누비직포 이불', '제10-1169060호'),
  ('2015.01', 13, '상호 변경 — ㈜K&J Textile',       null),
  ('2015.04', 14, '브랜드 출시 — COSY FEEL',         null),
  ('2015.09', 15, '인천유망중소기업 선정',           null),
  ('2019.01', 16, '4라인 증설',                        null),
  ('2021.03', 17, '5라인 증설',                        null),
  ('2024.01', 18, '상호 복귀 — ㈜광진실업',          null),
  ('2024.03', 19, '기술혁신형 중소기업 인증 (이노비즈)', null)
on conflict do nothing;

-- 시드: 생산공정 6단계 (공정사진 파일명 기반)
insert into public.process_steps (step_number, title, description)
values
  (1, '리저브',   '원료 보관 및 배합 준비'),
  (2, '카드기',   '섬유 개섬 및 정렬'),
  (3, '성형기',   '균일한 두께로 충전재 형성'),
  (4, '건조기',   '안정적 형태 유지를 위한 건조 공정'),
  (5, '냉각기',   '품질 안정화 냉각 처리'),
  (6, '와인딩',   '롤 형태 권취 및 출하 준비')
on conflict do nothing;
