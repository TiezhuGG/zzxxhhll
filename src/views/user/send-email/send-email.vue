<template>
  <div class="send-email" v-if="success">
    <img src="@/assets/imgs/send-success.png" />
    <span class="success">邮件发送成功</span>
    <span class="info">邮件已成功发送，请登录你的邮箱查收以重置密码。</span>
  </div>
  <div class="send-email" v-else>
    <img src="@/assets/imgs/send-fail.png" />
    <span class="success">邮件发送失败</span>
    <span class="info">邮件发送失败，请重新填写正确邮箱发送。</span>
  </div>
</template>

<script>
export default {
  name: "Send-Email",
  data() {
    return {
        success: true
    };
  },
};
</script>

<style lang="scss" scoped>
.send-email {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 388px;
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
    color: #606266;
    line-height: 30px;
    margin-bottom: 40px;
  }
}
@media screen and(max-width: 800px) {
  .info {
    height: 80px;
    line-height: 30px;
  }
}
</style>