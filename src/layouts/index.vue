<script setup lang="ts">
const router = useRouter()
const isShowTabbar = computed(() => {
  return router.currentRoute.value.meta.showTabbar
})
</script>

<template>
  <router-view />
  <tabbar v-if="isShowTabbar" />
</template>

<style scoped>

</style>
