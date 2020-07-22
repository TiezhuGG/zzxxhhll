<template>
  <layout>
    <el-form label-position="right" :model="formData" :rules="formRules" ref="formData">
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" type="password" v-model="formData.password">
          <el-button slot="append" @click="checkPassword">验证</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="新手机号" prop="mobile">
        <el-input placeholder="请输入新手机号" type="number" v-model="formData.mobile">
          <el-select v-model="value" slot="prepend">
            <el-option label="+86" value="1" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="短信验证码" prop="verifyCode">
        <el-input placeholder="请输入短信验证码" type="number" v-model="formData.verifyCode">
          <el-button slot="append" v-if="!showTimer" @click="getCode">获取验证码</el-button>
          <el-button slot="append" v-else>{{ countDownTimer }}s</el-button>
        </el-input>
      </el-form-item>
      <div class="button">
        <el-button type="primary" @click="confirm">确认修改</el-button>
      </div>
    </el-form>
    <contact />
  </layout>
</template>
            
<script>
import { Contact, Layout } from "./index";
import { validMobile, validCode } from "@/utils/validate";
import { getVerifyCode, checkPassword, changeMobile, checkCode } from "@/api/user";
import { removeToken } from '@/utils/auth'
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
        mobile: "",
        verifyCode: "",
        password: ""
      },
      formRules: {
        mobile: [
          { required: true, trigger: "blur", validator: validateMobile }
        ],
        verifyCode: [
          { required: true, trigger: "blur", validator: validateVerifyCode }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入密码" },
          { min: 8, max: 20, trigger: "blur", message: "请输入正确的密码" }
        ]
      },
      loading: false,
      showTimer: false,
      interval: null, // 定时任务对象
      countDownTimer: null
    };
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    // 验证密码
    checkPassword() {
      checkPassword({ password: this.formData.password }).then(() => {
        Message({
          message: "验证密码成功",
          type: "success",
          duration: 5 * 1000
        });
      })
    },
    // 获取验证码
    async getCode() {
      // 绑定新手机type传change
      if (this.formData.mobile) {
        this.countDown();
        const res = await getVerifyCode({
          type: "change",
          mobile: this.formData.mobile
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
          checkPassword({ password: this.formData.password }).then(() => {
            changeMobile({
              mobile: this.formData.mobile,
              code: this.formData.verifyCode
            }).then(() => {
              checkCode({ type:'change', mobile: this.formData.mobile, code: this.formData.verifyCode }).then(() => {
                removeToken()
                this.loading = false;
                this.$router.push("/user/login");
              })
            }).catch(() => {
              this.loading = false;
            })
          })

        } else {
          Message({
            message: "请填写完整的资料",
            type: "error",
            duration: 5 * 1000
          });
        }
      });
    },
    // 创建定时任务
    countDown() {
      this.showTimer = true;
      this.countDownTimer = 60;
      this.interval = setInterval(() => {
        if (this.countDownTimer > 1) {
          console.log(this.countDownTimer);
          this.countDownTimer = this.countDownTimer - 1;
        } else if (this.countDownTimer == 1) {
          this.showTimer = false;
        }
      }, 1000);
    }
  }
};
</script>

