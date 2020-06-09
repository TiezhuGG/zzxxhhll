<template>
  <layout>
    <el-form label-position="right" :model="formData">
      <el-form-item label="新手机号">
        <el-input placeholder="新手机号">
          <el-select v-model="value" slot="prepend">
            <el-option label="+86" value="1"/>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="短信验证码">
        <el-input placeholder="短信验证码" v-model="formData.name">
          <el-button slot="append">获取验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="设置密码">
        <el-input type="password" placeholder="设置密码" v-model="formData.name"/>
      </el-form-item>
      <div class="button">
        <el-button>上一步</el-button>
        <el-button type="primary">确认修改</el-button>
      </div>
    </el-form>
    <contact/>
  </layout>
</template>

<script>
import { Contact, Layout } from './index'
export default {
  name: 'TelTwo',
  components: {
    Layout,
    Contact
  },
  data() {
    return {
      value: '1',
      formData: {
        name: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  >>>.el-input-group__prepend {
    /*background-color: transparent;*/
    .el-select .el-input {
      width: 88px!important;
    }
  }
</style>
