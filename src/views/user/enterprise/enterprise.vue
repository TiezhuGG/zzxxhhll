<template>
  <div class="enterprise-container">
    <el-form
      ref="enterpriseForm"
      :model="enterpriseForm"
      :rules="enterpriseRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <Back />
      <div class="title-container">
        <h3 class="title">创建新企业</h3>
        <span class="warning">填写基本信息，完成创建。</span>
      </div>

      <el-form-item prop="username">
        <el-input
          placeholder="请输入你的姓名"
          ref="username"
          v-model="enterpriseForm.username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          class="input-with-select"
        ></el-input>
      </el-form-item>

      <el-form-item prop="enterpriseName">
        <el-input
          placeholder="请输入你要注册的企业名称"
          ref="username"
          v-model="enterpriseForm.enterpriseName"
          name="username"
          type="text"
          tabindex="4"
          auto-complete="on"
          class="input-with-select"
        ></el-input>
      </el-form-item>

      <el-checkbox v-model="checked" @change="agree">
        <span style>我已阅读并同意</span>
        <span style="color:#409EFF">《针线互联服务条款》</span>
      </el-checkbox>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="register"
        class="login-button"
      >进入针线互联</el-button>
    </el-form>
  </div>
</template>

<script>
import { validName, validEnterpriseName } from "@/utils/validate";
import { Message } from "element-ui";
import Back from "../components/Back";

export default {
  name: "Enterprise",
  data() {
    const validname = (rule, value, callback) => {
      if (!validName(value)) {
        callback(new Error("请输入正确的姓名"));
      } else {
        callback();
      }
    };

    return {
      enterpriseForm: {
        username: "",
        enterpriseName: ""
      },
      enterpriseRules: {
        username: [{ required: true, trigger: "blur", validator: validname }]
      },
      loading: false,
      checked: false
    };
  },

  methods: {
    // 同意条款
    agree(e) {
      this.checked = e;
    },
    register() {
      const username = this.enterpriseForm.username;
      const enterpriseName = this.enterpriseForm.enterpriseName;
      if (username && enterpriseName) {
        if (this.checked) {
          this.loading = true;
          // 企业信息存入vuex
          this.$store.commit("user/setUsername", {
            username: username
          });
          this.$store.commit("user/setEnterpriseName", {
            enterpriseName: enterpriseName
          });

          console.log(this.$store.state.user);
        } else {
          Message({
            message: "请先阅读并同意服务条款",
            type: "error",
            duration: 5000
          });
        }
      } else {
        Message({
          message: "用户名或企业名称未输入",
          type: "error",
          duration: 5000
        });
      }
    }
  },
  components: {
    Back
  }
};
</script>

<style lang="scss">
.enterprise-container {
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

  .el-checkbox__label {
    margin-right: 160px;
  }
}
</style>

<style lang="scss" scoped>
$h-color: #333;
$s-color: #999;
$h-fs: 27px;
$s-fs: 17px;
$i-fs: 19px;

.enterprise-container {
  .login-form {
    text-align: center;

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
      margin-top: 160px;
    }
  }
}
</style>
