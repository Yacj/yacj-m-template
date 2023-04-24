<script lang="ts" setup>
function goBack() {
  window.history.length > 1
    ? window.history.go(-1)
    : window.location.replace('/')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <svg class="w-64 h-64 mb-8" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <path d="M512 96c229.75 0 416 186.25 416 416s-186.25 416-416 416S96 741.75 96 512 282.25 96 512 96zm0 64c-199 0-352 153-352 352s153 352 352 352 352-153 352-352-153-352-352-352zM416 608h192v64H416v-64z" fill="#2c3e50" />
    </svg>
    <h1 class="text-3xl font-bold mb-4">
      哎呀，404错误
    </h1>
    <p class="text-xl mb-8">
      您所访问的页面不存在。
    </p>
    <button class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600" @click="goBack()">
      返回上一页
    </button>
  </div>
</template>
