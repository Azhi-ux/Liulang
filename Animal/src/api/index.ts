import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getEnvConfig } from './config';
import userApi from './modules/user';
import animalApi from './modules/animal';
import adoptionApi from './modules/adoption';
import donationApi from './modules/donation';
import volunteerApi from './modules/volunteer';
import communityApi from './modules/community';

// 创建axios实例
const instance = axios.create({
  baseURL: getEnvConfig().apiBaseUrl,
  timeout: 10000
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 添加token到请求头
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const res = response.data;
    // 统一处理响应
    if (res.code !== 200) {
      ElMessage.error(res.message || '发生错误');
      
      // 401: 未登录或token过期
      if (res.code === 401) {
        // 可以在这里处理登出逻辑
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(new Error(res.message || '发生错误'));
    } else {
      return res.data;
    }
  },
  error => {
    ElMessage.error(error.message || '网络错误');
    return Promise.reject(error);
  }
);

// 导出API
export default {
  user: userApi(instance),
  animal: animalApi(instance),
  adoption: adoptionApi(instance),
  donation: donationApi(instance),
  volunteer: volunteerApi(instance),
  community: communityApi(instance)
}; 