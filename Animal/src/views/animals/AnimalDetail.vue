<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 模拟动物数据
const animals = {
  1: {
    id: 1,
    name: '小雪',
    type: '猫',
    breed: '英国短毛猫',
    age: '2岁',
    gender: '母',
    health: '已绝育，已接种疫苗',
    location: '北京',
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    description: '小雪是一只温柔优雅的白色英短猫，性格安静，特别喜欢依偎在人身边。已经完成绝育手术和全部疫苗接种，身体健康。她喜欢在阳光下晒太阳，对猫薄荷有着独特的热爱。',
    characteristics: [
      '性格温顺',
      '已绝育',
      '会用猫砂',
      '亲人不怕生'
    ],
    requirements: [
      '有独立房间',
      '接受定期回访',
      '有养猫经验',
      '承诺不declawing'
    ],
    medicalRecords: [
      {
        date: '2024-01-15',
        type: '疫苗接种',
        description: '完成猫三联疫苗接种'
      },
      {
        date: '2024-01-01',
        type: '绝育手术',
        description: '完成绝育手术，恢复良好'
      }
    ],
    rescueInfo: {
      date: '2023-12-20',
      location: '北京市朝阳区',
      description: '在小区门口发现，疑似被遗弃，经过两周的救助现已完全康复。'
    }
  },
  2: {
    id: 2,
    name: '旺财',
    type: '狗',
    breed: '金毛寻回犬',
    age: '1岁',
    gender: '公',
    health: '已绝育，已接种疫苗',
    location: '北京',
    images: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    description: '旺财是一只活泼开朗的金毛犬，非常喜欢和人互动，适合有小孩的家庭。性格温和，已经学会了基本的服从命令，非常聪明。喜欢玩飞盘和球类游戏。',
    characteristics: [
      '性格活泼',
      '已绝育',
      '会基本服从',
      '亲人友善'
    ],
    requirements: [
      '有大房子或庭院',
      '家人有遛狗时间',
      '接受定期回访',
      '有养狗经验'
    ],
    medicalRecords: [
      {
        date: '2024-01-10',
        type: '疫苗接种',
        description: '完成狂犬疫苗接种'
      },
      {
        date: '2023-12-25',
        type: '绝育手术',
        description: '完成绝育手术，恢复良好'
      }
    ],
    rescueInfo: {
      date: '2023-12-01',
      location: '北京市海淀区',
      description: '在公园被好心人发现，送到救助站进行救助。性格活泼，非常亲人。'
    }
  }
}

const animal = ref<any>(null)

onMounted(() => {
  const id = Number(route.params.id)
  animal.value = animals[id as keyof typeof animals]
  
  if (!animal.value) {
    ElMessage.error('未找到该动物信息')
    router.push('/animals')
  }
})

const handleAdopt = () => {
  router.push({
    path: '/adopt',
    query: { animalId: animal.value.id }
  })
}

const activeImage = ref(0)
</script>

