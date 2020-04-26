<template>
  <div class="apply-container">
    <div class="title">全部应用</div>
    <div class="classifys">
      <div class="classify on">全部</div>
      <div class="classify">样板部</div>
      <div class="classify">样板部</div>
    </div>
    <div class="apply-list">
      <apply-item icon="client" title="产品系统"></apply-item>
      <apply-item icon="client" title="产品系统"></apply-item>
      <apply-item icon="client" title="产品系统"></apply-item>
      <apply-item icon="client" title="产品系统"></apply-item>
      <apply-item icon="client" title="产品系统"></apply-item>
      <apply-item icon="client" title="产品系统"></apply-item>
      <apply-item icon="client" title="产品系统"></apply-item>
      <apply-item icon="client" title="产品系统"></apply-item>
      <apply-item icon="client" title="产品系统"></apply-item>
    </div>
  </div>
</template>

<script>
import ApplyItem from './apply-item'
export default {
  name: 'Apply',
  components: {
    ApplyItem
  }
}
</script>

<style lang="scss" scoped>
.apply-container {
  padding-top: 60px;
  .title {
    font-size: 24px;
    padding-bottom: 45px;
  }
  .classifys {
    padding-bottom: 30px;
    font-size: 0;
    .classify {
      position: relative;
      font-size: 19px;
      color: #999999;
      padding-bottom: 7px;
      margin-right: 56px;
      display: inline-block;
      &:not(:last-child):after {
        content: '/';
        color: #999999;
        position: absolute;
        top: 0;
        right: -32px;
      }
      &.on {
        color: #409EFF;
        &:before {
          width: 100%;
          height:3px;
          content: '';
          background-color: #409EFF;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
}
</style>
