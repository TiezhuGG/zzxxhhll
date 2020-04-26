<template>
  <div class="login-container">
    <img class="login-img" src="../../assets/imgs/login.png" />
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
        <h3 class="title">创建新企业</h3>
        <span class="warning">填写基本信息，完成创建。</span>
      </div>

      <el-form-item prop="username">
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
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请重复输入你的密码"
          name="password"
          tabindex="3"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="username">
        <el-input
          placeholder="请输入你要注册的企业名称"
          ref="username"
          v-model="loginForm.username"
          name="username"
          type="text"
          tabindex="4"
          auto-complete="on"
          class="input-with-select"
        ></el-input>
      </el-form-item>

      <el-checkbox v-model="checked">
        <span style>我已阅读并同意</span>
        <span style="color:#409EFF">《针线互联服务条款》</span>
      </el-checkbox>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="handleLogin"
        class="login-button"
      >进入针线互联</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validname = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的姓名"));
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
    const validEnterprise = (rule, value, callback) => {
      if (!validEnterpriseName(value)) {
        callback(new Error("请输入正确的企业名称"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "111111",
        // enterpriseName: "触享网络科技"
      },
      loginRules: {
        username: [{ required: true, trigger: "blur", validator: validname }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        // enterpriseName: [
        //   { required: true, trigger: "blur", validator: validEnterprise }
        // ]
      },
      loading: false,
      passwordType: "password",
      checked: false
    };
  },

  methods: {
    back() {
      this.$router.go(-1);
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
  margin-top: 10px;
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
      width: 300px;
      display: flex;
      flex-wrap: wrap;
      margin: 39px 0 51px 29px;

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
@media screen and (max-width: 1000px) {
}
@media screen and (max-height: 720px) {
  .login-img {
    display: none;
  }
}
</style>
