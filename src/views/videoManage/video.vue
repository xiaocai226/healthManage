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
        <el-button type="primary" @click="Create">新建视频</el-button>
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
          <!-- 显示图片 -->
          <el-table-column label="预览图" align='center'>
            <template slot-scope='scope'>
              <!-- {{ scope.row.img }} -->
              <!-- fit="cover"确定图片如何自适应容器框 -->
              <el-image style="width: 80px; height: 80px" :src="scope.row.img" fit="cover"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="视频链接" align='center'>
            <template slot-scope='scope'>{{ scope.row.link }}</template>
          </el-table-column>
          <!-- width固定操作框的宽度 220/160 width="160vw" -->
          <el-table-column label="操作" align='center'>
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
    <el-dialog :title="addType[dialogStatus]" :visible.sync="dialogFormVisible" width=35vw>
      <!-- rules规则 form绑定 ref校验 -->
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="视频标题" :label-width="formLabelWidth"  prop="name">
            <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

        <!-- 不编辑回显 -->
        <el-form-item 
          v-if="this.dialogStatus == 'addE'" 
          label="预览图" 
          :label-width="formLabelWidth" prop="file">
            <!-- <el-input v-model="form.img" auto-complete="off"></el-input> -->
            <!-- 注意点
                1.file-list属性中，每个图片的数据，必须含有name（图片名称）和url（图片路径）两个字段，
                这是图片显示的必要字段，如果服务器返回的数据字段不相符，需要进行整理数据
                2.el-dialog对话框是图片预览时显示图片所用，数以此对话框是书写在el-upload组件外面的，
                注意不要写在里面，否则在预览图片对话框消失的时候，会再次触发上传图片的选择 -->
            <!-- action:上传的地址 通常为后端提供的接口 action="#":提交数据到本页
                 list-type:文件列表的类型 
                  1.text文本类型 预览时无法看到图片
                  2.picture长图片类型 预览时能够看到上传的图片
                  3.picture-card方图片类型 预览时能够看到上传的图片
                 on-success属性：图片上传服务器成功会触发相应回调，回调函数有三个参数
                  1.response（图片上传后，服务器返回的数据）
                  2.file（当前图片文件的数据）
                  3.fileList（当前已上传图片的所有数据，为数组）
                 on-preview属性：图片预览，回调函数只有一个参数：file（当前预览图片的相关数据）
                 on-remove属性：删除图片，回调函数有两个参数：
                  1.file（当前将删除文件的相关数据）
                  2.fileList（删除成功之后，剩下的所有上传图片数组）
                 file-list属性：存储已经上传的图片数组数据
                 auto-upload:是否在选取文件后立即进行上传
                 :limit='1':最大允许上传个数
                 accept=".jpg, .png, .jpeg":可以上传的类型
                 
                 :class="{hide:hideUpload}":控制是否显示上传框
                 :on-change="handleChange"-->

            <!-- 
              :on-exceed="limit_control"
              :before-upload="templateCoverbeforeUpload"
              :before-remove="berfore_figure_remove_handler"
              :limit = "parseInt('1')" -->
            <el-upload
              ref="upload"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-success="handleSuccess"
              :on-preview="handleReshow"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :file-list="imageList"
              :class="{hide:hideUpload}"
              accept=".jpg, .png, .jpeg">
              <!-- 加号 -->
              <i slot="default" class="el-icon-plus"></i>
              <!-- 提示 -->
              <div slot="tip">只能上传jpg/png/jpeg文件,且不超过3MB!</div>
            </el-upload>
            <!-- 图片大图显示 --> 
            <el-dialog :visible.sync="dialogVisible" width='35vw'>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>

        <el-form-item label="外站链接" :label-width="formLabelWidth"  prop="link">
            <el-input v-model="form.link" auto-complete="off"></el-input>
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
          id:'11',
          name:'热量超了就不会变胖吗？',
          img: require("@/assets/imgs/password.png"),
          link:'www.baidu.com'
        },
        {
          time:"2021-01-11",
          id:'11',
          name:'热量超了就不会变胖吗？',
          img: require("@/assets/imgs/password.png"),
          link:'www.baidu.com'
        },
        {
          time:"2021-01-11",
          id:'11',
          name:'热量超了就不会变胖吗？',
          img: require("@/assets/imgs/password.png"),
          link:'www.baidu.com'
        }
      ],
      // 弹窗
      addType: {// 弹窗标题
        addE:'新建视频',
        upE:'编辑视频',
      },
      dialogStatus:'',// 放弹窗标题的容器
      dialogFormVisible: false, // 弹窗是否显示
      formLabelWidth: '100px',

      form: {},
      rules: { // 表单校验
        name: [ { required: true,message: '不能为空',trigger: 'blur'} ],
        file: [ { required: true,message: '不能为空',trigger: 'blur'} ],
        link: [ { required: true,message: '不能为空',trigger: 'blur'} ],
      },

      // 预览图的标识
      hideUpload: false, // 控制选择框是否显示的开关
      imageList:[],//存放上传的数组
      dialogImageUrl: '',
      dialogVisible: false,

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
      // console.log('创建')
      this.dialogStatus = "addE";
      this.dialogFormVisible = true;
      this.form = {};//清空
      console.log(this.imageList,this.imageList.length,'进来新建');

      this.imageList = [];//清空预览图
      if(this.imageList.length == 0){//取消display:none的样式
        // 定时器 防止图片还没删除框框先出现
        setTimeout(() => {//等待1秒
          this.hideUpload = false // 当length等于0的时候就不隐藏
        },1000)
      }
    },
    // 弹出框复位
    resetcreateform() {
      this.dialogFormVisible = false;//关闭
      this.form = {};//清空

      // 提交后清空图片
      // this.$refs.upload.clearFiles();//清空文件列表
      console.log(this.imageList,'弹出框复位确认键');

      this.imageList = [];//清空预览图
      if(this.imageList.length == 0){//取消display:none的样式
        // 定时器 防止图片还没删除框框先出现
        setTimeout(() => {//等待1秒
          this.hideUpload = false // 当length等于0的时候就不隐藏
        },1000)
      }
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
    // 预览图的方法
    // 成功 没大用
    handleSuccess(response,file,fileList) {
      console.log(response,file,'图片成功',fileList);
      // response 上传结果
      // file 当前上传的文件
      // fileList 当前成功上传的图片数组
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;

      // 将图片保存
      this.imageList = fileList

      // this.$refs['form'].clearValidate('file')  //上传变化清除校验
    },
    // 图片改变
    handleChange(file,fileList){
      // console.log(file,fileList,'图片改变',fileList.length);
      // 改变时获取上传图片的所有信息
      // console.log(this.$refs.upload,'改变upload')

      // 将图片保存
      // console.log(this.imageList,'保存前')
      this.imageList = fileList
      // console.log(this.imageList,'保存后')
      
      // 判断是否超过3M
      const isLt3M = file.size / 1024 / 1024 < 3;

      // console.log(this.fileList,this.imageList,'qian')

      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过3MB!');
        // this.$refs.upload.clearFiles();//清空文件列表
        this.fileList = [];//为空
        this.imageList = [];//为空
        // console.log(this.fileList,this.imageList,'hou')
        return;
      }
      console.log(fileList.length,this.imageList.length,111)
      this.hideUpload = this.imageList.length > 0 // 当length大于0的时候就隐藏添加图片的框框
      // console.log(this.$refs['form'],111)
      // this.$refs['form'].clearValidate('file')  //上传变化清除校验

      // this.$refs['form'].rules.file = []  //上传变化清除校验
      // 图片校验
      this.$refs['form'].rules.file[0].required = false  //上传变化清除校验

      // fileList成功上传的数组 现在为空
      // console.log(this.fileList)
      console.log(this.imageList,'改变时')
    },
    // 图片移除
    handleRemove(file,fileList) {
      // console.log(file,'图片移除',fileList,fileList.length);
      // 移除时获取上传图片的所有信息
      // console.log(this.$refs.upload,'移除upload')
      // file 将要删除的文件
      // fileList 为删除此图片之后剩下的图片列表

      //更新 移除后 都为空
      this.imageList = fileList
      // console.log(this.imageList,this.imageList.length,'imageList123')

      console.log(fileList.length,this.imageList.length,111)
      if(this.imageList.length == 0){//取消display:none的样式
        // 定时器 防止图片还没删除框框先出现
        setTimeout(() => {//等待1秒
          this.hideUpload = false // 当length等于0的时候就不隐藏
        },1000)

        // this.$refs.form.validate('file') //删除图片,重新触发校验
        this.$refs['form'].rules.file[0].required = true  //上传变化清除校验
        // this.$refs['form'].rules.file[0].message = '不能为空'  //上传变化清除校验
      }

      console.log(this.imageList,'图片移除')
    },
    // 图片预览
    handleReshow(file) {
      console.log(file,'图片预览');
      this.dialogImageUrl = file.url;
      // 展开对话框
      this.dialogVisible = true;
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
    created() {
    },
  },
}
</script>

<style scoped lang="scss">
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

<style>
/* 控制预览图选择框显示的主要css */
.hide .el-upload--picture-card{
  display: none;
}
</style>