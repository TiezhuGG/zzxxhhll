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

            <!-- 基础信息 -->
            <div class="base_info">
              <span class="txt">基础信息</span>
              <span class="line"></span>
              <span class="edit" @click="base_info_show = true">编辑</span>
              <!-- <span class="save" @click="base_info_show = false" v-show="base_info_show">保存</span> -->
              <span class="save" @click="saveBaseInfo" v-show="base_info_show">保存</span>
            </div>

            <el-form :model="formData" ref="formData" :rules="rules">
              <el-table :data="formData.tabledatas">
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.name'"
                        :rules="rules.name"
                      >
                        <el-input
                          placeholder="请输入姓名"
                          v-show="base_info_show"
                          v-model="scope.row.name"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!base_info_show">
                        <label>姓名：</label>
                        <span>{{scope.row.name}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.department'"
                        :rules="rules.department"
                      >
                        <el-select
                          v-show="base_info_show"
                          v-model="scope.row.department"
                          @change="selectDepartment"
                          placeholder="请选择部门"
                        >
                          <el-option
                            v-for="item in formData.tabledatas[0].departments"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="item" v-show="!base_info_show">
                        <label>部门：</label>
                        <span>{{scope.row.department}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.position'"
                        :rules="rules.position"
                      >
                        <el-input
                          placeholder="请输入职位"
                          v-show="base_info_show"
                          v-model="scope.row.position"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!base_info_show">
                        <label>职位：</label>
                        <span>{{scope.row.position}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.job_num'"
                        :rules="rules.job_num"
                      >
                        <el-input
                          placeholder="请输入工号"
                          v-show="base_info_show"
                          v-model="scope.row.job_num"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!base_info_show">
                        <label>工号：</label>
                        <span>{{scope.row.job_num}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.office_location'"
                        :rules="rules.office_location"
                      >
                        <el-input
                          placeholder="请输入办公地点"
                          v-show="base_info_show"
                          v-model="scope.row.office_location"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!base_info_show">
                        <label>办公地点：</label>
                        <span>{{scope.row.office_location}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.hire_date'"
                        :rules="rules.hire_date"
                      >
                        <el-date-picker
                          v-model="scope.row.hire_date"
                          v-show="base_info_show"
                          type="date"
                          placeholder="请选择入职时间"
                          value-format="yyyy-MM-dd"
                          @change="selectHireDate"
                        ></el-date-picker>
                      </el-form-item>
                      <div class="item" v-show="!base_info_show">
                        <label>入职时间：</label>
                        <span>{{scope.row.hire_date}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.email'"
                        :rules="rules.email"
                      >
                        <el-input
                          placeholder="请输入邮箱"
                          v-show="base_info_show"
                          v-model="scope.row.email"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!base_info_show">
                        <label>邮箱：</label>
                        <span>{{scope.row.email}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.mainDepartment'"
                        :rules="rules.mainDepartment"
                      >
                        <el-select
                          v-show="base_info_show"
                          v-model="scope.row.mainDepartment"
                          @change="selectMainDepartment"
                          placeholder="请选择主部门"
                        >
                          <el-option
                            v-for="item in formData.tabledatas[0].main_departments"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="item" v-show="!base_info_show">
                        <label>主部门：</label>
                        <span>{{scope.row.mainDepartment}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.phone'"
                        :rules="rules.phone"
                      >
                        <el-input
                          placeholder="请输入手机号"
                          v-show="base_info_show"
                          v-model="scope.row.phone"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!base_info_show">
                        <label>手机号：</label>
                        <span>{{scope.row.phone}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.extension_num'"
                        :rules="rules.extension_num"
                      >
                        <el-input
                          placeholder="请输入分机号"
                          v-show="base_info_show"
                          v-model="scope.row.extension_num"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!base_info_show">
                        <label>分机号：</label>
                        <span>{{scope.row.extension_num}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.remarks'"
                        :rules="rules.remarks"
                      >
                        <el-input
                          placeholder="请输入备注"
                          v-show="base_info_show"
                          v-model="scope.row.remarks"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!base_info_show">
                        <label>备注：</label>
                        <span>{{scope.row.remarks}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.job_year'"
                        :rules="rules.job_year"
                      >
                        <el-input
                          placeholder="请输入司龄"
                          v-show="base_info_show"
                          v-model="scope.row.job_year"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!base_info_show">
                        <label>司龄：</label>
                        <span>{{scope.row.job_year}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>

            <!-- 工作信息 -->
            <div class="work_info">
              <span class="txt">工作信息</span>
              <span class="line"></span>
              <span class="edit" @click="work_info_show = true">编辑</span>
              <span class="save" @click="workBaseInfo" v-show="work_info_show">保存</span>
            </div>

            <el-form :model="workData" ref="workData" :rules="workRules">
              <el-table :data="workData.tabledatas">
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.employeeType'"
                        :rules="workRules.employeeType"
                      >
                        <el-select
                          v-show="work_info_show"
                          v-model="scope.row.employeeType"
                          @change="selectEmployeeType"
                          placeholder="请选择员工类型"
                        >
                          <el-option
                            v-for="item in workData.tabledatas[0].employee_types"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="item" v-show="!work_info_show">
                        <label>员工类型：</label>
                        <span>{{scope.row.employeeType}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.periods'"
                        :rules="workRules.periods"
                      >
                        <el-select
                          v-show="work_info_show"
                          v-model="scope.row.periods"
                          @change="selectPeriods"
                          placeholder="请选择试用期"
                        >
                          <el-option
                            v-for="item in workData.tabledatas[0].probation_periods"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="item" v-show="!work_info_show">
                        <label>试用期：</label>
                        <span>{{scope.row.periods}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-input
                        placeholder="请输入岗位职责"
                        v-show="work_info_show"
                        v-model="scope.row.job_grade"
                      ></el-input>
                      <div class="item" v-show="!work_info_show">
                        <label>岗位职责：</label>
                        <span>{{scope.row.job_grade}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.status'"
                        :rules="workRules.status"
                      >
                        <el-select
                          v-show="work_info_show"
                          v-model="scope.row.status"
                          @change="selectemployeeStatus"
                          placeholder="请选择员工状态"
                        >
                          <el-option
                            v-for="item in workData.tabledatas[0].employee_status"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="item" v-show="!work_info_show">
                        <label>员工状态：</label>
                        <span>{{scope.row.status}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.formal_date'"
                        :rules="rules.formal_date"
                      >
                        <el-date-picker
                          v-model="scope.row.formal_date"
                          v-show="work_info_show"
                          type="date"
                          placeholder="请选择转正日期"
                          value-format="yyyy-MM-dd"
                          @change="selectFormalDate"
                        ></el-date-picker>
                      </el-form-item>
                      <div class="item" v-show="!work_info_show">
                        <label>转正日期：</label>
                        <span>{{scope.row.formal_date}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>

            <!-- 个人信息 -->
            <div class="personal_info">
              <span class="txt">个人信息</span>
              <span class="line"></span>
              <span class="edit" @click="personal_info_show = true">编辑</span>
              <span class="save" @click="personal_info_show = false" v-show="personal_info_show">保存</span>
            </div>

            <el-table :data="personalData.tabledatas">
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input
                      placeholder="请输入身份证姓名"
                      v-show="personal_info_show"
                      v-model="scope.row.name_in_id"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>身份证姓名：</label>
                      <span>{{scope.row.name_in_id}}</span>
                    </div>
                  </div>

                  <div class="table-item">
                    <el-input
                      placeholder="请输入出生日期"
                      v-show="personal_info_show"
                      v-model="scope.row.born_date"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>出生日期：</label>
                      <span>{{scope.row.born_date}}</span>
                    </div>
                  </div>

                  <div class="table-item">
                    <el-input
                      placeholder="请输入性别"
                      v-show="personal_info_show"
                      v-model="scope.row.gender"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>性别：</label>
                      <span>{{scope.row.gender}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入身份证地址"
                      v-show="personal_info_show"
                      v-model="scope.row.id_card_address"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>身份证地址：</label>
                      <span>{{scope.row.email}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入婚姻情况"
                      v-show="personal_info_show"
                      v-model="scope.row.marriage"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>婚姻情况：</label>
                      <span>{{scope.row.marriage}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入工龄(系统计算)"
                      v-show="personal_info_show"
                      v-model="scope.row.work_year"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>工龄(系统计算)：</label>
                      <span>{{scope.row.work_year}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入住址"
                      v-show="personal_info_show"
                      v-model="scope.row.address"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>住址：</label>
                      <span>{{scope.row.address}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入个人社保账号"
                      v-show="personal_info_show"
                      v-model="scope.row.social_insurance"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>个人社保账号：</label>
                      <span>{{scope.row.social_insurance}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>

              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input
                      placeholder="请输入证件号码"
                      v-show="personal_info_show"
                      v-model="scope.row.id_card"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>证件号码：</label>
                      <span>{{scope.row.id_card}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入年龄"
                      v-show="personal_info_show"
                      v-model="scope.row.age"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>年龄：</label>
                      <span>{{scope.row.age}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入民族"
                      v-show="personal_info_show"
                      v-model="scope.row.nation"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>民族：</label>
                      <span>{{scope.row.nation}}</span>
                    </div>
                  </div>

                  <div class="table-item">
                    <el-input
                      placeholder="请输入证件有效期"
                      v-show="personal_info_show"
                      v-model="scope.row.valid_until"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>证件有效期：</label>
                      <span>{{scope.row.valid_until}}</span>
                    </div>
                  </div>

                  <div class="table-item">
                    <el-input
                      placeholder="请输入首次参加工作时间"
                      v-show="personal_info_show"
                      v-model="scope.row.first_working_time"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>首次参加工作时间：</label>
                      <span>{{scope.row.first_working_time}}</span>
                    </div>
                  </div>

                  <div class="table-item">
                    <el-input
                      placeholder="请输入户籍类型"
                      v-show="personal_info_show"
                      v-model="scope.row.domicile_type"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>户籍类型：</label>
                      <span>{{scope.row.domicile_type}}</span>
                    </div>
                  </div>

                  <div class="table-item">
                    <el-input
                      placeholder="请输入政治面貌"
                      v-show="personal_info_show"
                      v-model="scope.row.political"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>政治面貌：</label>
                      <span>{{scope.row.political}}</span>
                    </div>
                  </div>

                  <div class="table-item">
                    <el-input
                      placeholder="请输入个人公积金账号"
                      v-show="personal_info_show"
                      v-model="scope.row.accumulation_fund"
                    ></el-input>
                    <div class="item" v-show="!personal_info_show">
                      <label>个人公积金账号：</label>
                      <span>{{scope.row.accumulation_fund}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <!-- 学历信息 -->
            <div class="education_info">
              <span class="txt">学历信息</span>
              <span class="line"></span>
              <span class="edit" @click="education_info_show = true">编辑</span>
              <span
                class="save"
                @click="education_info_show = false"
                v-show="education_info_show"
              >保存</span>
            </div>

            <el-table :data="formData.tabledatas">
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input
                      placeholder="请输入学历"
                      v-show="education_info_show"
                      v-model="scope.row.education"
                    ></el-input>
                    <div class="item" v-show="!education_info_show">
                      <label>学历：</label>
                      <span>{{scope.row.education}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入毕业时间"
                      v-show="education_info_show"
                      v-model="scope.row.graduation_date"
                    ></el-input>
                    <div class="item" v-show="!education_info_show">
                      <label>毕业时间：</label>
                      <span>{{scope.row.graduation_date}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input
                      placeholder="请输入毕业院校"
                      v-show="education_info_show"
                      v-model="scope.row.school"
                    ></el-input>
                    <div class="item" v-show="!education_info_show">
                      <label>毕业院校：</label>
                      <span>{{scope.row.school}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入所学专业"
                      v-show="education_info_show"
                      v-model="scope.row.major"
                    ></el-input>
                    <div class="item" v-show="!education_info_show">
                      <label>所学专业：</label>
                      <span>{{scope.row.major}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <!-- 银行卡信息 -->
            <div class="education_info">
              <span class="txt">银行卡信息</span>
              <span class="line"></span>
              <span class="edit" @click="bank_info_show = true">编辑</span>
              <span class="save" @click="bank_info_show = false" v-show="bank_info_show">保存</span>
            </div>

            <el-table :data="formData.tabledatas">
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input
                      placeholder="请输入银行卡号"
                      v-show="bank_info_show"
                      v-model="scope.row.bank_card"
                    ></el-input>
                    <div class="item" v-show="!bank_info_show">
                      <label>银行卡号：</label>
                      <span>{{scope.row.bank_card}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input placeholder="请输入开户行" v-show="bank_info_show" v-model="scope.row.bank"></el-input>
                    <div class="item" v-show="!bank_info_show">
                      <label>开户行：</label>
                      <span>{{scope.row.bank}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <!-- 合同信息 -->
            <div class="contract_info">
              <span class="txt">合同信息</span>
              <span class="line"></span>
              <span class="edit" @click="contract_info_show = true">编辑</span>
              <span class="save" @click="contract_info_show = false" v-show="contract_info_show">保存</span>
            </div>

            <el-table :data="formData.tabledatas">
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input
                      placeholder="请输入合同公司"
                      v-show="contract_info_show"
                      v-model="scope.row.contract_compony"
                    ></el-input>
                    <div class="item" v-show="!contract_info_show">
                      <label>合同公司：</label>
                      <span>{{scope.row.contract_compony}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入首次合同起始日"
                      v-show="contract_info_show"
                      v-model="scope.row.first_contract_start_date"
                    ></el-input>
                    <div class="item" v-show="!contract_info_show">
                      <label>首次合同起始日：</label>
                      <span>{{scope.row.first_contract_start_date}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入现合同起始日"
                      v-show="contract_info_show"
                      v-model="scope.row.now_contract_start_date"
                    ></el-input>
                    <div class="item" v-show="!contract_info_show">
                      <label>现合同起始日：</label>
                      <span>{{scope.row.now_contract_start_date}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入合同期限"
                      v-show="contract_info_show"
                      v-model="scope.row.contract_period"
                    ></el-input>
                    <div class="item" v-show="!contract_info_show">
                      <label>合同期限：</label>
                      <span>{{scope.row.contract_period}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input
                      placeholder="请输入合同类型"
                      v-show="contract_info_show"
                      v-model="scope.row.contract_type"
                    ></el-input>
                    <div class="item" v-show="!contract_info_show">
                      <label>合同类型：</label>
                      <span>{{scope.row.contract_type}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入首次合同到期日"
                      v-show="contract_info_show"
                      v-model="scope.row.first_contract_end_date"
                    ></el-input>
                    <div class="item" v-show="!contract_info_show">
                      <label>首次合同到期日：</label>
                      <span>{{scope.row.first_contract_end_date}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入现合同到期日"
                      v-show="contract_info_show"
                      v-model="scope.row.now_contract_end_date"
                    ></el-input>
                    <div class="item" v-show="!contract_info_show">
                      <label>现合同到期日：</label>
                      <span>{{scope.row.now_contract_end_date}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入续签次数"
                      v-show="contract_info_show"
                      v-model="scope.row.renewal_num"
                    ></el-input>
                    <div class="item" v-show="!contract_info_show">
                      <label>续签次数：</label>
                      <span>{{scope.row.renewal_num}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <!-- 紧急联系人 -->
            <div class="emergency_contact">
              <span class="txt">紧急联系人</span>
              <span class="line" style="width:824px;"></span>
              <span class="edit" @click="emergency_contact_show = true">编辑</span>
              <span
                class="save"
                @click="emergency_contact_show = false"
                v-show="emergency_contact_show"
              >保存</span>
            </div>

            <el-table :data="formData.tabledatas">
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input
                      placeholder="请输入紧急联系人姓名"
                      v-show="emergency_contact_show"
                      v-model="scope.row.emergency_contact_person"
                    ></el-input>
                    <div class="item" v-show="!emergency_contact_show">
                      <label>紧急联系人姓名：</label>
                      <span>{{scope.row.emergency_contact_person}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入联系电话"
                      v-show="emergency_contact_show"
                      v-model="scope.row.contact_phone"
                    ></el-input>
                    <div class="item" v-show="!emergency_contact_show">
                      <label>联系电话：</label>
                      <span>{{scope.row.contact_phone}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input
                      placeholder="请输入联系人关系"
                      v-show="emergency_contact_show"
                      v-model="scope.row.contact_relationship"
                    ></el-input>
                    <div class="item" v-show="!emergency_contact_show">
                      <label>联系人关系：</label>
                      <span>{{scope.row.contact_relationship}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <!-- 家庭信息 -->
            <div class="education_info">
              <span class="txt">家庭信息</span>
              <span class="line"></span>
              <span class="edit" @click="family_info_show = true">编辑</span>
              <span class="save" @click="family_info_show = false" v-show="family_info_show">保存</span>
            </div>

            <el-table :data="formData.tabledatas">
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input
                      placeholder="请输入有无子女"
                      v-show="family_info_show"
                      v-model="scope.row.has_child"
                    ></el-input>
                    <div class="item" v-show="!family_info_show">
                      <label>有无子女：</label>
                      <span>{{scope.row.has_child}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入子女性别"
                      v-show="family_info_show"
                      v-model="scope.row.child_gender"
                    ></el-input>
                    <div class="item" v-show="!family_info_show">
                      <label>子女性别：</label>
                      <span>{{scope.row.child_gender}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input
                      placeholder="请输入子女姓名"
                      v-show="family_info_show"
                      v-model="scope.row.child_name"
                    ></el-input>
                    <div class="item" v-show="!family_info_show">
                      <label>子女姓名：</label>
                      <span>{{scope.row.child_name}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入子女出生日期"
                      v-show="family_info_show"
                      v-model="scope.row.child_born_date"
                    ></el-input>
                    <div class="item" v-show="!family_info_show">
                      <label>子女出生日期：</label>
                      <span>{{scope.row.child_born_date}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <!-- 个人材料 -->
            <div class="personal_material">
              <span class="txt">个人材料</span>
              <span class="line"></span>
              <span class="edit" @click="personal_material_show = true">编辑</span>
              <span
                class="save"
                @click="personal_material_show = false"
                v-show="personal_material_show"
              >保存</span>
            </div>

            <el-table :data="formData.tabledatas">
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input
                      placeholder="请输入身份证(人像面)"
                      v-show="personal_material_show"
                      v-model="scope.row.human_face_image"
                    ></el-input>
                    <div class="item" v-show="!personal_material_show">
                      <label>身份证(人像面)：</label>
                      <span>{{scope.row.human_face_image}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入学历证书"
                      v-show="personal_material_show"
                      v-model="scope.row.education_certificate_image"
                    ></el-input>
                    <div class="item" v-show="!personal_material_show">
                      <label>学历证书：</label>
                      <span>{{scope.row.education_certificate_image}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入离职证明"
                      v-show="personal_material_show"
                      v-model="scope.row.resign_certificate_image"
                    ></el-input>
                    <div class="item" v-show="!personal_material_show">
                      <label>离职证明：</label>
                      <span>{{scope.row.resign_certificate_image}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div class="table-item">
                    <el-input
                      placeholder="请输入身份证(国徽面)"
                      v-show="personal_material_show"
                      v-model="scope.row.national_emblem_image"
                    ></el-input>
                    <div class="item" v-show="!personal_material_show">
                      <label>身份证(国徽面)：</label>
                      <span>{{scope.row.national_emblem_image}}</span>
                    </div>
                  </div>

                  <div class="table-item">
                    <el-input
                      placeholder="请输入学位证书"
                      v-show="personal_material_show"
                      v-model="scope.row.degree_certificate_image"
                    ></el-input>
                    <div class="item" v-show="!personal_material_show">
                      <label>学位证书：</label>
                      <span>{{scope.row.degree_certificate_image}}</span>
                    </div>
                  </div>
                  <div class="table-item">
                    <el-input
                      placeholder="请输入员工照片"
                      v-show="personal_material_show"
                      v-model="scope.row.employee_image"
                    ></el-input>
                    <div class="item" v-show="!personal_material_show">
                      <label>员工照片：</label>
                      <span>{{scope.row.employee_image}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <!-- 历史薪资 -->
            <div class="salary_history">
              <span class="txt">历史薪资</span>
              <span class="line" style="width: 892px;"></span>
            </div>

            <el-table :data="tableData" style="width: 100%">
              <el-table-column fixed prop="date" label="日期" width="120"></el-table-column>
              <el-table-column prop="personal_income_tax" label="应扣个人所得税(￥)" width="180"></el-table-column>
              <el-table-column prop="salary" label="实发工资(￥)" width="120"></el-table-column>
              <el-table-column prop="first_salary" label="首发工资(￥)" width="120"></el-table-column>
              <el-table-column prop="performance_salary" label="绩效工资(￥)" width="120"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { validName, validEmail, validMobile } from "@/utils/validate";
export default {
  data() {
    const validateName = (rule, value, callback) => {
      if (!validName(value)) {
        callback(new Error("请输入正确的姓名"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    const validateMobile = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      formData: { // 基础信息
        tabledatas: [
          {
            name: "白白", // 姓名
            email: "bai@bai.com", // 邮箱
            departments: [
              { id: 1, name: "技术部" },
              { id: 2, name: "业务部" },
              { id: 3, name: "运营部" }
            ], // 部门
            department: "", // 部门value
            main_departments: [
              { id: 1, name: "篮球部" },
              { id: 2, name: "足球部" },
              { id: 3, name: "游泳部" }
            ], // 主部门
            mainDepartment: "", // 主部门value
            position: "前端", // 职位
            phone: "13559411110", // 手机号
            job_num: "11号", // 工号
            extension_num: "110", // 分机号
            office_location: "泉州", // 办公地点
            remarks: "备注", // 备注
            hire_date: "", // 入职时间
            job_year: "" // 司龄
          }
        ]
      },
      rules: {  // 基础信息验证
        name: [{ required: true, trigger: "blur", validator: validateName }],
        department: [
          { required: true, trigger: "blur", message: "请选择部门" }
        ],
        email: [{ required: true, trigger: "blur", validator: validateEmail }],
        mainDepartment: [
          { required: true, trigger: "blur", message: "请选择主部门" }
        ],
        position: [{ required: true, trigger: "blur", message: "请输入职位" }],
        phone: [{ required: true, trigger: "blur", validator: validateMobile }],
        job_num: [{ required: true, trigger: "blur", message: "请输入工号" }],
        extension_num: [
          { required: true, trigger: "blur", message: "请输入分机号" }
        ],
        office_location: [
          { required: true, trigger: "blur", message: "请输入办公地点" }
        ],
        remarks: [{ required: true, trigger: "blur", message: "请输入备注" }],
        hire_date: [
          { required: true, trigger: "blur", message: "请选择入职日期" }
        ],
        job_year: [{ required: true, trigger: "blur", message: "请输入司龄" }]
      },
      workData: { // 工作信息
        tabledatas: [
          {
            employee_types: [
              { id: 1, name: "无类型" },
              { id: 2, name: "全职" },
              { id: 3, name: "兼职" },
              { id: 4, name: "实习" },
              { id: 5, name: "劳务派遣" },
              { id: 6, name: "退休返聘" },
              { id: 7, name: "劳务外包" }
            ], // 员工类型
            employeeType: "",
            employee_status: [
              { id: 1, name: "试用" },
              { id: 2, name: "正式" }
            ], // 员工状态
            status: "",
            probation_periods: [
              { id: 1, name: "无试用期" },
              { id: 2, name: "1个月" },
              { id: 3, name: "2个月" },
              { id: 4, name: "3个月" },
              { id: 5, name: "4个月" },
              { id: 6, name: "5个月" },
              { id: 7, name: "6个月" },
              { id: 8, name: "其他" }
            ], // 试用期
            periods: "",
            formal_date: "2015-11-25", // 转正日期
            job_grade: "初级" // 岗位职级
          }
        ]
      },
      workRules: {  // 工作信息验证
        employeeType: [
          { required: true, trigger: "blur", message: "请选择员工类型" }
        ],
        status: [
          { required: true, trigger: "blur", message: "请选择员工状态" }
        ],
        periods: [{ required: true, trigger: "blur", message: "请选择试用期" }],
        formal_date: [
          { required: true, trigger: "blur", message: "请选择转正日期" }
        ],
        job_grade: [
          { required: true, trigger: "blur", message: "请选择岗位职级别" }
        ]
      },
      personalData: { // 个人信息
        tabledatas: [
          {
            name_in_id: "白白", // 身份证姓名
            id_card: "350582222202022022", // 证件号码
            born_date: "2022-02-22", // 出生日期
            age: 3, // 年龄
            gender: "男", // 性别
            nation: "汉族", // 民族
            id_card_address: "中国", // 身份证地址
            valid_until: "2022-02-22", // 证件有效期
            marriage: "未婚", // 婚姻情况
            first_working_time: "2022-02-22", // 首次参加工作时间
            work_year: "5年", // 工龄
            domicile_type: "农民", // 户籍类型
            address: "泉州", // 地址
            political: "党员", // 政治面貌
            social_insurance: "11111", // 个人社保账号
            accumulation_fund: "22222", // 个人公积金账号
            education: "本科", // 学历
            school: "泉州五中", // 毕业学校
            graduation_date: "2022-02-02", // 毕业时间
            major: "计算机", // 专业
            bank_card: "12345678910", // 银行卡号
            bank: "农行", // 开户行
            contract_compony: "触享", // 合同公司
            contract_type: "合同类型", // 合同类型
            first_contract_start_date: "2022-02-02", // 首次合同起始日
            first_contract_end_date: "2022-02-22", // 首次合同结束日
            now_contract_start_date: "2022-02-02", // 现合同起始日
            now_contract_end_date: "2022-02-22", // 现次合同结束日
            contract_period: "1年", // 合同期限
            renewal_num: 1, // 续约次数
            emergency_contact_person: "铁锤", // 紧急联系人
            contact_relationship: "同事", // 联系人关系
            contact_phone: "13559422222", // 联系电话
            has_child: "有", // 有无子女
            child_name: "铁锤妹妹", // 子女姓名
            child_gender: "女", // 子女性别
            child_born_date: "2022-02-22", // 子女出生日期
            human_face_image: "未上传", // 身份证(人像面)
            national_emblem_image: "未上传", // 身份证(国徽面)
            education_certificate_image: "未上传", // 学历证书
            degree_certificate_image: "未上传", // 学位证书
            resign_certificate_image: "未上传", // 离职证明
            employee_image: "未上传" // 员工照片
          }
        ]
      },
      personalRules: {  // 个人信息验证

      },
      base_info_show: false,
      work_info_show: false,
      personal_info_show: false,
      education_info_show: false,
      bank_info_show: false,
      contract_info_show: false,
      emergency_contact_show: false,
      family_info_show: false,
      personal_material_show: false,

      tableData: [
        {
          date: "2017-01-15",
          personal_income_tax: 230,
          salary: 4000,
          first_salary: 4000,
          performance_salary: 0
        },
        {
          date: "2017-02-15",
          personal_income_tax: 230,
          salary: 6000,
          first_salary: 6000,
          performance_salary: 0
        },
        {
          date: "2017-03-15",
          personal_income_tax: 230,
          salary: 6000,
          first_salary: 6000,
          performance_salary: 0
        },
        {
          date: "2017-04-15",
          personal_income_tax: 230,
          salary: 6000,
          first_salary: 6000,
          performance_salary: 0
        },
        {
          date: "2017-05-15",
          personal_income_tax: 230,
          salary: 6000,
          first_salary: 6000,
          performance_salary: 0
        },
        {
          date: "2017-06-15",
          personal_income_tax: 230,
          salary: 6000,
          first_salary: 6000,
          performance_salary: 0
        },
        {
          date: "2017-07-15",
          personal_income_tax: 230,
          salary: 6000,
          first_salary: 6000,
          performance_salary: 0
        },
        {
          date: "2017-08-15",
          personal_income_tax: 230,
          salary: 6000,
          first_salary: 6000,
          performance_salary: 0
        },
        {
          date: "2017-09-15",
          personal_income_tax: 230,
          salary: 6000,
          first_salary: 6000,
          performance_salary: 0
        }
      ]
    };
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 选择部门
    selectDepartment(e) {
      console.log("选择部门", e);
      this.formData.tabledatas[0].department = e;
    },
    // 选择主部门
    selectMainDepartment(e) {
      this.formData.tabledatas[0].mainDepartment = e;
      console.log("选择主部门", e);
    },
    // 选择员工类型
    selectEmployeeType(e) {
      console.log("选择员工类型", e);
    },
    // 选择员工状态
    selectemployeeStatus(e) {
      console.log("选择员工状态", e);
    },
    // 选择试用期
    selectPeriods(e) {
      console.log("选择试用期", e);
    },
    // 选择转正日期
    selectFormalDate(e) {
      console.log("选择转正日期", e);
    },
    // 选择入职时间
    selectHireDate(date) {
      this.formData.tabledatas[0].hire_date = date;
      console.log("选择入职时间", date);
      const dateNow = new Date();
      const data = this.dateDiff(date, dateNow);
      this.formData.tabledatas[0].job_year = `${Math.floor(data / 12)}年${data %
        12}个月`;
      console.log(this.formData.tabledatas[0].job_year);
    },
    // 计算相距日期
    dateDiff(date1, date2, type) {
      date1 = typeof date1 == "string" ? new Date(date1) : date1;
      date1 = date1.getTime();
      date2 = typeof date2 == "string" ? new Date(date2) : date2;
      date2 = date2.getTime();
      type = type || "month";
      var diffValue = Math.abs(date2 - date1);
      var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        month = day * 30,
        year = month * 12;
      var timeType = {
        second: second,
        minute: minute,
        hour: hour,
        day: day,
        month: month,
        year: year
      };

      return Math.ceil(diffValue / timeType[type]);
    },

    // 基础信息保存验证
    saveBaseInfo() {
      this.$refs.formData.validate(valid => {
        console.log("valid", valid);
        if (valid) {
          this.base_info_show = false;
        }
      });
    },

    // 工作信息保存验证
    workBaseInfo() {
      this.$refs.workData.validate(valid => {
        console.log("valid", valid);
        if (valid) {
          this.work_info_show = false;
        }
      });
    }
  }
};
</script>

<style>
.el-table td,
.el-table th.is-leaf {
  border-bottom: none;
}
.el-table__row {
  border: none;
}
</style>

<style lang="scss" scoped>
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
          .system-info {
            margin-bottom: 75px;
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

          .base_info,
          .work_info,
          .personal_info,
          .education_info,
          .contract_info,
          .emergency_contact,
          .personal_material,
          .salary_history {
            display: flex;
            align-items: center;
            .txt {
              display: inline-block;
              margin-right: 13px;
              color: #303133;
              font-size: 21px;
              font-weight: 600;
            }
            .line {
              width: 841px;
              height: 1px;
              display: inline-block;
              background-color: #ebebeb;
            }
            .edit,
            .save {
              color: #409eff;
              font-size: 19px;
              font-weight: 600;
              margin-left: 10px;
            }
          }
          .work_info,
          .personal_info,
          .education_info,
          .contract_info,
          .emergency_contact,
          .personal_material,
          .salary_history {
            margin-top: 75px;
          }
          .salary_history {
            margin-bottom: 48px;
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

>>> .el-select {
  width: 100%;
}
>>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>