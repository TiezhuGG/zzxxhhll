<template>
  <div class="right-new-member">
    <el-container>
      <el-header style="text-align: left; font-size: 24px; color: #303133">新的联系人</el-header>
      <el-main>
        <span class="notify">好友通知</span>
        <div class="member-item" v-for="(member, index) in employees" :key="index">
          <div class="item">
            <!-- <img class="logo" src="../../../assets/imgs/test.jpg" /> -->
            <div class="employee-info">
              <span class="name">{{ member.name }}</span>
              <span class="position">{{ member.position }}</span>
            </div>
          </div>
          <button class="btn" v-show="!member.add">再次添加</button>
          <button class="btn-added" v-show="member.add">已添加</button>
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
.right-new-member {
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

    .el-main {
      margin-left: 12px;

      .notify {
        display: inline-block;
        margin: 12px 0 27px 0;
      }

      .member-item {
        margin-bottom: 27px;
        display: flex;
        justify-content: space-between;

        .item {
          display: flex;

          .logo {
            width: 53px;
            height: 53px;
            margin-right: 20px;
            border-radius: 50%;
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

        .btn {
          width: 101px;
          height: 40px;
          color: #409eff;
          font-size: 19px;
          background-color: #fff;
          border: 1px solid #409eff;
          border-radius: 5px;
        }

        .btn-added {
          width: 101px;
          height: 40px;
          background-color: #fff;
          font-size: 19px;
          color: #c0c4cc;
        }
      }
    }
  }
}
</style>