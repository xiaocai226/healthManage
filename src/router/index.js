import Vue from 'vue'
import Router from 'vue-router'// 导入路由
import Layout from '@/layout/Layout';
import layoutmitate from '@/layout/layoutmitate';


// 使用路由插件
Vue.use(Router)

// 法2 实例化路由 导出路由
export default new Router({
  // 定义路由
  routes:[//一个个对象

    // {//例子！！！
      // path:'',//路径(/login)或第一层路径(view下面的第一个文件夹/test)
      // name:'',//命名
      // component:Index,//写上面import的名字
      // redirect:"",//重定向
      // component:() => import(""),//路径(相当于上面import，然后再component)
      // children:[//子路由
      //   {
      //     path:'',//嵌套中的path不加/,不能加
      //     component:() => import("")
      //   }
      // ]
    // },

    {//登录页
      path: '/login',
      name: 'login',
      component: () => import("@/views/login"),
    },

    {// 进入后的主页面
      path:'/',
      redirect:'/home'//重定向
    },
    {//首页
      path:'/home',//路径
      name:'home',//命名
      component:Layout,//组件(布局组件)
      children:[//子组件
        {//同理也是一个个对象
          path: "/",
          component: () => import("@/views/home")
        }
      ]
    },
    {//饮食健康
      path:'/dietManage',
      name:'dietManage',
      component:Layout,
      children:[
        {//食物管理
          path: "food",
          component: () => import("@/views/dietManage/food")
        },
        // {//食物分类
        //   path: "foodType",
        //   component: () => import("@/views/dietManage/foodType")
        // },
        // {//食物分类
        //   path: "foodDetail",
        //   component: () => import("@/views/dietManage/foodDetail")
        // }
      ]
    },
    {//运动健康
      path:'/sportManage',
      name:'sportManage',
      component:Layout,
      children:[
        {//挑战计划
          path: "challengePlan",
          component: () => import("@/views/sportManage/challengePlan")
        },{// 详情页
          path: "challengeDetail",
          component: () => import("@/views/sportManage/challengeDetail")
        },
      ]
    },
    {//视频管理
      path:'/videoManage',
      name:'videoManage',
      component:Layout,
      children:[
        {//账号管理
          path: "video",
          component: () => import("@/views/videoManage/video")
        },
      ]
    },
    {//用户管理
      path:'/userManage',
      name:'userManage',
      component:Layout,
      children:[
        {//账号管理
          path: "user",
          component: () => import("@/views/userManage/user")
        },
      ]
    },
    {// 图形相关
      path:'/photoManage',
      name:'photoManage',
      component:layoutmitate,
      children:[
        {// 轮播图
          path: "castChart",
          component: () => import("@/views/photoManage/castChart")
        },
        {// 轮播图
          path: "elementChart",
          component: () => import("@/views/photoManage/elementChart")
        },
      ]
    }
  ]
})

// 法1
// 定义routes
// const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // }
// ]

// 实例化路由
// const router = new Router({
//   mode: 'history',//url没有#号
//   base: process.env.BASE_URL,//自动获取根目录路径
//   routes
// })

// 导出路由
// export default router
