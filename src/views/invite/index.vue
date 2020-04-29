<template>
  <div class="invite-member">
    <div class="background">
      <img class="index-img" src="../../assets/imgs/team-bg.png" />
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "InviteMember",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "../../styles/user.scss";

.invite-member {
  display: flex;

  .background {
    width: 827px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #409eff;
    .index-img {
      width: 572px;
      height: 401px;
    }
  }
}
</style>