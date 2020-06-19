<template>
  <layout>
    <el-form label-position="right" :model="formData" :rules="formRules" ref="formData">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input type="password" v-model="formData.oldPassword" />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="formData.password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="password_confirmation">
        <el-input type="password" v-model="formData.password_confirmation" />
      </el-form-item>
      <div class="button">
        <el-button type="primary" @click="changePassword">提交</el-button>
      </div>
    </el-form>
    <contact />
  </layout>
</template>

<script>
import { Contact, Layout } from "./index";
import { getToken } from "@/utils/auth";
import { getInfo, changePassword } from "@/api/user";
import { mapState } from "vuex";
export default {
  name: "Index",
  components: {
    Layout,
    Contact
  },
  data() {
    return {
      formData: {
        oldPassword: "",
        password: "",
        password_confirmation: ""
      },
      formRules: {
        oldPassword: [
          { required: true, trigger: "blur", message: "请输入旧密码" },
          { min: 8, max: 20, trigger: "blur", message: "密码长度在8-20位之间" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入旧密码" },
          { min: 8, max: 20, trigger: "blur", message: "密码长度在8-20位之间" }
        ],
        password_confirmation: [
          { required: true, trigger: "blur", message: "请确认密码" },
          { min: 8, max: 20, trigger: "blur", message: "密码长度在8-20位之间" }
        ]
      },
      mobile: "",
      loading: false
    };
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    console.log(this.user.userinfo);
  },
  methods: {
    changePassword() {
      const mobile = this.user.userinfo.userinfo.mobile;
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.loading = true;
          changePassword({
            mobile: mobile,
            old_password: this.formData.oldPassword,
            password: this.formData.password,
            password_confirmation: this.formData.password_confirmation
          })
            .then(res => {
              console.log("change password", res);
              this.$router.push('/')
              this.loading = false;
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
