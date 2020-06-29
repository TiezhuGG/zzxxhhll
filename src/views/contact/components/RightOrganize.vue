<template>
  <div class="right-main">
    <el-container>
      <el-header style="text-align: left; font-size: 24px; color: #303133">组织架构</el-header>
      <el-header style="text-align: left; font-size: 27px; color: #303133">
        <img class="logo" src="../../../assets/imgs/test.jpg" />
        <span>触享网络科技有限公司</span>
      </el-header>
      <el-main>
        <div
          class="main-item"
          v-for="(item, index) in departments"
          :key="index"
          @click="showItem(index)"
        >
          <div class="item">
            <span
              class="department"
              :class="showIt&&EmployeeIndex===index?'font-color':''"
            >{{ item.name }} ({{ item.member_number }}人)</span>
            <div>
              <svg-icon :icon-class="showIt&&EmployeeIndex===index ? 'tree-icon' : 'tree-icon-un'"></svg-icon>
              <span class="sub" :class="showIt&&EmployeeIndex===index?'font-color':''">下级</span>
            </div>
          </div>
          <div
            class="item"
            v-for="(employee, indexB) in item.member_list"
            :key="indexB"
            v-show="showIt&&EmployeeIndex===index"
          >
            <!-- <img class="logo" src="../../../assets/imgs/test.jpg" /> -->
            <img class="logo" :src="employee.admins.avatar" />
            <div class="employee-info">
              <span class="name">{{ employee.admins.user_name }}</span>
              <span class="position">{{ employee.admins.post_info.name }}</span>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getDeparmentMember } from '@/api/user';

export default {
  data() {
    return {
      showIt: true,
      EmployeeIndex: null,
      // departments: [
      //   {
      //     departmentName: "技术部",
      //     employees: [
      //       {
      //         name: "杨玉环",
      //         position: "测试",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "貂蝉",
      //         position: "后端",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "王昭君",
      //         position: "前端",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "西施",
      //         position: "全栈",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       }
      //     ]
      //   },
      //   {
      //     departmentName: "业务部",
      //     employees: [
      //       {
      //         name: "杨玉环",
      //         position: "测试",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "貂蝉",
      //         position: "后端",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "王昭君",
      //         position: "前端",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "西施",
      //         position: "全栈",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "如花",
      //         position: "产品经理",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       }
      //     ]
      //   },
      //   {
      //     departmentName: "人事部",
      //     employees: [
      //       {
      //         name: "杨玉环",
      //         position: "测试",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "貂蝉",
      //         position: "后端",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "王昭君",
      //         position: "前端",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "西施",
      //         position: "全栈",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       }
      //     ]
      //   },
      //   {
      //     departmentName: "贸易部",
      //     employees: [
      //       {
      //         name: "杨玉环",
      //         position: "测试",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "貂蝉",
      //         position: "后端",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "王昭君",
      //         position: "前端",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "西施",
      //         position: "全栈",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       }
      //     ]
      //   },
      //   {
      //     departmentName: "后勤部",
      //     employees: [
      //       {
      //         name: "杨玉环",
      //         position: "测试",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "貂蝉",
      //         position: "后端",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "王昭君",
      //         position: "前端",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "西施",
      //         position: "全栈",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       }
      //     ]
      //   },
      //   {
      //     departmentName: "车间",
      //     employees: [
      //       {
      //         name: "杨玉环",
      //         position: "测试",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "貂蝉",
      //         position: "后端",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "王昭君",
      //         position: "前端",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       },
      //       {
      //         name: "西施",
      //         position: "全栈",
      //         avatar: "../../../assets/imgs/test.jpg"
      //       }
      //     ]
      //   }
      // ],
      departments: []
    };
  },
  created() {
    this.getDeparmentMember()
  },
  watch: {
    EmployeeIndex(newVal, oldVal) {
      this.showIt = true;
    }
  },
  methods: {
    showItem(index) {
      this.EmployeeIndex = index;
      if (this.EmployeeIndex === index) {
        this.showIt = !this.showIt;
      }
    },

    // 获取子集部门列表含成员
    async getDeparmentMember() {
      const res = await getDeparmentMember({ department_id : 1 })
      this.departments = res.data
      console.log('获取子集部门列表含成员', res) 
    }
  }
};
</script>

<style lang="scss" scoped>
.right-main {
  width: 100%;
  .el-container {
    background-color: #fff;
    height: 95vh;

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
      margin-left: 12px;

      .main-item {
        margin-bottom: 53px;

        .item {
          display: flex;
          font-size: 19px;
          margin-bottom: 27px;

          &:nth-child(1) {
            width: 200px;
            display: flex;
            justify-content: space-between;
          }

          &:nth-child(2) {
            margin-top: 40px;
          }

          .department {
            display: inline-block;
            color: #333;
          }

          svg {
            margin-right: 3px;
          }

          .sub {
            color: #c0c4cc;
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
}

.font-color {
  color: #409eff !important;
}
</style>