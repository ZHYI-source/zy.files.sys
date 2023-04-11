<template>
    <span class="mg-icon fa fa-fw" :class="name" @click="(e)=>{this.$emit('click',e)}"></span>
</template>

<!--https://fontawesome.com/search-->
<script>
    export default {
        name: "MgIcon",
        props:{
          //icon 名称 fa-fw:自适应宽度 fa-spin :是否开启动画
          name:{
            type:String,
            default() {
              return "fa-cog";
            }
          },
        }

    }
</script>

<style lang="scss" scoped>

</style>
