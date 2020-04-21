<template>
  <div class="login-container">
    <img class="login-img" src="../../assets/test.jpg" />
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录管理系统</h3>
        <span class="warning">未经许可，不得擅自复制和传播本程序。</span>
      </div>

      <el-form-item prop="username">
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>-->
        <div>
          <el-input
            placeholder="请输入你的手机号"
            ref="username"
            v-model="loginForm.username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="+86">
              <el-option label="+86" value="1"></el-option>
              <el-option label="2222" value="2"></el-option>
              <el-option label="3333" value="3"></el-option>
              <el-option label="4444" value="4"></el-option>
            </el-select>
          </el-input>
        </div>
        <!-- <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入你的手机号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />-->
      </el-form-item>

      <el-form-item prop="password">
        <!-- <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>-->
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入你的密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>-->
      </el-form-item>

      <el-checkbox v-model="checked">15天内自动登录</el-checkbox>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="handleLogin"
        class="login-button"
      >登录</el-button>

      <div class="tips">
        <p> 
          <span class="txt">或</span>
          <span class="business">创建企业</span>
        </p>
        <p class="forget">忘记密码？</p>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "111111"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      select: '',
      checked: true
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

.el-select .el-input {
  width: 100px;
  color: #333;
}
.el-select {
  height: 60px;
  line-height: 60px;
}

.el-input__inner {
  height: 60px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-form-item__content {
  width: 430px;
  margin: auto;
}

.el-checkbox {
  margin-top: 118px;
  margin-bottom: 21px;
  color: #999;
  font-size: 19px;
}

// $bg: #283443;
// $light_gray: #fff;
// $cursor: #fff;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

// /* reset element-ui css */
// .login-container {
//   .el-input {
//     display: inline-block;
//     height: 47px;
//     width: 85%;

//     input {
//       background: transparent;
//       border: 0px;
//       -webkit-appearance: none;
//       border-radius: 0px;
//       padding: 12px 5px 12px 15px;
//       color: $light_gray;
//       height: 47px;
//       caret-color: $cursor;

//       &:-webkit-autofill {
//         box-shadow: 0 0 0px 1000px $bg inset !important;
//         -webkit-text-fill-color: $cursor !important;
//       }
//     }
//   }

//   .el-form-item {
//     border: 1px solid rgba(255, 255, 255, 0.1);
//     background: rgba(0, 0, 0, 0.1);
//     border-radius: 5px;
//     color: #454545;
//   }
// }
</style>

<style lang="scss" scoped>
$h-color: #333;
$s-color: #999;
$h-fs: 27px;
$s-fs: 17px;
$i-fs: 19px;

.login-container {
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .login-img {
    width: 510px;
    height: 340px;
    margin-left: 100px;
  }

  .login-form {
    width: 488px;
    max-width: 100%;
    height: 675px;
    text-align: center;
    border: 1px solid #E4E5E7;
    border-radius: 5px;
    font-family:PingFangSC-Regular,PingFang SC;

    .title-container {
      margin: 88px 0 64px 0;

      .title {
        color: $h-color;
        font-size: $h-fs;
        margin-right: 268px;
      }
      .warning {
        color: $s-color;
        font-size: $s-fs;
        margin-right: 122px;
      }
    }

    .login-button {
      width: 430px!important;
      height: 60px;
      font-size: $i-fs;
    }

    .tips {
      width:430px;
      margin: 0 0 30px 29px;
      display: flex;
      justify-content: space-between;
      font-size: $i-fs;

      .txt {
        color: $s-color;
      }
      
      .business, .forget {
        color: #409EFF;
      }
    }
  }
}

@media screen and (max-width: 1440px) {
  .login-img {display: none}
}
@media screen and (max-height: 720px) {
  .login-img {display: none}
}
</style>
