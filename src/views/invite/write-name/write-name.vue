<template>
  <div class="write-name-container">
    <el-form
      ref="formData"
      :model="formData"
      :rules="formRule"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">请填写您的信息</h3>
        <span class="warning">参与聊天及协作的各方都能看到彼此的姓名</span>
      </div>

      <el-form-item prop="username">
        <div>
          <el-input
            placeholder="请输入你的姓名"
            ref="username"
            v-model="formData.username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
            class="input-with-select"
          ></el-input>
        </div>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          key="password"
          ref="password"
          v-model="formData.password"
          type="password"
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
          v-model="formData.confirmPassword"
          type="password"
          placeholder="请重新输入你的密码"
          name="confirmPassword"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="next"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="join"
        class="login-button"
      >加入团队</el-button>
    </el-form>
  </div>
</template>

<script>
import { validName } from "@/utils/validate";
import { Message } from "element-ui";
import { inviteRegister } from "@/api/user";

export default {
  name: "Register",
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
    const validateUsername = (rule, value, callback) => {
      if (!validName(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        username: "",
        password: "",
        confirmPassword: ""
      },
      formRule: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        confirmPassword: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      mobile: "",
      code: "",
      company_id: "",
      company_name: "",
      loading: false
    };
  },
  created() {
    this.mobile = this.$route.query.mobile;
    this.code = this.$route.query.code;
    this.company_id = this.$route.query.company_id;
    this.company_name = this.$route.query.company_name;
    console.log(
      "write-name page",
      this.mobile,
      this.code,
      this.company_id,
      this.company_name
    );
  },
  methods: {
    join() {
      const password = this.formData.password;
      const confirmPassword = this.formData.confirmPassword;
      this.$refs.formData.validate(valid => {
        if (valid) {
          if (password === confirmPassword) {
            this.loading = true;
            inviteRegister({
              mobile: this.mobile,
              password: this.formData.password,
              password_confirmation: this.formData.confirmPassword,
              real_name: this.formData.username,
              code: this.code,
              company_id: this.company_id
            })
              .then(() => {
                this.loading = false;
                this.$router.push({
                  path: "/application",
                  query: { company_name: this.company_name }
                });
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            Message({
              message: "两次输入的密码不一致",
              type: "error",
              duration: 5000
            });
          }
        } else {
          Message({
            message: "请输入正确的用户名和密码",
            type: "error",
            duration: 5000
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.write-name-container {
  width: calc(100% - 827px);
  display: flex;
  justify-content: center;

  .login-form {
    .login-button {
      margin-top: 121px;
    }
  }
}
</style>
