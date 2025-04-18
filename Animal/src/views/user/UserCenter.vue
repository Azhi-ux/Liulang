<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import api from '../../../src/api'

// 定义数据类型
interface UserInfo {
  avatar: string;
  username: string;
  email: string;
  phone: string;
  joinDate: string;
  volunteerHours: number;
  donationAmount: number;
  adoptions: number;
}

interface AdoptionRecord {
  id: number;
  animalName: string;
  animalType: string;
  adoptDate: string;
  status: string;
  image: string;
}

interface DonationRecord {
  id: number;
  amount: number;
  purpose: string;
  date: string;
  status: string;
}

interface VolunteerRecord {
  id: number;
  activity: string;
  date: string;
  hours: number;
  location: string;
}

interface Animal {
  id: number;
  name: string;
  type: string;
  age: string;
  image: string;
}

const router = useRouter()
const activeTab = ref('profile')

// 用户信息
const userInfo = ref<UserInfo>({
  avatar: '',
  username: '',
  email: '',
  phone: '',
  joinDate: '',
  volunteerHours: 0,
  donationAmount: 0,
  adoptions: 0
})

// 领养记录
const adoptionRecords = ref<AdoptionRecord[]>([])

// 捐赠记录
const donationRecords = ref<DonationRecord[]>([])

// 志愿记录
const volunteerRecords = ref<VolunteerRecord[]>([])

// 收藏的动物
const favoriteAnimals = ref<Animal[]>([])

// 加载用户数据
const loadUserData = async () => {
  try {
    const response = await api.user.getUserInfo()
    userInfo.value = 'data' in response ? response.data : response
    
    const adoptionResponse = await api.user.getAdoptionRecords()
    adoptionRecords.value = 'data' in adoptionResponse ? adoptionResponse.data : adoptionResponse
    
    const donationResponse = await api.user.getDonationRecords()
    donationRecords.value = 'data' in donationResponse ? donationResponse.data : donationResponse
    
    const volunteerResponse = await api.user.getVolunteerRecords()
    volunteerRecords.value = 'data' in volunteerResponse ? volunteerResponse.data : volunteerResponse
    
    const favoriteResponse = await api.user.getFavoriteAnimals()
    favoriteAnimals.value = 'data' in favoriteResponse ? favoriteResponse.data : favoriteResponse
  } catch (error) {
    ElMessage.error('加载用户数据失败')
  }
}

// 编辑个人信息
const editDialogVisible = ref(false)
const editForm = ref({
  username: '',
  email: '',
  phone: ''
})

// 打开编辑对话框
const openEditDialog = () => {
  editForm.value = {
    username: userInfo.value.username,
    email: userInfo.value.email,
    phone: userInfo.value.phone
  }
  editDialogVisible.value = true
}

// 保存个人信息
const saveUserInfo = async () => {
  try {
    const updatedInfo = await api.user.updateUserInfo(editForm.value)
    userInfo.value = {
      ...userInfo.value,
      ...updatedInfo
    }
    editDialogVisible.value = false
    ElMessage.success('保存成功')
  } catch (error) {
    console.error('保存用户信息失败:', error)
    ElMessage.error('保存失败，请稍后重试')
  }
}

// 查看动物详情
const viewAnimalDetail = (id: number) => {
  router.push(`/animals/${id}`)
}

// 查看领养申请详情
const viewAdoptionDetail = (id: number) => {
  ElMessage('查看领养申请详情功能开发中')
}

// 取消收藏
const removeFavorite = async (id: number) => {
  try {
    await api.user.removeFavorite(id)
    favoriteAnimals.value = favoriteAnimals.value.filter(animal => animal.id !== id)
    ElMessage.success('取消收藏成功')
  } catch (error) {
    console.error('取消收藏失败:', error)
    ElMessage.error('取消收藏失败，请稍后重试')
  }
}

// 页面加载时获取数据
onMounted(() => {
  loadUserData()
})
</script>

