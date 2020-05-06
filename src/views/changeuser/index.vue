<template>
  <layout>
    <el-form label-position="right" model="formData">
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
  </layout>
</template>

<script>
import Layout from './layout'
export default {
  name: 'Index',
  components: {
    Layout
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

<style lang="scss" scoped>
</style>
