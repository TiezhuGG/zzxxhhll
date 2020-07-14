<template>
  <div class="password-container">
    <el-form
      ref="passwordForm"
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
      >{{ this.find_password ? '确定' : '注册'}}</el-button>
    </el-form>
  </div>
</template>

<script>
import Back from "../components/Back";
import { register, findPassword } from "@/api/user";
import { Message } from "element-ui";

export default {
  name: "SetPassword",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (value.length < 8) {
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
      passwordType: "password",
      find_password: false
    };
  },
  created() {
    this.find_password = this.$route.query.find_password;
  },
  methods: {
    next() {
      const password = this.passwordForm.password;
      const confirmPassword = this.passwordForm.confirmPassword;
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          if (password === confirmPassword) {
            this.loading = true;
            this.$store.commit("user/setPassword", {
              password: password
            });
            let userInfo = this.$store.state.user.info;
            if (this.find_password) { // 重置密码
              findPassword({
                mobile: userInfo.mobile.mobile,
                password: userInfo.password.password,
                password_confirmation: userInfo.password.password
              })
                .then(() => {
                  this.loading = false;
                  this.$router.push("/user/login");
                })
                .catch(() => {
                  this.loading = false;
                });
            } else {
              register({  // 注册
                mobile: userInfo.mobile.mobile,
                password: userInfo.password.password,
                password_confirmation: userInfo.password.password,
                code: userInfo.code.code
              })
                .then(() => {
                  this.loading = false;
                  // this.$router.push("/user/login");
                  this.$router.push("/user/enterprise");
                })
                .catch(() => {
                  this.loading = false;
                });
            }
          } else {
            this.loading = false;
            Message({
              message: "两次输入的密码不一致",
              type: "error",
              duration: 5000
            });
          }
        }
      });
    }
  },
  components: {
    Back
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/user.scss';
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
      margin-top: 157px;
    }
  }
}
</style>
