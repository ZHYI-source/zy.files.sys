import Vue from 'vue'
import Vuex from 'vuex'
// import {getTimeInterval} from '../utils/index'
// import {dirSocialsList, dirWebsiteList} from "../api/website";

Vue.use(Vuex)
// 略:后台获取系统运行时间
const runAt = '1644422400000'; //2022-02-10 00:00:00
let timer = null;
const state = {
  loading: false,
  runTimeInterval: '',
  socials: '',
  websiteInfo: ''
}
const mutations = {
  SET_LOADING: (state, v) => {
    state.loading = v;
  },
  SET_SOCIALS: (state, v) => {
    state.socials = v;
  },
//   SET_SITE_INFO: (state, v) => {
//     state.websiteInfo = v;
//   },
//   GET_RUNTIME_INTERVAL: (state) => {
//     if (!timer || !state.runTimeInterval) {
//       clearInterval(timer)
//       timer = setInterval(() => {
//         state.runTimeInterval = getTimeInterval(runAt);
//       }, 1000);
//     }
//   }
}
const actions = {
  setLoading: ({commit}, v) => {
    commit('SET_LOADING', v);
  },
  // initComputeTime: ({commit}) => {
  //   commit('GET_RUNTIME_INTERVAL');
  // },


}
const getters = {
  loading: state => state.loading,
  // runTimeInterval: state => state.runTimeInterval,
  // notice: state => state.websiteInfo ? state.websiteInfo.notice : ''
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {},
  getters
})
