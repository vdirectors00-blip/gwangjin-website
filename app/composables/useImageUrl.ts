// ===========================================================================
// Supabase Storage 이미지 URL을 변환 옵션과 함께 만드는 헬퍼
// 사용: const url = useImageUrl(product.image_url, { width: 800, format: 'webp' })
// ===========================================================================

type ImageOpts = {
  width?: number
  height?: number
  quality?: number          // 1-100
  format?: 'webp' | 'avif' | 'jpg' | 'png' | 'origin'
  resize?: 'cover' | 'contain' | 'fill'
}

export const useImageUrl = (url: string | null | undefined, opts?: ImageOpts) => {
  if (!url) return null
  if (!opts || Object.keys(opts).length === 0) return url

  // Supabase Storage URL인 경우에만 변환 파라미터 적용
  // 외부 URL은 원본 반환
  if (!url.includes('/storage/v1/object/public/')) return url

  // /object/public/ → /render/image/public/ 로 변경
  const renderUrl = url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/')
  const params = new URLSearchParams()
  if (opts.width)   params.set('width', String(opts.width))
  if (opts.height)  params.set('height', String(opts.height))
  if (opts.quality) params.set('quality', String(opts.quality))
  if (opts.format)  params.set('format', opts.format)
  if (opts.resize)  params.set('resize', opts.resize)
  const qs = params.toString()
  return qs ? `${renderUrl}?${qs}` : renderUrl
}
