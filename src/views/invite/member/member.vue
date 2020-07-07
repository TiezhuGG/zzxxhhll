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
        <div class="warning">{{ company_name }}</div>
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
        @click.native.prevent="getInviteCode"
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
import { inviteInfo, getInviteCode } from "@/api/user";

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
      formData: {
        mobile: ""
      },
      rules: {
        mobile: [{ required: true, trigger: "blur", validator: validateMobile }]
      },
      loading: false,
      select: "",
      checked: true,
      inviterId: "",
      name: "",
      company_name: "",
      company_id: "",
      admin_id: ""
    };
  },
  created() {
    this.getInviterId();
  },
  methods: {
    async fetchInviteInfo() {
      const res = await inviteInfo(this.inviterId);
      if (res.status_code === 200) {
        this.name = res.data.admin_info.real_name
        this.company_name = res.data.company_info.company_name;
        this.company_id = res.data.company_info.id;
      }
    },

    getInviteCode() {
      this.$refs.formData.validate(valid => {
        console.log("valid", valid);
        if (valid) {
          this.loading = true;
          getInviteCode({
            type: "invite_member",
            mobile: this.formData.mobile,
            company_id: this.company_id
          })
            .then(res => {
              this.loading = false;
              const jump_type = res.data.jump_type;
              if (res.data.info) {
                this.admin_id = res.data.info.id;
                this.$router.push({
                  path: "/invite/verify-code",
                  query: {
                    mobile: this.formData.mobile,
                    jump_type: jump_type,
                    company_id: this.company_id,
                    admin_id: this.admin_id,
                    company_name: this.company_name
                  }
                });
              } else {
                this.$router.push({
                  path: "/invite/verify-code",
                  query: {
                    mobile: this.formData.mobile,
                    jump_type: jump_type,
                    company_id: this.company_id,
                    company_name: this.company_name
                  }
                });
              }
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },

    getInviterId() {  // 获取邀请人id
      const href = window.location.href;
      const hrefList = href.split("/");
      this.inviterId = hrefList[hrefList.length - 1];
      this.fetchInviteInfo();
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

>>> .el-form-item__content {
  margin: auto;
}
</style>
