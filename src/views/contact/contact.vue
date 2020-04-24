<template>
  <el-container>
    <el-aside width="389px"></el-aside>
        <LeftSide />
    <el-container>
      <el-header style="text-align: left; font-size: 24px">新的联系人</el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  height: 80px !important;
  color: #303133;
  line-height: 80px;
  border-bottom: 1px solid rgb(241, 241, 241);
}

.el-aside {
  border-right: 1px solid rgb(241, 241, 241);
  color: #333;
}
</style>

<script>
import LeftSide from './component/LeftSide'
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  },
  components: {
      LeftSide
  }
};
</script>