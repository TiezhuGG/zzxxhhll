<template>
  <div class="contact">
    <el-container>
      <el-aside>
        <!-- 分别监听两个组件的事件, 切换为不同组件-->
        <LeftSideMember
          @currentIndex="getNewMember"
          @memberTab="switchToMember"
          @organizeTab="switchToOrganize"
          @memberDetail="getMemberDetail"
          v-show="member"
        />
        <LeftSideOrganize
          @currentIndex="getIndex"
          @memberTab="switchToMember"
          @organizeTab="switchToOrganize"
          v-show="organize"
        />
      </el-aside>
      <RightOrganize v-show="index===0" />
      <RightDepartment v-show="index===1" />
      <RightNewMember v-show="index===2" />
      <RightMemberDetail v-show="index===3" />
    </el-container>
  </div>
</template>

<script>
import LeftSideOrganize from "./component/LeftSideOrganize";
import LeftSideMember from "./component/LeftSideMember";
import RightOrganize from "./component/RightOrganize";
import RightDepartment from "./component/RightDepartment";
import RightNewMember from "./component/RightNewMember";
import RightMemberDetail from "./component/RightMemberDetail";

export default {
  data() {
    return {
      // index: 2,
      // memberIndex: null
      member: true,
      organize: false,
      // 测试用
      index: 3
    };
  },
  mounted() {},
  methods: {
    // 获取成员详细信息
    getMemberDetail(data) {
      console.log(data);
      this.index = data.member;
    },
    getNewMember(data) {
      console.log(data);
      this.index = data.currentIndex;
    },
    getIndex(data) {
      this.index = data.currentIndex;
    },
    // 切换到成员列表
    switchToMember(data) {
      console.log(data);
      if (data.currentIndex === 2) {
        this.index = data.currentIndex;
      }
      this.member = data.memberTab;
      this.organize = data.organizeTab;
    },
    // 切换到组织架构
    switchToOrganize(data) {
      console.log(data);
      if (data.currentIndex === 0) {
        this.index = data.currentIndex;
      }
      this.organize = data.organizeTab;
      this.member = data.memberTab;
    }
  },
  components: {
    LeftSideOrganize,
    LeftSideMember,
    RightOrganize,
    RightDepartment,
    RightNewMember,
    RightMemberDetail
  }
};
</script>

<style lang="scss" scoped>
.contact {
  .el-container {
    background-color: #fff;
  }

  .el-aside {
    width: 390px!important;
    border-right: 1px solid rgb(241, 241, 241);
    color: #333;
  }
}
</style>