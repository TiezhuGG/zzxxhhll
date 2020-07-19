<template>
  <div v-if="$route.name === 'consumptionDetail'" class="customer_admin">
    <div class="container">
      <div class="filter block">
        <el-form inline label-width="107px">
          <el-form-item style="float:left">
            <div class="imgwarp img-box">
              <img src="/img/timg.jpg" />
            </div>
          </el-form-item>

          <el-form-item label="客户简称">
            <el-select>
              <el-option>1</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="公司明朝">
            <el-input placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item label="主要联系人">
            <el-input placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item label="主要产品">
            <el-select>
              <el-option>1</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="国家地区">
            <el-select>
              <el-option>1</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="国家地区">
            <el-select>
              <el-option>1</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="国家地区">
            <el-select>
              <el-option>1</el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex-sp">
        <div class="content block">
          <el-tabs type="border-card">
            <el-tab-pane class="product" label="主料">
              <div class="headers">
                <div class="title">主料信息</div>
                <div class="cont">合计3项</div>
                <div class="button_">
                  <el-button size="mini">
                    <svg-icon icon-class="button_delete" />批量删除
                  </el-button>
                  <el-button type="primary" size="mini">
                    <svg-icon icon-class="button_new" />新增主料
                  </el-button>
                </div>
              </div>

              <div class="table_container">
                <el-table :data="tableData">
                  <el-table-column type="selection" width="55"></el-table-column>

                  <el-table-column label="裁片名称">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>

                  <el-table-column label="材料类别">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>

                  <el-table-column label="计量单位">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>

                  <el-table-column label="材料名称">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>

                  <el-table-column label="材料规格">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>

                  <el-table-column label="长度">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>

                  <el-table-column label="宽度">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>

                  <el-table-column label="裁片数量">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>

                  <el-table-column label="理论耗量">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>

                  <el-table-column label="标记">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>

                  <el-table-column label="备注">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>


                 
                  <el-table-column fixed="right" label="操作" width="120">
                    <el-link type="primary">编辑</el-link>
                    <el-link type="primary" >删除</el-link>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane class="product" label="辅料">88</el-tab-pane>
            <el-tab-pane class="product" label="配件">88</el-tab-pane>
            <el-tab-pane class="product" label="商标">88</el-tab-pane>
            <el-tab-pane class="product" label="包装">88</el-tab-pane>
            <el-tab-pane class="product" label="材料汇总">88</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
  <router-view v-else />
</template>

<script >
export default {
  data() {
    return {
      tableData: [
        {
          name: "王小虎"
        },
        {
          name: "王小虎"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./static.scss";
.headers {
  position: relative;
  display: flex;
  width: 100%;
  height: 60px;
  background: rgba(247, 247, 247, 1);
  .title {
    // width:70px;
    height: 60px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 60px;
    margin-right: 0px;
    margin-left: 20px;
  }
  .cont {
    height: 60px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #ff5a5a;
    line-height: 60px;
    margin-right: 0px;
    margin-left: 50px;
  }
  .button_ {
    // padding: 1px;
    position: absolute;
    right: 30px;
    top: 10px;
  }
}
.imgwarp {
  margin-top: 30px;
  margin-left: 42px;
  width: 165px;
  height: 165px;
}

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
      >>> .el-tabs {
        box-shadow: none;
        border: none;
      }
    }
    .flex-sp {
      width: 100%;
      display: flex;
      justify-content: space-between;
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