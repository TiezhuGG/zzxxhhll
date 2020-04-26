<template>
  <div class="login-container">
    <img class="login-img" src="../../assets/imgs/code.png" />
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="back" @click="back">
        <img src="../../assets/imgs/back.png" />
        <span>返回</span>
      </div>
      <div class="title-container">
        <h3 class="title">设置密码</h3>
        <span class="warning">请输入6-20位密码，且同时包含数字与字母。</span>
      </div>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入你的密码"
          name="password"
          tabindex="1"
          auto-complete="on"
          @keyup.enter.native="register"
        />
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
          @keyup.enter.native="register"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="toNext"
        class="login-button"
      >注册</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Set-password",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        password: "111111"
      },
      loginRules: {
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password"
    };
  },

  methods: {
    toNext() {
      this.$router.push("/login");
    },
    back() {
      this.$router.go(-1);
    },
    register() {
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
  justify-content: space-evenly;

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
    margin-right: 100px;
    border: 1px solid #e4e5e7;
    border-radius: 7px;
    font-family: PingFangSC-Regular, PingFang SC;

    .back {
      display: flex;
      margin: 31px 0 0 28px;
      img {
        width: 21px;
        height: 21px;
        margin-right: 12px;
      }
      span {
        color: $s-color;
        font-size: $i-fs;
      }
    }

    .title-container {
      width: 425px;
      display: flex;
      flex-wrap: wrap;
      margin: 51px 0 64px 29px;

      .title {
        color: $h-color;
        font-size: $h-fs;
        margin-bottom: 20px;
      }
      .warning {
        color: $s-color;
        font-size: $s-fs;
      }
    }

    .login-button {
      width: 430px !important;
      height: 60px;
      font-size: $i-fs;
      margin-top: 183px;
    }
  }
}
@media screen and (max-width: 1440px) {
  .login-img {
    display: none;
  }
}
@media screen and (max-width: 1000px) {
}
@media screen and (max-height: 720px) {
  .login-img {
    display: none;
  }
}
</style>
