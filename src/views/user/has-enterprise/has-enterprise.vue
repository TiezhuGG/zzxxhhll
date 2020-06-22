<template>
  <div class="has-enterprise-container">
    <el-form ref="loginForm" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">登录管理系统</h3>
        <span class="warning">
          以下
          <span class="number">{{ enterprise_num }}</span>
          个企业已登录,点击可直接进入
        </span>
      </div>

      <!-- 已有企业 选择企业组件 -->
      <ChoiceEnterprise :enterprise_num="enterprise_num" :enterpriseList="enterpriseList" />

      <div class="txt">
        没有你的企业?
        <router-link to="enterprise" class="other">创建企业</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import ChoiceEnterprise from "./components/ChoiceEnterprise";
import { getEnterpriseList, getUserinfo } from "@/api/user";

export default {
  name: "HasEnterprise",
  data() {
    return {
      enterprise_num: null, // 已有企业数量
      enterpriseList: [
        // 已有企业列表
        // { name: "厦门触享网络科技有限公司", svg: "analyze" },
        // { name: "大连万达集团股份有限公司", svg: "collect" },
        // { name: "杭州阿里巴巴集团股份有限公司", svg: "complement" }
      ],
      loading: false
    };
  },
  created() {
    this.fetchUserInfo();
    this.fetchEnterpriseList();

    if (this.enterpriseList.length) {
      this.enterprise_num = this.enterpriseList.length;
    }
  },
  methods: {
    // 获取用户信息
    async fetchUserInfo() {
      const uesr_id = this.$store.state.user.info.user_id.user_id;
      const res = await getUserinfo(uesr_id);
      this.$store.commit("user/setUserinfo", {
        userinfo: res.data
      });
      console.log("getUserInfo", res);
    },
    // 获取企业列表
    async fetchEnterpriseList() {
      const res = await getEnterpriseList();
      this.enterprise_num = res.data.length;
      for (let item of res.data) {
        if (item.company && item.is_allow === 1) {
          item.company.svg = "analyze";
          this.enterpriseList.push(item.company);
        }
      }
    }
  },
  components: {
    ChoiceEnterprise
  }
};
</script>

<style lang="scss" scoped>
$h-color: #333;
$s-color: #999;
$h-fs: 27px;
$s-fs: 17px;
$i-fs: 19px;

.has-enterprise-container {
  .login-form {
    position: relative;
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
          color: #409eff;
          font-size: 17px;
        }
      }
    }

    .txt {
      position: absolute;
      bottom: 4%;
      text-align: center;
      margin-right: 30px;
      color: #999;
      font-size: 19px;

      .other {
        margin-left: 5px;
        color: #409eff;
      }
    }
  }
}
</style>
