<template>
  <div class="detail-approver">
    <custom-header title="审批信息" />
    <custom-header title="会签" desc="(须所有审批人同意)" />
  </div>
</template>

<script>
export default {
  name: 'DetailApprover',
  components: {
    'custom-header': {
      props: ['title', 'desc'],
      template: '<div class="custom-header"><span>{{ title }}</span><span v-if="desc">{{ desc }}</span></div>'
    }
  },
  data:() => ({

  })
}
</script>
<style lang="scss" scoped>
.detail-approver {
  padding: 0 65px;
}
</style>
<style lang="scss" scoped>
.custom-header{
  font-size: 21px;
  padding-bottom: 11px;
  border-bottom: 3px solid #EEEEEE;
  >>>span {
    position: relative;
    display: inline-block;
    &:first-child:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      bottom: -14px;
      left: 0;
      background-color: #CCCCCC;
    }
    &+span {
      margin-left: 13px;
      color: #999999;
      font-size: 19px;
    }
  }
}
</style>
