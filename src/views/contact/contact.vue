<template>
  <el-container>
    <el-aside width="389px">
      <!-- 监听LeftSide组件的事件 -->
      <LeftSide @passIndex="getIndex" />
    </el-aside>
    <RightOrganize v-show="index===0"/>
  </el-container>
</template>

<script>
import LeftSide from "./component/LeftSide";
import RightOrganize from "./component/RightOrganize";

export default {
  data() {
    return {
      index: 0
    };
  },
  mounted() {
    console.log(this.index)
  },
  methods: {
    getIndex(data) {
      this.index = data.currentIndex
    }
  },
  components: {
    LeftSide,
    RightOrganize
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  background-color: #fff;
}

.el-aside {
  border-right: 1px solid rgb(241, 241, 241);
  color: #333;
}
</style>