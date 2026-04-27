// public/ 폴더 정적 자산 path에 baseURL 자동 prepend
// (GitHub Pages처럼 sub-path 배포 시 인라인 src/style의 절대경로가 자동 처리되지 않는 문제 해결)
//
// 사용:
//   const assetUrl = useAssetUrl()
//   <img :src="assetUrl('/logo/bi-color.svg')" />
//   :style="`background-image: url('${assetUrl('/images/foo.jpg')}')`"
export const useAssetUrl = () => {
  const baseURL = useRuntimeConfig().app.baseURL
  return (path: string) => `${baseURL}${path.replace(/^\//, '')}`
}
