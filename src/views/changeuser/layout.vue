<template>
  <div class="password-container">
    <header>{{ title }}</header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {};
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    console.log(this.$route);
  }
};
</script>

<style lang="scss" scoped>
>>> .el-form-item {
  margin: 0;
  font-size: 19px;
  display: flex;
  justify-content: center;
  &:nth-child(n + 2) {
    margin-top: 27px;
  }
  label {
    width: 150px;
    line-height: 59px;
  }
  .el-input {
    width: 429px;
    input {
      height: 59px;
    }
  }
}
>>> .button {
  display: flex;
  justify-content: center;
  padding-top: 120px;
  .el-button {
    width: 184px;
    height: 53px;
    font-size: 19px;
  }
}
.password-container {
  height: 100vh;
  background-color: #ffffff;
  header {
    width: 100%;
    line-height: 80px;
    padding: 0 32px;
    font-weight: 400;
    font-size: 24px;
    border-bottom: 1px solid #dee0e3;
  }
  main {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
