<template>
  <div class="order">
    <div class="title">客户订单汇总管理</div>
    <div class="input-section">
      <div class="top-item">
        <div class="input-item">
          <span>合同备案流水号</span>
          <el-input v-model="serial_num" placeholder="请输入流水号"></el-input>
        </div>
        <div class="input-item">
          <span>客户名称</span>
          <el-input v-model="customer_name" placeholder="请输入客户名称"></el-input>
        </div>
        <div class="input-item">
          <span>业务负责人</span>
          <el-input v-model="business_owner" placeholder="请输入业务负责人"></el-input>
        </div>
      </div>

      <div class="bottom-item">
        <el-button type="primary">
          <svg-icon icon-class="pencil" />新增
        </el-button>
        <div>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button>
            <svg-icon icon-class="excel" />导出Excel
          </el-button>
        </div>
      </div>
    </div>

    <div class="table-section">
      <div class="table-container">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="serial_num" label="合同备案流水号" />
          <el-table-column prop="customer_name" label="客户名称" />
          <el-table-column prop="business_owner" label="业务负责人" />
          <el-table-column prop="approval_by" label="审批人" />
          <el-table-column prop="date" label="操作" align="center" width="160">
            <template>
              <el-tooltip
                class="button"
                effect="dark"
                content="查看"
                placement="top"
                @click.native="$router.push('/order/order-detail')"
              >
                <i class="el-icon-search" />
              </el-tooltip>
              <el-tooltip
                class="button"
                effect="dark"
                content="编辑"
                placement="top"
                @click.native="topage"
              >
                <i class="el-icon-edit" />
              </el-tooltip>
              <el-tooltip
                class="button"
                effect="dark"
                content="删除"
                placement="top"
                @click.native="topage"
              >
                <i class="el-icon-delete" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      serial_num: "",
      customer_name: "",
      business_owner: "",
      tableData: [
        {
          id: 1,
          serial_num: "NO：2020039",
          customer_name: "BIO(美国)",
          business_owner: "欧阳娜娜",
          approval_by: "欧阳娜娜"
        },
        {
          id: 2,
          serial_num: "NO：2020039",
          customer_name: "BIO(美国)",
          business_owner: "欧阳娜娜",
          approval_by: "欧阳娜娜"
        },
        {
          id: 3,
          serial_num: "NO：2020039",
          customer_name: "BIO(美国)",
          business_owner: "欧阳娜娜",
          approval_by: "欧阳娜娜"
        },
        {
          id: 4,
          serial_num: "NO：2020039",
          customer_name: "BIO(美国)",
          business_owner: "欧阳娜娜",
          approval_by: "欧阳娜娜"
        },
        {
          id: 5,
          serial_num: "NO：2020039",
          customer_name: "BIO(美国)",
          business_owner: "欧阳娜娜",
          approval_by: "欧阳娜娜"
        },
        {
          id: 6,
          serial_num: "NO：2020039",
          customer_name: "BIO(美国)",
          business_owner: "欧阳娜娜",
          approval_by: "欧阳娜娜"
        }
      ],
      currentPage4: 4
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="scss">
.el-input {
  width: 0;
}

.input-item {
  .el-input__inner {
    width: 293px;
    height: 53px;
  }
}
</style>
<style lang="scss" scoped>
.order {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .title {
    width: 100%;
    height: 48px;
    line-height: 48px;
    margin-bottom: 27px;
    color: #333;
    text-align: center;
    font-size: 19px;
    font-weight: 500;
    background-color: #fff;
  }

  .input-section {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 95%;
    height: 227px;
    margin-bottom: 20px;
    background-color: #fff;
    box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.05);
    border-radius: 11px;

    .top-item {
      display: flex;
      margin-left: 40px;

      .input-item {
        width: 440px;
        display: flex;
        align-items: center;

        &:first-child {
          margin-right: 53px;
        }

        span {
          display: inline-block;
          margin-right: 16px;
          color: #606266;
          font-size: 19px;
        }
      }
    }

    .bottom-item {
      display: flex;
      justify-content: space-between;
      .el-button {
        width: 120px;
        height: 53px;
        font-size: 19px;

        svg {
          margin-right: 9px;
        }

        &:first-child {
          margin-left: 40px;
        }

        &:last-child {
          width: 156px;
          margin-left: 43px;
          margin-right: 27px;
        }
      }
    }
  }

  .table-section {
    width: 95%;
    height: 1020px;
    padding: 40px 27px 0 27px;
    background-color: #fff;
    box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.05);
    border-radius: 11px;

    .table-container {
      border: 1px solid rgba(235, 238, 245, 1);
      padding: 33px 33px 0 33px;
      border-radius: 5px;
    }
  }
}
</style>