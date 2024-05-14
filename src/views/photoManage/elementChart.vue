<template>
  <el-card class="box">
    <!-- <el-carousel :interval="4000" type="card" height="500px">
      <el-carousel-item v-for="item,index in imageUrl" :key="index">
        <img :src='item' />
      </el-carousel-item>
    </el-carousel> -->

    <!-- indicator-position='none': 下中标识去掉 arrow="never"：左右标识不要（always要） -->
    <el-carousel indicator-position='none' :interval="2000" arrow="never">
      <el-carousel-item v-for="item,index in imageUrl" :key="index">
        <img :src='item' />
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<script>
  export default {
    data() {
      return{
        imageUrl:[
          // require('@/assets/images/film1.png'),
          require('@/assets/images/film2.png'),
          require('@/assets/images/film3.png'),
          require('@/assets/images/film4.png'),
          require('@/assets/images/film5.png'),
        ]
      }
    },
  }
</script>

<style >
/* lang="scss" scoped */
/* .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 500px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
} */

.box{
  width: 260px;
  height: 380px;
  margin: auto;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>