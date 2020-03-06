<template>
  <el-row :gutter="40" class="panel-group">
    <el-col v-for="(eachCategory, index) in allCategories" :key="index" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="list" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <a>{{ eachCategory.name }}</a>
            <i class="el-icon-edit" @click="editExistCategory(eachCategory)"></i>
          </div>
          <span style="font-size: 14px;color: #666;">{{ eachCategory.system.name }}</span>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <!--编辑新体系的表单-->
        <el-form ref="newCategoryForm" :model="newCategoryForm" :rules="newCategoryFormRules" label-position="right" label-width="65px" class="new-category-form">
          <el-form-item label="体系名" style="margin-bottom: 10px">
            <el-input v-model="newCategoryForm.name">
              <el-select slot="append" v-model="newCategoryForm.id" placeholder="课程体系" value="" style="width: 120px">
                <el-option
                  v-for="sys in courseSystem"
                  :key="sys.id"
                  :label="sys.name"
                  :value="sys.id"
                />
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 50%;" @click="addNewCategory()">创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-dialog
      title="更改信息"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="类别名">
          <el-input v-model="formInline.name" placeholder="体系名" />
        </el-form-item>
        <el-form-item label="所属体系">
          <el-select v-model="formInline.systemId" placeholder="体系名" value="">
            <el-option
              v-for="sys in courseSystem"
              :key="sys.id"
              :label="sys.name"
              :value="sys.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDialog">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { getType, getSystemInfo, addType, updateType } from '../../../api/course'

export default {
  name: 'CategoryPanelGroup',
  data() {
    return {
      allCategories: [],
      showNewCategoryForm: false,
      newCategoryForm: {
        name: null,
        id: null
      },
      courseSystem: [],
      newCategoryFormRules: {
        name: [
          { required: true, message: '请输入课程体系名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请选择课程体系', trigger: 'change' }
        ]
      },
      categoryEditing: {},
      indexEditing: -1,
      dialogVisible: false,
      permission: false,
      formInline: {
        name: '',
        systemId: '',
        typeId: ''
      }
    }
  },
  mounted() {
    this.fetchAllCategories()
    getSystemInfo().then(res => {
      this.courseSystem = res
    })
  },
  methods: {
    addNewCategory() {
      this.$refs.newCategoryForm.validate((valid) => {
        if (valid) {
          addType(this.newCategoryForm).then(res => {
            this.$message.success(res.msg)
            this.$refs.newCategoryForm.resetFields()
            this.fetchAllCategories()
          })
        } else {
          this.$message.error('输入有误')
        }
      })
    },
    editExistCategory(category) {
      this.formInline.systemId = category.systemId
      this.formInline.typeId = category.id
      this.formInline.name = category.name
      this.dialogVisible = true
    },
    fetchAllCategories() {
      getType().then((response) => {
        this.allCategories = response.types
      })
    },
    submitDialog() {
      updateType(this.formInline).then(res => {
        this.$message.success(res.msg)
        this.fetchAllCategories()
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .new-category-form {
    padding:10px
  }
  .filter-container {
    padding-bottom: 10px;

    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }
  .panel-group {
    margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
  &:hover {
  .card-panel-icon-wrapper {
    color: #fff;
  }
  .icon-people {
    background: #40c9c6;
  }
  .icon-message {
    background: #36a3f7;
  }
  .icon-money {
    background: #f4516c;
  }
  .icon-shopping {
    background: #34bfa3
  }
  }
  .icon-people {
    color: #40c9c6;
  }
  .icon-message {
    color: #36a3f7;
  }
  .icon-money {
    color: #f4516c;
  }
  .icon-shopping {
    color: #34bfa3
  }
  .card-panel-icon-wrapper {
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }
  .card-panel-icon {
    float: left;
    font-size: 48px;
  }
  .card-panel-description {
    float: right;
    font-weight: bold;
    margin: 26px 26px 26px 0;

    .card-panel-text {
    line-height: 18px;
    text-align: right;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
  }
  .card-panel-num {
    font-size: 20px;
  }
  }
  }
  }
</style>
