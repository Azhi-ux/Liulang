<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  agreeTerms: false
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  agreeTerms: [
    {
      validator: (rule: any, value: boolean, callback: Function) => {
        if (!value) {
          callback(new Error('请同意用户协议和隐私政策'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
}

const formRef = ref()

const handleRegister = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('注册成功！')
      router.push('/login')
    }
  })
}
</script>

<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-header">
        <img src="/vite.svg" alt="Logo" class="logo">
        <h1>注册账号</h1>
        <p>加入我们，一起为流浪动物提供温暖</p>
      </div>

      <el-form
        ref="formRef"
        :model="registerForm"
        :rules="rules"
        label-position="top"
        class="register-form"
      >
        <el-form-item prop="username" label="用户名">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
          />
        </el-form-item>

        <el-form-item prop="email" label="邮箱">
          <el-input
            v-model="registerForm.email"
            placeholder="请输入邮箱"
            prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item prop="phone" label="手机号">
          <el-input
            v-model="registerForm.phone"
            placeholder="请输入手机号"
            prefix-icon="Phone"
          />
        </el-form-item>

        <el-form-item prop="password" label="密码">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请确认密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item prop="agreeTerms">
          <el-checkbox v-model="registerForm.agreeTerms">
            我已阅读并同意
            <el-button link type="primary">《用户协议》</el-button>
            和
            <el-button link type="primary">《隐私政策》</el-button>
          </el-checkbox>
        </el-form-item>

        <el-button type="primary" class="submit-btn" @click="handleRegister">
          注册
        </el-button>

        <div class="form-footer">
          <span>已有账号？</span>
          <el-button link type="primary" @click="router.push('/login')">
            立即登录
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  padding: 20px;

  .register-container {
    width: 100%;
    max-width: 400px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 30px;

    .register-header {
      text-align: center;
      margin-bottom: 30px;

      .logo {
        width: 64px;
        height: 64px;
        margin-bottom: 16px;
      }

      h1 {
        font-size: 24px;
        color: #303133;
        margin: 0 0 8px;
      }

      p {
        color: #909399;
        font-size: 14px;
        margin: 0;
      }
    }

    .register-form {
      .submit-btn {
        width: 100%;
        margin-bottom: 16px;
      }

      .form-footer {
        text-align: center;
        color: #909399;

        span {
          margin-right: 4px;
        }
      }
    }
  }
}
</style>