<script setup lang="ts">
import { ref } from 'vue'

interface Donation {
  id: number
  donor: string
  amount: number
  purpose: string
  message: string
  date: string
  status: string
  isAnonymous: boolean
}

// 捐赠记录列表
const donations = ref<Donation[]>([
  {
    id: 1,
    donor: '张三',
    amount: 100,
    purpose: '医疗救助',
    message: '希望能帮助更多的流浪动物',
    date: '2024-01-20 14:30:00',
    status: 'success',
    isAnonymous: false
  },
  {
    id: 2,
    donor: '匿名用户',
    amount: 200,
    purpose: '日常食物',
    message: '祝福所有的小动物都能找到温暖的家',
    date: '2024-01-19 09:15:00',
    status: 'success',
    isAnonymous: true
  },
  {
    id: 3,
    donor: '李四',
    amount: 500,
    purpose: '住所改善',
    message: '为流浪动物提供更好的住所',
    date: '2024-01-18 16:45:00',
    status: 'success',
    isAnonymous: false
  }
])

// 表格列配置
const columns = [
  {
    prop: 'donor',
    label: '捐赠人',
    width: '120'
  },
  {
    prop: 'amount',
    label: '金额',
    width: '120',
    formatter: (row: Donation) => `¥${row.amount.toFixed(2)}`
  },
  {
    prop: 'purpose',
    label: '用途',
    width: '120'
  },
  {
    prop: 'message',
    label: '留言'
  },
  {
    prop: 'date',
    label: '日期',
    width: '180'
  },
  {
    prop: 'status',
    label: '状态',
    width: '100'
  }
]

// 统计数据
const statistics = ref({
  totalAmount: 800,
  totalDonors: 3,
  monthlyAmount: 800,
  averageAmount: 266.67
})

// 搜索条件
const searchForm = ref({
  dateRange: [],
  purpose: '',
  minAmount: '',
  maxAmount: ''
})

// 重置搜索
const resetSearch = () => {
  searchForm.value = {
    dateRange: [],
    purpose: '',
    minAmount: '',
    maxAmount: ''
  }
}

// 导出数据
const exportData = () => {
  ElMessage.success('数据导出功能开发中')
}
</script>

<template>
  <div class="donation-list">
    <div class="page-header">
      <h1>捐赠记录</h1>
      <p>感谢每一位爱心人士的支持</p>
    </div>

    <!-- 统计卡片 -->
    <el-row :gutter="20" class="statistics">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="stat-header">
              <span>总捐赠金额</span>
            </div>
          </template>
          <div class="stat-content">
            <span class="amount">¥{{ statistics.totalAmount.toFixed(2) }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="stat-header">
              <span>捐赠人数</span>
            </div>
          </template>
          <div class="stat-content">
            <span class="amount">{{ statistics.totalDonors }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="stat-header">
              <span>本月捐赠</span>
            </div>
          </template>
          <div class="stat-content">
            <span class="amount">¥{{ statistics.monthlyAmount.toFixed(2) }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="stat-header">
              <span>平均捐赠</span>
            </div>
          </template>
          <div class="stat-content">
            <span class="amount">¥{{ statistics.averageAmount.toFixed(2) }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 搜索栏 -->
    <el-card class="search-card">
      <el-form :model="searchForm" label-width="100px" :inline="true">
        <el-form-item label="日期范围">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="捐赠用途">
          <el-select v-model="searchForm.purpose" placeholder="请选择" clearable>
            <el-option label="医疗救助" value="medical" />
            <el-option label="日常食物" value="food" />
            <el-option label="住所改善" value="shelter" />
            <el-option label="平台运营" value="operation" />
          </el-select>
        </el-form-item>
        <el-form-item label="金额范围">
          <el-input-number
            v-model="searchForm.minAmount"
            placeholder="最小金额"
            :min="0"
            style="width: 130px"
          />
          <span class="mx-2">-</span>
          <el-input-number
            v-model="searchForm.maxAmount"
            placeholder="最大金额"
            :min="0"
            style="width: 130px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search">搜索</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
          <el-button type="success" :icon="Download" @click="exportData">导出</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据表格 -->
    <el-card class="table-card">
      <el-table :data="donations" style="width: 100%" border stripe>
        <el-table-column
          v-for="col in columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :formatter="col.formatter"
        >
          <template #default="scope" v-if="col.prop === 'status'">
            <el-tag
              :type="scope.row.status === 'success' ? 'success' : 'info'"
            >
              {{ scope.row.status === 'success' ? '成功' : '处理中' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="50"
          :page-size="10"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.donation-list {
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

  .statistics {
    margin-bottom: 20px;

    .el-card {
      .stat-header {
        font-size: 14px;
        color: #909399;
      }

      .stat-content {
        text-align: center;
        padding: 10px 0;

        .amount {
          font-size: 24px;
          font-weight: bold;
          color: #409EFF;
        }
      }
    }
  }

  .search-card {
    margin-bottom: 20px;
    
    .el-form {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .mx-2 {
      margin: 0 8px;
    }
  }

  .table-card {
    .pagination {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>