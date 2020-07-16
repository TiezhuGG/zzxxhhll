<template>
  <div class="add-new-member">
    <el-container>
      <el-header style="text-align: left; font-size: 24px; color: #303133">添加团队成员</el-header>
      <el-main>
        <div class="main-tab">
          <span>手机邀请</span>
        </div>
        <el-form ref="form" :model="form" :rules="rules" class="main-input">
          <div class="form-item-container">
            <el-col>
              <el-form-item
                class="input-item"
                v-for="(item, index) in form.mobiles"
                :prop="'mobiles.' + index + '.mobile'"
                :key="index"
                :rules="rules.mobile"
              >
                <el-input
                  placeholder="请输入手机号码"
                  v-model="item.mobile"
                  type="number"
                  class="input-with-select"
                >
                  <el-select v-model="select" slot="prepend" placeholder="+86" class="select" @change="change" >
                    <el-option label="+86" value="1"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col>
              <el-form-item
                class="input-item"
                v-for="(item, index) in form.names"
                :prop="'names.' + index + '.name'"
                :key="item.key"
                :rules="rules.name"
              >
                <el-input placeholder="请输入成员姓名" v-model="item.name" class="input-with-select"></el-input>
                <svg-icon icon-class="delete" @click="deleteInput(index)"></svg-icon>
              </el-form-item>
            </el-col>
          </div>
          <div class="add-item" @click="addInput">
            <svg-icon icon-class="add"></svg-icon>继续添加
          </div>
        </el-form>
        <el-button type="primary" class="btn" @click="addMember">添加成员</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { inviteMember } from "@/api/user";
import { validMobile } from "@/utils/validate";

export default {
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      form: {
        mobiles: [{ mobile: "" }],
        names: [{ name: "" }]
      },
      rules: {
        mobile: [
          { required: true, trigger: "blur", validator: validateMobile }
        ],
        name: [{ required: true, trigger: "blur", message: "请输入成员姓名" }]
      },
      select: ""
    };
  },
  watch: {
    select(newVal,oldVal) {
      console.log('newVal',newVal,'oldVal',oldVal)
    }
  },
  methods: {
    change(e) {
      console.log('e',e)
    },
    addInput() {
      this.form.mobiles.push({ mobile: "" });
      this.form.names.push({ name: "" });
    },
    deleteInput(index) {
      if (this.form.mobiles.length > 1) {
        this.form.mobiles.splice(index, 1);
        this.form.names.splice(index, 1);
      }
    },
    addMember() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const data = this.constructData(this.form.mobiles, this.form.names);
          // console.log("data", data);
          inviteMember({ data: JSON.stringify(data) }).then(res => {
            this.$router.push("/");
          });
        }
      });
    },
    // 构造data参数, a,b为数组,默认a.length=b.length
    constructData(a, b) {
      const data = [];
      for (let i = 0; i < a.length; i++) {
        const obj = {};
        obj.mobile = a[i].mobile;
        obj.realname = b[i].name;
        data.push(obj);
      }
      return data;
    }
  }
};
</script>

<style lang="scss" scoped>
.add-new-member {
  width: 100%;
  .el-container {
    background-color: #fff;
    height: 95vh;

    .el-header {
      height: 80px !important;
      color: #303133;
      line-height: 80px;
      border-bottom: 1px solid rgb(241, 241, 241);
    }

    .el-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 12px;
      padding: 0;

      .main-tab {
        width: 1787px;
        height: 87px;
        border-bottom: 1px solid #e6e6e6;

        span {
          display: inline-block;
          width: 165px;
          height: 84px;
          margin-left: 100px;
          margin-top: 3px;
          color: #303133;
          text-align: center;
          line-height: 84px;
          border-bottom: 3px solid #409eff;
        }
      }

      .main-input {
        padding-top: 160px;
        .form-item-container {
          display: flex;
        }
        .input-item {
          display: flex;
          align-items: center;
          margin-bottom: 27px;

          .input-with-select {
            width: 430px;
            margin-right: 27px;
          }

          svg {
            font-size: 27px;
            position: absolute !important;
            top: 29% !important;
            right: -5%;
          }
        }
        .add-item {
          width: 200px;
          display: flex;
          align-items: center;
          font-size: 19px;

          svg {
            font-size: 27px;
            margin-right: 11px;
          }
        }
      }

      .btn {
        width: 184px;
        height: 53px;
        margin-top: 71px;
        // background: rgba(159, 206, 255, 1);
        color: #fff;
        font-size: 19px;
        border-radius: 5px;
      }
    }
  }
}

>>> .el-form-item__content {
  width: 100%;
}

>>> .el-select {
  height: 60px;
  line-height: 60px;
}

>>> .input-container .input-with-select .el-input__inner {
  height: 60px;
}

>>> .el-input__inner {
  height: 60px;
}

>>> .input-with-select .el-input-group__prepend {
  width: 110px;
  color: #333;
  background-color: #fff;
}

// 处理input type = number的上下箭头
>>> input::-webkit-outer-spin-button,
>>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
>>> input[type="number"] {
  -moz-appearance: textfield;
}
</style>