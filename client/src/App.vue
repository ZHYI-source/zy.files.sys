<template>
  <div id="app">
    <Loading/>
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
    <div class="main-body">
      <router-view/>
    </div>
    <MgFooter/>
  </div>
</template>

<style lang="scss">
.main-body {
  //height: calc(100vh - 200px);
}
#app {

}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import Loading from "./components/loading";
import MgFooter from "./components/layout/MgFooter";
export default {
  components: {MgFooter, Loading}
}
</script>
