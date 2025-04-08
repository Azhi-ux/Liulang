<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'

const route = useRoute()
const router = useRouter()
const animalId = route.query.animalId

// 表单步骤
const activeStep = ref(0)
const formRef = ref<FormInstance>()

// 表单数据
const formData = reactive({
  // 个人信息
  personalInfo: {
    name: '',
    age: '',
    phone: '',
    email: '',
    occupation: '',
    address: '',
    idCard: ''
  },
  // 居住环境
  livingConditions: {
    housingType: '', // 住房类型：自有/租房
    hasOtherPets: false, // 是否有其他宠物
    otherPetsInfo: '', // 其他宠物信息
    familyMembers: '', // 家庭成员情况
    dailySchedule: '', // 日常作息
    homeSize: '', // 住房面积
    hasAgreement: false // 房东同意（租房情况）
  },
  // 领养意向
  adoptionIntention: {
    reason: '', // 领养原因
    experience: '', // 养宠经验
    preparedness: '', // 准备情况
    commitment: '', // 承诺
    emergencyContact: '', // 紧急联系人
    emergencyPhone: '' // 紧急联系电话
  }
})

// 表单验证规则
const rules = reactive<FormRules>({
  personalInfo: {
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    age: [
      { required: true, message: '请输入年龄', trigger: 'blur' },
      { type: 'number', min: 18, message: '年龄必须大于18岁', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
    ],
    idCard: [
      { required: true, message: '请输入身份证号', trigger: 'blur' },
      { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号', trigger: 'blur' }
    ]
  },
  livingConditions: {
    housingType: [
      { required: true, message: '请选择住房类型', trigger: 'change' }
    ],
    homeSize: [
      { required: true, message: '请输入住房面积', trigger: 'blur' }
    ]
  },
  adoptionIntention: {
    reason: [
      { required: true, message: '请输入领养原因', trigger: 'blur' },
      { min: 50, message: '请详细描述领养原因（至少50字）', trigger: 'blur' }
    ],
    emergencyContact: [
      { required: true, message: '请输入紧急联系人', trigger: 'blur' }
    ],
    emergencyPhone: [
      { required: true, message: '请输入紧急联系电话', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ]
  }
})

// 步骤标题
const steps = [
  {
    title: '个人信息',
    description: '请填写您的基本信息'
  },
  {
    title: '居住环境',
    description: '请描述您的居住条件'
  },
  {
    title: '领养意向',
    description: '请说明您的领养意愿'
  },
  {
    title: '确认提交',
    description: '确认信息并提交申请'
  }
]

// 住房类型选项
const housingTypes = [
  { value: 'owned', label: '自有住房' },
  { value: 'rented', label: '租房' },
  { value: 'other', label: '其他' }
]

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('申请提交成功！我们会尽快审核您的申请。')
      router.push('/user')
    } else {
      ElMessage.error('请完善所有必填信息')
      return false
    }
  })
}

// 下一步
const nextStep = async () => {
  if (activeStep.value < steps.length - 1) {
    if (!formRef.value) return
    
    await formRef.value.validate((valid) => {
      if (valid) {
        activeStep.value++
      } else {
        ElMessage.error('请完善当前步骤的必填信息')
        return false
      }
    })
  }
}

// 上一步
const prevStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--
  }
}
</script>

