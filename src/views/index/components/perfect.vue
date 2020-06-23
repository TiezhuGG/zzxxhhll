<template>
  <el-dialog title="完善企业信息" center width="auto" top="20vh" :visible.sync="showDialog">
    <div class="desc">
      恭喜，您的企业
      <span>厦门触享网络科技有限公司</span> 已经成功注册！
      <br />完善您的企业信息，马上邀请同事加入协作吧。
    </div>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item prop="scaleValue" label="企业规模">
        <el-radio-group v-model="scaleName" v-for="item in companyScale" :key="item.id" @change="selectScale">
          <!-- <el-radio-button label="1-25人"></el-radio-button>
          <el-radio-button label="26-100人"></el-radio-button>
          <el-radio-button label="101-300人"></el-radio-button>
          <el-radio-button label="301-1000人"></el-radio-button>
          <el-radio-button label="1000人以上"></el-radio-button> -->
          <el-radio-button :label="item.label"></el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="businessValue" label="所在行业">
        <el-select class="enterprise" v-model="form.businessValue" placeholder="请选择您的行业">
          <el-option
            v-for="item in businesses"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="cityValue" label="所在地区">
        <el-select
          class="address-first"
          v-model="form.provinceValue"
          placeholder="请选择省"
          @change="selectProvince"
        >
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select
          class="address-second"
          v-model="form.cityValue"
          placeholder="请选择市"
        >
          <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button type="primary" @click="showDialog = false">下一步</el-button> -->
      <el-button type="primary" @click="next">下一步</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getArea, getBusiness, completeInfo } from "@/api/user";
import { Message } from "element-ui";

export default {
  name: "Perfect",
  props: {
    dialogFormVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      showDialog: null,
      form: {
        scaleValue: "",
        businessValue: "",
        provinceValue: "", // 省份id
        cityValue: "" // 城市id
      },
      rules: {
        scaleValue: [{ required: true, message: "请选择企业规模", trigger: "blur" }],
        businessValue: [{ required: true, message: "请选择行业", trigger: "blur" }],
        cityValue: [{ required: true, message: "请选择城市", trigger: "blur" }],
      },
      companyScale: [
        {id: 0, label: "1-25人"},
        {id: 1, label: "26-100人"},
        {id: 2, label: "101-300人"},
        {id: 3, label: "301-1000人"},
        {id: 4, label: "1000人以上"},
      ],
      scaleName: "",
      businesses: [], // 行业列表
      provinceList: [], // 省份列表
      cityList: [], // 城市列表
    };
  },
  created() {
    this.showDialog = this.dialogFormVisible

    this.getArea();
    this.getBusiness();
  },
  computed: {
    provinceValue() {
      return this.form.provinceValue
    }
  },
  watch: {
    provinceValue(newVal, oldVal) { // 省份改变，城市显示为空
      if(oldVal !== '') {
        this.form.cityValue = ""
      }
    }
  },
  methods: {
    // 选择企业规模
    selectScale(e) {
      const scaleVal = e
      this.scaleName = scaleVal
      for(let item of this.companyScale) {
        if (item.label == scaleVal) {
          this.form.scaleValue = item.id
        }
      }
    },
    // 获取行业数据
    async getBusiness() {
      const res = await getBusiness()
      if(res.status_code === 200) {
        this.businesses = res.data
      }
    },
    // 获取省市数据
    async getArea() {
      const res = await getArea();
      if(res.status_code === 200) {
        this.provinceList = res.data.province;
      }
    },
    // 选择省份
    selectProvince(e) {
      this.provinceId = e;
      for (let item of this.provinceList) {
        if (item.id == e) {
          this.cityList = item.city;
          // console.log("cityList", this.cityList);
        }
      }
    },
    next() {
      this.$refs.form.validate(valid => {
        if(valid) {
          completeInfo({
            company_id: "29", // 测试用
            business_id: this.form.businessValue.toString(),
            scale_id: this.form.scaleValue.toString(),
            province_id: this.form.provinceValue.toString(),
            city_id: this.form.cityValue.toString(),
          }).then(() => {
            this.showDialog = false
            this.$router.push('/')
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
>>> .el-dialog {
  width: 880px !important;
  padding: 20px 0;
  border-radius: 5px;
  .el-dialog__body {
    padding: 0 53px;
    padding-top: 28px;
  }
  * {
    font-size: 19px;
  }
}
.desc {
  color: #606266;
  line-height: 27px;
  padding: 0 15px;
  span {
    color: #409eff;
  }
}
>>> .el-form {
  padding-top: 50px;
  .el-form-item__label {
    width: 104px;
    padding-right: 16px;
  }
  .el-radio-group {
    font-size: 0;
  }
  .el-radio-button__inner {
    padding-left: 23.5px;
    padding-right: 23.5px;
  }
  .el-form-item__content {
    font-size: 0;
  }
}

.enterprise {
  width: 667px;
}

.address-first {
  width: 320px;
}

.address-second {
  width: 320px;
  margin-left: 27px;
}
</style>
