<template>
  <div class="payroll-container">
    <div class="choose">
      <el-form ref="form" :modal="chooseData">
          <el-form-item label="部门">
            <el-select placeholder="请选择部门">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职务">
            <el-select placeholder="请选择职务">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工资">
            <el-input name="picre" placeholder="请输入工资"/>
            <div class="select-interval">-</div>
            <el-input name="picre" placeholder="请输入工资"/>
          </el-form-item>
      </el-form>
      <div class="buttons">
        <el-button type="primary" icon="el-icon-search">查询</el-button>
        <el-button><svg-icon icon-class="excel"/>导出Excel</el-button>
      </div>
    </div>
    <div class="payroll-content">
      <el-tabs type="border-card">
        <el-tab-pane label="全部">
          <div class="texts">
            <div class="text">总数量：492381</div>
            <div class="text">工资合计(¥)：6946706.10</div>
          </div>
          <div class="table-container">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column prop="date" label="编号"/>
              <el-table-column prop="date" label="部门"/>
              <el-table-column prop="date" label="姓名"/>
              <el-table-column prop="date" label="职务"/>
              <el-table-column prop="date" label="设置时间"/>
              <el-table-column prop="date" label="操作" align="center" width="100">
                <template slot-scope="scope">
                  <el-tooltip class="button" effect="dark" content="查看" placement="top" @click.native="topage">
                    <i class="el-icon-search"/>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="已设置">
          <div class="texts">
            <div class="text">总数量：492381</div>
            <div class="text">工资合计(¥)：6946706.10</div>
          </div>
          <div class="table-container">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column width="200" prop="date" label="编号"/>
              <el-table-column width="200" prop="date" label="部门"/>
              <el-table-column width="200" prop="date" label="姓名"/>
              <el-table-column width="200" prop="date" label="职务"/>
              <el-table-column width="200" prop="date" label="试用期工资"/>
              <el-table-column width="200" prop="date" label="转正工资"/>
              <el-table-column width="200" prop="date" label="底薪"/>
              <el-table-column width="200" prop="date" label="加班津贴"/>
              <el-table-column width="200" prop="date" label="技能补贴"/>
              <el-table-column width="200" prop="date" label="岗位补贴"/>
              <el-table-column width="200" prop="date" label="职位补贴"/>
              <el-table-column width="200" prop="date" label="电话补贴"/>
              <el-table-column width="200" prop="date" label="绩效奖金"/>
              <el-table-column width="200" prop="date" label="其他奖金"/>
              <el-table-column width="200" prop="date" label="年终奖比率"/>
              <el-table-column width="200" prop="date" label="上一次涨薪"/>
              <el-table-column width="200" prop="date" label="设置时间"/>
              <el-table-column prop="date" label="操作" width="100" fixed="right" align="center">
                <template slot-scope="scope">
                  <el-tooltip class="button" effect="dark" content="查看" placement="top">
                      <i class="el-icon-search"/>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="未设置">
          <div class="texts">
            <div class="text">总数量：492381</div>
            <div class="text">工资合计(¥)：6946706.10</div>
          </div>
          <div class="table-container">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column prop="date" label="编号"/>
              <el-table-column prop="date" label="部门"/>
              <el-table-column prop="date" label="姓名"/>
              <el-table-column prop="date" label="职务"/>
              <el-table-column prop="date" label="设置时间"/>
              <el-table-column prop="date" label="操作" align="center">
                <template slot-scope="scope">
                  <el-tooltip class="button" effect="dark" content="查看" placement="top">
                    <i class="el-icon-search"/>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div><div class="block">
        </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Payroll',
  data() {
    return {
      chooseData: {
        picre: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage4: 4
    }
  },
  methods: {
    topage(id) {
      this.$router.push({ path: 'detail', query: {
        id: 23
      }})
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-input {
    width: 232px!important;
  }
  .el-select {
    width:293px;
  }
  .payroll-container {
    padding: 27px;
    > div {
      background:rgba(255,255,255,1);
      box-shadow:0px 3px 16px 0px rgba(0,0,0,0.05);
      border-radius:11px;
      overflow: hidden;
    }
    .choose {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height:227px;
      padding: 40px 27px;
      .el-form {
        display: flex;
        padding-right: 200px;
        .el-form-item {
          flex-grow: 1;
          /*display: flex;*/
        }
      }
      .buttons {
        text-align: right;
        .svg-icon {
          margin-right: 10px;
        }
        button:nth-child(n+2) {
          color: #409EFF;
        }
      }
    }
    .payroll-content {
      margin-top: 20px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      .texts {
        color: #606266;
        padding: 40px 0;
        .text {
          display: inline-block;
          &:nth-child(n+2) {
            margin-left: 65px;
          }
        }
      }
      .table-container {
        padding: 33px;
        padding-bottom: 0;
        border:1px solid rgba(235,238,245,1);
      }
      .el-pagination {
        margin-top: 15px;
      }
    }
  }
</style>
