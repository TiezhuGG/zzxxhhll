<template>
  <div class="product-img" :style="style" @click.self="dialogTableVisible = true">
    <el-image src="/img/timg.jpg" fit="cover" />
    <el-dialog title="产品大图" :visible.sync="dialogTableVisible">
      <div class="img_box">
        <img src="/img/timg.jpg" />
        <div class="right">
          <div class="images">
            <el-upload
              action="http://sxtest.zgwanchuan.cn/api/tools/uploadFile"
              :show-file-list="false"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <div class="img-box">
              <span></span>
              <img src="/img/timg.jpg" />
            </div>
            <div class="img-box">
              <span></span>
              <img src="/img/timg.jpg" />
            </div>
          </div>
          <div class="pages">
            <div class="prev">
              <i class="el-icon-caret-left" />
            </div>
            <span>1/1页</span>
            <div class="next">
              <i class="el-icon-caret-right" />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'productImg',
  props: {
    width: {
      type: String,
      default: '67px'
    }
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.width
      }
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      images: [
        '/img/timg.jpg',
        '/img/timg.jpg',
        '/img/timg.jpg',
        '/img/timg.jpg',
        '/img/timg.jpg'
      ]
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../static.scss';
.product-img {
  margin: 0 auto;
  cursor: pointer;
  position: relative;
  &::before,
  &::after {
    content: '';
    transition: all 0.2s;
  }
  &:hover {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      z-index: 1;
    }
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      transform: translate(-50%, -50%);
      background: url('~@/assets/imgs/search_more.png') no-repeat center/cover;
      z-index: 2;
    }
  }
  >>> .el-dialog {
    width: 1059px!important;
    &__header {
      padding: 0 27px;
      line-height: 67px;
      background: rgba(243, 243, 243, 1);
      border-radius: 5px 5px 0px 0px;
    }
    &__body {
      padding: 53px 67px!important;
      .img_box {
        display: flex;
        > * {
          flex-shrink: 0;
        }
        > img {
          width: 640px;
          height: 640px;
        }
        .right {
          position: relative;
          width: 232px;
          height: 640px;
          border: 1px solid rgba(228, 228, 228, 1);
          margin-left: 53px;
          .images {
            padding: 27px;
            padding-bottom: 81px;
            display: flex;
            align-content: end;
            flex-wrap: wrap;
            justify-content: space-between;
            > *:nth-child(n + 3) {
              margin-top: 16px;
            }
            > div,
            .el-upload {
              width: 80px;
              height: 80px;
            }
            .el-upload {
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px dashed rgba(192, 204, 218, 1);
            }
          }
        }
      }
    }
  }
}
</style>