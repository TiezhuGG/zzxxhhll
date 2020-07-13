<template>
  <div class="order_admin">
    <div class="container">
      <div class="filter block">
        <el-form inline label-width="107px">
          <el-form-item label="订单状态">
            <el-select>
              <el-option>1</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户订单号码">
            <el-input placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="业务来源">
            <el-select>
              <el-option>1</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户代码">
            <el-input placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="工厂订单号码">
            <el-input placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="交货日期">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="交货地点">
            <el-input placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="业务部门">
            <el-select>
              <el-option>1</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务人员">
            <el-select>
              <el-option>1</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建档人员">
            <el-select>
              <el-option>1</el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="button">
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex-sp">
        <div class="channel block">
          <div class="channel_list">
            <div class="channel_item active">
              <svg-icon icon-class="file_edit" />录入
            </div>
            <div class="channel_item">
              <svg-icon icon-class="file_search" />待审批
            </div>
            <div class="channel_item">
              <svg-icon icon-class="file_ok" />已批准
            </div>
            <div class="channel_item">
              <svg-icon icon-class="file_err" />已拒绝
            </div>
          </div>
        </div>
        <div class="content block">
          <div class="buttons flex-sp">
            <div>
              <el-button type="primary">
                <svg-icon icon-class="button_new" />新增
              </el-button>
              <el-button type="primary">
                <svg-icon icon-class="button_update" />导出
              </el-button>
              <el-button type="primary">
                <svg-icon icon-class="button_log" />打印
              </el-button>
              <el-button>
                <svg-icon icon-class="button_delete" />删除
              </el-button>
            </div>
            <div>
              <el-button type="primary">
                <svg-icon icon-class="button_down" />新增
              </el-button>
              <el-button type="plain">下载导入模板</el-button>
            </div>
          </div>
          <div class="checkbox_condition">
            <div class="checkbox_header">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
              <div>
                <svg-icon icon-class="arrow-top" />收起
              </div>
            </div>
            <div class="checkbox_content">
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="table_container">
            <el-table
              ref="multipleTable"
              :data="tableData"
              :border="true"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column label="ID">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column prop="name" label="订单状态" width="200"></el-table-column>
              <el-table-column prop="address" label="客户订单号码" width="200"></el-table-column>
              <el-table-column prop="address" label="客户订单号码" width="200"></el-table-column>
              <el-table-column prop="address" label="客户订单号码" width="200"></el-table-column>
              <el-table-column prop="address" label="客户订单号码" width="200"></el-table-column>
              <el-table-column prop="address" label="客户订单号码" width="200"></el-table-column>
              <el-table-column prop="address" label="客户订单号码" width="200"></el-table-column>
              <el-table-column prop="address" label="客户订单号码" width="200"></el-table-column>
              <el-table-column prop="address" label="客户订单号码" width="200"></el-table-column>
              <el-table-column fixed="right" label="操作" width="165">
                <el-link type="primary">编辑</el-link>
                <el-link type="primary">删除</el-link>
                <el-link type="primary">打印</el-link>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from './mixin/config'
export default {
  mixins: [config],
  data() {
    return {
      value: '',
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: [
        '订单状态',
        '客户订单号码',
        '业务来源',
        '客户代码',
        '客户名称',
        '工厂订单号码',
        '交货日期',
        '交货地点',
        '业务部门',
        '业务人员',
        '建档人员',
        '建档日期',
        '修改日期'
      ],
      isIndeterminate: true,
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import './static.scss';
.order_admin {
  height: 100%;
  padding: 11px;
  .container {
    display: flex;
    flex-wrap: wrap;
    .block {
      background-color: #ffffff;
      box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
      border-radius: 6px;
      margin: 5px;
    }
    .flex-sp {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .channel {
        width: 240px;
        flex-shrink: 0;
        .channel_ {
          &list {
            padding: 27px 0;
          }
          &item {
            display: flex;
            align-items: center;
            padding: 0 27px;
            height: 59px;
            font-size: 19px;
            transition: background-color 0.2s;
            &:hover,
            &.active {
              background-color: rgba(217, 236, 255, 1);
            }
            .svg-icon {
              margin-right: 13px;
            }
          }
        }
      }
      .content {
        width: 100px;
        flex: 1;
      }
    }
    .content {
      padding: 27px;
      > div:nth-child(n + 2) {
        margin-top: 33px;
      }
    }
  }
}
</style>