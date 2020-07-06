<template>
  <div class="application">
    <img src="../../../assets/imgs/apply-success.png" />
    <span class="success">申请成功</span>
    <span class="info">
      你已完成加入 {{ company_name }} 的申请，管理员审核通过后，
      你将收到短信/邮件通知，敬请留意。
    </span>
    <!-- <el-button type="primary" @click.native.prevent="$router.push('/')">返回首页</el-button> -->
  </div>
</template>

<script>
export default {
  name: "Application",
  data() {
    return {
      company_name: ""
    }
  },
  created() {
    this.company_name = this.$route.query.company_name
  },
};
</script>

<style lang="scss" scoped>
.application {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 352px;
    height: 293px;
    margin-bottom: 61px;
  }

  .success {
    color: #333;
    font-size: 35px;
    margin-bottom: 43px;
  }

  .info {
    width: 676px;
    height: 57px;
    text-align: center;
    font-size: 21px;
    font-weight: 400;
    color: rgba(96, 98, 102, 1);
    line-height: 30px;
    margin-bottom: 40px;
  }

  .el-button {
    width: 184px;
    height: 53px;
    font-size: 19px;
    color: #fff;
  }
}
@media screen and(max-width: 800px){
    .info {
        height:80px;
        line-height: 30px;
    }
    .el-button {
        width: 80px;
        height:40px;
    }
}
</style>