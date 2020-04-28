<template>
  <div id="app">
    <transition :name="transitionName" :duration="{enter:0,leave:0}">
      <keep-alive exclude="detail">
        <router-view class="transitionBody"></router-view>
      </keep-alive>
    </transition>
    <main-tab-bar />
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabBar/MainTabBar.vue";
  import Icon from 'components/content/Icon/Icon.vue'
  import SvgIcon from 'components/content/Icon/SvgIcon.vue'
  export default {
    name: "App",
    data(){
      return{
        transitionName:""
      }
    },
    components: {
      MainTabBar,Icon,SvgIcon
    },
    watch:{
      $route(to, from) {
        const arr = ['/home', '/category', '/cart', '/profile','/detail','/PhotoAlbum'];
        const compare = arr.indexOf(to.path) > arr.indexOf(from.path);
        this.transitionName = compare ? 'transitionLeft' : 'transitionRight';
      }
    }
  };
</script>

<style>
  @import url("assets/css/base.css");

  .transitionBody {
    transition:all 0.3s linear;
    /*定义动画的时间和过渡效果*/
  }

  .transitionLeft-enter,
  .transitionRight-leave-active {
    /* -webkit-transform: translateY(100%);
    transform: translateY(100%); */
    transform: scale(100%,100%);
    /*当左滑进入右滑进入过渡动画*/
  }

  .transitionLeft-leave-active,
  .transitionRight-enter {
   /* -webkit-transform: translateY(-100%);
    transform: translateY(-100%); */
    transform: scale(0,0);
  }
</style>
