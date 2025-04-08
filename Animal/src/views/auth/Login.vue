<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 登录表单
const loginForm = reactive({
  email: '',
  password: '',
  remember: false
})

// 注册表单
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  agreeTerms: false
})

// 重置密码表单
const resetForm = reactive({
  email: ''
})

// 当前激活的表单
const activeForm = ref('login')

// 表单验证规则
const loginRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ]
}

const registerRules = {
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

const resetRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

// 表单引用
const loginFormRef = ref()
const registerFormRef = ref()
const resetFormRef = ref()

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  await loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      // TODO: 实现登录逻辑
      ElMessage.success('登录成功')
      router.push('/')
    }
  })
}

// 处理注册
const handleRegister = async () => {
  if (!registerFormRef.value) return
  
  await registerFormRef.value.validate((valid: boolean) => {
    if (valid) {
      // TODO: 实现注册逻辑
      ElMessage.success('注册成功')
      activeForm.value = 'login'
    }
  })
}

// 处理密码重置
const handleReset = async () => {
  if (!resetFormRef.value) return
  
  await resetFormRef.value.validate((valid: boolean) => {
    if (valid) {
      // TODO: 实现密码重置逻辑
      ElMessage.success('重置密码链接已发送到您的邮箱')
      activeForm.value = 'login'
    }
  })
}

// 切换表单
const switchForm = (form: string) => {
  activeForm.value = form
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <img src="/vite.svg" alt="Logo" class="logo">
        <h1>动物救助平台</h1>
        <p>让每一个生命都被温柔以待</p>
      </div>

      <!-- 登录表单 -->
      <div v-show="activeForm === 'login'" class="form-container">
        <h2>登录</h2>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          label-position="top"
        >
          <el-form-item prop="email" label="邮箱">
            <el-input
              v-model="loginForm.email"
              placeholder="请输入邮箱"
              prefix-icon="Message"
            />
          </el-form-item>

          <el-form-item prop="password" label="密码">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <div class="form-options">
            <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
            <el-button link type="primary" @click="switchForm('reset')">
              忘记密码？
            </el-button>
          </div>

          <el-button type="primary" class="submit-btn" @click="handleLogin">
            登录
          </el-button>

          <div class="form-footer">
            <span>还没有账号？</span>
            <el-button link type="primary" @click="switchForm('register')">
              立即注册
            </el-button>
          </div>
        </el-form>
      </div>

      <!-- 注册表单 -->
      <div v-show="activeForm === 'register'" class="form-container">
        <h2>注册</h2>
        <el-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="registerRules"
          label-position="top"
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
            <el-button link type="primary" @click="switchForm('login')">
              立即登录
            </el-button>
          </div>
        </el-form>
      </div>

      <!-- 重置密码表单 -->
      <div v-show="activeForm === 'reset'" class="form-container">
        <h2>重置密码</h2>
        <el-form
          ref="resetFormRef"
          :model="resetForm"
          :rules="resetRules"
          label-position="top"
        >
          <el-form-item prop="email" label="邮箱">
            <el-input
              v-model="resetForm.email"
              placeholder="请输入注册邮箱"
              prefix-icon="Message"
            />
          </el-form-item>

          <el-button type="primary" class="submit-btn" @click="handleReset">
            发送重置链接
          </el-button>

          <div class="form-footer">
            <el-button link type="primary" @click="switchForm('login')">
              返回登录
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  padding: 20px;

  .auth-container {
    width: 100%;
    max-width: 400px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 30px;

    .auth-header {
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

    .form-container {
      h2 {
        font-size: 20px;
        color: #303133;
        margin: 0 0 24px;
        text-align: center;
      }

      .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }

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