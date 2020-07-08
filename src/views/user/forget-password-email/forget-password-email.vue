<template>
  <div class="forget-container">
    <el-form
      class="login-form"
      label-position="right"
      :model="formData"
      :rules="formRules"
      ref="formData"
    >
      <Back />
      <div class="title-container">
        <h3 class="title">找回密码</h3>
        <span class="warning">
          请输入你的邮箱，我们会发送邮件给你，帮助你重置密码，或者你也可以
          <router-link to="/user/forget-password" class="text-color">手机号重置密码</router-link>
        </span>
      </div>

      <el-form-item class="email" prop="email">
        <el-input placeholder="请输入你的邮箱" type="text" v-model="formData.email"></el-input>
      </el-form-item>

      <el-form-item class="code-wrapper" prop="code">
        <el-input class="code" placeholder="请输入验证码" type="text" v-model="formData.code"></el-input>
        <img class="code-number" src="@/assets/imgs/test.jpg" />
      </el-form-item>

      <div class="txt">看不清？点击图片再换一张</div>

      <el-button :loading="loading" type="primary" class="button" @click="next">下一步</el-button>
    </el-form>
  </div>
</template>

<script>
import { validEmail } from "@/utils/validate";
import Back from "../components/Back";

export default {
  name: "Forget-password",
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    return {
      value: "1",
      formData: {
        email: "",
        code: ""
      },
      formRules: {
        email: [{ required: true, trigger: "blur", validator: validateEmail }]
      },
      loading: false
    };
  },

  methods: {
    next() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.loading = true;
          // 保存mobile到vuex
          this.$store.commit("user/setMobile", {
            mobile: this.formData.email
          });
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
@media screen and (max-width: 1150px) {
  .forget-container {
    justify-content: center;
  }
}
.email {
  margin-top: 40px;
}
.button {
  width: 430px;
  height: 60px;
  margin-top: 180px !important;
  margin-left: 30px;
  font-size: 19px;
}
.title-container {
  margin: 37px 0 0 29px;
}
.text-color {
  color: #409eff;
}
.code-wrapper {
  >>> .el-form-item__content {
    width: 460px;
    display: flex;
    justify-content: space-between;
  }
}
.code {
  width: 267px;
}

.code-number {
  width: 144px;
  height: 60px;
}

.txt {
  width: 465px;
  display: flex;
  justify-content: flex-end;
  font-size: 13px;
  color: #999;
}
</style>