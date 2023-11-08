<script setup lang="ts">
const props = defineProps({
  actives: {
    type: Number,
    default: 0,
  },
})
const active = ref(props.actives)

const tabbar = [
  {
    name: 'home',
    path: '/home',
    icon: 'home',
  },
  {
    name: 'user',
    path: '/user',
    icon: 'user',
  },
]
</script>

<template>
  <van-tabbar v-model="active" fixed route>
    <van-tabbar-item v-for="item in tabbar" :key="item.name" :to="item.path" :icon="item.icon">
      {{ item.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>
