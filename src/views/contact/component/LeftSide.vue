<template>
  <div class="left-side">
    <Search />
    <AddMember />
    <div class="nav">
      <svg-icon class="svg" icon-class="contact" />
      <svg-icon class="svg" icon-class="organization" />
    </div>
    <div class="organization">
      <div class="tab" v-for="(item, index) in departments" :key="index" :class="currentIndex === index ? 'border-color' : ''" @click="focus(index)">
        <svg-icon class="svg" icon-class="left-tab" />
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AddMember from "./AddMember";
import Search from "../../index/components/search";
export default {
  name: "LeftSide",
  data() {
    return {
        departments: ['按组织架构选择', '技术部'],
        currentIndex: 0
    };
  },
  methods: {
      focus(index) {
          this.currentIndex = index
          this.$emit('passIndex',{'currentIndex': this.currentIndex})
      }
  },
  components: {
    AddMember,
    Search
  }
};
</script>

<style lang="scss">
.left-side {
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
    border-left: 4px solid #409EFF;
}
</style>