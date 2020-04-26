<template>
  <div class="apply-list">
    <apply-item icon="cost" name="单耗分析" />

    <apply-item icon="add" name="添加常用"/>
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
