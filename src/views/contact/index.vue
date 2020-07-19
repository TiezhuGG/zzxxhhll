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
          :changeId="changeId"
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
      <RightMemberDetail @infoChanged="changed" :memberId="memberId" v-show="index===3" />
    </el-container>
  </div>
</template>

<script>
import LeftSideOrganize from "./components/LeftSideOrganize";
import LeftSideMember from "./components/LeftSideMember";
import RightOrganize from "./components/RightOrganize";
import RightDepartment from "./components/RightDepartment";
import RightMemberDetail from "./components/RightMemberDetail";

export default {
  data() {
    return {
      index: 3,
      member: true,
      organize: false,
      memberId: "",
      changeId: null
    };
  },
  methods: {
    // 提醒更新联系人列表
    changed(data) {
      console.log(data)
      this.changeId = data.changed
    },
    // 获取成员详细信息
    getMemberDetail(data) {
      console.log(data)
      this.memberId = data.member;
    },
    getNewMember(data) {
      this.index = data.currentIndex;
    },
    getIndex(data) {
      this.index = data.currentIndex;
    },
    // 切换到成员列表
    switchToMember(data) {
      if (data.currentIndex === 3) {
        this.index = data.currentIndex;
      }
      this.member = data.memberTab;
      this.organize = data.organizeTab;
    },
    // 切换到组织架构
    switchToOrganize(data) {
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