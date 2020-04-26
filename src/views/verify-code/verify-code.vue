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
        <h3 class="title">验证手机号</h3>
        <p class="warning">
          <span>请输入发送至 +86 13559422200 的 6 位验证码，有效</span>
          <span>期十分钟。如未收到，请尝试重新获取验证码。</span>
        </p>
      </div>

      <!-- <el-form-item prop="username" class="code"> -->
      <el-form-item class="code">
        <el-input
          v-for="(code, index) in codes"
          v-model="code.value"
          :key="index"
          name="code"
          maxlength="1"
          type="text"
          autofocus="true"
          class="code-input"
        ></el-input>
      </el-form-item>

      <span class="prompt">46秒后可重新获取验证码</span>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="toNext"
        class="login-button"
      >下一步</el-button>
    </el-form>
  </div>
</template>

<script>
import { validRegisterUsername } from "@/utils/validate";

export default {
  name: "Register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validRegisterUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ]
      },
      loading: false,
      codes: [
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" }
      ]
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    toNext() {
      this.$router.push("/set-password");
    },
    register() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log("valid", this.loginForm);
          this.loading = true;
          this.$store
            .dispatch("user/register", this.loginForm)
            .then(() => {
              this.$router.push({ path: "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("注册失败");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.el-input__inner {
  height: 59px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-form-item__content {
  width: 100%;
  display: flex;
  justify-content: space-around;
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
  font-family: PingFangSC-Regular, PingFang SC;

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

    .code {
      .code-input {
        width: 59px;
        height: 59px;
      }
    }

    .prompt {
      display: inline-block;
      color: $s-color;
      font-size: $s-fs;
      margin-bottom: 233px;
    }

    .title-container {
      width: 425px;
      display: flex;
      flex-wrap: wrap;
      margin: 37px 0 64px 29px;

      .title {
        color: $h-color;
        font-size: $h-fs;
        margin-bottom: 20px;
      }
      .warning {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        line-height: 25px;
        color: $s-color;
        font-size: $s-fs;
      }
    }

    .login-button {
      width: 430px !important;
      height: 60px;
      font-size: $i-fs;
    }
  }
}

@media screen and (max-width: 1440px) {
  .login-img {
    display: none;
  }
}
@media screen and (max-height: 720px) {
  .login-img {
    display: none;
  }
}
</style>
