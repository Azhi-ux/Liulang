import { AxiosInstance } from 'axios';
import { getEnvConfig } from '../config';
import { donationMockData, Donation, DonationProject } from '../mock/donation';

// 捐赠相关接口
export default function(axios: AxiosInstance) {
  const { useMock } = getEnvConfig();

  return {
    // 获取捐赠项目列表
    getDonationProjects: () => {
      if (useMock) return Promise.resolve(donationMockData.donationProjects);
      return axios.get('/donations/projects');
    },

    // 获取捐赠项目详情
    getDonationProjectDetail: (id: number) => {
      if (useMock) {
        const project = donationMockData.donationProjects.find((p: DonationProject) => p.id === id);
        return Promise.resolve(project);
      }
      return axios.get(`/donations/projects/${id}`);
    },

    // 提交捐赠
    submitDonation: (data: Donation) => {
      if (useMock) return Promise.resolve({ id: 100, status: 'success', ...data });
      return axios.post('/donations', data);
    },

    // 获取捐赠列表
    getDonationList: (params: any) => {
      if (useMock) return Promise.resolve({
        total: donationMockData.donations.length,
        list: donationMockData.donations
      });
      return axios.get('/donations', { params });
    },

    // 获取捐赠统计
    getDonationStats: () => {
      if (useMock) return Promise.resolve(donationMockData.donationStats);
      return axios.get('/donations/stats');
    }
  };
} 