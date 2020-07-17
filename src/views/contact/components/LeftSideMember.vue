<template>
  <div class="left-side-member">
    <Search />
    <AddMember />
    <div class="nav">
      <svg-icon class="svg" icon-class="contact" @click="switchMember" />
      <svg-icon class="svg" icon-class="no-organization" @click="switchOrganize" />
    </div>

    <div
      class="member"
      v-for="(item, index) in memberList"
      :key="index"
      :class="memberIndex === index ? 'border-color' : ''"
    >
      <span class="letter" v-if="item.list.length !== 0">{{ item.letter }}</span>
      <div
        class="member-item"
        v-for="(member, mIndex) in item.list"
        :key="mIndex"
        @click="choiceMember(member)"
      >
        <!-- <img class="logo" src="../../../assets/imgs/test.jpg" /> -->
        <img class="logo" src="../../../assets/imgs/test.jpg" v-if="member.admin.avatar" />
        <div class="logo no-avatar" v-else>{{ member.admin.real_name.substr(-2) }}</div>
        <span>{{ member.admin.real_name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AddMember from "./AddMember";
import Search from "./Search";
import { getMemberList } from "@/api/user";
import pinyin from "pinyin";

export default {
  name: "LeftSideMember",
  data() {
    return {
      letterList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      memberList: [
        { letter: "A", list: [] },
        { letter: "B", list: [] },
        { letter: "C", list: [] },
        { letter: "D", list: [] },
        { letter: "E", list: [] },
        { letter: "F", list: [] },
        { letter: "G", list: [] },
        { letter: "H", list: [] },
        { letter: "I", list: [] },
        { letter: "J", list: [] },
        { letter: "K", list: [] },
        { letter: "L", list: [] },
        { letter: "M", list: [] },
        { letter: "N", list: [] },
        { letter: "O", list: [] },
        { letter: "P", list: [] },
        { letter: "Q", list: [] },
        { letter: "R", list: [] },
        { letter: "S", list: [] },
        { letter: "T", list: [] },
        { letter: "U", list: [] },
        { letter: "V", list: [] },
        { letter: "W", list: [] },
        { letter: "X", list: [] },
        { letter: "Y", list: [] },
        { letter: "Z", list: [] }
      ],
      currentIndex: null,
      memberIndex: null
    };
  },
  created() {
    this.getMemberList();
  },
  methods: {
    choiceMember(member) {
      console.log('member', member)
      this.$emit('memberDetail', { member: member.admin_id })
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
      const res = await getMemberList(42); // test
      const list = res.data;
      list.forEach(item => {
        const first_letter = pinyin(item.admin.real_name)[0][0]
          .substr(0, 1)
          .toUpperCase();
        // console.log('pinyin',pinyin(item.admin.real_name)[0][0].substr(0,1).toUpperCase())
        for (let i = 0; i < this.memberList.length; i++) {
          if (this.memberList[i].letter === first_letter) {
            this.memberList[i].list.push(item);
          }
        }
        // console.log("memberList", this.memberList);
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
      display: flex;
      align-items: center;
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
  background-color: #f2f6fc;
}
.no-avatar {
  line-height: 53px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
}
</style>