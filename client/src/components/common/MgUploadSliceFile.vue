<template>
  <section>
    <el-upload
      class="upload-demo"
      drag
      :action="action"
      :show-file-list="false"
      :http-request="upload"
      :data="uploadData"
      :headers=headers
      v-loading="loading"
      multiple
      :on-exceed="handleExceed">
      <img class="upload-logo" src="../../assets/logo.png"/>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">✈ 各类文件均可上传,支持多图上传,大文件切片上传</div>
    </el-upload>
    <el-row style="margin-top: 50px">
      <el-col :span="6">
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="value"
        ></el-progress>
      </el-col>
    </el-row>
  </section>
</template>

<script>

import {dirFilesSliceMerge} from "../../api/article";

export default {
  name: "mk-upload-slice-file",
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
      action: `/mg/api/v1/files/createSlice`,
      headers: {
        authorization: ''
      },
      value: 0,
      loading: false,
      tempImg: '',
      fileList: [],
      uploadData: {
        //这里面放额外携带的参数
      },
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
    //文件切片 以1M为一片
    slice(file, piece = 1024 * 1024) {
      let totalSize = file.size; // 文件总大小
      let start = 0; // 每次上传的开始字节
      let end = start + piece; // 每次上传的结尾字节
      let chunks = []
      while (start < totalSize) {
        // 根据长度截取每次需要上传的数据
        // File对象继承自Blob对象，因此包含slice方法
        let blob = file.slice(start, end);
        chunks.push(blob)

        start = end;
        end = start + piece;
      }
      return chunks
    },

    //自定义上传文件
    // 分片上传的自定义请求，以下请求会覆盖element的默认上传行为
    upload(option) {
      if (typeof XMLHttpRequest === "undefined") {
        return;
      }
      const fileReader = new FileReader(); // 文件读取类
      const action = option.action; // 文件上传上传路径
      const chunkSize = 1024 * 1024 * 1; // 单个分片大小，这里测试用1m
      const optionFile = option.file; // 需要分片的文件
      let fileChunkedList = []; // 文件分片完成之后的数组
      const percentage = []; // 文件上传进度的数组，单项就是一个分片的进度
      let that=this
      // 文件开始分片，push到fileChunkedList数组中
      for (let i = 0; i < optionFile.size; i = i + chunkSize) {
        const tmp = optionFile.slice(
          i,
          Math.min(i + chunkSize, optionFile.size)
        );
        if (i === 0) {
          fileReader.readAsArrayBuffer(tmp);
        }
        fileChunkedList.push(tmp);
      }
      console.log(fileChunkedList)

      // 在文件读取完毕之后，开始计算文件
      fileReader.onload = async (e) => {
        // 将fileChunkedList转成FormData对象，并加入上传时需要的数据
        fileChunkedList = fileChunkedList.map((item, index) => {
          const formData = new FormData();
          if (option.data) {
            Object.keys(option.data).forEach((key) => {
              formData.append(key, option.data[key]);
            });
            // 看后端需要哪些，就传哪些，也可以自己追加额外参数
            formData.append(option.filename, item, option.file.name); // 文件
            formData.append("chunkNumber", index + 1); // 当前文件数
            formData.append("filename", option.file.name); // 文件名
            formData.append("totalChunks", fileChunkedList.length); // 总块数
          }
          return {formData: formData, index: index};
        });

        // 创建队列上传任务，limit是上传并发数
        function sendRequest(chunks, limit = 2) {
          return new Promise((resolve, reject) => {
            const len = chunks.length;
            let counter = 0;
            let isStop = false;
            const start = async () => {
              if (isStop) {
                return;
              }
              const item = chunks.shift();
              if (item) {
                const xhr = new XMLHttpRequest();
                const index = item.index;
                // 分片上传失败回调
                xhr.onerror = function error(e) {
                  isStop = true;
                  reject(e);
                };
                // 分片上传成功回调
                xhr.onload = function onload() {
                  if (xhr.status !== 200) {
                    isStop = true;
                    reject(getError(action, option, xhr));
                  }
                  if (counter === len - 1) {
                    // 最后一个上传完成
                    resolve({optionFile:optionFile,counter});
                  } else {
                    counter++;
                    start();
                  }
                };
                // 分片上传中回调
                if (xhr.upload) {
                  xhr.upload.onprogress = (e) => {
                    percentage[index] = e.loaded;
                    updataPercentage(e);
                  };
                }
                xhr.open("post", action, true);
                if (option.withCredentials && "withCredentials" in xhr) {
                  xhr.withCredentials = true;
                }
                const headers = option.headers || {};
                for (const item in headers) {
                  if (headers.hasOwnProperty(item) && headers[item] !== null) {
                    xhr.setRequestHeader(item, headers[item]);
                  }
                }
                // 文件开始上传
                xhr.send(item.formData);
              }
            };
            while (limit > 0) {
              setTimeout(() => {
                start();
              }, Math.random() * 1000);
              limit -= 1;
            }
          });
        }

        // 更新上传进度条百分比的方法
        const updataPercentage = (e) => {
          let loaded = 0; // 当前已经上传文件的总大小
          percentage.forEach((item) => {
            loaded += item;
          });
          e.percent = (loaded / optionFile.size) * 100;
          if (
            this.value > parseFloat(Number(e.percent).toFixed(0)) ||
            this.value === parseFloat(Number(e.percent).toFixed(0))
          )
            return;
          this.value = parseFloat(Number(e.percent).toFixed(0));
          console.log(this.value);
        };
        try {
          // 调用上传队列方法 等待所有文件上传完成
          sendRequest(fileChunkedList, 1).then(data=>{
            console.log(data)
            dirFilesSliceMerge(data)
            that.$emit('handleSuccess', true)
          })
          // 可以在这通知服务端合并


        } catch (error) {
          option.onError(error);
        }
      }
    },

    beforeUpload(file) {
      this.loading = true
      let content = this.slice(file)
      console.log('文件切片', content)
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
