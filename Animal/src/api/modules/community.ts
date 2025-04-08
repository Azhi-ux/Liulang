import { AxiosInstance } from 'axios';
import { getEnvConfig } from '../config';
import { communityMockData, Post, Comment } from '../mock/community';

// 社区相关接口
export default function(axios: AxiosInstance) {
  const { useMock } = getEnvConfig();

  return {
    // 获取帖子列表
    getPosts: (params?: any) => {
      if (useMock) return Promise.resolve({
        total: communityMockData.posts.length,
        list: communityMockData.posts
      });
      return axios.get('/community/posts', { params });
    },

    // 获取帖子详情
    getPostDetail: (id: number) => {
      if (useMock) {
        const post = communityMockData.posts.find((p: Post) => p.id === id);
        return Promise.resolve(post);
      }
      return axios.get(`/community/posts/${id}`);
    },

    // 创建帖子
    createPost: (data: Omit<Post, 'id' | 'createTime' | 'updateTime' | 'commentCount' | 'likeCount'>) => {
      if (useMock) {
        const newPost: Post = {
          id: communityMockData.posts.length + 1,
          commentCount: 0,
          likeCount: 0,
          createTime: new Date().toISOString(),
          updateTime: new Date().toISOString(),
          ...data
        };
        return Promise.resolve(newPost);
      }
      return axios.post('/community/posts', data);
    },

    // 获取帖子评论
    getPostComments: (postId: number) => {
      if (useMock) {
        const comments = communityMockData.comments.filter((c: Comment) => c.postId === postId);
        return Promise.resolve({
          total: comments.length,
          list: comments
        });
      }
      return axios.get(`/community/posts/${postId}/comments`);
    },

    // 添加评论
    addComment: (postId: number, content: string) => {
      if (useMock) {
        const newComment: Comment = {
          id: communityMockData.comments.length + 1,
          postId,
          content,
          author: '当前用户',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
          createTime: new Date().toISOString(),
          likeCount: 0
        };
        return Promise.resolve(newComment);
      }
      return axios.post(`/community/posts/${postId}/comments`, { content });
    },

    // 点赞帖子
    likePost: (postId: number) => {
      if (useMock) return Promise.resolve({ success: true });
      return axios.post(`/community/posts/${postId}/like`);
    },

    // 取消点赞帖子
    unlikePost: (postId: number) => {
      if (useMock) return Promise.resolve({ success: true });
      return axios.delete(`/community/posts/${postId}/like`);
    }
  };
} 