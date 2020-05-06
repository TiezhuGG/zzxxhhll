<template>
  <layout>
    <div class="out-firm-container">
      <div class="title">退出企业理由</div>
      <el-checkbox-group v-model="checkedCities">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
      <div class="button">
        <el-button type="primary">返回</el-button>
        <el-button>残忍退出</el-button>
      </div>
    </div>
  </layout>
</template>

<script>
import { Layout } from './index'
export default {
  name: 'OutFirm',
  components: {
    Layout
  },
  data() {
    return {
      checkedCities: ['离职主动退出'],
      cities: ['离职主动退出', '被加入不需要或不了解的组织', '加错企业', '误创建的企业', '重复加入', '广告骚扰', '其他'],
      textarea: ''
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  >>>main {
    background-color: #F5F6F7;
    display: block!important;
    padding-top: 61px;
  }
  .out-firm-container {
    width:933px;
    margin: 0 auto;
    padding: 53px;
    background:rgba(255,255,255,1);
    border-radius:5px;
    border:1px solid rgba(235,238,245,1);
    >>>* {
      font-size: 19px!important;
    }
    .title {
      font-weight:500;
      font-size: 21px;
      text-align: center;
    }
    .el-checkbox {
      min-width: 25%;
      margin-top: 40px;
      &:nth-child(3n - 1) {
        min-width: 37%;
      }
    }
    .el-textarea {
      margin-top: 40px;
      >>>.el-textarea__inner {
        height: 400px;
        resize: none;
        padding :15px 20px;
        box-sizing: border-box;
        line-height: 27px;
      }
    }
    .button {
      padding-top: 50px;
      .el-button {
        width: 131px;
        &+.el-button {
          margin-left: 53px;
        }
      }
    }
  }
</style>
