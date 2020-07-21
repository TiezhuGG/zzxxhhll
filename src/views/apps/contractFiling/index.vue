<template>
  <div v-if="$route.name === 'contractFilingIndex'" class="customer_admin">
    <div class="container">
      <div class="filter block">
        <el-form inline label-width="107px">
          <el-form-item label="生产流水号">
            <el-input placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item label="客户代码">
            <el-select>
              <el-option>1</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="客户名称">
            <el-select>
              <el-option>1</el-option>
            </el-select>
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

          <el-form-item label="建档日期">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>

          <el-form-item label="修改日期">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>

          <el-form-item class="button">
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex-sp">
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
            <div class="checkbox_header" :class="checkboxShow ? '' : 'on'">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
              <div @click="checkboxShow = !checkboxShow">
                <svg-icon icon-class="arrow-top" />
                {{ checkboxShow ? '收起' : '展开' }}
              </div>
            </div>
            <el-collapse-transition>
              <div v-show="checkboxShow" class="checkbox_content">
                <el-checkbox-group v-model="checkedRows" @change="handleCheckedRowChange">
                  <el-checkbox
                    v-for="(row, index) in tableRwos"
                    :label="row.name"
                    :key="index"
                  >{{row.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-collapse-transition>
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
              <template v-for="(row, index) of tableRwos">
                <el-table-column
                  v-if="isCheckbox(row.name)"
                  :key="index"
                  :prop="row.data_key"
                  :label="row.name"
                  width="200"
                />
              </template>
              <el-table-column fixed="right" label="操作" width="165">
                <el-link
                  type="primary"
                  @click="$router.push({ path: 'contractFiling_index/contractFiling_detail' })"
                >编辑</el-link>
                <el-link type="primary" @click="deleteById">删除</el-link>
                <el-link type="primary">打印</el-link>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
  <router-view v-else />
</template>

<script>
// import config from './mixin/config'
export default {
  //   mixins: [config],
  data() {
    return {
      currentPage4: 4,
      value: "",
      checkboxShow: false,
      checkAll: false,
      checkedRows: ["客户代码"],
      tableRwos: [
        {
          name: "客户代码",
          data_key: "name"
        },
        {
          name: "客户名称",
          data_key: "name"
        },
        {
          name: "业务部门",
          data_key: "date"
        },
        {
          name: "业务人员",
          data_key: "date"
        },
        {
          name: "建档人员",
          data_key: "date"
        },
        {
          name: "建档日期",
          data_key: "date"
        },
        {
          name: "修改日期",
          data_key: "date"
        }
      ],
      isIndeterminate: true,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎"
        },
        {
          date: "2016-05-02",
          name: "王小虎"
        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    isCheckbox(name) {
      return this.checkedRows.includes(name);
    },
    handleCheckAllChange(val) {
      this.checkedRows = val ? this.tableRwos.map(item => item.name) : [];
      this.isIndeterminate = false;
    },
    handleCheckedRowChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.tableRwos.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.tableRwos.length;
    },
    handleSelectionChange(value) {
      console.log(value);
    },
    deleteById(id) {
      const h = this.$createElement;
      this.$msgbox({
        title: "提示",
        message: h("div", null, [
          h("svg-icon", {
            style: {
              "margin-right": "12px",
              "font-size": "22px",
              "vertical-align": "middle"
            },
            attrs: {
              iconClass: "stop"
            }
          }),
          h("span", null, "此操作将永久删除该文件，是否继续？")
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./static.scss";
>>> .el-tabs__header{
    background-color: #ebebeb;
}
.customer_admin {
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