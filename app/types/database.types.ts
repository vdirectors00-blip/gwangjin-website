// ===========================================================================
// 광진실업 DB 타입 정의 (supabase/migrations/0001~0003 기준)
// 스키마 변경 시 이 파일도 함께 업데이트
// ===========================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type SpecRow = { label: string; value: string }

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: number
          logo_url: string | null
          footer_tagline: string | null
          copyright_text: string | null
          social_links: Json
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['site_settings']['Row']> & { id?: number }
        Update: Partial<Database['public']['Tables']['site_settings']['Row']>
      }

      company_info: {
        Row: {
          id: number
          company_name: string
          brand_name: string
          address: string | null
          tel: string | null
          email: string | null
          business_hours: string | null
          ceo_name: string | null
          ceo_image_url: string | null
          ceo_message: string | null
          vision_html: string | null
          business_area: string | null
          kakao_map_embed: string | null
          tagline: string | null
          tagline_en: string | null
          founded_year: number | null
          production_lines: number | null
          patent_count: number | null
          product_count: number | null
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['company_info']['Row']> & { id?: number }
        Update: Partial<Database['public']['Tables']['company_info']['Row']>
      }

      hero: {
        Row: {
          id: number
          title: string
          subtitle: string | null
          background_url: string | null
          cta_label: string | null
          cta_link: string | null
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['hero']['Row']> & { id?: number }
        Update: Partial<Database['public']['Tables']['hero']['Row']>
      }

      hero_slides: {
        Row: {
          id: string
          sort_order: number
          media_type: 'image' | 'video'
          media_url: string
          caption: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Partial<Omit<Database['public']['Tables']['hero_slides']['Row'], 'id' | 'created_at' | 'updated_at'>> & {
          media_url: string
        }
        Update: Partial<Database['public']['Tables']['hero_slides']['Row']>
      }

      products: {
        Row: {
          id: string
          slug: string
          sort_order: number
          name: string
          korean_name: string | null
          short_desc: string | null
          long_desc: string | null
          image_url: string | null
          thumb_url: string | null
          spec_table: SpecRow[]
          use_tags: string[]
          trait_lightweight: boolean
          trait_warmth: boolean
          trait_down_alt: boolean
          trait_eco: boolean
          trait_hypoallergenic: boolean
          trait_washable: boolean
          trait_resilient: boolean
          trait_breathable: boolean
          trait_antibacterial: boolean
          is_highlight: boolean
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Partial<Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>> & {
          slug: string
          name: string
        }
        Update: Partial<Database['public']['Tables']['products']['Row']>
      }

      history_items: {
        Row: {
          id: string
          year: string
          sort_order: number
          title: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Omit<Database['public']['Tables']['history_items']['Row'], 'id' | 'created_at' | 'updated_at'>> & {
          year: string
          title: string
        }
        Update: Partial<Database['public']['Tables']['history_items']['Row']>
      }

      certifications: {
        Row: {
          id: string
          sort_order: number
          cert_type: string
          name: string
          cert_number: string | null
          issued_at: string | null
          description: string | null
          image_url: string | null
          category: 'certification' | 'patent'
          created_at: string
          updated_at: string
        }
        Insert: Partial<Omit<Database['public']['Tables']['certifications']['Row'], 'id' | 'created_at' | 'updated_at'>> & {
          cert_type: string
          name: string
        }
        Update: Partial<Database['public']['Tables']['certifications']['Row']>
      }

      process_steps: {
        Row: {
          id: string
          step_number: number
          title: string
          description: string | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Omit<Database['public']['Tables']['process_steps']['Row'], 'id' | 'created_at' | 'updated_at'>> & {
          step_number: number
          title: string
        }
        Update: Partial<Database['public']['Tables']['process_steps']['Row']>
      }

      factory_gallery: {
        Row: {
          id: string
          sort_order: number
          caption: string | null
          image_url: string
          created_at: string
        }
        Insert: Partial<Omit<Database['public']['Tables']['factory_gallery']['Row'], 'id' | 'created_at'>> & {
          image_url: string
        }
        Update: Partial<Database['public']['Tables']['factory_gallery']['Row']>
      }

      strength_sections: {
        Row: {
          id: string
          slug: string
          sort_order: number
          badge: string | null
          title: string
          description: string | null
          image_url: string | null
          accent_color: string | null
          layout_dir: string
          created_at: string
          updated_at: string
        }
        Insert: Partial<Omit<Database['public']['Tables']['strength_sections']['Row'], 'id' | 'created_at' | 'updated_at'>> & {
          slug: string
          title: string
        }
        Update: Partial<Database['public']['Tables']['strength_sections']['Row']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// ===========================================================================
// 단축 타입
// ===========================================================================

export type SiteSettings    = Database['public']['Tables']['site_settings']['Row']
export type CompanyInfo     = Database['public']['Tables']['company_info']['Row']
export type Hero            = Database['public']['Tables']['hero']['Row']
export type HeroSlide       = Database['public']['Tables']['hero_slides']['Row']
export type Product         = Database['public']['Tables']['products']['Row']
export type HistoryItem     = Database['public']['Tables']['history_items']['Row']
export type Certification   = Database['public']['Tables']['certifications']['Row']
export type ProcessStep     = Database['public']['Tables']['process_steps']['Row']
export type FactoryImage    = Database['public']['Tables']['factory_gallery']['Row']
export type StrengthSection = Database['public']['Tables']['strength_sections']['Row']

export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']

// ===========================================================================
// 특성 매트릭스 메타데이터
// ===========================================================================

export type ProductTraitKey =
  | 'trait_lightweight'
  | 'trait_warmth'
  | 'trait_down_alt'
  | 'trait_eco'
  | 'trait_hypoallergenic'
  | 'trait_washable'
  | 'trait_resilient'
  | 'trait_breathable'
  | 'trait_antibacterial'

export const PRODUCT_TRAITS: Array<{ key: ProductTraitKey; label: string }> = [
  { key: 'trait_lightweight',    label: '경량' },
  { key: 'trait_warmth',         label: '보온' },
  { key: 'trait_down_alt',       label: '다운대체' },
  { key: 'trait_eco',            label: '친환경' },
  { key: 'trait_hypoallergenic', label: '저자극' },
  { key: 'trait_washable',       label: '세탁OK' },
  { key: 'trait_resilient',      label: '탄성복원' },
  { key: 'trait_breathable',     label: '흡습통기' },
  { key: 'trait_antibacterial',  label: '항균' },   // 전 제품 공통 특성
]
