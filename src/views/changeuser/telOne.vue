<template>
  <layout>
    <el-form label-position="right" :model="formData">
      <el-form-item label="旧手机号">
        <el-input placeholder="旧手机号">
          <el-select v-model="value" slot="prepend">
            <el-option label="+86" value="1"/>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="短信验证码">
        <el-input placeholder="短信验证码">
          <el-button slot="append">获取验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="旧密码">
        <el-input placeholder="旧密码"/>
      </el-form-item>
      <div class="button">
        <el-button type="primary" @click="$api.topage('TelTwo')">下一步</el-button>
      </div>
    </el-form>
    <contact/>
  </layout>
</template>

<script>
import { Contact, Layout } from './index'
export default {
  name: 'TelOne',
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
