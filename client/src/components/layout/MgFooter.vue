<template>
  <section id="mg-footer">
    <ul class="icons">
      <li title="Github">
        <MgIcon name="fa-brands fa-github" @click="handleLink('https://github.com/ZHYI-source')"/>
      </li>
      <li title="码云">
        <MgIcon name="fa-solid fa-code" @click="handleLink('https://gitee.com/Z568_568')"/>
      </li>
      <li title="个人主页">
        <MgIcon name="fa-globe" @click="handleLink('http://www.zhouyi.run/#/')"/>
      </li>
    </ul>

    <p class="copyright">{{ `MG文件管理中心 Copyright ©${new Date().getFullYear()} by` }}<a target="_blank" class="out-link"
                                                                              href="https://gitee.com/Z568_568">@芒果快熟</a>
      . All rights reserved. | <a target="_blank" class="out-link" href="https://beian.miit.gov.cn/#/Integrated/index">黔ICP备2022001745号-1</a>
    </p>
  </section>
</template>

<script>
  import MgIcon from "@/components/common/MgIcon";

  export default {
    name: "MgFooter",
    components: {MgIcon},
    methods: {
      handleLink(url) {
        window.open(url, '_blank')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #mg-footer {
    padding: 10px 0;
    //position: fixed;
    //bottom: 0;
    //left: 50%;
    //transform: translateX(-50%);
    .icons {
      color: $color-text-sub;
      text-transform: uppercase;
      font-size: 1.4em;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 1em;

      > li {
        padding-right: 0.5em;
      }

      > li:hover {
        transition: all .2s linear;
        color: $color-primary;
        cursor: pointer;
      }
    }

    .copyright {
      color: #aaaaaa;
      font-size: 0.5em;
      font-weight: 400;
      letter-spacing: 0.25em;
      line-height: 2.8em;
      text-align: center;
    }
  }
</style>
