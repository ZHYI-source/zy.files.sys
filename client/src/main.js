import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';
// import VueSocketIO from 'vue-socket.io';
// import SocketIO from 'socket.io-client'

Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('ws://localhost:3002')
// }))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
