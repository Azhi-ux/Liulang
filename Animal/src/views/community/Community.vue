<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface Post {
  id: number
  title: string
  content: string
  author: string
  avatar: string
  date: string
  likes: number
  comments: number
  tags: string[]
  images?: string[]
}

const router = useRouter()

// 帖子列表数据
const posts = ref<Post[]>([
  {
    id: 1,
    title: '我家领养的小猫近况',
    content: '三个月前从平台领养的小猫现在活泼可爱，非常粘人。分享一些日常照片，希望大家也能给流浪动物一个温暖的家。',
    author: '爱心铲屎官',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    date: '2024-01-20 14:30',
    likes: 25,
    comments: 8,
    tags: ['领养分享', '猫咪', '日常'],
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
    ]
  },
  {
    id: 2,
    title: '救助站志愿者招募',
    content: '我们的救助站需要更多志愿者帮助照顾流浪动物，主要工作包括清洁、喂食、陪伴动物等。欢迎有爱心的朋友加入我们！',
    author: '救助站站长',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    date: '2024-01-19 16:45',
    likes: 42,
    comments: 15,
    tags: ['志愿者招募', '公益活动'],
    images: [
      'https://images.unsplash.com/photo-1550697851-920b181d27da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
    ]
  }
])

// 发帖对话框
const postDialogVisible = ref(false)
const newPost = ref({
  title: '',
  content: '',
  tags: [] as string[],
  images: [] as string[]
})

// 标签选项
const tagOptions = [
  { value: '领养分享', label: '领养分享' },
  { value: '救助故事', label: '救助故事' },
  { value: '志愿者招募', label: '志愿者招募' },
  { value: '日常', label: '日常' },
  { value: '求助', label: '求助' },
  { value: '公益活动', label: '公益活动' }
]

// 筛选条件
const filters = ref({
  tag: '',
  timeRange: '',
  sortBy: 'newest'
})

// 排序选项
const sortOptions = [
  { value: 'newest', label: '最新发布' },
  { value: 'mostLiked', label: '最多点赞' },
  { value: 'mostCommented', label: '最多评论' }
]

