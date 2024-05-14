<template>
    <!-- 首页 用组件的形式来写 -->
    <el-card>
        <!-- tabs标签页 -->
        <el-tabs v-model="activeName">
            <!-- 第一个 -->
            <el-tab-pane label="用户图" name="1">
                <userEcharts v-if="activeName === '1'"></userEcharts>
            </el-tab-pane>
            <!-- 第二个 -->
            <el-tab-pane label="挑战人数图" name="2">
                <challengeEcharts v-if="activeName === '2'"></challengeEcharts>
            </el-tab-pane>
            <!-- 第三个 -->
            <el-tab-pane label="食品热量图" name="3">
                <heatEcharts v-if="activeName === '3'"></heatEcharts>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
// 引入组件
import userEcharts from './userEcharts'
import challengeEcharts from './challengeEcharts'
import heatEcharts from './heatEcharts'
export default {
  data () {
    return {
      activeName: "1",//默认选第一个
    }
  },
  components: {
    userEcharts,
    challengeEcharts,
    heatEcharts,
  },
  created () {

  },
  computed: {
      
  },
  methods: {
      
  }
}
</script>

<style scoped="scoped" lang="scss">

</style>
