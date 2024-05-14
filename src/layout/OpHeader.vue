<template>
  <div class="CommonHeader">
    <!-- 名称 -->
    <div class="header_font">
        健 康 管 理 平 台
    </div>
    <!-- 个人登录 -->
    <div style='margin-right: 20px;'>
      <!-- 下拉菜单 trigger:点击触发被选元素的指定事件类型 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link" style="color:#fff;">
          <!-- <img src="@/assets/imgs/dog.png" />  -->
          <!-- ({{nickname}}) -->
          欢迎&nbsp; &nbsp; {{username}} <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item @click.native="changePassword">修改密码</el-dropdown-item> -->
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 修改密码弹窗 -->
    <!-- :visible:属性绑定(弹窗的显示true隐藏false) .sync:同步动态双向的来表示visible的值(同步修改了visible的值) -->
    <!-- <el-dialog title="修改密码" :visible.sync="changePasswordDialog" width="25%">
      <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm">
        <el-form-item label="旧密码" :label-width="formLabelPasswordWidth"  prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelPasswordWidth"  prop="newPassword">
          <el-input v-model="passwordForm.newPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changePasswordDialog = false">取 消</el-button>
        <el-button type="primary" @click="changeConfirm">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  data() {
    return {
      username: "小菜花", //用户名
      // nickname: "",
      // changePasswordDialog: false, //弹窗
      // passwordForm: {
      //   oldPassword: '', //旧密码
      //   newPassword: '', //新密码
      // },
      // formLabelPasswordWidth: '65px',//label的宽度
      // passwordRules: {
      //   oldPassword: [
      //     { required: true, message: '请输入旧密码', trigger: 'blur' },
      //   ],
      //   newPassword: [
      //     { required: true, message: '请输入新密码', trigger: 'blur' },
      //     // 规则需要变一下！！！！！
      //     { pattern: /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,20}$/,
      //       message: '密码长度至少8位,包含大小写字母、数字、特殊字符,任意三种' },
      //   ]
      // },
    }
  },
  methods: {
    //退出
    logout() {
      console.log("退出登录")
      // this.$store.dispatch("LogOut").then(() => {
      //   this.$router.push("/login");
      //   this.$message({
      //     type: 'success',
      //     message: '退出成功'
      //   });
      // });
    },
    //修改密码
    // changePassword() {
    //   this.passwordForm = {};
    //   this.changePasswordDialog = true;
    // },
    // changeConfirm() {
    //   console.log("确认修改")
    //   // api.ChangePassword(this.passwordForm).then(res => {
    //   //   console.log('login',res)
    //   //   if(res.status == 200) {
    //   //     this.$message({
    //   //       type: 'success',
    //   //       message: '密码修改成功！'
    //   //     });
    //   //     this.changePasswordDialog = false;
    //   //   }
    //   // }) 
    // }
  },
}
</script>

<style scoped lang='scss'>
.CommonHeader {
  height: 100%;
  // 全屏背景颜色
  background-color: #2E313A;
  // flex布局 两边 垂直居中
  display: flex;
  align-items: center;
  justify-content: space-between;
}
// 健康管理平台样式
.header_font {
  font-weight: 700;
  font-size: 24px;
  color: #fff;
  margin-left: 20px;
}
</style>
