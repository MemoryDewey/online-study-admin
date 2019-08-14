<template>
  <el-row :gutter="40" class="panel-group">
    <el-col v-for="(eachCategory, index) in allCategories" :key="index" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="table" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <a>{{ eachCategory.systemName }}</a>
            <i class="el-icon-edit" @click="editExistCategory(eachCategory)"></i>
          </div>
          <span style="font-size: 14px;color: #666;">课程数目</span><count-to :start-val="0" :end-val="eachCategory.count" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @mouseover="showNewCategoryForm=true" @mouseleave="showNewCategoryForm=false">
        <div v-if="!showNewCategoryForm" :xs="24" :sm="24" class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="plus" class-name="card-panel-icon" />
        </div>
        <div v-if="!showNewCategoryForm" class="card-panel-description">
          <div class="card-panel-text">新建课程体系</div>
        </div>
        <!--编辑新体系的表单-->
        <el-form v-if="showNewCategoryForm" ref="newCategoryForm" :model="newCategoryForm" :rules="newCategoryFormRules" label-position="right" label-width="65px" class="new-category-form">
          <el-form-item label="体系名" style="margin-bottom: 10px">
            <el-input v-model="newCategoryForm.category_name" />
          </el-form-item>
          <el-form-item>
            <el-button style="width: 50%;" @click="addNewCategory()">创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getSystem, addSystem, updateSystem } from '../../../api/course'

export default {
  name: 'CategoryPanelGroup',
  components: {
    CountTo
  },
  data() {
    return {
      allCategories: [],
      showNewCategoryForm: false,
      newCategoryForm: {
        category_name: ''
      },
      newCategoryFormRules: {
        category_name: [
          { required: true, message: '请输入课程体系名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      categoryEditing: {},
      indexEditing: -1
    }
  },
  mounted() {
    this.fetchAllCategories()
  },
  methods: {
    addNewCategory() {
      this.$refs.newCategoryForm.validate((valid) => {
        if (valid) {
          addSystem({ name: this.newCategoryForm.category_name }).then(res => {
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
      this.$prompt('请输入体系名', '更改体系名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: category.systemName
      }).then(({ value }) => {
        updateSystem({ id: category.systemID, name: value }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.fetchAllCategories()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    fetchAllCategories() {
      getSystem().then((response) => {
        this.allCategories = response.data
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
