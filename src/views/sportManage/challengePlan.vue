<template>
  <!-- 账号管理 -->
  <el-card>
    <!-- 顶部区 -->
    <div class="topStyle">
      <!-- 输入框 -->
      <div class="searchStyle">
        <!-- <div class='searchDiv'>
          <el-date-picker 
              v-model="timeValue" 
              type="daterange" 
              range-separator="至" 
              start-placeholder="开始日期" 
              end-placeholder="结束日期" 
              style="width:260px;">
          </el-date-picker>
        </div> -->
        <div class='searchDiv'>
          <el-input 
            v-model="search.name" 
            placeholder="请输入名称" 
            clearable prefix-icon="el-icon-search" 
            style="width:220px;">
          </el-input>
        </div>
        <!-- 搜索 -->
        <div class='searchDiv'>
          <!-- plain：简单的纯色样式，主要应用于window样式上 -->
          <el-button type="primary" @click="SearchBtn">搜索</el-button>
        </div>
        <!-- 重置 -->
        <div class='searchDiv'>
          <!-- plain：简单的纯色样式，主要应用于window样式上 -->
          <el-button type="info" plain @click="Reset">重置</el-button>
        </div>
      </div>
      <!-- 新建 -->
      <div>
        <el-button type="primary" @click="Create">新建挑战计划</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <div style="margin-top:30px;">
      <div>
        <!-- getHeaderClass：设置表头 getRowClass：设置表格行 border：边框 -->
        <el-table :data='tableData' 
          :header-cell-style='getHeaderClass' 
          :cell-style='getRowClass' 
          style="border-top:1px solid rgb(211, 205, 205);border-bottom:1px solid rgb(211, 205, 205);">
          <el-table-column label="创建时间" align='center'>
            <template slot-scope='scope'>{{ scope.row.time }}</template>
          </el-table-column>
          <el-table-column label="ID" align='center'>
            <template slot-scope='scope'>{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="标题" align='center'>
            <template slot-scope='scope'>{{ scope.row.name }}</template>
          </el-table-column>
          <!-- <el-table-column label="挑战标识" align='center'>
            <template slot-scope='scope'>{{ scope.row.role }}</template>
          </el-table-column> -->
          <!-- 显示图片 -->
          <el-table-column label="挑战标识" align='center'>
            <!-- <template slot-scope='scope'>{{ scope.row.img }}</template> -->
            <template slot-scope='scope'>
              <!-- {{ scope.row.img }} -->
              <!-- fit="cover"确定图片如何自适应容器框 -->
              <el-image style="width: 80px; height: 80px" :src="scope.row.img" fit="cover"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="参与人数(人)" align='center'>
            <template slot-scope='scope'>{{ scope.row.people }}</template>
          </el-table-column>
          <!-- width固定操作框的宽度 220/160 width="160vw" -->
          <el-table-column label="操作" align='center' width="200vw">
            <template slot-scope="scope">
              <!-- @click.native:监听根元素的原生事件 -->
              <el-button size="mini" type="text" plain  @click.native="Detail(scope.row)">查看</el-button>
              <el-button size="mini" type="primary" plain @click.native="Update(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger"  @click.native="Delete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 弹窗 -->
    <el-dialog :title="addType[dialogStatus]"  :visible.sync="dialogFormVisible" width=35vw>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="挑战标题" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <!-- v-if="this.dialogStatus == 'addE'"：上传的时候才有 -->
        <el-form-item v-if="this.dialogStatus == 'addE'" label="挑战标识" :label-width="formLabelWidth" prop="img">
            <el-input v-model="form.img" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="参加人数" :label-width="formLabelWidth" prop="people">
            <el-input v-model="form.people" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Confirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <div class="pag">
      <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync='pagData.page'
        :page-sizes="[10,50,100]" 
        :page-size="pagData.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagData.total" 
        background>
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 搜索
      // timeValue: [],
      search: {
        name: '',
      },
      // 表格
      tableData:[
        {
          time:"2021-01-11",
          id:'1',
          name:'每天走路8000步',
          img: require("@/assets/imgs/password.png"),
          people:'890',
        },
        {
          time:"2021-01-11",
          id:'1',
          name:'每天走路8000步',
          img: require("@/assets/imgs/password.png"),
          people:'890',
        },
        {
          time:"2021-01-11",
          id:'1',
          name:'每天走路8000步',
          img: require("@/assets/imgs/password.png"),
          people:'890',
        }
      ],
      // 弹窗
      addType: {// 弹窗标题
        addE:'新建挑战计划',
        upE:'编辑挑战计划',
      },
      dialogStatus:'',// 放弹窗标题的容器
      dialogFormVisible: false, // 弹窗是否显示
      formLabelWidth: '100px',

      form: {},
      rules: { // 表单校验
        name: [ { required: true,message: '不能为空',trigger: 'blur'} ],
        img: [ { required: true,message: '不能为空',trigger: 'blur'} ],
        people: [ { required: true,message: '不能为空',trigger: 'blur'} ],
      },
      //分页
      pagData: {
        total: 0,
        offset: 0,
        limit: 10,
        page: 1,
      },
    }
  },
  methods: {
    // 搜索
    SearchBtn() {
      console.log('搜索')
    },
    // 全部重置
    Reset() {
      console.log('全部重置')
    },
    // 编辑
    Update(row){
      console.log(row,'编辑')
      this.dialogStatus = "upE";
      this.dialogFormVisible = true;

      // 回显
      // 深拷贝，避免受model的影响 将行内的数据显示出来
      // this.form = Object.assign({},row);
      this.form = JSON.parse(JSON.stringify(row));
    },
    // 新建
    Create() {
      this.dialogStatus = "addE";
      this.dialogFormVisible = true;
      this.form = {};//清空
    },
    // 弹出框复位
    resetcreateform() {
      this.dialogFormVisible = false;//关闭
      this.form = {};//清空
    },
    // 确定
    Confirm(){
      // 表单校验
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        // 在表单校验之后将它禁用 可以防止此时就请求后端进行交互
        // this.disabledVisible = true;

        // 新建单位
        if (this.dialogStatus == "addE") {
          console.log("新建")

          // 关闭弹窗并清空
          this.resetcreateform();

          // 要传值 三个对象！！！
          // api.Create(this.form).then(res => {
          //     // console.log('res',res)
          //     if (res.status == 500) {//错误的时候开启
          //       // 开启确认按钮
          //       this.disabledVisible = false;
          //     } else {
          //       // 关闭弹窗并清空
          //       this.resetcreateform();
          //       this.$message({
          //         type: 'success',
          //         message: '创建成功'
          //       });
          //       // 重新调用显示
          //       this.getdate();
          //     }
          // })
        // 编辑单位 
        }else if(this.dialogStatus == "upE") {
          console.log("编辑")

          // 关闭弹窗
          this.dialogFormVisible = false;

          // 传id
          // api.Update(this.form.id,this.form).then(res => {
          //   // console.log('res',res)
          //   if (res.status == 500) {//错误的时候开启
          //     this.disabledVisible = false;
          //   } else {
          //     // 关闭弹窗
          //     this.dialogFormVisible = false;
          //     this.$message({
          //       type:'success',
          //       message:'更新成功'
          //     });
          //     //  开启确认按钮
          //     // 重新调用显示
          //     this.getdate()
          //   }
          // })
        }
      })
    },
    // 查看
    Detail(row){
      console.log('查看详情')
      // 挑转到详情页
      this.$router.push({
        // 路径
        path:'/sportManage/challengeDetail',
        // 传参
        query:{row}
      })
    },
    // 删除
    Delete(row){
      console.log(row,'删除')
      // 删除框
      this.$confirm("此操作将删除这条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log(row,'删除成功')
        // api.Delete(row.id).then(res => {
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   });
        //   // 重新调用显示
        //   this.getdate();
        // })
      })
    },
    // 表格
    getHeaderClass({rowIndex}) {// 设置表格表头
      if(rowIndex == 0) {
        return "background-color:#F2F2F2; border-color:rgb(211, 205, 205);" 
      }
    },
    getRowClass() {// 设置表格行
      return "border-color:rgb(211, 205, 205);"
    },
    //分页:每页条数 val
    handleSizeChange() {
      // 传一页限制多少条
      // this.pagData.limit = val;
      // this.getdate();
    },
    //分页:当前页 val
    handleCurrentChange() {
      // 前一页的数量！可以使得第二次请求时从第几条开始
      // this.pagData.offset = this.pagData.limit * (val - 1);
      // 传点击的是第几页
      // this.pagData.page = val;
      // this.getdate();
    },
  },
}
</script>

<style scoped lang="scss" >
// 搜索
.topStyle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .searchStyle {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .searchDiv{
      margin: 7px 10px 5px 0;
    }
  }
}
// 页脚
.pag {
  margin-top: 40px;
  text-align: center;
}
</style>