<template>
  <layout>
    <el-form label-position="right" :model="formData" :rules="formRules" ref="formData">
      <el-form-item label="旧手机号" prop="oldMobile">
        <el-input placeholder="请输入旧手机号" type="number" v-model="formData.oldMobile">
          <el-select v-model="value" slot="prepend">
            <el-option label="+86" value="1" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="短信验证码" prop="verifyCode">
        <el-input placeholder="请输入短信验证码" type="number" v-model="formData.verifyCode">
          <el-button slot="append" @click="getCode">获取验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="password">
        <el-input placeholder="请输入旧密码" type="password" v-model="formData.password" />
      </el-form-item>
      <div class="button">
        <!-- <el-button type="primary" @click="$api.topage('TelTwo')">下一步</el-button> -->
        <el-button type="primary" @click="next">下一步</el-button>
      </div>
    </el-form>
    <contact />
  </layout>
</template>
            
<script>
import { Contact, Layout } from "./index";
import { validMobile, validCode } from "@/utils/validate";
import { getVerifyCode, checkAccount } from "@/api/user";
import { Message } from "element-ui";
export default {
  name: "TelOne",
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
    const validateVerifyCode = (rule, value, callback) => {
      if (!validCode(value)) {
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      value: "1",
      formData: {
        oldMobile: "",
        verifyCode: "",
        password: ""
      },
      formRules: {
        oldMobile: [
          { required: true, trigger: "blur", validator: validateMobile }
        ],
        verifyCode: [
          { required: true, trigger: "blur", validator: validateVerifyCode }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入新密码" },
          { min: 8, max: 20, trigger: "blur", message: "请输入正确的密码" }
        ]
      },
      loading: false
    };
  },

  methods: {
    // 获取验证码
    async getCode() {
      // 绑定新手机type传change
      if (this.formData.oldMobile) {
        const res = await getVerifyCode({
          type: "change",
          mobile: this.formData.oldMobile
        });
      } else {
        Message({
          message: "请输入正确的手机号码",
          type: "error",
          duration: 5 * 1000
        });
      }
    },

    next() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.loading = true;
          checkAccount({
            mobile: this.formData.oldMobile,
            code: this.formData.verifyCode,
            password: this.formData.password
          }).then(() => {
            this.$router.push("/changeuser/telTwo");
            this.loading = false;
          }).catch(() => {
            this.loading = false;
          });
        } else {
          Message({
            message: "请填写完整的资料",
            type: "error",
            duration: 5 * 1000
          });
        }
      });
    }
  }
};
</script>

