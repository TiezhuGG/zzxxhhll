<template>
  <div class="data-space" :style="'width:' + width">
    <div v-if="!isEdit" class="show">
      <div class="name">{{ title }}：</div>
      <div v-if="type == 'img'">
        <img :src="dsValue" alt="">
      </div>
      <div v-else class="value">{{ dsValue }}</div>
      <div class="button">
        {{ button }}
      </div>
    </div>
    <div v-else class="form">
      <el-form-item :label="title + '：'">
        <el-input v-model="dsValue"></el-input>
      </el-form-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataSpace',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    width: {
      type: String,
      default: '50%'
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
    },
    button: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dsValue: this.value
    }
  },
  watch: {
    value(val) {
      this.dsValue = val
    },
    isEdit(val) {
      const dsValue = this.dsValue
      !val && this.dsValue !== this.value ? this.$emit('change', dsValue) : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.data-space {
  font-size: 19px;
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
