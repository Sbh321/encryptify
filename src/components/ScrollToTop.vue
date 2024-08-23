<script setup>
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  window.scrollTo(0, 0);
});

watch(route, () => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <router-view />
</template>
