<template>
  <div class="home">
    <el-row>
      <div class="up-box">
        <MkUploadFile @handleSuccess="goPage(1)"/>
      </div>
    </el-row>
    <el-divider></el-divider>
    <section class="tb-pan">

      <el-row style="padding-bottom: 15px">
        <el-form :model="query" ref="ruleForm" label-width="10px" class="demo-ruleForm">
          <el-row style="display: flex">
            <el-form-item prop="name">
              <el-input v-model="query.params.name" placeholder="请输入文件名称搜索" @clear="goPage(1)"
                        @keyup.native.enter="goPage(1)" clearable size="mini" style="width: 225px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" @click="goPage(1)">查询</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
      <el-table
        :key="updataKey"
        :height="tableHeight"
        :data="tableData"
        v-loading="loading"
        stripe
        style="width: 100%">

        <el-table-column
          type="index"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="content"
          align="center"
          label="备注">
          <template slot-scope="scope">
            <div style="display: flex">
              <el-input
                size="mini"
                style="width: calc(100% - 40px)"
                placeholder="请输入备注"
                v-model="scope.row.content"
                clearable>
              </el-input>
              <el-button size="mini" style="width: 40px" type="text" @click="goUpdate(scope.row)">编辑</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="文件名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="size"
          align="center"
          label="文件大小"
        >
        </el-table-column>
        <el-table-column
          prop="mimetype"
          align="center"
          label="文件类型"
        >
        </el-table-column>
        <el-table-column
          prop="createdAt"
          align="center"
          label="上传时间">
        </el-table-column>

        <el-table-column
          prop="updatedAt"
          align="center"
          label="分享码">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="goViewCode(scope.row)">查看分享码</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          align="center"
          label="预览地址">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="goCOPY(scope.row)">COPY</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          width="260"
          align="left"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" v-if="scope.row.mimetype !=='image/svg+xml'"
                       @click="goView(scope.row)">预览
            </el-button>
            <el-button type="success" size="mini" @click="downloadFile(scope.row.name)">下载</el-button>
            <el-button type="danger" size="mini" @click="goDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pag"
        @size-change="changePageSize"
        @current-change="goPage"
        :current-page.sync="query.offset"
        :page-size="query.limit"
        layout="total, prev, pager, next"
        :total="temp.dataSize">
      </el-pagination>
    </section>

    <el-dialog width="320px" title="文件下载地址分享码" :visible.sync="dialogTableVisible"
               @close="()=>{this.dialogTableVisible=false}">
      <div style="display: flex;justify-content: center">
        <MgQrCode :value="codeUrl"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {getCaptcha, getLogin} from "@/api/user";
import {dirArticleList, dirFilesDelete, dirFilesFindOne, dirFilesList, dirFilesUpdate} from "../api/article";
import MkUploadFile from "../components/common/MgUploadFile";
import dayjs from 'dayjs'
import MgQrCode from "@/components/common/MgQrCode";

export default {
  name: 'Home',
  components: {MgQrCode, MkUploadFile, HelloWorld},
  data() {
    return {
      tableData: [],
      loading: false,
      dialogTableVisible: false,
      codeUrl: '',
      //查询条件
      query: {
        params: {},
        limit: 15,//每页显示条数
        offset: 1,//页码
        sort: {
          prop: 'createdAt',
          order: 'desc',
        }
      },
      //临时变量
      temp: {
        //数据总调数
        dataSize: 0,
      },
      updataKey: 0,
      heightL: 580,
      tableHeight: 580,
    }
  },
  watch: {
    'heightL'(val) {
      this.updataKey += 1
      this.tableHeight = val
    },
  },
  created() {
    this.getDataList()
  },
  mounted() {
    this.getWinHeight()
  },
  methods: {
    //获取窗口高度
    getWinHeight() {
      let that = this
      this.heightL = window.innerHeight - 430
      window.addEventListener('resize', () => {
        that.updataKey += 1
        that.heightL = window.innerHeight - 430
      })
    },
    goUpdate(data) {
      let that = this
      this.$prompt('请输入口令', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: that.verKL,
        inputErrorMessage: '口令不正确'
      }).then(({value}) => {
        dirFilesUpdate(data).then(res => {
          that.$message({
            type: 'success',
            message: '编辑成功!'
          });
          that.getDataList()
        })
      }).catch(() => {

      });


    },
    goPage(pageNum) {
      this.query.offset = pageNum
      this.getDataList()
    },
    //改变每页数据量
    changePageSize(size) {
      this.query.limit = size;
      this.query.offset = 1;
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      dirFilesList(this.query).then(res => {
        let datas = res.data || []
        for (const data of datas) {
          data.createdAt = dayjs(data.createdAt).format('YYYY-MM-DD HH:mm:ss')
        }
        this.tableData = datas
        this.temp.dataSize = res.count;
        this.loading = false;
      }).catch((err) => {
        this.$message.error('数据加载失败')
        this.loading = false;
      })
    },
    //下载文件
    downloadFile(id) {
      dirFilesFindOne(id).then(res => {
        var blob = new Blob([res]);
        // 创建一个URL对象
        var url = window.URL.createObjectURL(blob);
        // 创建一个a标签
        var a = document.createElement("a");
        a.href = url;
        a.download = id;// 这里指定下载文件的文件名
        a.click();
        // 释放之前创建的URL对象
        window.URL.revokeObjectURL(url);
      }).catch(err => {
        console.log(err)
      })
    },
    copyToClipboard(textToCopy) {
      // navigator clipboard 需要https等安全上下文
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard 向剪贴板写文本
        return navigator.clipboard.writeText(textToCopy);
      } else {
        // 创建text area
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // 使text area不在viewport，同时设置不可见
        textArea.style.position = "absolute";
        textArea.style.opacity = 0;
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
          // 执行复制命令并移除文本框
          document.execCommand('copy') ? res() : rej();
          textArea.remove();
        });
      }
    },
    goCOPY: async function (val) {
      try {
        await this.copyToClipboard(val.mimetype === 'image/svg+xml' ? val.downUrl : val.preUrl)
        this.$message({
          type: 'success',
          message: '地址复制成功!'
        });
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    },

    goViewCode(data) {
      this.codeUrl = data.downUrl
      this.dialogTableVisible = true
    },
    goView(data) {
      window.open(data.preUrl, '_blank')
    },
    verKL(val) {
      return val === 'zhouyi'
    },
    goDelete(data) {
      let that = this
      this.$prompt('请输入口令', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: that.verKL,
        inputErrorMessage: '口令不正确'
      }).then(({value}) => {
        dirFilesDelete({id: data.id, name: data.name}).then(res => {
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
          that.getDataList()
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {

      });


    },
  }
}
</script>
<style lang="scss" scoped>
.home {
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);

  .tb-pan {
    background-color: #fff;
  }
}

.up-box {
  display: flex;
  justify-content: center;
  padding: 15px 0;
}

.pag {
  display: flex;
  justify-content: right;
  padding: 8px 15px;
}
</style>
