<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface DonationOption {
  id: string
  title: string
  description: string
  image: string
  minAmount: number
}

// 捐赠选项
const donationOptions = ref<DonationOption[]>([
  {
    id: 'medical',
    title: '医疗救助',
    description: '用于救助生病受伤的流浪动物，提供必要的医疗救治和康复护理',
    image: 'https://placekitten.com/300/200',
    minAmount: 10
  },
  {
    id: 'food',
    title: '日常食物',
    description: '为流浪动物提供日常食物和营养补充，确保它们能够健康成长',
    image: 'https://placekitten.com/301/200',
    minAmount: 5
  },
  {
    id: 'shelter',
    title: '住所改善',
    description: '用于改善流浪动物收容所的居住环境，添置必要的设施设备',
    image: 'https://placekitten.com/302/200',
    minAmount: 20
  },
  {
    id: 'operation',
    title: '平台运营',
    description: '支持平台的日常运营，包括人员工资、系统维护等费用',
    image: 'https://placekitten.com/303/200',
    minAmount: 1
  }
])

// 捐赠表单
const donationForm = reactive({
  purpose: '',
  amount: 0,
  message: '',
  isAnonymous: false,
  agreeTerm: false
})

// 表单验证规则
const rules = {
  purpose: [
    { required: true, message: '请选择捐赠用途', trigger: 'change' }
  ],
  amount: [
    { required: true, message: '请输入捐赠金额', trigger: 'blur' },
    { type: 'number', min: 1, message: '金额必须大于0', trigger: 'blur' }
  ],
  agreeTerm: [
    { required: true, message: '请同意捐赠协议', trigger: 'change' }
  ]
}

// 快速金额选项
const quickAmounts = [10, 20, 50, 100, 200, 500]

// 选择捐赠用途
const selectPurpose = (purpose: string) => {
  donationForm.purpose = purpose
  const option = donationOptions.value.find(opt => opt.id === purpose)
  if (option) {
    donationForm.amount = option.minAmount
  }
}

// 选择快速金额
const selectQuickAmount = (amount: number) => {
  donationForm.amount = amount
}

// 提交捐赠
const submitDonation = async () => {
  // 这里应该调用支付接口
  try {
    ElMessage.success('捐赠成功！感谢您的爱心')
    router.push('/donations')
  } catch (error) {
    ElMessage.error('捐赠失败，请稍后重试')
  }
}

// 获取选中项的最小金额
const getMinAmount = (purpose: string) => {
  const option = donationOptions.value.find(opt => opt.id === purpose)
  return option ? option.minAmount : 1
}
</script>

<template>
  <div class="donation-page">
    <div class="page-header">
      <h1>爱心捐赠</h1>
      <p>您的每一份爱心都将帮助流浪动物找到温暖的家</p>
    </div>

    <el-row :gutter="20" class="donation-options">
      <el-col
        v-for="option in donationOptions"
        :key="option.id"
        :xs="24"
        :sm="12"
        :md="6"
      >
        <el-card
          :class="['option-card', { active: donationForm.purpose === option.id }]"
          @click="selectPurpose(option.id)"
        >
          <img :src="option.image" class="option-image">
          <h3>{{ option.title }}</h3>
          <p>{{ option.description }}</p>
          <div class="min-amount">
            最低金额：¥{{ option.minAmount }}
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="donation-form">
      <el-form
        :model="donationForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="捐赠金额" prop="amount">
          <div class="quick-amounts">
            <el-button
              v-for="amount in quickAmounts"
              :key="amount"
              :class="{ active: donationForm.amount === amount }"
              @click="selectQuickAmount(amount)"
            >
              ¥{{ amount }}
            </el-button>
          </div>
          <el-input-number
            v-model="donationForm.amount"
            :min="getMinAmount(donationForm.purpose)"
            :precision="2"
            :step="10"
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item label="留言" prop="message">
          <el-input
            v-model="donationForm.message"
            type="textarea"
            :rows="3"
            placeholder="您的留言将激励我们继续前行"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="donationForm.isAnonymous">
            匿名捐赠
          </el-checkbox>
        </el-form-item>

        <el-form-item prop="agreeTerm">
          <el-checkbox v-model="donationForm.agreeTerm">
            我已阅读并同意<el-link type="primary">《捐赠协议》</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :disabled="!donationForm.agreeTerm"
            @click="submitDonation"
          >
            立即捐赠
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="donation-info">
      <template #header>
        <div class="card-header">
          <h2>捐赠须知</h2>
        </div>
      </template>
      <ol>
        <li>所有捐赠款项将用于流浪动物救助工作</li>
        <li>您可以选择匿名捐赠，我们会保护您的隐私</li>
        <li>捐赠完成后，您可以在个人中心查看捐赠记录</li>
        <li>我们会定期公布善款使用情况，接受社会监督</li>
        <li>如有疑问，请联系我们的客服人员</li>
      </ol>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.donation-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .page-header {
    text-align: center;
    margin-bottom: 40px;

    h1 {
      font-size: 32px;
      color: #303133;
      margin-bottom: 10px;
    }

    p {
      color: #909399;
      font-size: 16px;
    }
  }

  .donation-options {
    margin-bottom: 40px;

    .option-card {
      cursor: pointer;
      transition: all 0.3s ease;
      height: 100%;

      &:hover {
        transform: translateY(-5px);
      }

      &.active {
        border-color: #409EFF;
        box-shadow: 0 0 10px rgba(64, 158, 255, 0.2);
      }

      .option-image {
        width: 100%;
        height: 150px;
        object-fit: cover;
        margin-bottom: 15px;
      }

      h3 {
        margin: 0 0 10px;
        font-size: 18px;
        color: #303133;
      }

      p {
        color: #606266;
        font-size: 14px;
        margin-bottom: 15px;
        min-height: 60px;
      }

      .min-amount {
        color: #909399;
        font-size: 14px;
      }
    }
  }

  .donation-form {
    margin-bottom: 40px;

    .quick-amounts {
      margin-bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .el-button {
        &.active {
          background-color: #409EFF;
          color: white;
        }
      }
    }
  }

  .donation-info {
    .card-header {
      h2 {
        margin: 0;
        font-size: 18px;
        color: #303133;
      }
    }

    ol {
      margin: 0;
      padding-left: 20px;

      li {
        color: #606266;
        line-height: 2;
      }
    }
  }
}
</style>