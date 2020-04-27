<template>
  <div class="index-container">
    <!--搜索-->
    <search/>
    <div class="index-wrap">
      <!--常用应用-->
      <common-apply/>
      <!--全部应用-->
      <apply :apply-list="applyList"/>
      <perfect/>
      <combo-box :apply-list="applyList" :pop-show="false"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from './components/search'
import Apply from './components/apply'
import CommonApply from './components/common-apply'
import Perfect from './components/perfect'
export default {
  name: 'Index',
  data() {
    return {
      applyList: [{
        url: '/apps/payroll',
        icon: 'payroll',
        name: '公司工资薪资表'
      }, {
        url: '/apps/payroll',
        icon: 'client',
        name: '产品系统'
      }]
    }
  },
  components: {
    Search,
    Apply,
    CommonApply,
    Perfect
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
