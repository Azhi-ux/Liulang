<script setup lang="ts">
import { ref } from 'vue'

const latestAnimals = ref([
  {
    id: 1,
    name: '小白',
    image: 'https://placekitten.com/300/200',
    type: '猫',
    age: '2岁',
    gender: '母'
  },
  {
    id: 2,
    name: '大黄',
    image: 'https://placekitten.com/301/200',
    type: '狗',
    age: '1岁',
    gender: '公'
  }
])

const donations = ref([
  {
    id: 1,
    donor: '匿名用户',
    amount: 100,
    date: '2024-01-20',
    purpose: '医疗救助'
  },
  {
    id: 2,
    donor: '爱心人士',
    amount: 200,
    date: '2024-01-19',
    purpose: '日常用品'
  }
])
</script>

<template>
  <div class="home">
    <el-row class="banner">
      <el-col :span="24">
        <h1>为流浪动物提供一个温暖的家</h1>
        <p>我们致力于帮助流浪动物找到他们永远的家</p>
      </el-col>
    </el-row>

    <el-row class="section">
      <el-col :span="24">
        <h2>最新待领养动物</h2>
        <el-row :gutter="20">
          <el-col :span="12" v-for="animal in latestAnimals" :key="animal.id">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="animal.image" class="animal-image">
              <div style="padding: 14px;">
                <h3>{{ animal.name }}</h3>
                <p>{{ animal.type }} | {{ animal.age }} | {{ animal.gender }}</p>
                <el-button type="primary">查看详情</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="section">
      <el-col :span="24">
        <h2>最新捐赠</h2>
        <el-table :data="donations" style="width: 100%">
          <el-table-column prop="donor" label="捐赠人"></el-table-column>
          <el-table-column prop="amount" label="金额"></el-table-column>
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="purpose" label="用途"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.banner {
  text-align: center;
  padding: 60px 0;
  background-color: #f5f7fa;
  border-radius: 8px;
  margin-bottom: 40px;
}

.banner h1 {
  font-size: 2.5em;
  color: #303133;
  margin-bottom: 20px;
}

.section {
  margin-bottom: 40px;
}

.section h2 {
  margin-bottom: 20px;
  color: #303133;
}

.animal-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>