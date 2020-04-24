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
      <div class="back" @click="back">
        <img src="../../assets/back.png" />
        <span>返回</span>
      </div>
      <div class="title-container">
        <h3 class="title">验证手机号</h3>
        <span class="warning">与你的团队成员和朋友进行交流与协作。</span>
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
              <!-- <el-option label="2222" value="2"></el-option>
              <el-option label="3333" value="3"></el-option>
              <el-option label="4444" value="4"></el-option>-->
            </el-select>
          </el-input>
        </div>
      </el-form-item>

      <el-checkbox v-model="checked">
        <span>我已阅读并同意</span>
        <span>服务协议</span>
        <span>与</span>
        <span>隐私政策</span>
      </el-checkbox>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="register"
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
      select: "",
      checked: true
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    register() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log('valid',this.loginForm)
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
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

.el-select .el-input {
  width: 1rem;
  color: #333;
}
.el-select {
  height: 0.6rem;
  line-height: 0.6rem;
}

.el-input__inner {
  height: 0.6rem;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-form-item__content {
  width: 4.3rem;
  margin: auto;
}

.el-checkbox {
  margin-top: 2rem;
  margin-bottom: 0.21rem;
  color: #999;
  font-size: 0.19rem;
}
</style>

<style lang="scss" scoped>
$h-color: #333;
$s-color: #999;
$h-fs: 0.27rem;
$s-fs: 0.17rem;
$i-fs: 0.19rem;

.login-container {
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-family: PingFangSC-Regular, PingFang SC;

  .login-img {
    width: 5.1rem;
    height: 3.4rem;
    margin-left: 1rem;
  }

  .login-form {
    width: 4.88rem;
    max-width: 100%;
    height: 6.75rem;
    text-align: center;
    border: 0.01rem solid #e4e5e7;
    border-radius: 0.07rem;

    .back {
      display: flex;
      margin: 0.31rem 0 0 0.28rem;
      img {
        width: 0.21rem;
        height: 0.21rem;
        margin-right: 0.12rem;
      }
      span {
        color: $s-color;
        font-size: $i-fs;
      }
    }

    .title-container {
      margin: 0.57rem 0 0.64rem 0;

      .title {
        color: $h-color;
        font-size: $h-fs;
        margin-right: 2.08rem;
      }
      .warning {
        color: $s-color;
        font-size: $s-fs;
        margin-right: 1.22rem;
      }
    }

    .login-button {
      width: 4.3rem !important;
      height: 0.6rem;
      font-size: $i-fs;
    }
  }
}

// @media screen and (max-width: 14.4rem) {
//   .login-img {
//     display: none;
//   }
// }
// @media screen and (max-height: 7.2rem) {
//   .login-img {
//     display: none;
//   }
// }
</style>
