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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.applyID }}
        </template>
      </el-table-column>
      <el-table-column label="项目名" width="120">
        <template slot-scope="scope">
          {{ scope.row.projectName }}
        </template>
      </el-table-column>
      <el-table-column label="项目介绍">
        <template slot-scope="scope">
          {{ scope.row.projectIntro }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="申请时间" width="200">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createdAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目费用" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.projectFee }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="项目状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.applyStatue | statusFilter">{{ scope.row.applyStatue | statusFilterText }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.applyStatue === 'WAITING'"
            size="mini"
            @click="handleClick('access',scope.row.applyID)"
          >同意
          </el-button>
          <el-button
            v-if="scope.row.applyStatue === 'WAITING'"
            size="mini"
            type="danger"
            @click="handleClick('reject',scope.row.applyID)"
          >拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getProjectApply } from '@/api/table'
import { accessApply, rejectApply } from '@/api/project'
import { parseTime } from '@/utils'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        ACCEPTED: 'success',
        PENDING: 'info',
        REJECTED: 'danger',
        WAITING: 'gray',
        CANCEL: 'warning'
      }
      return statusMap[status]
    },
    statusFilterText(status) {
      const statusMap = {
        ACCEPTED: '审核通过',
        PENDING: '待支付',
        REJECTED: '审核否决',
        WAITING: '待审核',
        CANCEL: '已取消'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      parseTime
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getProjectApply().then(response => {
        this.list = response.sqlres
        this.listLoading = false
      })
    },
    handleClick(option, applyID) {
      option === 'access' ? accessApply({ applyID }).then(response => {
        response.code === 1000 ? this.$message({ message: '成功', type: 'success' }) : this.$message({
          message: response.msg,
          type: 'danger'
        })
      }) : rejectApply({ applyID }).then(response => {
        response.code === 1000 ? this.$message({ message: '成功', type: 'success' }) : this.$message({
          message: response.msg,
          type: 'danger'
        })
      })
      this.fetchData()
    }
  }
}
</script>
