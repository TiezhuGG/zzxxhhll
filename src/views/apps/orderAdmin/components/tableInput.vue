<template>
  <div class="table-input">
    <div v-show="!isInput" @click="isInput = true">{{ value }}</div>
    <input
      v-show="isInput"
      ref="input"
      :value="value"
      @blur="$emit('input', $event.target.value), isInput = false"
      @change="$emit('input', $event.target.value), isInput = false"
    />
  </div>
</template>

<script>
export default {
  name: 'TableInput',
  props: ['value'],
  data() {
    return {
      isInput: false
    }
  },
  watch: {
    isInput(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-input {
  > * {
    width: 100%;
    height: 100%;
    padding: 0 10px;
  }
  input:focus {
    border: 1px solid rgba(64, 158, 255, 1);
  }
  div {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>