<template>
  <div class="user-center">
    <!-- 用户信息卡片 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="user-card">
          <div class="user-info">
            <el-avatar
              :size="100"
              :src="userInfo.avatar"
              class="user-avatar"
            />
            <div class="user-details">
              <h2>{{ userInfo.username }}</h2>
              <p>注册时间：{{ userInfo.joinDate }}</p>
              <el-button type="primary" @click="openEditDialog">
                编辑资料
              </el-button>
            </div>
            <div class="user-statistics">
              <div class="stat-item">
                <h3>{{ userInfo.adoptions }}</h3>
                <p>已领养</p>
              </div>
              <div class="stat-item">
                <h3>¥{{ userInfo.donationAmount }}</h3>
                <p>总捐赠</p>
              </div>
              <div class="stat-item">
                <h3>{{ userInfo.volunteerHours }}h</h3>
                <p>志愿时长</p>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 主要内容区 -->
    <el-card class="main-content">
      <el-tabs v-model="activeTab">
        <!-- 个人资料 -->
        <el-tab-pane label="个人资料" name="profile">
          <el-descriptions title="基本信息" :column="2" border>
            <el-descriptions-item label="用户名">
              {{ userInfo.username }}
            </el-descriptions-item>
            <el-descriptions-item label="邮箱">
              {{ userInfo.email }}
            </el-descriptions-item>
            <el-descriptions-item label="手机号">
              {{ userInfo.phone }}
            </el-descriptions-item>
            <el-descriptions-item label="注册时间">
              {{ userInfo.joinDate }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>

        <!-- 领养记录 -->
        <el-tab-pane label="领养记录" name="adoptions">
          <el-timeline>
            <el-timeline-item
              v-for="record in adoptionRecords"
              :key="record.id"
              :timestamp="record.adoptDate"
              :type="record.status === 'approved' ? 'success' : 'warning'"
            >
              <el-card class="adoption-card">
                <div class="adoption-info">
                  <el-image
                    :src="record.image"
                    fit="cover"
                    class="animal-image"
                  />
                  <div class="info-content">
                    <h3>{{ record.animalName }}</h3>
                    <p>类型：{{ record.animalType }}</p>
                    <p>状态：
                      <el-tag :type="record.status === 'approved' ? 'success' : 'warning'">
                        {{ record.status === 'approved' ? '已通过' : '审核中' }}
                      </el-tag>
                    </p>
                    <el-button
                      type="primary"
                      link
                      @click="viewAdoptionDetail(record.id)"
                    >
                      查看详情
                    </el-button>
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>

        <!-- 捐赠记录 -->
        <el-tab-pane label="捐赠记录" name="donations">
          <el-table :data="donationRecords" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="amount" label="金额">
              <template #default="scope">
                ¥{{ scope.row.amount }}
              </template>
            </el-table-column>
            <el-table-column prop="purpose" label="用途" />
            <el-table-column prop="status" label="状态">
              <template #default="scope">
                <el-tag :type="scope.row.status === 'success' ? 'success' : 'info'">
                  {{ scope.row.status === 'success' ? '成功' : '处理中' }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 志愿记录 -->
        <el-tab-pane label="志愿记录" name="volunteer">
          <el-timeline>
            <el-timeline-item
              v-for="record in volunteerRecords"
              :key="record.id"
              :timestamp="record.date"
            >
              <h4>{{ record.activity }}</h4>
              <p>地点：{{ record.location }}</p>
              <p>时长：{{ record.hours }}小时</p>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>

        <!-- 我的收藏 -->
        <el-tab-pane label="我的收藏" name="favorites">
          <el-row :gutter="20">
            <el-col
              v-for="animal in favoriteAnimals"
              :key="animal.id"
              :span="8"
            >
              <el-card :body-style="{ padding: '0px' }" class="favorite-card">
                <img :src="animal.image" class="animal-image">
                <div style="padding: 14px;">
                  <h3>{{ animal.name }}</h3>
                  <p>{{ animal.type }} | {{ animal.age }}</p>
                  <div class="card-actions">
                    <el-button
                      type="primary"
                      link
                      @click="viewAnimalDetail(animal.id)"
                    >
                      查看详情
                    </el-button>
                    <el-button
                      type="danger"
                      link
                      @click="removeFavorite(animal.id)"
                    >
                      取消收藏
                    </el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 编辑资料对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑个人资料"
      width="500px"
    >
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
          >
            <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
            <el-icon v-else><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="editForm.phone" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveUserInfo">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.user-center {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .user-card {
    margin-bottom: 20px;

    .user-info {
      display: flex;
      align-items: center;
      gap: 30px;

      .user-avatar {
        flex-shrink: 0;
      }

      .user-details {
        flex-grow: 1;

        h2 {
          margin: 0 0 10px;
          font-size: 24px;
        }

        p {
          color: #909399;
          margin: 0 0 15px;
        }
      }

      .user-statistics {
        display: flex;
        gap: 40px;

        .stat-item {
          text-align: center;

          h3 {
            margin: 0;
            font-size: 24px;
            color: #409EFF;
          }

          p {
            margin: 5px 0 0;
            color: #909399;
          }
        }
      }
    }
  }

  .main-content {
    .adoption-card {
      .adoption-info {
        display: flex;
        gap: 20px;

        .animal-image {
          width: 120px;
          height: 80px;
          border-radius: 4px;
        }

        .info-content {
          h3 {
            margin: 0 0 10px;
          }

          p {
            margin: 5px 0;
          }
        }
      }
    }

    .favorite-card {
      margin-bottom: 20px;

      .animal-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .card-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
    }
  }
}

.avatar-uploader {
  :deep(.el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

    &:hover {
      border-color: var(--el-color-primary);
    }
  }
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>