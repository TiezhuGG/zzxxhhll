  <template>
  <div class="order-management">
    <div class="table-wrap">
      <div class="table-header">
        <span>合同备案流水号NO：2020039</span>
        <span>客户：BIO(美国)</span>
        <span>业务负责人：罗志祥</span>
      </div>
      <el-table
        :data="tableData"
        border
        height="600"
        :summary-method="getSummaries"
        show-summary
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="customer_contract_no" label="客合同号" width="160"></el-table-column>
        <el-table-column prop="contract_no" label="合同号"></el-table-column>
        <el-table-column prop="customer_fund_no" label="客款号"></el-table-column>
        <el-table-column prop="product_no" label="生产货号"></el-table-column>
        <el-table-column prop="image" label="图片"></el-table-column>
        <el-table-column prop="QC_test" label="QC样及测试样"></el-table-column>
        <el-table-column prop="number" label="数量"></el-table-column>
        <el-table-column prop="technology" label="配套工艺"></el-table-column>
        <el-table-column prop="delivery" label="货期"></el-table-column>
        <el-table-column prop="suggestion_processing_charges" label="建议加工费"></el-table-column>
        <el-table-column prop="final_processing_charges" label="终审加工费"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
</template>

  <script>
export default {
  data() {
    return {
      tableData: [
        {
          customer_contract_no: "PU#53138英国",
          contract_no: "63137(2020069)",
          customer_fund_no: "BP71G8NMC99AS1BNC",
          product_no: "BH-18180背包",
          image: "",
          QC_test: "1",
          number: 2950,
          technology: "丝印",
          delivery: "2020-05-25",
          suggestion_processing_charges: "",
          final_processing_charges: ""
        },
        {
          customer_contract_no: "PU#53138英国",
          contract_no: "63137(2020069)",
          customer_fund_no: "BP71G8NMC99AS1BNC",
          product_no: "BH-18180背包",
          image: "",
          QC_test: "1",
          number: 2950,
          technology: "丝印",
          delivery: "2020-05-25",
          suggestion_processing_charges: "",
          final_processing_charges: ""
        },
        {
          customer_contract_no: "PU#53138英国",
          contract_no: "63137(2020069)",
          customer_fund_no: "BP71G8NMC99AS1BNC",
          product_no: "BH-18180背包",
          image: "",
          QC_test: "1",
          number: 2950,
          technology: "丝印",
          delivery: "2020-05-25",
          suggestion_processing_charges: "",
          final_processing_charges: ""
        },
        {
          customer_contract_no: "PU#53138英国",
          contract_no: "63137(2020069)",
          customer_fund_no: "BP71G8NMC99AS1BNC",
          product_no: "BH-18180背包",
          image: "",
          QC_test: "1",
          number: 2950,
          technology: "丝印",
          delivery: "2020-05-25",
          suggestion_processing_charges: "",
          final_processing_charges: ""
        },
        {
          customer_contract_no: "PU#53138英国",
          contract_no: "63137(2020069)",
          customer_fund_no: "BP71G8NMC99AS1BNC",
          product_no: "BH-18180背包",
          image: "",
          QC_test: "1",
          number: 2950,
          technology: "丝印",
          delivery: "2020-05-25",
          suggestion_processing_charges: "",
          final_processing_charges: ""
        },
        {
          customer_contract_no: "PU#53138英国",
          contract_no: "63137(2020069)",
          customer_fund_no: "BP71G8NMC99AS1BNC",
          product_no: "BH-18180背包",
          image: "",
          QC_test: "1",
          number: 2950,
          technology: "丝印",
          delivery: "2020-05-25",
          suggestion_processing_charges: "",
          final_processing_charges: ""
        },
        {
          customer_contract_no: "PU#53138英国",
          contract_no: "63137(2020069)",
          customer_fund_no: "BP71G8NMC99AS1BNC",
          product_no: "BH-18180背包",
          image: "",
          QC_test: "1",
          number: 2950,
          technology: "丝印",
          delivery: "2020-05-25",
          suggestion_processing_charges: "",
          final_processing_charges: ""
        }
      ]
    };
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    }
  }
};
</script>

<style lang="scss">
.el-table__row:last-child {
  height: 30px;
  color: red;
}
.order-management {
  display: flex;
  justify-content: center;
  .table-wrap {
    width: 95%;
    background-color: #fff;
    padding-left: 27px;
    .table-header {
      height: 99px;
      display: flex;
      align-items: center;
    }
  }
}
</style>