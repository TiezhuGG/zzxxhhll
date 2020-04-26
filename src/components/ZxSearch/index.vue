<template>
  <div class="sear-box">
    <svg-icon icon-class="search"/>
    <input type="text" name="" id="" :placeholder="placeholder" @keyup.enter="$emit('change', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'ZxSearch',
  props: {
    placeholder: {
      type: String,
      default: '搜索应用'
    }
  }
}
</script>

<style lang="scss" scoped>
  .sear-box {
    width: 320px;
    height:43px;
    border-radius:21px;
    padding: 0 15px;
    font-size: 16px;
    float: right;
    display: flex;
    align-items: center;
    border:1px solid rgba(222,224,227,1);
  svg {
    flex-shrink: 0;
    margin-right: 8px;
  }
  input {
    flex-grow: 1;
  }
  }
</style>
