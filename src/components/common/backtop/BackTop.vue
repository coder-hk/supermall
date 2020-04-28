<template>
  <div class="backTop" >
    <img src="~assets/img/common/top.png" alt="">
    </img>
  </div>
</template>

<script>
  export default {
    name:'BackTop',
  }
</script>

<style scoped>
  .backTop{
    position: fixed;
    bottom: 51px;
    right: 10px;
    z-index: 10;
  }
  .backTop img{
    width: 43px;
    height: 43px;
  }
</style>
