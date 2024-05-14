<template>
    <!-- 食物管理 用组件的形式来写 -->
    <el-card>
        <!-- tabs标签页 -->
        <el-tabs v-model="activeName">
            <!-- 第一个 -->
            <el-tab-pane label="食物分类" name="1">
                <foodType v-if="activeName === '1'"></foodType>
            </el-tab-pane>
            <!-- 第二个 -->
            <el-tab-pane label="食品管理" name="2">
                <foodDetail v-if="activeName === '2'"></foodDetail>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
// 引入组件
import foodType from './foodType'
import foodDetail from './foodDetail'

  export default {
    data () {
        return {
            activeName: "1",//默认选第一个
        }
    },
    components: {
        foodType,
        foodDetail
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
