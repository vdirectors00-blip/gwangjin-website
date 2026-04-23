// ===========================================================================
// Supabase Storage 업로드/삭제 헬퍼
//   - images 버킷 (사진, 10MB 제한)
//   - videos 버킷 (영상, 50MB 제한)
// ===========================================================================

export type StorageBucket = 'images' | 'videos'

export const useStorage = () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()

  /**
   * 파일 업로드
   * @returns { url, path } 공개 URL과 storage 경로
   */
  const upload = async (file: File, bucket: StorageBucket = 'images', folder = '') => {
    const ext = file.name.split('.').pop() || 'bin'
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const path = folder ? `${folder}/${safeName}` : safeName

    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })
    if (error) throw error

    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return { url: data.publicUrl, path }
  }

  /**
   * 파일 삭제 (URL 또는 경로로)
   */
  const remove = async (urlOrPath: string, bucket: StorageBucket = 'images') => {
    let path = urlOrPath
    // URL이면 경로 추출
    const marker = `/storage/v1/object/public/${bucket}/`
    if (urlOrPath.includes(marker)) {
      path = urlOrPath.split(marker)[1].split('?')[0]
    }
    const { error } = await supabase.storage.from(bucket).remove([path])
    if (error) throw error
  }

  return { upload, remove }
}
