<template>
    <div class="steps-container steps">
      <div v-for="(item, index) of stepsList" :key="index" :class="active === index ? 'on' : ''" @click="handleStep(index, item.name)" class="steps-item">{{ item.name }}</div>
    </div>
</template>

<script>
export default {
  name: 'Steps',
  props: {
    stepActive: {
      type: Number,
      default: null
    },
    stepsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      active: this.stepActive
    }
  },
  watch: {
    stepActive(val) {
      this.active = val
    }
  },
  methods: {
    handleStep(index, name) {
      this.$emit('change', {
        index, name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.steps-container {
  color: #909399;
  height: fit-content;
  border-right: 3px solid #F3F3F3;
  position: relative;
  &:before,&:after {
    width:16px;
    height:16px;
    content: '';
    border-radius: 50%;
    box-sizing: border-box;
    background-color: #ffffff;
    border:3px solid rgba(211,215,221,1);
    position: absolute;
    right: -9px;
  }
  &:before {
    top: -9px;
  }
  &:after {
    bottom: -9px;
  }
  .steps-item {
    line-height: 70px;
    padding-right: 30px;
    position: relative;
    cursor: pointer;
    transition: all .3s;
    &:after {
      width:11px;
      height:11px;
      content: '';
      border-radius: 50%;
      box-sizing: border-box;
      background:rgba(211,215,221,1);
      position: absolute;
      right: -7px;
      top: 30px;
      transition: all .3s;
    }
    &.on {
      color: #409EFF;
      &:after {
        background:#409EFF;
      }
    }
  }
}
</style>
