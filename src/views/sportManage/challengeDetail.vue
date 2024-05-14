<template>
  <el-card>
    <!-- 标题 -->
    <div>
      <!-- $router.go(-1)不用这个 因为传回去变成第一页 -->
      <i class='el-icon-arrow-left left' @click='$router.go(-1)'></i>
      挑战计划详情
    </div>
    <!-- 大title -->
    

  </el-card>
</template>

<script>
export default {
  created() {
    // 接收传参
    console.log(this.$route.query.row)
  },
}
</script>

<style lang="scss" scoped>

</style>