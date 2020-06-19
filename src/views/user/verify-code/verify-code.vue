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
          <span>请输入发送至 +86 {{ user.info.mobile.mobile }} 的 6 位验证码，有效</span>
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
            onkeydown="if(this.value.length==1) return false;"
            autofocus="true"
            class="code-input"
          ></el-input>
        </el-form-item>
        <!-- <span v-if="showWarn">{{ message }}</span> -->
      </div>

      <div class="bottom-section">
        <span class="prompt" v-if="showTimer">{{ countDownTimer }} {{ promptMessage }}</span>
        <span class="re-prompt" v-else @click="getCode">重新获取验证码</span>
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
import { getVerifyCode } from "@/api/user";
import { Message } from 'element-ui'
import Back from "../components/Back";

export default {
  name: "VerifyCode",
  data() {
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
      promptMessage: "秒后可重新获取验证码",
      showTimer: false,
      loading: false,
      interval: null, // 定时任务对象
      countDownTimer: null,
      verify_code: ""
    };
  },
  computed: {
    ...mapState(["user"])
  },
  watch: {
    "codeForm.codes": {
      handler(newVal) {
        // 构造6位数验证码
        let list = [];
        newVal.forEach(item => list.push(item.value));
        this.verify_code = list.join("");
      },
      deep: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(from.path === '/user/register') {
        vm.countDown()
      }
    })
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    // 下一步
    next() {
      if (this.verify_code.length !== 6) {
        Message({
          message: this.message,
          type: 'error',
          duration: 5000
        })
      } else {
        this.loading = true;
        // 验证码长度为6时存入vuex
        this.$store.commit("user/setCode", {
          code: this.verify_code
        });
        this.$router.push("/user/set-password");
      }
    },
    // 重新获取验证码
    getCode() {
      this.countDown();
      getVerifyCode({ type: "register", mobile: this.user.info.mobile.mobile });
    },
    // 创建定时任务
    countDown() {
      this.showTimer = true
      this.countDownTimer = 60;
      this.interval = setInterval(() => {
        if (this.countDownTimer > 0) {
          this.countDownTimer = this.countDownTimer - 1;
          console.log(this.countDownTimer);
        } else if (this.countDownTimer == 0) {
            this.showTimer = false;
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
// 处理input type = number的上下箭头
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
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
</style>


<style lang="scss" scoped>
$h-color: #333;
$s-color: #999;
$h-fs: 27px;
$s-fs: 17px;
$i-fs: 19px;

.code-container {
  position: relative;
  .login-form {
    .code {
      text-align: center;
      .code-input {
        width: 59px;
        height: 59px;
      }
      span {
        position: absolute;
        top: 30%;
        left: 16%;
        color: red;
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

      .re-prompt {
        box-sizing: border-box;
        margin-right: 285px;
        padding: 15px;
        font-size: $s-fs;
        color: #fff;
        background-color: #409eff;
        border-radius: 3px;
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
