<template>
  <div class="sidebar-avatar-container">
    <el-avatar @click.native="userSettingShow = !userSettingShow" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    <transition name="user">
      <div v-show="userSettingShow" class="user-setting">
        <div class="userinfo" style="background-image: url('/img/avatar_userinfo_bg.png')">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div class="text">
            <div class="name tone">林青霞</div>
            <div class="company tone">触享网络科技</div>
          </div>
        </div>
        <div class="options">
          <div @click="topage('/')" class="option">
            <p>管理后台</p>
            <i class="el-icon-arrow-right"/>
          </div>
          <div @click="topage('/')" class="option">
            <p>邀请</p>
            <i class="el-icon-arrow-right"/>
          </div>
          <div @click="topage('/changeuser')" class="option">
            <p>修改密码</p>
            <i class="el-icon-arrow-right"/>
          </div>
          <div @click="topage('/changeuser/TelOne')" class="option">
            <p>修改手机号码</p>
            <i class="el-icon-arrow-right"/>
          </div>
          <div @click="topage('/')" class="option">
            <p>切换企业</p>
            <i class="el-icon-arrow-right"/>
          </div>
          <div @click="topage('/changeuser/OutFirm')" class="option">
            <p>退出该企业</p>
            <i class="el-icon-arrow-right"/>
          </div>
          <div @click="topage('/')" class="option">
            <p>退出登录</p>
            <i class="el-icon-arrow-right"/>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  data() {
    return {
      userSettingShow: false
    }
  },
  mounted() {
    document.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) {
        this.userSettingShow = false // 这句话的意思是点击其他区域关闭（也可以根据自己需求写触发事件）
      }
    })
  },
  methods: {
    topage(url) {
      this.$router.push({ path: url })
      this.userSettingShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-avatar-container {
  padding: 24px 13px;
  position: relative;
  cursor: pointer;
  .el-avatar {
    width: 53px;
    height: 53px;
  }
  .user-setting {
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 13px 0px rgba(0,0,0,0.15);
    border-radius:5px;
    overflow: hidden;
    position: absolute;
    top: 24px;
    left: 85px;
    width: 427px;
    font-size: 19px;
    .userinfo {
      height: 180px;
      display: flex;
      align-items: center;
      padding: 0 21px;
      color: #ffffff;
      .el-avatar {
        width:85px;
        height:85px;
        margin-right: 15px;
        flex-shrink: 0;
      }
      .text {
        flex-grow: 1;
        width: 300px;
        .name {
          font-size: 32px;
          font-weight:500;
        }
        .company {
          margin-top: 10px;
        }
      }
    }
    .options {
      font-size: 19px;
      .option {
        height: 63px;
        padding: 0 21px;
        display: flex!important;
        align-items: center;
        justify-content: space-between;
        &:nth-child(2n+2) {
          border-bottom: 1px solid #E4E7ED;
        }
        &:last-child {
          height: 84px;
        }
      }
    }
    /*display: none;*/
  }
}
</style>
