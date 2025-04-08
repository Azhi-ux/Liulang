<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Animal {
  id: number
  name: string
  type: string
  breed: string
  age: string
  gender: string
  health: string
  location: string
  image: string
  description: string
}

const animals = ref<Animal[]>([
  {
    id: 1,
    name: '小白',
    type: '猫',
    breed: '中华田园猫',
    age: '2岁',
    gender: '母',
    health: '已绝育，已接种疫苗',
    location: '北京',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    description: '性格温顺，亲人，适合家养'
  },
  {
    id: 2,
    name: '大黄',
    type: '狗',
    breed: '金毛',
    age: '1岁',
    gender: '公',
    health: '已绝育，已接种疫苗',
    location: '上海',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    description: '活泼好动，特别喜欢小朋友'
  },
  {
    id: 3,
    name: '咪咪',
    type: '猫',
    breed: '英短',
    age: '1.5岁',
    gender: '母',
    health: '已绝育，已接种疫苗',
    location: '广州',
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    description: '优雅安静，很会撒娇'
  },
  {
    id: 4,
    name: '旺财',
    type: '狗',
    breed: '拉布拉多',
    age: '2岁',
    gender: '公',
    health: '已绝育，已接种疫苗',
    location: '深圳',
    image: 'https://images.unsplash.com/photo-1550697851-920b181d27da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    description: '聪明听话，很适合家庭饲养'
  }
])

// 筛选条件
const filters = ref({
  type: '',
  gender: '',
  age: '',
  location: '',
  health: ''
})

// 搜索关键词
const searchQuery = ref('')

// 筛选选项
const filterOptions = {
  type: ['猫', '狗', '其他'],
  gender: ['公', '母'],
  age: ['1岁以下', '1-3岁', '3-7岁', '7岁以上'],
  location: ['北京', '上海', '广州', '深圳'],
  health: ['已绝育', '未绝育', '已接种疫苗', '需要特殊护理']
}

// 过滤后的动物列表
const filteredAnimals = computed(() => {
  return animals.value.filter(animal => {
    // 搜索词过滤
    if (searchQuery.value && !animal.name.includes(searchQuery.value) && 
        !animal.description.includes(searchQuery.value)) {
      return false
    }
    
    // 条件过滤
    if (filters.value.type && animal.type !== filters.value.type) return false
    if (filters.value.gender && animal.gender !== filters.value.gender) return false
    if (filters.value.location && animal.location !== filters.value.location) return false
    
    return true
  })
})

const handleAnimalClick = (id: number) => {
  router.push(`/animals/${id}`)
}

const resetFilters = () => {
  filters.value = {
    type: '',
    gender: '',
    age: '',
    location: '',
    health: ''
  }
  searchQuery.value = ''
}
</script>

<template>
  <div class="animal-list">
    <div class="search-section">
      <el-row :gutter="20">
        <el-col :span="24">
          <h1>待领养动物</h1>
        </el-col>
      </el-row>
      
      <el-row :gutter="20" class="search-bar">
        <el-col :span="8">
          <el-input
            v-model="searchQuery"
            placeholder="搜索动物名称或描述"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="filter-section">
        <el-col :span="4">
          <el-select v-model="filters.type" placeholder="动物类型" clearable>
            <el-option
              v-for="type in filterOptions.type"
              :key="type"
              :label="type"
              :value="type"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="filters.gender" placeholder="性别" clearable>
            <el-option
              v-for="gender in filterOptions.gender"
              :key="gender"
              :label="gender"
              :value="gender"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="filters.age" placeholder="年龄" clearable>
            <el-option
              v-for="age in filterOptions.age"
              :key="age"
              :label="age"
              :value="age"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="filters.location" placeholder="地区" clearable>
            <el-option
              v-for="location in filterOptions.location"
              :key="location"
              :label="location"
              :value="location"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="resetFilters">重置筛选</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="animals-grid">
      <el-row :gutter="20">
        <el-col 
          :xs="24" 
          :sm="12" 
          :md="8" 
          :lg="6" 
          v-for="animal in filteredAnimals" 
          :key="animal.id"
          class="animal-card-wrapper"
        >
          <el-card 
            :body-style="{ padding: '0px' }" 
            class="animal-card"
            @click="handleAnimalClick(animal.id)"
          >
            <img :src="animal.image" class="animal-image">
            <div class="animal-info">
              <h3>{{ animal.name }}</h3>
              <p class="animal-tags">
                <el-tag size="small">{{ animal.type }}</el-tag>
                <el-tag size="small" type="success">{{ animal.gender }}</el-tag>
                <el-tag size="small" type="warning">{{ animal.age }}</el-tag>
              </p>
              <p class="animal-location">
                <el-icon><Location /></el-icon>
                {{ animal.location }}
              </p>
              <p class="animal-description">{{ animal.description }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.animal-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .search-section {
    margin-bottom: 30px;

    h1 {
      font-size: 2em;
      margin-bottom: 20px;
      color: #303133;
    }

    .search-bar {
      margin-bottom: 20px;
    }

    .filter-section {
      .el-select {
        width: 100%;
      }
    }
  }

  .animals-grid {
    .animal-card-wrapper {
      margin-bottom: 20px;
    }

    .animal-card {
      cursor: pointer;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .animal-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .animal-info {
        padding: 14px;

        h3 {
          margin: 0 0 10px 0;
          font-size: 1.2em;
        }

        .animal-tags {
          margin-bottom: 10px;

          .el-tag {
            margin-right: 5px;
          }
        }

        .animal-location {
          color: #909399;
          font-size: 0.9em;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 10px;
        }

        .animal-description {
          color: #606266;
          font-size: 0.9em;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
  }
}
</style>