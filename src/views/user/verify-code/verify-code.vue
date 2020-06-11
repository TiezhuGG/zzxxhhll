<template>
  <div class="code-container">
    <el-form
      ref="loginForm"
      :model="codeForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <Back />
      <div class="title-container">
        <h3 class="title">验证手机号</h3>
        <p class="warning">
          <span>请输入发送至 +86 {{ user.info.mobile }} 的 6 位验证码，有效</span>
          <span>期十分钟。如未收到，请尝试重新获取验证码。</span>
        </p>
      </div>

      <div class="code">
        <el-form-item>
          <el-input
            v-for="(code, index) in codeForm.codes"
            :key="index"
            v-model="code.value"
            name="code"
            maxlength="1"
            type="number"
            autofocus="true"
            class="code-input"
          ></el-input>
        </el-form-item>
        <span v-if="showWarn">{{ message }}</span>
      </div>

      <div class="bottom-section">
        <span class="prompt" v-if="!showTimer">{{ countDownTimer }} {{ promptMessage }}</span>

        <el-button
          :loading="loading"
          type="primary"
          @click.native.prevent="next"
          class="login-button"
        >下一步</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { validNumber } from "@/utils/validate";
import { getVerifyCode } from '@/api/user'
import Back from "../components/Back";

export default {
  name: "VerifyCode",
  data() {
    const validateNumber = (rule, value, callback) => {
      if (!validNumber(value)) {
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      codeForm: {
        codes: [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ]
      },
      message: "请输入正确的验证码",
      showWarn: false,
      showTimer: false,
      loading: false,
      countDownTimer: null,
      promptMessage: "秒后可重新获取验证码"
    };
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    this.countDown();
  },
  methods: {
    // 获取验证码
    getCode(){
      getVerifyCode()
    }, 
    next() {
      for (let item of this.codeForm.codes) {
        if (!item.value) {
          this.showWarn = true;
        } else {
          this.showWarn = false;
        }
      }
      console.log(this.codeForm.codes);
    },
    countDown() {
      this.countDownTimer = 60;
      setInterval(() => {
        if (this.countDownTimer > 0) {
          this.countDownTimer = this.countDownTimer - 1;
          console.log(this.countDownTimer);
          if (this.countDownTimer == 0) {
            this.countDownTimer = "";
            this.promptMessage = "请重新获取验证码";
          }
        }
      }, 1000);
    }
  },
  components: {
    Back
  }
};
</script>

<style lang="scss">
.code-container {
  .el-input__inner {
    height: 59px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .el-form-item__content {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>


<style lang="scss" scoped>
$h-color: #333;
$s-color: #999;
$h-fs: 27px;
$s-fs: 17px;
$i-fs: 19px;

.code-container {
  .login-form {
    .code {
      text-align: center;
      .code-input {
        width: 59px;
        height: 59px;
      }
      span {
        display: inline-block;
        color: red;
        margin-bottom: 30px;
      }
    }

    .title-container {
      width: 425px;
      display: flex;
      flex-wrap: wrap;
      margin: 37px 0 64px 29px;

      .title {
        color: $h-color;
        font-size: $h-fs;
        margin-bottom: 20px;
      }
      .warning {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        line-height: 25px;
        color: $s-color;
        font-size: $s-fs;
      }
    }

    .bottom-section {
      height: 310px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .prompt {
        color: $s-color;
        font-size: $s-fs;
      }
      .login-button {
        width: 430px !important;
        height: 60px;
        font-size: $i-fs;
      }
    }
  }
}
@media screen and(max-width: 1150px) {
  .title {
    display: none;
  }
}
</style>
