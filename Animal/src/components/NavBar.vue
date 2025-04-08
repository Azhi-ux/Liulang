<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeIndex = ref('1')

const handleSelect = (key: string) => {
  switch (key) {
    case '1':
      router.push('/')
      break
    case '2':
      router.push('/animals')
      break
    case '3':
      router.push('/donate')
      break
    case '4':
      router.push('/community')
      break
    case '5':
      router.push('/user')
      break
  }
}
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">待领养动物</el-menu-item>
    <el-menu-item index="3">爱心捐赠</el-menu-item>
    <el-menu-item index="4">社区交流</el-menu-item>
    <el-menu-item index="5">个人中心</el-menu-item>
  </el-menu>
</template>

<style scoped>
.el-menu {
  justify-content: center;
}
</style>