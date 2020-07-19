<template>
  <div class="zx-name">
    <div class="shear-name">{{ shearName }}</div>
    <div v-if="isIcon">
      <div>{{ name }}</div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZxName',
  props: {
    name: {
      type: String,
      required: true
    },
    isIcon: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    shearName() {
      let name = this.name
      if (name.length > 2) name = name.substr(1, 2)
      return name
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.zx-name {
  color: #303133;
  display: flex;
  align-items: center;
  .shear-name {
    width:40px;
    font-size: 12px;
    overflow: hidden;
    margin-right: 10px;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    color: #FFFFFF;
    background:$blue;
    flex-shrink: 0;
  }
}
</style>
