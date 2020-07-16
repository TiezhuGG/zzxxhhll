<template>
  <div class="right-main">
    <el-container>
      <el-header style="text-align: left; font-size: 24px; color: #303133">{{ departmentName }}</el-header>
      <el-header style="text-align: left; font-size: 27px; color: #303133">
        <img class="logo" src="../../../assets/imgs/test.jpg" />
        <span>{{ company_name }}</span>
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
            <img class="logo" :src="employee.admins && employee.admins.avatar ? employee.admins.avatar : '../../../assets/imgs/test.jpg'" />
            <div class="employee-info">
              <span class="name">{{ employee.admins && employee.admins.user_name ? employee.admins.user_name : ''}}</span>
              <span class="position">{{ employee.admins && employee.admins.post_info.name ? employee.admins.post_info.name : '' }}</span>
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
      departments: [],
      company_name: null,
      departmentName: null
    };
  },
  created() {
    this.company_name = localStorage.getItem('company_name', this.company_name) ? localStorage.getItem('company_name', this.company_name) : ""
    this.departmentName = localStorage.getItem('departmentName', this.departmentName) ? localStorage.getItem('departmentName', this.departmentName) : ""
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
      console.log('获取子集部门列表含成员', this.departments) 
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