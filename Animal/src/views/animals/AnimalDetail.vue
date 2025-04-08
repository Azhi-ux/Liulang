<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 模拟动物详细信息
const animal = ref({
  id: 1,
  name: '小白',
  type: '猫',
  breed: '中华田园猫',
  age: '2岁',
  gender: '母',
  health: '已绝育，已接种疫苗',
  location: '北京',
  images: [
    'https://placekitten.com/800/600',
    'https://placekitten.com/801/600',
    'https://placekitten.com/802/600'
  ],
  description: '小白是一只非常温顺的小猫，性格安静，特别喜欢趴在主人腿上。已经完成绝育手术和全部疫苗接种，身体健康。',
  characteristics: [
    '性格温顺',
    '已绝育',
    '会用猫砂',
    '亲人不怕生'
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
    description: '在小区门口发现，疑似被遗弃'
  }
})

const handleAdopt = () => {
  router.push({
    path: '/adopt',
    query: { animalId: animal.value.id }
  })
}
</script>

<template>
  <div class="animal-detail">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="main-content">
          <el-carousel height="400px">
            <el-carousel-item v-for="(image, index) in animal.images" :key="index">
              <img :src="image" class="carousel-image">
            </el-carousel-item>
          </el-carousel>

          <div class="info-section">
            <h1>{{ animal.name }}</h1>
            <div class="tags">
              <el-tag size="large">{{ animal.type }}</el-tag>
              <el-tag size="large" type="success">{{ animal.gender }}</el-tag>
              <el-tag size="large" type="warning">{{ animal.age }}</el-tag>
              <el-tag size="large" type="info">{{ animal.location }}</el-tag>
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
                >
                  {{ char }}
                </el-tag>
              </div>
            </div>

            <div class="medical-records">
              <h2>健康记录</h2>
              <el-timeline>
                <el-timeline-item
                  v-for="record in animal.medicalRecords"
                  :key="record.date"
                  :timestamp="record.date"
                >
                  <h3>{{ record.type }}</h3>
                  <p>{{ record.description }}</p>
                </el-timeline-item>
              </el-timeline>
            </div>

            <div class="rescue-info">
              <h2>救助信息</h2>
              <el-descriptions border>
                <el-descriptions-item label="救助日期">
                  {{ animal.rescueInfo.date }}
                </el-descriptions-item>
                <el-descriptions-item label="救助地点">
                  {{ animal.rescueInfo.location }}
                </el-descriptions-item>
                <el-descriptions-item label="救助详情">
                  {{ animal.rescueInfo.description }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="side-content">
          <el-card class="adoption-card">
            <template #header>
              <div class="card-header">
                <h3>领养申请</h3>
              </div>
            </template>
            <p>如果您想给{{ animal.name }}一个温暖的家，请点击下方按钮提交领养申请</p>
            <el-button type="primary" size="large" block @click="handleAdopt">
              申请领养
            </el-button>
          </el-card>

          <el-card class="contact-card">
            <template #header>
              <div class="card-header">
                <h3>联系我们</h3>
              </div>
            </template>
            <p>如果您对{{ animal.name }}有任何疑问，请通过以下方式联系我们：</p>
            <p>
              <el-icon><Phone /></el-icon> 电话：400-xxx-xxxx
            </p>
            <p>
              <el-icon><Message /></el-icon> 邮箱：contact@animalrescue.com
            </p>
          </el-card>
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
    .carousel-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .info-section {
      padding: 20px 0;

      h1 {
        font-size: 2em;
        margin-bottom: 20px;
      }

      .tags {
        margin-bottom: 30px;
        .el-tag {
          margin-right: 10px;
        }
      }

      h2 {
        margin: 20px 0;
        font-size: 1.5em;
        color: #303133;
      }

      .description {
        margin-bottom: 30px;
      }

      .characteristics {
        margin-bottom: 30px;
        .char-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
      }

      .medical-records {
        margin-bottom: 30px;
      }
    }
  }

  .side-content {
    position: sticky;
    top: 20px;

    .adoption-card, .contact-card {
      margin-bottom: 20px;

      .card-header {
        h3 {
          margin: 0;
        }
      }

      p {
        margin-bottom: 15px;
      }
    }
  }
}
</style>