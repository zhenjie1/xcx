<template>
  <div
    class="app h-100vh" :class="{
      dark: isDark,
    }"
  >
    <slot />
  </div>
</template>
