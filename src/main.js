// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Apps from './App';
import index from './index.vue';
import router from './router';
import axios from "axios";
import {
  Pagination,
  Table,
  TableColumn,
  Row,
  Col,
  Container,
  Button,
  Tooltip,
  Header,
  Aside,
  Main
} from 'element-ui'; //按需引入
import Vuex from 'vuex';
import store from './vuex/store';
import echarts from 'echarts';
// import 'lib-flexible'

Vue.prototype.$echarts = echarts;
Vue.use(Vuex);
Vue.prototype.$ELEMENT = {size: 'small'};
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);
Vue.use(Container);
Vue.use(Button);
Vue.use(Tooltip);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);


Vue.prototype.$axios = axios;
Vue.config.productionTip = false


/* eslint-disable no-new */
var v = new Vue({
  el: '#app',
  router,
  store,
  components: {index},
  template: '<index/>',
  created: function () {

  }
})


