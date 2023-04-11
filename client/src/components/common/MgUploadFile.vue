<template>
  <section>
    <el-upload
      class="upload-demo"
      drag
      :action="action"
      :show-file-list="false"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :headers=headers
      v-loading="loading"
      multiple
      :on-exceed="handleExceed"
      :file-list="fileList">
      <!--      <i class="el-icon-upload"></i>-->
      <img class="upload-logo" src="../../assets/logo.png"/>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">✈ 各类文件均可上传,支持多图上传</div>
    </el-upload>
    <!--    <el-image-->
    <!--      v-if="tempImg"-->
    <!--      style="width: 100px; height: 100px;border-radius: 5px"-->
    <!--      :src="tempImg"-->
    <!--      :preview-src-list="[tempImg]"-->
    <!--      fit="fit"></el-image>-->
  </section>
</template>

<script>

export default {
  name: "mk-upload-file",
  components: {},
  props: {
    img: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      action: `/mg/api/v1/files/create`,
      headers: {
        authorization: ''
      },
      loading: false,
      tempImg: '',
      fileList: []
    };
  },
  watch: {
    'img': {
      immediate: true,
      handler: function (val) {
        // //回填
        this.tempImg = val
      }
    },
  },
  model: {
    prop: 'img',
    event: 'getImg'
  },
  mounted() {
    // this.headers.authorization = util.cookies.get('token',)
  },
  methods: {
    beforeUpload(file) {
      this.loading = true
      // const isLt2M = file.size / 1024 / 1024 < 20;
      // if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/webp' || file.type === 'image/jpeg')) {
      //   this.$message.error('请上传格式为image/png, image/gif, image/jpg, image/jpeg,image/webp的图片');
      //   return false
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 20MB!');
      // }
      // return isLt2M;
    },
    handleSuccess(res, file) {
      this.loading = false
      // this.tempImg = res.data.url
      this.$emit('handleSuccess', true)
      // this.$toast.success(res.meta.msg)

      this.$notify({
        title: res.data.errFiles.length ? '失败' : '成功',
        message: res.meta.msg,
        type: res.data.errFiles.length ? 'error' : 'success'
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
}
</script>

<style lang="scss" scoped>

.upload-logo {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 15px;
}
</style>
