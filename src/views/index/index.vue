<template>
  <div class="index-container">
    <search/>
    <div class="index-wrap">
      <common-apply/>
      <apply/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from './components/search'
import Apply from './components/apply'
import CommonApply from './components/common-apply'
export default {
  name: 'Index',
  components: {
    Search,
    Apply,
    CommonApply
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss">
.index {
  &-wrap {
    padding: 51px;
  }
}
.apply-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
