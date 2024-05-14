<template>
  <el-card>
    <!-- 2、准备容器 产能营养素(碳水化合物、脂肪、蛋白质) echarts图 -->
    <!-- 可以使用ref,$refs来代替document.getElementById(),可以避免还未初始化 -->
    <div class="title">热量最高的10种食物</div>
    <div id="echarts"></div>
  </el-card>
</template>

<script>
export default {
  name: 'home',
  methods: {
    drawEcharts(){
      // 1、由于引入时更改了原型链，因此可以通过this.$echarts来全局使用
      // 3、基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("echarts"))
      // 4、准备配置项(只有这一个会不同，其他的步骤一模一样)
      let option = {
        color:'#DEE1E6',//柱子颜色
        title: {
          // text:'热量最高的食物',
          // left: 'center',//标题居中
          // textStyle:{//标题样式
          //     color: 'black',
          //     fontWeight: 600,
          //     fontSize: 14
          // },
          // top: 10
        },
        animation: true,//是否开启动画
        // legend:{//折线提示
        //   data: ['流量值'],//要和下面的series的name对应
        //   bottom : 10,//提示线放在下面
        //   itemWidth : 50,//图例标记的宽度及高度
        //   itemHeight : 10
        // },
        grid:{
          height:300,//设置高度
          //左右距离
          right:'10%',
          left:'10%',
        },
        xAxis: {
          type: 'category',//类目轴
          data: ['苹果','香蕉','苹果','香蕉','苹果','香蕉','苹果','香蕉','苹果','香蕉'],
          // axisLine:{
          //     // show:false,
          // },
          // axisTick:{
          //     show:false,
          // },
          axisLabel:{//横坐标
            interval:'0',//强制显示所有
          },
        },
        yAxis: {
          type: 'value',
          // show:true,
          name:'含量/每100克',
          // name:'流量值/G',
          scale: true,//不从0开始
          splitLine:{// 不显示网格线
            // show:false,
          },
          axisLine:{// 不显示坐标轴
            show:false,
          },
          axisTick:{//刻度
            show:false,
          },
          axisLabel:{//文字
            // show:false
          }
        },
        // tooltip: {//提示框组件：鼠标划过时显示信息
        //   trigger: 'axis',// 坐标轴触发
        //   // axisPointer:{ //坐标轴指示器，坐标轴触发有效
        //   //     type:'cross'//十字交叉坐标轴指示器
        //   // }
        // },
        tooltip:{//提示框
          // trigger: 'item',//显示当前单个数据项的提示框
          // 自定义 用formatter回调函数显示单项数据内容
          formatter: function(params) {
            // var color = params.color;//图例颜色
            var htmlStr = '<div>';
            htmlStr += params.name + '</br>';//x轴的名称
            // 效果
            // htmlStr += '<span style="background-color:'+color+';"></span>'
            // 添加说明内容
            htmlStr += params.seriesName + ':' + params.value + '克';
            htmlStr += '</div>'
            return htmlStr;
          }
        },
        series: [
          {
            name: '含量值',
            type: 'bar',//line
            data: [90,20,10,10,23,33,42,43,23,89],
            // color: 'red',//设置折线图颜色
            // symbol:'triangle',//图标设置为三角形
            // symbolSize: 8,//图标大小
            label:{//数值显示在上方
              show:true,
              position:'top',
              textStyle:{//数值样式
                color:'grey',
                fontSize:12
              }
            },
          }
        ]
      }
      // 5、将配置项设置给echarts实例对象
      myChart.clear()//之前先清空内容
      myChart.setOption(option);
      // 7、折线图自适应 resize
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }
  },
  // 渲染完成之前
  created() {
    // $nextTick强制性渲染完成
    // this.$nextTick(function(){
    //     // 显示echarts图
    //     this.drawChart();
    // })
  },
  // 渲染完成之后
  mounted() {
    this.drawEcharts();
  },
}
</script>

<style lang="scss" scoped>
// lang="scss"(可以叠写css) scoped(局部作用域) 
.title{
  width: 100%;
  // margin: auto;
  text-align: center;
  // margin-left:200px;
  font-size: 20px;
  // margin: 30px 0;
  margin-top: 10px;
}
#echarts{
  margin: 20px auto;
  // box-sizing: border-box;
  width: 90%;
  border: 1px solid #e2e1e1;
  height: 400px;
}
</style>