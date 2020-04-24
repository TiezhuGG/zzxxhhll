<template>
  <div class="index-container">
    <!--搜索-->
    <search/>
    <div class="index-wrap">
      <!--常用应用-->
      <common-apply/>
      <!--全部应用-->
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
