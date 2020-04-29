  <template>
  <div class="order-detail">
    <div class="title-header">
      <div class="svg-wrap">
        <svg-icon icon-class="back" @click="goBack" />
        <svg-icon icon-class="gohead" />
      </div>
      <span>客户订单汇总管理</span>
    </div>
    <div class="table-wrap">
      <div class="table-header">
        <span>合同备案流水号NO：2020039</span>
        <span>客户：BIO(美国)</span>
        <span>业务负责人：罗志祥</span>
      </div>
      <el-table
        :data="tableData"
        border
        height="500"
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
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        style="height: 500px;"
        :options="editorOption"
      ></quill-editor>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data() {
    return {
      tableData: [
        {
          customer_contract_no: "PU#53138英国",
          contract_no: "63137(2020069)",
          customer_fund_no: "BP71G8NMC99AS1BNC",
          product_no: "BH-18180背包",
          image: "未上传",
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
          image: "未上传",
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
          image: "未上传",
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
          image: "未上传",
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
          image: "未上传",
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
          image: "未上传",
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
          image: "未上传",
          QC_test: "1",
          number: 2950,
          technology: "丝印",
          delivery: "2020-05-25",
          suggestion_processing_charges: "",
          final_processing_charges: ""
        }
      ],
      content: "未上传",
      editorOption: {}
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
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
          sums[index] += "";
        } else {
          sums[index] = "";
        }
      });

      return sums;
    }
  },
  components: {
    quillEditor
  }
};
</script>

<style lang="scss">
.order-detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .title-header {
    width: 100%;
    height: 48px;
    line-height: 48px;
    display: flex;
    background-color: #fff;
    margin-bottom: 27px;

    .svg-wrap {
      flex: 1;
      font-size: 19px;

      svg {
        margin-left: 27px;
      }
    }

    span {
      display: inline-block;
      margin-right: 112px;
      text-align: center;
      flex: 9;
    }
  }

  .table-wrap {
    width: 95%;
    background-color: #fff;
    padding: 0 27px;
    border-radius: 11px;

    .table-header {
      height: 99px;
      display: flex;
      align-items: center;

      span:nth-child(1) {
        margin-right: 67px;
      }

      span:nth-child(2) {
        margin-right: 67px;
      }
    }
  }
}
</style>