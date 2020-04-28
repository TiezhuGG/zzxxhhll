<template>
    <div class="archiver-container">
      <slot name="steps"></slot>
      <div class="sblock-container">
        <slot name="sblock"></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Archives'
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
