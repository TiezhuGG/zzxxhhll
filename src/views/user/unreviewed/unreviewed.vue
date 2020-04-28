<template>
  <div class="unreviewed-container">
    <el-form ref="loginForm" class="login-form" auto-complete="on" label-position="left">
      <Back />
      <div class="wrap">
        <div class="title-container">
          <h3 class="title">你的企业</h3>
          <span class="warning">
            以下为
            <span class="number">+86 {{ your_phone }}</span>
            已加入的企业，可直接进入
          </span>
        </div>

        <!-- 已有企业 选择企业组件 -->
        <YourEnterprise :your_phone="your_phone" :enterpriseList="enterpriseList" />

        <div class="txt">
          没有你的企业?
          <span>登录其他账号</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import YourEnterprise from "./components/YourEnterprise";
import Back from "../components/Back";

export default {
  name: "HasEnterprise",
  data() {
    return {
      your_phone: 13559544444,
      enterpriseList: [
        {
          name: "厦门触享网络科技有限公司",
          avatar: "analyze",
          approval: "老板"
        }
        // {
        //   name: "大连万达集团股份有限公司",
        //   avatar: "collect",
        //   approval: "老板"
        // },
        // {
        //   name: "杭州阿里巴巴集团股份有限公司",
        //   avatar: "complement",
        //   approval: "老板"
        // }
      ],
      loading: false,
      select: "",
      checked: true
    };
  },
  methods: {},
  components: {
    YourEnterprise,
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

.unreviewed-container {
  justify-content: center;
  .login-form {
    .wrap {
      padding-left: 30px;
      margin-top: 40px;
      .title-container {
        margin-bottom: 64px;

        .title {
          color: $h-color;
          font-size: $h-fs;
          margin-bottom: 20px;
        }
        .warning {
          color: $s-color;
          font-size: $s-fs;

          .number {
            color: $h-color;
            font-size: 17px;
          }
        }
      }

      .txt {
        text-align: center;
        // margin-top: 143px;
        margin-right: 30px;
        color: $s-color;
        font-size: 19px;

        span {
          margin-left: 5px;
          color: #409eff;
        }
      }
    }
  }
}
</style>
