<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录管理系统</h3>
        <span class="warning">未经许可，不得擅自复制和传播本程序。</span>
      </div>

      <div class="input-container">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入你的手机号"
            ref="username"
            v-model="loginForm.username"
            name="username"
            type="number"
            tabindex="1"
            auto-complete="on"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="+86" class="select">
              <el-option label="+86" value="1"></el-option>
            </el-select>
          </el-input>
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
            class="input-password"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
      </div>

      <div class="checkbox">
        <el-checkbox v-model="checked">15天内自动登录</el-checkbox>
      </div>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="handleLogin"
        class="login-button"
      >登录</el-button>

      <div class="tips">
        <p>
          <!-- <router-link to="register" class="business">注册</router-link> -->
          <span class="txt">或</span>
          <router-link to="/user/register" class="business">注册</router-link>
        </p>
        <router-link class="forget" to="/user/forget-password">忘记密码？</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validMobile } from "@/utils/validate";
import { setToken } from "@/utils/auth";
import { login, getEnterpriseList } from "@/api/user";

export default {
  name: "Login",
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error("请输入正确的密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateMobile }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      select: "",
      checked: true
    };
  },

  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    // 登录
    handleLogin() {
      const mobile = this.loginForm.username;
      const password = this.loginForm.password;

      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          login({ mobile: mobile, password: password })
            .then(res => {
              this.loading = false;
              const token = res.data.token;
              const id = res.data.id;
              const default_company = res.data.default_company;
              setToken(token); // 将token存入本地Cookie
              localStorage.setItem("user_id", id);
              this.$store.commit("user/setPassword", {
                password: password
              });
              if (default_company) {
                // 有默认企业直接登录
                localStorage.setItem("company_id", default_company.id);
                localStorage.setItem(
                  "company_name",
                  default_company.company_name
                );
                this.$router.push("/");
              } else {
                // 没有默认企业判断是否有注册过企业
                getEnterpriseList().then(response => {
                  const company_list = response.data;
                  if (company_list.length !== 0) {
                    // 选择企业登录
                    this.$router.push("has-enterprise");
                  } else {
                    // 没有注册企业直接去创建企业
                    this.$router.push("enterprise");
                  }
                });
              }
            })
            .catch(err => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/user.scss";
>>> .el-form-item__content {
  margin: 0;
}
</style>
