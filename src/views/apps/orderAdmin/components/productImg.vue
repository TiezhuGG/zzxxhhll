<template>
  <div class="product-img" :style="style">
    <div
      v-if="value.length"
      class="one_img"
      :class="{ no_more: isOne }"
      @click="!isOne && (dialogTableVisible = true)"
    >
      <el-image :src="activeImgs[activeImgIndex]" fit="cover" />
    </div>
    <el-upload
      v-else
      action="string"
      accept="image/*"
      :show-file-list="false"
      :http-request="upImg"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog title="产品大图" :visible.sync="dialogTableVisible">
      <div class="img_box">
        <img :src="value[0]" alt />
        <div class="right">
          <div class="images">
            <el-upload
              ref="upImg"
              action="string"
              accept="image/*"
              :show-file-list="false"
              :http-request="upImg"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <div
              v-for="(item, index) of activeImgs"
              :key="index"
              class="img-box"
              :class="{ 'on': activeImgIndex === index }"
              @click.self="activeImgIndex = index"
            >
              <span @click.stop="deleteByIndex(index)"></span>
              <img :src="item" />
            </div>
          </div>
          <div class="pages">
            <div class="prev" @click="page > 0 && page--">
              <i class="el-icon-caret-left" />
            </div>
            <span>{{ page + 1 }}/{{ total }}页</span>
            <div class="next" @click="page < total - 1 && page++">
              <i class="el-icon-caret-right" />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { imageUpload } from '@/api/pubilc'
export default {
  name: 'productImg',
  props: {
    value: {
      required: true,
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: '67px'
    },
    isOne: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.width
      }
    },
    activeImgs: {
      get() {
        return this.value.slice(
          this.page * this.page_size,
          (this.page + 1) * this.page_size
        )
      },
      set(val) {
        const e = JSON.parse(JSON.stringify(this.value))
        e.splice(
          this.page * this.page_size,
          (this.page + 1) * this.page_size,
          ...val
        )
        this.$emit('input', e)
      }
    },
    total() {
      return Math.ceil(Number(this.value.length + 1) / this.page_size)
    }
  },
  data() {
    return {
      page: 0,
      page_size: 9,
      activeImgIndex: 0,
      dialogTableVisible: false
    }
  },
  methods: {
    upImg(e) {
      var formdata = new FormData()
      formdata.append('image', e.file)
      imageUpload(formdata).then(({ message: img }) => {
        const e = JSON.parse(JSON.stringify(this.value))
        e.push(img)
        this.$emit('input', e)
      })
    },
    deleteByIndex(index) {
      const e = JSON.parse(JSON.stringify(this.activeImgs))
      e.splice(index, 1)
      this.activeImgs = e
      if (!e.length) this.dialogTableVisible = false
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
  >>> .el-upload {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed rgba(192, 204, 218, 1);
  }
  .one_img {
    &:not(.no_more) {
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
          background: url('~@/assets/imgs/search_more.png') no-repeat
            center/cover;
          z-index: 2;
        }
      }
    }
  }
  >>> .el-dialog {
    width: 1059px !important;
    &__header {
      padding: 0 27px;
      line-height: 67px;
      background: rgba(243, 243, 243, 1);
      border-radius: 5px 5px 0px 0px;
    }
    &__body {
      padding: 53px 67px !important;
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
            > div {
              width: 80px;
              height: 80px;
              &:active {
                opacity: 0.8;
              }
              &.on {
                border-color: #409eff;
              }
            }
          }
        }
      }
    }
  }
}
</style>