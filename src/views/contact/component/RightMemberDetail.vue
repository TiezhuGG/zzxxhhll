<template>
  <div class="right-new-member">
    <el-container>
      <el-header style="text-align: left; font-size: 24px; color: #303133">个人档案</el-header>
      <el-main>
        <div class="member">
          <!-- 头部信息 -->
          <div class="member-header">
            <img class="logo" src="../../../assets/imgs/test.jpg" />
            <div class="member-name">
              <span class="name">白</span>
              <span class="regular">正式</span>
              <span class="auth">未授权实人认证</span>
            </div>
            <div class="member-department">
              <span class="department-name">技术部</span>
              <span class="main-department">主部门</span>
            </div>
            <span class="test">测试</span>
            <span class="introduce">在触享网络科技有限公司工作了5年</span>
          </div>

          <div class="member-detail-infos">
            <!-- 系统信息 -->
            <div class="system-info">
              <div class="system-info-top">
                <span class="txt">系统信息</span>
                <span class="line"></span>
              </div>
              <div class="system-info-bottom">
                <span class="txt">实人认证:</span>
                <span class="auth">未授权</span>
                <span class="detail">详情</span>
              </div>
            </div>

            <el-table :data="tabledatas">
              <el-table-column label="基础信息">
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>姓名：</label>
                      <span>{{scope.row.name}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>部门：</label>
                      <span>{{scope.row.department}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>职位：</label>
                      <span>{{scope.row.position}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>工号：</label>
                      <span>{{scope.row.job_num}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>办公地点：</label>
                      <span>{{scope.row.office_location}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>入职时间：</label>
                      <span>{{scope.row.hire_date}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>邮箱：</label>
                      <span>{{scope.row.email}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>主部门：</label>
                      <span>{{scope.row.main_department}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>手机号：</label>
                      <span>{{scope.row.phone}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>分机号：</label>
                      <span>{{scope.row.extension_num}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>备注：</label>
                      <span>{{scope.row.remarks}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>司龄：</label>
                      <span>{{scope.row.job_year}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button @click="scope.row.show = true">编辑</el-button>
                  <el-button @click="scope.row.show = false">保存</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 工作信息 -->
            <!-- <div class="system-info">
              <div class="system-info-top">
                <span class="txt">工作信息</span>
                <span class="line"></span>
              </div>
            </div>-->

            <el-table :data="tabledatas">
              <el-table-column label="工作信息">
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>员工类型：</label>
                      <span>{{scope.row.employee_type}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>试用期：</label>
                      <span>{{scope.row.probation_period}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>岗位职责：</label>
                      <span>{{scope.row.job_grade}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>员工状态：</label>
                      <span>{{scope.row.employee_status}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <div class="item" v-show="!scope.row.show">
                      <label>转正日期：</label>
                      <span>{{scope.row.job_grade}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button @click="scope.row.show = true">编辑</el-button>
                  <el-button @click="scope.row.show = false">保存</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabledatas: [
        {
          name: "白",
          email: "bai@bai.com",
          department: "技术部",
          main_department: "技术部",
          position: "前端",
          phone: "12345678910",
          job_num: "11号",
          extension_num: "110",
          office_location: "泉州",
          remarks: "备注",
          hire_date: "2222-02-22",
          job_year: "5年6个月",
          employee_type: "全职",
          employee_status: "正式",
          probation_period: "2个月",
          formal_date: "2015-11-25",
          job_grade: "初级",
          show: false
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.el-table__row {
  border: none;
}
.right-new-member {
  width: 100%;
  .el-container {
    background-color: #fff;

    .el-header {
      height: 80px !important;
      color: #303133;
      line-height: 80px;
      border-bottom: 1px solid rgb(241, 241, 241);

      &:nth-child(2) {
        margin-bottom: 39px;
      }
    }

    .el-main {
      .member {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #303133;
        font-size: 19px;

        .member-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 83px;

          .member-name {
            display: flex;
            margin-bottom: 17px;

            .name {
              font-size: 27px;
              margin-right: 7px;
            }
            .regular,
            .auth {
              display: inline-block;
              width: 51px;
              height: 27px;
              line-height: 27px;
              text-align: center;
              margin-right: 7px;
              border-radius: 5px;
              font-size: 16px;
              background-color: #d9ecff;
              color: #409eff;
            }
            .auth {
              width: 128px;
              background-color: #ffdede;
              color: #ff5a5a;
            }
          }

          .member-department {
            height: 24px;
            display: flex;
            align-items: center;
            margin-bottom: 17px;

            .department-name {
              margin-right: 11px;
            }
            .main-department {
              display: inline-block;
              width: 56px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              font-size: 16px;
              color: #409eff;
              background-color: #d9ecff;
              border-radius: 5px;
            }
          }
          .test {
            display: inline-block;
            margin-bottom: 17px;
          }
          .introduce {
            color: #909399;
          }
        }

        .member-detail-infos {
          //   margin-left: 302px;

          .system-info {
            .system-info-top {
              display: flex;
              align-items: center;
              margin-bottom: 76px;
              .txt {
                font-size: 21px;
                margin-right: 13px;
                font-weight: 600;
              }

              .line {
                display: inline-block;
                width: 892px;
                height: 1px;
                background-color: #ebebeb;
              }
            }
            .system-info-bottom {
              color: #666;
              font-size: 19px;
              .txt {
                display: inline-block;
                margin-right: 33px;
              }
              .auth {
                display: inline-block;
                margin-right: 13px;
              }
              .detail {
                color: #409eff;
              }
            }
          }
        }
      }
    }
  }
}

.table-item {
  color: #666;
  font-size: 19px;
  margin-bottom: 75px;
  &:last-child {
    margin: 0;
  }
  .item {
    label {
      width: 100px;
      font-weight: 400;
    }
  }
}

.logo {
  width: 93px;
  height: 93px;
  border-radius: 50%;
  margin: 64px 0 33px 0;
}
</style>