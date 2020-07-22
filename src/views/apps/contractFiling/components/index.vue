<template>
    <div >
        <el-dialog title="产品信息" :visible.sync="dialogTableVisible">
      <div>
        <el-button type="primary">
          <svg-icon icon-class="button_update" />导出
        </el-button>
        <el-button>
          <svg-icon icon-class="button_delete" />删除
        </el-button>
      </div>
      
    </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'ChildPage',
  data(){
    return {
          dialogTableVisible: false,
    }
  },
  methods:{
     showdialogTab(e){
       console.log(e,"jieshou ")
       this.dialogTableVisible = true
     }
  }
}
</script>
<style lang="scss" scoped>

</style>
