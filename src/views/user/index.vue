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
      <el-table-column align="center" label="ID" width="200">
        <template slot-scope="scope">
          {{ scope.row.userID }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="200">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="200">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="权限" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.accessLevel | statusFilter">{{ scope.row.accessLevel | statusFilterText }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row['UserInformation.realName'] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          <span>{{ scope.row['UserInformation.nickName'] }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="permission" label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="openDialog(scope.row)">编辑</el-button>
          <el-button size="mini" type="success" @click="recharge(scope.row.userID)">充值</el-button>
          <el-button size="mini" type="danger" @click="changePsw(scope.row.userID)">改密
          </el-button>
          <el-button v-if="scope.row.accessLevel < 2" size="mini" type="info"
                     @click="openBanTimeDialog(scope.row.userID,scope.row.banTime)">封禁
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
    <el-dialog
      title="更改信息"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input v-model="formInline.phone" placeholder="手机号"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formInline.email" placeholder="邮箱"/>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="formInline.level" placeholder="权限" value="">
            <el-option label="学员" :value="0" :disabled="formInline.level === 0"/>
            <el-option label="教师" :value="1" :disabled="formInline.level === 1"/>
            <el-option label="教管员" :value="2" :disabled="formInline.level === 2"/>
            <el-option label="管理员" :value="3" :disabled="formInline.level === 3"/>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDialog">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="banTimeDialogVisible" width="450px" title="封禁用户" @close="banTimeDialogVisible = false">
      <el-form :inline="true">
        <el-form-item label="封禁时间">
          <el-date-picker v-model="banTime" type="date" placeholder="选择封禁日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="banTimeDialogSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import { getUserInfo } from '../../api/table'
  import { changePsw, changeInfo, changeBanTime, recharge } from '../../api/user'
  import { parseTime } from '@/utils'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: 'success',
          1: 'info',
          2: 'gray',
          3: 'warning'
        }
        return statusMap[status]
      },
      statusFilterText(status) {
        const statusMap = {
          0: '学员',
          1: '教师',
          2: '教管员',
          3: '管理员'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        listLoading: true,
        pageNum: 1,
        pageCurrent: 1,
        parseTime,
        dialogVisible: false,
        permission: false,
        formInline: {
          phone: '',
          email: '',
          level: '',
          id: ''
        },
        banTimeDialogVisible: false,
        banUserID: null,
        banTime: null
      }
    },
    created() {
      this.fetchData(1)
    },
    methods: {
      fetchData(val) {
        this.listLoading = true
        getUserInfo({ page: val }).then(response => {
          this.list = response.result
          this.pageNum = response.count % 10 === 0
            ? Math.floor(response.count / 10) : Math.floor(response.count / 10) + 1
          this.listLoading = false
          this.permission = response.permission
        })
      },
      changePsw(id) {
        this.$prompt('请输入新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\w!#$%&'*+/=?^_`{|}~,.;":]{8,16}$/,
          inputErrorMessage: '密码格式不正确'
        }).then(({ value }) => {
          changePsw({ id, password: value }).then(res => {
            this.$message({
              type: 'success',
              message: res.msg
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      recharge(id) {
        this.$prompt('请输入充值金额', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[1-9]\d*$/,
          inputErrorMessage: '金额格式不正确'
        }).then(({ value }) => {
          recharge({ id, amount: value }).then(res => {
            if (res) this.$message.success(res.msg)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      openDialog(val) {
        this.dialogVisible = true
        this.formInline = {
          phone: val.phone,
          email: val.email,
          level: val.accessLevel,
          id: val.userID
        }
      },
      submitDialog() {
        this.dialogVisible = false
        changeInfo(this.formInline).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.fetchData(1)
        })
      },
      openBanTimeDialog(userID, banTime) {
        this.banTimeDialogVisible = true
        this.banTime = banTime
        this.banUserID = userID
      },
      banTimeDialogSubmit() {
        changeBanTime({ id: this.banUserID, banTime: this.banTime }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.banTimeDialogVisible = false
          this.fetchData(1)
        })
      }
    }
  }
</script>
