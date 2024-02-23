<template>
  <div
    class="app" :class="{
      dark: isDark,
    }"
  >
    <main
      p="x-4 y-10"
      text="center"
      bg-white font-sans
    >
      <slot />
      <TheFooter />
      <div mx-auto mt-4 text-center text-sm opacity-50>
        [Home Layout]
      </div>
    </main>
  </div>
</template>
