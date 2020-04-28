<template>
  <div class="left-side-member">
    <Search />
    <AddMember />
    <div class="nav">
      <svg-icon class="svg" icon-class="contact" @click="switchMember" />
      <svg-icon class="svg" icon-class="organization" @click="switchOrganize" />
    </div>
    <div class="item" @click="focus">
      <svg-icon icon-class="new-member"></svg-icon>
      <span>新的联系人</span>
    </div>
    <div class="member" v-for="(item, index) in memberList" :key="index">
      <span class="letter">{{ item.letter }}</span>
      <div
        class="member-item"
        v-for="(member, memberIndex) in item.list"
        :key="memberIndex"
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
      currentIndex: 2,
      memberIndex: null
    };
  },
  methods: {
    choiceMember(member) {
      // 测试用
      if (member.name === "白") {
        this.memberIndex = 3;
        this.$emit("memberDetail", { member: this.memberIndex });
      }
    },
    focus() {
      this.$emit("currentIndex", { currentIndex: this.currentIndex });
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
    }
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
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(241, 241, 241);
    .svg {
      flex: 1;
      font-size: 31px;
    }
  }

  .item {
    width: 100%;
    height: 67px;
    display: flex;
    align-items: center;
    margin-bottom: 26px;

    svg {
      font-size: 21px;
      margin: 0 17px 0 23px;
    }

    span {
      font-size: 19px;
      color: #333;
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
    }
  }
}

.logo {
  width: 53px;
  height: 53px;
  margin-right: 20px;
  border-radius: 50%;
}
</style>