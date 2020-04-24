<template>
  <el-dialog title="完善企业信息" center width="auto" top="20vh" :visible.sync="dialogFormVisible">
    <div class="desc">
      恭喜，您的企业 <span>厦门触享网络科技有限公司</span> 已经成功注册！<br/>
      完善您的企业信息，马上邀请同事加入协作吧。
    </div>
    <el-form :model="form" :rules="rules">
      <el-form-item prop="name" label="企业规模" :label-width="formLabelWidth">
        <el-radio-group v-model="form.region">
          <el-radio-button label="1-25人"></el-radio-button>
          <el-radio-button label="26-100人"></el-radio-button>
          <el-radio-button label="101-300人"></el-radio-button>
          <el-radio-button label="301-1000人"></el-radio-button>
          <el-radio-button label="1000人以上"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所在行业" :label-width="formLabelWidth">
        <el-select v-model="value" placeholder="请选择" style="width: 100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在地区" :label-width="formLabelWidth">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Perfect',
  data() {
    return {
      dialogFormVisible: true,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '113px',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  >>>.el-dialog{
    width: 880px!important;
  }
  .desc {
    color: #606266;
    line-height: 27px;
    padding: 0 15px;
    span {
      color: #409EFF;
    }
  }
  .el-form {
    padding-top: 50px;
  }
</style>
