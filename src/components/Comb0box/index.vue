<template>
  <div>
    <el-dialog :title="title" center :visible.sync="show" top="100px">
      <div class="custom-locale">
        <div class="left">
            <zx-search @change="search"/>
            <div class="fold-panel">
              <div :class="{'has-logo': rt}" class="fold-panel-block">
                <div class="fold-panel-title" @click="rt = !rt">
                  <i class="el-icon-caret-right"></i>
                  样板部
                </div>
                <transition name="combobox">
                  <div v-show="rt" class="fold-panel-list">
                    <div class="fold-panel-item">
                      <svg-icon icon-class="client"></svg-icon>产品系统
                    </div>
                    <div class="fold-panel-item">
                      <svg-icon icon-class="client"></svg-icon>产品系统
                    </div>
                    <div class="fold-panel-item">
                      <svg-icon icon-class="client"></svg-icon>产品系统
                    </div>
                    <div class="fold-panel-item">
                      <svg-icon icon-class="client"></svg-icon>产品系统
                    </div>
                    <div class="fold-panel-item">
                      <svg-icon icon-class="client"></svg-icon>产品系统
                    </div>
                    <div class="fold-panel-item">
                      <svg-icon icon-class="client"></svg-icon>产品系统
                    </div>
                    <div class="fold-panel-item">
                      <svg-icon icon-class="client"></svg-icon>产品系统
                    </div>
                  </div>
                </transition>
              </div>
          </div>
        </div>
        <div class="middle">
          <i class="el-icon-arrow-right" />
        </div>
        <div class="rigth">
          <div class="rigth-title">已选择应用(2）</div>
          <div class="yet-list">
            <div class="yet-item">
              <div>
                <svg-icon icon-class="client"></svg-icon>产品系统
              </div>
              <i class="el-icon-close" />
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="show = false">确定</el-button>
        <el-button @click="show = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ComboBox',
  data() {
    return {
      show: this.popShow,
      rt: false
    }
  },
  props: {
    title: {
      type: String,
      default: '添加常用应用'
    },
    popShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    search(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
  >>>.el-dialog {
    width: 973px!important;
    .el-dialog__body {
      padding: 0;
    }
  }
  .custom-locale {
    display: flex;
    align-items: center;
    padding: 21px 35px 51px 35px;
    border-top:1px solid rgba(235,238,245,1);
    font-size: 19px;
    .left {
      height: 667px;
      border-radius: 5px;
      border: 1px solid rgba(235,238,245,1);
      padding: 20px 21px;
      overflow-y: scroll;
      .sear-box {
        width: 352px;
      }
      .fold-panel {
        &-block {
          cursor: pointer;
          font-weight: 400;
          > * {
            width: 100%;
          }
          &.on i {
            transform: rotate(90deg);
          }
        }
        &-title {
          padding: 29px 0;
          display: flex;
          align-items: center;
          i {
            transition: all .5s;
            color: #D8D8D8;
            margin-right: 20px;
          }
        }
        &-item {
          height: 53px;
          display: flex;
          align-items: center;
          svg {
            font-size: 53px;
            margin-right: 13px;
          }
          &:nth-child(n+2) {
            margin-top: 27px;
          }
        }
      }
    }
    .middle {
      width: 76px;
      font-size: 25px;
      text-align: center;
    }
    .rigth {
      width: 415px;
      &-title {
        color: #909399;
        padding-bottom: 27px;
      }
      .yet {
        &-list {
          width: 100%;
          height: 613px;
          border-width: 1px;
          border-style: solid;
          border-radius: 5px;
          padding: 29px 21px;
          overflow-y: scroll;
        }
        &-item {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 3px;
          padding-bottom: 27px;
          div {
            display: flex;
            align-items: center;
            svg {
              font-size: 52px;
              margin-right: 13px;
            }
          }
        }
      }
    }
  }
</style>
