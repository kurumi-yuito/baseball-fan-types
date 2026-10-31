<script setup lang="ts">
const route = useRoute()
useSeoMeta({
  ogUrl: () => `https://baseball-fan-types.dom9th-works.com${route.fullPath.split('#')[0]}`
})
</script>
<template><NuxtPage /></template>
