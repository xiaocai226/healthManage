<template>
  <el-card class="swiper">
    <!-- 一个盒子 -->
    <div class='swiper-content'>
      <!-- 图片盒子 -->
      <div class='swiper-item' v-for='(item,index) in imageUrl' :key='index'>
        <img :src='item' />
      </div>
    </div>
    <!-- 四个点 -->
    <div class='page'>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'swiper',
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

<style lang="scss" scoped>
.swiper{
  width: 240px;
  height: 385px;
  position: relative;
  overflow: hidden;// 超出隐藏
  margin: auto;
}

.swiper-content{
  // margin: 20px;
  position: absolute;
  left:0;
  display: flex;
  
}

.swiper-item{
  width: 240px;
  height: 385px;
}

.img{
  width:100%;
  height:100%;
}

.page{
  position: absolute;
  // 居中
  left:50%;
  transform: translate(-50%,50%);
  bottom: 40px;

  span{
    display: inline-block;
    height:15px;
    weight:15px;
    background-color:white;
  }
}
</style>