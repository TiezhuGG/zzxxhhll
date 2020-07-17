<template>
  <div class="left-side-member">
    <Search />
    <AddMember />
    <div class="nav">
      <svg-icon class="svg" icon-class="contact" @click="switchMember" />
      <svg-icon class="svg" icon-class="no-organization" @click="switchOrganize" />
    </div>

    <div class="member" v-for="(item, index) in memberList" :key="index" :class="memberIndex === index ? 'border-color' : ''">
      <span class="letter">{{ item.letter }}</span>
      <div
        class="member-item"
        v-for="(member, mIndex) in item.list"
        :key="mIndex"
        @click="choiceMember(member)"
      >
        <img class="logo" src="../../../assets/imgs/test.jpg" />
        <span>{{ member.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AddMember from "./AddMember";
import Search from "./Search";
import { getMemberList } from '@/api/user';

export default {
  name: "LeftSideMember",
  data() {
    return {
      memberList: [
        {
          letter: "B",
          list: [
            {
              name: "白",
              avatar: ""
            },
            {
              name: "拜拜",
              avatar: ""
            }
          ]
        },
        {
          letter: "C",
          list: [
            {
              name: "菜",
              avatar: ""
            }
          ]
        },
        {
          letter: "L",
          list: [
            {
              name: "林一",
              avatar: ""
            },
            {
              name: "林二",
              avatar: ""
            },
            {
              name: "林三",
              avatar: ""
            },
            {
              name: "林四",
              avatar: ""
            },
            {
              name: "林五",
              avatar: ""
            }
          ]
        }
      ],
      currentIndex: null,
      memberIndex: null
    };
  },
  created() {
    this.getMemberList()
  },
  methods: {
    choiceMember(member) {
      // 测试用
      if (member.name === "白") {
        this.memberIndex = 3;
        this.$emit("memberDetail", { member: this.memberIndex });
      }
    },
    switchMember() {
      this.$emit("memberTab", { memberTab: true, organizeTab: false });
    },
    switchOrganize() {
      this.$emit("organizeTab", {
        organizeTab: true,
        memberTab: false,
        currentIndex: 0
      });
    },
    async getMemberList() {
      const res = await getMemberList(42)
    },
  },
  components: {
    AddMember,
    Search
  }
};
</script>

<style lang="scss" scoped>
.left-side-member {
  width: 389px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .nav {
    width: 100%;
    display: flex;
    margin-top: 37px;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(241, 241, 241);
    .svg {
      flex: 1;
      font-size: 31px;
    }
  }

  .member {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 21px;

    .letter {
      color: #909399;
      font-size: 24px;
      padding-bottom: 16px;
      margin-bottom: 21px;
      border-bottom: 1px solid #ebeef5;
    }

    .member-item {
      margin-bottom: 27px;
      font-size: 19px;
    }
  }
}

.logo {
  width: 53px;
  height: 53px;
  margin-right: 20px;
  border-radius: 50%;
}
.border-color {
  border-left: 4px solid #409eff;
  background-color: #F2F6FC;
}
</style>