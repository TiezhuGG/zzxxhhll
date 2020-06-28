<template>
  <layout>
    <div class="out-firm-container">
      <div class="title">退出企业理由</div>
      <el-checkbox-group v-model="checkedReasons" @change="select">
        <el-checkbox v-for="item in reasons" :label="item.id" :key="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <el-input type="textarea" placeholder="请输入内容" v-model="textarea"></el-input>
      <div class="button">
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
        <el-button @click="quit">残忍退出</el-button>
      </div>
    </div>
  </layout>
</template>

<script>
import { Layout } from "./index";
import { quitEnterprise, getQuitReasons } from "@/api/user";
import { removeToken } from '@/utils/auth'
export default {
  name: "OutFirm",
  components: {
    Layout
  },
  data() {
    return {
      checkedReasons: [], // 存入理由的id
      reasons: [],
      textarea: "",
      company_id: null,
      reason_id: null
    };
  },
  created() {
    this.company_id = localStorage.getItem("company_id");
    this.getQuitReasons();
  },
  methods: {
    select() {
      // console.log("choice", this.checkedReasons);
      this.reason_id = this.checkedReasons[0]
    },
    // 获取退出企业理由列表
    async getQuitReasons() {
      const res = await getQuitReasons();
      this.reasons = res.data;
    },
    // 退出企业
    async quit() {
      const res = await quitEnterprise({
        company_id: this.company_id,
        reason_id: this.reason_id
      });
      if(res.status_code === 200) {
        removeToken()
        this.$router.push('/user/login')
      }
    }
  }
};
</script>

<style lang="scss" scoped>
>>> main {
  background-color: #f5f6f7;
  display: block !important;
  padding-top: 61px;
}
.out-firm-container {
  width: 933px;
  margin: 0 auto;
  padding: 53px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: 1px solid rgba(235, 238, 245, 1);
  >>> * {
    font-size: 19px !important;
  }
  .title {
    font-weight: 500;
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
    >>> .el-textarea__inner {
      height: 300px;
      resize: none;
      padding: 15px 20px;
      box-sizing: border-box;
      line-height: 27px;
    }
  }
  .button {
    padding-top: 50px;
    .el-button {
      width: 131px;
      & + .el-button {
        margin-left: 53px;
      }
    }
  }
}
</style>
