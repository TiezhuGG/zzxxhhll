<template>
  <div class="password-container">
    <el-form
      ref="loginForm"
      :model="passwordForm"
      :rules="passwordRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <Back />
      <div class="title-container">
        <h3 class="title">设置密码</h3>
        <span class="warning">请输入8-20位密码，且同时包含数字与字母。</span>
      </div>

      <el-form-item prop="password">
        <el-input
          key="password"
          ref="password"
          v-model="passwordForm.password"
          :type="passwordType"
          placeholder="请输入你的密码"
          name="password"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="confirmPassword">
        <el-input
          key="confirmPassword"
          ref="confirmPassword"
          v-model="passwordForm.confirmPassword"
          :type="passwordType"
          placeholder="请重新输入你的密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="next"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="next"
        class="login-button"
      >注册</el-button>
    </el-form>
  </div>
</template>

<script>
import Back from "../components/Back";
import { register } from "@/api/user";
import { Message } from 'element-ui'

export default {
  name: "SetPassword",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error("密码不能少于8位"));
      } else if (value.length > 20) {
        callback(new Error("密码不能大于20位"));
      } else {
        callback();
      }
    };
    return {
      passwordForm: {
        password: "",
        confirmPassword: ""
      },
      passwordRules: {
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        confirmPassword: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password"
    };
  },
  methods: {
    next() {
      const password = this.passwordForm.password
      const confirmPassword = this.passwordForm.confirmPassword
      if(password && confirmPassword && password.length > 7 && password.length < 21) {
        if(password === confirmPassword) {
          console.log('password', this.passwordForm.password, 'confirmPassword',this.passwordForm.confirmPassword)
          this.loading = true
          // 保存密码到vuex
          this.$store.commit("user/setPassword", {
            password: this.passwordForm.password,
          })
          let userInfo = this.$store.state.user.info;
          register({
            mobile: userInfo.mobile.mobile,
            password: userInfo.password.password,
            password_confirmation: userInfo.password.password,
            code: userInfo.code.code,
          }).then(() => {
            this.loading = false;
            this.$router.push('/user/login')
          }).catch(() => {
            this.loading = false;
          })
        } else {
          this.loading = false
          Message({
            message: '两次输入的密码不一致',
            type: 'error',
            duration: 5000
          })
        }
      } else {
        this.loading = false
        Message({
          message: '请输入正确的密码',
          type: 'error',
          duration: 5000
        })
      }
    },
  },
  components: {
    Back
  }
};
</script>

<style lang="scss">
.password-container {
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

.password-container {
  .login-form {
    text-align: center;

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
      margin-top: 183px;
    }
  }
}
</style>
