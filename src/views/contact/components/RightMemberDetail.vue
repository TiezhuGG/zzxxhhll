<template>
  <div class="right-new-member">
    <el-container>
      <el-header style="text-align: left; font-size: 24px; color: #303133">个人档案</el-header>
      <el-main v-if="userinfo">
        <Steps
          class="steps"
          @change="handleStep"
          :step-active="stepActive"
          :steps-list="stepsList"
        />
        <div class="member">
          <!-- 头部信息 -->
          <div class="member-header">
            <el-upload
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :before-upload="beforeUpload"
              :data="imageData"
              :show-file-list="false"
              :on-success="handleAvatar"
            >
              <img
                v-if="userinfo.avatar"
                class="logo"
                :src="userinfo.avatar ? userinfo.avatar : ''"
              />
              <div class="logo no-avatar" v-else>{{ userinfo.real_name.substr(-2) }}</div>
            </el-upload>
            <div class="member-name">
              <span class="name">{{ userinfo.real_name }}</span>
              <span
                class="regular"
                :class="userinfo.profile && userinfo.profile.work_status === '离职' ? 'quit' : ''"
              >{{ userinfo.profile ? userinfo.profile.work_status : ''}}</span>
              <!-- <span class="regular">{{ userinfo.profile.work_status === 1 ? '正式' : (userinfo.profile.work_status === 2 ? '试用' : '离职') }}</span> -->
              <span
                :class="userinfo.is_auth === 1 ? 'auth-yes' : 'auth-no'"
              >{{ userinfo.is_auth === 1 ? "已授权实人认证" : "未授权实人认证" }}</span>
            </div>
            <div class="member-department">
              <span
                class="department-name"
              >{{ userinfo.department ? userinfo.department.name : '' }}</span>
              <span class="main-department">主部门</span>
            </div>
            <span class="position">{{ userinfo.post ? userinfo.post.name : '' }}</span>
            <span
              class="introduce"
            >在{{ company_name }}工作了{{ userinfo ? userinfo.company_age : ''}}年</span>
          </div>

          <div class="member-detail-infos">
            <!-- 基础信息 -->
            <div class="base_info" id="base_info">
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
                          disabled
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!base_info_show">
                        <label>姓名：</label>
                        <span>{{ scope.row.name }}</span>
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
                          disabled
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
                          :disabled="userinfo.email ? true: false"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!base_info_show">
                        <label>邮箱：</label>
                        <span>{{scope.row.email}}</span>
                      </div>
                    </div>
                    <!-- <div class="table-item">
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
                    </div>-->
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.phone'"
                        :rules="rules.phone"
                      >
                        <el-input
                          placeholder="请输入手机号"
                          type="number"
                          v-show="base_info_show"
                          v-model="scope.row.phone"
                          disabled
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
                    <div class="table-item" :class="base_info_show ? 'mb-space-1-2' : 'mb-space-1-1'" >
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.job_year'"
                        :rules="rules.job_year"
                      >
                        <el-input
                          placeholder="请输入司龄"
                          v-show="base_info_show"
                          v-model="scope.row.job_year"
                          disabled
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
            <div class="work_info" id="work_info">
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
                        placeholder="请输入岗位职级"
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
                    <div class="table-item" :class="work_info_show ? 'mb-space-1' : 'mb-space-0'">
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
            <div class="personal_info" id="personal_info">
              <span class="txt">个人信息</span>
              <span class="line"></span>
              <span class="edit" @click="personal_info_show = true">编辑</span>
              <span class="save" @click="personalBaseInfo" v-show="personal_info_show">保存</span>
            </div>

            <el-form :model="personalData" ref="personalData" :rules="personalRules">
              <el-table :data="personalData.tabledatas">
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.name_in_id'"
                        :rules="personalRules.name_in_id"
                      >
                        <el-input
                          placeholder="请输入身份证姓名"
                          v-show="personal_info_show"
                          v-model="scope.row.name_in_id"
                          disabled
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>身份证姓名：</label>
                        <span>{{scope.row.name_in_id}}</span>
                      </div>
                    </div>

                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.born_date'"
                        :rules="personalRules.born_date"
                      >
                        <el-date-picker
                          v-model="scope.row.born_date"
                          v-show="personal_info_show"
                          type="date"
                          placeholder="请选择出生日期"
                          value-format="yyyy-MM-dd"
                          @change="selectBornDate"
                        ></el-date-picker>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>出生日期：</label>
                        <span>{{scope.row.born_date}}</span>
                      </div>
                    </div>

                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.gender'"
                        :rules="personalRules.gender"
                      >
                        <el-select
                          v-show="personal_info_show"
                          v-model="scope.row.gender"
                          @change="selectGender"
                          placeholder="请选择性别"
                        >
                          <el-option
                            v-for="item in personalData.tabledatas[0].genderList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>性别：</label>
                        <span>{{scope.row.gender}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.id_card_address'"
                        :rules="personalRules.id_card_address"
                      >
                        <el-input
                          placeholder="请输入身份证地址"
                          v-show="personal_info_show"
                          v-model="scope.row.id_card_address"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>身份证地址：</label>
                        <span>{{scope.row.id_card_address}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.marriage'"
                        :rules="personalRules.marriage"
                      >
                        <el-select
                          v-show="personal_info_show"
                          v-model="scope.row.marriage"
                          @change="selectMarriage"
                          placeholder="请选择婚姻情况"
                        >
                          <el-option
                            v-for="item in personalData.tabledatas[0].marriageList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>婚姻情况：</label>
                        <span>{{scope.row.marriage}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.work_year'"
                        :rules="personalRules.work_year"
                      >
                        <el-input
                          placeholder="请输入工龄"
                          v-show="personal_info_show"
                          v-model="scope.row.work_year"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>工龄：</label>
                        <span>{{scope.row.work_year}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.political'"
                        :rules="personalRules.political"
                      >
                        <el-select
                          v-show="personal_info_show"
                          v-model="scope.row.political"
                          @change="selectPolitical"
                          placeholder="请选择政治面貌"
                        >
                          <el-option
                            v-for="item in personalData.tabledatas[0].politicalList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>政治面貌：</label>
                        <span>{{scope.row.political}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.social_insurance'"
                        :rules="personalRules.social_insurance"
                      >
                        <el-input
                          placeholder="请输入个人社保账号"
                          v-show="personal_info_show"
                          v-model="scope.row.social_insurance"
                        ></el-input>
                      </el-form-item>
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
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.id_card'"
                        :rules="personalRules.id_card"
                      >
                        <el-input
                          placeholder="请输入身份证号码"
                          v-show="personal_info_show"
                          v-model="scope.row.id_card"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>证件号码：</label>
                        <span>{{scope.row.id_card}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.age'"
                        :personalRules="rules.age"
                      >
                        <el-input
                          type="number"
                          placeholder="请输入年龄"
                          v-show="personal_info_show"
                          v-model="scope.row.age"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>年龄：</label>
                        <span>{{scope.row.age}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.nation'"
                        :rules="personalRules.nation"
                      >
                        <el-select
                          v-show="personal_info_show"
                          v-model="scope.row.nation"
                          @change="selectNation"
                          placeholder="请选择民族"
                        >
                          <el-option
                            v-for="item in personalData.tabledatas[0].nationList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>民族：</label>
                        <span>{{scope.row.nation}}</span>
                      </div>
                    </div>

                    <div class="table-item">
                      <!-- <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.valid_until'"
                        :personalRules="rules.valid_until"
                      >
                        <el-input
                          placeholder="请输入证件有效期"
                          v-show="personal_info_show"
                          v-model="scope.row.valid_until"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>证件有效期：</label>
                        <span>{{scope.row.valid_until}}</span>
                      </div> -->
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.valid_until'"
                        :rules="personalRules.valid_until"
                      >
                        <el-date-picker
                          v-model="scope.row.valid_until"
                          v-show="personal_info_show"
                          type="date"
                          placeholder="请选择证件有效期"
                          value-format="yyyy-MM-dd"
                        ></el-date-picker>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>证件有效期：</label>
                        <span>{{scope.row.valid_until}}</span>
                      </div>
                    </div>

                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.first_working_time'"
                        :rules="personalRules.first_working_time"
                      >
                        <el-date-picker
                          v-model="scope.row.first_working_time"
                          v-show="personal_info_show"
                          type="date"
                          placeholder="请选择首次参加工作时间"
                          value-format="yyyy-MM-dd"
                          @change="selectFirstWorkingTime"
                        ></el-date-picker>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>首次参加工作时间：</label>
                        <span>{{scope.row.first_working_time}}</span>
                      </div>
                    </div>

                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.domicile_type'"
                        :rules="personalRules.domicile_type"
                      >
                        <el-select
                          v-show="personal_info_show"
                          v-model="scope.row.domicile_type"
                          @change="selectDomicileType"
                          placeholder="请选择户籍类型"
                        >
                          <el-option
                            v-for="item in personalData.tabledatas[0].domicileList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>户籍类型：</label>
                        <span>{{scope.row.domicile_type}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.address'"
                        :rules="personalRules.address"
                      >
                        <el-input
                          placeholder="请输入住址"
                          v-show="personal_info_show"
                          v-model="scope.row.address"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>住址：</label>
                        <span>{{scope.row.address}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.accumulation_fund'"
                        :rules="personalRules.accumulation_fund"
                      >
                        <el-input
                          placeholder="请输入个人公积金账号"
                          v-show="personal_info_show"
                          v-model="scope.row.accumulation_fund"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!personal_info_show">
                        <label>个人公积金账号：</label>
                        <span>{{scope.row.accumulation_fund}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>

            <!-- 学历信息 -->
            <div class="education_info" id="education_info">
              <span class="txt">学历信息</span>
              <span class="line"></span>
              <span class="edit" @click="education_info_show = true">编辑</span>
              <span class="save" @click="educationBaseInfo" v-show="education_info_show">保存</span>
            </div>

            <el-form :model="educationData" ref="educationData" :rules="educationRules">
              <el-table :data="educationData.tabledatas">
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.education'"
                        :rules="educationRules.education"
                      >
                        <el-select
                          v-show="education_info_show"
                          v-model="scope.row.education"
                          @change="selectEducation"
                          placeholder="请选择学历"
                        >
                          <el-option
                            v-for="item in educationData.tabledatas[0].educationList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="item" v-show="!education_info_show">
                        <label>学历：</label>
                        <span>{{scope.row.education}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.graduation_date'"
                        :rules="educationRules.graduation_date"
                      >
                        <el-date-picker
                          v-model="scope.row.graduation_date"
                          v-show="education_info_show"
                          type="date"
                          placeholder="请选择毕业时间"
                          value-format="yyyy-MM-dd"
                          @change="selectGraduationDate"
                        ></el-date-picker>
                      </el-form-item>
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
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.school'"
                        :rules="educationRules.school"
                      >
                        <el-input
                          placeholder="请输入毕业院校"
                          v-show="education_info_show"
                          v-model="scope.row.school"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!education_info_show">
                        <label>毕业院校：</label>
                        <span>{{scope.row.school}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.major'"
                        :rules="educationRules.major"
                      >
                        <el-input
                          placeholder="请输入所学专业"
                          v-show="education_info_show"
                          v-model="scope.row.major"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!education_info_show">
                        <label>所学专业：</label>
                        <span>{{scope.row.major}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>

            <!-- 银行卡信息 -->
            <div class="education_info" id="bank_info">
              <span class="txt">银行卡信息</span>
              <span class="line" style="width:618px;"></span>
              <span class="edit" @click="bank_info_show = true">编辑</span>
              <span class="save" @click="bankBaseInfo" v-show="bank_info_show">保存</span>
            </div>

            <el-form :model="bankData" ref="bankData" :rules="bankRules">
              <el-table :data="bankData.tabledatas">
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.bank_card'"
                        :rules="bankRules.bank_card"
                      >
                        <el-input
                          placeholder="请输入银行卡号"
                          v-show="bank_info_show"
                          v-model="scope.row.bank_card"
                        ></el-input>
                      </el-form-item>
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
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.bank'"
                        :rules="bankRules.bank"
                      >
                        <el-input
                          placeholder="请输入开户行"
                          v-show="bank_info_show"
                          v-model="scope.row.bank"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!bank_info_show">
                        <label>开户行：</label>
                        <span>{{scope.row.bank}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>

            <!-- 合同信息 -->
            <div class="contract_info" id="contract_info">
              <span class="txt">合同信息</span>
              <span class="line"></span>
              <span class="edit" @click="contract_info_show = true">编辑</span>
              <span class="save" @click="contractBaseInfo" v-show="contract_info_show">保存</span>
            </div>

            <el-form :model="contractData" ref="contractData" :rules="contractRules">
              <el-table :data="contractData.tabledatas">
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.contract_compony'"
                        :rules="contractRules.contract_compony"
                      >
                        <el-input
                          placeholder="请输入合同公司"
                          v-show="contract_info_show"
                          v-model="scope.row.contract_compony"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!contract_info_show">
                        <label>合同公司：</label>
                        <span>{{scope.row.contract_compony}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.first_contract_start_date'"
                        :rules="contractRules.first_contract_start_date"
                      >
                        <el-date-picker
                          v-model="scope.row.first_contract_start_date"
                          v-show="contract_info_show"
                          type="date"
                          placeholder="请选择首次合同起始日"
                          value-format="yyyy-MM-dd"
                          @change="selectFirstContractStartDate"
                        ></el-date-picker>
                      </el-form-item>
                      <div class="item" v-show="!contract_info_show">
                        <label>首次合同起始日：</label>
                        <span>{{scope.row.first_contract_start_date}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.now_contract_start_date'"
                        :rules="contractRules.now_contract_start_date"
                      >
                        <el-date-picker
                          v-model="scope.row.now_contract_start_date"
                          v-show="contract_info_show"
                          type="date"
                          placeholder="请选择现合同起始日"
                          value-format="yyyy-MM-dd"
                          @change="selectNowContractStartDate"
                        ></el-date-picker>
                      </el-form-item>
                      <div class="item" v-show="!contract_info_show">
                        <label>现合同起始日：</label>
                        <span>{{scope.row.now_contract_start_date}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <!-- <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.contract_period'"
                        :rules="contractRules.contract_period"
                      >
                        <el-input
                          placeholder="请输入合同期限"
                          v-show="contract_info_show"
                          v-model="scope.row.contract_period"
                        ></el-input>
                      </el-form-item> -->
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.contract_period'"
                        :rules="contractRules.contract_period"
                      >
                        <el-date-picker
                          v-model="scope.row.contract_period"
                          v-show="contract_info_show"
                          type="date"
                          placeholder="请选择合同期限"
                          value-format="yyyy-MM-dd"
                        ></el-date-picker>
                      </el-form-item>
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
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.contract_type'"
                        :rules="contractRules.contract_type"
                      >
                        <el-select
                          v-show="contract_info_show"
                          v-model="scope.row.contract_type"
                          @change="selectContractType"
                          placeholder="请选择合同类型"
                        >
                          <el-option
                            v-for="item in contractData.tabledatas[0].contractList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="item" v-show="!contract_info_show">
                        <label>合同类型：</label>
                        <span>{{scope.row.contract_type}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.first_contract_end_date'"
                        :rules="contractRules.first_contract_end_date"
                      >
                        <el-date-picker
                          v-model="scope.row.first_contract_end_date"
                          v-show="contract_info_show"
                          type="date"
                          placeholder="请选择首次合同到期日"
                          value-format="yyyy-MM-dd"
                          @change="selectFirstContractEndDate"
                        ></el-date-picker>
                      </el-form-item>
                      <div class="item" v-show="!contract_info_show">
                        <label>首次合同到期日：</label>
                        <span>{{scope.row.first_contract_end_date}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.now_contract_end_date'"
                        :rules="contractRules.now_contract_end_date"
                      >
                        <el-date-picker
                          v-model="scope.row.now_contract_end_date"
                          v-show="contract_info_show"
                          type="date"
                          placeholder="请选择现合同到期日"
                          value-format="yyyy-MM-dd"
                          @change="selectNowContractEndDate"
                        ></el-date-picker>
                      </el-form-item>
                      <div class="item" v-show="!contract_info_show">
                        <label>现合同到期日：</label>
                        <span>{{scope.row.now_contract_end_date}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.renewal_num'"
                        :rules="contractRules.renewal_num"
                      >
                        <el-input
                          placeholder="请输入续签次数"
                          v-show="contract_info_show"
                          v-model="scope.row.renewal_num"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!contract_info_show">
                        <label>续签次数：</label>
                        <span>{{scope.row.renewal_num}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>

            <!-- 紧急联系人 -->
            <div class="emergency_contact" id="emergency_contact">
              <span class="txt">紧急联系人</span>
              <span class="line" style="width:618px;"></span>
              <span class="edit" @click="emergency_contact_show = true">编辑</span>
              <span class="save" @click="emergencyBaseInfo" v-show="emergency_contact_show">保存</span>
            </div>

            <el-form :model="emergencyData" ref="emergencyData" :rules="emergencyRules">
              <el-table :data="emergencyData.tabledatas">
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.emergency_contact_person'"
                        :rules="emergencyRules.emergency_contact_person"
                      >
                        <el-input
                          placeholder="请输入紧急联系人姓名"
                          v-show="emergency_contact_show"
                          v-model="scope.row.emergency_contact_person"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!emergency_contact_show">
                        <label>紧急联系人姓名：</label>
                        <span>{{scope.row.emergency_contact_person}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.contact_phone'"
                        :rules="emergencyRules.contact_phone"
                      >
                        <el-input
                          placeholder="请输入联系电话"
                          v-show="emergency_contact_show"
                          v-model="scope.row.contact_phone"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!emergency_contact_show">
                        <label>联系电话：</label>
                        <span>{{scope.row.contact_phone}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="table-item" :class="emergency_contact_show ? 'mb-space-1-3' : 'mb-space-1-1'">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.contact_relationship'"
                        :rules="emergencyRules.contact_relationship"
                      >
                        <el-select
                          v-show="emergency_contact_show"
                          v-model="scope.row.contact_relationship"
                          @change="selectContactRelationship"
                          placeholder="请选择联系人关系"
                        >
                          <el-option
                            v-for="item in emergencyData.tabledatas[0].relationship"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="item" v-show="!emergency_contact_show">
                        <label>联系人关系：</label>
                        <span>{{scope.row.contact_relationship}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>

            <!-- 家庭信息 -->
            <div class="education_info" id="family_info">
              <span class="txt">家庭信息</span>
              <span class="line"></span>
              <span class="edit" @click="family_info_show = true">编辑</span>
              <span class="save" @click="familyBaseInfo" v-show="family_info_show">保存</span>
            </div>

            <el-form :model="familyData" ref="familyData" :rules="familyRules">
              <el-table :data="familyData.tabledatas">
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.has_child'"
                        :rules="familyRules.has_child"
                      >
                        <el-select
                          v-show="family_info_show"
                          v-model="scope.row.has_child"
                          @change="selecthasChild"
                          placeholder="请选择有无子女"
                        >
                          <el-option
                            v-for="item in familyData.tabledatas[0].hasChildList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="item" v-show="!family_info_show">
                        <label>有无子女：</label>
                        <span>{{scope.row.has_child}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.child_gender'"
                        :rules="familyRules.child_gender"
                      >
                        <el-select
                          v-show="family_info_show"
                          v-model="scope.row.child_gender"
                          @change="selectChildGender"
                          placeholder="请选择子女性别"
                        >
                          <el-option
                            v-for="item in familyData.tabledatas[0].childGenderList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
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
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.child_name'"
                        :rules="familyRules.child_name"
                      >
                        <el-input
                          placeholder="请输入子女姓名"
                          v-show="family_info_show"
                          v-model="scope.row.child_name"
                        ></el-input>
                      </el-form-item>
                      <div class="item" v-show="!family_info_show">
                        <label>子女姓名：</label>
                        <span>{{scope.row.child_name}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-form-item
                        :prop="'tabledatas.' + scope.$index + '.child_born_date'"
                        :rules="familyRules.child_born_date"
                      >
                        <el-date-picker
                          v-model="scope.row.child_born_date"
                          v-show="family_info_show"
                          type="date"
                          placeholder="请选择子女出生日期"
                          value-format="yyyy-MM-dd"
                          @change="selectChildBornDate"
                        ></el-date-picker>
                      </el-form-item>
                      <div class="item" v-show="!family_info_show">
                        <label>子女出生日期：</label>
                        <span>{{scope.row.child_born_date}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>

            <!-- 个人材料 -->
            <div class="personal_material" id="personal_material">
              <span class="txt">个人材料</span>
              <span class="line"></span>
              <span class="edit" @click="personal_material_show = true">编辑</span>
              <span
                class="save"
                @click="personalMaterialBaseInfo"
                v-show="personal_material_show"
              >保存</span>
            </div>

            <el-form
              :model="personalMaterialData"
              ref="personalMaterialData"
              :rules="personalMaterialRules"
            >
              <el-table class="image-upload" :data="personalMaterialData.tabledatas">
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="table-item">
                      <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :data="imageData"
                        :before-upload="beforeUpload"
                        :show-file-list="false"
                        :on-success="handleIdFaceImg"
                        v-show="personal_material_show"
                      >
                        <img v-if="idFaceImg" :src="idFaceImg" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <div class="item" v-show="!personal_material_show">
                        <label :class="idFaceImg ? 'mt' : ''">身份证(人像面)：</label>
                        <img v-if="idFaceImg" :src="idFaceImg" class="avatar" />
                        <span v-else>{{ scope.row.human_face_image}}</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :before-upload="beforeUpload"
                        :data="imageData"
                        :show-file-list="false"
                        :on-success="handleEducationImg"
                        v-show="personal_material_show"
                      >
                        <img v-if="educationImg" :src="educationImg" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <div class="item" v-show="!personal_material_show">
                        <label :class="educationImg ? 'mt' : ''">学历证书：</label>
                        <img v-if="educationImg" :src="educationImg" class="avatar" />
                        <span v-else>未上传</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :before-upload="beforeUpload"
                        :data="imageData"
                        :show-file-list="false"
                        :on-success="handleCertificateImg"
                        v-show="personal_material_show"
                      >
                        <img v-if="certificateImg" :src="certificateImg" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <div class="item" v-show="!personal_material_show">
                        <label :class="certificateImg ? 'mt' : ''">离职证明：</label>
                        <img v-if="certificateImg" :src="certificateImg" class="avatar" />
                        <span v-else>未上传</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="table-item">
                      <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :before-upload="beforeUpload"
                        :data="imageData"
                        :show-file-list="false"
                        :on-success="handleIdbackImg"
                        v-show="personal_material_show"
                      >
                        <img v-if="idBackImg" :src="idBackImg" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <div class="item" v-show="!personal_material_show">
                        <label :class="idBackImg ? 'mt' : ''">身份证(国徽面)：</label>
                        <img v-if="idBackImg" :src="idBackImg" class="avatar" />
                        <span v-else>{{ scope.row.national_emblem_image }}</span>
                      </div>
                    </div>

                    <div class="table-item">
                      <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :before-upload="beforeUpload"
                        :data="imageData"
                        :show-file-list="false"
                        :on-success="handleDegreeImg"
                        v-show="personal_material_show"
                      >
                        <img v-if="degreeImg" :src="degreeImg" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <div class="item" v-show="!personal_material_show">
                        <label :class="degreeImg ? 'mt' : ''">学位证书：</label>
                        <img v-if="degreeImg" :src="degreeImg" class="avatar" />
                        <span v-else>未上传</span>
                      </div>
                    </div>
                    <div class="table-item">
                      <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :before-upload="beforeUpload"
                        :data="imageData"
                        :show-file-list="false"
                        :on-success="handleEmployeeImg"
                        v-show="personal_material_show"
                      >
                        <img v-if="employeeImg" :src="employeeImg" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <div class="item" v-show="!personal_material_show">
                        <label :class="employeeImg ? 'mt' : ''">员工照片：</label>
                        <img v-if="employeeImg" :src="employeeImg" class="avatar" />
                        <span v-else>未上传</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>

            <!-- 历史薪资 -->
            <div class="salary_history" id="salary_history">
              <span class="txt">历史薪资</span>
              <span class="line"></span>
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
import {
  validName,
  validEmail,
  validMobile,
  validIdcard
} from "@/utils/validate";
import Steps from "./Steps";
import { getDeparments, getUserinfo, changeInfo, changeProfileInfo, imageUpload} from "@/api/user";

export default {
  props: ["memberId"],
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
    const validateIdcard = (rule, value, callback) => {
      if (!validIdcard(value)) {
        callback(new Error("请输入正确的身份证号码"));
      } else {
        callback();
      }
    };
    return {
      userinfo: null,
      imageData: {
        company_id: null,
        image: null
      },
      company_name: null,
      stepsList: [
        {
          name: "基础信息"
        },
        {
          name: "工作信息"
        },
        {
          name: "个人信息"
        },
        {
          name: "学历信息"
        },
        {
          name: "银行卡信息"
        },
        {
          name: "合同信息"
        },
        {
          name: "紧急联系人"
        },
        {
          name: "家庭信息"
        },
        {
          name: "个人材料"
        },
        {
          name: "历史薪资"
        }
      ],
      formData: {
        // 基础信息
        tabledatas: [
          {
            name: "", // 姓名
            email: "", // 邮箱
            departments: [
              // { id: 1, name: "技术部" },
              // { id: 2, name: "业务部" },
              // { id: 3, name: "运营部" }
            ], // 部门
            department: "", // 部门value
            main_departments: [
              // { id: 1, name: "篮球部" },
              // { id: 2, name: "足球部" },
              // { id: 3, name: "游泳部" }
            ], // 主部门
            mainDepartment: "", // 主部门value
            position: "", // 职位
            phone: "", // 手机号
            job_num: "", // 工号
            extension_num: "", // 分机号
            office_location: "", // 办公地点
            remarks: "", // 备注
            hire_date: "", // 入职时间
            job_year: "" // 司龄
          }
        ]
      },
      rules: {
        // 基础信息验证
        name: [{ trigger: "blur", validator: validateName }]
        // email: [{ trigger: "blur", validator: validateEmail }],
        // phone: [{ trigger: "blur", validator: validateMobile }]
        // department: [
        //   { required: true, trigger: "change", message: "请选择部门" }
        // ],
        // mainDepartment: [
        //   { required: true, trigger: "change", message: "请选择主部门" }
        // ],
        // position: [{ required: true, trigger: "blur", message: "请输入职位" }],
        // job_num: [{ required: true, trigger: "blur", message: "请输入工号" }],
        // extension_num: [
        //   { required: true, trigger: "blur", message: "请输入分机号" }
        // ],
        // office_location: [
        //   { required: true, trigger: "blur", message: "请输入办公地点" }
        // ],
        // remarks: [{ required: true, trigger: "blur", message: "请输入备注" }],
        // hire_date: [
        //   { required: true, trigger: "blur", message: "请选择入职日期" }
        // ],
        // job_year: [{ required: true, trigger: "blur", message: "请输入司龄" }]
      },
      workData: {
        // 工作信息
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
              { id: 2, name: "正式" },
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
            formal_date: "", // 转正日期
            job_grade: "" // 岗位职级
          }
        ]
      },
      workRules: {
        // 工作信息验证
        // employeeType: [
        //   { required: true, trigger: "change", message: "请选择员工类型" }
        // ],
        // status: [
        //   { required: true, trigger: "change", message: "请选择员工状态" }
        // ],
        // periods: [
        //   { required: true, trigger: "change", message: "请选择试用期" }
        // ],
        // formal_date: [
        //   { required: true, trigger: "blur", message: "请选择转正日期" }
        // ],
        // job_grade: [
        //   { required: true, trigger: "blur", message: "请输入岗位职级别" }
        // ]
      },
      personalData: {
        // 个人信息
        tabledatas: [
          {
            name_in_id: "", // 身份证姓名
            id_card: "", // 证件号码
            born_date: "", // 出生日期
            age: "", // 年龄
            genderList: [
              { id: 1, name: "男" },
              { id: 2, name: "女" }
            ],
            gender: "", // 性别
            nation: "", // 民族
            nationList: [
              { id: 1, name: "汉族" },
              { id: 2, name: "满族" },
              { id: 3, name: "蒙古族" },
              { id: 4, name: "回族" },
              { id: 5, name: "藏族" },
              { id: 6, name: "维吾尔族" },
              { id: 7, name: "苗族" },
              { id: 8, name: "彝族" },
              { id: 9, name: "壮族" },
              { id: 10, name: "布依族" },
              { id: 11, name: "侗族" },
              { id: 12, name: "瑶族" },
              { id: 13, name: "白族" },
              { id: 14, name: "土家族" },
              { id: 15, name: "哈尼族" },
              { id: 16, name: "哈萨克族" },
              { id: 17, name: "傣族" },
              { id: 18, name: "黎族" },
              { id: 19, name: "傈僳族" },
              { id: 20, name: "佤族" },
              { id: 21, name: "畲族" },
              { id: 22, name: "高山族" },
              { id: 23, name: "拉祜族" },
              { id: 24, name: "水族" },
              { id: 25, name: "东乡族" },
              { id: 26, name: "纳西族" },
              { id: 27, name: "景颇族" },
              { id: 28, name: "柯尔克孜族" },
              { id: 29, name: "土族" },
              { id: 30, name: "达斡尔族" },
              { id: 31, name: "仫佬族" },
              { id: 32, name: "羌族" },
              { id: 33, name: "布朗族" },
              { id: 34, name: "撒拉族" },
              { id: 35, name: "毛南族" },
              { id: 36, name: "仡佬族" },
              { id: 37, name: "锡伯族" },
              { id: 38, name: "阿昌族" },
              { id: 39, name: "普米族" },
              { id: 40, name: "朝鲜族" },
              { id: 41, name: "塔吉克族" },
              { id: 42, name: "怒族" },
              { id: 43, name: "乌孜别克族" },
              { id: 44, name: "俄罗斯族" },
              { id: 45, name: "鄂温克族" },
              { id: 46, name: "德昂族" },
              { id: 47, name: "保安族" },
              { id: 48, name: "裕固族" },
              { id: 49, name: "京族" },
              { id: 50, name: "塔塔尔族" },
              { id: 51, name: "独龙族" },
              { id: 52, name: "鄂伦春族" },
              { id: 53, name: "赫哲族" },
              { id: 54, name: "门巴族" },
              { id: 55, name: "珞巴族" },
              { id: 56, name: "基诺族" }
            ],
            id_card_address: "", // 身份证地址
            valid_until: "", // 证件有效期
            marriage: "", // 婚姻情况
            marriageList: [
              { id: 1, name: "未婚" },
              { id: 2, name: "已婚" },
              { id: 3, name: "离异" },
              { id: 4, name: "丧偶" },
              { id: 5, name: "分居" }
            ],
            first_working_time: "", // 首次参加工作时间
            work_year: "", // 工龄
            domicile_type: "", // 户籍类型
            domicileList: [
              { id: 1, name: "本地城镇" },
              { id: 2, name: "本地农村" },
              { id: 3, name: "外地城镇(省内)" },
              { id: 4, name: "外地城镇(省外)" },
              { id: 5, name: "外地农村(省内)" },
              { id: 6, name: "外地农村(省外)" }
            ],
            address: "", // 地址
            political: "", // 政治面貌
            politicalList: [
              { id: 1, name: "群众" },
              { id: 2, name: "党员" },
              { id: 3, name: "团员" },
              { id: 4, name: "其他" }
            ],
            social_insurance: "", // 个人社保账号
            accumulation_fund: "" // 个人公积金账号
          }
        ]
      },
      personalRules: {
        // 个人信息验证
        id_card: [
          { required: true, trigger: "blur", validator: validateIdcard }
        ]
        // name_in_id: [
        //   { required: true, trigger: "blur", message: "请输入身份证姓名" }
        // ],
        // born_date: [
        //   { required: true, trigger: "change", message: "请选择出生日期" }
        // ],
        // age: [
        //   {
        //     required: true,
        //     max: 150,
        //     min: 1,
        //     trigger: "blur",
        //     message: "请输入正确年龄"
        //   }
        // ],
        // gender: [{ required: true, trigger: "change", message: "请选择性别" }],
        // nation: [{ required: true, trigger: "change", message: "请选择民族" }],
        // id_card_address: [
        //   { required: true, trigger: "blur", message: "请输入身份证地址" }
        // ],
        // valid_until: [
        //   { required: true, trigger: "blur", message: "请输入证件有效期" }
        // ],
        // marriage: [
        //   { required: true, trigger: "change", message: "请选择婚姻情况" }
        // ],
        // first_working_time: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请选择首次参加工作时间"
        //   }
        // ],
        // domicile_type: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请选择户籍类型"
        //   }
        // ],
        // address: [{ required: true, trigger: "blur", message: "请输入住址" }],
        // political: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请选择户籍类型"
        //   }
        // ],
        // social_insurance: [
        //   { required: true, trigger: "blur", message: "请输入个人社保账号" }
        // ],
        // accumulation_fund: [
        //   { required: true, trigger: "blur", message: "请输入个人公积金账号" }
        // ]
      },
      educationData: {
        tabledatas: [
          {
            education: "", // 学历
            educationList: [
              { id: 1, name: "小学" },
              { id: 2, name: "初中" },
              { id: 3, name: "高中" },
              { id: 4, name: "中专" },
              { id: 5, name: "大专" },
              { id: 6, name: "本科" },
              { id: 7, name: "硕士" },
              { id: 8, name: "研究生" },
              { id: 9, name: "博士" },
              { id: 10, name: "其他" }
            ],
            school: "", // 毕业学校
            graduation_date: "", // 毕业时间
            major: "" // 专业
          }
        ]
      },
      educationRules: {
        // education: [
        //   { required: true, trigger: "change", message: "请选择学历" }
        // ],
        // school: [
        //   { required: true, trigger: "blur", message: "请输入毕业院校" }
        // ],
        // graduation_date: [
        //   { required: true, trigger: "change", message: "请选择毕业时间" }
        // ],
        // major: [{ required: true, trigger: "blur", message: "请输入所学专业" }]
      },
      bankData: {
        tabledatas: [
          {
            bank_card: "", // 银行卡号
            bank: "" // 开户行
          }
        ]
      },
      bankRules: {
        // bank_card: [
        //   { required: true, trigger: "blur", message: "请输入银行卡号" }
        // ],
        // bank: [{ required: true, trigger: "blur", message: "请输入开户行" }]
      },
      contractData: {
        tabledatas: [
          {
            contract_compony: "", // 合同公司
            contract_type: "", // 合同类型
            contractList: [
              { id: 1, name: "固定期限劳动合同" },
              { id: 2, name: "无固定期限劳动合同" },
              { id: 3, name: "实习协议" },
              { id: 4, name: "劳务协议" },
              { id: 5, name: "劳务派遣合同" },
              { id: 6, name: "返聘协议" },
              { id: 7, name: "短期劳动合同" },
              { id: 8, name: "其他" }
            ],
            first_contract_start_date: "", // 首次合同起始日
            first_contract_end_date: "", // 首次合同结束日
            now_contract_start_date: "", // 现合同起始日
            now_contract_end_date: "", // 现合同结束日
            contract_period: "", // 合同期限
            renewal_num: "" // 续约次数
          }
        ]
      },
      contractRules: {
        // contract_compony: [
        //   { required: true, trigger: "blur", message: "请输入合同公司" }
        // ],
        // contract_type: [
        //   { required: true, trigger: "change", message: "请选择合同类型" }
        // ],
        // first_contract_start_date: [
        //   { required: true, trigger: "change", message: "请选择首次合同起始日" }
        // ],
        // first_contract_end_date: [
        //   { required: true, trigger: "change", message: "请选择首次合同到期日" }
        // ],
        // now_contract_start_date: [
        //   { required: true, trigger: "change", message: "请选择现合同起始日" }
        // ],
        // now_contract_end_date: [
        //   { required: true, trigger: "change", message: "请选择现合同到期日" }
        // ],
        // contract_period: [
        //   { required: true, trigger: "blur", message: "请输入合同期限" }
        // ],
        // renewal_num: [
        //   { required: true, trigger: "blur", message: "请输入续约次数" }
        // ]
      },
      emergencyData: {
        tabledatas: [
          {
            emergency_contact_person: "", // 紧急联系人
            contact_relationship: "", // 联系人关系
            relationship: [
              { id: 1, name: "父母" },
              { id: 2, name: "配偶" },
              { id: 3, name: "子女" },
              { id: 4, name: "朋友" },
              { id: 5, name: "其他" }
            ],
            contact_phone: "" // 联系电话
          }
        ]
      },
      emergencyRules: {
        // emergency_contact_person: [
        //   { required: true, trigger: "blur", message: "请输入紧急联系人" }
        // ],
        // contact_relationship: [
        //   { required: true, trigger: "change", message: "请选择联系人关系" }
        // ],
        contact_phone: [
          { required: true, trigger: "blur", validator: validateMobile }
        ]
      },
      familyData: {
        tabledatas: [
          {
            has_child: "", // 有无子女
            hasChildList: [
              { id: 1, name: "有" },
              { id: 2, name: "无" }
            ],
            child_name: "", // 子女姓名
            child_gender: "", // 子女性别
            childGenderList: [
              { id: 1, name: "男" },
              { id: 2, name: "女" }
            ],
            child_born_date: "" // 子女出生日期
          }
        ]
      },
      familyRules: {
        // has_child: [
        //   { required: true, trigger: "change", message: "请选择有无子女" }
        // ],
        // child_name: [
        //   { required: true, trigger: "blur", message: "请输入子女姓名" }
        // ]
      },
      personalMaterialData: {
        tabledatas: [
          {
            human_face_image: "未上传", // 身份证(人像面)
            national_emblem_image: "未上传", // 身份证(国徽面)
            education_certificate_image: "未上传", // 学历证书
            degree_certificate_image: "未上传", // 学位证书
            resign_certificate_image: "未上传", // 离职证明
            employee_image: "未上传" // 员工照片
          }
        ]
      },
      personalMaterialRules: {},
      // 各信息显示字段
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
      ],
      idFaceImg: "",
      idBackImg: "",
      educationImg: "",
      certificateImg: "",
      degreeImg: "",
      employeeImg: "",
      stepActive: 0
    };
  },
  created() {
    this.imageData.company_id = localStorage.getItem("company_id");
    this.company_name = localStorage.getItem("company_name");
    const id = this.memberId ? this.memberId : localStorage.getItem("user_id"); // 登录用户id
    this.getUser(id);
    this.getDeparments();
  },
  watch: {
    memberId(newVal, oldVal) {
      // console.log("newVal", newVal, oldVal);
      this.getUser(newVal);
      console.log("watch", this.userinfo);
    },
    deep: true
  },
  methods: {
    // 获取用户信息
    getUser(id) {
      getUserinfo(id).then(res => {
        this.userinfo = res.data;
        // 基础信息
        this.userinfo.avatar = this.userinfo.avatar ? this.userinfo.avatar : "";
        this.formData.tabledatas[0].name = this.userinfo.real_name ? this.userinfo.real_name : '';
        this.formData.tabledatas[0].email = this.userinfo.email ? this.userinfo.email : '';
        this.formData.tabledatas[0].department = this.userinfo.department ? this.userinfo.department.name : '';
        this.formData.tabledatas[0].position = this.userinfo.post ? this.userinfo.post.name : '';
        // this.formData.tabledatas[0].department = this.userinfo.department.name ? this.userinfo.department.name : '';
        // this.formData.tabledatas[0].position = this.userinfo.post.name ? this.userinfo.post.name : '';
        this.formData.tabledatas[0].phone = this.userinfo.mobile ? this.userinfo.mobile : '';
        this.formData.tabledatas[0].job_num = this.userinfo.job_number ? this.userinfo.job_number : '';
        this.formData.tabledatas[0].extension_num = this.userinfo.ext_number ? this.userinfo.ext_number : '';
        this.formData.tabledatas[0].office_location = this.userinfo.work_address ? this.userinfo.work_address : '';
        this.formData.tabledatas[0].remarks = this.userinfo.remark ? this.userinfo.remark : '';
        this.formData.tabledatas[0].hire_date = this.userinfo.login_company_date ? this.userinfo.login_company_date.substr(0, 11) : this.userinfo.login_company_date;
        this.formData.tabledatas[0].job_year = this.userinfo.company_age ? this.userinfo.company_age : '';
        // 工作信息
        this.workData.tabledatas[0].employeeType = this.userinfo.profile.job_type ? this.userinfo.profile.job_type : '';
        this.workData.tabledatas[0].status = this.userinfo.profile.work_status ? this.userinfo.profile.work_status : '';
        this.workData.tabledatas[0].periods = this.userinfo.profile.try_date ? this.userinfo.profile.try_date : '';
        this.workData.tabledatas[0].formal_date = this.userinfo.profile.to_worker_date ? this.userinfo.profile.to_worker_date.substr(0, 11) : this.userinfo.profile.to_worker_date;
        this.workData.tabledatas[0].job_grade = this.userinfo.profile.job_level ? this.userinfo.profile.job_level : '';
        // 个人信息
        this.personalData.tabledatas[0].name_in_id = this.userinfo.real_name ? this.userinfo.real_name : '';
        this.personalData.tabledatas[0].id_card = this.userinfo.id_card ? this.userinfo.id_card : '';
        this.personalData.tabledatas[0].born_date = this.userinfo.birthday ? this.userinfo.birthday.substr(0, 11) : this.userinfo.birthday;
        this.personalData.tabledatas[0].age = this.userinfo.age ? this.userinfo.age : '';
        this.personalData.tabledatas[0].gender = this.userinfo.sex ? this.userinfo.sex : '';
        this.personalData.tabledatas[0].nation = this.userinfo.nation_id ? this.userinfo.nation_id : '';
        this.personalData.tabledatas[0].id_card_address = this.userinfo.idcard_address ? this.userinfo.idcard_address : '';
        this.personalData.tabledatas[0].valid_until = this.userinfo.idcard_expire ? this.userinfo.idcard_expire.substr(0, 11) : this.userinfo.idcard_expire;
        this.personalData.tabledatas[0].marriage = this.userinfo.marry_status ? this.userinfo.marry_status : '';
        this.personalData.tabledatas[0].first_working_time = this.userinfo.first_work_time ? this.userinfo.first_work_time.substr(0, 11) : this.userinfo.first_work_time;
        this.personalData.tabledatas[0].work_year = this.userinfo.job_age ? this.userinfo.job_age : '';
        this.personalData.tabledatas[0].domicile_type = this.userinfo.census_type ? this.userinfo.census_type : '';
        this.personalData.tabledatas[0].address = this.userinfo.address ? this.userinfo.address : '';
        this.personalData.tabledatas[0].political = this.userinfo.politics_face_id ? this.userinfo.politics_face_id : '';
        this.personalData.tabledatas[0].social_insurance = this.userinfo.social_account ? this.userinfo.social_account : '';
        this.personalData.tabledatas[0].accumulation_fund = this.userinfo.provident_fund_account ? this.userinfo.provident_fund_account : '';
        // 学历信息
        this.educationData.tabledatas[0].education = this.userinfo.profile.academic_certificate ? this.userinfo.profile.academic_certificate : '';
        this.educationData.tabledatas[0].school = this.userinfo.profile.graduate_school ? this.userinfo.profile.graduate_school : '';
        this.educationData.tabledatas[0].graduation_date = this.userinfo.profile.graduate_date ? this.userinfo.profile.graduate_date.substr(0, 11) : this.userinfo.profile.graduate_date;
        this.educationData.tabledatas[0].major = this.userinfo.profile.major ? this.userinfo.profile.major : '';
        // 银行卡信息
        this.bankData.tabledatas[0].bank_card = this.userinfo.profile.bank_num ? this.userinfo.profile.bank_num : '';
        this.bankData.tabledatas[0].bank = this.userinfo.profile.bank_name ? this.userinfo.profile.bank_name : '';
        // 合同信息
        this.contractData.tabledatas[0].contract_compony = this.userinfo.profile.contract_company_name ? this.userinfo.profile.contract_company_name : '';
        this.contractData.tabledatas[0].contract_type = this.userinfo.profile.contract_type_id ? this.userinfo.profile.contract_type_id : '';
        this.contractData.tabledatas[0].first_contract_start_date = this.userinfo.profile.first_contract_begin_date ? this.userinfo.profile.first_contract_begin_date.substr(0, 11) : this.userinfo.profile.first_contract_begin_date;
        this.contractData.tabledatas[0].first_contract_end_date = this.userinfo.profile.first_contract_end_date ? this.userinfo.profile.first_contract_end_date.substr(0, 11) : this.userinfo.profile.first_contract_end_date;
        this.contractData.tabledatas[0].now_contract_start_date = this.userinfo.profile.current_contract_begin_date ? this.userinfo.profile.current_contract_begin_date.substr(0, 11) : this.userinfo.profile.current_contract_begin_date;
        this.contractData.tabledatas[0].now_contract_end_date = this.userinfo.profile.current_contract_end_date ? this.userinfo.profile.current_contract_end_date.substr(0, 11) : this.userinfo.profile.current_contract_end_date;
        this.contractData.tabledatas[0].contract_period = this.userinfo.profile.contract_finally ? this.userinfo.profile.contract_finally.substr(0, 11) : this.userinfo.profile.contract_finally;
        this.contractData.tabledatas[0].renewal_num = this.userinfo.profile.contract_times ? this.userinfo.profile.contract_times : '';
        // 紧急联系人
        this.emergencyData.tabledatas[0].emergency_contact_person = this.userinfo.profile.instancy_people ? this.userinfo.profile.instancy_people : '';
        this.emergencyData.tabledatas[0].contact_relationship = this.userinfo.profile.instancy_relation ? this.userinfo.profile.instancy_relation : '';
        this.emergencyData.tabledatas[0].contact_phone = this.userinfo.profile.instancy_phone ? this.userinfo.profile.instancy_phone : '';
        // 家庭信息
        this.familyData.tabledatas[0].has_child = this.userinfo.profile.has_child ? this.userinfo.profile.has_child : '';
        this.familyData.tabledatas[0].child_name = this.userinfo.profile.has_child ? this.userinfo.profile.child_name : '';
        this.familyData.tabledatas[0].child_gender = this.userinfo.profile.has_child ? this.userinfo.profile.child_grade : '';
        this.familyData.tabledatas[0].child_born_date = this.userinfo.profile.has_child ? this.userinfo.profile.child_birthday : '';
        // 个人材料
        this.idFaceImg = this.userinfo.profile.id_card_front ? this.userinfo.profile.id_card_front : '';
        this.idBackImg = this.userinfo.profile.id_card_behind ? this.userinfo.profile.id_card_behind : '';
        this.educationImg = this.userinfo.profile.academic_front ? this.userinfo.profile.academic_front : '';
        this.certificateImg = this.userinfo.profile.academic_behind ? this.userinfo.profile.academic_behind : '';
        this.degreeImg = this.userinfo.profile.leave_picture ? this.userinfo.profile.leave_picture : '';
        this.employeeImg = this.userinfo.profile.identification_photo ? this.userinfo.profile.identification_photo : '';
        
        // localStorage.setItem("userinfo", JSON.stringify(res.data));
      });
    },
    async getDeparments() {
      const res = await getDeparments({ company_id: 6 }); //test
      console.log("企业列表", res);
      this.formData.tabledatas[0].departments = res.data;
    },
    handleStep({ index, name }) {
      this.stepActive = index;
    },
    handleAvatar(res, file) {
      // this.userinfo.avatar = URL.createObjectURL(file.raw);
      this.userinfo.avatar = res.message
      const id = this.memberId ? this.memberId : localStorage.getItem("user_id");
      changeInfo(id, {
        avatar: this.userinfo.avatar ? this.userinfo.avatar : '',
      }).then(res => {
        console.log("change info", res);
        this.getUser(id);
        this.$emit("infoChanged", { changed: id }); // 用来通知用户信息已更新
      }).catch(err => {
        console.log("err", err);
      });
    },
    beforeUpload(file) {
      this.imageData.image = file
    },
    handleIdFaceImg(res, file) {
      console.log('上传图片',res, file)
      this.idFaceImg = res.message
      // this.idFaceImg = URL.createObjectURL(file.raw);
      console.log(this.idFaceImg)
    },
    handleEducationImg(res, file) {
      this.educationImg = res.message
      // this.educationImg = URL.createObjectURL(file.raw);
    },
    handleCertificateImg(res, file) {
      this.certificateImg = res.message
      // this.certificateImg = URL.createObjectURL(file.raw);
    },
    handleIdbackImg(res, file) {
      this.idBackImg = res.message
      // this.idBackImg = URL.createObjectURL(file.raw);
    },
    handleDegreeImg(res, file) {
      this.degreeImg = res.message
      // this.degreeImg = URL.createObjectURL(file.raw);
    },
    handleEmployeeImg(res, file) {
      this.employeeImg = res.message
      // this.employeeImg = URL.createObjectURL(file.raw);
    },
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
      this.workData.tabledatas[0].employeeType = e
    },
    // 选择员工状态
    selectemployeeStatus(e) {
      console.log("选择员工状态", e);
      this.workData.tabledatas[0].status = e
    },
    // 选择试用期
    selectPeriods(e) {
      console.log("选择试用期", e);
      this.workData.tabledatas[0].periods = e
    },
    // 选择转正日期
    selectFormalDate(e) {
      console.log("选择转正日期", e);
      this.workData.tabledatas[0].formal_date = e
    },
    // 选择出生日期
    selectBornDate(e) {
      console.log("选择出生日期", e);
      this.personalData.tabledatas[0].born_date = e
    },
    // 选择性别
    selectGender(e) {
      console.log("选择性别", e);
      this.personalData.tabledatas[0].gender = e
    },
    // 选择民族
    selectNation(e) {
      console.log("选择民族", e);
      this.personalData.tabledatas[0].nation = e
    },
    // 选择婚姻情况
    selectMarriage(e) {
      console.log("选择婚姻情况", e);
      this.personalData.tabledatas[0].marriage = e
    },
    // 选择户籍类型
    selectDomicileType(e) {
      console.log("选择户籍类型", e);
      this.personalData.tabledatas[0].domicile_type = e
    },
    // 选择政治面貌
    selectPolitical(e) {
      console.log("选择政治面貌", e);
      this.personalData.tabledatas[0].political = e
    },
    // 选择学历
    selectEducation(e) {
      console.log("选择学历", e);
      this.educationData.tabledatas[0].education = e
    },
    // 选择毕业时间
    selectGraduationDate(e) {
      console.log("选择毕业时间", e);
      this.educationData.tabledatas[0].graduation_date = e
    },
    // 选择合同类型
    selectContractType(e) {
      console.log("选择合同类型", e);
      this.contractData.tabledatas[0].contract_type = e
    },
    // 选择首次合同起始日
    selectFirstContractStartDate(e) {
      console.log("选择首次合同起始日", e);
      this.contractData.tabledatas[0].first_contract_start_date = e
    },
    // 选择首次合同到期日
    selectFirstContractEndDate(e) {
      console.log("选择首次合同到期日", e);
      this.contractData.tabledatas[0].first_contract_end_date = e
    },
    // 选择现合同起始日
    selectNowContractStartDate(e) {
      console.log("选择现合同起始日", e);
      this.contractData.tabledatas[0].now_contract_start_date = e
    },
    // 选择首次合同到期日
    selectNowContractEndDate(e) {
      console.log("选择现合同到期日", e);
      this.contractData.tabledatas[0].now_contract_end_date = e
    },
    // 选择联系人关系
    selectContactRelationship(e) {
      console.log("选择联系人关系", e);
      this.emergencyData.tabledatas[0].contact_relationship = e
    },
    // 选择有无子女
    selecthasChild(e) {
      console.log("选择有无子女", e);
      this.familyData.tabledatas[0].has_child = e
    },
    // 选择子女性别
    selectChildGender(e) {
      console.log("选择子女性别", e);
      this.familyData.tabledatas[0].child_gender = e
    },
    // 选择子女出生日期
    selectChildBornDate(e) {
      console.log("选择子女出生日期", e);
      this.familyData.tabledatas[0].child_born_date = e
    },
    // 选择首次参加工作时间
    selectFirstWorkingTime(date) {
      console.log("选择首次参加工作时间", date);
      this.personalData.tabledatas[0].hire_date = date;
      const dateNow = new Date();
      const data = this.dateDiff(date, dateNow);
      if(data / 12 == 0) {
        this.personalData.tabledatas[0].work_year = `${data % 12}个月`;
      } else {
        this.personalData.tabledatas[0].work_year = `${Math.floor(data / 12)}年${data % 12}个月`;
      }

    },
    // 选择入职时间
    selectHireDate(date) {
      this.formData.tabledatas[0].first_working_time = date;
      console.log("选择入职时间", date);
      const dateNow = new Date();
      const data = this.dateDiff(date, dateNow);
      if(data / 12 == 0) {
        this.formData.tabledatas[0].job_year = `${data % 12}个月`;
      } else {
        this.formData.tabledatas[0].job_year = `${Math.floor(data / 12)}年${data % 12}个月`;
      }

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
          const id = this.memberId ? this.memberId : localStorage.getItem("user_id");
          const name = this.formData.tabledatas[0].name;
          const email = this.formData.tabledatas[0].email;
          const position = this.formData.tabledatas[0].position;
          const extension_num = this.formData.tabledatas[0].extension_num;
          const job_num = this.formData.tabledatas[0].job_num;
          const remark = this.formData.tabledatas[0].remarks;
          const office_location = this.formData.tabledatas[0].office_location;
          const job_year = this.formData.tabledatas[0].job_year;
          const hire_date = this.formData.tabledatas[0].hire_date;

          console.log("name", name);
          changeInfo(id, {
            real_name: name ? name : ' ',
            email: email ? email : ' ',
            ext_number: extension_num ? extension_num : ' ',
            job_number: job_num ? job_num : ' ',
            remark: remark ? remark : ' ',
            work_address: office_location ? office_location : ' ',
            company_age: job_year ? job_year : ' ',
            login_company_date: hire_date ? hire_date : ' '
          }).then(res => {
            console.log("change info", res);
            this.getUser(id);
            this.$emit("infoChanged", { changed: id });
          }).catch(err => {
            console.log("err", err);
          });
        }
      });
    },

    // 工作信息保存验证
    workBaseInfo() {
      this.$refs.workData.validate(valid => {
        console.log("valid", valid);
        if (valid) {
          this.work_info_show = false;
          const id = this.memberId ? this.memberId : localStorage.getItem("user_id");
          const profile_id = this.userinfo.profile.id
          const employeeType = this.workData.tabledatas[0].employeeType
          const status = this.workData.tabledatas[0].status
          const periods = this.workData.tabledatas[0].periods
          const formal_date = this.workData.tabledatas[0].formal_date
          const job_grade = this.workData.tabledatas[0].job_grade
          changeProfileInfo(profile_id, {
            job_type: employeeType ? employeeType : '',
            work_status: status ? status : '',
            try_date: periods ? periods : '',
            to_worker_date: formal_date ? formal_date : '',
            job_level: job_grade ? job_grade : ''
          }).then(res => {
            console.log("change info", res);
            this.getUser(id);
            this.$emit("infoChanged", { changed: id }); // 用来通知用户信息已更新
          }).catch(err => {
            console.log("err", err);
          });
        }
      });
    },

    // 个人信息保存验证
    personalBaseInfo() {
      this.$refs.personalData.validate(valid => {
        console.log("valid", valid);
        if (valid) {
          this.personal_info_show = false;
          const id = this.memberId ? this.memberId : localStorage.getItem("user_id");
          const id_card = this.personalData.tabledatas[0].id_card 
          const born_date = this.personalData.tabledatas[0].born_date
          const age = this.personalData.tabledatas[0].age
          const gender = this.personalData.tabledatas[0].gender
          const nation = this.personalData.tabledatas[0].nation
          const id_card_address = this.personalData.tabledatas[0].id_card_address
          const valid_until = this.personalData.tabledatas[0].valid_until
          const marriage = this.personalData.tabledatas[0].marriage
          const first_working_time = this.personalData.tabledatas[0].first_working_time
          const work_year = this.personalData.tabledatas[0].work_year
          const domicile_type = this.personalData.tabledatas[0].domicile_type
          const address = this.personalData.tabledatas[0].address
          const political = this.personalData.tabledatas[0].political
          const social_insurance = this.personalData.tabledatas[0].social_insurance
          const accumulation_fund = this.personalData.tabledatas[0].accumulation_fund
          changeInfo(id, {
            id_card: id_card ? id_card : '',
            birthday: born_date ? born_date : '',
            age: age ? age : '',
            sex: gender ? gender : '',
            nation_id: nation ? nation : '',
            idcard_address: id_card_address ? id_card_address : '',
            idcard_expire: valid_until ? valid_until : '',
            marry_status:  marriage ? marriage : '',
            first_work_time: first_working_time ? first_working_time : '',
            job_age: work_year ? work_year : '',
            census_type: domicile_type ? domicile_type : '',
            address: address ? address : '',
            politics_face_id: political ? political : '',
            social_account: social_insurance ? social_insurance : '',
            provident_fund_account: accumulation_fund ? accumulation_fund : ''
          }).then(res => {
            console.log("change info", res);
            this.getUser(id);
            this.$emit("infoChanged", { changed: id });
          }).catch(err => {
            console.log("err", err);
          });
        }
      });
    },

    // 学历信息保存验证
    educationBaseInfo() {
      this.$refs.educationData.validate(valid => {
        console.log("valid", valid);
        if (valid) {
          this.education_info_show = false;
          const id = this.memberId ? this.memberId : localStorage.getItem("user_id");
          const profile_id = this.userinfo.profile.id
          const education = this.educationData.tabledatas[0].education
          const school = this.educationData.tabledatas[0].school
          const graduation_date = this.educationData.tabledatas[0].graduation_date
          const major = this.educationData.tabledatas[0].major

          changeProfileInfo(profile_id, {
            academic_certificate: education ? education : '',
            graduate_school: school ? school : '',
            graduate_date: graduation_date ? graduation_date : '',
            major: major ? major : '',
          }).then(res => {
            console.log("change info", res);
            this.getUser(id);
            this.$emit("infoChanged", { changed: id }); // 用来通知用户信息已更新
          }).catch(err => {
            console.log("err", err);
          });

        }
      });
    },

    // 银行信息保存验证
    bankBaseInfo() {
      this.$refs.bankData.validate(valid => {
        console.log("valid", valid);
        if (valid) {
          this.bank_info_show = false;
          const id = this.memberId ? this.memberId : localStorage.getItem("user_id");
          const profile_id = this.userinfo.profile.id
          const bank_card = this.bankData.tabledatas[0].bank_card
          const bank = this.bankData.tabledatas[0].bank
          changeProfileInfo(profile_id, {
            bank_num: bank_card ? bank_card : '',
            bank_name: bank ? bank : '',
          }).then(res => {
            console.log("change info", res);
            this.getUser(id);
            this.$emit("infoChanged", { changed: id }); // 用来通知用户信息已更新
          }).catch(err => {
            console.log("err", err);
          });
        }
      });
    },
    // 合同信息保存验证
    contractBaseInfo() {
      this.$refs.contractData.validate(valid => {
        console.log("valid", valid);
        if (valid) {
          this.contract_info_show = false;
          const id = this.memberId ? this.memberId : localStorage.getItem("user_id");
          const profile_id = this.userinfo.profile.id
          const contract_compony = this.contractData.tabledatas[0].contract_compony
          const contract_type = this.contractData.tabledatas[0].contract_type
          const first_contract_start_date = this.contractData.tabledatas[0].first_contract_start_date
          const first_contract_end_date = this.contractData.tabledatas[0].first_contract_end_date
          const now_contract_start_date = this.contractData.tabledatas[0].now_contract_start_date
          const now_contract_end_date = this.contractData.tabledatas[0].now_contract_end_date
          const contract_period = this.contractData.tabledatas[0].contract_period
          const renewal_num = parseInt(this.contractData.tabledatas[0].renewal_num)

          changeProfileInfo(profile_id, {
            contract_company_name: contract_compony ? contract_compony : '',
            contract_type_id: contract_type ? contract_type : '',
            first_contract_begin_date: first_contract_start_date ? first_contract_start_date : '',
            first_contract_end_date: first_contract_end_date ? first_contract_end_date : '',
            current_contract_begin_date: now_contract_start_date ? now_contract_start_date : '',
            current_contract_end_date: now_contract_end_date ? now_contract_end_date : '',
            contract_finally: contract_period ? contract_period : '',
            contract_times: renewal_num ? renewal_num : '',
          }).then(res => {
            console.log("change info", res);
            this.getUser(id);
            this.$emit("infoChanged", { changed: id }); // 用来通知用户信息已更新
          }).catch(err => {
            console.log("err", err);
          });
        }
      });
    },
    // 紧急联系人信息保存验证
    emergencyBaseInfo() {
      this.$refs.emergencyData.validate(valid => {
        console.log("valid", valid);
        if (valid) {
          this.emergency_contact_show = false;
          const id = this.memberId ? this.memberId : localStorage.getItem("user_id");
          const profile_id = this.userinfo.profile.id
          const emergency_contact_person = this.emergencyData.tabledatas[0].emergency_contact_person
          const contact_relationship = this.emergencyData.tabledatas[0].contact_relationship
          const contact_phone = this.emergencyData.tabledatas[0].contact_phone
          changeProfileInfo(profile_id, {
            instancy_people: emergency_contact_person ? emergency_contact_person : '',
            instancy_relation: contact_relationship ? contact_relationship : '',
            instancy_phone: contact_phone ? contact_phone : '',
          }).then(res => {
            console.log("change info", res);
            this.getUser(id);
            this.$emit("infoChanged", { changed: id }); // 用来通知用户信息已更新
          }).catch(err => {
            console.log("err", err);
          });
        }
      });
    },
    // 家庭信息保存验证
    familyBaseInfo() {
      this.$refs.familyData.validate(valid => {
        console.log("valid", valid);
        if (valid) {
          this.family_info_show = false;
          const id = this.memberId ? this.memberId : localStorage.getItem("user_id");
          const profile_id = this.userinfo.profile.id
          const has_child = this.familyData.tabledatas[0].has_child
          const child_name = this.familyData.tabledatas[0].child_name
          const child_gender = this.familyData.tabledatas[0].child_gender
          const child_born_date = this.familyData.tabledatas[0].child_born_date
          changeProfileInfo(profile_id, {
            has_child: has_child ? has_child : '',
            child_name: child_name ? child_name : '',
            child_grade: child_gender ? child_gender : '',
            child_birthday: child_born_date ? child_born_date : '',
          }).then(res => {
            console.log("change info", res);
            this.getUser(id);
            this.$emit("infoChanged", { changed: id }); // 用来通知用户信息已更新
          }).catch(err => {
            console.log("err", err);
          });
        }
      });
    },
    // 个人材料保存验证
    personalMaterialBaseInfo() {
      this.$refs.personalMaterialData.validate(valid => {
        console.log("valid", valid);
        if (valid) {
          this.personal_material_show = false;
          const id = this.memberId ? this.memberId : localStorage.getItem("user_id");
          const profile_id = this.userinfo.profile.id
          changeProfileInfo(profile_id, {
            id_card_front: this.idFaceImg ? this.idFaceImg : '',
            id_card_behind: this.idBackImg ? this.idBackImg : '',
            academic_front: this.educationImg ? this.educationImg : '',
            academic_behind: this.certificateImg ? this.certificateImg : '',
            leave_picture: this.leave_picture ? this.leave_picture : '',
            identification_photo: this.employeeImg ? this.employeeImg : '',
          }).then(res => {
            console.log("change info", res);
            this.getUser(id);
            this.$emit("infoChanged", { changed: id }); // 用来通知用户信息已更新
          }).catch(err => {
            console.log("err", err);
          });
        }
      });
    }
  },
  components: {
    Steps
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
      display: flex;
      justify-content: center;

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
            .auth-no {
              width: 128px;
              background-color: #ffdede;
              color: #ff5a5a;
            }
            .auth-yes {
              display: inline-block;
              width: 128px;
              height: 27px;
              line-height: 27px;
              text-align: center;
              margin-right: 7px;
              border-radius: 5px;
              font-size: 16px;
              background-color: #d9ecff;
              color: #409eff;
            }
            .quit {
              width: 51px;
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
          .position {
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

// 处理input type = number的上下箭头
>>> input::-webkit-outer-spin-button,
>>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
>>> input[type="number"] {
  -moz-appearance: textfield;
}

.avatar-uploader {
  display: flex;
  justify-content: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
>>> .el-upload {
  width: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
>>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 250px;
  line-height: 250px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 250px;
  display: block;
  border-radius: 6px;
}
.mt {
  width: 100% !important;
  display: inline-block;
  margin-bottom: 40px;
}
.steps {
  width: 154px;
  margin-top: 395px;
  margin-right: 98px;
  font-size: 19px;
}

.no-avatar {
  background-color: #409eff;
  line-height: 4.84375rem;
  text-align: center;
  font-size: 1.71875rem;
  color: #fff;
}
.mb-space-0 {
  margin-bottom: 5.6rem !important;
}
.mb-space-1 {
  margin-bottom: 6.6rem !important;
}
.mb-space-1-1 {
  margin-bottom: 7rem !important;
}
.mb-space-1-2 {
  margin-bottom: 8.3rem !important;
}
.mb-space-1-3 {
  margin-bottom: 8.6rem !important;
}
.image-upload .item span {
  color: #409eff;
}
</style>