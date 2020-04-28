<template>
  <div class="sblock-item">
    <div class="item-title">
      <div class="name">{{ title }}</div>
      <div class="line"></div>
      <div v-if="canEdit" class="buttons">
        <div v-if="!isEdit" @click="isEdit = true">编辑</div>
        <div v-else @click="isEdit = false">保存</div>
      </div>
    </div>
    <el-form label-position="left" :model="formData">
      <slot :isEdit="isEdit"></slot>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Sblock',
  props: {
    canEdit: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isEdit: false,
      formData: {}
    }
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
      cursor: pointer;
      flex-shrink: 0;
      color: #409EFF;
      padding-left: 13px;
    }
  }
  .el-form {
    padding: 32px 0;
  }
}
</style>
