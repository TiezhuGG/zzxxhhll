<template>
  <div class="approval">
    <el-container>
      <el-aside>
        <TopLeft @focus="changeShow" />
      </el-aside>
      <RightApproval v-show="show" />
    </el-container>
  </div>
</template>

<script>
import TopLeft from "./components/TopLeft";
import RightApproval from "./components/RightApproval";
export default {
  data() {
    return {
      show: true,
    };
  },
  methods: {
      changeShow() {
          this.show = true
      }
  },
  components: {
    TopLeft,
    RightApproval
  }
};
</script>

<style lang="scss" scoped>
.approval {
  .el-container {
    background-color: #fff;
  }

  .el-aside {
    width: 390px !important;
    border-right: 1px solid rgb(241, 241, 241);
    color: #333;
  }
}
</style>