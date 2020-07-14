<template>
  <div class="product-detail">
    <div class="img_container">
      <img src="/img/timg.jpg" class="active_img" />
      <div class="img_list">
        <div class="images">
          <div class="img-box">
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
    <div class="text_container">
      <span>客户货号：MP1564671465</span>
      <span>款式名称：双肩包</span>
      <span>尺码规格：60*60*60</span>
      <span>配色名称：棕灰色</span>
      <span>配色代码：#546179</span>
      <span>工厂货号：MP156461125</span>
      <span>计量单位：CM</span>
      <span>数量：235个</span>
      <span>单价(¥)：16</span>
      <span>金额(¥)：56464</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail'
}
</script>

<style lang="scss" scoped>
@import '../static.scss';
.img_container {
  display: flex;
  justify-content: space-between;
  .active_img {
    width: 320px;
    height: 320px;
  }
  .img_list {
    position: relative;
    width: 424px;
    height: 320px;
    border: 1px solid rgba(228, 228, 228, 1);
    .images {
      padding: 28px;
      display: flex;
      flex-wrap: wrap;
      align-content: end;
      >div {
        width: 77px;
        height: 77px;
        &:nth-child(n+2) {
          margin-left: 19px;
        }
        &:nth-child(4n+1) {
          margin-left: 0;
        }
        &:nth-child(n+5) {
          margin-top: 19px;
        }
      }
    }
  }
}
.text_container {
  font-size: 0;
  color: #606266;
  padding-top: 13px;
  line-height: 50px;
  span {
    font-size: 19px;
    display: inline-block;
    width: 50%;
  }
}
</style>
