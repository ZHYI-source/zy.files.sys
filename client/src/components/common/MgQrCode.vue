<template>
  <div class="qrcode" ref="qrCodeUrl"></div>
</template>

<script>
import QRCode from 'qrcodejs2';
export default {
  name: "MgQrCode",
  props:{
    value:{
      type:String,
      default:'123'
    }
  },
  methods: {
    creatQrCode() {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.value, // 需要转换为二维码的内容
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
  },
  mounted() {
    this.creatQrCode();
  },
}
</script>

<style lang="scss">
.qrcode {
  margin: auto;
  display: inline-block;
}
</style>
