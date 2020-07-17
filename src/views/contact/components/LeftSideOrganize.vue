<template>
  <div class="left-side-organize">
    <Search />
    <AddMember />
    <div class="nav">
      <svg-icon class="svg" icon-class="no-contact" @click="switchMember" />
      <svg-icon class="svg" icon-class="organization" @click="switchOrganize" />
    </div>
    <div class="organization">
      <div
        class="tab"
        v-for="(item, index) in departments"
        :key="index"
        :class="currentIndex === index ? 'border-color' : ''"
        @click="focus(index)"
      >
        <svg-icon class="svg" :icon-class="currentIndex === index ? 'left-tab' : 'left-tab-un'" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AddMember from "./AddMember";
import Search from "./Search";
import { getDeparments } from "@/api/user";

export default {
  name: "LeftSideOrganize",
  data() {
    return {
      // departments: ["按组织架构选择", "技术部"],
      departments: [],
      currentIndex: 0,
      departmentName: '',
      company_id: localStorage.getItem('company_id')
    };
  },
  created() {
    this.getDeparments();
  },
  methods: {
    focus(index) {
      this.currentIndex = index;
      this.departmentName = this.departments[index].name
      localStorage.setItem('departmentName', this.departmentName)
      this.$emit("currentIndex", { currentIndex: this.currentIndex });
    },
    switchMember() {
      this.$emit("memberTab", {
        memberTab: true,
        organizeTab: false,
        currentIndex: 3
      });
    },
    switchOrganize() {
      this.$emit("organizeTab", { organizeTab: true, memberTab: false });
    },
    // 获取一级部门列表
    async getDeparments() {
      // const res = await getDeparments({ company_id: this.company_id });
      const res = await getDeparments({ company_id: 6 }); // test
      this.departments = res.data
      this.departmentName = this.departments[0].name
      localStorage.setItem('departmentName', this.departmentName)
    }
  },
  components: {
    AddMember,
    Search
  }
};
</script>

<style lang="scss" scoped>
.left-side-organize {
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

  .organization {
    width: 100%;
    margin-top: 19px;
    .tab {
      height: 67px;
      line-height: 67px;
      padding-left: 25px;
    }
    .svg {
      font-size: 16px;
      margin-right: 20px;
    }
    span {
      font-size: 19px;
      color: #303133;
    }
  }
}

.border-color {
  border-left: 4px solid #409eff;
  background-color: #F2F6FC;
}
</style>