<template>
  <div class="container">
    <div class="filter block">
      <el-form inline label-width="107px">
        <el-form-item label="订单状态">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户订单号码">
          <el-input v-model="value" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="业务来源">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户代码">
          <el-input v-model="value" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="value" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="工厂订单号码">
          <el-input v-model="value" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="交货日期">
          <el-date-picker v-model="value" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="交货地点">
          <el-input v-model="value" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="价格条件">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付款条件">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货币类别">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合计金额(¥)">
          <el-input v-model="vlaue" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="合计数量">
          <el-input v-model="vlaue" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input v-model="vlaue" placeholder="请输入内容" style="width: 1125px"></el-input>
        </el-form-item>

        <el-form-item label="业务部门">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务人员">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="建档人员">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="block">
      <el-tabs type="border-card">
        <el-tab-pane class="product" label="产品">
          <div class="product-title">
            产品信息
            <span>合计{{ tableData.length }}项</span>
          </div>
          <div class="table_container">
            <el-table :data="tableData" :border="true" style="width: 100%">
              <el-table-column label="ID" prop="date" />
              <el-table-column label="图片" width="133" align="center">
                <template slot-scope="scope">
                  <product-img />
                </template>
              </el-table-column>
              <el-table-column label="客户货号" prop="date">
                <template slot-scope="scope">
                  <table-input v-model="scope.row.date" />
                </template>
              </el-table-column>
              <el-table-column label="款式名称" prop="date" />
              <el-table-column label="尺码规格" prop="date" />
              <el-table-column label="配色名称" prop="date" />
              <el-table-column label="配色代码" prop="date" />
              <el-table-column label="工厂货号" prop="date" />
              <el-table-column label="计量单位" prop="date" />
              <el-table-column fixed="right" label="操作" width="165">
                <el-link type="primary" @click="detailShow = true">查看</el-link>
                <el-link type="primary" @click="deleteById">删除</el-link>
              </el-table-column>
            </el-table>
          </div>
          <el-dialog title="产品详情" width="848px" :visible.sync="detailShow">
            <product-detail />
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="审批信息">配置管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ProductImg from './components/productImg'
import ProductDetail from './components/productDetail'
import TableInput from './components/tableInput'
export default {
  name: 'Detail',
  components: { ProductImg, ProductDetail, TableInput },
  data() {
    return {
      value: '',
      detailShow: false,
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎'
        }
      ]
    }
  },
  methods: {
    deleteById() {}
  }
}
</script>

<style lang="scss" scoped>
@import './static.scss';
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  .block {
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    overflow: hidden;
    &:nth-child(n + 2) {
      margin-top: 15px;
    }
    .product {
      &-title {
        line-height: 80px;
        font-size: 21px;
        span {
          color: #ff5a5a;
          font-size: 19px;
          margin-left: 28px;
        }
      }
      >>> .el-tabs {
        box-shadow: none;
        border: none;
      }
    }
    .table-input {
      height: 73px;
      line-height: 73px;
    }
    >>> .el-dialog {
      &__header {
        padding: 0 27px;
        line-height: 67px;
        background: rgba(243, 243, 243, 1);
        border-radius: 5px 5px 0px 0px;
      }
      &__body {
        padding: 27px 32px;
      }
    }
  }
}
</style>