<template>
  <div v-if="animal" class="animal-detail">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="main-content">
          <!-- 图片轮播 -->
          <div class="image-gallery">
            <div class="main-image">
              <el-carousel 
                height="500px" 
                :autoplay="false" 
                :initial-index="activeImage"
                indicator-position="none"
                @change="(index) => activeImage = index"
              >
                <el-carousel-item v-for="(image, index) in animal.images" :key="index">
                  <img :src="image" :alt="`${animal.name}的照片${index + 1}`" class="carousel-image">
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="thumbnail-list">
              <div 
                v-for="(image, index) in animal.images" 
                :key="index"
                :class="['thumbnail', { active: activeImage === index }]"
                @click="activeImage = index"
              >
                <img :src="image" :alt="`${animal.name}的缩略图${index + 1}`">
              </div>
            </div>
          </div>

          <!-- 基本信息 -->
          <div class="info-section">
            <div class="animal-header">
              <h1>{{ animal.name }}</h1>
              <div class="tags">
                <el-tag size="large" :type="animal.type === '猫' ? 'success' : 'warning'">
                  {{ animal.type }}
                </el-tag>
                <el-tag size="large" type="info">{{ animal.breed }}</el-tag>
                <el-tag size="large" type="primary">{{ animal.gender }}</el-tag>
                <el-tag size="large">{{ animal.age }}</el-tag>
              </div>
            </div>

            <div class="description">
              <h2>基本介绍</h2>
              <p>{{ animal.description }}</p>
            </div>

            <div class="characteristics">
              <h2>特征标签</h2>
              <div class="char-tags">
                <el-tag
                  v-for="(char, index) in animal.characteristics"
                  :key="index"
                  class="char-tag"
                  effect="plain"
                >
                  {{ char }}
                </el-tag>
              </div>
            </div>

            <div class="requirements">
              <h2>领养要求</h2>
              <el-alert
                v-for="(req, index) in animal.requirements"
                :key="index"
                :title="req"
                type="info"
                :closable="false"
                class="mb-2"
              />
            </div>

            <div class="medical-records">
              <h2>健康记录</h2>
              <el-timeline>
                <el-timeline-item
                  v-for="record in animal.medicalRecords"
                  :key="record.date"
                  :timestamp="record.date"
                  type="primary"
                >
                  <h3 class="font-bold">{{ record.type }}</h3>
                  <p>{{ record.description }}</p>
                </el-timeline-item>
              </el-timeline>
            </div>

            <div class="rescue-info">
              <h2>救助信息</h2>
              <el-card class="rescue-card">
                <template #header>
                  <div class="rescue-header">
                    <span>救助日期：{{ animal.rescueInfo.date }}</span>
                    <span>救助地点：{{ animal.rescueInfo.location }}</span>
                  </div>
                </template>
                <p>{{ animal.rescueInfo.description }}</p>
              </el-card>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="side-content">
          <el-affix :offset="20">
            <el-card class="adoption-card">
              <template #header>
                <div class="card-header">
                  <h3>领养申请</h3>
                </div>
              </template>
              <div class="adoption-info">
                <p class="text-lg mb-4">
                  如果您想给{{ animal.name }}一个温暖的家，请确保您已经了解并满足以下条件：
                </p>
                <ul class="list-disc list-inside mb-6 text-gray-600">
                  <li>有足够的时间和精力照顾宠物</li>
                  <li>居住环境适合饲养宠物</li>
                  <li>家庭成员都同意领养</li>
                  <li>经济条件允许承担宠物日常开销</li>
                </ul>
                <el-button type="primary" size="large" class="w-full" @click="handleAdopt">
                  申请领养
                </el-button>
              </div>
            </el-card>

            <el-card class="contact-card mt-4">
              <template #header>
                <div class="card-header">
                  <h3>联系我们</h3>
                </div>
              </template>
              <p class="mb-4">如果您对{{ animal.name }}有任何疑问，请通过以下方式联系我们：</p>
              <div class="contact-info">
                <p class="flex items-center gap-2 mb-2">
                  <el-icon><Phone /></el-icon>
                  电话：400-xxx-xxxx
                </p>
                <p class="flex items-center gap-2">
                  <el-icon><Message /></el-icon>
                  邮箱：contact@animalrescue.com
                </p>
              </div>
            </el-card>
          </el-affix>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.animal-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .main-content {
    .image-gallery {
      margin-bottom: 30px;

      .main-image {
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 10px;

        .carousel-image {
          width: 100%;
          height: 500px;
          object-fit: cover;
        }
      }

      .thumbnail-list {
        display: flex;
        gap: 10px;
        
        .thumbnail {
          width: 100px;
          height: 70px;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.3s ease;

          &:hover {
            opacity: 0.9;
          }

          &.active {
            opacity: 1;
            border: 2px solid var(--el-color-primary);
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }

    .animal-header {
      margin-bottom: 30px;

      h1 {
        font-size: 2.5em;
        margin-bottom: 15px;
        color: #303133;
      }

      .tags {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }
    }

    h2 {
      font-size: 1.5em;
      color: #303133;
      margin: 30px 0 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #ebeef5;
    }

    .description {
      p {
        color: #606266;
        line-height: 1.8;
      }
    }

    .characteristics {
      .char-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        .char-tag {
          padding: 8px 16px;
          font-size: 14px;
        }
      }
    }

    .rescue-card {
      .rescue-header {
        display: flex;
        justify-content: space-between;
        color: #909399;
        font-size: 14px;
      }
    }
  }

  .side-content {
    .adoption-card, .contact-card {
      .card-header {
        h3 {
          margin: 0;
          font-size: 18px;
          color: #303133;
        }
      }
    }

    .contact-info {
      color: #606266;
    }
  }
}
</style>