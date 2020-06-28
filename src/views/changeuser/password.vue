<template>
  <layout>
    <el-form label-position="right" :model="formData" :rules="formRules" ref="formData">
      <el-form-item label="手机号" prop="mobile">
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
        <el-input type="password" v-model="formData.password_confirmation" placeholder="请确认密码" />
      </el-form-item>
      <div class="button">
        <el-button :loading=loading type="primary" @click="changePassword">提交</el-button>
      </div>
    </el-form>
    <contact />
  </layout>
</template>

<script>
import { Contact, Layout } from "./index";
import { changePassword } from "@/api/user";
import { validMobile } from "@/utils/validate";
import { removeToken } from "@/utils/auth";

export default {
  name: "Index",
  components: {
    Layout,
    Contact
  },
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
          }).then(() => {
            this.$router.push("/user/login");
            this.loading = false;
            removeToken()
          }).catch(() => {
            this.loading = false;
          });
        }
      });
    }
  }
};
</script>

