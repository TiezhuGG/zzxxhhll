<template>
  <div class="container">
    <el-container>
      <el-header>
        <svg-icon class="svg" icon-class="approval-icon"></svg-icon>
        <span>审批</span>
      </el-header>

      <el-main>
        <div class="wrapper">
          <div class="top">
            <span class="line"></span>
            <span class="txt">15:22 新消息</span>
          </div>
          <div style="display: flex;">
            <svg-icon class="svg" icon-class="approval-icon"></svg-icon>
            <div class="message">
              <span>成员加入申请</span>
              <span>申请人: {{ applicant }}</span>
              <span>手机号: {{ mobile }}</span>
              <el-button v-if="pass" class="button" plain>已通过</el-button>
              <div class="btn-group" v-else>
                <el-button class="btn" plain @click="agree">通过</el-button>
                <el-button class="btn" plain>拒绝</el-button>
              </div>
            </div>
          </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog :visible.sync="dialogVisible" width="533px">
          <img class="avatar" src="@/assets/imgs/test.jpg" />
          <el-form :model="form" :rules="rules" ref="form" auto-complete="on">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <div style="display: flex; justify-content: space-between">
              <el-form-item label="部门" prop="department">
                <el-select v-model="form.department" placeholder="请选择部门" @change="selectDepartment">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="position-input" label="职位" prop="position">
                <el-input v-model="form.position" placeholder="请输入职位"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="个人邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入个人邮箱"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { validMobile, validName, validEmail } from "@/utils/validate";
export default {
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    const validatename = (rule, value, callback) => {
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
    return {
      applicant: "罗志祥",
      mobile: "18305982627",
      pass: false,
      dialogVisible: false,
      form: {
        name: "",
        mobile: "",
        department: "",
        position: "",
        email: ""
      },
      rules: {
        name: [{ required: true, trigger: "blur", validator: validatename }],
        mobile: [
          { required: true, trigger: "blur", validator: validateMobile }
        ],
        department: [
          { required: true, trigger: "change", message: "请选择部门" }
        ],
        position: [{ required: true, trigger: "blur", message: "请输入职位" }],
        email: [{ required: true, trigger: "blur", validator: validateEmail }]
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
    };
  },
  methods: {
    agree() {
      this.dialogVisible = true;
    },
    confirm() {
      this.$refs.form.validate(valid => {
        console.log("valid", valid);
        if (valid) {
          this.dialogVisible = false;
          this.pass = true;
        }
      });
    },
    selectDepartment(e) {
      console.log("e", e);
      this.form.department = e
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  .el-container {
    background-color: #fff;
    height: calc(100vh - 48px);

    .el-header {
      height: 80px !important;
      display: flex;
      align-items: center;
      font-size: 24px;
      color: #303133;
      border-bottom: 1px solid rgb(241, 241, 241);
    }
  }
}
.svg {
  margin-right: 13px;
  font-size: 43px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 43px;
}
.top {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 45px;
}
.line {
  width: calc(100% - 120px);
  height: 1px;
  display: inline-block;
  background: #409eff;
}
.txt {
  display: inline-block;
  width: 100px;
  font-size: 16px;
  color: #409eff;
}
.message {
  width: 404px;
  height: 305px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 25px 16px 19px 16px;
  background: #fff;
  border-radius: 11px;
  border: 1px solid #dee0e3;

  span:nth-child(1) {
    font-size: 24px;
    color: #333;
    margin-bottom: 40px;
  }

  span:nth-child(2),
  span:nth-child(3) {
    font-size: 19px;
    color: #666;
  }

  span:nth-child(2) {
    margin-bottom: 27px;
  }

  .button {
    font-size: 19px;
    color: #c0c4cc;
    margin-top: 80px;
    border-radius: 27px;
    border: 1px solid #dee0e3;
  }
  .btn-group {
    display: flex;
  }
  .btn {
    width: 179px;
    font-size: 19px;
    color: #333;
    margin-top: 80px;
    border-radius: 27px;
    border: 1px solid #dee0e3;
  }
}
@media screen and(max-width: 1650px) {
  .button {
    margin-top: 75px;
  }
}
.avatar {
  width: 64px;
  height: 64px;
  margin-bottom: 20px;
  border-radius: 50%;
}

>>> .el-dialog .el-dialog__header {
  padding: 0;
}
>>> .el-input__inner {
  height: 53px;
}
>>> .el-dialog__body {
  padding: 27px 27px 0 27px;
}
>>> .el-dialog__footer {
  padding: 27px;
}
>>> .el-select {
  width: 227px;
}
.position-input {
  width: 227px;
}
</style>