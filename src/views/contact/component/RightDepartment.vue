<template>
  <div class="right-main">
    <el-container>
      <el-header style="text-align: left; font-size: 24px; color: #303133">组织架构</el-header>
      <el-header style="text-align: left; font-size: 27px; color: #303133">
        <img class="logo" src="../../../assets/imgs/test.jpg" />
        <span>触享网络科技有限公司</span>
      </el-header>
      <el-main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">触享网络科技有限公司</el-breadcrumb-item>
          <el-breadcrumb-item>技术部</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="item" v-for="(employee, index) in employees" :key="index">
          <img class="logo" src="../../../assets/imgs/test.jpg" />
          <div class="employee-info">
            <span class="name">{{ employee.name }}</span>
            <span class="position">{{ employee.position }}</span>
          </div>
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
          avatar: "../../../assets/imgs/test.jpg"
        },
        {
          name: "貂蝉",
          position: "后端",
          avatar: "../../../assets/imgs/test.jpg"
        },
        {
          name: "王昭君",
          position: "前端",
          avatar: "../../../assets/imgs/test.jpg"
        },
        {
          name: "西施",
          position: "全栈",
          avatar: "../../../assets/imgs/test.jpg"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.right-main {
  width: 100%;
  .el-container {
    background-color: #fff;

    .el-header {
      height: 80px !important;
      color: #303133;
      line-height: 80px;
      border-bottom: 1px solid rgb(241, 241, 241);

      &:nth-child(2) {
        margin-bottom: 39px;
      }
    }

    .logo {
      width: 53px;
      height: 53px;
      margin-right: 20px;
      border-radius: 50%;
    }

    .el-main {
      .item {
        display: flex;
        margin-bottom: 27px;

        &:nth-child(2) {
          margin-top: 40px;
        }

        .employee-info {
          height: 53px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .name {
            color: #303133;
            font-size: 19px;
          }

          .position {
            color: #909399;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>