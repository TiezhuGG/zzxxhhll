<template>
  <div class="code-container">
    <el-form :model="codeForm" class="login-form" auto-complete="on" label-position="left">
      <Back />
      <div class="title-container">
        <h3 class="title">验证手机号</h3>
        <p class="warning">
          <span>请输入发送至 +86 {{ mobile }} 的 6 位验证码，有效</span>
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
        <el-button
          :loading="loading"
          type="primary"
          @click.native.prevent="next"
          class="login-button"
        >{{ jump_type === 1 ? '加入团队' : '下一步'}}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validNumber } from "@/utils/validate";
import { getInviteCode, joinCompany } from "@/api/user";
import { Message } from "element-ui";
import Back from "@/views/user/components/Back";

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
      loading: false,
      message: "请输入正确的验证码",
      promptMessage: "秒后可重新获取验证码",
      showTimer: false,
      interval: null, // 定时任务对象
      countDownTimer: null,
      verify_code: "",
      mobile: "",
      jump_type: null,
      company_id: "",
      admin_id: "",
      company_name: ""
    };
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
      if (from.path === "/invite/member") {
        vm.countDown();
      }
    });
  },
  created() {
    console.log("$route", this.$route);
    this.mobile = this.$route.query.mobile;
    this.jump_type = this.$route.query.jump_type;
    this.company_id = this.$route.query.company_id;
    this.admin_id = this.$route.query.admin_id;
    this.company_name = this.$route.query.company_name;
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    next() {
      // this.$router.push({path: "/invite/write-name", query: {code: this.verify_code, company_id: this.company_id}});
      if (this.verify_code.length !== 6) {
        Message({
          message: this.message,
          type: "error",
          duration: 5000
        });
      } else {
        this.loading = true;
        if (this.jump_type === 0) {
          this.$router.push({
            path: "/invite/write-name",
            query: {
              code: this.verify_code,
              company_id: this.company_id,
              mobile: this.mobile,
              company_name: this.company_name
            }
          });
        } else {
          joinCompany({ admin_id: this.admin_id, company_id: this.company_id })
            .then(() => {
              this.loading = false;
              this.$router.push({
                path: "/application",
                query: { company_name: this.company_name }
              });
            })
            .catch(() => {
              this.loading = false;
            });
        }
      }
    },
    // 重新获取验证码
    getCode() {
      this.countDown();
      getInviteCode({
        type: "invite_member",
        mobile: this.mobile,
        company_id: this.company_id
      });
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
$h-color: #333;
$s-color: #999;
$h-fs: 27px;
$s-fs: 17px;
$i-fs: 19px;

.code-container {
  width: calc(100% - 827px);
  display: flex;
  justify-content: center;
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
