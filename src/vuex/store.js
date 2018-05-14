/**
 * Created by Rossy1 on 2018/4/26.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    headImg: JSON.parse(sessionStorage.getItem('headImg')) || ""
  },
  mutations: {
    newImg(state, msg){
      sessionStorage.setItem('headImg', JSON.stringify(msg))
      state.headImg = msg;
    }
  }
})

export default store

