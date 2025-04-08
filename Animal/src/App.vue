<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <el-container>
    <el-header>
      <NavBar />
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
    <el-footer>
      <p>© 2024 Animal Rescue Platform. All rights reserved.</p>
    </el-footer>
  </el-container>
</template>

<style>
.el-container {
  min-height: 100vh;
}

.el-header {
  padding: 0;
  height: auto;
}

.el-footer {
  text-align: center;
  padding: 20px;
  background-color: #f5f7fa;
}
</style>