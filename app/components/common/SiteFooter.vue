<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-bg-soft border-t border-white/5 mt-20">
    <div class="container-x py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <div class="text-ink font-bold text-lg tracking-tight mb-2">COSY FEEL</div>
        <p class="text-ink-faint text-sm leading-relaxed">
          주식회사 광진실업<br>
          Premium Filling Materials
        </p>
      </div>

      <div>
        <h4 class="text-ink text-sm font-semibold mb-4">SITEMAP</h4>
        <ul class="space-y-2 text-ink-faint text-sm">
          <li><NuxtLink to="/about" class="hover:text-ink">About</NuxtLink></li>
          <li><NuxtLink to="/strength" class="hover:text-ink">Strength</NuxtLink></li>
          <li><NuxtLink to="/products" class="hover:text-ink">Products</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:text-ink">Contact</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h4 class="text-ink text-sm font-semibold mb-4">CONTACT</h4>
        <ul class="space-y-2 text-ink-faint text-sm">
          <li>인천광역시 서구 가정로 58번길 3 (가좌동)</li>
          <li>TEL · 032-582-4149</li>
          <li>EMAIL · info@gwangjin.co.kr</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/5">
      <div class="container-x py-6 text-center text-ink-faint text-xs">
        © {{ year }} 주식회사 광진실업. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>
