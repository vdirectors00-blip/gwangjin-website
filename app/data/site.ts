// ===========================================================================
// 사이트 정적 데이터 (구 Supabase 0003 시드 기반)
// 회사정보 / 사이트설정 / 인증·특허 / 연혁 / 생산공정
// 내용 수정 시 이 파일을 편집하고 재배포(빌드)하면 사이트에 반영됩니다.
// ===========================================================================
import type {
  CompanyInfo,
  SiteSettings,
  Certification,
  HistoryItem,
  ProcessStep,
} from '~/types/database.types'

export const companyInfo: CompanyInfo = {
  id: 1,
  company_name: '주식회사 광진실업',
  brand_name: 'COSY FEEL',
  address: '인천광역시 서구 가정로 58번길 3 (가좌동)',
  tel: '032-582-4149',
  email: 'kjin137@naver.com',
  business_hours: '월–금 08:30 - 17:30',
  ceo_name: '최광은',
  ceo_image_url: null,
  ceo_message:
    '안녕하세요. COSY FEEL 입니다.\n\n(주)광진실업은 부직포 및 제면 분야에서 여러 해 동안 축적해온 기술과 노하우를 바탕으로 여러 브랜드의 이불솜 및 침대 부자재를 생산하고 있는 업체입니다.\n\n우수하고 깨끗한 제품과 고객에 대한 신뢰를 바탕으로 침장업계 품질을 위해 힘쓰고, 최고의 설비와 풍부한 기술과 경험을 바탕으로 귀사에 더욱더 좋은 제품을 제공하기 위해 언제나 노력하고 있습니다.\n\n미래지향적인 생산 설비와 시스템을 기반으로 고객에게 다가가 항상 노력하고 발전하는 기업이 될 수 있도록 최선을 다해 성심껏 보답하겠습니다.\n\n감사합니다.',
  vision_html: null,
  business_area:
    '부직포 및 제면 분야에서 여러 해 동안 축적해온 기술과 노하우를 바탕으로 여러 브랜드의 이불솜 및 침대 부자재를 생산하고 있습니다.',
  kakao_map_embed: `<div id="daumRoughmapContainer1780647117907" class="root_daum_roughmap root_daum_roughmap_landing"></div>
<script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>
<script charset="UTF-8">
    new daum.roughmap.Lander({
        "timestamp" : "1780647117907",
        "key" : "2d76eyo6b3ji",
        "mapWidth" : "800",
        "mapHeight" : "500"
    }).render();
</script>`,
  tagline: '솜 한 가닥에, 30년의 기술',
  tagline_en: 'Heritage in Every Fiber',
  founded_year: 1994,
  production_lines: 5,
  patent_count: 4,
  product_count: 12,
  updated_at: '',
}

export const siteSettings: SiteSettings = {
  id: 1,
  logo_url: null,
  footer_tagline: '솜 한 가닥에, 삼십 년의 기술.',
  copyright_text: '© 2026 주식회사 광진실업 · All Rights Reserved.',
  social_links: {},
  updated_at: '',
}

const cert = (
  sort_order: number,
  cert_type: string,
  name: string,
  cert_number: string | null,
  issued_at: string | null,
  description: string,
  category: 'certification' | 'patent',
): Certification => ({
  id: `cert-${sort_order}`,
  sort_order,
  cert_type,
  name,
  cert_number,
  issued_at,
  description,
  image_url: null,
  category,
  created_at: '',
  updated_at: '',
})

export const certifications: Certification[] = [
  cert(1, 'ISO 9001', '품질경영시스템 인증', 'KS Q ISO 9001', '2023.05', '국제 품질경영시스템 표준 인증', 'certification'),
  cert(2, 'ISO 14001', '환경경영시스템 인증', 'KSI ISO 14001', '2023.05', '국제 환경경영시스템 표준 인증', 'certification'),
  cert(3, '한국인증원', 'Q E R 인증 (국문/영문)', null, '2025.04', '품질·환경·신뢰성 통합 인증', 'certification'),
  cert(4, '이노비즈(Inno-Biz)', '기술혁신형 중소기업 인증', null, '2024.03', '기술 혁신성과 사업화 능력 검증', 'certification'),
  cert(5, '특허', '침구용 목화솜 제조장치', '제10-1138980호', '2012.04', '천연 목화솜 가공 기술', 'patent'),
  cert(6, '특허', '자동 점선 커팅장치', '제10-1138979호', '2012.04', '효율적 원단 절단 자동화 기술', 'patent'),
  cert(7, '특허', '자연섬유 줄누비직포로 이루어진 이불', '제10-1169060호', '2012.07', '자연섬유 직조 이불 제조법', 'patent'),
  cert(8, '특허', '볼륨 내구성을 갖는 패딩 제조방법', '제10-0994645호', '2010.11', '볼륨감과 내구성을 동시에 갖춘 패딩 기술', 'patent'),
]

const hist = (year: string, sort_order: number, title: string, description: string | null): HistoryItem => ({
  id: `hist-${sort_order}`, year, sort_order, title, description, created_at: '', updated_at: '',
})

export const historyItems: HistoryItem[] = [
  hist('1994.05', 1, '광진실업 설립', null),
  hist('1999.05', 2, '2라인 증설', null),
  hist('2001.03', 3, '광진빌딩 신축', null),
  hist('2001.06', 4, '광진실업 광진빌딩으로 이전', null),
  hist('2010.11', 5, '특허 등록 — 볼륨 내구성 패딩', '제10-0994645호'),
  hist('2011.05', 6, '목화펀칭 라인 증설', null),
  hist('2011.08', 7, '삼광 설립', '침구류 제조'),
  hist('2012.01', 8, '법인 전환 — ㈜광진실업', null),
  hist('2012.04', 9, '특허 등록 — 침구용 목화솜 제조장치', '제10-1138980호'),
  hist('2012.04', 10, '특허 등록 — 자동 점선 커팅장치', '제10-1138979호'),
  hist('2012.05', 11, '3라인 증설', null),
  hist('2012.07', 12, '특허 등록 — 자연섬유 줄누비직포 이불', '제10-1169060호'),
  hist('2015.01', 13, '상호 변경 — ㈜K&J Textile', null),
  hist('2015.04', 14, '브랜드 출시 — COSY FEEL', null),
  hist('2015.09', 15, '인천유망중소기업 선정', null),
  hist('2019.01', 16, '4라인 증설', null),
  hist('2021.03', 17, '5라인 증설', null),
  hist('2024.01', 18, '상호 복귀 — ㈜광진실업', null),
  hist('2024.03', 19, '기술혁신형 중소기업 인증 (이노비즈)', null),
]

const step = (step_number: number, title: string, description: string): ProcessStep => ({
  id: `step-${step_number}`, step_number, title, description, image_url: null, created_at: '', updated_at: '',
})

export const processSteps: ProcessStep[] = [
  step(1, '리저브', '원료 보관 및 배합 준비'),
  step(2, '카드기', '섬유 개섬 및 정렬'),
  step(3, '성형기', '균일한 두께로 충전재 형성'),
  step(4, '건조기', '안정적 형태 유지를 위한 건조 공정'),
  step(5, '냉각기', '품질 안정화 냉각 처리'),
  step(6, '와인딩', '롤 형태 권취 및 출하 준비'),
]
