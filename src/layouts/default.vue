<template>
  <div
    class="app h-100vh bg-#f5f5f5" :class="{
      dark: isDark,
    }"
  >
    <slot />
  </div>
</template>
