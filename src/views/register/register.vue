<template>
  <div class="login-container">
    <img class="login-img" src="../../assets/imgs/register.png" />
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
        <h3 class="title">欢迎使用管理系统</h3>
        <span class="warning">与你的团队成员和朋友进行交流与协作。</span>
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

      <el-checkbox v-model="checked">
        <span>我已阅读并同意</span>
        <span style="color:#409EFF">服务协议</span>
        <span>与</span>
        <span style="color:#409EFF">隐私政策</span>
      </el-checkbox>

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
      select: "",
      checked: true
    };
  },
  methods: {
    toNext() {
      this.$router.push('/verify-code')
    },
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

<style lang="scss" scoped>
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
  margin-top: 231px;
  margin-bottom: 21px;
  color: #999;
  font-size: 19px;
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

    .title-container {
      display: flex;
      flex-wrap: wrap;
      margin: 37px 0 65px 29px;

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
