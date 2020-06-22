<template>
  <div class="add-new-member">
    <el-container>
      <el-header style="text-align: left; font-size: 24px; color: #303133">添加团队成员</el-header>
      <el-main>
        <div class="main-tab">
          <span>手机邀请</span>
        </div>
        <div class="main-input">
          <div class="input-item" v-for="(item, index) in input_num" :key="index">
            <el-input placeholder="请输入手机号码" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="+86" class="select">
                <el-option label="+86" value="1"></el-option>
              </el-select>
            </el-input>
            <el-input placeholder="请输入成员姓名" class="input-with-select"></el-input>
            <svg-icon icon-class="add" @click="deleteInput"></svg-icon>
          </div>
          <div class="add" @click="addInput">
            <svg-icon icon-class="add"></svg-icon>继续添加
          </div>
        </div>
        <el-button class="btn">添加成员</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [
        {
          name: "杨玉环",
          position: "测试",
          avatar: "../../../assets/imgs/test.jpg",
          add: false
        },
        {
          name: "貂蝉",
          position: "后端",
          avatar: "../../../assets/imgs/test.jpg",
          add: true
        },
        {
          name: "王昭君",
          position: "前端",
          avatar: "../../../assets/imgs/test.jpg",
          add: true
        },
        {
          name: "西施",
          position: "全栈",
          avatar: "../../../assets/imgs/test.jpg",
          add: false
        },
        {
          name: "如花",
          position: "产品",
          avatar: "../../../assets/imgs/test.jpg",
          add: false
        }
      ],
      select: "",
      input_num: 1
    };
  },
  methods: {
    addInput() {
      this.input_num = this.input_num + 1;
    },
    deleteInput() {
      if (this.input_num > 1) {
        this.input_num = this.input_num - 1;
      }
    }
  }
};
</script>

<style lang="scss">
.add-new-member {
  .el-form-item__content {
    margin: 0;
    padding: 0;
  }

  .el-select {
    height: 60px;
    line-height: 60px;
  }

  .input-container .input-with-select .el-input__inner {
    height: 60px;
  }

  .el-input__inner {
    height: 60px;
  }

  .input-with-select .el-input-group__prepend {
    width: 89px;
    color: #333;
    background-color: #fff;
  }
}
</style>

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
          }
        }
        .add {
          width: 115px;
          display: flex;
          align-items: center;
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
        background: rgba(159, 206, 255, 1);
        color: #fff;
        font-size: 19px;
        border-radius: 5px;
      }
    }
  }
}
</style>