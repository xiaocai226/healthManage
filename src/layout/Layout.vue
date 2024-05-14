<template>
<!-- Container布局容器 用组件的形式来写 高度为视口高度 -->
  <el-container style="height: 100vh">
    <!-- 头部 -->
    <el-header style='padding:0px;'>
      <OpHeader />
    </el-header>
    <el-container>
      <!-- 将搜索框隐藏 -->
      <div id="switch" class="qc-menu-fold" @click="toggle_sidebar">
        <i></i>
      </div>
      <!-- 左边的选择栏 -->
      <el-aside id="sidebar" width="200px">
        <OpAside />
      </el-aside>
      <!-- 主内容区域 -->
      <el-main>
        <OpMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 引入组件
import OpAside from '@/layout/OpAside';
import OpHeader from '@/layout/OpHeader';
import OpMain from '@/layout/OpMain';
// import * as loginapi from "@/api/login";
export default {
  // 组件声明
  components: {
    OpAside,
    OpHeader,
    OpMain
  },
  data() {
    return {
      status: true
    };
  },
  methods: {
    toggle_sidebar() {
      const switchIcon = document.getElementById("switch");
      const slider = document.getElementById("sidebar");
      if (this.status) {
        this.status = !this.status;
        // classList为元素添加class
        slider.classList.add("aside-hidden");
        switchIcon.classList.add("switchToggle");
      } else {
        this.status = !this.status;
        // classList为元素移除class
        slider.classList.remove("aside-hidden");
        switchIcon.classList.remove("switchToggle");
      }
    }
    // getNewToken() {
    //     this.myInterval = window.setInterval(() => {
    //         setTimeout(function() {
    //             loginapi.UserInfo().then(res => {
    //                 if(res.newToken) {
    //                     this.$store.commit('SetToken',res.newToken);
    //                 }
    //             })
    //         }, 1)
    //     }, 1560000)
    // }
  },
  // created() {
  //     this.getNewToken();
  // },
  // beforeDestroy() {
  //     clearTimeout(this.myInterval)
  // }
}
</script>

<style scoped>
.qc-menu-fold {
  line-height: 100;
  position: absolute;
  overflow: hidden;
  width: 18px;
  height: 30px;
  border: 1px solid #4d4d4d;
  border-right: none;
  z-index: 100;
  background-color: #4d4d4d;
  top: 60px;
  left: 200px;
  /* border-radius: 2px 0 0 2px; */
  /* 光标类型 变手指 */
  cursor: pointer;
  display: block;
}

.qc-menu-fold:hover {
  background-color: #404040;
  border-color: #404040;
}
.qc-menu-fold i {
  width: 16px;
  height: 16px;
  background-image: url("../icons/svg/switch.svg");
  color: #bbb !important;
  position: absolute;
  left: 60%;
  top: 55%;
  margin-top: -8px;
  margin-left: -8px;
  display: inline-block;
  cursor: pointer;
  background-size: 70%;
  background-repeat: no-repeat;
}
/* 隐藏 */
.aside-hidden {
  display: none;
}
/* 点击后的显示位置 以及箭头变化 */
.switchToggle.qc-menu-fold {
  left: 0;
}
.switchToggle.qc-menu-fold i {
  width: 16px;
  height: 16px;
  background-image: url("../icons/svg/switch.svg");
  color: #bbb !important;
  position: absolute;
  left: 40%;
  top: 45%;
  margin-top: -8px;
  margin-left: -8px;
  display: inline-block;
  cursor: pointer;
  background-size: 70%;
  transform: rotate(180deg);
  background-repeat: no-repeat;
}
</style>