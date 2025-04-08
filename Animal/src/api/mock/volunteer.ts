// 志愿者模块Mock数据
export interface VolunteerActivity {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  requiredVolunteers: number;
  currentVolunteers: number;
  skills: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
  image?: string;
}

export interface VolunteerApplication {
  id?: number;
  name: string;
  phone: string;
  email: string;
  age: number;
  experience?: string;
  availableTime: string[];
  reason: string;
  skills?: string[];
  status?: 'pending' | 'approved' | 'rejected';
}

export interface VolunteerRecord {
  id: number;
  activity: string;
  date: string;
  hours: number;
  location: string;
  status?: 'completed' | 'pending';
}

export const volunteerMockData = {
  // 志愿活动列表
  activities: [
    {
      id: 1,
      title: '救助站清洁',
      description: '帮助清理救助站环境，包括清洁猫舍、狗舍，以及公共区域。',
      location: '北京救助站',
      date: '2024-03-15',
      startTime: '09:00',
      endTime: '13:00',
      requiredVolunteers: 10,
      currentVolunteers: 5,
      skills: ['清洁', '基础照料'],
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1587302186428-d82e1d29f405?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
    },
    {
      id: 2,
      title: '动物喂养',
      description: '负责早晚两次喂食，清洁食盆和水盆，记录动物进食情况。',
      location: '北京救助站',
      date: '2024-03-20',
      startTime: '07:00',
      endTime: '10:00',
      requiredVolunteers: 5,
      currentVolunteers: 3,
      skills: ['动物照料', '耐心细致'],
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
    },
    {
      id: 3,
      title: '宠物摄影',
      description: '为待领养动物拍摄照片，制作领养信息卡，提高被领养几率。',
      location: '北京救助站',
      date: '2024-03-25',
      startTime: '14:00',
      endTime: '17:00',
      requiredVolunteers: 3,
      currentVolunteers: 1,
      skills: ['摄影', '耐心'],
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1583511655826-05700a52f8e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
    }
  ],

  // 志愿记录
  volunteerRecords: [
    {
      id: 1,
      activity: '救助站清洁',
      date: '2024-01-18',
      hours: 4,
      location: '北京救助站',
      status: 'completed'
    },
    {
      id: 2,
      activity: '动物喂养',
      date: '2024-01-15',
      hours: 3,
      location: '北京救助站',
      status: 'completed'
    }
  ],

  // 志愿技能
  volunteerSkills: [
    { id: 1, name: '清洁' },
    { id: 2, name: '动物照料' },
    { id: 3, name: '医疗护理' },
    { id: 4, name: '驾驶' },
    { id: 5, name: '摄影' },
    { id: 6, name: '社交媒体运营' },
    { id: 7, name: '活动组织' },
    { id: 8, name: '行政工作' }
  ]
}; 