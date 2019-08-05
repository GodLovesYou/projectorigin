<template>
  <div class="navbar">
    <img src="../../assets/imgs/logo.jpg" class="logo_img" />
    <div class="msg-top-user">
      <span>{{username || '用户'}},您好!</span>
      <!-- 登出功能暂时取消 -->
      <el-button round size="mini" class="logout-btn" @click="logOut">退出</el-button>
      <!-- <el-button round size="mini" class="logout-btn">退出</el-button> -->
    </div>
  </div>
</template>

<script>
import { handledErr } from "@/utils";
import { getUser, logOut } from "@/api/app";
export default {
  data() {
    return {
      username: ""
    };
  },
  created() {
    this.getUser()
  },
  methods: {
    clearCookie() {
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (var i = keys.length; i--; ) {
          document.cookie =
            keys[i] + "=0;path=/;expires=" + new Date(0).toUTCString(); //清除当前域名下的,例如：m.kevis.com
          document.cookie =
            keys[i] +
            "=0;path=/;domain=" +
            document.domain +
            ";expires=" +
            new Date(0).toUTCString(); //清除当前域名下的，例如 .m.kevis.com
          // document.cookie =
          //   keys[i] +
          //   "=0;path=/;domain=kevis.com;expires=" +
          //   new Date(0).toUTCString(); //清除一级域名下的或指定的，例如 .kevis.com
        }
      }
    },
    getUser() {
      getUser()
        .then(result => {
          this.username = result.data.iscAdCode;
        })
        .catch(err => {
          if (!handledErr(err)) {
            console.error("获取用户姓名失败", err);
          }
        });
    },
    logOut() {
      this.$confirm("确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logOut()
            .then(result => {
              this.clearCookie();
              location.href = result.data;
            })
            .catch(err => {
              if (!handledErr(err)) {
                this.$message({
                  type: "error",
                  message: "退出失败"
                });
              }
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #2f9891;
  z-index: 2000;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  line-height: 60px;

  .msg-top-user {
    float: right;
    margin-right: 10px;
    color: #fff;
    font-size: 14px;
    span {
      margin-right: 10px;
    }
  }

  .logout-btn {
    background: transparent;
    border-color: transparent;
    color: #fff;
    transition: 0.3s;
  }

  .logout-btn:hover {
    background: #fff;
    color: #00796a;
  }

  .logo_img {
    height: 60px;
    float: left;
    width: 210px;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
