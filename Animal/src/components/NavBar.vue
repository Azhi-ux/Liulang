<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeIndex = computed(() => {
  const path = route.path
  if (path === '/') return '1'
  if (path.startsWith('/animals')) return '2'
  if (path.startsWith('/donate')) return '3'
  if (path.startsWith('/community')) return '4'
  if (path.startsWith('/user')) return '5'
  return '1'
})

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
  <div class="nav-container bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <img src="/vite.svg" alt="Logo" class="h-8 w-8 mr-3">
          <span class="text-xl font-semibold text-primary">流浪动物救助平台</span>
        </div>
        
        <el-menu
          :default-active="activeIndex"
          class="border-0"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1" class="!text-base">首页</el-menu-item>
          <el-menu-item index="2" class="!text-base">待领养动物</el-menu-item>
          <el-menu-item index="3" class="!text-base">爱心捐赠</el-menu-item>
          <el-menu-item index="4" class="!text-base">社区交流</el-menu-item>
          <el-menu-item index="5" class="!text-base">个人中心</el-menu-item>
        </el-menu>

        <div class="flex items-center space-x-4">
          <el-button type="primary" @click="router.push('/login')">
            登录
          </el-button>
          <el-button @click="router.push('/register')">
            注册
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-container {
  border-bottom: 1px solid var(--border-color);
}

:deep(.el-menu) {
  --el-menu-hover-bg-color: var(--el-color-primary-light-9);
  --el-menu-active-color: var(--el-color-primary);
}

:deep(.el-menu-item) {
  font-size: 1rem;
  height: 64px;
  line-height: 64px;
  
  &:hover {
    color: var(--el-color-primary);
  }
  
  &.is-active {
    font-weight: 600;
  }
}
</style>