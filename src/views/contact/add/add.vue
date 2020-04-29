<template>
  <div class="add-new-member">
    <el-container>
      <el-header style="text-align: left; font-size: 24px; color: #303133">添加团队成员</el-header>
      <el-main>
        <div class="main-tab">
          <span>手机邀请</span>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [
        {
          name: "杨玉环",
          position: "测试",
          avatar: "../../../assets/imgs/test.jpg",
          add: false
        },
        {
          name: "貂蝉",
          position: "后端",
          avatar: "../../../assets/imgs/test.jpg",
          add: true
        },
        {
          name: "王昭君",
          position: "前端",
          avatar: "../../../assets/imgs/test.jpg",
          add: true
        },
        {
          name: "西施",
          position: "全栈",
          avatar: "../../../assets/imgs/test.jpg",
          add: false
        },
        {
          name: "如花",
          position: "产品",
          avatar: "../../../assets/imgs/test.jpg",
          add: false
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.add-new-member {
  width: 100%;
  .el-container {
    background-color: #fff;
    height: 95vh;

    .el-header {
      height: 80px !important;
      color: #303133;
      line-height: 80px;
      border-bottom: 1px solid rgb(241, 241, 241);
    }

    .el-main {
      margin-left: 12px;

      .main-tab {
        width: 1787px;
        height: 87px;
        padding: 0;
        border-bottom: 1px solid #e6e6e6;
      }
    }
  }
}
</style>