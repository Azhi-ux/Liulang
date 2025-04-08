import { AxiosInstance } from 'axios';
import { getEnvConfig } from '../config';
import { adoptionMockData, AdoptionApplication } from '../mock/adoption';

// 领养相关接口
export default function(axios: AxiosInstance) {
  const { useMock } = getEnvConfig();

  return {
    // 提交领养申请
    submitAdoptionApplication: (data: any) => {
      if (useMock) return Promise.resolve({ id: 100, status: 'pending', ...data });
      return axios.post('/adoptions', data);
    },

    // 获取领养申请状态
    getAdoptionStatus: (id: number) => {
      if (useMock) {
        const application = adoptionMockData.adoptionApplications.find((app: AdoptionApplication) => app.id === id);
        return Promise.resolve(application);
      }
      return axios.get(`/adoptions/${id}`);
    },

    // 取消领养申请
    cancelAdoptionApplication: (id: number) => {
      if (useMock) return Promise.resolve({ success: true });
      return axios.delete(`/adoptions/${id}`);
    },

    // 获取领养须知
    getAdoptionInformation: () => {
      if (useMock) return Promise.resolve(adoptionMockData.adoptionInformation);
      return axios.get('/adoptions/information');
    },

    // 获取领养流程
    getAdoptionProcess: () => {
      if (useMock) return Promise.resolve(adoptionMockData.adoptionProcess);
      return axios.get('/adoptions/process');
    }
  };
} 