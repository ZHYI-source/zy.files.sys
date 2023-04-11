<template>
  <div class="about">
    <h1>WEB Sockt.io</h1>
    <div class="main">
      <el-row>
        <el-col :span="16">
          <el-input id='input' v-model="input"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="sendMsg">Send</el-button>
        </el-col>
      </el-row>
      <div id="content"></div>
    </div>
  </div>
</template>
<script>
  const ENTER = 0
  const LEAVE = 1
  export default {
    data() {
      return {
        input: '',
        content: '',
        message: ''
      }
    },
    sockets: {
      connect() {
        this.$message({
          message: '连接成功！！！',
          type: 'success'
        })
      },
      disconnect() {
        this.$message({
          message: '连接断开！！！',
          type: 'error'
        })
      },
      broadcast_msg(data) {
        console.log('接收到服务器数据，',data)
        var content = document.querySelector('#content')
        var div = document.createElement('div')
        div.innerText = `${data.msg} ---${data.time}`
        if (data.type === ENTER) {
          div.style.color = 'green'
        } else if (data.type === LEAVE) {
          div.style.color = 'red'
        } else {
          div.style.color = 'blue'
        }
        content.appendChild(div)
      }
    },
    methods: {
      sendMsg() {
        this.$socket.emit('send_msg', this.input)
      }
    },
   mounted() {
     this.$socket.open()
   },
    destroyed() {
      console.log('destroyed，')
    },
    beforeDestroy() {
      this.$socket.close()
    },
    created() {
      //连接
      this.$socket.open()
      // 查看socket是否连接成功
      // this.$socket.connected()
    }
  }
</script>
<style lang="scss" scoped>
  .about {
    padding: 20px;
    .main {
      width: 500px;
    }
    #input {
      width: 10px;
    }
    #content {
      margin-top: 15px;
      text-align: left;
    }
  }
</style>
