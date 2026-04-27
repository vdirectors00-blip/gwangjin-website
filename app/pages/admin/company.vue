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
    <AdminPageHeader
      title="회사 정보 관리"
      subtitle="모든 페이지에 공통으로 표시되는 회사 정보 (Footer · Contact · 메인 통계 · About 인사말)"
    />

    <!-- ─── 기본 정보 ─── -->
    <section class="space-y-6 mb-12">
      <h2 class="text-xl font-semibold text-ink-dark">기본 정보</h2>
      <p class="text-sm text-ink-dark-muted">표시 위치: Footer · Contact 페이지 · 메인 Contact 섹션</p>

      <AdminFormField label="회사명" required hint="Contact 페이지 좌측 사이드바에 표시">
        <AdminInputText v-model="company.company_name" placeholder="주식회사 광진실업" />
      </AdminFormField>

      <AdminFormField label="주소" required hint="Footer · Contact 페이지 Visit 섹션 · 카카오맵 검색 쿼리">
        <AdminInputText v-model="company.address" placeholder="인천광역시 서구 가정로 58번길 3" />
      </AdminFormField>

      <div class="grid grid-cols-3 gap-6">
        <AdminFormField label="전화" hint="Footer · Contact · 메인 Contact 섹션">
          <AdminInputText v-model="company.tel" type="tel" placeholder="032-582-4149" />
        </AdminFormField>
        <AdminFormField label="이메일" hint="Footer · Contact · 문의 폼 수신 주소">
          <AdminInputText v-model="company.email" type="email" placeholder="info@gwangjin.co.kr" />
        </AdminFormField>
        <AdminFormField label="영업 시간" hint="Footer · Contact 좌측 사이드바">
          <AdminInputText v-model="company.business_hours" placeholder="월-금 09:00-18:00" />
        </AdminFormField>
      </div>
    </section>

    <!-- ─── 통계 숫자 ─── -->
    <section class="space-y-6 mb-12">
      <h2 class="text-xl font-semibold text-ink-dark">통계 숫자</h2>
      <p class="text-sm text-ink-dark-muted">표시 위치: 메인 페이지 Intro 섹션의 4개 숫자 박스 (설립 / 생산라인 / 제품군 / 등록 특허)</p>

      <div class="grid grid-cols-3 gap-6">
        <AdminFormField label="설립연도" hint="메인 Intro의 '설립' 숫자 + Footer 'Since YYYY'">
          <AdminInputText v-model="company.founded_year" type="number" placeholder="1994" />
        </AdminFormField>
        <AdminFormField label="생산라인 수" hint="메인 Intro '생산 라인' 숫자 · Philosophy 페이지 stat">
          <AdminInputText v-model="company.production_lines" type="number" placeholder="5" />
        </AdminFormField>
        <AdminFormField label="등록 특허 수" hint="메인 Intro '등록 특허' 숫자">
          <AdminInputText v-model="company.patent_count" type="number" placeholder="4" />
        </AdminFormField>
      </div>
    </section>

    <!-- ─── CEO 인사말 ─── -->
    <section class="space-y-6 mb-12">
      <h2 class="text-xl font-semibold text-ink-dark">CEO 인사말</h2>
      <p class="text-sm text-ink-dark-muted">표시 위치: About 페이지 (CEO 인사말 본문)</p>

      <div class="grid grid-cols-2 gap-6">
        <AdminFormField label="대표 이름" hint="자료 받으면 About 페이지 서명에 활용 예정 (현재 '최 광 은' 하드코딩)">
          <AdminInputText v-model="company.ceo_name" placeholder="최광은" />
        </AdminFormField>
        <AdminFormField label="대표 사진" hint="자료 받으면 About 페이지 인사말 옆에 표시 예정 (현재 자리만 비워둠)">
          <AdminImageUploader v-model="company.ceo_image_url" folder="ceo" />
        </AdminFormField>
      </div>

      <AdminFormField label="CEO 인사말 본문" hint="About 페이지 우측에 표시. 줄바꿈은 Enter로 입력하세요.">
        <AdminInputTextarea v-model="company.ceo_message" :rows="10" />
      </AdminFormField>
    </section>

    <!-- ─── 카카오맵 ─── -->
    <section class="space-y-6 mb-12">
      <h2 class="text-xl font-semibold text-ink-dark">카카오맵 임베드</h2>
      <p class="text-sm text-ink-dark-muted">표시 위치: Contact 페이지 Visit Us 섹션 우측</p>

      <AdminFormField
        label="임베드 코드"
        hint="카카오맵에서 장소 검색 → 공유 → 'HTML 태그 복사' → 그대로 붙여넣기"
      >
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
