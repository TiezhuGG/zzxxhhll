<template>
  <div class="payroll-container">
    <el-tabs type="border-card" v-model="activeName" label-width="144px">
      <el-tab-pane label="个人信息" name="info">
        <archives/>
      </el-tab-pane>

      <el-tab-pane label="薪资情况" name="condition">
        <el-form class="condition" prop="" label-width="auto" disabled>
          <el-form-item label="员工编号">
            <el-input/>
          </el-form-item>
          <el-form-item label="部门">
            <el-input/>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input/>
          </el-form-item>
          <el-form-item label="职务">
            <el-input/>
          </el-form-item>
          <el-form-item label="试用期工资">
            <el-input/>
          </el-form-item>
          <el-form-item label="转正工资">
            <el-input/>
          </el-form-item>
          <el-form-item label="底薪">
            <el-input/>
          </el-form-item>
          <el-form-item label="加班津贴">
            <el-input/>
          </el-form-item>
          <el-form-item label="工龄补贴">
            <el-input/>
          </el-form-item>
          <el-form-item label="技能补贴">
            <el-input/>
          </el-form-item>
          <el-form-item label="岗位补贴">
            <el-input/>
          </el-form-item>
          <el-form-item label="职位津贴">
            <el-input/>
          </el-form-item>
          <el-form-item label="电话补贴">
            <el-input/>
          </el-form-item>
          <el-form-item label="绩效奖金">
            <el-input/>
          </el-form-item>
          <el-form-item label="其他奖金">
            <el-input/>
          </el-form-item>
          <el-form-item label="年终奖比率">
            <el-input/>
          </el-form-item>
          <el-form-item label="上一次涨薪">
            <el-input/>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="历史薪资" name="history">
        <div class="table-container">
          <el-table
            :data="tableData"
            row-key="id"
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
              prop="date"
              label="时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="基本工资"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="提成">
            </el-table-column>
            <el-table-column
              prop="name"
              label="奖金">
            </el-table-column>
            <el-table-column
              prop="name"
              label="福利费">
            </el-table-column>
            <el-table-column
              prop="name"
              label="合计">
            </el-table-column>
            <el-table-column
              prop="name"
              label="考勤扣款">
            </el-table-column>
            <el-table-column
              prop="name"
              label="五险一金扣款">
            </el-table-column>
            <el-table-column prop="date" label="操作" width="100" fixed="right" align="center">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="打印" placement="top">
                  <div class="button">
                    <svg-icon icon-class="print"/>
                  </div>
<!--                  <i class="el-icon-search"/>-->
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="涨薪情况" name="highs">
        <div class="table-container">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="调整日期"
              width="280">
            </el-table-column>
            <el-table-column
              prop="name"
              label="工资项目"
              width="280">
            </el-table-column>
            <el-table-column
              prop="address"
              label="调整额度(¥)"
              width="280">
            </el-table-column>
            <el-table-column
              prop="name"
              label="调整理由">
            </el-table-column>
            <el-table-column
              prop="name"
              label="备注"
              width="280">
            </el-table-column>
            <el-table-column
              prop="name"
              label="审批领导"
              width="280">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Archives from '@/components/Archives'
export default {
  name: 'Detail',
  data() {
    return {
      activeName: 'info',
      tableData: [{
        id: 3,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  components: {
    Archives
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.payroll-container {
  padding: 27px;
  >>>.el-tabs__content {
      padding: 40px 45px;
    .el-tab-pane:first-child {
      img {
        width: 100%;
      }
    }
  }
  .condition {
    font-size: 0;
    .el-form-item {
      width: 25%;
      font-size: 19px;
      display: inline-block;
      .el-input {
        width:293px;
      }
    }
  }
  .table-container {
    padding: 33px;
    padding-bottom: 0;
    border-radius:5px;
    border:1px solid rgba(235,238,245,1);
  }
}
</style>
