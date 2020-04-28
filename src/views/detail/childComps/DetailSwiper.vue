<template>
  <swiper class="detailSwiper" :interval="3000">
  	<swiper-item v-for="(item,index) in banners" :key="index" class="detailSwiperItem">
      <a href="#"><img :src="item" ></a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper/index"
  export default {
    name:'DetailSwiper',
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .detailSwiper{
    height: 300px;
    overflow: hidden;
  }
</style>
