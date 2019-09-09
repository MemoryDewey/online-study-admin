<template>
  <div id="banner">
    <div class="preview">
      <h3>Banner 预览</h3>
      <el-carousel height="270px">
        <el-carousel-item v-for="item in 4" :key="item" style="background-color: #20a0ff">
          <div class="image" @mouseover="deleteBtnShow=true" @mouseleave="deleteBtnShow=false">
            <el-button v-if="deleteBtnShow" style="margin-top: 150px;">删除</el-button>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="set">
      <h3>Banner 操作</h3>
      <el-button type="primary" class="upload-btn" @click="bannerDialogVisible = true">上传 Banner<i
        class="el-icon-upload el-icon--right"></i></el-button>
      <el-dialog title="增加Banner" :visible.async="bannerDialogVisible" width="450px"
                 @close="bannerDialogVisible = false">
        <el-form label-position="top">
          <el-form-item label="图片(建议选取16:9的图片)">
            <el-upload class="avatar-uploader" action=""
              :auto-upload="false" :show-file-list="false" :on-success="handleAvatarSuccess"
              :on-change="fileChange">
              <img v-if="bannerUrl" :src="bannerUrl" class="banner-upload-img" alt="">
              <i v-else class="el-icon-plus banner-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="颜色填充">
            <el-color-picker value="#409EFF" @change="colorChange"></el-color-picker>
          </el-form-item>
          <el-form-item label="链接地址">
            <el-input placeholder="选填，例：(站内地址)/course/list，(站外地址)http://xx.com"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        deleteBtnShow: false,
        bannerDialogVisible: false,
        bannerUrl: ''
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.bannerUrl = URL.createObjectURL(file.raw);
      },
      fileChange(file) {
        const isJPG = file.raw.type === 'image/jpeg';
        const isPNG = file.raw.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) this.$message.error('上传头像图片只能是 JPG 与 PNG 格式!');
        else if (!isLt2M) this.$message.error('上传头像图片大小不能超过 2MB!');
        else this.bannerUrl = URL.createObjectURL(file.raw);
        return isJPG && isLt2M;
      },
      colorChange(color){
        console.log(color);
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
        border-left: 1px solid #000;
        border-right: 1px solid #000;
        text-align: center;
      }
    }

    .set {
      .upload-btn {
        margin-bottom: 20px;
        margin-left: 20px;
      }

      .el-dialog {
        .el-dialog__header{
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
