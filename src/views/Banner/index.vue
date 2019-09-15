<template>
  <div id="banner">
    <div class="preview">
      <h3>Banner 预览</h3>
      <el-carousel height="270px">
        <el-carousel-item v-for="banner in banners" :key="banner.id" :style="{'background-color': banner.fillColor}">
          <div class="image" @mouseover="deleteBtnShow=true" @mouseleave="deleteBtnShow=false">
            <img :src="banner.image" alt>
            <el-button v-show="deleteBtnShow" @click="deleteBanner(banner.id)">删除</el-button>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="set">
      <h3>Banner 操作</h3>
      <el-button type="primary" class="upload-btn" @click="bannerDialogVisible = true">上传 Banner
        <i class="el-icon-upload el-icon--right"></i></el-button>
      <el-dialog
        title="增加Banner"
        :visible.sync="bannerDialogVisible"
        width="450px"
        @close="bannerDialogVisible = false"
      >
        <el-form label-position="top">
          <el-form-item label="图片(建议选取16:9的图片)">
            <el-upload
              ref="upload"
              class="avatar-uploader"
              name="banner"
              action="http://127.0.0.1:3000/api/admin/user/banner/add"
              :auto-upload="false"
              :show-file-list="false"
              :headers="headers"
              :on-success="handleSuccess"
              :data="bannerForm"
              :multiple="false"
              :on-change="fileChange"
              :before-upload="beforeUpload"
            >
              <img v-if="bannerUrl" :src="bannerUrl" class="banner-upload-img" alt="">
              <i v-else class="el-icon-plus banner-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="颜色填充">
            <el-color-picker v-model="bannerForm.fillColor"></el-color-picker>
          </el-form-item>
          <el-form-item label="链接地址">
            <el-input v-model="bannerForm.url" placeholder="选填，例：(站内地址)/course/list，(站外地址)http://xx.com"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="uploadBanner">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getBanner, deleteBanner } from '@/api/banner'
import { getToken } from '@/utils/auth'

export default {
  name: 'Index',
  data() {
    return {
      deleteBtnShow: false,
      bannerDialogVisible: false,
      bannerUrl: '',
      banners: [],
      bannerForm: {
        fillColor: '#409EFF',
        url: ''
      },
      headers: { 'Authorization': getToken() }
    }
  },
  created() {
    this.getBanner()
  },
  methods: {
    async handleSuccess(res) {
      if (res.status === 1) {
        this.bannerDialogVisible = false
        this.$message.success(res.msg)
        await this.getBanner()
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt4M = file.size / 1024 / 1024 < 4
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      } else if (!isLt4M) {
        this.$message.error('上传头像图片大小不能超过 4MB!')
      }
      return (isJPG || isPNG) && isLt4M
    },
    fileChange(file) {
      if (this.beforeUpload(file.raw)) this.bannerUrl = URL.createObjectURL(file.raw)
    },
    uploadBanner() {
      this.$refs.upload.submit()
    },
    async getBanner() {
      const res = await getBanner()
      this.banners = res.banners
    },
    async deleteBanner(id) {
      const res = await deleteBanner({ id })
      if (res) {
        this.$message.success(res.msg)
        await this.getBanner()
      }
    }
  }
}
</script>
<style lang="scss">
  #banner {
    background: #f0f2f5;

    h3 {
      margin: 0;
      padding: 20px
    }

    .preview {
      .image {
        width: 480px;
        height: 270px;
        margin: 0 auto;
        text-align: center;
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }

        button {
          position: absolute;
          top: 115px;
          left: 205px;
        }
      }
    }

    .set {
      .upload-btn {
        margin-bottom: 20px;
        margin-left: 20px;
      }

      .el-dialog {
        .el-dialog__header {
          text-align: center;
        }

        .el-upload {
          border: 1px solid #d9d9d9;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .el-upload:hover {
          border-color: #409EFF;
        }

        .banner-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 320px;
          height: 180px;
          line-height: 180px;
          text-align: center;
        }

        .banner-upload-img {
          width: 320px;
          height: 180px;
          display: block;
        }
      }
    }
  }
</style>
