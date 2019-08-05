<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div :class="{'fixed-header':false}">
      <navbar />
    </div>
    <div class="main-container" :class="[hasNoMenu? 'has-no-menu' :'']">
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import { mapState } from "vuex";
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  data() {
    return {
      hasNoMenu: false
    };
  },
  computed: {
    ...mapState(["menus"])
  },
  watch: {
    menus(val) {
      if (val.length === 0) {
        this.hasNoMenu = true;
      }
    }
  },
  created() {
    if (this.menus.length === 0) {
      this.hasNoMenu = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.has-no-menu.main-container {
  margin-left: 0 !important;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
.sidebar-container {
  margin-top: 60px;
}
</style>
