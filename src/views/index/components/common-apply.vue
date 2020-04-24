<template>
  <div class="apply-list">
    <apply-item icon="cost" title="单耗分析" />
    <apply-item icon="add" title="添加常用"/>
  </div>
</template>

<script>
import ApplyItem from './apply-item'
export default {
  name: 'CommonApply',
  components: {
    ApplyItem
  }
}
</script>

<style scoped>

</style>
