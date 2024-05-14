<template>
<!-- 写页面模板 -->
  <div id="app">
    <!-- 路由占位 路由提供的组件router-view 有这个才可以跳转 -->
    <router-view></router-view>
  </div>
</template>

<script>
// 写JS代码
export default {
  // name有三个作用：
  // (1)允许组件模板递归地调用自身，就是在组件内部调用自身组件;
  // (2)便于调式，有名字的组件有更友好的警告信息;
  // (3)keep-alive相关..
  name: "App"
}
</script>

<style lang="scss">
// 写CSS样式 这里是属于公共样式
*{
	margin: 0;
	padding: 0;
}
// 所有字体为14px
html,body,#app {
  height: 100%;
  font-size: 14px;
}

// .vue_flex {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   /* #3AA094 */
// }

/* el-table表格 表头与数据对齐 */
body .el-table th.gutter {
  display: table-cell !important;
}
</style>