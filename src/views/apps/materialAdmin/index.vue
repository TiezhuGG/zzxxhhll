<template>
  <div v-if="$route.name === 'materialAdmin'" class="material_admin">
    <div class="container">
      <div class="filter block">
        <el-form inline label-width="107px">

          <el-form-item label="材料名称">
            <el-input v-model="querydata.name" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="材料类别">
            <el-select v-model="querydata.attribute">
              <el-option v-for="item in dataType" :key="item.id" :label="item.name"  :value="item.name"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="计量单位">
            <el-select v-model="querydata.unit">
              <el-option>1</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="材料代码">
            <el-input  v-model="querydata.code" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="材料规格">
            <el-select v-model="querydata.size">
              <el-option>1</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="颜色">
            <el-select v-model="querydata.colour">
              <el-option>1</el-option>
            </el-select>
          </el-form-item>

          
          <el-form-item label="材料描述">
            <el-input v-model="querydata.description" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="价格区间">
            <el-input v-model="querydata.min_price" name="picre" placeholder="请输入价格" />
            <div class="select-interval">-</div>
            <el-input v-model="querydata.max_price" name="picre" placeholder="请输入价格" />
          </el-form-item>

          <el-form-item class="button" >
            <el-button type="primary" icon="el-icon-search" @click="getList" >查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex-sp">
        <div class="channel block" style="width:240px">
          <div class="buttons">
            <div style="text-align: center;  margin-top: 20px">
              <el-button type="primary" @click="dialogtype = true">
                <svg-icon icon-class="button_new" />新增
              </el-button>
              <el-button type="primary">
                <svg-icon icon-class="pencil" />编辑
              </el-button>
            </div>

            <div style="  margin: 20px;" >
              <el-button @click="materialsTypeadel">
                <svg-icon icon-class="button_delete" />删除
              </el-button>
            </div>

            <div class="heighe"></div>

            <el-tree :data="dataType" node-key="id" @node-click="editType" />
          </div>
        </div>

        <div class="content block">
          <div class="buttons flex-sp">
            <div>
              <el-button type="primary" @click="detailShow = true">
                <svg-icon icon-class="button_new" />新增
              </el-button>
              <el-button type="primary">
                <svg-icon icon-class="button_update" />导出
              </el-button>
              <el-button type="primary">
                <svg-icon icon-class="button_log" />打印
              </el-button>
              <el-button>
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
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div @click="checkboxShow = !checkboxShow">
                <svg-icon icon-class="arrow-top" />
                {{ checkboxShow ? '收起' : '展开' }}
              </div>
            </div>
            <el-collapse-transition>
              <div v-show="checkboxShow" class="checkbox_content">
                <el-checkbox-group v-model="checkedRows" @change="handleCheckedRowChange">
                  <el-checkbox v-for="(row, index) in tableRwos" :label="row.name" :key="index">{{row.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-collapse-transition>
          </div>
          <div class="table_container">
            <el-table ref="multipleTable" :data="tableData" :border="true" tooltip-effect="dark" style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column label="ID" width="55">
                <template slot-scope="scope">{{ scope.$index+1 }}</template>
              </el-table-column>
              <template v-for="(row, index) of tableRwos">
                <el-table-column v-if="isCheckbox(row.name)" :key="index" :prop="row.data_key" :label="row.name" width="200" />
              </template>

              <el-table-column label="价格区间">
                <template slot-scope="scope">{{ scope.row.min_price}} - {{scope.row.max_price}}</template>
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="120">
                  <template slot-scope="scope">
                <el-link type="primary" @click="detailShow = true">编辑</el-link>
                <el-link type="primary" @click="deleteById(scope.row.id)">删除</el-link>
                <el-link type="primary">打印</el-link>
                  </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
        </div>

        <el-dialog title="材料新增" :visible.sync="detailShow">
          <material-detail />
        </el-dialog>

        <el-dialog class="dialogtype" title="新增材料类别" :visible.sync="dialogtype" width="536px">

          <div class="">

            <el-form class="dialogTypecss" inline label-width="107px">
              <el-form-item label="分类名称" >
                <el-input class="w520" v-model="formType.name" placeholder="请输入"></el-input>
              </el-form-item>

              <el-form-item label="上级分类">
                <el-select class="w520" v-model="formType.parent_id">
                  <el-option v-for="item in dataType" :key="item.id" :label="item.name"  :value="item.id" ></el-option>
                </el-select>
                
              </el-form-item>
            </el-form>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogtype = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
  <router-view v-else />
</template>

<script>
  import materialDetail from "./components/materialDetail";
  import * as api from "@/api/materialAdmin.js";
  export default {
    components: {
      materialDetail
    },
    data() {
      return {
       limit:10,
       total:1,
       querydata:{},
        currentPage4: 1,

        formTypeId:'',
        formType:{},
        dialogtype: false,
        detailShow: false,
        value: "",
        checkboxShow: false,
        checkAll: false,
        checkedRows: ["材料类别", "计量单位",'材料代码','材料名称','材料规格','材料颜色','材料描述'],
        tableRwos: [
          {
            name: "材料名称",
            data_key: "name"
          },
          {
            name: "材料类别",
            data_key: "attribute"
          },
          {
            name: "计量单位",
            data_key: "unit"
          },
          {
            name: "材料代码",
            data_key: "code"
          },
          {
            name: "材料规格",
            data_key: "size"
          },
          {
            name: "材料颜色",
            data_key: "colour"
          },
          {
            name: "材料描述",
            data_key: "description"
          },
          // {
          //   name: "价格区间",
          //   data_key: ""
          // },
         
        ],
        isIndeterminate: true,
        tableData: [{
            date: "2016-05-03",
            name: "王小虎"
          },
          {
            date: "2016-05-02",
            name: "王小虎"
          }
        ],
        dataType: [{
          id: 1,
          label: "面料类",
          children: [{
              id: 11,
              label: "分类一"
            },
            {
              id: 12,
              label: "分类二"
            }
          ]
        }]
      };
    },
     created () {
      this.getList()
      this.materialsTypeList()
    },
    methods: {

      editType(row){
        console.log(row,"777777")
        this.formTypeId = row.parent_id
      },
        materialsTypeadel(){

          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                  api.materialsTypeadel(this.formTypeId)
                  .then(()=>{
                    this.materialsTypeList();
                  })
              })

      },

      async  submit(){
        await api.materialsTypeadd({...this.formType})
        this. dialogtype = false,
         this.materialsTypeList()
      },

      materialsTypeList(){
        api.materialsTypeList()
        .then((res)=>{
          console.log(res)

          for (let i = 0; i <  res.data.length; i++) {
             res.data[i].label = res.data[i].name 
                 res.data[i].children =  res.data[i].sum
             for (let k = 0; k < res.data[i].sum.length; k++) {
                res.data[i].sum[k].label =   res.data[i].sum[k].name
          }

          this.dataType = res.data
          console.log( this.dataType ,787878)
          }
        })
      },

      // 列表
        getList() {
          api.materials({ page:this.page, limit: this.limit, ...this.querydata })
            .then((res) => {
              this.currentPage4 = res.data.current_page
              this.total =  res.data.total
              this.tableData = res.data.data
              console.log( res,6666)
              console.log( this.tableData,77777)
            });
        },
  

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      isCheckbox(name) {
        return this.checkedRows.includes(name);
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
      deleteById(id) {
           this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              api.materialsdel(id)
              .then(()=>{
                this.getList();
              })
          })
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./static.scss";

  .dialogTypecss {
    >>>.el-form-item__label {
      // margin-left: 50px;
      text-align: left;
    }
  }

  .w520 {
    width: 520px;
  }

  .dialogtype {
    >>>.el-dialog__header {
      background-color: #fff;
    }
  }

  >>>.el-dialog {
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

  >>>.el-tree-node__label {
    font-size: 19px;
  }

  .material_admin {
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

        .channel {
          width: 240px;
          flex-shrink: 0;

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
        }

        .content {
          width: 100px;
          flex: 1;
        }
      }

      .content {
        padding: 27px;

        >div:nth-child(n + 2) {
          margin-top: 33px;
        }
      }
    }
  }

  .heighe {
    width: 100%;
    border: 1px solid #e6e6e6;
  }
</style>
