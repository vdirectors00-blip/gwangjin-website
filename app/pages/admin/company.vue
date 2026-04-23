<script setup lang="ts">
import type { CompanyInfo } from '~/types/database.types'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: '회사 정보 관리' })

const supabase = useSupabaseClient()

const company = ref<Partial<CompanyInfo>>({})
const loading = ref(true)
const saving = ref(false)
const message = ref<string | null>(null)
const error = ref<string | null>(null)

const load = async () => {
  loading.value = true
  const { data } = await supabase.from('company_info').select('*').eq('id', 1).single()
  if (data) company.value = data
  loading.value = false
}
await load()

const save = async () => {
  saving.value = true
  error.value = null
  message.value = null

  const payload: any = { ...company.value }
  delete payload.id
  delete payload.updated_at

  const { error: e } = await supabase.from('company_info').update(payload).eq('id', 1)
  saving.value = false
  if (e) error.value = e.message
  else {
    message.value = '저장되었습니다.'
    setTimeout(() => { message.value = null }, 3000)
  }
}
</script>

<template>
  <div>
    <AdminPageHeader title="회사 정보 관리" subtitle="모든 페이지에 공통으로 표시되는 회사 정보" />

    <!-- 기본 정보 -->
    <section class="space-y-6 mb-12">
      <h2 class="text-xl font-semibold text-ink-dark">기본 정보</h2>
      <div class="grid grid-cols-2 gap-6">
        <AdminFormField label="회사명" required>
          <AdminInputText v-model="company.company_name" placeholder="주식회사 광진실업" />
        </AdminFormField>
        <AdminFormField label="브랜드명">
          <AdminInputText v-model="company.brand_name" placeholder="COSY FEEL" />
        </AdminFormField>
      </div>
      <AdminFormField label="주소" required>
        <AdminInputText v-model="company.address" placeholder="인천광역시 서구 가정로 58번길 3" />
      </AdminFormField>
      <div class="grid grid-cols-3 gap-6">
        <AdminFormField label="전화">
          <AdminInputText v-model="company.tel" type="tel" placeholder="032-582-4149" />
        </AdminFormField>
        <AdminFormField label="이메일">
          <AdminInputText v-model="company.email" type="email" placeholder="info@gwangjin.co.kr" />
        </AdminFormField>
        <AdminFormField label="영업 시간">
          <AdminInputText v-model="company.business_hours" placeholder="월-금 09:00-18:00" />
        </AdminFormField>
      </div>
    </section>

    <!-- 통계 (Numbers 섹션) -->
    <section class="space-y-6 mb-12">
      <h2 class="text-xl font-semibold text-ink-dark">통계 (홈 Numbers 섹션)</h2>
      <div class="grid grid-cols-4 gap-6">
        <AdminFormField label="설립연도" hint="30+ Years 계산용">
          <AdminInputText v-model="company.founded_year" type="number" placeholder="1994" />
        </AdminFormField>
        <AdminFormField label="생산라인 수">
          <AdminInputText v-model="company.production_lines" type="number" placeholder="5" />
        </AdminFormField>
        <AdminFormField label="특허 수">
          <AdminInputText v-model="company.patent_count" type="number" placeholder="4" />
        </AdminFormField>
        <AdminFormField label="제품 수">
          <AdminInputText v-model="company.product_count" type="number" placeholder="10" />
        </AdminFormField>
      </div>
    </section>

    <!-- 슬로건 -->
    <section class="space-y-6 mb-12">
      <h2 class="text-xl font-semibold text-ink-dark">슬로건 / 카피</h2>
      <AdminFormField label="영문 슬로건" hint="히어로 큰 영문 카피">
        <AdminInputText v-model="company.tagline_en" placeholder="Heritage in Every Fiber" />
      </AdminFormField>
      <AdminFormField label="한글 한 줄 카피">
        <AdminInputText v-model="company.tagline" placeholder="솜 한 가닥에, 30년의 기술" />
      </AdminFormField>
      <AdminFormField label="사업 영역 소개" hint="Home Intro 섹션 본문">
        <AdminInputTextarea v-model="company.business_area" :rows="3" />
      </AdminFormField>
    </section>

    <!-- CEO 정보 -->
    <section class="space-y-6 mb-12">
      <h2 class="text-xl font-semibold text-ink-dark">CEO 정보</h2>
      <div class="grid grid-cols-2 gap-6">
        <AdminFormField label="대표 이름">
          <AdminInputText v-model="company.ceo_name" placeholder="최광은" />
        </AdminFormField>
        <AdminFormField label="대표 사진">
          <AdminImageUploader v-model="company.ceo_image_url" folder="ceo" />
        </AdminFormField>
      </div>
      <AdminFormField label="CEO 인사말 (전문)" hint="About 페이지에 표시. 줄바꿈 가능">
        <AdminInputTextarea v-model="company.ceo_message" :rows="10" />
      </AdminFormField>
    </section>

    <!-- 카카오맵 -->
    <section class="space-y-6 mb-12">
      <h2 class="text-xl font-semibold text-ink-dark">카카오맵 임베드</h2>
      <AdminFormField label="임베드 코드" hint="kakaomap.kakao.com에서 '내 지도 만들기' → '공유' → 'iframe 코드' 복사">
        <AdminInputTextarea v-model="company.kakao_map_embed" :rows="4" placeholder="<iframe src='...'></iframe>" />
      </AdminFormField>
    </section>

    <AdminSaveBar
      :saving="saving"
      :message="message"
      :error="error"
      @save="save"
      @cancel="load"
    />
  </div>
</template>