// 根据筛选条件过滤帖子
const filteredPosts = computed(() => {
  let result = [...posts.value]
  
  // 标签筛选
  if (filters.value.tag) {
    result = result.filter(post => post.tags.includes(filters.value.tag))
  }
  
  // 排序
  switch (filters.value.sortBy) {
    case 'mostLiked':
      result.sort((a, b) => b.likes - a.likes)
      break
    case 'mostCommented':
      result.sort((a, b) => b.comments - a.comments)
      break
    default:
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  
  return result
})

// 发布新帖子
const submitPost = () => {
  if (!newPost.value.title || !newPost.value.content) {
    ElMessage.warning('请填写标题和内容')
    return
  }

  const post: Post = {
    id: posts.value.length + 1,
    title: newPost.value.title,
    content: newPost.value.content,
    author: '当前用户',
    avatar: 'https://placekitten.com/102/102',
    date: new Date().toLocaleString(),
    likes: 0,
    comments: 0,
    tags: newPost.value.tags,
    images: newPost.value.images
  }

  posts.value.unshift(post)
  postDialogVisible.value = false
  newPost.value = {
    title: '',
    content: '',
    tags: [],
    images: []
  }
  ElMessage.success('发布成功')
}

// 点赞
const handleLike = (post: Post) => {
  post.likes++
  ElMessage({
    message: '点赞成功',
    type: 'success'
  })
}

// 评论
const handleComment = (post: Post) => {
  ElMessage('评论功能开发中')
}

// 分享
const handleShare = (post: Post) => {
  ElMessage('分享功能开发中')
}
</script>

<template>
  <div class="community">
    <div class="page-header">
      <h1>社区交流</h1>
      <p>在这里分享你的领养故事和救助经历</p>
    </div>

    <!-- 操作栏 -->
    <div class="action-bar">
      <el-row :gutter="20" justify="space-between" align="middle">
        <el-col :span="16">
          <el-select v-model="filters.tag" placeholder="按标签筛选" clearable>
            <el-option
              v-for="tag in tagOptions"
              :key="tag.value"
              :label="tag.label"
              :value="tag.value"
            />
          </el-select>
          <el-select v-model="filters.sortBy" placeholder="排序方式" style="margin-left: 10px">
            <el-option
              v-for="option in sortOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-col>
        <el-col :span="8" style="text-align: right">
          <el-button type="primary" @click="postDialogVisible = true">
            发布帖子
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 帖子列表 -->
    <div class="post-list">
      <el-card v-for="post in filteredPosts" :key="post.id" class="post-card">
        <div class="post-header">
          <div class="author-info">
            <el-avatar :src="post.avatar" />
            <div class="author-detail">
              <span class="author-name">{{ post.author }}</span>
              <span class="post-date">{{ post.date }}</span>
            </div>
          </div>
          <div class="post-tags">
            <el-tag
              v-for="tag in post.tags"
              :key="tag"
              size="small"
              class="tag"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>

        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-content">{{ post.content }}</p>

        <div v-if="post.images" class="post-images">
          <el-image
            v-for="(image, index) in post.images"
            :key="index"
            :src="image"
            :preview-src-list="post.images"
            fit="cover"
            class="post-image"
          />
        </div>

        <div class="post-actions">
          <el-button text @click="handleLike(post)">
            <el-icon><ThumbsUp /></el-icon>
            {{ post.likes }} 点赞
          </el-button>
          <el-button text @click="handleComment(post)">
            <el-icon><ChatLineRound /></el-icon>
            {{ post.comments }} 评论
          </el-button>
          <el-button text @click="handleShare(post)">
            <el-icon><Share /></el-icon>
            分享
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 发帖对话框 -->
    <el-dialog
      v-model="postDialogVisible"
      title="发布帖子"
      width="50%"
    >
      <el-form :model="newPost" label-position="top">
        <el-form-item label="标题" required>
          <el-input v-model="newPost.title" placeholder="请输入标题" />
        </el-form-item>
        
        <el-form-item label="内容" required>
          <el-input
            v-model="newPost.content"
            type="textarea"
            :rows="4"
            placeholder="分享你的故事..."
          />
        </el-form-item>

        <el-form-item label="标签">
          <el-select
            v-model="newPost.tags"
            multiple
            placeholder="选择标签"
          >
            <el-option
              v-for="tag in tagOptions"
              :key="tag.value"
              :label="tag.label"
              :value="tag.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="postDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPost">发布</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.community {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .page-header {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      font-size: 32px;
      color: #303133;
      margin-bottom: 10px;
    }

    p {
      color: #909399;
      font-size: 16px;
    }
  }

  .action-bar {
    margin-bottom: 20px;
  }

  .post-list {
    .post-card {
      margin-bottom: 20px;

      .post-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        .author-info {
          display: flex;
          align-items: center;
          gap: 10px;

          .author-detail {
            display: flex;
            flex-direction: column;

            .author-name {
              font-weight: bold;
              color: #303133;
            }

            .post-date {
              font-size: 12px;
              color: #909399;
            }
          }
        }

        .post-tags {
          .tag {
            margin-left: 5px;
          }
        }
      }

      .post-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        color: #303133;
      }

      .post-content {
        color: #606266;
        margin-bottom: 15px;
        line-height: 1.6;
      }

      .post-images {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
        overflow-x: auto;

        .post-image {
          width: 200px;
          height: 150px;
          border-radius: 4px;
        }
      }

      .post-actions {
        display: flex;
        gap: 20px;
        padding-top: 15px;
        border-top: 1px solid #EBEEF5;

        .el-button {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }
    }
  }
}

:deep(.el-dialog__body) {
  padding-top: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>