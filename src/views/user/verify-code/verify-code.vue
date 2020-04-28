<template>
  <div class="code-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <Back />
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

      <div class="bottom-section">
        <span class="prompt">46秒后可重新获取验证码</span>

        <el-button
          :loading="loading"
          type="primary"
          @click.native.prevent="$router.push('set-password')"
          class="login-button"
        >下一步</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validRegisterUsername } from "@/utils/validate";
import Back from "../components/Back";

export default {
  name: "VerifyCode",
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
  },
  components: {
    Back
  }
};
</script>

<style lang="scss">
.code-container {
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
}
</style>

<style lang="scss" scoped>
$h-color: #333;
$s-color: #999;
$h-fs: 27px;
$s-fs: 17px;
$i-fs: 19px;

.code-container {
  .login-form {
    .code {
      .code-input {
        width: 59px;
        height: 59px;
      }
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

    .bottom-section {
      height: 310px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .prompt {
        color: $s-color;
        font-size: $s-fs;
      }
      .login-button {
        width: 430px !important;
        height: 60px;
        font-size: $i-fs;
      }
    }
  }
}
@media screen and(max-width: 1150px) {
  .title {
    display: none;
  }
}
</style>
