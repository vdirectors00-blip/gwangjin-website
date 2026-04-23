// ===========================================================================
// 공개 페이지에서 DB 데이터를 fetch하는 composable 모음
// useAsyncData로 SSR/SSG에서 모두 동작 (정적 빌드 시 빌드 시점에 데이터 주입)
// ===========================================================================

import type {
  CompanyInfo,
  Hero,
  HeroSlide,
  SiteSettings,
  Product,
  HistoryItem,
  Certification,
  ProcessStep,
  FactoryImage,
  StrengthSection,
} from '~/types/database.types'

// ----- 싱글톤 ----------------------------------------------------------------

export const useHero = () => {
  const supabase = useSupabaseClient()
  return useAsyncData('hero', async () => {
    const { data, error } = await supabase
      .from('hero')
      .select('*')
      .eq('id', 1)
      .single()
    if (error) throw error
    return data as Hero
  })
}

export const useHeroSlides = () => {
  const supabase = useSupabaseClient()
  return useAsyncData('hero_slides', async () => {
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    if (error) throw error
    return (data ?? []) as HeroSlide[]
  })
}

export const useCompanyInfo = () => {
  const supabase = useSupabaseClient()
  return useAsyncData('company_info', async () => {
    const { data, error } = await supabase
      .from('company_info')
      .select('*')
      .eq('id', 1)
      .single()
    if (error) throw error
    return data as CompanyInfo
  })
}

export const useSiteSettings = () => {
  const supabase = useSupabaseClient()
  return useAsyncData('site_settings', async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single()
    if (error) throw error
    return data as SiteSettings
  })
}

// ----- 리스트 ----------------------------------------------------------------

export const useProducts = (opts?: { onlyPublished?: boolean; onlyHighlight?: boolean }) => {
  const supabase = useSupabaseClient()
  const key = `products:${opts?.onlyPublished ?? true}:${opts?.onlyHighlight ?? false}`
  return useAsyncData(key, async () => {
    let q = supabase.from('products').select('*').order('sort_order', { ascending: true })
    if (opts?.onlyPublished !== false) q = q.eq('is_published', true)
    if (opts?.onlyHighlight) q = q.eq('is_highlight', true)
    const { data, error } = await q
    if (error) throw error
    return (data ?? []) as Product[]
  })
}

export const useProduct = (slug: string) => {
  const supabase = useSupabaseClient()
  return useAsyncData(`product:${slug}`, async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data as Product
  })
}

export const useHistoryItems = () => {
  const supabase = useSupabaseClient()
  return useAsyncData('history_items', async () => {
    const { data, error } = await supabase
      .from('history_items')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) throw error
    return (data ?? []) as HistoryItem[]
  })
}

export const useCertifications = (category?: 'certification' | 'patent') => {
  const supabase = useSupabaseClient()
  const key = `certifications:${category || 'all'}`
  return useAsyncData(key, async () => {
    let q = supabase.from('certifications').select('*').order('sort_order', { ascending: true })
    if (category) q = q.eq('category', category)
    const { data, error } = await q
    if (error) throw error
    return (data ?? []) as Certification[]
  })
}

export const useProcessSteps = () => {
  const supabase = useSupabaseClient()
  return useAsyncData('process_steps', async () => {
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .order('step_number', { ascending: true })
    if (error) throw error
    return (data ?? []) as ProcessStep[]
  })
}

export const useFactoryGallery = () => {
  const supabase = useSupabaseClient()
  return useAsyncData('factory_gallery', async () => {
    const { data, error } = await supabase
      .from('factory_gallery')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) throw error
    return (data ?? []) as FactoryImage[]
  })
}

export const useStrengthSections = () => {
  const supabase = useSupabaseClient()
  return useAsyncData('strength_sections', async () => {
    const { data, error } = await supabase
      .from('strength_sections')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) throw error
    return (data ?? []) as StrengthSection[]
  })
}
