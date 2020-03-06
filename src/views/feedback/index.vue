<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="用户ID" width="150">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <el-table-column label="反馈类型" width="200">
        <template slot-scope="scope">
          {{getType(scope.row.type)}}
        </template>
      </el-table-column>
      <el-table-column label="反馈内容">
        <template slot-scope="scope">
          {{scope.row.content}}
        </template>
      </el-table-column>
      <el-table-column label="反馈时间" width="200">
        <template slot-scope="scope">
          {{parseTime(scope.row['createdAt'])}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pageNum*10"
      style="text-align: center;margin-top: 20px"
      @current-change="fetchData"
    />
  </div>
</template>
<script>
  import { getFeedbackType, getFeedback } from '../../api/table'
  import { parseTime } from '@/utils'

  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        feedbackType: [],
        pageNum: 1,
        pageCurrent: 1,
        parseTime
      }
    },
    created() {
      this.fetchData(1)
    },
    methods: {
      fetchData(val) {
        this.listLoading = true
        getFeedback({ page: val }).then(res => {
          this.list = res['feedback']
          this.pageNum = res['pageSum']
          this.listLoading = false
        })
        getFeedbackType().then(res => {
          this.feedbackType = res.feedbackType
        })
      },
      getType(id) {
        return this.feedbackType.find((x) => {
          return x.id === id
        }).name;
      }
    }
  }
</script>
