<template>
  <div class="login-container">
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

      <div class="input-container">
        <el-form-item prop="username">
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
            <el-select v-model="select" slot="prepend" placeholder="+86" class="select">
              <el-option label="+86" value="1"></el-option>
              <!-- <el-option label="2222" value="2"></el-option>
              <el-option label="3333" value="3"></el-option>
              <el-option label="4444" value="4"></el-option>-->
            </el-select>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入你的密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            class="input-password"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
      </div>

      <div class="checkbox">
        <el-checkbox v-model="checked">15天内自动登录</el-checkbox>
      </div>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="handleLogin"
        class="login-button"
      >登录</el-button>

      <div class="tips">
        <p>
          <!-- <router-link to="register" class="business">注册</router-link> -->
          <span class="txt">或</span>
          <router-link to="register" class="business">创建企业</router-link>
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
      select: "",
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
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.login-container {
  .el-form-item__content {
    margin: 0;
    padding: 0;
  }
  .el-select {
    height: 60px;
    line-height: 60px;
  }

  .input-container .input-with-select .el-input__inner {
    height: 60px;
  }
  .input-password .el-input__inner {
    width: 430px;
    height: 60px;
  }

  .input-with-select .el-input-group__prepend {
    width: 89px;
    color: #333;
    background-color: #fff;
  }

  .el-checkbox {
    margin-top: 118px;
    margin-bottom: 21px;
    color: #999;
    font-size: 19px;
  }
}
</style>

<style lang="scss" scoped>
$h-color: #333;
$s-color: #999;
$h-fs: 27px;
$s-fs: 17px;
$i-fs: 19px;

// .login-container {
//   min-height: 100%;
//   width: 100%;
//   display: flex;
//   align-items: center;

//   .login-form {
//     width: 488px;
//     max-width: 100%;
//     height: 675px;
//     padding: 88px 0 0 30px;
//     margin-right: 100px;
//     border: 1px solid #e4e5e7;
//     border-radius: 7px;
//     font-family: PingFangSC-Regular, PingFang SC;

//     .title-container {
//       margin-bottom: 64px;
//       .title {
//         color: $h-color;
//         font-size: $h-fs;
//         margin-bottom: 20px;
//       }
//       .warning {
//         color: $s-color;
//         font-size: $s-fs;
//       }
//     }

//     .input-container {
//       .input-with-select {
//         width: 430px;
//       }
//     }

//     .login-button {
//       width: 430px !important;
//       height: 60px;
//       font-size: $i-fs;
//     }

//     .tips {
//       width: 430px;
//       margin: 19px 0 30px 0;
//       display: flex;
//       justify-content: space-between;
//       font-size: $i-fs;

//       .txt {
//         color: $s-color;
//       }

//       .business,
//       .forget {
//         color: #409eff;
//       }
//     }

//     .checkbox {
//       width: 100%;
//       text-align: center;
//     }
//   }
// }

</style>
