<template>
  <div id="album">
    <nav-bar>
        <template #left><img src="~assets/img/common/back.svg" @click="backProfile" class="backImg">
        </template>
      <template #center>魔方图册</template>
    </nav-bar>
    <dynamic-cube />
    <div class="cover-empty">
      <a href="https://github.com/coder-hk/cube/archive/master.zip" >
        <div class="downloadSrc">查看源码</div>
      </a >
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import DynamicCube from './DynamicCube.vue'
  export default {
    name:'PhotoAlbum',
    components: {
      NavBar,DynamicCube
    },
    methods:{
      backProfile(){
        this.$router.replace('/profile')
      }
    }
  }
</script>

<style scoped>
  .cover-empty{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    z-index: 9;
    background-color: #fff;
  }
  .backImg{
    vertical-align: middle;
  }
  .downloadSrc{
    width: 100%;
    height: 35px;
    margin: 15px auto 0;
    background-color: #FF0000;
    border-radius: 10px;
    text-align: center;
    font-weight: 700;
    color: #fff;
    line-height: 35px;
  }
</style>
