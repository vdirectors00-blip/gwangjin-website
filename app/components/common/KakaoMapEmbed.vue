<script setup lang="ts">
// 카카오맵 임베드 — iframe과 'script + div' (지도 퍼가기) 둘 다 지원.
// 핵심: 카카오 'roughmapLoader.js'는 내부에서 document.write()를 호출하는데
// SPA에서 동적 삽입 시 브라우저가 차단함 (비동기 script는 document.write 불가).
// → iframe srcdoc으로 격리된 페이지 환경을 만들어, 그 안에서 코드를 정상 페이지 로드처럼 실행.
const props = defineProps<{
  embedCode: string
}>()

const srcdoc = computed(() => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- 카카오 roughmapLoader가 roughmapLander.js를 http로 요청해 https 페이지에서 혼합콘텐츠 차단됨
       → http 하위요청을 https로 자동 승격(라이브 https에서 지도 렌더에 필수) -->
  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
  <style>
    html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
    .root_daum_roughmap, .root_daum_roughmap_landing { width: 100% !important; height: 100% !important; }
    .root_daum_roughmap iframe { width: 100% !important; height: 100% !important; border: 0 !important; }
  </style>
</head>
<body>
${props.embedCode}
</body>
</html>`)
</script>

<template>
  <iframe
    :srcdoc="srcdoc"
    class="w-full h-full border-0 block"
    sandbox="allow-scripts allow-same-origin allow-popups"
    loading="lazy"
    title="카카오맵"
  />
</template>
