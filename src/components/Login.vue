<template>
  <el-row class="login_page">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="login-container">
      <h3 class="title">一体化卫勤决策平台登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号" clearable></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="密码" clearable></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="loadingAnim">登录</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
import { requestLogin } from '../api/api';
export default {
  data() {
    return {
      loadingAnim: false,
      loginForm: {
        account: 'docter4',
        checkPass: '123456'
      },
      loginRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      checked: false
    };
  },
  methods: {
    handleSubmit(e) {
      var _this = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loadingAnim = true;
          var loginParams = { username: this.loginForm.account, password: this.loginForm.checkPass };
          requestLogin(loginParams).then(data => {
            this.loadingAnim = false;
            let { msg, code, user } = data;
            if (code !== 200) {
              this.$message({
                message: msg,
                type: 'error'
              });
            } else {
              sessionStorage.setItem('user', JSON.stringify(user));
              if ( user.id ===1 ) {
                this.$router.push({ path: '/System_Home/System_page1' });
              } else if ( user.id === 4) {
                this.$router.push({ path: '/InjuryMedicalTag' });
              } else if ( user.id === 6) {
                this.$router.push({ path: '/InjuryAssignView' });
              } else {
                this.$router.replace({ path: '/Login' });
              }
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }

  }
}

</script>
<style scoped lang="scss">
.login_page {
  width: 100%;
  height: 100%;
  background-image: url(../../static/picture/login_background.jpg);
  background-size:100% 100%;
}

.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin-left: 45% ;
  margin-top: 150px;
  width: 250px;
  padding: 5px 40px 5px 40px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .title {
    margin: 10px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0px 0px 15px 0px;
  }
}

</style>
