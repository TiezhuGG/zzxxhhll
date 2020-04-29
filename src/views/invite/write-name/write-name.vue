<template>
  <div class="write-name-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">请填写您的姓名</h3>
        <span class="warning">参与聊天及协作的各方都能看到彼此的姓名</span>
      </div>

      <el-form-item prop="username">
        <div>
          <el-input
            placeholder="请输入你的姓名"
            ref="username"
            v-model="loginForm.username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
            class="input-with-select"
          ></el-input>
        </div>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="$router.push('/application')"
        class="login-button"
      >加入团队</el-button>
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
      name: "王力宏",
      compony: "厦门触享网络科技有限公司",
      loginForm: {
        username: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ]
      },
      loading: false,
      select: "",
      checked: true
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
              this.$router.push({ path: "/verify-code" });
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
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.write-name-container {
  .el-input__inner {
    height: 60px;
  }

  .el-form-item__content {
    width: 430px;
  }
}
</style>

<style lang="scss" scoped>
.write-name-container {
  width: calc(100% - 827px);
  display: flex;
  justify-content: center;

  .login-form {
    .login-button {
      margin-top: 271px;
    }
  }
}
</style>
