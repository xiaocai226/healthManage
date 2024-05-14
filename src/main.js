// 入口文件 导入文件
import Vue from 'vue';
import App from './App.vue';
import router from './router';//导入配置好的路由
import store from './store';
//引入ele组件库
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 引入公共echarts 绑定到原型链上
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

// 下面这一行表示阻止显示生产模式的消息 如果没有这行代码，或者设置为true，控制台就会多出这么一段代码。
// You are running Vue in development mode.
// Make sure to turn on production mode when deploying for production.
Vue.config.productionTip = false;

//路由守卫
// router.beforeEach((to, from, next) => {
//   if(to.path === '/login') return next();
  // console.log(store.state,'----')
  // if (store.state.token) {
  //   if (to.path === "/login") {
  //     next("/");
  //   } else {
  //     next();
  //   }
  // } else {
    // next("/login");
  // }
// });

// 创建vue进行挂载(App为总组件)
new Vue({
  router,//将路由配置传递给Vue
  store,
  render: h => h(App)
}).$mount('#app')
