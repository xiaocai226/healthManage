<template>
  <div>
    <!-- 进入/离开过渡 vue自带的name="slide-fade"设置动画 -->
    <!-- mode:不同方式的动画过渡效果
         in-out:新元素先进行过渡,完成之后当前元素过渡离开
         out-in:当前元素先进行过渡,完成之后新元素过渡进入-->
    <transition name="slide-fade" mode="out-in">
      <!-- 占位 -->
      <router-view></router-view>
    </transition>
  </div>
</template>