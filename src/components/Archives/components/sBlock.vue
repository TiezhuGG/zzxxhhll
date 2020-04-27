<template>
    <div class="sblock-item">
      <div class="item-title">
        <div class="name">{{ item.name }}</div>
        <div class="line"></div>
        <div v-if="item.isEdit" class="buttons">
          <div>编辑</div>
        </div>
      </div>
      <div class="">
        <data-space v-for="(ditem, index) of item.children" :key="index" :item="ditem"/>
      </div>
    </div>
</template>

<script>
import { dataSpace } from './index'
export default {
  name: 'sBlock',
  props: {
    item: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  components: {
    dataSpace
  }
}
</script>

<style lang="scss" scoped>
.sblock-item {
  width: 100%;
  min-height: 170px;
  .item-title {
    display: flex;
    align-items: center;
    font-weight:600;
    .name {
      flex-shrink: 0;
      font-size: 21px;
      padding-right: 13px;
    }
    .line {
      flex-grow: 1;
      width: 100%;
      height:1px;
      background:rgba(235,235,235,1);
    }
    .buttons {
      flex-shrink: 0;
      color: #409EFF;
      padding-left: 13px;
    }
  }
}
</style>
