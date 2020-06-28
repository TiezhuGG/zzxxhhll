<template>
  <div class="member-container">
    <el-form
      ref="formData"
      :model="formData"
      :rules="rules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          {{ name }}
          <span>邀请您加入</span>
        </h3>
        <div class="warning">{{ company }}</div>
      </div>

      <el-form-item prop="mobile">
        <div>
          <el-input
            placeholder="请输入你的手机号"
            ref="mobile"
            v-model="formData.mobile"
            name="mobile"
            tabindex="1"
            type="number"
            auto-complete="on"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="+86">
              <el-option label="+86" value="1"></el-option>
            </el-select>
          </el-input>
        </div>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="register"
        class="login-button"
      >获取验证码</el-button>
      <div class="txt">
        <span>点击获取验证码代表您已经阅读并同意</span>
        <span style="color:#409EFF">服务协议</span>
        <span>与</span>
        <span style="color:#409EFF">隐私政策</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validMobile } from "@/utils/validate";
import { inviteInfo, getVerifyCode } from "@/api/user";

export default {
  name: "Register",
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      name: "",
      company: "",
      formData: {
        mobile: ""
      },
      rules: {
        mobile: [{ required: true, trigger: "blur", validator: validateMobile }]
      },
      loading: false,
      select: "",
      checked: true
    };
  },
  created() {
    this.fetchInviteInfo();
  },
  methods: {
    async fetchInviteInfo() {
      const res = await inviteInfo(18);
      if (res.status_code === 200) {
        console.log("invite info", res);
        // this.name = res.data.admin_info.real_name
        this.name = res.data.realname;
        this.company = res.data.company_info.company_name;
      }
    },

    getVerifyCode() {
      this.$refs.formData.validate(valid => {
        console.log("valid", valid);
        if (valid) {
          this.loading = true;
          getVerifyCode({ type: "register", mobile: this.formData.mobile })
          .then(() => {
            this.loading = false;
            this.$router.push('/invite/member')
          })
          .catch(() => {
            this.loading = false;
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$h-color: #333;
$s-color: #999;
$h-fs: 27px;
$s-fs: 17px;
$i-fs: 19px;

.member-container {
  width: calc(100% - 827px);
  display: flex;
  justify-content: center;

  .login-form {
    padding-left: 0;

    .title-container {
      margin-left: 30px;

      .title {
        color: $h-color;
        font-size: $s-fs;
        margin-bottom: 20px;

        span {
          color: #666;
          font-weight: 500;
        }
      }
      .warning {
        color: $h-color;
        font-size: $h-fs;
      }
    }

    .login-button {
      margin: 244px 0 21px 30px;
    }

    .txt {
      font-size: 16px;
      color: $s-color;
      margin-left: 30px;
    }
  }
}

>>> .el-select .el-input {
  width: 100px;
  color: #333;
}
>>> .el-select {
  height: 60px;
  line-height: 60px;
}

>>> .el-input__inner {
  height: 60px;
}

>>> .input-with-select .el-input-group__prepend {
  background-color: #fff;
}

>>> .el-form-item__content {
  width: 430px;
  margin: auto;
}
</style>
