<template>
  <div :style="'width:' + width"></div>
</template>

<script>
export default {
  name: 'dataSpace',
  props: {
    width: {
      type: String,
      default: '50%'
    },
    // item: {
    //   type: Object,
    //   default() {
    //     return {}
    //   }
    // }
  },
  data() {
    return {
      item: []
    }
  }
}
</script>

<style scoped>

</style>
