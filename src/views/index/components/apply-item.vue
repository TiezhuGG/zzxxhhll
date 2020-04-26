<template>
  <div class="apply-item">
    <svg-icon :icon-class="icon"/>
    <div>{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'ApplyItem',
  props: {
    icon: {
      type: String,
      default: 'cliect'
    },
    name: String
  }
}
</script>

<style lang="scss" scoped>
  .apply-item {
    width:269px;
    height:107px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 5px 0px rgba(0,0,0,0.05);
    border-radius:7px;
    display: flex;
    align-items: center;
    &:nth-child(n+7) {
       margin-top: 21px;
    }
    &:not(:nth-child(6n+1)) {
      margin-left: 21px;
   }
    svg {
      font-size: 53px;
      margin-left: 21px;
      margin-right: 13px;
    }
  }
</style>
