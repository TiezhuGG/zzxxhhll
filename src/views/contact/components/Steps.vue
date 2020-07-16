<template>
  <div class="steps-container steps">
    <div
      v-for="(item, index) of stepsList"
      :key="index"
      :class="active === index ? 'on' : ''"
      @click="handleStep(index, item.name)"
      class="steps-item"
    >{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  name: "Steps",
  props: {
    stepActive: {
      type: Number,
      default: null
    },
    stepsList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      active: this.stepActive
    };
  },
  watch: {
    stepActive(val) {
      this.active = val;
    }
  },
  methods: {
    handleStep(index, name) {
      switch (index) {
        case 0:
          document.getElementById("system-info").scrollIntoView();
          break;
        case 1:
          document.getElementById("base_info").scrollIntoView();
          break;
        case 2:
          document.getElementById("work_info").scrollIntoView();
          break;
        case 3:
          document.getElementById("personal_info").scrollIntoView();
          break;
        case 4:
          document.getElementById("education_info").scrollIntoView();
          break;
        case 5:
          document.getElementById("bank_info").scrollIntoView();
          break;
        case 6:
          document.getElementById("contract_info").scrollIntoView();
          break;
        case 7:
          document.getElementById("emergency_contact").scrollIntoView();
          break;
        case 8:
          document.getElementById("family_info").scrollIntoView();
          break;
        case 9:
          document.getElementById("personal_material").scrollIntoView();
          break;
        case 10:
          document.getElementById("salary_history").scrollIntoView();
          break;
      }

      this.$emit("change", {
        index,
        name
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.steps-container {
  color: #909399;
  height: fit-content;
  border-right: 3px solid #f3f3f3;
  position: relative;
  &:before,
  &:after {
    width: 16px;
    height: 16px;
    content: "";
    border-radius: 50%;
    box-sizing: border-box;
    background-color: #ffffff;
    border: 3px solid rgba(211, 215, 221, 1);
    position: absolute;
    right: -9px;
  }
  &:before {
    top: -9px;
  }
  &:after {
    bottom: -9px;
  }
  .steps-item {
    line-height: 70px;
    padding-right: 30px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s;
    &:after {
      width: 11px;
      height: 11px;
      content: "";
      border-radius: 50%;
      box-sizing: border-box;
      background: rgba(211, 215, 221, 1);
      position: absolute;
      right: -7px;
      top: 30px;
      transition: all 0.3s;
    }
    &.on {
      color: #409eff;
      &:after {
        background: #409eff;
      }
    }
  }
}
</style>
