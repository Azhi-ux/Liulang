// 动物模块Mock数据
export interface Animal {
  id: number;
  name: string;
  type: string;
  age: string;
  gender: string;
  size: string;
  breed: string;
  description: string;
  healthStatus: string;
  vaccinationStatus: string;
  adoptionStatus: string;
  images: string[];
  createdAt: string;
}

export const animalMockData = {
  // 动物类型列表
  animalTypes: [
    { id: 1, name: '猫', count: 10 },
    { id: 2, name: '狗', count: 8 },
    { id: 3, name: '兔子', count: 3 },
    { id: 4, name: '鸟类', count: 2 },
    { id: 5, name: '其他', count: 4 }
  ],

  // 动物列表
  animalList: [
    {
      id: 1,
      name: '小白',
      type: '猫',
      age: '2岁',
      gender: '母',
      size: '中等',
      breed: '中华田园猫',
      description: '小白是一只活泼可爱的小猫，非常喜欢和人互动，适合有猫咪经验的家庭。',
      healthStatus: '健康',
      vaccinationStatus: '已完成基础疫苗',
      adoptionStatus: 'available',
      images: [
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
      ],
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: '大黄',
      type: '狗',
      age: '1岁',
      gender: '公',
      size: '大型',
      breed: '拉布拉多',
      description: '大黄是一只活力充沛的大型犬，需要足够的运动空间，适合有经验的狗主人。',
      healthStatus: '健康',
      vaccinationStatus: '已完成基础疫苗',
      adoptionStatus: 'available',
      images: [
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
      ],
      createdAt: '2023-12-20'
    },
    {
      id: 3,
      name: '咪咪',
      type: '猫',
      age: '1岁',
      gender: '母',
      size: '小型',
      breed: '英国短毛猫',
      description: '咪咪是一只安静温顺的小猫，适合安静的家庭环境。',
      healthStatus: '健康',
      vaccinationStatus: '已完成基础疫苗',
      adoptionStatus: 'available',
      images: [
        'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
      ],
      createdAt: '2024-01-05'
    },
    {
      id: 4,
      name: '旺财',
      type: '狗',
      age: '3岁',
      gender: '公',
      size: '中型',
      breed: '柴犬',
      description: '旺财性格开朗友善，已绝育，适合有小孩的家庭。',
      healthStatus: '健康',
      vaccinationStatus: '已完成基础疫苗',
      adoptionStatus: 'processing',
      images: [
        'https://images.unsplash.com/photo-1550697851-920b181d27da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
      ],
      createdAt: '2023-11-10'
    }
  ]
}; 