index.vue<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="订单ID" prop="id"></el-table-column>
      <el-table-column label="用户ID" prop="userID"></el-table-column>
      <el-table-column label="数量" prop="amount"></el-table-column>
      <el-table-column label="交易时间" align="center" prop="createdAt"></el-table-column>
      <el-table-column label="支付宝账号">
        <template slot-scope="scope">
          {{ scope.row.aliPayInfo.account }}
        </template>
      </el-table-column>
      <el-table-column label="支付宝绑定姓名">
        <template slot-scope="scope">
          {{ scope.row.aliPayInfo.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="accept(scope.row.id)"
          >同意申请
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="reject(scope.row.id)"
          >拒绝申请
          </el-button>
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
import { getCashIn, OpCashIn } from '@/api/cash'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      pageNum: 1
    }
  },
  created() {
    this.fetchData(1)
  },
  methods: {
    fetchData(val) {
      this.listLoading = true
      getCashIn({ page: val }).then(response => {
        this.list = response.cashes
        this.pageNum = response.pageSum
        this.listLoading = false
      })
    },
    accept(id) {
      this.$msgbox('确定同意该充值申请？', '同意充值申请', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async() => {
        const data = { id, status: 'Accept' }
        const res = await OpCashIn(data)
        if (res) {
          this.$message.success(res.msg)
          this.fetchData(1)
        }
      })
    },
    reject(id) {
      this.$prompt('请输入拒绝该充值申请的理由？', '拒绝充值申请', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async({ value }) => {
        const data = { id, status: 'Reject', details: `充值 - 已处理 - ${value}` }
        const res = await OpCashIn(data)
        if (res) {
          this.$message.success(res.msg)
          this.fetchData(1)
        }
      })
    }
  }
}
</script>
