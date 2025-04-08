import { AxiosInstance } from 'axios';
import { getEnvConfig } from '../config';
import { userMockData } from '../mock/user';

// 用户相关接口
export default function(axios: AxiosInstance) {
  const { useMock } = getEnvConfig();

  return {
    // 获取用户信息
    getUserInfo: () => {
      if (useMock) return Promise.resolve(userMockData.userInfo);
      return axios.get('/user/info');
    },

    // 更新用户信息
    updateUserInfo: (data: any) => {
      if (useMock) return Promise.resolve({ ...userMockData.userInfo, ...data });
      return axios.put('/user/info', data);
    },

    // 获取领养记录
    getAdoptionRecords: () => {
      if (useMock) return Promise.resolve(userMockData.adoptionRecords);
      return axios.get('/user/adoptions');
    },

    // 获取捐赠记录
    getDonationRecords: () => {
      if (useMock) return Promise.resolve(userMockData.donationRecords);
      return axios.get('/user/donations');
    },

    // 获取志愿记录
    getVolunteerRecords: () => {
      if (useMock) return Promise.resolve(userMockData.volunteerRecords);
      return axios.get('/user/volunteer');
    },

    // 获取收藏的动物
    getFavoriteAnimals: () => {
      if (useMock) return Promise.resolve(userMockData.favoriteAnimals);
      return axios.get('/user/favorites');
    },

    // 添加动物收藏
    addFavorite: (animalId: number) => {
      if (useMock) return Promise.resolve({ success: true });
      return axios.post('/user/favorites', { animalId });
    },

    // 取消动物收藏
    removeFavorite: (animalId: number) => {
      if (useMock) return Promise.resolve({ success: true });
      return axios.delete(`/user/favorites/${animalId}`);
    }
  };
} 