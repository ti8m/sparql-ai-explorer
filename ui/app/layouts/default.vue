<script setup>
import AppHeader from "~/components/header/AppHeader.vue";
</script>

<template>
  <div>
    <AppHeader/>
    <main>
      <slot/>
    </main>
  </div>
</template>

<style>
html {
  @apply bg-[#fff];
}

body {
  @apply bg-[#F0F0F0];
  font-family: "Avenir", sans-serif;
}

main {
  @apply bg-[#fff] flex h-[calc(100vh-72px)];
  padding: 15px;
}
</style>
