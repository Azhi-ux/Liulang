// 社区模块Mock数据
export interface Post {
  id: number;
  title: string;
  content: string;
  images?: string[];
  author: string;
  avatar: string;
  tags?: string[];
  createTime: string;
  updateTime: string;
  commentCount: number;
  likeCount: number;
}

export interface Comment {
  id: number;
  postId: number;
  content: string;
  author: string;
  avatar: string;
  createTime: string;
  likeCount: number;
}

export const communityMockData = {
  // 帖子列表
  posts: [
    {
      id: 1,
      title: '我家猫咪的日常',
      content: '分享一下我家猫咪的日常生活，它非常可爱，喜欢在我工作的时候爬到键盘上。',
      images: [
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
      ],
      author: '猫咪爱好者',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      tags: ['猫咪', '日常', '分享'],
      createTime: '2024-03-01T10:30:00Z',
      updateTime: '2024-03-01T10:30:00Z',
      commentCount: 5,
      likeCount: 12
    },
    {
      id: 2,
      title: '关于狗狗训练的一些心得',
      content: '最近一直在训练我家的金毛，想分享一些训练心得。首先是要有耐心，其次是要保持训练的一致性...',
      images: [
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
      ],
      author: '狗狗训练师',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      tags: ['狗狗', '训练', '心得'],
      createTime: '2024-02-28T14:15:00Z',
      updateTime: '2024-02-28T14:15:00Z',
      commentCount: 8,
      likeCount: 20
    },
    {
      id: 3,
      title: '我从救助站领养了一只猫，改变了我的生活',
      content: '一个月前，我从救助站领养了一只三岁的橘猫。它的到来让我的生活发生了很多积极的变化...',
      images: [
        'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
      ],
      author: '橘猫铲屎官',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      tags: ['领养', '救助', '生活改变'],
      createTime: '2024-02-25T09:45:00Z',
      updateTime: '2024-02-25T09:45:00Z',
      commentCount: 12,
      likeCount: 35
    }
  ],

  // 评论列表
  comments: [
    {
      id: 1,
      postId: 1,
      content: '你家猫咪真可爱！是什么品种？',
      author: '爱猫人士',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      createTime: '2024-03-01T11:30:00Z',
      likeCount: 3
    },
    {
      id: 2,
      postId: 1,
      content: '看起来很健康，护理得很好！',
      author: '宠物医生',
      avatar: 'https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      createTime: '2024-03-01T12:15:00Z',
      likeCount: 5
    },
    {
      id: 3,
      postId: 2,
      content: '非常实用的建议，感谢分享！',
      author: '狗狗新手',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      createTime: '2024-02-28T16:30:00Z',
      likeCount: 2
    },
    {
      id: 4,
      postId: 3,
      content: '领养代替购买，支持你！',
      author: '动物保护者',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      createTime: '2024-02-25T10:30:00Z',
      likeCount: 8
    }
  ],

  // 标签列表
  tags: [
    { name: '猫咪', count: 10 },
    { name: '狗狗', count: 8 },
    { name: '领养', count: 5 },
    { name: '训练', count: 6 },
    { name: '救助', count: 4 },
    { name: '日常', count: 12 },
    { name: '心得', count: 7 },
    { name: '分享', count: 15 }
  ]
};