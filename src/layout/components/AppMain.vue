<template>
  <section class="app-main" :style="style">
    <transition name="fade-transform" mode="out-in">
<!--      <router-view :key="key" />-->
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    style() {
      /*50 = navbar  */
      /*95 = navbar + tagsview  */
      return {
        'min-height': 'calc(100vh - ' + (this.$route.path.includes('apps') ? 95 : 50) + 'px)'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /*50 = navbar  */
  /*95 = navbar + tagsview  */
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #F5F6F7;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
.hasTagsView {
  .app-main {
  /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
