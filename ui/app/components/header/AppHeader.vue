<script setup>
import logo_lindas from "~/assets/logo_lindas.png";

const {$version} = useNuxtApp();
</script>

<template>
  <header class="bg-blue-whale p-3 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <a href="/" class="flex items-end">
        <!--<img
          :src="logo_lindas"
          alt="Parlamentvsdienste Icon"
          class="h-12 mx-2"
        />-->
        <h1 class="text-white mb-0">LINDAS SPARQL UI</h1>
      </a>
    </div>
    <p v-if="$version" class="text-white hidden sm:block">v{{ $version }}</p>
  </header>
</template>
