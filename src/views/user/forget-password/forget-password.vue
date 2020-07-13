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
          通过您的手机号充值密码，或
          <router-link to="/user/forget-password-email" class="text-color">邮箱重置密码</router-link>
        </span>
      </div>

      <el-form-item class="first" prop="mobile">
        <el-input placeholder="请输入你的手机号" type="number" v-model="formData.mobile">
          <el-select v-model="value" slot="prepend">
            <el-option label="+86" value="1" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-button :loading="loading" type="primary" class="button" @click="next">下一步</el-button>
    </el-form>
  </div>
</template>

<script>
import { getVerifyCode } from "@/api/user";
import { validMobile } from "@/utils/validate";
import Back from "../components/Back";

export default {
  name: "Forget-password",
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      value: "1",
      formData: {
        mobile: ""
      },
      formRules: {
        mobile: [{ required: true, trigger: "blur", validator: validateMobile }]
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
            mobile: this.formData.mobile
          });
          getVerifyCode({ type: "find_password", mobile: this.formData.mobile })
            .then(() => {
              this.loading = false;
              this.$router.push({path: "/user/verify-code", query: { find_password: true }});
            })
            .catch(() => {
              this.loading = false;
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
@import '@/styles/user.scss';
@media screen and (max-width: 1150px) {
  .forget-container {
    justify-content: center;
  }
}
.first {
  margin-top: 40px;
}
.button {
  width: 430px;
  height: 60px;
  margin-top: 290px !important;
  margin-left: 30px;
  font-size: 19px;
}
.title-container {
  margin: 37px 0 0 29px;
}
.text-color {
  color: #409eff;
}
// 处理input type = number的上下箭头
>>> input::-webkit-outer-spin-button,
>>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
>>> input[type="number"] {
  -moz-appearance: textfield;
}
>>> .el-input-group__prepend {
  background-color: transparent;
  .el-select .el-input {
    width: 88px !important;
  }
}
>>> .el-input-group__append {
  background-color: transparent;
}
>>> .el-form-item__content {
  margin: 0;
}
>>> .el-form-item__label {
  margin-left: 30px;
}
>>> .el-form-item__content {
  margin-left: 30px;
}

</style>