<template>
  <div class="adoption-form">
    <el-card class="form-card">
      <template #header>
        <div class="card-header">
          <h1>领养申请</h1>
          <p>请认真填写以下信息，我们会仔细审核每一份申请</p>
        </div>
      </template>

      <el-steps :active="activeStep" finish-status="success" align-center>
        <el-step
          v-for="(step, index) in steps"
          :key="index"
          :title="step.title"
          :description="step.description"
        />
      </el-steps>

      <div class="form-container">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-position="top"
        >
          <!-- 第一步：个人信息 -->
          <div v-show="activeStep === 0">
            <h2>个人信息</h2>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="姓名" prop="personalInfo.name">
                  <el-input v-model="formData.personalInfo.name" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="年龄" prop="personalInfo.age">
                  <el-input-number v-model="formData.personalInfo.age" :min="18" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="手机号" prop="personalInfo.phone">
                  <el-input v-model="formData.personalInfo.phone" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱" prop="personalInfo.email">
                  <el-input v-model="formData.personalInfo.email" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="职业" prop="personalInfo.occupation">
              <el-input v-model="formData.personalInfo.occupation" />
            </el-form-item>

            <el-form-item label="居住地址" prop="personalInfo.address">
              <el-input v-model="formData.personalInfo.address" />
            </el-form-item>

            <el-form-item label="身份证号" prop="personalInfo.idCard">
              <el-input v-model="formData.personalInfo.idCard" />
            </el-form-item>
          </div>

          <!-- 第二步：居住环境 -->
          <div v-show="activeStep === 1">
            <h2>居住环境</h2>
            <el-form-item label="住房类型" prop="livingConditions.housingType">
              <el-select v-model="formData.livingConditions.housingType" placeholder="请选择住房类型">
                <el-option
                  v-for="item in housingTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="住房面积（平方米）" prop="livingConditions.homeSize">
              <el-input-number v-model="formData.livingConditions.homeSize" :min="1" />
            </el-form-item>

            <el-form-item label="是否有其他宠物">
              <el-switch v-model="formData.livingConditions.hasOtherPets" />
            </el-form-item>

            <el-form-item
              v-if="formData.livingConditions.hasOtherPets"
              label="其他宠物情况"
              prop="livingConditions.otherPetsInfo"
            >
              <el-input
                v-model="formData.livingConditions.otherPetsInfo"
                type="textarea"
                placeholder="请描述现有宠物的情况"
              />
            </el-form-item>

            <el-form-item label="家庭成员情况" prop="livingConditions.familyMembers">
              <el-input
                v-model="formData.livingConditions.familyMembers"
                type="textarea"
                placeholder="请描述家庭成员构成及是否同意养宠物"
              />
            </el-form-item>

            <el-form-item label="日常作息" prop="livingConditions.dailySchedule">
              <el-input
                v-model="formData.livingConditions.dailySchedule"
                type="textarea"
                placeholder="请描述您的工作时间安排"
              />
            </el-form-item>
          </div>

          <!-- 第三步：领养意向 -->
          <div v-show="activeStep === 2">
            <h2>领养意向</h2>
            <el-form-item label="领养原因" prop="adoptionIntention.reason">
              <el-input
                v-model="formData.adoptionIntention.reason"
                type="textarea"
                :rows="4"
                placeholder="请详细说明您想要领养的原因"
              />
            </el-form-item>

            <el-form-item label="养宠经验" prop="adoptionIntention.experience">
              <el-input
                v-model="formData.adoptionIntention.experience"
                type="textarea"
                :rows="4"
                placeholder="请描述您过去的养宠经验"
              />
            </el-form-item>

            <el-form-item label="领养准备" prop="adoptionIntention.preparedness">
              <el-input
                v-model="formData.adoptionIntention.preparedness"
                type="textarea"
                :rows="4"
                placeholder="请描述您为领养做了哪些准备"
              />
            </el-form-item>

            <el-form-item label="紧急联系人" prop="adoptionIntention.emergencyContact">
              <el-input v-model="formData.adoptionIntention.emergencyContact" />
            </el-form-item>

            <el-form-item label="紧急联系电话" prop="adoptionIntention.emergencyPhone">
              <el-input v-model="formData.adoptionIntention.emergencyPhone" />
            </el-form-item>
          </div>

          <!-- 第四步：确认信息 -->
          <div v-show="activeStep === 3">
            <h2>确认信息</h2>
            <el-descriptions title="个人信息" :column="2" border>
              <el-descriptions-item label="姓名">{{ formData.personalInfo.name }}</el-descriptions-item>
              <el-descriptions-item label="年龄">{{ formData.personalInfo.age }}</el-descriptions-item>
              <el-descriptions-item label="手机号">{{ formData.personalInfo.phone }}</el-descriptions-item>
              <el-descriptions-item label="邮箱">{{ formData.personalInfo.email }}</el-descriptions-item>
              <el-descriptions-item label="职业">{{ formData.personalInfo.occupation }}</el-descriptions-item>
              <el-descriptions-item label="地址">{{ formData.personalInfo.address }}</el-descriptions-item>
            </el-descriptions>

            <el-descriptions title="居住环境" :column="2" border>
              <el-descriptions-item label="住房类型">{{ formData.livingConditions.housingType }}</el-descriptions-item>
              <el-descriptions-item label="住房面积">{{ formData.livingConditions.homeSize }}平方米</el-descriptions-item>
              <el-descriptions-item label="其他宠物">{{ formData.livingConditions.hasOtherPets ? '有' : '无' }}</el-descriptions-item>
              <el-descriptions-item label="家庭成员">{{ formData.livingConditions.familyMembers }}</el-descriptions-item>
            </el-descriptions>

            <el-alert
              title="提交须知"
              type="warning"
              description="提交申请即表示您同意遵守我们的领养协议，并承诺为动物提供良好的生活环境。我们将在3个工作日内完成审核，请保持电话畅通。"
              show-icon
              :closable="false"
              style="margin: 20px 0"
            />
          </div>
        </el-form>

        <!-- 表单按钮 -->
        <div class="form-buttons">
          <el-button v-if="activeStep > 0" @click="prevStep">上一步</el-button>
          <el-button
            v-if="activeStep < steps.length - 1"
            type="primary"
            @click="nextStep"
          >
            下一步
          </el-button>
          <el-button
            v-if="activeStep === steps.length - 1"
            type="success"
            @click="submitForm"
          >
            提交申请
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.adoption-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .form-card {
    .card-header {
      text-align: center;
      margin-bottom: 20px;

      h1 {
        margin: 0;
        font-size: 24px;
        color: #303133;
      }

      p {
        margin: 10px 0 0;
        color: #909399;
      }
    }
  }

  .form-container {
    margin-top: 30px;

    h2 {
      margin: 20px 0;
      font-size: 18px;
      color: #303133;
    }

    .el-form-item {
      margin-bottom: 20px;
    }
  }

  .form-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
  }

  :deep(.el-step__title) {
    font-size: 14px;
  }

  :deep(.el-step__description) {
    font-size: 12px;
  }

  :deep(.el-descriptions) {
    margin: 20px 0;
  }
}
</style>