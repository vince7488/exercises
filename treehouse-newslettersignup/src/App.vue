<script setup>
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <v-app>
    <AppHeader />

    <v-main>
      <RouterView />
    </v-main>

    <AppFooter />
  </v-app>
</template>
