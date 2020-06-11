<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <!-- 返回按钮 -->
      <Back />
      <div class="title-container">
        <h3 class="title">欢迎使用管理系统</h3>
        <span class="warning">与你的团队成员和朋友进行交流与协作。</span>
      </div>

      <el-form-item prop="mobile">
        <div>
          <el-input
            placeholder="请输入你的手机号"
            ref="mobile"
            v-model="registerForm.mobile"
            name="mobile"
            type="text"
            tabindex="1"
            auto-complete="on"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="+86">
              <el-option label="+86" value="1"></el-option>
              <!-- <el-option label="2222" value="2"></el-option>
              <el-option label="3333" value="3"></el-option>
              <el-option label="4444" value="4"></el-option>-->
            </el-select>
          </el-input>
        </div>
      </el-form-item>

      <el-checkbox v-model="checked">
        <span>我已阅读并同意</span>
        <span style="color:#409EFF">服务协议</span>
        <span>与</span>
        <span style="color:#409EFF">隐私政策</span>
      </el-checkbox>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="next()"
        class="login-button"
      >下一步</el-button>
    </el-form>
  </div>
</template>

<script>
import { validMobile } from "@/utils/validate";
import Back from "../components/Back";

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
      registerForm: {
        mobile: ""
      },
      registerRules: {
        mobile: [{ required: true, trigger: "blur", validator: validateMobile }]
      },
      loading: false,
      select: "",
      checked: true
    };
  },
  methods: {
    // 下一步
    next() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          // console.log("valid", valid, this.registerForm);
          this.loading = true;
          this.$router.push({ path: "/user/verify-code" });
          // 保存mobile到vuex
          this.$store.commit("user/SET_INFO", {
            mobile: this.registerForm.mobile
          });
          // console.log(this.$store.state.user);
        }
      });
    }

    // register() {
    //   this.$refs.registerForm.validate(valid => {
    //     if (valid) {
    //       console.log("valid", this.registerForm);
    //       this.loading = true;
    //       this.$store
    //         .dispatch("user/register", this.registerForm)
    //         .then(() => {
    //           this.$router.push({ path: "/verify-code" });
    //           this.loading = false;
    //         })
    //         .catch(() => {
    //           this.loading = false;
    //         });
    //     } else {
    //       console.log("注册失败");
    //       return false;
    //     }
    //   });
    // }
  },
  components: {
    Back
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.register-container {
  .el-select .el-input {
    width: 100px;
    color: #333;
  }
  .el-select {
    height: 60px;
    line-height: 60px;
  }

  .el-input__inner {
    height: 60px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .el-form-item__content {
    width: 430px;
    margin: auto;
  }

  .el-checkbox {
    margin-top: 231px;
    margin-bottom: 21px;
    color: #999;
    font-size: 19px;
  }
}
</style>

<style lang="scss" scoped>
$h-color: #333;
$s-color: #999;
$h-fs: 27px;
$s-fs: 17px;
$i-fs: 19px;

.register-container {
  .login-form {
    text-align: center;
    .title-container {
      display: flex;
      flex-wrap: wrap;
      margin: 37px 0 65px 29px;

      .title {
        color: $h-color;
        font-size: $h-fs;
        margin-bottom: 20px;
      }
      .warning {
        color: $s-color;
        font-size: $s-fs;
      }
    }
  }
}
</style>
