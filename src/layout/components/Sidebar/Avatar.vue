<template>
  <div class="sidebar-avatar-container">
    <el-avatar :size="53" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    <div class="user-setting"></div>
  </div>
</template>

<script>
export default {
  name: 'Avatar'
}
</script>

<style lang="scss" scoped>
.sidebar-avatar-container {
  padding: 24px 13px;
  position: relative;
  .user-setting {
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 13px 0px rgba(0,0,0,0.15);
    border-radius:5px;
    position: absolute;
    top: 24px;
    left: 85px;
    width: 100px;
    height: 100px;
    display: none;
  }
}
</style>
