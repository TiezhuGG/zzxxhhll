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
      <el-form-item class="first" label="手机号" prop="mobile">
        <el-input placeholder="请输入手机号" type="number" v-model="formData.mobile">
          <el-select v-model="value" slot="prepend">
            <el-option label="+86" value="1" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input type="password" v-model="formData.oldPassword" placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="formData.password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="确认密码" prop="password_confirmation">
        <el-input type="password" v-model="formData.password_confirmation" placeholder="请确认密码" @keyup.enter.native="changePassword" />
      </el-form-item>
      <el-button :loading="loading" type="primary" class="button" @click="changePassword">重置密码</el-button>
    </el-form>
  </div>
</template>

<script>
import { changePassword } from "@/api/user";
import { validMobile } from "@/utils/validate";
import { removeToken } from "@/utils/auth";
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
        mobile: "",
        oldPassword: "",
        password: "",
        password_confirmation: ""
      },
      formRules: {
        mobile: [
          { required: true, trigger: "blur", validator: validateMobile }
        ],
        oldPassword: [
          { required: true, trigger: "blur", message: "请输入旧密码" },
          { min: 8, max: 20, trigger: "blur", message: "密码长度在8-20位之间" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入新密码" },
          { min: 8, max: 20, trigger: "blur", message: "密码长度在8-20位之间" }
        ],
        password_confirmation: [
          { required: true, trigger: "blur", message: "请确认密码" },
          { min: 8, max: 20, trigger: "blur", message: "密码长度在8-20位之间" }
        ]
      },
      loading: false
    };
  },

  methods: {
    changePassword() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.loading = true;
          changePassword({
            mobile: this.formData.mobile,
            old_password: this.formData.oldPassword,
            password: this.formData.password,
            password_confirmation: this.formData.password_confirmation
          })
            .then(() => {
              removeToken();
              this.$router.push("/user/login");
              this.loading = false;
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
.forget-container {
  justify-content: center;
}
.first {
  margin-top: 40px;
}
.button {
  width: 430px;
  height: 60px;
  margin-top: 10px;
  margin-left: 30px;
  font-size: 19px;
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
>>>.el-form-item__label {
    margin-left: 30px;
}
>>>.el-form-item__content {
    margin-left: 30px;
}
</style>