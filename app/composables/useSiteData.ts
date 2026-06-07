// ===========================================================================
// 공개 페이지 데이터 composable — 정적 데이터 기반 (Supabase 제거)
// 콘텐츠 수정은 app/data/products.ts, app/data/site.ts 를 편집하고 재배포(빌드).
// 반환 형태는 기존과 동일( { data } )하여 페이지 코드는 변경 불필요.
// ===========================================================================
import { products as PRODUCTS } from '~/data/products'
import {
  companyInfo,
  siteSettings,
  certifications as CERTS,
  historyItems as HISTORY,
  processSteps as PROCESS,
} from '~/data/site'

// ----- 싱글톤 ----------------------------------------------------------------

export const useCompanyInfo = () => ({ data: ref(companyInfo) })
export const useSiteSettings = () => ({ data: ref(siteSettings) })

// hero/hero_slides는 HomeHeroChapters에서 정적 처리 — 데이터 미사용
export const useHero = () => ({ data: ref(null) })
export const useHeroSlides = () => ({ data: ref([] as never[]) })

// ----- 리스트 ----------------------------------------------------------------

export const useProducts = (opts?: { onlyPublished?: boolean; onlyHighlight?: boolean }) => {
  let list = PRODUCTS.slice()
  if (opts?.onlyPublished !== false) list = list.filter(p => p.is_published)
  if (opts?.onlyHighlight) list = list.filter(p => p.is_highlight)
  list.sort((a, b) => a.sort_order - b.sort_order)
  return { data: ref(list) }
}

export const useProduct = (slug: string) => ({
  data: ref(PRODUCTS.find(p => p.slug === slug) ?? null),
})

export const useHistoryItems = () => ({
  data: ref([...HISTORY].sort((a, b) => a.sort_order - b.sort_order)),
})

export const useCertifications = (category?: 'certification' | 'patent') => ({
  data: ref(
    (category ? CERTS.filter(c => c.category === category) : CERTS)
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order),
  ),
})

export const useProcessSteps = () => ({
  data: ref([...PROCESS].sort((a, b) => a.step_number - b.step_number)),
})

export const useFactoryGallery = () => ({ data: ref([] as never[]) })

export const useStrengthSections = () => ({ data: ref([] as never[]) })
