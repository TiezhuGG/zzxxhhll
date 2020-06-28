<template>
  <div class="index-container">
    <!--搜索-->
    <search />
    <div class="index-wrap">
      <!--常用应用-->
      <common-apply @add="comboBoxShow = true" />
      <!--全部应用-->
      <apply :apply-list="applyList" />
      <perfect :dialogFormVisible="dialogFormVisible" />
      <combo-box @close="comboBoxShow = false" :apply-list="applyList" :pop-show="comboBoxShow" />
    </div>
  </div>
</template>

<script>
import Search from "./components/search";
import Apply from "./components/apply";
import CommonApply from "./components/common-apply";
import Perfect from "./components/perfect";
import { getUserinfo } from "@/api/user";

export default {
  name: "Index",
  data() {
    return {
      comboBoxShow: false,
      applyList: [
        {
          url: "/apps/payroll",
          icon: "payroll",
          name: "公司工资薪资表"
        },
        {
          url: "/apps/payroll",
          icon: "client",
          name: "产品系统"
        },
        {
          url: "/apps/order",
          icon: "collect",
          name: "订单汇总"
        },
        {
          url: "/material",
          icon: "namematerial",
          name: "材料名称表"
        }
      ],
      company_id: null,
      dialogFormVisible: false
    };
  },

  created() {
    this.fetchUserInfo();
    const company_id = this.$route.query.id;
    const registerEnterprise = this.$route.query.registerEnterprise;
    if (registerEnterprise) {
      // 从创建企业页面进来会有
      this.dialogFormVisible = true;
    }

    if (company_id) {
      // 从企业列表选择企业登录会有
      this.company_id = company_id;
      localStorage.setItem("company_id", company_id);
    }
    console.log("id", this.company_id);
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
    }
  },
  components: {
    Search,
    Apply,
    CommonApply,
    Perfect
  }
};
</script>

<style lang="scss">
.index {
  &-wrap {
    padding: 51px;
  }
}
.apply-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
