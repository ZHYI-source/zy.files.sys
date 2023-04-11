import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '文件管理'}
  },
  {
    path: '/about',
    name: 'About',
    meta: { title: 'About'},
    component: () => import( '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let title = "MG‘Files"
  if (to.meta.params) {
    title = `${title}-${to.meta.title}:${to.params[to.meta.params] || ''}`
  } else {
    title = `${title}-${to.meta.title} `
  }
  document.title = title
  if (to.path !== from.path) {
    store.dispatch('setLoading', true);
  }
  next();
})
router.afterEach((to, from) => {
  // 最多延迟 关闭 loading
  setTimeout(() => {
    // window.scroll(0,0)
    store.dispatch('setLoading', false);
  }, 500)
})
export default router


