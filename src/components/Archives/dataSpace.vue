<template>
  <div class="data-space" :style="'width:' + width">
    <div v-if="!isEdit" class="show">
      <div class="name">{{ title }}：</div>
      <div v-if="type == 'img'">
        <img :src="value" alt="">
      </div>
      <div v-else class="value">{{ value }}</div>
      <slot name="button">
        <div class="button"></div>
      </slot>
    </div>
    <div v-else class="form">
      <el-form-item :prop="name" :label="title + '：'">
        <el-input v-model="value"></el-input>
      </el-form-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataSpace',
  props: {
    width: {
      type: String,
      default: '50%'
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    title: String,
    value: [String, Number],
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.data-space {
  padding: 30px 0;
  display: inline-block;
  .show {
    line-height: 40px;
    color: #666666;
    display: flex;
    .name {
      min-width: 127px;
    }
    .button {
      color: #409EFF;
      margin-left: 12px;
    }
  }
  >>>.form {
    * {font-size: 19px!important;}
    .el-form-item {
      margin-bottom: 0;
    }
    .el-form-item__label {
      width: 127px;
    }
    .el-input {
      width: 210px;
    }
  }
}
</style>
