<template>
  <!-- :default-active="$route.path" router :绑定路由表 
  router：为true,是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
  text-color:菜单文字颜色 active-text-color:激活时的颜色 -->
  <el-menu :default-active="$route.path" router 
    background-color="#3A3D49" text-color="#fff" active-text-color='#fff'>
    <!-- 首页 -->
    <el-menu-item index="/home" class="home">
      <i class="el-icon-s-home"></i>
    </el-menu-item>

    <!-- 大目录 index不能忘记！-->
    <el-submenu index="1">
      <template slot="title">
        <!-- <i class="el-icon-menu"></i> -->
        <i class="el-icon-dish"></i>
        <span>饮食管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/dietManage/food">食物管理</el-menu-item>
        <!-- <el-menu-item index="/dietManage/foodType">食物分类</el-menu-item>
        <el-menu-item index="/dietManage/foodDetail">食品管理</el-menu-item> -->
      </el-menu-item-group>
    </el-submenu>
    
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-basketball"></i>
        <!-- <i class="el-icon-magic-stick"></i> -->
        <!-- <i class="el-icon-menu"></i> -->
        <span>运动管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/sportManage/challengePlan">挑战计划</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-video-camera"></i>
        <span>视频管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/videoManage/video">视频管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/userManage/user">账号管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>图形管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/photoManage/castChart">轮播图</el-menu-item>
        <el-menu-item index="/photoManage/elementChart">element轮播图</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
// lang="scss"(可以叠写css) scoped(局部作用域) 
.el-menu {
  border: 0px;
  min-height: 100%;
}
.home{
  // 水平垂直居中
  text-align:center;
  height:30px;
  line-height:30px;
}
</style>
<style>
/* 设置每个标题的边距为0 */
.el-menu-item-group__title {
  padding: 0px !important;
}
/* .el-submenu打开时一级菜单高亮 */
.el-submenu.is-opened .el-submenu__title {
  background: #2E313A !important;
}
/* .el-menu-item单击、移入高亮 */
.el-menu-item.is-active {
  background-color: #409EFF !important;
}
.el-menu-item:hover{
  background: #409EFF !important;
}
</style>