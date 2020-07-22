<template>
  <div v-if="$route.name === 'logisticsSupplierIndex'" class="customer_admin">
    <div class="container">
      <div class="filter block">
        <el-form inline label-width="107px">
          <el-form-item label="客户简称">
                <el-input  v-model="querydata.short_name" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item label="公司名称">
            <el-input v-model="querydata.custom_company" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item label="主要产品">
            <el-input v-model="querydata.produce" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item label="国家或地区">
            <el-input v-model="querydata.arer"  placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item class="button">
            <el-button type="primary" icon="el-icon-search" @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex-sp">
        <div class="content block">
          <div class="buttons flex-sp">
            <div>
              <el-button type="primary"  @click="$router.push({ path: 'logisticsSupplier_index/logisticsSupplier_detail'}) "  >
                <svg-icon icon-class="button_new" />新增
              </el-button>
              <el-button type="primary">
                <svg-icon icon-class="button_update" />导出
              </el-button>
              <el-button type="primary">
                <svg-icon icon-class="button_log" />打印
              </el-button>
              <el-button >
                <svg-icon icon-class="button_delete" />删除
              </el-button>
            </div>
            <div>
              <el-button type="primary">
                <svg-icon icon-class="button_down" />导入
              </el-button>
              <el-button type="plain">下载导入模板</el-button>
            </div>
          </div>
          <div class="checkbox_condition">
            <div class="checkbox_header" :class="checkboxShow ? '' : 'on'">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
              <div @click="checkboxShow = !checkboxShow">
                <svg-icon icon-class="arrow-top" />
                {{ checkboxShow ? '收起' : '展开' }}
              </div>
            </div>
            <el-collapse-transition>
              <div v-show="checkboxShow" class="checkbox_content">
                <el-checkbox-group v-model="checkedRows" @change="handleCheckedRowChange">
                  <el-checkbox
                    v-for="(row, index) in tableRwos"
                    :label="row.name"
                    :key="index"
                  >{{row.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-collapse-transition>
          </div>

          <div class="table_container">
            <el-table ref="multipleTable" :data="tableData" :border="true" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column label="序号" width="55">
                <template slot-scope="scope">{{ scope.$index+1 }}</template>
              </el-table-column>

              <template v-for="(row, index) of tableRwos">
                <el-table-column
                  v-if="isCheckbox(row.name)"
                  :key="index"
                  :prop="row.data_key"
                  :label="row.name"
                />
              </template>
              <el-table-column fixed="right" label="操作" width="165">
                <template slot-scope="scope">
                <el-link
                  type="primary"
                  @click="$router.push({ path: 'logisticsSupplier_index/logisticsSupplier_detail', query: scope.row} )" >编辑</el-link>
                <el-link type="primary" @click="logistics_suppliers_del(scope.row.id)">删除</el-link>
                <el-link type="primary">打印</el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
             :page-sizes="[10,100, 200, 300, 400]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
  <router-view v-else />
</template>

<script>
import * as api from "@/api/logisticsSupplier.js"; 
export default {
  data() {
    return {
      limit:10,
      total:1,
      querydata:{},
       currentPage4: 1,
      value: "",
      checkboxShow: false,
      checkAll: false,
      checkedRows: ["客户简称","客户编号",'公司名称','主要产品','主要产品','国家或地区','公司电话'
      ,'公司传真','公司地址','公司网站'],
      tableRwos: [
        {
          name: "客户简称",
          data_key: "short_name"
        },
        {
          name: "客户编号",
          data_key: "custom_no"
        },
        {
          name: "公司名称",
          data_key: "custom_company"
        },
        {
          name: "主要产品",
          data_key: "produce"
        },
        {
          name: "国家或地区",
          data_key: "area"
        },
        // {
        //   name: "联系人",
        //   data_key: "date"
        // },
        {
          name: "公司电话",
          data_key: "mobile"
        },
        {
          name: "公司传真",
          data_key: "fax"
        },
        {
          name: "公司地址",
          data_key: "address"
        },
        {
          name: "公司网站",
          data_key: "site"
        }
      ],
      isIndeterminate: true,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎"
        },
        {
          date: "2016-05-02",
          name: "王小虎"
        }
      ]
    };
  },
  created(){
    this.getList()
  },
  methods: {

    logistics_suppliers_del(id){
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              api.logistics_suppliers_del(id)
              .then(()=>{
                this.getList();
              })
          })
      },

      // 列表
      getList() {
      api.logistics_suppliers({ page:this.page, limit: this.limit, ...this.querydata })
        .then((res) => {
          this.currentPage4 = res.data.current_page
          this.total =  res.data.total
          this.tableData = res.data.data
          console.log( res,6666)
          console.log( this.tableData,77777)
        });
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
    isCheckbox(name) {
      return this.checkedRows.includes(name);
    },
    handleCheckAllChange(val) {
      this.checkedRows = val ? this.tableRwos.map(item => item.name) : [];
      this.isIndeterminate = false;
    },
    handleCheckedRowChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.tableRwos.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.tableRwos.length;
    },
    handleSelectionChange(value) {
      console.log(value);
    },
    // deleteById(id) {
    //   const h = this.$createElement;
    //   this.$msgbox({
    //     title: "提示",
    //     message: h("div", null, [
    //       h("svg-icon", {
    //         style: {
    //           "margin-right": "12px",
    //           "font-size": "22px",
    //           "vertical-align": "middle"
    //         },
    //         attrs: {
    //           iconClass: "stop"
    //         }
    //       }),
    //       h("span", null, "此操作将永久删除该文件，是否继续？")
    //     ]),
    //     showCancelButton: true,
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消"
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "./static.scss";
.customer_admin {
  height: 100%;
  padding: 11px;
  .container {
    display: flex;
    flex-wrap: wrap;
    .block {
      background-color: #ffffff;
      box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
      border-radius: 6px;
      margin: 5px;
    }
    .flex-sp {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .channel_ {
        &list {
          padding: 27px 0;
        }
        &item {
          display: flex;
          align-items: center;
          padding: 0 27px;
          height: 59px;
          font-size: 19px;
          transition: background-color 0.2s;
          &:hover,
          &.active {
            background-color: rgba(217, 236, 255, 1);
          }
          .svg-icon {
            margin-right: 13px;
          }
        }
      }

      .content {
        width: 100px;
        flex: 1;
      }
    }
    .content {
      padding: 27px;
      > div:nth-child(n + 2) {
        margin-top: 33px;
      }
    }
  }
}
</style>