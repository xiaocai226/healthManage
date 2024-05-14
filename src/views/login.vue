<template>
  <div class="login">
    <h1 class="title">健康管理平台</h1>
    <el-card class="loginForm">
      <div class='header'>
          <img src="@/assets/imgs/password.png" />登录(管理员)
      </div>
      <el-form ref="loginData" :model='loginData' :rules="rulesLogin">
        <el-form-item prop='username'>
          <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="loginData.username"></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input placeholder="密码" prefix-icon="el-icon-unlock" show-password v-model="loginData.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" :loading='loading' @click="loginBtn()">登录</el-button>
    </el-card>
  </div>
</template>

<script>
// import * as api from "@/api/login";
export default {
  data() {
    return {
      loginData: { //账号密码
          username: 'admin',
          password: 'Admin123',
      },
      rulesLogin: { //验证
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '不得少于6个字符',trigger: 'blur' }
        ]
      },
      loading: false,
    }
  },
  methods: {
    loginBtn() {
      // api.Login({  另一种登录方法
      //   username: this.loginData.username,
      //   password: this.loginData.password
      // }).then(res => {
      //   console.log(res);
      //   this.$store.commit("SetToken", res.token);
      //   this.$store.commit("SetUser", res.user);
      //   this.$router.push("/");
      //   console.log(this.$store.state,'===')
      // }).catch(err => {
      //   console.log(err)
      // })
      this.$store.dispatch("Login", this.loginData).then(() => {
        this.$router.push("/");
        this.$message({
          type: 'success',
          message: '登录成功'
        });
        // UserInfo
      });
    }
  },
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
      margin-bottom: 20px
  }
  .loginForm{
    width: 400px;
    height: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .header {
      font-size: 20px;
      margin:10px 0 30px 0;
      img {
        width:22px;
        height:22px;
        vertical-align:middle;
        margin-right: 7px;
      }
    }
    p {
      font-size: 24px;
      margin: 27px 0;
      color: #fff;
    }
    .el-input {
      width: 300px;
    }
    .el-button {
      width: 300px;
      height: 40px;
      margin-top: 15px;
    }
  }
}
</style>
