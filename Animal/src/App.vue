<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen paw-pattern">
    <el-container>
      <el-header class="p-0 h-auto bg-white shadow-md sticky top-0 z-50">
        <NavBar />
      </el-header>
      <el-main class="py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-[1600px] mx-auto">
          <RouterView v-slot="{ Component }">
            <transition
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut"
              mode="out-in"
            >
              <component :is="Component" />
            </transition>
          </RouterView>
        </div>
      </el-main>
      <el-footer class="bg-white shadow-inner mt-8">
        <div class="max-w-[1600px] mx-auto px-4 py-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-primary">关于我们</h3>
              <p class="text-gray-600">我们致力于为每一个流浪动物提供温暖的家，让爱不再流浪。</p>
            </div>
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-primary">快速链接</h3>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-600 hover:text-primary">待领养动物</a></li>
                <li><a href="#" class="text-gray-600 hover:text-primary">爱心捐赠</a></li>
                <li><a href="#" class="text-gray-600 hover:text-primary">社区交流</a></li>
              </ul>
            </div>
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-primary">联系我们</h3>
              <ul class="space-y-2">
                <li class="text-gray-600">邮箱：contact@animalrescue.com</li>
                <li class="text-gray-600">电话：400-xxx-xxxx</li>
                <li class="text-gray-600">地址：北京市朝阳区xxx街xxx号</li>
              </ul>
            </div>
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-primary">关注我们</h3>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-600 hover:text-primary">
                  <i class="el-icon-platform-wechat text-2xl"></i>
                </a>
                <a href="#" class="text-gray-600 hover:text-primary">
                  <i class="el-icon-platform-weibo text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="mt-8 pt-8 border-t border-gray-200 text-center">
            <p class="text-gray-600">© 2024 Animal Rescue Platform. All rights reserved.</p>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<style>
@import 'animate.css';

.el-main {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

:root {
  --el-color-primary: var(--primary-color);
  --el-color-success: var(--success-color);
  --el-color-warning: var(--warning-color);
  --el-color-danger: var(--danger-color);
}
</style>