<template>
  <layout>
    <el-form label-position="right" :model="formData" :rules="formRules" ref="formData">
      <el-form-item label="新手机号" prop="newMobile">
        <el-input placeholder="新手机号" type="number" v-model="formData.newMobile">
          <el-select v-model="value" slot="prepend">
            <el-option label="+86" value="1" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="短信验证码" prop="verifyCode">
        <el-input placeholder="短信验证码" type="number" v-model="formData.verifyCode">
          <el-button slot="append" @click="getCode">获取验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="设置密码" prop="password">
        <el-input type="password" v-model="formData.password" placeholder="设置密码" />
      </el-form-item>
      <div class="button">
        <el-button @click="$api.topage('TelOne')">上一步</el-button>
        <el-button type="primary" @click="confirm">确认修改</el-button>
      </div>
    </el-form>
    <contact />
  </layout>
</template>

<script>
import { Contact, Layout } from "./index";
import { mapState } from "vuex";
import { validMobile, validCode } from "@/utils/validate";
import { getVerifyCode, changeMobile } from "@/api/user";
import { Message } from "element-ui";
export default {
  name: "TelTwo",
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
        newMobile: "",
        verifyCode: "",
        password: ""
      },
      formRules: {
        newMobile: [
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
  computed: {
    ...mapState["user"]
  },
  methods: {
    // 获取验证码
    async getCode() {
      // 绑定新手机type传change
      if (this.formData.newMobile) {
        const res = await getVerifyCode({
          type: "change",
          mobile: this.formData.newMobile
        });
      } else {
        Message({
          message: "请输入正确的手机号码",
          type: "error",
          duration: 5 * 1000
        });
      }
    },

    confirm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.loading = true;
          changeMobile({
            mobile: this.formData.newMobile,
            code: this.formData.verifyCode,
            password: this.formData.password
          })
            .then(res => {
              console.log("绑定新手机成功", res);
              this.$router.push("/");
              this.loading = false;
            })
            .catch(err => {
              console.log("绑定新手机失败", err);
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

<style lang="scss">
// 处理input type = number的上下箭头
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>

<style lang="scss" scoped>
>>> .el-input-group__prepend {
  /*background-color: transparent;*/
  .el-select .el-input {
    width: 88px !important;
  }
}
</style>
