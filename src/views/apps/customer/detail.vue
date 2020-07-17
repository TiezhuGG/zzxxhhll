<template>
  <div>
    <div class="block">
      <el-tabs type="border-card">
        <el-tab-pane class="product" label="客户档案">
          <custom-header title="基本资料" />

          <el-form inline label-width="107px">
            <el-form-item label="客户简称">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="客户编号">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
        
            <el-form-item label="主要产品">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="国家或地区">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
                <el-form-item label="公司名称">
              <el-input style="width:520px" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-form>

          <custom-header title="其他资料" />
          <el-form inline label-width="107px">
            <el-form-item label="开户行">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item style="margin-left:70px">
              <el-select placeholder="人民币账号" style="width:125px">
                <el-option>1</el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left:-20px">
              <el-input placeholder="请输入美金账号" style="width:375px"></el-input>
            </el-form-item>

            <el-form-item label="其他编号">
              <el-input placeholder="请输入其他编号" style="width:780px"></el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input placeholder="请输入备注" style="width:780px"></el-input>
            </el-form-item>
          </el-form>

          <custom-header title="联系方式" />

          <div style="text-align: right">
            <el-button >
              <svg-icon icon-class="button_delete" />批量删除
            </el-button>
            <el-button type="primary" >
              <svg-icon icon-class="button_new" />增加联系人
            </el-button>
          </div>

          <div style="margin-top: 30px"> 
            <div class="table_container">
              <el-table :data="tableData" :border="true" style="width: 100%">
                <el-table-column width="66px"> 
                    <template  slot-scope="scope">
                        <el-checkbox style="margin-left:14px" ></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="ID" prop="date" />

                <el-table-column label="联系人" prop="name">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.name" />
                  </template>
                </el-table-column>

                 <el-table-column label="手机号" prop="iphone">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.iphone" />
                  </template>
                </el-table-column>

                 <el-table-column label="手机号" prop="iphone">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.iphone" />
                  </template>
                </el-table-column>
        
                <el-table-column fixed="right" label="操作" width="60">
                  <el-link type="primary" @click="deleteById">删除</el-link>
                </el-table-column>
              </el-table>


            <div style="text-align: center;margin-top: 30px">
                <el-button type="primary" >提交</el-button>
                <el-button  >暂存</el-button>
            </div>

            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="订单汇总"></el-tab-pane>
        <el-tab-pane label="订单汇总"></el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "custom-header": {
      props: ["title", "desc"],
      template: `
        <div class="custom-header">
          <span>{{ title }}</span>
          <span v-if="desc">{{ desc }}</span>
        </div>
      `
    }
  },
  data() {
    return {
      msgInput: "",
      isApprover: true,
      value: "",
      detailShow: false,
      tableData: [
        {
        iphone:'123456789',
          date: "2016-05-03",
          name: "王小虎"
        }
      ]
    };
  }
};
</script>


<style lang="scss" scoped>
@import "./static.scss";
.msg_input {
  width: 100%;
  height: 133px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  resize: none;
  transition: all 0.2s;
  &:focus {
    border-color: rgba(25, 137, 250, 1);
  }
}
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  .block {
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    overflow: hidden;
    &:nth-child(n + 2) {
      margin-top: 15px;
    }
    >>> .el-tabs {
      box-shadow: none;
      border: none;
    }
    .product {
      &-title {
        line-height: 80px;
        font-size: 21px;
        span {
          color: #ff5a5a;
          font-size: 19px;
          margin-left: 28px;
        }
      }
      .buttons {
        display: flex;
        justify-content: center;
        margin-top: 68px;
        padding-bottom: 25px;
        >>> .el-button {
          width: 120px;
          & + .el-button {
            margin-left: 40px;
          }
        }
      }
    }
    .table-input {
      height: 73px;
    }
    >>> .el-dialog {
      width: 848px;
      &__header {
        padding: 0 27px;
        line-height: 67px;
        background: rgba(243, 243, 243, 1);
        border-radius: 5px 5px 0px 0px;
      }
      &__body {
        padding: 27px 32px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.custom-header {
  font-size: 21px;
  padding-bottom: 11px;
  margin: 41px 0;
  border-bottom: 3px solid #eeeeee;
  >>> span {
    position: relative;
    display: inline-block;
    &:first-child:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 3px;
      bottom: -14px;
      left: 0;
      background-color: #cccccc;
    }
    & + span {
      margin-left: 13px;
      color: #999999;
      font-size: 19px;
    }
  }
}
</style>