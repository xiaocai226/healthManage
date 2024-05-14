<template>
  <!-- 账号管理 -->
  <el-card>
    <!-- 添加tab标签 -->
    <!-- id -->
    <!-- <div style="margin-bottom: 10px;" v-if="this.$route.query.row">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        @close="handleClose(tag)">
        来自待办管理：{{tag}}
      </el-tag>
    </div> -->

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
        <el-button type="primary" @click="Create">新建食品</el-button>
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
          <el-table-column label="食品名称" align='center'>
            <template slot-scope='scope'>{{ scope.row.name }}</template>
          </el-table-column>
          <!-- 显示图片 -->
          <el-table-column label="标识图" align='center' width="100vw">
            <!-- <template slot-scope='scope'>{{ scope.row.img }}</template> -->
            <template slot-scope='scope'>
              <!-- {{ scope.row.img }} -->
              <!-- fit="cover"确定图片如何自适应容器框 -->
              <el-image style="width: 80px; height: 80px" :src="scope.row.img" fit="cover"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="食品别名" align='center'>
            <template slot-scope='scope'>{{ scope.row.othername }}</template>
          </el-table-column>
          <el-table-column label="热量(大卡)" align='center'>
            <template slot-scope='scope'>{{ scope.row.xxx }}</template>
          </el-table-column>
          <el-table-column label="脂肪(克)" align='center'>
            <template slot-scope='scope'>{{ scope.row.xxx }}</template>
          </el-table-column>
          <el-table-column label="维生素(克)" align='center'>
            <template slot-scope='scope'>{{ scope.row.xxx }}</template>
          </el-table-column>
          <el-table-column label="碳水化合物(克)" align='center'>
            <template slot-scope='scope'>{{ scope.row.xxx }}</template>
          </el-table-column>
          <el-table-column label="蛋白质(克)" align='center'>
            <template slot-scope='scope'>{{ scope.row.xxx }}</template>
          </el-table-column>
          <el-table-column label="(克)" align='center'>
            <template slot-scope='scope'>{{ scope.row.xxx }}</template>
          </el-table-column>
          <el-table-column label="(克)" align='center'>
            <template slot-scope='scope'>{{ scope.row.xxx }}</template>
          </el-table-column>
          <el-table-column label="(克)" align='center'>
            <template slot-scope='scope'>{{ scope.row.xxx }}</template>
          </el-table-column>
          <el-table-column label="(克)" align='center'>
            <template slot-scope='scope'>{{ scope.row.xxx }}</template>
          </el-table-column>
          <el-table-column label="所属类别" align='center'>
            <template slot-scope='scope'>{{ scope.row.type }}</template>
          </el-table-column>
          <!-- width固定操作框的宽度 220/160  -->
          <el-table-column label="操作" align='center' width="160vw">
            <template slot-scope="scope">
              <!-- @click.native:监听根元素的原生事件 -->
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
        <el-form-item label="食物名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 不编辑回显 -->
        <el-form-item v-if="this.dialogStatus == 'addE'" label="标识图" :label-width="formLabelWidth" prop="img">
            <el-input v-model="form.img" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="食物别名" :label-width="formLabelWidth" prop="othername">
            <el-input v-model="form.othername" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="热量(大卡)" :label-width="formLabelWidth" prop="xxx">
            <el-input v-model="form.xxx" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="脂肪(克)" :label-width="formLabelWidth" prop="xxx">
            <el-input v-model="form.xxx" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="维生素(克)" :label-width="formLabelWidth" prop="xxx">
            <el-input v-model="form.xxx" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="碳水化合物(克)" :label-width="formLabelWidth" prop="xxx">
            <el-input v-model="form.xxx" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="蛋白质(克)" :label-width="formLabelWidth" prop="xxx">
            <el-input v-model="form.xxx" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="(克)" :label-width="formLabelWidth" prop="xxx">
            <el-input v-model="form.xxx" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="(克)" :label-width="formLabelWidth" prop="xxx">
            <el-input v-model="form.xxx" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="(克)" :label-width="formLabelWidth" prop="xxx">
            <el-input v-model="form.xxx" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="(克)" :label-width="formLabelWidth" prop="xxx">
            <el-input v-model="form.xxx" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属类别" :label-width="formLabelWidth" prop="type">
            <el-input v-model="form.type" auto-complete="off"></el-input>
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
      // 标签
      // dynamicTags: [],

      // 搜索
      // timeValue: [],
      search: {
        name: '',
      },
      // 表格
      tableData:[
        {
          time:"2021-01-11",
          id:'11',
          name:'大米',
          img: require("@/assets/imgs/password.png"),
          othername:'米',
          xxx:'xxx',
          type:'谷薯类'
        },
        {
          time:"2021-01-11",
          id:'11',
          name:'大米',
          img: require("@/assets/imgs/password.png"),
          othername:'米',
          xxx:'xxx',
          type:'谷薯类'
        },
        {
          time:"2021-01-11",
          id:'11',
          name:'大米',
          img: require("@/assets/imgs/password.png"),
          othername:'米',
          xxx:'xxx',
          type:'谷薯类'
        }
      ],
      // 弹窗
      addType: {// 弹窗标题
        addE:'新建食品',
        upE:'编辑食品',
      },
      dialogStatus:'',// 放弹窗标题的容器
      dialogFormVisible: false, // 弹窗是否显示
      formLabelWidth: '100px',

      form: {},
      rules: { // 表单校验
        name: [ { required: true,message: '不能为空',trigger: 'blur'} ],
        img: [ { required: true,message: '不能为空',trigger: 'blur'} ],
        othername: [ { required: true,message: '不能为空',trigger: 'blur'} ],
        xxx: [ { required: true,message: '不能为空',trigger: 'blur'} ],
        type: [ { required: true,message: '不能为空',trigger: 'blur'} ],
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
    // 标签
    // handleClose(tag) {
      // // 先用indexOf得到标签在数组中的索引位置，然后调用splice函数从该索引位置起删除一个元素
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      // this.searchObj.id.eq = '';
      // // 点击去掉tag时，将传递的参数去掉(url参数)
      // location.replace(location.href.replace(location.hash, `#${this.$route.path}`))
      // this.getdate();
    // },

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
      // console.log(row,'编辑')
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