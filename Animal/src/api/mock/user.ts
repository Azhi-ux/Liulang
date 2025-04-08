// 用户模块Mock数据
export const userMockData = {
  // 用户信息
  userInfo: {
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    username: '爱心用户',
    email: 'user@example.com',
    phone: '13800138000',
    joinDate: '2024-01-01',
    volunteerHours: 24,
    donationAmount: 1000,
    adoptions: 2
  },

  // 领养记录
  adoptionRecords: [
    {
      id: 1,
      animalName: '小白',
      animalType: '猫',
      adoptDate: '2024-01-15',
      status: 'approved',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
    },
    {
      id: 2,
      animalName: '大黄',
      animalType: '狗',
      adoptDate: '2023-12-20',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
    }
  ],

  // 捐赠记录
  donationRecords: [
    {
      id: 1,
      amount: 500,
      purpose: '医疗救助',
      date: '2024-01-20',
      status: 'success'
    },
    {
      id: 2,
      amount: 300,
      purpose: '日常食物',
      date: '2024-01-10',
      status: 'success'
    }
  ],

  // 志愿记录
  volunteerRecords: [
    {
      id: 1,
      activity: '救助站清洁',
      date: '2024-01-18',
      hours: 4,
      location: '北京救助站'
    },
    {
      id: 2,
      activity: '动物喂养',
      date: '2024-01-15',
      hours: 3,
      location: '北京救助站'
    }
  ],

  // 收藏的动物
  favoriteAnimals: [
    {
      id: 1,
      name: '咪咪',
      type: '猫',
      age: '2岁',
      image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
    },
    {
      id: 2,
      name: '旺财',
      type: '狗',
      age: '1岁',
      image: 'https://images.unsplash.com/photo-1550697851-920b181d27da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
    }
  ]
}; 