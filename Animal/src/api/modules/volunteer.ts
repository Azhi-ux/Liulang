import { AxiosInstance } from 'axios';
import { getEnvConfig } from '../config';
import { volunteerMockData, VolunteerActivity, VolunteerApplication } from '../mock/volunteer';

// 志愿者相关接口
export default function(axios: AxiosInstance) {
  const { useMock } = getEnvConfig();

  return {
    // 获取志愿活动列表
    getVolunteerActivities: (params?: any) => {
      if (useMock) return Promise.resolve({
        total: volunteerMockData.activities.length,
        list: volunteerMockData.activities
      });
      return axios.get('/volunteer/activities', { params });
    },

    // 获取志愿活动详情
    getVolunteerActivityDetail: (id: number) => {
      if (useMock) {
        const activity = volunteerMockData.activities.find((a: VolunteerActivity) => a.id === id);
        return Promise.resolve(activity);
      }
      return axios.get(`/volunteer/activities/${id}`);
    },

    // 提交志愿者申请
    submitVolunteerApplication: (data: VolunteerApplication) => {
      if (useMock) return Promise.resolve({ id: 100, status: 'pending', ...data });
      return axios.post('/volunteer/apply', data);
    },

    // 获取用户志愿记录
    getUserVolunteerRecords: () => {
      if (useMock) return Promise.resolve(volunteerMockData.volunteerRecords);
      return axios.get('/volunteer/records');
    },

    // 签到志愿活动
    checkInActivity: (activityId: number) => {
      if (useMock) return Promise.resolve({ success: true });
      return axios.post(`/volunteer/activities/${activityId}/checkin`);
    },

    // 签退志愿活动
    checkOutActivity: (activityId: number, hours: number) => {
      if (useMock) return Promise.resolve({ success: true, hours });
      return axios.post(`/volunteer/activities/${activityId}/checkout`, { hours });
    }
  };
} 