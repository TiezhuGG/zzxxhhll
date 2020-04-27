<template>
    <div class="archiver-container">
      <steps @change="handleStep" :step-active="stepActive" :steps-list="stepsList"/>
      <div class="sblock-container">
        <s-block v-for="(item, index) of stepsList" :key="index" :step-active="stepActive" :item="item"></s-block>
      </div>
    </div>
</template>

<script>
import { Steps, sBlock } from './components'
export default {
  name: 'Archives',
  components: {
    Steps,
    sBlock
  },
  data() {
    return {
      stepActive: 0,
      stepsList: [{
        name: '系统信息',
        isEdit: true,
        cildren: [{
          name: '实人认证',
          value: '未授权',
          trueValue: '0',
          url: 'http://www.baidu.com'
        }]
      }, {
        name: '系统信息2',
        isEdit: false,
        cildren: [{
          name: '实人认证',
          value: '未授权',
          trueValue: '0',
          url: 'http://www.baidu.com'
        }]
      }]
    }
  },
  methods: {
    handleStep({ index, name }) {
      this.stepActive = index
    }
  }
}
</script>

<style lang="scss" scoped>
.archiver-container {
  display: flex;
  justify-content: center;
  padding: 56px 0;
  .sblock-container {
    width: 1070px;
    display: inline-block;
    padding-left: 110px;
  }
}
</style>
