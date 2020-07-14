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
          <span>请输入发送至 +86 {{ user.info.mobile.mobile }} 的 6 位验证码，有效期十分钟。如未收到，请尝试重新获取验证码。</span>
        </p>
      </div>

      <div class="code">
        <el-form-item>
          <el-input
            v-for="(code, index) in codeForm.codes"
            :key="index"
            v-model="code.value"
            name="code"
            type="number"
            autofocus="true"
            oninput="if(value.length>1)value=value.slice(0,1)"
            class="code-input"
            :tabindex="(index + 1).toString()"
            ref="inputRef"
            @keyup.native.prevent="inputFocus(index + 1)"
          ></el-input>
        </el-form-item>
      </div>

      <div class="bottom-section">
        <span class="prompt" v-if="showTimer">{{ countDownTimer }} {{ promptMessage }}</span>
        <span class="re-prompt" v-else @click="getCode">重新获取验证码</span>
        <el-button :laoding=loading type="primary" @click.native.prevent="next" class="login-button">下一步</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { validNumber } from "@/utils/validate";
import { getVerifyCode, checkCode } from "@/api/user";
import { Message } from "element-ui";
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
      interval: null, // 定时任务对象
      countDownTimer: null,
      verify_code: "",
      loading: false,
      find_password: false
    };
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    this.find_password = this.$route.query.find_password
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
      if (from.path === "/user/register" || from.path === "/user/forget-password") {
        vm.countDown();
      }
    });
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    // 下一步
    next() {
      this.loading = true
      checkCode({
        type: this.find_password ? "find_password" : "register",
        mobile: this.user.info.mobile.mobile,
        code: this.verify_code
      }).then(() => {
        this.loading = false
        this.$store.commit("user/setCode", {
          code: this.verify_code
        });
        this.$router.push({path: "/user/set-password", query: { find_password: this.find_password }});
      }).catch(() => {
        this.loading = false
      })
    },
    // 重新获取验证码
    getCode() {
      this.countDown();
      getVerifyCode({ type: this.find_password ? "find_password" : "register", mobile: this.user.info.mobile.mobile });
    },
    // 创建定时任务
    countDown() {
      this.showTimer = true;
      this.countDownTimer = 60;
      this.interval = setInterval(() => {
        if (this.countDownTimer > 1) {
          this.countDownTimer = this.countDownTimer - 1;
        } else if (this.countDownTimer == 1) {
          this.showTimer = false;
        }
      }, 1000);
    },
    inputFocus(index) {
      if (index < 6) {
        this.$refs.inputRef[index].focus();
      } else {
        this.$refs.inputRef[5].blur();
      }
    }
  },
  components: {
    Back
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/user.scss';
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
      height: 300px;
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

>>> .el-form-item__content {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

@media screen and(max-width: 1150px) {
  .title {
    display: none;
  }
}
</style>
