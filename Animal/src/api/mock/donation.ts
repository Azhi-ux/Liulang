// 捐赠模块Mock数据
export interface Donation {
  id?: number;
  amount: number;
  purpose: string;
  name: string;
  phone?: string;
  email?: string;
  message?: string;
  paymentMethod: string;
  status?: string;
  date?: string;
}

export interface DonationProject {
  id: number;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string;
  coverImage: string;
  status: 'ongoing' | 'completed' | 'upcoming';
}

export const donationMockData = {
  // 捐赠项目
  donationProjects: [
    {
      id: 1,
      title: '流浪猫医疗救助项目',
      description: '为受伤、生病的流浪猫提供医疗救助，包括绝育手术、疫苗接种和常规治疗。',
      targetAmount: 10000,
      currentAmount: 6500,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      status: 'ongoing'
    },
    {
      id: 2,
      title: '救助站扩建项目',
      description: '扩建现有救助站，增加收容能力，改善动物居住环境。',
      targetAmount: 50000,
      currentAmount: 15000,
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      coverImage: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      status: 'ongoing'
    },
    {
      id: 3,
      title: '流浪狗绝育计划',
      description: '为城市流浪狗实施TNR（捕捉-绝育-放归）计划，控制流浪狗数量。',
      targetAmount: 20000,
      currentAmount: 20000,
      startDate: '2023-10-01',
      endDate: '2024-03-31',
      coverImage: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      status: 'completed'
    }
  ],

  // 捐赠记录
  donations: [
    {
      id: 1,
      amount: 500,
      purpose: '医疗救助',
      name: '李明',
      phone: '13800138001',
      email: 'liming@example.com',
      message: '希望能帮助更多的小动物',
      paymentMethod: '微信支付',
      status: 'success',
      date: '2024-01-20'
    },
    {
      id: 2,
      amount: 300,
      purpose: '日常食物',
      name: '王芳',
      phone: '13800138002',
      email: 'wangfang@example.com',
      paymentMethod: '支付宝',
      status: 'success',
      date: '2024-01-10'
    },
    {
      id: 3,
      amount: 1000,
      purpose: '救助站扩建',
      name: '张强',
      phone: '13800138003',
      email: 'zhangqiang@example.com',
      message: '支持救助站扩建，希望能为流浪动物提供更好的环境',
      paymentMethod: '银行转账',
      status: 'success',
      date: '2024-01-05'
    }
  ],

  // 捐赠统计
  donationStats: {
    totalAmount: 35000,
    donorCount: 120,
    projectCount: 5,
    monthlyStats: [
      { month: '2023-07', amount: 2000 },
      { month: '2023-08', amount: 3500 },
      { month: '2023-09', amount: 2800 },
      { month: '2023-10', amount: 4000 },
      { month: '2023-11', amount: 3000 },
      { month: '2023-12', amount: 5000 },
      { month: '2024-01', amount: 8000 },
      { month: '2024-02', amount: 6700 }
    ],
    purposeStats: [
      { purpose: '医疗救助', amount: 12000 },
      { purpose: '日常食物', amount: 8000 },
      { purpose: '救助站扩建', amount: 15000 }
    ]
  }
}; 