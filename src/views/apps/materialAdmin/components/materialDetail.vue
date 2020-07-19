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
      <span>
        <div class="titles">材料类别</div>
        <el-input v-model="input" class="w379" placeholder="请输入内容"></el-input>
      </span>
      <span>
        <div class="titles">计量单位</div>
        <el-input v-model="input" class="w379" placeholder="请输入内容"></el-input>
      </span>
      <span>
        <div class="titles">材料代码</div>
        <el-input v-model="input" class="w379" placeholder="请输入内容"></el-input>
      </span>
      <span>
        <div class="titles">材料名称</div>
        <el-input v-model="input" class="w379" placeholder="请输入内容"></el-input>
      </span>
      <span>
        <div class="titles">材料规格</div>
        <el-input v-model="input" class="w379" placeholder="请输入内容"></el-input>
      </span>
      <span>
        <div class="titles">材料颜色</div>
        <el-input v-model="input" class="w379" placeholder="请输入内容"></el-input>
      </span>
      <span>
        <div class="titles">材料属性</div>
        <el-input v-model="input" class="w379" placeholder="请输入内容"></el-input>
      </span>
      <span>
        <div class="titles">价格区间（￥）</div>
        <div class="picrebox">
          <el-input class="picre" name="picre" placeholder="请输入价格" />
          <div class="select-interval">-</div>
          <el-input class="picre" name="picre" placeholder="请输入价格" />
        </div>
      </span>
      <span>
        <div class="titles">计量公式</div>
        <el-input v-model="input" class="w379" placeholder="请输入内容"></el-input>
      </span>
      <span>
        <div class="titles">材料描述</div>
        <el-input v-model="input" class="w379" placeholder="请输入内容"></el-input>
      </span>

      <span>
        <div class="titles">备注说明</div>
        <el-input v-model="input" style="width:578px;" placeholder="请输入内容"></el-input>
      </span>
      <br />
      <span>
        <div class="titles">建档人员</div>
        <el-input v-model="input" class="w379" placeholder="请输入内容"></el-input>
      </span>
    </div>

    <div style="text-align: center;margin-top: 30px">
      <el-button type="primary">提交</el-button>
    </div>
  </div>
</template>


<script>
export default {
  name: "materialDetail"
};
</script>

<style lang="scss" scoped>
@import "../static.scss";

.picrebox {
  display: flex;
}
.picre {
  width: 168px;
}
.w379 {
  width: 379px;
}
.titles {
  padding-top: 27px;
  font-size: 19px;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
}
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
      > div {
        width: 77px;
        height: 77px;
        &:nth-child(n + 2) {
          margin-left: 19px;
        }
        &:nth-child(4n + 1) {
          margin-left: 0;
        }
        &:nth-child(n + 5) {
          margin-top: 19px;
        }
      }
    }
  }
}
.text_container {
  font-size: 0;
  color: #606266;
  padding-top: 20px;
  line-height: 50px;
  span {
    font-size: 19px;
    display: inline-block;
    width: 50%;
  }
}
</style>
