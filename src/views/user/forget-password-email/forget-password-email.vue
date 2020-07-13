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
        <div id="checkCode" class="code-number" @click="createCode(4)">{{ code }}</div>
        <!-- <img class="code-number" src="@/assets/imgs/test.jpg" /> -->
      </el-form-item>

      <div class="txt">看不清？点击图片再换一张</div>

      <el-button :loading="loading" type="primary" class="button" @click="next">下一步</el-button>
    </el-form>
  </div>
</template>

<script>
import { validEmail } from "@/utils/validate";
import Back from "../components/Back";
import { Message } from 'element-ui';

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
    const validateCode = (rule, value, callback) => {
      if (this.formData.code.length <= 0) {
        callback(new Error("请输入验证码"));
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
        email: [{ required: true, trigger: "blur", validator: validateEmail }],
        code: [{ required: true, trigger: "blur", validator: validateCode }],
      },
      loading: false,
      code: null
    };
  },
  mounted() {
    this.createCode(4)
  },
  methods: {
    createCode(length) {
        let code = "";
        let codeLength = parseInt(length); //验证码的长度
        let checkCode = document.getElementById("checkCode");
        // 所有候选组成验证码的字符
        let codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); 
        //循环组成验证码的字符串
        for (let i = 0; i < codeLength; i++) {
            //获取随机验证码下标
            let charNum = Math.floor(Math.random() * 62);
            code += codeChars[charNum];
        }
        if (checkCode){
            this.code = code;
        }
    },
    next() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          if(this.form.code === this.code) {
            this.loading = true;
            this.$router.push('/user/send-email')
          } else {
            Message({
              message: '验证码错误',
              type: 'error',
              duration: 5000
            })
          }
        }
      })
    },
  },
  components: {
    Back
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/user.scss';
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
  margin-top: 160px !important;
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
    margin-left: 30px;
  }
}
.code {
  width: 267px;
}
.code-number {
  width: 144px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  font-size: 30px;
  font-style: italic;
  letter-spacing: 8px;
  background-color: #f7f7f7;
  opacity: 0.7;
  border-radius: 8px;
}
.txt {
  width: 465px;
  display: flex;
  justify-content: flex-end;
  font-size: 13px;
  color: #999;
}
.warning {
  line-height: 25px;
}
</style>