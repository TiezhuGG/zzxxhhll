<template>
  <div class="member-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          {{ name }}
          <span>邀请您加入</span>
        </h3>
        <span class="warning">{{ compony }}</span>
      </div>

      <el-form-item prop="username">
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
              <!-- <el-option label="2222" value="2"></el-option>
              <el-option label="3333" value="3"></el-option>
              <el-option label="4444" value="4"></el-option>-->
            </el-select>
          </el-input>
        </div>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="$router.push('verify-code')"
        class="login-button"
      >获取验证码</el-button>
      <div class="txt">
        <span>点击验证码代表您已经阅读并同意</span>
        <span style="color:#409EFF">服务协议</span>
        <span>与</span>
        <span style="color:#409EFF">隐私政策</span>
      </div>
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
.member-container {
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
}
</style>

<style lang="scss" scoped>
$h-color: #333;
$s-color: #999;
$h-fs: 27px;
$s-fs: 17px;
$i-fs: 19px;

.member-container {
  width: calc(100% - 827px);
  display: flex;
  justify-content: center;

  .login-form {
    text-align: center;
    padding-left: 0;

    .title-container {
      width: 430px;
      display: flex;
      flex-wrap: wrap;
      margin-left: 30px;

      .title {
        color: $h-color;
        font-size: $s-fs;
        margin-bottom: 20px;

        span {
          color: #666;
          font-weight: 500;
        }
      }
      .warning {
        color: $h-color;
        font-size: $h-fs;
      }
    }

    .login-button {
      margin-top: 244px;
      margin-bottom: 21px;
    }

    .txt {
      font-size: 16px;
      color: $s-color;
    }
  }
}
</style>
