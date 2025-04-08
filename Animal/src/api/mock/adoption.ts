// 领养模块Mock数据
export interface AdoptionApplication {
  id: number;
  animalId: number;
  animalName: string;
  animalType: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  homeEnvironment: string;
  experience: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  submitDate: string;
}

export const adoptionMockData = {
  // 领养申请列表
  adoptionApplications: [
    {
      id: 1,
      animalId: 1,
      animalName: '小白',
      animalType: '猫',
      applicantName: '张三',
      applicantPhone: '13800138001',
      applicantEmail: 'zhangsan@example.com',
      homeEnvironment: '小区公寓，60平米',
      experience: '有养猫经验，之前养过一只猫5年',
      status: 'approved',
      submitDate: '2024-01-15'
    },
    {
      id: 2,
      animalId: 2,
      animalName: '大黄',
      animalType: '狗',
      applicantName: '李四',
      applicantPhone: '13800138002',
      applicantEmail: 'lisi@example.com',
      homeEnvironment: '带院子的别墅，200平米',
      experience: '有养狗经验，家里现有一只柯基',
      status: 'pending',
      submitDate: '2023-12-20'
    }
  ],

  // 领养须知
  adoptionInformation: {
    requirements: [
      '领养人年龄需满18周岁',
      '有固定住所，居住环境适合饲养动物',
      '有稳定收入，能够负担动物日常饲养费用',
      '家庭成员同意领养',
      '承诺不遗弃、不虐待动物'
    ],
    responsibilities: [
      '定期带动物体检、接种疫苗',
      '提供健康合理的饮食',
      '保持居住环境卫生',
      '遛狗时使用牵引绳',
      '为动物提供足够的运动和陪伴'
    ],
    costs: [
      '领养费用：0-300元不等（包含初次体检和疫苗费用）',
      '日常饲养费用：食物、猫砂/尿垫等，约200-500元/月',
      '医疗费用：体检、疫苗、驱虫等，约500-1000元/年'
    ]
  },

  // 领养流程
  adoptionProcess: [
    {
      step: 1,
      title: '提交申请',
      description: '在线填写领养申请表，提供个人基本信息、居住环境和饲养经验等'
    },
    {
      step: 2,
      title: '初步审核',
      description: '救助站工作人员对申请信息进行初步审核，确认是否满足基本条件'
    },
    {
      step: 3,
      title: '线下见面',
      description: '通过初审后，前往救助站与心仪的动物见面，了解动物性格和习性'
    },
    {
      step: 4,
      title: '家访',
      description: '救助站工作人员可能会上门家访，确认居住环境是否适合动物生活'
    },
    {
      step: 5,
      title: '签订协议',
      description: '通过所有审核后，签订领养协议，支付相关费用'
    },
    {
      step: 6,
      title: '带动物回家',
      description: '领取动物，开始新的生活'
    },
    {
      step: 7,
      title: '后续回访',
      description: '救助站会进行定期回访，了解动物适应情况和生活状态'
    }
  ]
}; 