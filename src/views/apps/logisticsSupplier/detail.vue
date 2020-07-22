<template>
  <div>
    <div class="block">
      <el-tabs type="border-card">
        <el-tab-pane class="product" label="客户档案">
          <custom-header title="基本资料" />

          <el-form inline label-width="107px">
            <el-form-item label="客户简称">
              <el-input v-model="formData.short_name" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="客户编号">
              <el-input v-model="formData.custom_no" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="主要产品">
              <el-input v-model="formData.produce" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="国家或地区">
              <el-input v-model="formData.area" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="公司名称">
              <el-input v-model="formData.custom_company" style="width:520px" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="公司网站">
              <el-input v-model="formData.site" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="公司地址">
              <el-input v-model="formData.address" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="公司电话">
              <el-input v-model="formData.mobile" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="公司传真">
              <el-input v-model="formData.fax" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-form>

          <custom-header title="其他资料" />
          <el-form inline label-width="107px">
            <el-form-item label="开户行">
              <el-input v-model="formData.account_bank" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="人民币账号" style="margin-left:70px">
              <el-input v-model="formData.bank_no" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item style="margin-left:-20px">
              <el-input v-model="formData.other_account" placeholder="请输入美金账号" style="width:375px"></el-input>
            </el-form-item>

            <!-- <el-form-item label="其他编号">
              <el-input v-model="formData.short_name"  placeholder="请输入其他编号" style="width:780px"></el-input>
            </el-form-item>-->

            <el-form-item label="备注">
              <el-input v-model="formData.remark" placeholder="请输入备注" style="width:780px"></el-input>
            </el-form-item>
          </el-form>

          <custom-header title="联系方式" />

          <div style="text-align: right">
            <el-button>
              <svg-icon icon-class="button_delete" />
              <span>批量删除</span>
            </el-button>
            <el-button type="primary" @click="materials_linkers_add"  v-if="formData.id">
              <svg-icon icon-class="button_new" />
              <span>增加联系人</span>
            </el-button>
          </div>

          <div style="margin-top: 30px">
            <div class="table_container">
              <el-table
                :data="tableData"
                :border="true"
                @selection-change="handleSelectionChange"
                style="width: 100%"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="ID" width="50">
                  <template slot-scope="scope">
                    <span>{{scope.$index+1}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="联系人" prop="real_name">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.real_name" />
                  </template>
                </el-table-column>

                <el-table-column label="手机号" prop="mobile">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.mobile" />
                  </template>
                </el-table-column>

                <el-table-column label="邮箱" prop="email">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.email"  />
                  </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-link
                      v-if=" scope.row.newid == 'yan' "
                      type="primary"
                      @click="adduser(scope.row)"
                    >保存</el-link>
                    <el-link type="primary" @click="logistics_supplier_linkers_del(scope.row.id)">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>

               <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
             :page-sizes="[10,100, 200, 300, 400]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>

              <div style="text-align: center;margin-top: 30px">
                <el-button
                  v-if="formData.id"
                  type="primary"
                  @click="logistics_suppliers_put"
                >提交</el-button>
                <el-button v-else type="primary" @click="logistics_suppliers_add">增加</el-button>

                <el-button>暂存</el-button>
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
import * as api from "@/api/logisticsSupplier.js";
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
      limit: 10,
      total: 1,
      querydata: {},
      currentPage4: 1,
      formData: {},
      msgInput: "",
      isApprover: true,
      value: "",
      detailShow: false,
      tableData: []
    };
  },
  created() {
    this.formData = { ...this.$route.query };
    console.log({ ...this.$route.query }, 777);
    this.getList();
  },
  methods: {


    logistics_supplier_linkers_del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api.logistics_supplier_linkers_del(id).then(() => {
          this.getList();
        });
      });
    },

    handleSelectionChange(row) {
      console.log(row);
    },
    adduser(row) {
      if (row.email.length != 0) {
        const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        if ( reg.test(row.email)) {
          delete row.newid;
            api.logistics_supplier_linkers_add({ ...row }).then(()=>{
              this.getList();
            });
        }else{
          this.$message('邮箱格式错误!');
        }
      
      }
    },
    materials_linkers_add() {
      this.tableData.unshift({
        custom_id: this.formData.id,
        real_name: "",
        mobile: "",
        email: "",
        newid: "yan"
      });
    },
    logistics_suppliers_put() {
      console.log(this.formData, 5555);
      api.logistics_suppliers_put( { ...this.formData },  this.formData.id );
    },

    logistics_suppliers_add() {
      this.formData.company_id = 67;

      api.logistics_suppliers_add({ ...this.formData });
    },


     handleSizeChange(val) {
       this.limit = val
      console.log(`每页 ${val} 条`);
       this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val 
      this.getList()
    },
    getList() {
      api.logistics_supplier_linkers({ custom_id: this.formData.id,  page:this.page, limit: this.limit })
        .then(res => {
          this.currentPage4 = res.data.current_page;
          this.total = res.data.total;
          this.tableData = res.data.data;
          console.log(res, 6666);
          console.log(this.tableData, 77777);
        });
    }
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