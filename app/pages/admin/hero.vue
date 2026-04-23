<script setup lang="ts">
import type { Hero, HeroSlide } from '~/types/database.types'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: '메인 배너 관리' })

const supabase = useSupabaseClient()

const hero = ref<Partial<Hero>>({})
const slides = ref<HeroSlide[]>([])
const loading = ref(true)
const saving = ref(false)
const message = ref<string | null>(null)
const error = ref<string | null>(null)

// Hero 텍스트 로드
const load = async () => {
  loading.value = true
  const [{ data: h }, { data: s }] = await Promise.all([
    supabase.from('hero').select('*').eq('id', 1).single(),
    supabase.from('hero_slides').select('*').order('sort_order'),
  ])
  if (h) hero.value = h
  if (s) slides.value = s
  loading.value = false
}
await load()

// Hero 텍스트 저장
const saveHero = async () => {
  saving.value = true
  error.value = null
  message.value = null
  const { error: e } = await supabase
    .from('hero')
    .update({
      title: hero.value.title,
      subtitle: hero.value.subtitle,
      cta_label: hero.value.cta_label,
      cta_link: hero.value.cta_link,
    })
    .eq('id', 1)
  saving.value = false
  if (e) error.value = e.message
  else {
    message.value = '저장되었습니다.'
    setTimeout(() => { message.value = null }, 3000)
  }
}

// 슬라이드 추가
const addSlide = async (mediaType: 'image' | 'video', url: string) => {
  const maxOrder = Math.max(0, ...slides.value.map(s => s.sort_order))
  const { data, error: e } = await supabase
    .from('hero_slides')
    .insert({
      media_type: mediaType,
      media_url: url,
      sort_order: maxOrder + 1,
      is_active: true,
    })
    .select()
    .single()
  if (e) { error.value = e.message; return }
  if (data) slides.value.push(data as HeroSlide)
}

// 슬라이드 삭제
const removeSlide = async (s: HeroSlide) => {
  if (!confirm('이 슬라이드를 삭제할까요?')) return
  const { error: e } = await supabase.from('hero_slides').delete().eq('id', s.id)
  if (e) { error.value = e.message; return }
  slides.value = slides.value.filter(x => x.id !== s.id)
}

// 슬라이드 활성/비활성 토글
const toggleSlide = async (s: HeroSlide) => {
  const newActive = !s.is_active
  const { error: e } = await supabase
    .from('hero_slides')
    .update({ is_active: newActive })
    .eq('id', s.id)
  if (e) { error.value = e.message; return }
  s.is_active = newActive
}

// 새 슬라이드 업로드 임시 상태
const newSlideUrl = ref<string | null>(null)
const newSlideType = ref<'image' | 'video'>('image')

const onSlideUpload = async (url: string | null) => {
  if (!url) return
  await addSlide(newSlideType.value, url)
  newSlideUrl.value = null
}
</script>

<template>
  <div>
    <AdminPageHeader title="메인 배너 관리" subtitle="히어로 텍스트와 배경 슬라이드 (이미지/영상)" />

    <!-- ===== 1. 히어로 텍스트 ===== -->
    <section class="space-y-6 mb-12">
      <h2 class="text-xl font-semibold text-ink-dark">텍스트</h2>
      <AdminFormField label="메인 슬로건 (영문)" required hint="홈 히어로 큰 영문 카피">
        <AdminInputText v-model="hero.title" placeholder="Heritage in Every Fiber" />
      </AdminFormField>
      <AdminFormField label="서브 카피 (한글)" hint="슬로건 아래 작은 줄">
        <AdminInputText v-model="hero.subtitle" placeholder="솜 한 가닥에, 30년의 기술" />
      </AdminFormField>
      <div class="grid grid-cols-2 gap-6">
        <AdminFormField label="CTA 버튼 라벨">
          <AdminInputText v-model="hero.cta_label" placeholder="Contact Us" />
        </AdminFormField>
        <AdminFormField label="CTA 링크">
          <AdminInputText v-model="hero.cta_link" placeholder="/contact" />
        </AdminFormField>
      </div>
    </section>

    <!-- ===== 2. 배경 슬라이드 ===== -->
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-ink-dark">배경 슬라이드 ({{ slides.length }}장)</h2>
      </div>
      <p class="text-ink-dark-muted text-sm">
        여러 장 등록하면 5초마다 부드럽게 전환됩니다. 활성/비활성으로 노출 여부 제어.
      </p>

      <!-- 기존 슬라이드 -->
      <div v-if="slides.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="s in slides" :key="s.id"
          class="bg-white border border-paper-line overflow-hidden"
        >
          <div class="aspect-video bg-paper-soft relative">
            <video
              v-if="s.media_type === 'video'"
              :src="s.media_url" muted loop autoplay playsinline
              class="w-full h-full object-cover"
            />
            <img
              v-else
              :src="s.media_url" alt="" class="w-full h-full object-cover"
            >
            <span
              :class="[
                'absolute top-2 left-2 text-xs px-2 py-0.5 rounded',
                s.is_active ? 'bg-accent-eco text-white' : 'bg-paper-line text-ink-dark-muted',
              ]"
            >
              {{ s.is_active ? 'ACTIVE' : 'HIDDEN' }} · {{ s.media_type }}
            </span>
          </div>
          <div class="p-3 flex justify-between items-center text-xs">
            <button class="text-ink-dark hover:text-accent-bronze" @click="toggleSlide(s)">
              {{ s.is_active ? '숨기기' : '활성화' }}
            </button>
            <button class="text-red-500 hover:text-red-700" @click="removeSlide(s)">
              삭제
            </button>
          </div>
        </div>
      </div>

      <!-- 새 슬라이드 추가 -->
      <div class="bg-paper-soft border border-dashed border-paper-line p-6">
        <h3 class="font-medium text-ink-dark mb-4">+ 새 슬라이드 추가</h3>
        <div class="flex items-center gap-4 mb-4 text-sm">
          <label class="flex items-center gap-2">
            <input type="radio" v-model="newSlideType" value="image" class="accent-ink-dark">
            <span>이미지</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="radio" v-model="newSlideType" value="video" class="accent-ink-dark">
            <span>영상</span>
          </label>
        </div>
        <AdminImageUploader
          v-model="newSlideUrl"
          :bucket="newSlideType === 'video' ? 'videos' : 'images'"
          folder="hero"
          @update:model-value="onSlideUpload"
        />
      </div>
    </section>

    <AdminSaveBar
      :saving="saving"
      :message="message"
      :error="error"
      @save="saveHero"
      @cancel="load"
    />
  </div>
</template>
