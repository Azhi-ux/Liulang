<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const latestAnimals = ref([
  {
    id: 1,
    name: '小雪',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    type: '猫',
    age: '2岁',
    gender: '母',
    description: '小雪是一只温柔优雅的白色英短猫，性格安静，特别喜欢依偎在人身边。'
  },
  {
    id: 2,
    name: '旺财',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    type: '狗',
    age: '1岁',
    gender: '公',
    description: '旺财是一只活泼开朗的金毛犬，非常喜欢和人互动，适合有小孩的家庭。'
  },
  {
    id: 3,
    name: '咪咪',
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    type: '猫',
    age: '1.5岁',
    gender: '母',
    description: '咪咪是一只花色优美的三花猫，性格活泼，非常亲人。'
  },
  {
    id: 4,
    name: '大黑',
    image: 'https://images.unsplash.com/photo-1550697851-920b181d27da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    type: '狗',
    age: '3岁',
    gender: '公',
    description: '大黑是一只忠诚的拉布拉多，训练有素，非常适合作为家庭伴侣。'
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

const viewAnimalDetail = (id: number) => {
  router.push(`/animals/${id}`)
}
</script>

<template>
  <div class="home">
    <!-- 主横幅 -->
    <div class="banner">
      <div class="banner-content">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">为流浪动物提供一个温暖的家</h1>
        <p class="text-xl text-white/90 mb-8">我们致力于帮助流浪动物找到他们永远的家</p>
        <div class="flex gap-4" style="margin: 0 auto;">
          <el-button style="margin-left: 24%;" type="primary" size="large" @click="router.push('/animals')">
            查看待领养动物
          </el-button>
          <el-button  size="large" @click="router.push('/donate')">
            爱心捐赠
          </el-button>
        </div>
      </div>
    </div>

    <!-- 最新待领养动物 -->
    <div class="section bg-white py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="section-title">最新待领养动物</h2>
        <p class="text-center text-gray-600 mb-12">这些可爱的小伙伴正在等待一个温暖的家</p>
        
        <el-row :gutter="20">
          <el-col 
            v-for="animal in latestAnimals" 
            :key="animal.id"
            :xs="24"
            :sm="12"
            :md="6"
            class="mb-6"
          >
            <div 
              class="animal-card cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
              @click="viewAnimalDetail(animal.id)"
            >
              <div class="relative overflow-hidden rounded-t-lg">
                <img 
                  :src="animal.image" 
                  :alt="animal.name"
                  class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                >
                <div class="absolute top-3 right-3">
                  <el-tag :type="animal.type === '猫' ? 'success' : 'warning'" effect="dark">
                    {{ animal.type }}
                  </el-tag>
                </div>
              </div>
              <div class="p-4 bg-white rounded-b-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ animal.name }}</h3>
                <div class="flex items-center gap-2 text-gray-600 mb-3">
                  <span>{{ animal.age }}</span>
                  <span>•</span>
                  <span>{{ animal.gender }}</span>
                </div>
                <p class="text-gray-600 text-sm line-clamp-2">{{ animal.description }}</p>
                <el-button type="primary" text class="mt-3">
                  了解更多
                  <el-icon class="ml-1"><ArrowRight /></el-icon>
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>

        <div class="text-center mt-8">
          <el-button type="primary" style="color: white;" plain @click="router.push('/animals')">
            查看更多动物
            <el-icon class="ml-1"><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </div>

    <!-- 最新捐赠 -->
    <div class="section bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="section-title">爱心捐赠</h2>
        <p class="text-center text-gray-600 mb-12">感谢每一位爱心人士的支持</p>
        
        <el-table 
          :data="donations" 
          style="width: 100%"
          :header-cell-style="{ background: '#f5f7fa' }"
        >
          <el-table-column prop="donor" label="捐赠人" width="180" />
          <el-table-column prop="amount" label="金额">
            <template #default="scope">
              <span class="text-primary font-semibold">¥{{ scope.row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="日期" width="180" />
          <el-table-column prop="purpose" label="用途" />
        </el-table>

        <div class="text-center mt-8">
          <el-button type="primary" style="color: white;" plain @click="router.push('/donate')">
            我要捐赠
            <el-icon class="ml-1"><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  .banner {
    @apply relative min-h-[500px] flex items-center justify-center bg-gradient-to-r from-primary to-secondary;
    
    &::before {
      content: '';
      @apply absolute inset-0 bg-black/30;
    }

    .banner-content {
      @apply relative text-center px-4;
    }
  }

  .section-title {
    @apply text-3xl font-bold text-gray-800 text-center mb-4;
    
    &::after {
      content: '';
      @apply block w-20 h-1 bg-primary mx-auto mt-4 rounded-full;
    }
  }

  .animal-card {
    @apply bg-white rounded-lg overflow-hidden border border-gray-100;
    
    &:hover {
      @apply shadow-lg;
    }
  }
}
</style>