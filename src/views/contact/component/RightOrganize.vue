<template>
  <div class="right-main">
    <el-container>
      <el-header style="text-align: left; font-size: 24px; color: #303133">组织架构</el-header>
      <el-header style="text-align: left; font-size: 27px; color: #303133">
        <img class="logo" src="../../../assets/imgs/test.jpg" />
        <span>触享网络科技有限公司</span>
      </el-header>
      <el-main>

      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.right-main {
  width: 100%;
  .logo {
    width: 53px;
    height: 53px;
    margin-right: 20px;
    border-radius: 50%;
  }
}
.el-container {
  background-color: #fff;
}

.el-header {
  height: 80px !important;
  color: #303133;
  line-height: 80px;
  border-bottom: 1px solid rgb(241, 241, 241);
}


</style>