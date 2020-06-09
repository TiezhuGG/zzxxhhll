<template>
  <layout>
    <el-form label-position="right" :model="formData">
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input v-model="formData.oldpassword"/>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="formData.password"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input v-model="formData.password"/>
      </el-form-item>
      <div class="button">
        <el-button type="primary">提交</el-button>
      </div>
    </el-form>
    <contact/>
  </layout>
</template>

<script>
import { Contact, Layout } from './index'
export default {
  name: 'Index',
  components: {
    Layout,
    Contact
  },
  data() {
    return {
      formData: {
        oldpassword: '',
        password: ''
      }
    }
  }
}
</script>
